"use client";

import { useEffect, useState } from "react";
import ComponentCard from "@/components/ComponentCard";
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
import type { AnyComponent, ComponentCategory, PCBuild } from "@/lib/types";
import { CATEGORY_LABELS } from "@/lib/types";
import { AlertTriangle, Trash2, Save } from "lucide-react";

const STORAGE_KEY = "specpilot-pc-build";

const categoryOptions: {
  key: keyof PCBuild;
  category: ComponentCategory;
  items: AnyComponent[];
}[] = [
  { key: "cpu", category: "cpu", items: sampleCPUs },
  { key: "gpu", category: "gpu", items: sampleGPUs },
  { key: "motherboard", category: "motherboard", items: sampleMotherboards },
  { key: "ram", category: "ram", items: sampleRAMs },
  { key: "ssd", category: "ssd", items: sampleSSDs },
  { key: "psu", category: "psu", items: samplePSUs },
  { key: "case", category: "case", items: sampleCases },
  { key: "cooler", category: "cooler", items: sampleCoolers },
];

export default function BuilderPage() {
  const [build, setBuild] = useState<PCBuild>({});
  const [activeCategory, setActiveCategory] = useState<keyof PCBuild>("cpu");
  const [savedMessage, setSavedMessage] = useState("");

  // โหลดจาก localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setBuild(JSON.parse(raw));
      }
    } catch {
      // ignore
    }
  }, []);

  const selectComponent = (component: AnyComponent) => {
    const key = component.category as keyof PCBuild;
    setBuild((prev) => ({
      ...prev,
      [key]: component,
    }));
  };

  const removeComponent = (key: keyof PCBuild) => {
    setBuild((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const clearBuild = () => {
    setBuild({});
    localStorage.removeItem(STORAGE_KEY);
    setSavedMessage("ล้างสเปกแล้ว");
    setTimeout(() => setSavedMessage(""), 2000);
  };

  const saveBuild = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(build));
    setSavedMessage("บันทึกสเปกลงเบราว์เซอร์แล้ว");
    setTimeout(() => setSavedMessage(""), 2000);
  };

  const totalPrice = Object.values(build).reduce((sum, item) => {
    if (item && "samplePriceTHB" in item && item.samplePriceTHB) {
      return sum + item.samplePriceTHB;
    }
    return sum;
  }, 0);

  const activeItems =
    categoryOptions.find((c) => c.key === activeCategory)?.items ?? [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
          จัดสเปกคอมพิวเตอร์
        </h1>
        <p className="text-slate-600">
          เลือกชิ้นส่วนแล้วบันทึกลงเบราว์เซอร์ได้ทันที ไม่ต้องสมัครสมาชิก
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <p className="text-sm text-amber-800">
          <strong>เฟส 1:</strong> ยังไม่มีการตรวจความเข้ากันได้จริง
          และราคาเป็นตัวอย่างเท่านั้น จะเพิ่ม Compatibility Engine ในเฟส 3
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* สเปกปัจจุบัน */}
        <div className="lg:col-span-1">
          <div className="card p-5 sticky top-24">
            <h2 className="font-semibold text-lg mb-4">สเปกปัจจุบัน</h2>

            <div className="space-y-3 mb-6">
              {categoryOptions.map(({ key, category }) => {
                const item = build[key];
                return (
                  <div
                    key={key}
                    className="flex items-center justify-between text-sm border-b border-slate-100 pb-2"
                  >
                    <div className="min-w-0">
                      <p className="text-slate-500 text-xs">
                        {CATEGORY_LABELS[category]}
                      </p>
                      <p className="font-medium text-slate-800 truncate">
                        {item ? item.name : "— ยังไม่เลือก —"}
                      </p>
                    </div>
                    {item && (
                      <button
                        type="button"
                        onClick={() => removeComponent(key)}
                        className="text-slate-400 hover:text-red-500 p-1"
                        aria-label="ลบ"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="border-t border-slate-200 pt-4 mb-4">
              <div className="flex justify-between items-baseline">
                <span className="text-slate-600">งบประมาณรวม</span>
                <span className="text-xl font-bold text-slate-900">
                  {totalPrice > 0
                    ? `≈ ${totalPrice.toLocaleString("th-TH")} บาท`
                    : "—"}
                </span>
              </div>
              <p className="text-xs text-amber-600 mt-1">
                ราคาตัวอย่างเท่านั้น
              </p>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={saveBuild}
                className="btn-primary flex-1 flex items-center justify-center gap-2 text-sm"
              >
                <Save className="w-4 h-4" />
                บันทึก
              </button>
              <button
                type="button"
                onClick={clearBuild}
                className="btn-secondary text-sm"
              >
                ล้าง
              </button>
            </div>

            {savedMessage && (
              <p className="text-sm text-green-600 mt-3 text-center">
                {savedMessage}
              </p>
            )}
          </div>
        </div>

        {/* เลือกชิ้นส่วน */}
        <div className="lg:col-span-2">
          <div className="flex flex-wrap gap-2 mb-6">
            {categoryOptions.map(({ key, category }) => (
              <button
                key={key}
                type="button"
                onClick={() => setActiveCategory(key)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === key
                    ? "bg-primary-600 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {CATEGORY_LABELS[category]}
                {build[key] && " ✓"}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {activeItems.map((component) => (
              <ComponentCard
                key={component.id}
                component={component}
                selected={build[activeCategory]?.id === component.id}
                onSelect={selectComponent}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
