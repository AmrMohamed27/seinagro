export interface DepartmentObject {
  text: string;
  image: string;
  title: string;
  href: string;
  id: string;
}

export interface ProductObject {
  id: string;
  title: string;
  text: string;
  video: string;
  href: string;
}

export type Department =
  | "production"
  | "rnd"
  | "sales"
  | "silos"
  | "fridges"
  | "administration";

export type Product = "summer" | "winter" | "seeds";
