export interface ProductResponse {
  id: string;
  title: string;
  price: number;
  description?: string;
  slug: string;
  model: string;
  release_date: number;
  tags: string[];
  brand: BrandResponse;
  stores: Store[];
  images: string[];
}

export interface Store {
  id: string;
  name: string;
  url: string;
}

export interface BrandResponse {
  id: string;
  name: string;
}

export interface ProductPagination {
  limit?: string;
  offset?: string;
  productTerm?: string;
  productDate?: string;
  productStore?: string;
  productBrand?: string;
}

export interface BrandResponse {
  id: string;
  name: string;
}

export interface StoreResponse {
  id: string;
  name: string;
  url: string;
  slug: string;
}
