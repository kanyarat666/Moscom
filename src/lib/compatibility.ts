/**
 * SpecPilot — Compatibility Engine (กฎระบบ ไม่ใช่ AI)
 * เฟส 3
 *
 * หลักการ:
 * - ใช้กฎที่กำหนดชัดเจนเท่านั้น
 * - AI ห้ามตัดสินความเข้ากันได้คนเดียว
 * - ถ้าข้อมูลไม่พอ → สถานะ "unknown" ไม่ใช่ "compatible"
 */

import type { PCBuild, CPU, GPU, Motherboard, RAM, Case, Cooler, PSU } from "./types";

export type CompatStatus = "ok" | "warning" | "error" | "unknown";

export interface CompatIssue {
  status: CompatStatus;
  code: string;
  message: string;
  /** คู่ชิ้นส่วนที่เกี่ยวข้อง */
  parts: string[];
}

export interface CompatResult {
  overall: CompatStatus;
  issues: CompatIssue[];
  /** สรุปสั้นๆ ภาษาไทย */
  summary: string;
}

function statusRank(s: CompatStatus): number {
  switch (s) {
    case "error":
      return 3;
    case "warning":
      return 2;
    case "unknown":
      return 1;
    default:
      return 0;
  }
}

function worstStatus(statuses: CompatStatus[]): CompatStatus {
  return statuses.reduce(
    (worst, s) => (statusRank(s) > statusRank(worst) ? s : worst),
    "ok" as CompatStatus
  );
}

/**
 * ตรวจความเข้ากันได้ของสเปกทั้งหมด
 * ใช้ได้ทั้งกับ sample data และข้อมูลจริงในอนาคต
 */
