# SpecPilot - Thai PC Builder & Hardware Database

เว็บไซต์จัดสเปกคอมพิวเตอร์ภาษาไทย สำหรับค้นหา เปรียบเทียบ และจัดสเปกคอมพิวเตอร์ ครอบคลุมตลาดไทย

**ชื่อเว็บ:** SpecPilot  
**Repository:** Moscom (kanyarat666/Moscom)

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Supabase PostgreSQL (เฟส 2+)
- Vercel
- GitHub

## สถานะโปรเจกต์

**เฟสปัจจุบัน: เฟส 2 - Schema ฐานข้อมูลและระบบนำเข้าข้อมูล**

### เฟสทั้งหมด
1. ✅ โครงสร้างเว็บไซต์และหน้า UI
2. 🔄 Schema ฐานข้อมูลและระบบนำเข้าข้อมูล (กำลังทำ)
3. ⬜ ระบบค้นหาและจัดสเปก (Compatibility Engine)
4. ⬜ ระบบราคาและ Benchmark
5. ⬜ ระบบ AI Assistant
6. ⬜ การทดสอบและ Deploy

## หน้าที่มีในเฟส 1

| หน้า | Path | สถานะ |
|------|------|--------|
| หน้าแรก | `/` | ✅ |
| รายการอุปกรณ์ | `/components` | ✅ |
| จัดสเปก | `/builder` | ✅ (localStorage) |
| เปรียบเทียบ | `/compare` | ✅ |
| จัดตามงบ | `/budget` | ✅ |
| เกี่ยวกับ | `/about` | ✅ |

## การรันโปรเจกต์

```bash
git clone https://github.com/kanyarat666/Moscom.git
cd Moscom
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
- AI ห้ามตัดสินความเข้ากันได้คนเดียว ต้องใช้กฎระบบ

## License

Private / Personal use
