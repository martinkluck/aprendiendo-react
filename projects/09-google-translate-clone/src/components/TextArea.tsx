import { Form } from "react-bootstrap"
import { type FC } from 'react'
import { SectionType } from "../types.d"

interface Props {
  type: SectionType
  loading?: boolean
  onChange: (text: string) => void
  value: string
}

const commonStyles = {
  border: 0,
  height: '200px',
  resize: 'none',
}

const getPlaceholder = ({type, loading}: {type: SectionType, loading?: boolean}) => {
  if (type === SectionType.From) return 'Introduce texto'
  if (loading === true) return 'Traduciendo...'
  return 'Traducción'
}

export const TextArea: FC<Props> = ({ type, loading, value, onChange }) => {
  const styles = type === SectionType.From ? commonStyles : { ...commonStyles, backgroundColor: '#f5f5f5' }
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value)
  }
  return (
    <Form.Control
      as='textarea'
      placeholder={getPlaceholder({ type, loading })}
      autoFocus={type === SectionType.From}
      disabled={type === SectionType.To}
      style={styles}
      value={value}
      onChange={handleChange}
    />
  )
}