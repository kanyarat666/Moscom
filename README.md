# Moscom - Thai PC Builder & Hardware Database

เว็บไซต์จัดสเปกคอมพิวเตอร์ภาษาไทย สำหรับค้นหา เปรียบเทียบ และจัดสเปกคอมพิวเตอร์ ครอบคลุมตลาดไทย

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Supabase PostgreSQL (เฟส 2+)
- Vercel

## สถานะโปรเจกต์

**เฟสปัจจุบัน: เฟส 1 - โครงสร้างเว็บไซต์และหน้า UI**

### เฟสทั้งหมด
1. โครงสร้างเว็บไซต์และหน้า UI (กำลังทำ)
2. Schema ฐานข้อมูลและระบบนำเข้าข้อมูล
3. ระบบค้นหาและจัดสเปก
4. ระบบราคาและ Benchmark
5. ระบบ AI Assistant
6. การทดสอบและ Deploy

## การรันโปรเจกต์

```bash
npm install
npm run dev
```

เปิด http://localhost:3000

## กฎข้อมูลสำคัญ

- ห้ามสร้างราคา / FPS / รุ่น / URL ปลอม
- ข้อมูลตัวอย่างต้องติดป้ายชัดเจน `[ข้อมูลตัวอย่าง - ไม่ใช่ข้อมูลจริง]`
- ทุกข้อมูลจริงต้องมี `source_url` + `checked_at`
- ไม่มีระบบล็อกอิน
- เก็บสเปกใน Browser (localStorage)

## License

Private / Personal use
