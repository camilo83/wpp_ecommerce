import { ENV } from '../utils/constants';
import { Category } from '../model/entities';

export class CategoriesRepo {
  async getCategories(): Promise<Category[]> {
    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.CATEGORIES}?populate[image]=*&populate[categories][populate][image]=*&populate[parent]=*&populate[products]=*&populate[categories][populate][products]=*&populate[categories][populate][categories][populate][image]=*&populate[categories][populate][categories][populate][products]=*&populate[categories][populate][categories][populate][categories][populate]=*`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result.data;
    } catch (error) {
      throw error;
    }
  }
}
