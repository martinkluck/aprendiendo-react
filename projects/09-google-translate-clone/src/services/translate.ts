import { ChatCompletionRequestMessageRoleEnum, Configuration, OpenAIApi } from 'openai';
import { FromLanguage, Language } from '../types.d';
import { SUPPORTED_LANGUAGES } from '../constants';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

const configuration = new Configuration({ apiKey });
const openai = new OpenAIApi(configuration);

export async function translate ({fromLanguage, toLanguage, text}: {fromLanguage: FromLanguage, toLanguage: Language, text: string}) {
  if (fromLanguage === toLanguage) return text;
  const messages = [
    {
      role: ChatCompletionRequestMessageRoleEnum.System,
      content: 'You are a IA that translate text. You receive text from user. Do not answer, just translate the text. The original language is surrounded by `{{` and `}}`. You can also receive {{auto}} which means that you have to detect the language. You can translate to any language. The language you translate to is surrounded by `[[` and `]]`.',
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: `Hola Mundo {{Español}} [[English]]`,
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      content: `Hello World`,
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: 'How are you? {{auto}} [[French]]',
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      content: 'Je vais bien',
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: 'Thank you {{auto}} [[German]]',
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      content: 'Danke',
    }
  ]

  const fromCode = fromLanguage === 'auto' ? 'auto' : SUPPORTED_LANGUAGES[fromLanguage];
  const toCode = SUPPORTED_LANGUAGES[toLanguage];

  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      ...messages,
      {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: `${text} {{${fromCode}}} [[${toCode}]]`,
      }
    ]
  });

  return completion.data.choices[0].message?.content;
}