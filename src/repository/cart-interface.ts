export interface CartItem {
  idProduto: number;
  name: string;
  price: number;
  quantity: number;
}

export interface CartService {
  addItem: (item: CartItem) => Promise<void> | void;
  deleteItem: (idProduct: number) => Promise<void> | void;
  updateQtdItem: (idProduct: number, quantity: number) => Promise<void> | void;
  getItems: () => Promise<CartItem[]> | CartItem[];
  clearItems: () => Promise<void> | void;
}
