import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-3">SpecPilot</h3>
            <p className="text-sm leading-relaxed">
              เว็บไซต์จัดสเปกคอมพิวเตอร์ภาษาไทย
              สำหรับค้นหา เปรียบเทียบ และจัดสเปก
              โดยเน้นข้อมูลที่ตรวจสอบแหล่งที่มาได้
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">เมนู</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/components" className="hover:text-white transition-colors">
                  อุปกรณ์ทั้งหมด
                </Link>
              </li>
              <li>
                <Link href="/builder" className="hover:text-white transition-colors">
                  จัดสเปกคอมพิวเตอร์
                </Link>
              </li>
              <li>
                <Link href="/budget" className="hover:text-white transition-colors">
                  จัดสเปกตามงบ
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  เกี่ยวกับโปรเจกต์
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">หมายเหตุสำคัญ</h4>
            <p className="text-sm leading-relaxed text-amber-200/90">
              ขณะนี้ระบบใช้ข้อมูลตัวอย่างเท่านั้น
              ยังไม่มีราคาหรือ Benchmark จริง
              จะเชื่อมต่อฐานข้อมูลจริงในเฟสถัดไป
            </p>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} SpecPilot — Thai PC Builder & Hardware Database
        </div>
      </div>
    </footer>
  );
}
