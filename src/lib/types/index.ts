export interface Product {
  id: string;
  name: string;
  name_ar: string;
  description: string;
  description_ar: string;
  price: number;
  image: string;
  category: string;
  category_ar: string;
  stock: number;
  featured: boolean;
  created_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  user_id: string;
  items: CartItem[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  shipping_address: string;
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: "customer" | "admin";
}

export type Locale = "ar" | "en";
