export type Product = {
  id: number;
  attributes: {
    name: string;
    description: string;
    price: number;
    discount_price: number;
    images: Images;
    sku: string;
    stock: number;
    categories: Category[];
    variations: Variation;
    brand: Brand;
    colection: Collection;
    isFavorite: boolean;
  };
};

export type CartItem = {
  cartId: string;
  productId: number;
  variationId?: number;
  quantity: number;
};

export type Images = {
  data: {
    attributes: {
      url: string;
      name: string;
    };
  }[];
};

export type Image = {
  data: {
    attributes: {
      url: string;
      name: string;
    };
  };
};

export type Category = {
  id: number;
  attributes: {
    name: string;
    description: string;
    image: Image;
    slug: string;
    categories?: {
      data: Category[];
    };

    parent?: {
      data: Category;
    };
  };
};

export type Variation = {
  data: {
    id: number;
    attributes: {
      name: string;
      description: string;
      sku: string;
      price: number;
      discount_price: number;
      stock: number;
      attributes: Attribute;
      attribute_values: AttributeValue;
      images: Images;
      product: {
        data: Product;
      };
    };
  }[];
};

export type Attribute = {
  data: {
    id: number;
    attributes: {
      name: string;
    };
  }[];
};

export type AttributeValue = {
  data: {
    id: number;
    attributes: {
      value: string;
    };
  }[];
};

export type Brand = {
  name: string;
  icon: Image;
  slug: string;
  products: Product[];
};

export type Collection = {
  name: string;
  image: Image;
  slug: string;
  products: Product[];
};
