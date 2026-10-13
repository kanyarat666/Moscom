-- SpecPilot Initial Schema
-- Phase 2: Database schema for Thai PC Builder
-- All price and benchmark data MUST have source_url + checked_at

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- ENUMS
-- ============================================================

CREATE TYPE component_category AS ENUM (
  'cpu',
  'gpu',
  'motherboard',
  'ram',
  'ssd',
  'psu',
  'case',
  'cooler'
);

CREATE TYPE ram_type AS ENUM ('DDR4', 'DDR5');
CREATE TYPE form_factor AS ENUM ('ATX', 'mATX', 'ITX', 'EATX');
CREATE TYPE storage_interface AS ENUM ('NVMe', 'SATA');
CREATE TYPE psu_modular AS ENUM ('Full', 'Semi', 'Non');
CREATE TYPE cooler_type AS ENUM ('Air', 'AIO');
CREATE TYPE price_condition AS ENUM ('new', 'used');
CREATE TYPE benchmark_type AS ENUM ('actual', 'estimated');

-- ============================================================
-- CORE COMPONENTS
-- ============================================================

CREATE TABLE components (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category      component_category NOT NULL,
  brand         TEXT NOT NULL,
  name          TEXT NOT NULL,
  model_number  TEXT,
  release_year  INT,
  is_active     BOOLEAN NOT NULL DEFAULT true,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_components_category ON components(category);
CREATE INDEX idx_components_brand ON components(brand);
CREATE INDEX idx_components_name ON components USING gin (to_tsvector('simple', name));

-- ============================================================
-- CPU SPECS
-- ============================================================

CREATE TABLE cpu_specs (
  component_id    UUID PRIMARY KEY REFERENCES components(id) ON DELETE CASCADE,
  socket          TEXT NOT NULL,
  cores           INT NOT NULL,
  threads         INT NOT NULL,
  base_clock_ghz  NUMERIC(4,2),
  boost_clock_ghz NUMERIC(4,2),
  tdp_watt        INT,
  igpu            TEXT,
  unlock_multiplier BOOLEAN DEFAULT false
);

-- ============================================================
-- GPU SPECS
-- ============================================================

CREATE TABLE gpu_specs (
  component_id    UUID PRIMARY KEY REFERENCES components(id) ON DELETE CASCADE,
  vram_gb         INT NOT NULL,
  memory_type     TEXT,
  tdp_watt        INT,
  length_mm       INT,
  slot_width      NUMERIC(3,1),
  power_connectors TEXT,
  chipset         TEXT
);

-- ============================================================
-- MOTHERBOARD SPECS
-- ============================================================

CREATE TABLE motherboard_specs (
  component_id    UUID PRIMARY KEY REFERENCES components(id) ON DELETE CASCADE,
  socket          TEXT NOT NULL,
  chipset         TEXT,
  form_factor     form_factor NOT NULL,
  ram_type        ram_type NOT NULL,
  ram_slots       INT,
  max_ram_gb      INT,
  max_ram_speed_mhz INT,
  m2_slots        INT,
  sata_ports      INT,
  wifi            BOOLEAN DEFAULT false
);

-- ============================================================
-- RAM SPECS
-- ============================================================

CREATE TABLE ram_specs (
  component_id    UUID PRIMARY KEY REFERENCES components(id) ON DELETE CASCADE,
  ram_type        ram_type NOT NULL,
  capacity_gb     INT NOT NULL,
  speed_mhz       INT NOT NULL,
  modules         INT NOT NULL DEFAULT 1,
  latency_cl      INT,
  voltage         NUMERIC(3,2)
);

-- ============================================================
-- SSD SPECS
-- ============================================================

CREATE TABLE ssd_specs (
  component_id      UUID PRIMARY KEY REFERENCES components(id) ON DELETE CASCADE,
  capacity_gb       INT NOT NULL,
  interface         storage_interface NOT NULL,
  form_factor       TEXT,
  read_speed_mbps   INT,
  write_speed_mbps  INT,
  dram_cache        BOOLEAN,
  tbw               INT
);

-- ============================================================
-- PSU SPECS
-- ============================================================

CREATE TABLE psu_specs (
  component_id    UUID PRIMARY KEY REFERENCES components(id) ON DELETE CASCADE,
  wattage         INT NOT NULL,
  efficiency      TEXT,
  modular         psu_modular NOT NULL DEFAULT 'Non',
  atx_version     TEXT,
  pcie_connectors INT
);

-- ============================================================
-- CASE SPECS
-- ============================================================

CREATE TABLE case_specs (
  component_id        UUID PRIMARY KEY REFERENCES components(id) ON DELETE CASCADE,
  form_factor_support form_factor[] NOT NULL,
  max_gpu_length_mm   INT,
  max_cooler_height_mm INT,
  radiator_support    TEXT[],
  included_fans       INT
);

-- ============================================================
-- COOLER SPECS
-- ============================================================

CREATE TABLE cooler_specs (
  component_id      UUID PRIMARY KEY REFERENCES components(id) ON DELETE CASCADE,
  cooler_type       cooler_type NOT NULL,
  socket_support    TEXT[] NOT NULL,
  tdp_support_watt  INT,
  height_mm         INT,
  radiator_size_mm  INT,
  fan_size_mm       INT
);

-- ============================================================
-- PRICES (มือหนึ่ง / มือสอง)
-- ทุกแถวต้องมี source_url + checked_at บังคับ
-- ============================================================

CREATE TABLE prices (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  component_id  UUID NOT NULL REFERENCES components(id) ON DELETE CASCADE,
  condition     price_condition NOT NULL DEFAULT 'new',
  price_thb     NUMERIC(12,2) NOT NULL CHECK (price_thb >= 0),
  currency      TEXT NOT NULL DEFAULT 'THB',
  shop_name     TEXT,
  source_url    TEXT NOT NULL,          -- บังคับ: แหล่งที่มา
  checked_at    TIMESTAMPTZ NOT NULL,  -- บังคับ: เวลาตรวจสอบ
  notes         TEXT,
  is_available  BOOLEAN DEFAULT true,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_prices_component ON prices(component_id);
CREATE INDEX idx_prices_checked_at ON prices(checked_at DESC);
CREATE INDEX idx_prices_condition ON prices(condition);

-- ============================================================
-- BENCHMARKS (FPS / คะแนน)
-- ทุกแถวต้องมี source_url
-- แยก actual vs estimated ชัดเจน
-- ============================================================

CREATE TABLE benchmarks (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  component_id    UUID NOT NULL REFERENCES components(id) ON DELETE CASCADE,
  -- อาจอ้างอิง GPU หรือ CPU เป็นหลัก
  game_name       TEXT NOT NULL,
  resolution      TEXT NOT NULL,          -- เช่น 1080p, 1440p, 4K
  settings        TEXT,                 -- เช่น Ultra, High, Medium
  api             TEXT,                 -- เช่น DX12, Vulkan
  fps_avg         NUMERIC(7,2),
  fps_1_low       NUMERIC(7,2),
  score           NUMERIC(12,2),        -- สำหรับ synthetic (Cinebench ฯลฯ)
  benchmark_type  benchmark_type NOT NULL DEFAULT 'actual',
  cpu_used        TEXT,                 -- CPU ที่ใช้ตอนทดสอบ (ถ้ามี)
  gpu_used        TEXT,
  source_url      TEXT NOT NULL,        -- บังคับ
  tested_at       DATE,                 -- วันที่ทดสอบ (ถ้าแหล่งเปิดเผย)
  notes           TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_benchmarks_component ON benchmarks(component_id);
CREATE INDEX idx_benchmarks_game ON benchmarks(game_name);
CREATE INDEX idx_benchmarks_type ON benchmarks(benchmark_type);

-- ============================================================
-- DATA SOURCES (ทะเบียนแหล่งข้อมูล)
-- ============================================================

CREATE TABLE data_sources (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL UNIQUE,
  base_url      TEXT,
  description   TEXT,
  is_trusted    BOOLEAN DEFAULT true,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- IMPORT LOGS (ติดตามการนำเข้าข้อมูล)
-- ============================================================

CREATE TABLE import_logs (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_name   TEXT NOT NULL,
  file_name     TEXT,
  records_total INT,
  records_ok    INT,
  records_fail  INT,
  status        TEXT NOT NULL DEFAULT 'pending',
  error_message TEXT,
  started_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  finished_at   TIMESTAMPTZ
);

-- ============================================================
-- UPDATED_AT TRIGGER
-- ============================================================

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_components_updated_at
  BEFORE UPDATE ON components
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ============================================================
-- COMMENTS (เอกสารในฐานข้อมูล)
-- ============================================================

COMMENT ON TABLE prices IS 'ราคามือหนึ่ง/มือสอง ทุกแถวต้องมี source_url และ checked_at';
COMMENT ON COLUMN prices.source_url IS 'URL แหล่งที่มาของราคา — บังคับ';
COMMENT ON COLUMN prices.checked_at IS 'เวลาที่ตรวจสอบราคานี้ — บังคับ';
COMMENT ON TABLE benchmarks IS 'ผล Benchmark แยก actual/estimated ชัดเจน ทุกแถวต้องมี source_url';
COMMENT ON COLUMN benchmarks.benchmark_type IS 'actual = ผลทดสอบจริง, estimated = ค่าประมาณ (ต้องระบุชัดใน UI)';
