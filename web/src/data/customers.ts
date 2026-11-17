/**
 * Customers as published on abhishekgroup.co.in/customer (a single logo collage, reviewed November 2026).
 * Names were read from that collage. VERIFY the entries marked `confirm` with the client before launch:
 * they were identified from logo marks rather than printed names.
 * Logos are intentionally not reproduced; add approved customer logo files here if the client supplies them.
 */
export interface Customer {
  name: string;
  /** True where the name was inferred from a logo mark and should be confirmed. */
  confirm?: boolean;
}

export const customers: Customer[] = [
  { name: "Ashok Leyland" },
  { name: "Bajaj" },
  { name: "Daimler" },
  { name: "Fiat Chrysler Automobiles" },
  { name: "Force Motors", confirm: true },
  { name: "Honda" },
  { name: "Hyundai" },
  { name: "Isuzu" },
  { name: "Kia" },
  { name: "Mahindra", confirm: true },
  { name: "Maruti Suzuki" },
  { name: "Mitsubishi Fuso", confirm: true },
  { name: "Nissan" },
  { name: "Renault" },
  { name: "Škoda", confirm: true },
  { name: "Suzuki" },
  { name: "Tata" },
  { name: "Toyota" },
  { name: "Volkswagen" },
  { name: "Volvo" },
  { name: "Havells" },
  { name: "Lumax" },
  { name: "Nippon" },
];

export const customersFootnote = "…and many more.";
