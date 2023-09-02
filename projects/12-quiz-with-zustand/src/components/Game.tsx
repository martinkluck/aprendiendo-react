import { Card, IconButton, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from '@mui/material'
import { useQuestionsStore } from '../store/questions'
import { type Question as QuestionType } from '../types.d'
import SyntaxHighLighter from 'react-syntax-highlighter'
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material'
import { Footer } from './Footer'

const getBackgroundColor = (info: QuestionType, index: number) => {
  const { userSelectedAnswer, correctAnswer } = info
  // usuario no ha seleccionado nada todavía
  if (userSelectedAnswer == null) return 'transparent'
  // si ya selecciono pero la solución es incorrecta
  if (index !== correctAnswer && index !== userSelectedAnswer) return 'transparent'
  // si esta es la solución correcta
  if (index === correctAnswer) return 'green'
  // si esta es la selección del usuario pero no es correcta
  if (index === userSelectedAnswer) return 'red'
  // si no es ninguna de las anteriores
  return 'transparent'
}

const Question = ({ info }: { info: QuestionType }) => {
  const selectAnswer = useQuestionsStore(state => state.selectAnswer)
  const handleClick = (answerIndex: number) => () => {
    selectAnswer(info.id, answerIndex)
  }
  return (
    <Card variant='outlined' sx={{ textAlign: 'left', bgcolor: '#222', padding: 2, marginTop: 4 }}>
      <Typography variant='h6' component='h2'>
        {info.question}
      </Typography>
      <SyntaxHighLighter language='javascript' style={gradientDark}>
        {info.code}
      </SyntaxHighLighter>
      <List sx={{ bgcolor: '#333' }} disablePadding>
        {info.answers.map((answer, index) => (
          <ListItem key={index} disablePadding divider>
            <ListItemButton onClick={handleClick(index)} sx={{ backgroundColor: getBackgroundColor(info, index) }} disabled={info.userSelectedAnswer != null}>
              <ListItemText primary={answer} sx={{ textAlign: 'center', fontWeight: 'bold' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  )
}
export const Game = () => {
  const questions = useQuestionsStore(state => state.questions)
  const currentQuestion = useQuestionsStore(state => state.currentQuestion)
  const goNextQuestion = useQuestionsStore(state => state.goNextQuestion)
  const goPreviousQuestion = useQuestionsStore(state => state.goPreviousQuestion)
  const questionInfo = questions[currentQuestion]
  return (
    <>
      <Stack direction='row' gap={2} alignItems="center" justifyContent="center">
        <IconButton onClick={goPreviousQuestion} disabled={currentQuestion === 0}>
          <ArrowBackIosNew />
        </IconButton>
        <Typography variant='h4' component='h2'>
          {currentQuestion + 1} / {questions.length}
        </Typography>
        <IconButton onClick={goNextQuestion} disabled={currentQuestion >= questions.length -1}>
          <ArrowForwardIos />
        </IconButton>
      </Stack>
      <Question info={questionInfo} />
      <Footer />
    </>
  )
}