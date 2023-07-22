import { useState } from 'react';
import { TodoTitle } from '../types';

interface Props {
  onAddTodo: ({ title }: TodoTitle) => void;
}
export const CreateTodo: React.FC<Props> = ({ onAddTodo }) => {
  const [inputValue, setInputValue] = useState('');
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim() === '') {
      return;
    }
    onAddTodo({
      title: inputValue,
    });
    setInputValue('');
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        className='new-todo'
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        placeholder='Que necesita ser hecho?'
        autoFocus
      />
    </form>
  );
};
