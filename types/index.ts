export interface Product {
  id: number | string;
  name: string;
  category: string;
  brand: string;
  image: string;
  description: string;
  features?: string[];
  specifications?: {
    [key: string]: string | undefined;
  };
}
