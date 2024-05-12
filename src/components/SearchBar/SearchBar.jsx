import toast from 'react-hot-toast';
import css from './SearchBar.module.css';

const SearchBar = ({ onSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const query = e.target.elements.query.value.trim();
    if (query === '') {
      toast.error('Please enter a search query.');
      return;
    }
    onSearch(query);
    e.target.reset();
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