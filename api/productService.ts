import { Product } from "../types/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchProductById(id: number): Promise<Product> {
  const response = await fetch(`${API_URL}api/v1/products/${id}`);

  if (!response.ok) {
    throw new Error(`Erro ao buscar produto (status ${response.status})`);
  }

  const data: Product = await response.json();
  return data;
}
