import { useEffect, useState, useRef, useCallback } from 'react';
import './App.css';
import { Movies } from './components/Movies';
import { useMovies } from './hooks/useMovies';
import debounce from 'just-debounce-it';

function useSearch() {
  const [search, updateSearch] = useState('');
  const [error, setError] = useState(null);
  const isFirstInput = useRef(true);

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === '';
      return;
    }
    if (search === '') {
      setError('No se puede buscar una película vacía');
      return;
    }

    if (search.match(/^\d+$/)) {
      setError('No se puede buscar por números');
      return;
    }

    if (search.length < 3) {
      setError('No se puede buscar por menos de 3 caracteres');
      return;
    }

    setError(null);
  }, [search]);

  return { search, updateSearch, error };
}

function App() {
  const [sort, setSort] = useState(false);
  const { search, updateSearch, error } = useSearch();
  const {
    movies,
    getMovies,
    loading,
    error: errorMovies,
  } = useMovies({ search, sort });
  // const inputRef = useRef();

  // const counter = useRef(0);
  // counter.current++;
  // console.log(counter.current);

  const debouncedGetMovies = useCallback(
    debounce((search) => {
      getMovies({ search });
    }, 300),
    [getMovies]
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies({ search });
    // const inputElement = inputRef.current;
    // const value = inputElement.value;
    // const data = new FormData(event.target);
    // const query = data.get('query');
    // const fields = Object.fromEntries(new FormData(event.target));
  };

  const handleSort = () => {
    setSort(!sort);
  };

  const handleChange = (event) => {
    const newSearch = event.target.value;
    updateSearch(newSearch);
    debouncedGetMovies(newSearch);
  };

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
            value={search}
            name='query'
            type='text'
            placeholder='Avengers, Star Wars, The Matrix ...'
            style={{
              border: '1px solid transparent',
              borderColor: error ? 'red' : 'transparent',
            }}
          />
          <input
            type='checkbox'
            onChange={handleSort}
            checked={sort}
          />
          <button type='submit'>Buscar</button>
        </form>
        {error && <p className='error'>{error}</p>}
      </header>

      <main>
        {loading ? <p>Cargando ... </p> : <Movies movies={movies} />}
        {errorMovies && <p className='error'>{errorMovies}</p>}
      </main>
    </div>
  );
}

export default App;
