import { useState } from 'react';
import { Todos } from './components/Todos';
import { type Todo as TodoType, type TodoId, type FilterValue, type TodoTitle } from './types';
import { TODO_FILTERS } from './constants';
import { Footer } from './components/Footer';
import { Header } from './components/Header';

const mockTodos = [
  {
    id: '1',
    title: 'Buy milk',
    completed: true,
  },
  {
    id: '2',
    title: 'Buy eggs',
    completed: false,
  },
  {
    id: '3',
    title: 'Buy bread',
    completed: false,
  },
];

const App = (): JSX.Element => {
  const [todos, setTodos] = useState(mockTodos);
  const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.ALL);

  const handleRemove = ({ id }: TodoId): void => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const handleCompleted = ({
    id,
    completed,
  }: Pick<TodoType, 'id' | 'completed'>): void => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed,
        };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const handleFilterChange = (filter: FilterValue): void => {
    setFilterSelected(filter);
  };

  const handleClearCompleted = (): void => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  };

  const handleAddTodo = ({title}: TodoTitle): void => {
    const newTodo: TodoType = {
      id: crypto.randomUUID(),
      title,
      completed: false,
    };
    setTodos([newTodo, ...todos]);
  };

  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.length - activeCount;

  const filteredTodos = todos.filter((todo) => {
    switch (filterSelected) {
      case TODO_FILTERS.ACTIVE:
        return !todo.completed;
      case TODO_FILTERS.COMPLETED:
        return todo.completed;
      default:
        return true;
    }
  }
  );

  return (
    <div className='todoapp'>
      <Header onAddTodo={handleAddTodo} />
      <Todos
        onCompleted={handleCompleted}
        onRemoveTodo={handleRemove}
        todos={filteredTodos}
      />
      <Footer
        activeCount={activeCount}
        completedCount={completedCount}
        filterSelected={filterSelected}
        onClearCompleted={handleClearCompleted}
        handleFilterChange={handleFilterChange}
      />
    </div>
  );
};

export default App;
