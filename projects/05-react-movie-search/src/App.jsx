import { useEffect, useState } from 'react';
import './App.css';
// import { useRef } from 'react';
import { Movies } from './components/Movies';
import { useMovies } from './hooks/useMovies';

function App() {
  const { movies } = useMovies();
  // const inputRef = useRef();
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    // const inputElement = inputRef.current;
    // const value = inputElement.value;
    // const data = new FormData(event.target);
    // const query = data.get('query');
    // const fields = Object.fromEntries(new FormData(event.target));
  };

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    if (query === '') {
      setError('No se puede buscar una película vacía');
      return;
    }

    if (query.match(/^d+$/)) {
      setError('No se puede buscar por números');
      return;
    }

    if (query.length < 3) {
      setError('No se puede buscar por menos de 3 caracteres');
      return;
    }

    setError(null);
  }, [movies]);

  return (
    <div className='page'>
      <header>
        <h1>Buscador de películas</h1>
        <form
          className='form'
          onSubmit={handleSubmit}
        >
          <input
            // ref={inputRef}
            onChange={handleChange}
            value={query}
            name='query'
            type='text'
            placeholder='Avengers, Star Wars, The Matrix ...'
          />
          <button type='submit'>Buscar</button>
        </form>
      </header>

      <main>
        <Movies movies={movies} />
      </main>
    </div>
  );
}

export default App;
