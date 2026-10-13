import Link from "next/link";
import {
  Cpu,
  Search,
  Wrench,
  GitCompare,
  Wallet,
  AlertTriangle,
} from "lucide-react";

const features = [
  {
    href: "/components",
    icon: Search,
    title: "ค้นหาอุปกรณ์",
    description: "ดูรายการ CPU, GPU, เมนบอร์ด, RAM และอุปกรณ์อื่นๆ",
  },
  {
    href: "/builder",
    icon: Wrench,
    title: "จัดสเปกคอมพิวเตอร์",
    description: "เลือกชิ้นส่วนและคำนวณงบประมาณได้ทันที โดยไม่ต้องสมัครสมาชิก",
  },
  {
    href: "/compare",
    icon: GitCompare,
    title: "เปรียบเทียบ",
    description: "เทียบสเปกระหว่างอุปกรณ์ 2 ชิ้นอย่างชัดเจน",
  },
  {
    href: "/budget",
    icon: Wallet,
    title: "จัดสเปกตามงบ",
    description: "เลือกงบ 10,000 / 20,000 / 30,000 บาท แล้วดูตัวอย่างสเปก",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 text-sm px-3 py-1 rounded-full mb-6">
              <Cpu className="w-4 h-4" />
              <span>SpecPilot — Thai PC Builder & Hardware Database</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
              จัดสเปกคอมพิวเตอร์
              <br />
              <span className="text-primary-100">ง่าย ชัดเจน ตรวจสอบได้</span>
            </h1>
            <p className="text-lg text-primary-100 mb-8 leading-relaxed">
              ค้นหา เปรียบเทียบ และจัดสเปกคอมพิวเตอร์สำหรับตลาดไทย
              ทั้งรุ่นเก่าและรุ่นใหม่ โดยเน้นข้อมูลที่มีแหล่งที่มาชัดเจน
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/builder" className="btn-primary bg-white text-primary-700 hover:bg-primary-50">
                เริ่มจัดสเปกเลย
              </Link>
              <Link href="/components" className="btn-secondary bg-transparent border-white/40 text-white hover:bg-white/10">
                ดูอุปกรณ์ทั้งหมด
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sample data warning */}
      <section className="bg-amber-50 border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-start gap-3 text-amber-800">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            <p className="text-sm leading-relaxed">
              <strong>สถานะปัจจุบัน (เฟส 1 เสร็จ / กำลังเข้าเฟส 2):</strong> ระบบใช้ข้อมูลตัวอย่างเท่านั้น
              ราคาและสเปกที่แสดงไม่ใช่ข้อมูลจริง
              จะเชื่อมต่อฐานข้อมูลจริงที่มีแหล่งที่มาในเฟสถัดไป
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
          ฟีเจอร์หลัก
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Link
                key={feature.href}
                href={feature.href}
                className="card p-6 hover:border-primary-300 group"
              >
                <div className="w-11 h-11 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center mb-4 group-hover:bg-primary-100 transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Principles */}
      <section className="bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            หลักการของโปรเจกต์
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">01</div>
              <h3 className="font-semibold mb-1">ข้อมูลตรวจสอบได้</h3>
              <p className="text-sm text-slate-600">
                ทุกราคาและ Benchmark ต้องมีแหล่งที่มาและเวลาตรวจสอบ
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">02</div>
              <h3 className="font-semibold mb-1">ไม่ต้องสมัครสมาชิก</h3>
              <p className="text-sm text-slate-600">
                จัดสเปกและบันทึกในเบราว์เซอร์ได้ทันที
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">03</div>
              <h3 className="font-semibold mb-1">ตลาดไทยเป็นหลัก</h3>
              <p className="text-sm text-slate-600">
                รองรับทั้งรุ่นเก่าและรุ่นใหม่ที่หาซื้อได้ในไทย
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
