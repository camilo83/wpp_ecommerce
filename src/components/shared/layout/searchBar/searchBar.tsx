import './searchBar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

type PropsType = {
  onClose: () => void;
  onSearch: (term: string) => void;
};

export function SearchBar({ onClose, onSearch }: PropsType) {
  const [searchTerm, setSearchTerm] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (searchTerm.length < 3) {
      return;
    }
    onClose();

    onSearch(searchTerm);
  }

  return (
    <form action="" className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Busca un producto..."
        className={`bar`}
        value={searchTerm}
        onChange={handleChange}
      />
      <button type="submit" className={`icon-`}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </form>
  );
}
