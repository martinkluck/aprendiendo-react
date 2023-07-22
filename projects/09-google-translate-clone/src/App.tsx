import { Container, Row, Col, Button, Stack } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { useStore } from './hooks/useStore'
import { AUTO_LANGUAGE, VOICE_FOR_LANGUAGES } from './constants'
import { ArrowIcon, CopyIcon, SpeakerIcon } from './components/Icons'
import { LanguageSelector } from './components/LanguagesSelector'
import { SectionType } from './types.d'
import { TextArea } from './components/TextArea'
import { useEffect } from 'react'
import { translate } from './services/translate'
import { useDebounce } from './hooks/useDebounce'

function App() {
  const { fromLanguage, toLanguage, fromText, result, loading, setFromText, setResult, interchangeLanguage, setFromLanguage, setToLanguage } = useStore()

  const debounceFromText = useDebounce(fromText, 300)

  useEffect(() => {
    if (debounceFromText === '') return
    translate({ fromLanguage, toLanguage, text: debounceFromText })
      .then(result => {
        if (result == null) return
        setResult(result)
      })
      .catch((e) => setResult(e))
  }, [debounceFromText, fromLanguage, toLanguage])

  const handleClickBoard = () => {
    navigator.clipboard.writeText(result).catch(() => { })
  }

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(result)
    utterance.lang = VOICE_FOR_LANGUAGES[toLanguage]
    utterance.rate = 0.8
    speechSynthesis.speak(utterance)
  }

  return (
    <Container fluid>
      <h2>Google Translate</h2>
      <Row>
        <Col>
          <Stack gap={2}>
            <LanguageSelector type={SectionType.From} value={fromLanguage} onChange={setFromLanguage} />
            <TextArea
              type={SectionType.From}
              value={fromText}
              onChange={setFromText}
            />
          </Stack>
        </Col>
        <Col xs='auto'>
          <Button variant='link' disabled={fromLanguage === AUTO_LANGUAGE} onClick={interchangeLanguage}>
            <ArrowIcon />
          </Button>
        </Col>
        <Col>
          <Stack gap={2}>
            <LanguageSelector type={SectionType.To} value={toLanguage} onChange={setToLanguage} />
            <div style={{ position: 'relative' }}>
              <TextArea
                loading={loading}
                type={SectionType.To}
                value={result}
                onChange={setResult}
              />
              <div style={{ position: 'absolute', left: 0, bottom: 0, display: 'flex' }}>
                <Button variant='link' onClick={handleClickBoard}>
                  <CopyIcon />
                </Button>
                <Button variant='link' onClick={handleSpeak}>
                  <SpeakerIcon />
                </Button>
              </div>
            </div>
          </Stack>
        </Col>
      </Row>
    </Container>
  )
}

export default App
