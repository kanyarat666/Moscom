import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Moscom - จัดสเปกคอมพิวเตอร์ภาษาไทย",
  description:
    "เว็บไซต์ค้นหา เปรียบเทียบ และจัดสเปกคอมพิวเตอร์ สำหรับตลาดไทย เน้นข้อมูลที่ตรวจสอบแหล่งที่มาได้",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className="min-h-screen flex flex-col antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
