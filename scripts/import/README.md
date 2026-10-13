# ระบบนำเข้าข้อมูล (Import Pipeline)

**แยกจาก Frontend โดยสิ้นเชิง**

## หลักการ

- รันฝั่ง Server / Local เท่านั้น
- ใช้ `SUPABASE_SERVICE_ROLE_KEY` (ห้ามส่งไป Client)
- ทุก record ราคาต้องมี `source_url` + `checked_at`
- ทุก record benchmark ต้องมี `source_url`
- บันทึกผลลง `import_logs`

## โครงสร้างที่วางแผน

```
scripts/import/
├── README.md           ← ไฟล์นี้
├── types.ts            ← Type สำหรับข้อมูลนำเข้า
├── validate.ts         ← ตรวจสอบ source_url, checked_at ฯลฯ
├── importers/
│   ├── components.ts
│   ├── prices.ts
│   └── benchmarks.ts
└── run.ts              ← entry point
```

## สถานะเฟส 2

- [x] Schema SQL
- [x] เอกสารกฎข้อมูล
- [ ] ตัว validate + importer (ขั้นตอนถัดไป)
- [ ] ตัวอย่างไฟล์ CSV/JSON ที่ถูกต้อง

## ตัวอย่างข้อมูลที่ถูกต้อง (ราคา)

```json
{
  "component_id": "uuid-here",
  "condition": "new",
  "price_thb": 12500,
  "shop_name": "ชื่อร้านจริง",
  "source_url": "https://example-shop.co.th/product/xxx",
  "checked_at": "2026-10-13T10:00:00+07:00"
}
```

## ตัวอย่างที่ถูกปฏิเสธ

- ไม่มี `source_url`
- ไม่มี `checked_at`
- ราคาเป็นค่าติดลบ
- URL ไม่ใช่ http/https
