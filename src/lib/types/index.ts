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
  origin: string;
  origin_ar: string;
  weight: string;
  weight_ar: string;
  stock: number;
  featured: boolean;
  badge?: string;
  badge_ar?: string;
  rating: number;
  reviews: number;
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

export interface Testimonial {
  id: number;
  name: string;
  name_ar: string;
  role: string;
  role_ar: string;
  content: string;
  content_ar: string;
  rating: number;
  avatar: string;
}
