import { Category } from '../../model/entities';
import './categoryFilter.scss';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { ENV } from '../../utils/constants';

type PropsType = {
  categories: Category[];
  initialCategories: Category[];
  onCategorySelect: (category: Category | null) => void;
  searchTerm: string;
  clearSearchTerm: () => void;
};

export function CategoryFilter({
  initialCategories,
  onCategorySelect,
  searchTerm,
  clearSearchTerm,
}: PropsType) {
  const [currentCategories, setCurrentCategories] =
    useState<Category[]>(initialCategories);
  const [previousCategories, setPreviousCategories] = useState<Category[][]>(
    []
  );

  const handleCategoryClick = (category: Category) => {
    onCategorySelect(category);

    const subCategories = category.attributes.categories?.data;
    if (subCategories && subCategories.length > 0) {
      setPreviousCategories([...previousCategories, currentCategories]);
      setCurrentCategories(subCategories);
    }
  };

  const handleBackClick = () => {
    const lastCategorySet = previousCategories.pop();
    if (lastCategorySet) {
      setCurrentCategories(lastCategorySet);
      setPreviousCategories([...previousCategories]);

      const previousCategory = lastCategorySet[0];
      onCategorySelect(previousCategory);
    } else {
      onCategorySelect(null);
    }
  };

  const handleClearSearchTerm = () => {
    clearSearchTerm();
  };

  return (
    <ul className="category-list">
      {searchTerm ? (
        <li onClick={handleClearSearchTerm}>
          <span className="category-name">Filtrar por categoría</span>
        </li>
      ) : (
        <>
          {previousCategories.length > 0 && (
            <li onClick={handleBackClick} className="return-li">
              <FontAwesomeIcon icon={faArrowLeftLong} />
              <span className="category-name">Volver</span>
            </li>
          )}
          {currentCategories.map((category: Category) => (
            <li key={category.id} onClick={() => handleCategoryClick(category)}>
              <img
                src={
                  ENV.SERVER_HOST +
                  category.attributes.image?.data?.attributes?.url
                }
                alt={category.attributes.name}
              />
              <span className="category-name">{category.attributes.name}</span>
            </li>
          ))}
        </>
      )}
    </ul>
  );
}
