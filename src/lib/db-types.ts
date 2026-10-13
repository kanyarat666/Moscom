/**
 * SpecPilot — Database Types (ตรงกับ Schema เฟส 2)
 * ใช้ทั้งฝั่ง Server และ Import scripts
 *
 * กฎ:
 * - prices ต้องมี source_url + checked_at เสมอ
 * - benchmarks ต้องมี source_url เสมอ
 * - benchmark_type แยก actual / estimated
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

export type RamType = "DDR4" | "DDR5";
export type FormFactor = "ATX" | "mATX" | "ITX" | "EATX";
export type StorageInterface = "NVMe" | "SATA";
export type PsuModular = "Full" | "Semi" | "Non";
export type CoolerType = "Air" | "AIO";
export type PriceCondition = "new" | "used";
export type BenchmarkType = "actual" | "estimated";

export interface DbComponent {
  id: string;
  category: ComponentCategory;
  brand: string;
  name: string;
  model_number: string | null;
  release_year: number | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface DbCpuSpecs {
  component_id: string;
  socket: string;
  cores: number;
  threads: number;
  base_clock_ghz: number | null;
  boost_clock_ghz: number | null;
  tdp_watt: number | null;
  igpu: string | null;
  unlock_multiplier: boolean;
}

export interface DbGpuSpecs {
  component_id: string;
  vram_gb: number;
  memory_type: string | null;
  tdp_watt: number | null;
  length_mm: number | null;
  slot_width: number | null;
  power_connectors: string | null;
  chipset: string | null;
}

export interface DbMotherboardSpecs {
  component_id: string;
  socket: string;
  chipset: string | null;
  form_factor: FormFactor;
  ram_type: RamType;
  ram_slots: number | null;
  max_ram_gb: number | null;
  max_ram_speed_mhz: number | null;
  m2_slots: number | null;
  sata_ports: number | null;
  wifi: boolean;
}

export interface DbRamSpecs {
  component_id: string;
  ram_type: RamType;
  capacity_gb: number;
  speed_mhz: number;
  modules: number;
  latency_cl: number | null;
  voltage: number | null;
}

export interface DbSsdSpecs {
  component_id: string;
  capacity_gb: number;
  interface: StorageInterface;
  form_factor: string | null;
  read_speed_mbps: number | null;
  write_speed_mbps: number | null;
  dram_cache: boolean | null;
  tbw: number | null;
}

export interface DbPsuSpecs {
  component_id: string;
  wattage: number;
  efficiency: string | null;
  modular: PsuModular;
  atx_version: string | null;
  pcie_connectors: number | null;
}

export interface DbCaseSpecs {
  component_id: string;
  form_factor_support: FormFactor[];
  max_gpu_length_mm: number | null;
  max_cooler_height_mm: number | null;
  radiator_support: string[] | null;
  included_fans: number | null;
}

export interface DbCoolerSpecs {
  component_id: string;
  cooler_type: CoolerType;
  socket_support: string[];
  tdp_support_watt: number | null;
  height_mm: number | null;
  radiator_size_mm: number | null;
  fan_size_mm: number | null;
}

/** ราคา — source_url และ checked_at บังคับ */
export interface DbPrice {
  id: string;
  component_id: string;
  condition: PriceCondition;
  price_thb: number;
  currency: string;
  shop_name: string | null;
  source_url: string; // บังคับ
  checked_at: string; // บังคับ ISO timestamp
  notes: string | null;
  is_available: boolean;
  created_at: string;
}

/** Benchmark — source_url บังคับ, แยก actual/estimated */
export interface DbBenchmark {
  id: string;
  component_id: string;
  game_name: string;
  resolution: string;
  settings: string | null;
  api: string | null;
  fps_avg: number | null;
  fps_1_low: number | null;
  score: number | null;
  benchmark_type: BenchmarkType;
  cpu_used: string | null;
  gpu_used: string | null;
  source_url: string; // บังคับ
  tested_at: string | null;
  notes: string | null;
  created_at: string;
}

export interface DbDataSource {
  id: string;
  name: string;
  base_url: string | null;
  description: string | null;
  is_trusted: boolean;
  created_at: string;
}

export interface DbImportLog {
  id: string;
  source_name: string;
  file_name: string | null;
  records_total: number | null;
  records_ok: number | null;
  records_fail: number | null;
  status: string;
  error_message: string | null;
  started_at: string;
  finished_at: string | null;
}
