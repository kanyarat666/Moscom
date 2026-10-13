# SpecPilot Database (Supabase / PostgreSQL)

## เฟส 2 — Schema และระบบนำเข้าข้อมูล

### โครงสร้างตารางหลัก

| ตาราง | คำอธิบาย |
|--------|----------|
| `components` | อุปกรณ์ทั้งหมด (CPU, GPU, MB, RAM, SSD, PSU, Case, Cooler) |
| `cpu_specs` | สเปกเฉพาะ CPU |
| `gpu_specs` | สเปกเฉพาะ GPU |
| `motherboard_specs` | สเปกเมนบอร์ด |
| `ram_specs` | สเปกแรม |
| `ssd_specs` | สเปก SSD |
| `psu_specs` | สเปก PSU |
| `case_specs` | สเปกเคส |
| `cooler_specs` | สเปกคูลเลอร์ |
| `prices` | ราคามือหนึ่ง/มือสอง (**บังคับ** source_url + checked_at) |
| `benchmarks` | FPS / คะแนน (**บังคับ** source_url, แยก actual/estimated) |
| `data_sources` | ทะเบียนแหล่งข้อมูล |
| `import_logs` | บันทึกการนำเข้า |

### กฎเหล็กของข้อมูล

1. **ห้าม** insert ราคาโดยไม่มี `source_url` และ `checked_at`
2. **ห้าม** insert benchmark โดยไม่มี `source_url`
3. แยก `benchmark_type = 'actual'` กับ `'estimated'` ชัดเจน
4. ถ้าไม่มีข้อมูล → แสดง "ไม่มีข้อมูล" ใน UI (ไม่สร้างข้อมูลปลอม)

### วิธีรัน Migration

1. สร้างโปรเจกต์บน [Supabase](https://supabase.com)
2. ไปที่ SQL Editor
3. วางเนื้อหาจาก `migrations/001_initial_schema.sql` แล้ว Run
4. หรือใช้ Supabase CLI:

```bash
npx supabase db push
```

### ตัวแปร Environment

คัดลอกจาก `.env.example`:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...   # ใช้เฉพาะฝั่ง Server / Import เท่านั้น
```

**ห้าม** ใส่ `SUPABASE_SERVICE_ROLE_KEY` ใน client code
