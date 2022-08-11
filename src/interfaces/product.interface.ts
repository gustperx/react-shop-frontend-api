export interface ProductAttributes {
  title: string;
  price: string;
  model: string;
  brand: string;
  release_date: string;
  stores: string[];
  description?: string;
  slug?: string;
  tags?: string[];
  images?: string[];
}

export interface ProductModel extends ProductAttributes {
  id: string;
}
