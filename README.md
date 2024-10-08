# Ecommerce Wpp

## Despliegue APP

La aplicación está desarrollada utilizando el framework de JavaScript, React, y emplea Vite como compilador/bundler. Para iniciar la aplicación en modo de desarrollo, debes ejecutar el siguiente comando en la terminal:

```bash
npm run dev
```

## Modelo de datos

Para la creación de una tienda eCommerce que se ajuste a cualquier API, debemos contar con un modelo de datos similar a este:

```typescript
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
    collection: Collection;
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
```

## Base de datos

La aplicación se conecta a un backend gestionado por Strapi, utilizando el modelo de datos descrito anteriormente. Actualmente, este backend no está desplegado en un entorno accesible por Internet, lo que significa que la aplicación no funcionará correctamente en producción debido a la falta de una URL pública para las peticiones API.

## Compilación

Para compilar la aplicación, ejecuta el siguiente comando en la terminal:

```bash
npm run build
```
