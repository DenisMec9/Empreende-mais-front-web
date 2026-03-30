import { Inventory } from "@/types/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchInventory = async (): Promise<Inventory[]> => {
  const response = await fetch(`${API_URL}api/v1/inventory`);

  if (!response.ok) {
    throw new Error(`Erro ao buscar estoque: ${response.statusText}`);
  }

  const data: Inventory[] = await response.json();
  return data;
};
