export interface ProductAttributes {
  title: string;
  price: any;
  model: string;
  brand: string;
  release_date: any;
  stores: string[];
  description?: string;
  slug?: string;
  tags?: string[];
  images?: string[];
}

export interface ProductModel extends ProductAttributes {
  id: string;
}
