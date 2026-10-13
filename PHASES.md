# SpecPilot — สถานะเฟส

อัปเดตล่าสุด: 2026-10-13

## เฟส 1: โครงสร้างเว็บไซต์และหน้า UI ✅

- Next.js 15 App Router + TypeScript + Tailwind
- หน้า Home, Components, Builder, Compare, Budget, About
- ชื่อเว็บ: **SpecPilot**
- ข้อมูลตัวอย่างติดป้ายชัดเจน
- localStorage สำหรับบันทึกสเปก

## เฟส 2: Schema ฐานข้อมูลและระบบนำเข้าข้อมูล 🔄

### เสร็จแล้ว
- [x] Schema SQL ครบ (components + specs + prices + benchmarks)
- [x] กฎบังคับ source_url + checked_at
- [x] TypeScript types ตรง Schema (`src/lib/db-types.ts`)
- [x] ระบบ validate ก่อน import (`scripts/import/validate.ts`)
- [x] ตัวอย่าง JSON รูปแบบถูกต้อง
- [x] เอกสาร supabase/ และ scripts/import/

### ยังไม่ทำ (ต้องมี Supabase project จริง)
- [ ] รัน migration บน Supabase จริง
- [ ] เขียน importer ที่ insert ลง DB
- [ ] นำเข้าข้อมูลจริงจากแหล่งที่อนุญาต

## เฟส 3: ระบบค้นหาและจัดสเปก ⬜
## เฟส 4: ระบบราคาและ Benchmark ⬜
## เฟส 5: ระบบ AI Assistant ⬜
## เฟส 6: การทดสอบและ Deploy ⬜