export function checkCompatibility(build: PCBuild): CompatResult {
  const issues: CompatIssue[] = [];

  const cpu = build.cpu as CPU | undefined;
  const gpu = build.gpu as GPU | undefined;
  const mb = build.motherboard as Motherboard | undefined;
  const ram = build.ram as RAM | undefined;
  const pcCase = build.case as Case | undefined;
  const cooler = build.cooler as Cooler | undefined;
  const psu = build.psu as PSU | undefined;

  // 1. CPU ↔ Motherboard socket
  if (cpu && mb) {
    if (cpu.socket && mb.socket) {
      if (cpu.socket === mb.socket) {
        issues.push({
          status: "ok",
          code: "SOCKET_MATCH",
          message: `Socket ตรงกัน (${cpu.socket})`,
          parts: ["cpu", "motherboard"],
        });
      } else {
        issues.push({
          status: "error",
          code: "SOCKET_MISMATCH",
          message: `Socket ไม่ตรงกัน: CPU เป็น ${cpu.socket} แต่เมนบอร์ดเป็น ${mb.socket}`,
          parts: ["cpu", "motherboard"],
        });
      }
    } else {
      issues.push({
        status: "unknown",
        code: "SOCKET_UNKNOWN",
        message: "ไม่มีข้อมูล Socket ครบ จึงตรวจไม่ได้",
        parts: ["cpu", "motherboard"],
      });
    }
  }

  // 2. RAM type ↔ Motherboard
  if (ram && mb) {
    if (ram.type && mb.ramType) {
      if (ram.type === mb.ramType) {
        issues.push({
          status: "ok",
          code: "RAM_TYPE_MATCH",
          message: `ชนิดแรมตรงกัน (${ram.type})`,
          parts: ["ram", "motherboard"],
        });
      } else {
        issues.push({
          status: "error",
          code: "RAM_TYPE_MISMATCH",
          message: `ชนิดแรมไม่ตรงกัน: แรมเป็น ${ram.type} แต่เมนบอร์ดรองรับ ${mb.ramType}`,
          parts: ["ram", "motherboard"],
        });
      }
    } else {
      issues.push({
        status: "unknown",
        code: "RAM_TYPE_UNKNOWN",
        message: "ไม่มีข้อมูลชนิดแรมครบ จึงตรวจไม่ได้",
        parts: ["ram", "motherboard"],
      });
    }
  }

  // 3. GPU length ↔ Case
  if (gpu && pcCase) {
    if (gpu.lengthMm != null && pcCase.maxGpuLengthMm != null) {
      if (gpu.lengthMm <= pcCase.maxGpuLengthMm) {
        issues.push({
          status: "ok",
          code: "GPU_LENGTH_OK",
          message: `ความยาว GPU (${gpu.lengthMm} mm) อยู่ในเกณฑ์เคส (สูงสุด ${pcCase.maxGpuLengthMm} mm)`,
          parts: ["gpu", "case"],
        });
      } else {
        issues.push({
          status: "error",
          code: "GPU_LENGTH_EXCEEDED",
          message: `GPU ยาวเกินไป: ${gpu.lengthMm} mm แต่เคสรองรับสูงสุด ${pcCase.maxGpuLengthMm} mm`,
          parts: ["gpu", "case"],
        });
      }
    } else {
      issues.push({
        status: "unknown",
        code: "GPU_LENGTH_UNKNOWN",
        message: "ไม่มีข้อมูลความยาว GPU หรือเคสครบ จึงตรวจไม่ได้",
        parts: ["gpu", "case"],
      });
    }
  }

  // 4. Cooler socket support ↔ CPU
  if (cooler && cpu) {
    if (cooler.socketSupport?.length && cpu.socket) {
      const supported = cooler.socketSupport.includes(cpu.socket);
      if (supported) {
        issues.push({
          status: "ok",
          code: "COOLER_SOCKET_OK",
          message: `คูลเลอร์รองรับ Socket ${cpu.socket}`,
          parts: ["cooler", "cpu"],
        });
      } else {
        issues.push({
          status: "error",
          code: "COOLER_SOCKET_MISMATCH",
          message: `คูลเลอร์ไม่รองรับ Socket ${cpu.socket} (รองรับ: ${cooler.socketSupport.join(", ")})`,
          parts: ["cooler", "cpu"],
        });
      }
    } else {
      issues.push({
        status: "unknown",
        code: "COOLER_SOCKET_UNKNOWN",
        message: "ไม่มีข้อมูล Socket ของคูลเลอร์หรือ CPU ครบ จึงตรวจไม่ได้",
        parts: ["cooler", "cpu"],
      });
    }
  }

  // 5. Cooler TDP vs CPU TDP (warning ถ้าใกล้เกิน)
  if (cooler && cpu) {
    if (cooler.tdpSupportWatt != null && cpu.tdpWatt != null) {
      if (cpu.tdpWatt <= cooler.tdpSupportWatt) {
        issues.push({
          status: "ok",
          code: "COOLER_TDP_OK",
          message: `คูลเลอร์รองรับ TDP ได้ (${cooler.tdpSupportWatt}W ≥ CPU ${cpu.tdpWatt}W)`,
          parts: ["cooler", "cpu"],
        });
      } else {
        issues.push({
          status: "warning",
          code: "COOLER_TDP_LOW",
          message: `คูลเลอร์อาจระบายความร้อนไม่พอ: รองรับ ${cooler.tdpSupportWatt}W แต่ CPU ใช้ ${cpu.tdpWatt}W`,
          parts: ["cooler", "cpu"],
        });
      }
    }
  }

  // 6. PSU wattage estimate (คร่าวๆ)
  if (psu) {
    const estimatedDraw =
      (cpu?.tdpWatt ?? 0) + (gpu?.tdpWatt ?? 0) + 50; // +50W สำหรับชิ้นส่วนอื่นโดยประมาณ
    if (psu.wattage != null) {
      if (psu.wattage >= estimatedDraw * 1.2) {
        issues.push({
          status: "ok",
          code: "PSU_WATTAGE_OK",
          message: `กำลังไฟ PSU น่าจะเพียงพอ (PSU ${psu.wattage}W, ประมาณการใช้ ~${estimatedDraw}W)`,
          parts: ["psu"],
        });
      } else if (psu.wattage >= estimatedDraw) {
        issues.push({
          status: "warning",
          code: "PSU_WATTAGE_TIGHT",
          message: `กำลังไฟ PSU ค่อนข้างกระชั้น (PSU ${psu.wattage}W, ประมาณการใช้ ~${estimatedDraw}W) แนะนำเผื่อหัว`,
          parts: ["psu"],
        });
      } else {
        issues.push({
          status: "error",
          code: "PSU_WATTAGE_LOW",
          message: `กำลังไฟ PSU อาจไม่พอ (PSU ${psu.wattage}W, ประมาณการใช้ ~${estimatedDraw}W)`,
          parts: ["psu"],
        });
      }
    } else {
      issues.push({
        status: "unknown",
        code: "PSU_WATTAGE_UNKNOWN",
        message: "ไม่มีข้อมูลกำลังไฟ PSU จึงประเมินไม่ได้",
        parts: ["psu"],
      });
    }
  }

  // 7. Motherboard form factor ↔ Case (ถ้ามีข้อมูล)
  if (mb && pcCase) {
    if (mb.formFactor && pcCase.formFactorSupport?.length) {
      if (pcCase.formFactorSupport.includes(mb.formFactor)) {
        issues.push({
          status: "ok",
          code: "FORM_FACTOR_OK",
          message: `เคสรองรับ Form Factor ${mb.formFactor}`,
          parts: ["motherboard", "case"],
        });
      } else {
        issues.push({
          status: "error",
          code: "FORM_FACTOR_MISMATCH",
          message: `เคสไม่รองรับ Form Factor ${mb.formFactor} (รองรับ: ${pcCase.formFactorSupport.join(", ")})`,
          parts: ["motherboard", "case"],
        });
      }
    }
  }

  const overall = worstStatus(issues.map((i) => i.status));

  let summary = "ยังไม่ได้เลือกชิ้นส่วนเพียงพอที่จะตรวจ";
  if (issues.length > 0) {
    if (overall === "ok") summary = "ไม่พบปัญหาความเข้ากันได้จากกฎที่ตรวจสอบ";
    else if (overall === "warning") summary = "มีข้อควรระวังบางอย่าง";
    else if (overall === "error") summary = "พบปัญหาความเข้ากันได้ที่ต้องแก้ไข";
    else summary = "ข้อมูลไม่ครบ จึงตรวจได้บางส่วนเท่านั้น";
  }

  return { overall, issues, summary };
}
