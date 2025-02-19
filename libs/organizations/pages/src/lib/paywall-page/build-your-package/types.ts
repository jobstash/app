export interface Position {
  x: number;
  y: number;
}

export interface PriceSelection {
  id: string;
  title: string;
  price: number;
}

export interface Tier {
  title: string;
  price: number;
}

export interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  section: string;
  price: number | Tier[];
}
