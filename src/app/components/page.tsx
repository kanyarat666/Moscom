"use client";

import { useState } from "react";
import ComponentCard from "@/components/ComponentCard";
import { allSampleComponents } from "@/lib/sample-data";
import { CATEGORY_LABELS, type ComponentCategory } from "@/lib/types";
import { AlertTriangle } from "lucide-react";

const categories: (ComponentCategory | "all")[] = [
  "all",
  "cpu",
  "gpu",
  "motherboard",
  "ram",
  "ssd",
  "psu",
  "case",
  "cooler",
];

export default function ComponentsPage() {
  const [selectedCategory, setSelectedCategory] = useState<
    ComponentCategory | "all"
  >("all");
  const [search, setSearch] = useState("");

  const filtered = allSampleComponents.filter((c) => {
    const matchCategory =
      selectedCategory === "all" || c.category === selectedCategory;
    const matchSearch =
      search === "" ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.brand.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
          รายการอุปกรณ์
        </h1>
        <p className="text-slate-600">
          ค้นหาและกรองอุปกรณ์คอมพิวเตอร์ (ข้อมูลตัวอย่างเท่านั้น)
        </p>
      </div>

      {/* Warning */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <p className="text-sm text-amber-800">
          <strong>ข้อมูลตัวอย่าง:</strong> รายการด้านล่างเป็นข้อมูลจำลองเพื่อแสดง UI
          เท่านั้น ยังไม่มีราคาหรือสเปกจริงจากร้านค้าไทย
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="search"
          placeholder="ค้นหาชื่อหรือแบรนด์..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === cat
                ? "bg-primary-600 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {cat === "all" ? "ทั้งหมด" : CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-sm text-slate-500 mb-4">
        พบ {filtered.length} รายการ
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-500">
          <p>ไม่พบอุปกรณ์ที่ตรงกับเงื่อนไข</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((component) => (
            <ComponentCard key={component.id} component={component} />
          ))}
        </div>
      )}
    </div>
  );
}
