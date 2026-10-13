"use client";

import { useState } from "react";
import { allSampleComponents } from "@/lib/sample-data";
import type { AnyComponent } from "@/lib/types";
import { CATEGORY_LABELS } from "@/lib/types";
import { AlertTriangle } from "lucide-react";

export default function ComparePage() {
  const [leftId, setLeftId] = useState("");
  const [rightId, setRightId] = useState("");

  const left = allSampleComponents.find((c) => c.id === leftId);
  const right = allSampleComponents.find((c) => c.id === rightId);

  const sameCategory =
    left && right && left.category === right.category;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
          เปรียบเทียบอุปกรณ์
        </h1>
        <p className="text-slate-600">
          เลือกอุปกรณ์ 2 ชิ้นเพื่อเปรียบเทียบสเปก (ข้อมูลตัวอย่าง)
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <p className="text-sm text-amber-800">
          <strong>ข้อมูลตัวอย่าง:</strong> การเปรียบเทียบนี้ใช้ข้อมูลจำลองเท่านั้น
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            อุปกรณ์ชิ้นที่ 1
          </label>
          <select
            value={leftId}
            onChange={(e) => setLeftId(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">— เลือกอุปกรณ์ —</option>
            {allSampleComponents.map((c) => (
              <option key={c.id} value={c.id}>
                [{CATEGORY_LABELS[c.category]}] {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            อุปกรณ์ชิ้นที่ 2
          </label>
          <select
            value={rightId}
            onChange={(e) => setRightId(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">— เลือกอุปกรณ์ —</option>
            {allSampleComponents.map((c) => (
              <option key={c.id} value={c.id}>
                [{CATEGORY_LABELS[c.category]}] {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {left && right ? (
        sameCategory ? (
          <div className="card overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-4 py-3 font-medium text-slate-600">
                    คุณสมบัติ
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-slate-900">
                    {left.name}
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-slate-900">
                    {right.name}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <CompareRow label="แบรนด์" a={left.brand} b={right.brand} />
                <CompareRow
                  label="หมวดหมู่"
                  a={CATEGORY_LABELS[left.category]}
                  b={CATEGORY_LABELS[right.category]}
                />
                <CompareRow
                  label="ราคาตัวอย่าง"
                  a={
                    left.samplePriceTHB
                      ? `≈ ${left.samplePriceTHB.toLocaleString("th-TH")} บาท`
                      : "ไม่มีข้อมูล"
                  }
                  b={
                    right.samplePriceTHB
                      ? `≈ ${right.samplePriceTHB.toLocaleString("th-TH")} บาท`
                      : "ไม่มีข้อมูล"
                  }
                />
                {/* แสดง field เพิ่มตาม category */}
                {left.category === "cpu" && (
                  <>
                    <CompareRow
                      label="Cores / Threads"
                      a={`${(left as any).cores} / ${(left as any).threads}`}
                      b={`${(right as any).cores} / ${(right as any).threads}`}
                    />
                    <CompareRow
                      label="Socket"
                      a={(left as any).socket}
                      b={(right as any).socket}
                    />
                    <CompareRow
                      label="TDP"
                      a={`${(left as any).tdpWatt}W`}
                      b={`${(right as any).tdpWatt}W`}
                    />
                  </>
                )}
                {left.category === "gpu" && (
                  <>
                    <CompareRow
                      label="VRAM"
                      a={`${(left as any).vramGB} GB`}
                      b={`${(right as any).vramGB} GB`}
                    />
                    <CompareRow
                      label="TDP"
                      a={`${(left as any).tdpWatt}W`}
                      b={`${(right as any).tdpWatt}W`}
                    />
                  </>
                )}
              </tbody>
            </table>
            <p className="px-4 py-3 text-xs text-amber-700 bg-amber-50 border-t border-amber-100">
              [ข้อมูลตัวอย่าง - ไม่ใช่ข้อมูลจริง]
            </p>
          </div>
        ) : (
          <div className="text-center py-12 text-slate-500">
            <p>กรุณาเลือกอุปกรณ์ในหมวดหมู่เดียวกันเพื่อเปรียบเทียบ</p>
          </div>
        )
      ) : (
        <div className="text-center py-12 text-slate-400">
          <p>เลือกอุปกรณ์ทั้งสองด้านเพื่อเริ่มเปรียบเทียบ</p>
        </div>
      )}
    </div>
  );
}

function CompareRow({
  label,
  a,
  b,
}: {
  label: string;
  a: string;
  b: string;
}) {
  return (
    <tr>
      <td className="px-4 py-3 text-slate-500 font-medium">{label}</td>
      <td className="px-4 py-3 text-slate-800">{a}</td>
      <td className="px-4 py-3 text-slate-800">{b}</td>
    </tr>
  );
}
