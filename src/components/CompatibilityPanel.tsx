"use client";

import type { CompatResult, CompatStatus } from "@/lib/compatibility";
import { CheckCircle2, AlertTriangle, XCircle, HelpCircle } from "lucide-react";

const statusConfig: Record<
  CompatStatus,
  { label: string; color: string; icon: typeof CheckCircle2 }
> = {
  ok: {
    label: "เข้ากันได้",
    color: "text-green-700 bg-green-50 border-green-200",
    icon: CheckCircle2,
  },
  warning: {
    label: "ควรระวัง",
    color: "text-amber-700 bg-amber-50 border-amber-200",
    icon: AlertTriangle,
  },
  error: {
    label: "มีปัญหา",
    color: "text-red-700 bg-red-50 border-red-200",
    icon: XCircle,
  },
  unknown: {
    label: "ข้อมูลไม่ครบ",
    color: "text-slate-600 bg-slate-50 border-slate-200",
    icon: HelpCircle,
  },
};

interface Props {
  result: CompatResult;
}

export default function CompatibilityPanel({ result }: Props) {
  const config = statusConfig[result.overall];
  const Icon = config.icon;

  // แสดงเฉพาะ issue ที่ไม่ใช่ ok เพื่อไม่ให้รก
  const notable = result.issues.filter((i) => i.status !== "ok");
  const okCount = result.issues.filter((i) => i.status === "ok").length;

  return (
    <div className={`rounded-xl border p-4 ${config.color}`}>
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-5 h-5 shrink-0" />
        <h3 className="font-semibold">{config.label}</h3>
      </div>
      <p className="text-sm mb-3">{result.summary}</p>

      {okCount > 0 && (
        <p className="text-xs opacity-80 mb-2">
          ผ่านการตรวจ {okCount} รายการ
        </p>
      )}

      {notable.length > 0 && (
        <ul className="space-y-2">
          {notable.map((issue, idx) => {
            const ic = statusConfig[issue.status];
            const IIcon = ic.icon;
            return (
              <li
                key={`${issue.code}-${idx}`}
                className="flex items-start gap-2 text-sm"
              >
                <IIcon className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{issue.message}</span>
              </li>
            );
          })}
        </ul>
      )}

      <p className="text-xs mt-3 opacity-70">
        ตรวจโดยกฎระบบ SpecPilot — ไม่ใช่การตัดสินของ AI
      </p>
    </div>
  );
}
