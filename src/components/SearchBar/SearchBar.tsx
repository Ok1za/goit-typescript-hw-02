import toast from 'react-hot-toast';
import css from './SearchBar.module.css';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  const query = (form.elements.namedItem('query') as HTMLInputElement).value.trim();
  if (query === '') {
    toast.error('Please enter a search query.');
    return;
  }
  onSearch(query);
  (form.reset as () => void)();
};

  return (
    <header className={css.searchbar}>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <input
          type="text"
          name="query"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button className={css.button} type="submit">Search</button>
      </form>
    </header>
  );
};

export default SearchBar;