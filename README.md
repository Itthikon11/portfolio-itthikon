# portfolio-itthikon

Portfolio ของ Itthikon Sakumkaew — React + Vite

## เริ่มใช้งาน

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # ไฟล์สำหรับ deploy อยู่ใน dist/
```

## แก้เนื้อหา

ข้อความทั้งหมด (EN/TH), ลิงก์ติดต่อ, ทักษะ และรายการโปรเจค อยู่ใน [`src/data/content.js`](src/data/content.js) ไฟล์เดียว

- **โปรเจค** — แก้ `PROJECTS` (ใส่ `image` เป็น path ใน `public/` และ `href` เป็นลิงก์ได้) เกิน 6 รายการจะแบ่งหน้าให้อัตโนมัติ
- **ลิงก์** — แก้ `LINKS` (GitHub / Gmail / LinkedIn)

## โครงสร้าง

| ส่วน | ไฟล์ | จุดเด่น |
| --- | --- | --- |
| Home | `sections/Home.jsx`, `IPod.jsx` | iPod แสดงรูป + เพลง กดวงล้อเพื่อ play/pause |
| Education | `sections/Education.jsx` | ทีวีที่จอเป็น `CRTWarp` shader + timeline |
| Skills | `sections/Skills.jsx` | จอ pixel `CRTWarp` + `BranchedMenu` |
| Projects | `sections/Projects.jsx` | กด `Folder` เพื่อเปิดดูกริดโปรเจค |
| Contact | `sections/Contact.jsx`, `cardCanvas.js` | บัตรห้อยคอ `Lanyard` (ลากได้ ด้านหลังมีข้อมูลติดต่อ) ฟอร์มจะเปิดแอปอีเมล |
| ทั้งหน้า | `App.jsx`, `Mascots.jsx` | พื้นหลัง `GradientWaves`, ตัวการ์ตูน 2 ตัวเด้งและตามองเมาส์ (กดแล้วกระโดด) |

คอมโพเนนต์จาก React Bits อยู่ใน `src/components/reactbits/`

ปุ่มพระจันทร์/พระอาทิตย์สลับธีมสว่าง/มืด ปุ่มธงสลับภาษา EN/TH (จำค่าไว้ใน localStorage)
