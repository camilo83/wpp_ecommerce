import { ENV } from '../utils/constants';
import { Product } from '../model/entities';

export class ProductsRepo {
  async getProducts(): Promise<Product[]> {
    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.PRODUCTS}?populate[images]=*&populate[variations][populate]=images&populate[variations][populate]=attributes&populate[variations][populate]=attribute_values&populate[variations][populate]=product&populate[brand]=*&populate[colection]=*&populate[categories]=*

`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result.data;
    } catch (error) {
      throw error;
    }
  }

  async getProductById(id: number): Promise<Product> {
    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.PRODUCTS}/${id}?populate=*`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result.data;
    } catch (error) {
      throw error;
    }
  }

  async getProductByVariationId(variationId: number): Promise<Product> {
    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.VARIATIONS}/${variationId}?populate=*`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result.data;
    } catch (error) {
      throw error;
    }
  }

  async getFavoriteProducts(): Promise<Product[]> {
    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.PRODUCTS}?filters[isFavorite]=true&populate=*`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result.data;
    } catch (error) {
      throw error;
    }
  }

  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.PRODUCTS}?filters[categories][$eq]=${categoryId}&populate[images]=*&populate[variations][populate]=images&populate[variations][populate]=attributes&populate[variations][populate]=attribute_values&populate[variations][populate]=product&populate[brand]=*&populate[colection]=*&populate[categories]=*`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result.data;
    } catch (error) {
      throw error;
    }
  }

  async searchProducts(searchTerm: string): Promise<Product[]> {
    try {
      const encodedSearchTerm = encodeURIComponent(searchTerm);

      const baseUrl = `${ENV.API_URL}${ENV.ENDPOINTS.PRODUCTS}?populate[images]=*&populate[variations][populate]=images&populate[variations][populate]=attributes&populate[variations][populate]=attribute_values&populate[variations][populate]=product&populate[brand]=*&populate[colection]=*&populate[categories]=*`;
      const nameFilter = `&filters[$or][0][name][$containsi]=${encodedSearchTerm}`;
      const categoryFilter = `&filters[$or][1][categories][name][$containsi]=${encodedSearchTerm}`;
      const brandFilter = `&filters[$or][2][brand][name][$containsi]=${encodedSearchTerm}`;
      const collectionFilter = `&filters[$or][3][colection][name][$containsi]=${encodedSearchTerm}`;

      const url =
        baseUrl + nameFilter + categoryFilter + brandFilter + collectionFilter;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result.data;
    } catch (error) {
      throw error;
    }
  }
}
