# SpecPilot — สถานะเฟส

อัปเดตล่าสุด: 2026-10-13

## เฟส 1: โครงสร้างเว็บไซต์และหน้า UI ✅

- Next.js 15 App Router + TypeScript + Tailwind
- ชื่อเว็บ: **SpecPilot**
- หน้า Home, Components, Builder, Compare, Budget, About
- ข้อมูลตัวอย่างติดป้ายชัดเจน
- localStorage สำหรับบันทึกสเปก

## เฟส 2: Schema ฐานข้อมูลและระบบนำเข้าข้อมูล ✅ (โครงสร้าง)

- [x] Schema SQL ครบ
- [x] กฎบังคับ source_url + checked_at
- [x] TypeScript types + validate import
- [ ] รันบน Supabase จริง (รอคุณสร้างโปรเจกต์)

**SQL ที่ต้องรันใน Supabase:** ดูไฟล์
`supabase/migrations/001_initial_schema.sql`

## เฟส 3: ระบบค้นหาและจัดสเปก 🔄

- [x] Compatibility Engine (กฎระบบ)
  - Socket CPU ↔ Motherboard
  - RAM type ↔ Motherboard
  - GPU length ↔ Case
  - Cooler socket + TDP ↔ CPU
  - PSU wattage estimate
  - Form factor MB ↔ Case
- [x] แสดงผลในหน้า Builder
- [ ] เชื่อมข้อมูลจาก Supabase (เมื่อมี DB จริง)
- [ ] ค้นหา/กรองจาก DB จริง

## เฟส 4: ระบบราคาและ Benchmark ⬜
## เฟส 5: ระบบ AI Assistant ⬜
## เฟส 6: การทดสอบและ Deploy ⬜
