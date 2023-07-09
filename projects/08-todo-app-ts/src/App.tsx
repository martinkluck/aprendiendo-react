import { useState } from "react";
import { Todos } from "./components/Todos";

const mockTodos = [
  {
    id: 1,
    title: 'Buy milk',
    completed: false,
  },
  {
    id: 2,
    title: 'Buy eggs',
    completed: false,
  },
  {
    id: 3,
    title: 'Buy bread',
    completed: false,
  },
];

const App = (): JSX.Element => {
  const [todos] = useState(mockTodos);
  return (
    <Todos todos={todos} />
  );
};

export default App;
