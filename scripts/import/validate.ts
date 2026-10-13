/**
 * ตรวจสอบข้อมูลก่อนนำเข้า
 * กฎเหล็ก: source_url + checked_at สำหรับราคา, source_url สำหรับ benchmark
 */

import type {
  ImportPriceRow,
  ImportBenchmarkRow,
  ValidationResult,
  ValidationError,
} from "./types";

function isValidUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

function isValidIsoDate(value: string): boolean {
  const d = new Date(value);
  return !Number.isNaN(d.getTime());
}

export function validatePriceRow(row: ImportPriceRow): ValidationResult {
  const errors: ValidationError[] = [];

  if (!row.component_id || typeof row.component_id !== "string") {
    errors.push({ field: "component_id", message: "ต้องระบุ component_id" });
  }

  if (row.condition !== "new" && row.condition !== "used") {
    errors.push({ field: "condition", message: "ต้องเป็น new หรือ used" });
  }

  if (typeof row.price_thb !== "number" || row.price_thb < 0) {
    errors.push({ field: "price_thb", message: "ราคาต้องเป็นตัวเลข >= 0" });
  }

  if (!row.source_url || !isValidUrl(row.source_url)) {
    errors.push({
      field: "source_url",
      message: "ต้องมี source_url ที่เป็น http/https URL ที่ถูกต้อง",
    });
  }

  if (!row.checked_at || !isValidIsoDate(row.checked_at)) {
    errors.push({
      field: "checked_at",
      message: "ต้องมี checked_at เป็น ISO 8601 timestamp ที่ถูกต้อง",
    });
  }

  return errors.length === 0 ? { ok: true } : { ok: false, errors };
}

export function validateBenchmarkRow(
  row: ImportBenchmarkRow
): ValidationResult {
  const errors: ValidationError[] = [];

  if (!row.component_id) {
    errors.push({ field: "component_id", message: "ต้องระบุ component_id" });
  }

  if (!row.game_name?.trim()) {
    errors.push({ field: "game_name", message: "ต้องระบุชื่อเกม/การทดสอบ" });
  }

  if (!row.resolution?.trim()) {
    errors.push({ field: "resolution", message: "ต้องระบุความละเอียด" });
  }

  if (row.benchmark_type !== "actual" && row.benchmark_type !== "estimated") {
    errors.push({
      field: "benchmark_type",
      message: "ต้องเป็น actual หรือ estimated",
    });
  }

  if (!row.source_url || !isValidUrl(row.source_url)) {
    errors.push({
      field: "source_url",
      message: "ต้องมี source_url ที่เป็น http/https URL ที่ถูกต้อง",
    });
  }

  // ต้องมีอย่างน้อย fps หรือ score
  if (
    row.fps_avg == null &&
    row.fps_1_low == null &&
    row.score == null
  ) {
    errors.push({
      field: "fps_avg|score",
      message: "ต้องมี fps_avg, fps_1_low หรือ score อย่างน้อยหนึ่งค่า",
    });
  }

  return errors.length === 0 ? { ok: true } : { ok: false, errors };
}
