"use client";

import { useState } from "react";
import {
  sampleCPUs,
  sampleGPUs,
  sampleMotherboards,
  sampleRAMs,
  sampleSSDs,
  samplePSUs,
  sampleCases,
  sampleCoolers,
} from "@/lib/sample-data";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

const budgets = [
  { amount: 10000, label: "10,000 บาท" },
  { amount: 20000, label: "20,000 บาท" },
  { amount: 30000, label: "30,000 บาท" },
];

/**
 * ฟังก์ชันตัวอย่างเท่านั้น - ไม่ใช่คำแนะนำจริง
 * เฟส 3+ จะใช้กฎและข้อมูลจริง
 */
function getSampleBuildForBudget(budget: number) {
  // เลือกชิ้นส่วนตัวอย่างแบบง่ายๆ ตามงบ (ข้อมูลจำลอง)
  if (budget <= 10000) {
    return {
      cpu: sampleCPUs[0],
      motherboard: sampleMotherboards[0],
      ram: sampleRAMs[0],
      ssd: sampleSSDs[0],
      psu: samplePSUs[0],
      case: sampleCases[0],
      note: "สเปกตัวอย่างสำหรับงบประมาณต่ำ (ข้อมูลจำลอง)",
    };
  }
  if (budget <= 20000) {
    return {
      cpu: sampleCPUs[0],
      gpu: sampleGPUs[0],
      motherboard: sampleMotherboards[0],
      ram: sampleRAMs[0],
      ssd: sampleSSDs[0],
      psu: samplePSUs[0],
      case: sampleCases[0],
      cooler: sampleCoolers[0],
      note: "สเปกตัวอย่างสำหรับงบประมาณกลาง (ข้อมูลจำลอง)",
    };
  }
  return {
    cpu: sampleCPUs[1],
    gpu: sampleGPUs[1],
    motherboard: sampleMotherboards[0],
    ram: sampleRAMs[0],
    ssd: sampleSSDs[0],
    psu: samplePSUs[0],
    case: sampleCases[0],
    cooler: sampleCoolers[0],
    note: "สเปกตัวอย่างสำหรับงบประมาณสูง (ข้อมูลจำลอง)",
  };
}

export default function BudgetPage() {
  const [selectedBudget, setSelectedBudget] = useState(20000);
  const build = getSampleBuildForBudget(selectedBudget);

  const parts = [
    { label: "ซีพียู", item: build.cpu },
    { label: "การ์ดจอ", item: (build as any).gpu },
    { label: "เมนบอร์ด", item: build.motherboard },
    { label: "แรม", item: build.ram },
    { label: "SSD", item: build.ssd },
    { label: "พาวเวอร์", item: build.psu },
    { label: "เคส", item: build.case },
    { label: "คูลเลอร์", item: (build as any).cooler },
  ].filter((p) => p.item);

  const total = parts.reduce(
    (sum, p) => sum + (p.item?.samplePriceTHB ?? 0),
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
          จัดสเปกตามงบประมาณ
        </h1>
        <p className="text-slate-600">
          เลือกงบแล้วดูตัวอย่างสเปก (ยังเป็นข้อมูลจำลอง)
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <p className="text-sm text-amber-800">
          <strong>ข้อมูลตัวอย่าง:</strong> สเปกด้านล่างเป็นเพียงตัวอย่างเพื่อแสดง UI
          ไม่ใช่คำแนะนำจริง และยังไม่มีการตรวจความเข้ากันได้
        </p>
      </div>

      {/* เลือกงบ */}
      <div className="flex flex-wrap gap-3 mb-8">
        {budgets.map((b) => (
          <button
            key={b.amount}
            type="button"
            onClick={() => setSelectedBudget(b.amount)}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              selectedBudget === b.amount
                ? "bg-primary-600 text-white shadow-md"
                : "bg-white border border-slate-300 text-slate-700 hover:border-primary-300"
            }`}
          >
            {b.label}
          </button>
        ))}
      </div>

      {/* ผลลัพธ์ */}
      <div className="card p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              ตัวอย่างสเปกงบ {selectedBudget.toLocaleString("th-TH")} บาท
            </h2>
            <p className="text-sm text-amber-700 mt-1">{build.note}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-500">ราคารวมตัวอย่าง</p>
            <p className="text-2xl font-bold text-slate-900">
              ≈ {total.toLocaleString("th-TH")} บาท
            </p>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {parts.map((part) => (
            <div
              key={part.label}
              className="flex items-center justify-between py-3"
            >
              <div>
                <p className="text-xs text-slate-500">{part.label}</p>
                <p className="font-medium text-slate-800">{part.item.name}</p>
              </div>
              <p className="text-slate-700 font-medium">
                {part.item.samplePriceTHB
                  ? `≈ ${part.item.samplePriceTHB.toLocaleString("th-TH")} บาท`
                  : "—"}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-200 flex flex-wrap gap-3">
          <Link href="/builder" className="btn-primary text-sm">
            นำไปปรับในตัวจัดสเปก
          </Link>
          <span className="text-xs text-amber-600 self-center">
            [ข้อมูลตัวอย่าง - ไม่ใช่ข้อมูลจริง]
          </span>
        </div>
      </div>
    </div>
  );
}
