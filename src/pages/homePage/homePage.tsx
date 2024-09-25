import { useEffect, useState } from 'react';
import { BasicLayout } from '../../components/shared/layout/basicLayout';
import { Separator } from '../../components/separator/separator';
import './homePage.scss';
import { CategoryBanner } from '../../components/categoryBanner/categoryBanner';
import { ProductsRepo } from '../../api/products';
import { ProductsGrid } from '../../components/productsGrid/productsGrid';
import { Category, Product } from '../../model/entities';
import { CategoriesRepo } from '../../api/categories';
import { CategoryFilter } from '../../components/categoryFilter/categoryFilter';

const productCtrl = new ProductsRepo();
const categoriesCtrl = new CategoriesRepo();

export default function HomePage() {
  const [items, setItems] = useState<Product[]>([]);
  const [favoriteItemsState, setFavoriteItemsState] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [initialCategories, setInitialCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState<string>('');

  const clearSearchTerm = () => {
    setSearchTerm('');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data;
        if (searchTerm) {
          data = await productCtrl.searchProducts(searchTerm);
        } else if (selectedCategory) {
          data = await productCtrl.getProductsByCategory(selectedCategory.id);
        } else {
          data = await productCtrl.getProducts();
        }
        setItems(data);

        const favoriteItems = data.filter(
          (product: Product) => product.attributes.isFavorite
        );
        setFavoriteItemsState(favoriteItems);

        const categories = await categoriesCtrl.getCategories();
        setCategories(categories);

        const initialCategories = categories.filter(
          (category: Category) => category.attributes.parent!.data === null
        );

        setInitialCategories(initialCategories);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching favorite items:', error);
      }
    };

    fetchData();
  }, [selectedCategory, searchTerm]);

  if (loading) return <div>Loading...</div>;

  return (
    <BasicLayout onSearch={setSearchTerm}>
      <Separator height={140}></Separator>
      <div className="page-container">
        <CategoryFilter
          categories={categories}
          initialCategories={initialCategories}
          onCategorySelect={setSelectedCategory}
          searchTerm={searchTerm}
          clearSearchTerm={clearSearchTerm}
        ></CategoryFilter>

        <Separator height={60}></Separator>
        {favoriteItemsState.length > 0 ? (
          <CategoryBanner products={favoriteItemsState}></CategoryBanner>
        ) : null}
        <Separator height={60}></Separator>
        {items.length > 0 ? (
          <ProductsGrid products={items}></ProductsGrid>
        ) : (
          <div className="no-results">
            No existen resultados para tu búsqueda.
          </div>
        )}
        <Separator height={180}></Separator>
      </div>
    </BasicLayout>
  );
}
