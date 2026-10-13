/**
 * ข้อมูลตัวอย่างเท่านั้น
 * ========================
 * ไฟล์นี้ใช้สำหรับแสดง UI ในเฟส 1 เท่านั้น
 * ทุกข้อมูลติดป้าย isSampleData: true และ sampleNote
 * ห้ามนำข้อมูลนี้ไปแสดงเป็นข้อมูลจริงเด็ดขาด
 *
 * เฟส 2+ จะแทนที่ด้วยข้อมูลจากฐานข้อมูลจริงที่มี source_url + checked_at
 */

import type {
  CPU,
  GPU,
  Motherboard,
  RAM,
  SSD,
  PSU,
  Case,
  Cooler,
  AnyComponent,
} from "./types";

const SAMPLE_NOTE =
  "[ข้อมูลตัวอย่าง - ไม่ใช่ข้อมูลจริง] ใช้สำหรับแสดง UI เท่านั้น รอเชื่อมต่อฐานข้อมูลจริงในเฟสถัดไป"

export const sampleCPUs: CPU[] = [
  {
    id: "sample-cpu-1",
    name: "ตัวอย่างซีพียู รุ่น A",
    brand: "ตัวอย่างแบรนด์",
    category: "cpu",
    socket: "ตัวอย่าง Socket",
    cores: 6,
    threads: 12,
    baseClockGHz: 3.5,
    boostClockGHz: 4.5,
    tdpWatt: 65,
    samplePriceTHB: 5500,
    isSampleData: true,
    sampleNote: SAMPLE_NOTE,
  },
  {
    id: "sample-cpu-2",
    name: "ตัวอย่างซีพียู รุ่น B",
    brand: "ตัวอย่างแบรนด์",
    category: "cpu",
    socket: "ตัวอย่าง Socket",
    cores: 8,
    threads: 16,
    baseClockGHz: 3.8,
    boostClockGHz: 5.0,
    tdpWatt: 105,
    samplePriceTHB: 8900,
    isSampleData: true,
    sampleNote: SAMPLE_NOTE,
  },
];

export const sampleGPUs: GPU[] = [
  {
    id: "sample-gpu-1",
    name: "ตัวอย่างการ์ดจอ รุ่น X",
    brand: "ตัวอย่างแบรนด์",
    category: "gpu",
    vramGB: 8,
    tdpWatt: 160,
    lengthMm: 280,
    samplePriceTHB: 12500,
    isSampleData: true,
    sampleNote: SAMPLE_NOTE,
  },
  {
    id: "sample-gpu-2",
    name: "ตัวอย่างการ์ดจอ รุ่น Y",
    brand: "ตัวอย่างแบรนด์",
    category: "gpu",
    vramGB: 12,
    tdpWatt: 220,
    lengthMm: 320,
    samplePriceTHB: 18900,
    isSampleData: true,
    sampleNote: SAMPLE_NOTE,
  },
];

export const sampleMotherboards: Motherboard[] = [
  {
    id: "sample-mb-1",
    name: "ตัวอย่างเมนบอร์ด รุ่น M",
    brand: "ตัวอย่างแบรนด์",
    category: "motherboard",
    socket: "ตัวอย่าง Socket",
    formFactor: "ATX",
    ramType: "DDR5",
    maxRamGB: 128,
    samplePriceTHB: 4200,
    isSampleData: true,
    sampleNote: SAMPLE_NOTE,
  },
];

export const sampleRAMs: RAM[] = [
  {
    id: "sample-ram-1",
    name: "ตัวอย่างแรม 16GB",
    brand: "ตัวอย่างแบรนด์",
    category: "ram",
    type: "DDR5",
    capacityGB: 16,
    speedMHz: 5600,
    modules: 2,
    samplePriceTHB: 2800,
    isSampleData: true,
    sampleNote: SAMPLE_NOTE,
  },
];

export const sampleSSDs: SSD[] = [
  {
    id: "sample-ssd-1",
    name: "ตัวอย่าง SSD 1TB",
    brand: "ตัวอย่างแบรนด์",
    category: "ssd",
    capacityGB: 1000,
    interface: "NVMe",
    readSpeedMBps: 7000,
    samplePriceTHB: 3200,
    isSampleData: true,
    sampleNote: SAMPLE_NOTE,
  },
];

export const samplePSUs: PSU[] = [
  {
    id: "sample-psu-1",
    name: "ตัวอย่าง PSU 650W",
    brand: "ตัวอย่างแบรนด์",
    category: "psu",
    wattage: 650,
    efficiency: "80+ Gold",
    modular: "Full",
    samplePriceTHB: 3500,
    isSampleData: true,
    sampleNote: SAMPLE_NOTE,
  },
];

export const sampleCases: Case[] = [
  {
    id: "sample-case-1",
    name: "ตัวอย่างเคส Mid Tower",
    brand: "ตัวอย่างแบรนด์",
    category: "case",
    formFactorSupport: ["ATX", "mATX"],
    maxGpuLengthMm: 350,
    samplePriceTHB: 2200,
    isSampleData: true,
    sampleNote: SAMPLE_NOTE,
  },
];

export const sampleCoolers: Cooler[] = [
  {
    id: "sample-cooler-1",
    name: "ตัวอย่างคูลเลอร์ลม",
    brand: "ตัวอย่างแบรนด์",
    category: "cooler",
    type: "Air",
    socketSupport: ["ตัวอย่าง Socket"],
    tdpSupportWatt: 180,
    samplePriceTHB: 1500,
    isSampleData: true,
    sampleNote: SAMPLE_NOTE,
  },
];

export const allSampleComponents: AnyComponent[] = [
  ...sampleCPUs,
  ...sampleGPUs,
  ...sampleMotherboards,
  ...sampleRAMs,
  ...sampleSSDs,
  ...samplePSUs,
  ...sampleCases,
  ...sampleCoolers,
];

export function getSampleComponentsByCategory(
  category: string
): AnyComponent[] {
  return allSampleComponents.filter((c) => c.category === category);
}
