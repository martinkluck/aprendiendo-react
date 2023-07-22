import { useState, useId } from 'react';
import './Filters.css';
import { useFilters } from '../hooks/useFilters';
export function Filters() {
  const { filters, setFilters } = useFilters();
  // const [minPrice, setMinPrice] = useState(0);
  const minPriceFilterId = useId();
  const categoryFilterId = useId();

  const handleChangeMinPrice = (e) => {
    // Esto huele mal
    // Dos fuentes de la verdad
    // setMinPrice(e.target.value);
    setFilters((prevState) => ({ ...prevState, minPrice: e.target.value }));
  };

  const handleChangeCategory = (e) => {
    // Esto también hiele mal
    // estamos pasando la función de actualizar
    // de estado nativa de react a un componente hijo
    setFilters((prevState) => ({ ...prevState, category: e.target.value }));
  };

  return (
    <section className='filters'>
      <div>
        <label htmlFor={minPriceFilterId}>Precio a partir de:</label>
        <input
          type='range'
          id={minPriceFilterId}
          min={0}
          max={1000}
          onChange={handleChangeMinPrice}
          value={filters.minPrice}
        />
        <span>$ {filters.minPrice}</span>
      </div>
      <div>
        <label htmlFor={categoryFilterId}>Categoría</label>
        <select
          id={categoryFilterId}
          onChange={handleChangeCategory}
        >
          <option value='all'>Todas</option>
          <option value='laptops'>Portátiles</option>
          <option value='smartphones'>Teléfonos</option>
        </select>
      </div>
    </section>
  );
}
