import './header.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faShoppingCart,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import { SearchBar } from '../searchBar/searchBar';
import { useState } from 'react';
import { useCart } from '../../../../hooks/useShopcar';

type PropsType = {
  onSearch: (term: string) => void;
};

export function Header({ onSearch }: PropsType) {
  const [isBarOpen, setIsBarOpen] = useState(false);

  const { countItems } = useCart();

  const closeSearchBar = () => {
    setIsBarOpen(false);
  };

  const openSearchBar = () => {
    setIsBarOpen(!isBarOpen);
  };

  return (
    <header>
      <div className="header-desktop">
        <img src="/logo.png" alt="" />
        <div className="search-section">
          <SearchBar onClose={closeSearchBar} onSearch={onSearch}></SearchBar>
        </div>
        <div className="total-items">
          <FontAwesomeIcon icon={faShoppingCart} />
          <span className="cart-count">{countItems}</span>
        </div>
      </div>
      <div className="header-mobile">
        {isBarOpen ? (
          <div className="open-search">
            <FontAwesomeIcon
              icon={faTimes}
              onClick={closeSearchBar}
              className="close-bar"
            />
            <SearchBar onClose={closeSearchBar} onSearch={onSearch}></SearchBar>
          </div>
        ) : (
          <div className="close-search">
            <FontAwesomeIcon icon={faMagnifyingGlass} onClick={openSearchBar} />
            <img src="/logo.png" alt="" />
            <div className="total-items">
              <FontAwesomeIcon icon={faShoppingCart} />
              <span className="cart-count">{countItems}</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
