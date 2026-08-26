export interface Equipment {
  id: string;
  name: string;
  category: string;
  location: string;
  condition: "Excellent" | "Good" | "Fair";
  operatorAvailable: boolean;
  deliveryAvailable: boolean;
  rating: number;
  reviewCount: number;
  price: number;
  pricingModel: "per_day" | "per_hour" | "fixed" | "quote";
  image: string;
  verified: boolean;
  supplierName: string;
}

export const mockEquipment: Equipment[] = [
  {
    id: "eq-1",
    name: "CAT 320 Next Gen Excavator",
    category: "Excavator",
    location: "Monrovia, Montserrado",
    condition: "Excellent",
    operatorAvailable: true,
    deliveryAvailable: true,
    rating: 4.8,
    reviewCount: 24,
    price: 450,
    pricingModel: "per_day",
    image: "/images/cat_336_excavator.png",
    verified: true,
    supplierName: "Liberia Heavy Machinery Co.",
  },
  {
    id: "eq-2",
    name: "Volvo A40G Articulated Dump Truck",
    category: "Dump Truck",
    location: "Buchanan, Grand Bassa",
    condition: "Good",
    operatorAvailable: true,
    deliveryAvailable: false,
    rating: 4.5,
    reviewCount: 12,
    price: 600,
    pricingModel: "per_day",
    image: "/images/fleet_semi_truck.png",
    verified: true,
    supplierName: "Bassa Logistics & Transport",
  },
  {
    id: "eq-3",
    name: "40-Ton Lowbed Trailer",
    category: "Heavy Transport",
    location: "Freeport of Monrovia",
    condition: "Excellent",
    operatorAvailable: true,
    deliveryAvailable: true,
    rating: 4.9,
    reviewCount: 56,
    price: 800,
    pricingModel: "fixed",
    image: "/images/fleet_lowbed_trailer.png",
    verified: true,
    supplierName: "West Africa Freight & Haulage",
  },
  {
    id: "eq-4",
    name: "JCB 3CX Backhoe Loader",
    category: "Backhoe",
    location: "Paynesville, Montserrado",
    condition: "Good",
    operatorAvailable: false,
    deliveryAvailable: true,
    rating: 4.2,
    reviewCount: 8,
    price: 250,
    pricingModel: "per_day",
    image: "/images/fleet_loader.png",
    verified: false,
    supplierName: "Independent Contractor",
  },
  {
    id: "eq-5",
    name: "Komatsu D155A Bulldozer",
    category: "Bulldozer",
    location: "Ganta, Nimba",
    condition: "Fair",
    operatorAvailable: true,
    deliveryAvailable: false,
    rating: 4.0,
    reviewCount: 15,
    price: 0,
    pricingModel: "quote",
    image: "/images/komatsu_d65_bulldozer.png",
    verified: true,
    supplierName: "Nimba Earthmovers",
  }
];
