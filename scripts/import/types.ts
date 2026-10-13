/**
 * Types สำหรับข้อมูลที่จะนำเข้า (ก่อนเข้า DB)
 * ใช้ใน scripts/import เท่านั้น
 */

export type ImportPriceRow = {
  component_id: string;
  condition: "new" | "used";
  price_thb: number;
  shop_name?: string;
  source_url: string; // บังคับ
  checked_at: string; // บังคับ ISO 8601
  notes?: string;
  is_available?: boolean;
};

export type ImportBenchmarkRow = {
  component_id: string;
  game_name: string;
  resolution: string;
  settings?: string;
  api?: string;
  fps_avg?: number;
  fps_1_low?: number;
  score?: number;
  benchmark_type: "actual" | "estimated";
  cpu_used?: string;
  gpu_used?: string;
  source_url: string; // บังคับ
  tested_at?: string; // YYYY-MM-DD
  notes?: string;
};

export type ImportComponentRow = {
  category:
    | "cpu"
    | "gpu"
    | "motherboard"
    | "ram"
    | "ssd"
    | "psu"
    | "case"
    | "cooler";
  brand: string;
  name: string;
  model_number?: string;
  release_year?: number;
  // specs จะอยู่ใน object แยกตาม category
  specs: Record<string, unknown>;
};

export type ValidationError = {
  field: string;
  message: string;
};

export type ValidationResult =
  | { ok: true }
  | { ok: false; errors: ValidationError[] };
