import type { AnyComponent } from "@/lib/types";
import { CATEGORY_LABELS } from "@/lib/types";

interface ComponentCardProps {
  component: AnyComponent;
  onSelect?: (component: AnyComponent) => void;
  selected?: boolean;
}

export default function ComponentCard({
  component,
  onSelect,
  selected = false,
}: ComponentCardProps) {
  return (
    <div
      className={`card p-4 flex flex-col gap-3 ${
        selected ? "ring-2 ring-primary-500 border-primary-300" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
            {CATEGORY_LABELS[component.category]}
          </span>
          <h3 className="font-semibold text-slate-900 mt-0.5 leading-snug">
            {component.name}
          </h3>
          <p className="text-sm text-slate-500">{component.brand}</p>
        </div>
        <span className="badge-sample shrink-0">ข้อมูลตัวอย่าง</span>
      </div>

      <div className="text-sm text-slate-600 space-y-1">
        {component.category === "cpu" && (
          <>
            <p>Cores / Threads: {(component as any).cores} / {(component as any).threads}</p>
            <p>Socket: {(component as any).socket}</p>
            <p>TDP: {(component as any).tdpWatt}W</p>
          </>
        )}
        {component.category === "gpu" && (
          <>
            <p>VRAM: {(component as any).vramGB} GB</p>
            <p>TDP: {(component as any).tdpWatt}W</p>
            <p>ความยาว: {(component as any).lengthMm} mm</p>
          </>
        )}
        {component.category === "motherboard" && (
          <>
            <p>Socket: {(component as any).socket}</p>
            <p>Form Factor: {(component as any).formFactor}</p>
            <p>RAM: {(component as any).ramType}</p>
          </>
        )}
        {component.category === "ram" && (
          <>
            <p>ความจุ: {(component as any).capacityGB} GB</p>
            <p>ความเร็ว: {(component as any).speedMHz} MHz</p>
            <p>ชนิด: {(component as any).type}</p>
          </>
        )}
        {component.category === "ssd" && (
          <>
            <p>ความจุ: {(component as any).capacityGB} GB</p>
            <p>Interface: {(component as any).interface}</p>
          </>
        )}
        {component.category === "psu" && (
          <>
            <p>กำลังไฟ: {(component as any).wattage}W</p>
            <p>ประสิทธิภาพ: {(component as any).efficiency}</p>
          </>
        )}
        {component.category === "case" && (
          <>
            <p>รองรับ: {(component as any).formFactorSupport?.join(", ")}</p>
            <p>GPU สูงสุด: {(component as any).maxGpuLengthMm} mm</p>
          </>
        )}
        {component.category === "cooler" && (
          <>
            <p>ชนิด: {(component as any).type}</p>
            <p>รองรับ TDP: {(component as any).tdpSupportWatt}W</p>
          </>
        )}
      </div>

      <div className="mt-auto pt-2 border-t border-slate-100 flex items-center justify-between">
        <div>
          {component.samplePriceTHB != null ? (
            <p className="font-semibold text-slate-800">
              ≈ {component.samplePriceTHB.toLocaleString("th-TH")} บาท
              <span className="text-xs font-normal text-amber-600 ml-1">(ตัวอย่าง)</span>
            </p>
          ) : (
            <p className="text-sm text-slate-400">ไม่มีข้อมูลราคา</p>
          )}
        </div>

        {onSelect && (
          <button
            type="button"
            onClick={() => onSelect(component)}
            className={`text-sm font-medium px-3 py-1.5 rounded-lg transition-colors ${
              selected
                ? "bg-primary-100 text-primary-700"
                : "bg-slate-100 hover:bg-slate-200 text-slate-700"
            }`}
          >
            {selected ? "เลือกแล้ว" : "เลือก"}
          </button>
        )}
      </div>

      <p className="text-xs text-amber-700/80 leading-snug">{component.sampleNote}</p>
    </div>
  );
}
