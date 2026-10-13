import { AlertTriangle, Database, Shield, Cpu } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
        เกี่ยวกับ SpecPilot
      </h1>
      <p className="text-slate-600 leading-relaxed mb-8">
        SpecPilot เป็นโปรเจกต์ส่วนตัวสำหรับสร้างเว็บไซต์จัดสเปกคอมพิวเตอร์ภาษาไทย
        ที่เน้นความโปร่งใสของข้อมูลและการใช้งานง่ายโดยไม่ต้องสมัครสมาชิก
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary-600" />
          หลักการข้อมูล
        </h2>
        <ul className="space-y-3 text-slate-700">
          <li className="flex gap-2">
            <span className="text-primary-600 font-bold">•</span>
            ห้ามสร้างราคา FPS รุ่นสินค้า หรือ URL ปลอม
          </li>
          <li className="flex gap-2">
            <span className="text-primary-600 font-bold">•</span>
            ทุกข้อมูลราคาต้องมี source_url และ checked_at
          </li>
          <li className="flex gap-2">
            <span className="text-primary-600 font-bold">•</span>
            ทุก Benchmark ต้องมีแหล่งที่มาและรายละเอียดการทดสอบ
          </li>
          <li className="flex gap-2">
            <span className="text-primary-600 font-bold">•</span>
            แยกผลทดสอบจริงออกจากค่าประมาณอย่างชัดเจน
          </li>
          <li className="flex gap-2">
            <span className="text-primary-600 font-bold">•</span>
            ถ้าไม่มีข้อมูล จะแสดงว่า "ไม่มีข้อมูล"
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <Database className="w-5 h-5 text-primary-600" />
          สถานะปัจจุบัน
        </h2>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-sm text-amber-800">
            <p className="font-semibold mb-1">เฟส 1 เสร็จแล้ว — กำลังเข้าเฟส 2</p>
            <p>
              ขณะนี้ใช้ข้อมูลตัวอย่างเท่านั้น เพื่อสร้างและทดสอบหน้าเว็บ
              กำลังออกแบบ Schema ฐานข้อมูลจริง
            </p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <Cpu className="w-5 h-5 text-primary-600" />
          แผนพัฒนา
        </h2>
        <ol className="space-y-2 text-slate-700 list-decimal list-inside">
          <li>เฟส 1: โครงสร้างเว็บไซต์และหน้า UI ✅</li>
          <li>เฟส 2: Schema ฐานข้อมูลและระบบนำเข้าข้อมูล (กำลังทำ)</li>
          <li>เฟส 3: ระบบค้นหาและจัดสเปก (Compatibility Engine)</li>
          <li>เฟส 4: ระบบราคาและ Benchmark</li>
          <li>เฟส 5: ระบบ AI Assistant</li>
          <li>เฟส 6: การทดสอบและ Deploy</li>
        </ol>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-900 mb-4">
          Tech Stack
        </h2>
        <div className="flex flex-wrap gap-2">
          {[
            "Next.js App Router",
            "TypeScript",
            "Tailwind CSS",
            "Supabase",
            "Vercel",
            "GitHub",
          ].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
