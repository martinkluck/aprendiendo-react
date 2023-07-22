import { FILTER_BUTTONS } from '../constants';
import { type FilterValue } from '../types';

interface Props {
  filterSelected: FilterValue;
  onFilterChange: (filter: FilterValue) => void;
}

export const Filters: React.FC<Props> = ({
  filterSelected,
  onFilterChange,
}) => {
  const handleClick = (filter: FilterValue) => (e: React.MouseEvent) => {
    e.preventDefault();
    onFilterChange(filter);
  };
  return (
    <ul className='filters'>
      {
        Object.entries(FILTER_BUTTONS).map(([key, {href, literal}]) => {
          const isSelected = filterSelected === key;
          const className = isSelected ? 'selected' : '';
          return (
            <li key={key}>
              <a
                href={href}
                className={className}
                onClick={handleClick(key as FilterValue)}
              >
                {literal}
              </a>
            </li>
          )
        })
      }
    </ul>
  );
};
