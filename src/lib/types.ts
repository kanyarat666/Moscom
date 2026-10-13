/**
 * Type definitions for Thai PC Builder
 * เฟส 1: โครงสร้างพื้นฐาน
 * เฟส 2+: จะขยายให้รองรับ Schema จริง
 */

export type ComponentCategory =
  | "cpu"
  | "gpu"
  | "motherboard"
  | "ram"
  | "ssd"
  | "psu"
  | "case"
  | "cooler";

export interface BaseComponent {
  id: string;
  name: string;
  brand: string;
  category: ComponentCategory;
  /** ราคาตัวอย่างเท่านั้น - ไม่ใช่ราคาจริง */
  samplePriceTHB?: number;
  /** ป้ายบอกว่าเป็นข้อมูลตัวอย่าง */
  isSampleData: true;
  /** หมายเหตุสำหรับข้อมูลตัวอย่าง */
  sampleNote: string;
}

export interface CPU extends BaseComponent {
  category: "cpu";
  socket: string;
  cores: number;
  threads: number;
  baseClockGHz: number;
  boostClockGHz: number;
  tdpWatt: number;
}

export interface GPU extends BaseComponent {
  category: "gpu";
  vramGB: number;
  tdpWatt: number;
  lengthMm: number;
}

export interface Motherboard extends BaseComponent {
  category: "motherboard";
  socket: string;
  formFactor: "ATX" | "mATX" | "ITX";
  ramType: "DDR4" | "DDR5";
  maxRamGB: number;
}

export interface RAM extends BaseComponent {
  category: "ram";
  type: "DDR4" | "DDR5";
  capacityGB: number;
  speedMHz: number;
  modules: number;
}

export interface SSD extends BaseComponent {
  category: "ssd";
  capacityGB: number;
  interface: "NVMe" | "SATA";
  readSpeedMBps?: number;
}

export interface PSU extends BaseComponent {
  category: "psu";
  wattage: number;
  efficiency: string;
  modular: "Full" | "Semi" | "Non";
}

export interface Case extends BaseComponent {
  category: "case";
  formFactorSupport: string[];
  maxGpuLengthMm: number;
}

export interface Cooler extends BaseComponent {
  category: "cooler";
  type: "Air" | "AIO";
  socketSupport: string[];
  tdpSupportWatt: number;
}

export type AnyComponent =
  | CPU
  | GPU
  | Motherboard
  | RAM
  | SSD
  | PSU
  | Case
  | Cooler;

export interface PCBuild {
  cpu?: CPU;
  gpu?: GPU;
  motherboard?: Motherboard;
  ram?: RAM;
  ssd?: SSD;
  psu?: PSU;
  case?: Case;
  cooler?: Cooler;
}

export const CATEGORY_LABELS: Record<ComponentCategory, string> = {
  cpu: "ซีพียู (CPU)",
  gpu: "การ์ดจอ (GPU)",
  motherboard: "เมนบอร์ด",
  ram: "แรม (RAM)",
  ssd: "เอสเอสดี (SSD)",
  psu: "พาวเวอร์ซัพพลาย",
  case: "เคส",
  cooler: "ชุดระบายความร้อน",
};
