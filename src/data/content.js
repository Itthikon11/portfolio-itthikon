// All text and links shown on the site live here. Edit this file to update the portfolio.

export const PHOTO = '/images/32c063d4-3fb5-4df0-850d-ffdb9a1e3324.png';

const EMAIL = 'itthikon.sa11@gmail.com';

// Opens Gmail's compose window in a new tab — mailto: does nothing for visitors without a mail app set up.
export const composeMail = ({ subject, body } = {}) => {
  const params = new URLSearchParams({ view: 'cm', fs: '1', to: EMAIL });
  if (subject) params.set('su', subject);
  if (body) params.set('body', body);
  return `https://mail.google.com/mail/?${params}`;
};

export const LINKS = {
  github: { handle: 'Itthikon11', href: 'https://github.com/Itthikon11' },
  email: { handle: EMAIL, href: composeMail() },
  linkedin: { handle: 'Itthikon Sakunkaew', href: 'https://www.linkedin.com/in/itthikon/' }
};

// Shown on the iPod screen in place of a track: a two-line title and a small "open to" tag.
export const SONG = { title: 'Full-Stack', subtitle: 'Developer', tag: 'Hybrid · On-site', duration: 159 }; // seconds

export const SKILLS = [
  [
    { label: 'Frontend', items: ['React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Flutter', 'Dart'] },
    { label: 'Backend', items: ['Java', 'PHP', 'Node.js', 'Express.js'] }
  ],
  [
    { label: 'Database', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Supabase', 'Firebase'] },
    { label: 'Tools & Others', items: ['Docker', 'Github', 'Postman', 'Vite', 'Figma', 'Database Modeling', 'Visual Studio Code'] }
  ],
  [{ label: 'Artificial Intelligence', items: ['Claude Code', 'ChatGPT', 'GitHub Copilot', 'Gemini'] }]
];

// Projects shown in the gallery. Text fields take { en, th }; `title` may be a plain string.
// - `accent`: [light, deep] colours for the card art (white text sits on the deep end), `glyph`: an icon name from components/Icons
// - `tags`: up to 4 shown on the card; `stack`: the full tool list in the detail view
// - `features` / `highlights` items are a string or [bold lead, rest]
// - `image` (optional) replaces the card art — put files in public/images/projects/
export const PROJECTS = [
  {
    title: 'Solar Smart Energy',
    glyph: 'sun',
    accent: ['#fbbf24', '#ea580c'],
    category: { en: 'Energy monitoring', th: 'ระบบติดตามพลังงาน' },
    tagline: {
      en: 'Real-time solar production dashboard connected to Growatt inverters.',
      th: 'ระบบดูข้อมูลการผลิตไฟฟ้าจากโซลาร์เซลล์แบบเรียลไทม์ เชื่อมกับอินเวอร์เตอร์ Growatt'
    },
    overview: {
      en: 'Plant owners log in to see their own solar plants: current output, daily and monthly energy, inverter status, alarms and CO₂ saved. Admins manage users, locations, images and system settings.',
      th: 'เจ้าของโรงไฟฟ้าโซลาร์ล็อกอินเข้ามาดูโรงไฟฟ้าของตัวเอง เห็นกำลังผลิตตอนนี้ พลังงานรายวันและรายเดือน สถานะอินเวอร์เตอร์ alarm และ CO₂ ที่ลดได้ ส่วนแอดมินจัดการผู้ใช้ ตำแหน่ง รูปภาพ และการตั้งค่าระบบได้'
    },
    features: {
      en: [
        'Dashboard with KPIs, an animated isometric energy-flow diagram (PV → inverter → home/grid) and trend charts',
        'Inverter detail page with live data, history charts and correct night/offline states',
        'Alarm page and a plant location map (Leaflet)',
        'Excel export, light/dark theme, mobile and iPad support',
        'Password reset with an email OTP'
      ],
      th: [
        'Dashboard มีตัวเลขสรุป แผนภาพการไหลของพลังงาน (แผง PV → อินเวอร์เตอร์ → บ้าน/กริด) แบบ isometric พร้อมแอนิเมชัน และกราฟแนวโน้ม',
        'หน้ารายละเอียดอินเวอร์เตอร์ มีข้อมูลสดกับกราฟย้อนหลัง และแสดงสถานะกลางคืน/ออฟไลน์ให้ถูกต้อง',
        'หน้า alarm และแผนที่ตำแหน่งโรงไฟฟ้า (Leaflet)',
        'Export Excel, ธีมสว่าง/มืด, รองรับมือถือและ iPad',
        'ลืมรหัสผ่านแล้วรีเซ็ตด้วย OTP ทางอีเมล'
      ]
    },
    highlights: {
      en: [
        'Backend pulls Growatt OpenAPI data every hour with cron and stores it in MySQL',
        'Handles Growatt rate limits with throttling, exponential backoff and a fallback cache',
        'Role-based access: admins see every plant, regular users only their own',
        'Grew from a monolith storing JSON files into a layered REST API (routes → controllers → services → models), with a resumable schema migration',
        'nginx reverse proxy keeps everything on one domain (no CORS), plus a build guard that blocks production builds pointing the API at localhost'
      ],
      th: [
        'Backend ดึงข้อมูลจาก Growatt OpenAPI ทุกชั่วโมงด้วย cron แล้วเก็บลง MySQL',
        'รับมือ rate limit ของ Growatt ด้วย throttle, exponential backoff และ cache สำรอง',
        'จำกัดสิทธิ์ตามบทบาท: แอดมินเห็นทุกโรงไฟฟ้า ผู้ใช้ทั่วไปเห็นเฉพาะโรงของตัวเอง',
        'พัฒนาจาก monolith ที่เก็บข้อมูลเป็นไฟล์ JSON มาเป็น REST API แบบแบ่งชั้น (routes → controllers → services → models) พร้อม migration ที่หยุดแล้วทำต่อได้',
        'Deploy ด้วย nginx reverse proxy ให้อยู่โดเมนเดียวกันจึงไม่มีปัญหา CORS และตั้ง build guard กันไม่ให้ build production ที่ชี้ API ไป localhost'
      ]
    },
    tags: ['React', 'Node.js', 'MySQL', 'Growatt API'],
    stack: [
      { label: 'Frontend', items: ['React', 'Vite', 'Tailwind CSS', 'Recharts', 'Leaflet', 'OGL (WebGL)'] },
      { label: 'Backend', items: ['Node.js', 'Express', 'MySQL', 'JWT', 'node-cron', 'Nodemailer'] },
      { label: 'Deploy', items: ['nginx', 'PM2', 'Certbot'] },
      { label: 'Integration', items: ['Growatt OpenAPI'] }
    ],
    href: ''
  },
  {
    title: 'Tokyo House',
    featured: true,
    glyph: 'qr',
    accent: ['#f9a8c0', '#c2416c'],
    category: { en: 'QR ordering', th: 'ระบบสั่งอาหาร' },
    tagline: {
      en: 'QR table ordering with a real-time back office for a Tokyo dessert shop.',
      th: 'ระบบสั่งอาหารด้วย QR ที่โต๊ะ พร้อมระบบหลังร้านแบบเรียลไทม์ สำหรับร้านขนมโตเกียว'
    },
    overview: {
      en: 'Customers scan the QR code on their table and can order several rounds, all collected into one bill for that table. Staff see each order instantly on the back-office screen and take payment in store (cash or transfer).',
      th: 'ลูกค้าสแกน QR ที่โต๊ะแล้วสั่งได้หลายรอบ ทุกรอบรวมเป็นบิลเดียวของโต๊ะนั้น พนักงานเห็นออเดอร์ทันทีบนหน้าจอหลังร้าน แล้วรับชำระเงินที่ร้าน (เงินสดหรือโอน)'
    },
    features: {
      en: [
        ['Customers:', 'menu, cart, a table bill showing each round’s status, call staff / request the bill / ask for cutlery or water, request a cancellation'],
        ['Order queue:', 'sorted by wait time, flags orders waiting over 15 minutes, sound alerts and a full-screen mode that keeps the screen awake (Wake Lock)'],
        ['Sales:', 'daily sales with charts and CSV export'],
        ['Accounts:', 'income, expenses and net profit with custom expense categories'],
        ['Setup:', 'menu management with image upload, table QR generation and printing']
      ],
      th: [
        ['ฝั่งลูกค้า:', 'เมนู, ตะกร้า, บิลของโต๊ะที่เห็นสถานะแต่ละรอบ, ปุ่มเรียกพนักงาน/ขอเช็คบิล/ขอช้อนหรือน้ำ, ขอยกเลิกออเดอร์'],
        ['คิวออเดอร์:', 'เรียงตามเวลารอ เตือนเมื่อรอเกิน 15 นาที มีเสียงแจ้งเตือน และโหมดเต็มจอที่หน้าจอไม่ดับ (Wake Lock)'],
        ['ยอดขาย:', 'ยอดขายรายวันพร้อมกราฟและ export CSV'],
        ['บัญชี:', 'รายรับ-รายจ่าย-กำไรสุทธิ พร้อมหมวดค่าใช้จ่ายที่ตั้งเองได้'],
        ['ตั้งค่าร้าน:', 'จัดการเมนู (อัปโหลดรูป) และสร้าง/พิมพ์ QR โต๊ะ']
      ]
    },
    highlights: {
      en: [
        ['QR tokens:', '96-bit random tokens, and table sessions that expire after 4 hours'],
        ['Server-side pricing:', 'every price is computed in the database — the client only sends item IDs and quantities'],
        ['Rate limits:', '3 orders per 30 s and 1 staff call per 60 s, plus a client_key that stops duplicate orders on double taps or dropped connections'],
        ['One open bill per table:', 'enforced with pg_advisory_xact_lock + a unique index'],
        ['Hardening:', 'triggers lock paid bills, accounts lock after repeated failed logins, CSV-injection guard, full security headers (HSTS, X-Frame-Options, CSP)'],
        ['Serverless:', 'everything runs on Supabase — one Realtime channel with polling as a fallback'],
        ['Free tier:', 'pg_cron deletes data older than 65 days every night to stay within the free tier, plus a localStorage demo mode that needs no database']
      ],
      th: [
        ['QR token:', 'สุ่มขนาด 96-bit และ session ของโต๊ะหมดอายุใน 4 ชั่วโมง'],
        ['คำนวณราคาที่ database:', 'คิดราคาที่ database ทั้งหมด ฝั่งลูกค้าส่งมาแค่รหัสเมนูกับจำนวน'],
        ['จำกัดความถี่:', 'สั่งได้ 3 ครั้งต่อ 30 วินาที เรียกพนักงานได้ 1 ครั้งต่อ 60 วินาที และใช้ client_key กันออเดอร์ซ้ำเวลากดซ้ำหรือเน็ตหลุด'],
        ['บิลเปิดได้ใบเดียว:', 'ใช้ pg_advisory_xact_lock + unique index ให้แต่ละโต๊ะมีบิลเปิดได้ใบเดียว'],
        ['ป้องกันเพิ่มเติม:', 'Trigger ล็อกบิลที่จ่ายแล้ว, ล็อกบัญชีเมื่อล็อกอินผิดหลายครั้ง, กัน CSV injection และตั้ง security headers ครบ (HSTS, X-Frame-Options, CSP)'],
        ['ไม่ต้องมี server:', 'ทุกอย่างอยู่บน Supabase ใช้ Realtime channel เดียว และมี polling เป็นแผนสำรอง'],
        ['อยู่ใน free tier:', 'pg_cron ลบข้อมูลเก่ากว่า 65 วันทุกคืนเพื่อให้อยู่ใน free tier และมีโหมดเดโมที่ใช้ localStorage ได้โดยไม่ต้องต่อ database']
      ]
    },
    tags: ['React', 'Supabase', 'Realtime', 'Vercel'],
    stack: [
      { label: 'Frontend', items: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Recharts', 'qrcode.react'] },
      { label: 'Backend', items: ['Supabase', 'PostgreSQL', 'Realtime', 'RLS', 'RPC & Triggers', 'pg_cron', 'Storage'] },
      { label: 'Deploy', items: ['Vercel'] }
    ],
    href: ''
  },
  {
    title: 'Goverlution',
    glyph: 'landmark',
    accent: ['#93b8ff', '#3f51d6'],
    category: { en: 'Municipal ERP', th: 'ERP ภาครัฐ' },
    tagline: {
      en: 'Multi-tenant ERP for Thai local administrative organizations and municipalities.',
      th: 'ระบบ ERP แบบ multi-tenant สำหรับองค์กรปกครองส่วนท้องถิ่น (อปท./เทศบาล)'
    },
    overview: {
      en: 'An end-to-end system for running a municipality. Many organizations share one system while Row Level Security keeps their data fully separated, and citizens reach them through LINE OA.',
      th: 'ระบบบริหารงานเทศบาลแบบครบวงจร หลายองค์กรใช้ระบบเดียวกันได้โดยข้อมูลแยกขาดจากกันด้วย Row Level Security และประชาชนติดต่อผ่าน LINE OA ได้'
    },
    stats: [
      { value: '8', label: { en: 'modules', th: 'โมดูล' } },
      { value: '6', label: { en: 'edge functions', th: 'Edge Functions' } },
      { value: '372', label: { en: 'SQL migrations', th: 'SQL migrations' } }
    ],
    featuresLabel: { en: 'Modules', th: 'โมดูลหลัก' },
    features: {
      en: [
        ['Planning & budget:', 'local development plans, projects, annual budgets, budget control, monitoring and evaluation'],
        ['Citizen services:', 'complaints, a service counter that issues queue tickets, news, and document records with automatic numbering'],
        ['GIS:', 'province → district → sub-district drill-down map with work pins coloured by status'],
        ['HR:', 'clock-in with photo and location, leave, OT, shifts, training, daily reports'],
        ['Assets & supplies:', 'asset register, stock checks by scanning QR/barcodes with the camera, loans/transfers/repairs, supply requests'],
        ['Vehicles:', 'booking, pre/post-trip inspections, maintenance, travel claims, official form printing'],
        ['Revenue:', 'land & building tax, signboard tax, receipt numbering per organization'],
        ['Administration:', 'organizations, members, permissions, audit log, PDPA']
      ],
      th: [
        ['แผนและงบประมาณ:', 'แผนพัฒนาท้องถิ่น, โครงการ, งบประมาณประจำปี, ควบคุมงบ, ติดตามและประเมินผล'],
        ['บริการประชาชน:', 'เรื่องร้องเรียน, จุดบริการหน้าเคาน์เตอร์ที่ออกบัตรคิว, ข่าวประชาสัมพันธ์, งานสารบรรณที่รันเลขหนังสืออัตโนมัติ'],
        ['GIS:', 'แผนที่ drill-down จังหวัด → อำเภอ → ตำบล และหมุดงานช่างแยกสีตามสถานะ'],
        ['HR:', 'ลงเวลาพร้อมรูปถ่ายและพิกัด, ลา, OT, กะ, อบรม, รายงานประจำวัน'],
        ['ครุภัณฑ์และพัสดุ:', 'ทะเบียนครุภัณฑ์, ตรวจนับด้วยการสแกน QR/Barcode ผ่านกล้อง, ยืม/โอน/ซ่อม, เบิกวัสดุ'],
        ['ยานพาหนะ:', 'จองรถ, ตรวจสภาพก่อน/หลังใช้, ซ่อมบำรุง, เบิกค่าเดินทาง, พิมพ์แบบฟอร์มราชการ'],
        ['รายได้:', 'ภาษีที่ดินและสิ่งปลูกสร้าง, ภาษีป้าย, รันเลขใบเสร็จแยกตามองค์กร'],
        ['ผู้ดูแลระบบ:', 'องค์กร, สมาชิก, สิทธิ์การใช้งาน, audit log, PDPA']
      ]
    },
    highlights: {
      en: [
        ['LINE:', 'one webhook serves every organization, verifies HMAC-SHA256 signatures and takes complaints step by step (state machine); LIFF with idToken verification and a rich menu per organization'],
        ['Security:', 'two-step login with an email OTP, one device per account, auto-logout after 20 idle minutes, RLS built on SECURITY DEFINER helpers'],
        ['Edge Functions:', 'line-webhook, line-liff, line-richmenu, login-otp, manage-users, send-notification (SMS/LINE queue)'],
        ['Architecture:', '~75 service-layer files, soft delete + recycle bin across 26 tables, real-time notifications'],
        ['Code quality:', 'Vitest unit tests, GitHub Actions CI (lint → test → build) and a self-written production-readiness audit']
      ],
      th: [
        ['เชื่อม LINE:', 'webhook เดียวรองรับทุกองค์กร ตรวจลายเซ็น HMAC-SHA256 และคุยรับเรื่องร้องเรียนเป็นขั้นตอน (state machine) มี LIFF ที่ตรวจ idToken และ rich menu แยกตามองค์กร'],
        ['ความปลอดภัย:', 'ล็อกอิน 2 ขั้นด้วย OTP ทางอีเมล, 1 บัญชีใช้ได้ 1 เครื่อง, logout อัตโนมัติเมื่อไม่ใช้งาน 20 นาที, RLS ที่ใช้ helper แบบ SECURITY DEFINER'],
        ['Edge Functions:', 'line-webhook, line-liff, line-richmenu, login-otp, manage-users, send-notification (คิวส่ง SMS/LINE)'],
        ['สถาปัตยกรรม:', 'service layer ~75 ไฟล์, soft delete + ถังขยะครอบ 26 ตาราง, แจ้งเตือนเรียลไทม์'],
        ['คุณภาพโค้ด:', 'unit test ด้วย Vitest, CI ด้วย GitHub Actions (lint → test → build) และเขียนเอกสาร audit ความพร้อมก่อนขึ้น production เอง']
      ]
    },
    tags: ['React', 'Supabase', 'LINE API', 'Edge Functions'],
    stack: [
      { label: 'Frontend', items: ['React', 'Vite', 'PrimeReact', 'Tailwind CSS', 'Chart.js', 'Leaflet'] },
      { label: 'Libraries', items: ['ExcelJS', 'ZXing (QR/Barcode)'] },
      { label: 'Backend', items: ['Supabase', 'PostgreSQL', 'RLS', 'Realtime', 'Edge Functions (Deno/TS)'] },
      { label: 'Integration', items: ['LINE Messaging API', 'LINE LIFF'] },
      { label: 'DevOps', items: ['Vitest', 'GitHub Actions'] }
    ],
    href: ''
  },
  {
    title: { en: 'e-Tax Nakhon Ratchasima PAO', th: 'e-Tax อบจ.นครราชสีมา' },
    glyph: 'receipt',
    accent: ['#6ee7c4', '#0f8a74'],
    category: { en: 'e-Government', th: 'ภาษีออนไลน์' },
    tagline: {
      en: 'Online local-tax filing and payment, with OCR slip verification.',
      th: 'ระบบยื่นแบบและชำระภาษีท้องถิ่นออนไลน์ มีระบบตรวจสลิปด้วย OCR'
    },
    overview: {
      en: 'Businesses file tobacco, hotel and fuel-station tax returns online and pay by QR with the slip attached. PAO officers review the returns and slips, while a Super Admin manages businesses, tax rates and filing periods.',
      th: 'ผู้ประกอบการยื่นแบบภาษียาสูบ ภาษีโรงแรม และภาษีสถานีบริการน้ำมันออนไลน์ แล้วชำระผ่าน QR พร้อมแนบสลิป เจ้าหน้าที่ อบจ. ตรวจแบบและตรวจสลิป ส่วน Super Admin จัดการสถานประกอบการ อัตราภาษี และรอบการยื่น'
    },
    features: {
      en: [
        'Separate filing for 3 tax types, with filing periods, amended returns, signatories and attachments',
        'QR payment with slip upload for officers to review',
        'PDF of form อบจ.02-1 that matches the real paper form, Garuda emblem included',
        'Reports that track filings and payments',
        'Audit log, recycle bin, role-based permissions and menus (drag to reorder)',
        'Business locations pinned on a map'
      ],
      th: [
        'ยื่นแบบแยก 3 ประเภทภาษี มีรอบการยื่น, ยื่นแบบแก้ไขเพิ่มเติม, ผู้ลงนาม และแนบเอกสาร',
        'ชำระผ่าน QR และอัปโหลดสลิปให้เจ้าหน้าที่ตรวจ',
        'ออก PDF แบบฟอร์ม อบจ.02-1 ให้ตรงกับแบบฟอร์มกระดาษจริง พร้อมตราครุฑ',
        'หน้ารายงานติดตามการยื่นและการชำระ',
        'Audit log, ถังขยะ, จัดการสิทธิ์และเมนูตามบทบาท (ลากเรียงลำดับเมนูได้)',
        'ปักหมุดตำแหน่งสถานประกอบการบนแผนที่'
      ]
    },
    highlights: {
      en: [
        ['Slip check in the browser:', 'no server cost — blur detection with variance of Laplacian, QR reading with jsQR'],
        ['OCR:', 'Thai/English OCR with tesseract.js extracts the amount, payer name and reference number and compares them with the amount due; tesseract loads only when needed so the main bundle stays small'],
        ['Official PDFs:', 'generated client-side with jsPDF, with amounts written out in Thai words (e.g. “หนึ่งพันบาทถ้วน”)'],
        ['Tax logic:', 'fuel-station tax calculation formula'],
        ['Access:', 'multi-role RLS and an RPC for permanent deletion at the database level']
      ],
      th: [
        ['ตรวจสลิปในเบราว์เซอร์:', 'ไม่มีค่าใช้จ่ายฝั่ง server ตรวจภาพเบลอด้วย Variance of Laplacian และอ่าน QR บนสลิปด้วย jsQR'],
        ['OCR:', 'อ่านภาษาไทย/อังกฤษด้วย tesseract.js ดึงยอดเงิน ชื่อผู้โอน และเลขอ้างอิง แล้วเทียบกับยอดที่ต้องชำระ โหลด tesseract เฉพาะตอนใช้ bundle หลักจึงไม่ใหญ่ขึ้น'],
        ['PDF ราชการ:', 'สร้างฝั่ง client ด้วย jsPDF และแปลงยอดเงินเป็นคำอ่านภาษาไทย (เช่น “หนึ่งพันบาทถ้วน”)'],
        ['คำนวณภาษี:', 'มีสูตรคำนวณภาษีสถานีบริการน้ำมัน'],
        ['สิทธิ์การใช้งาน:', 'RLS แยกสิทธิ์หลายบทบาท และมี RPC ลบข้อมูลถาวรที่ระดับ database']
      ]
    },
    tags: ['React', 'Supabase', 'tesseract.js', 'jsPDF'],
    stack: [
      { label: 'Frontend', items: ['React 19', 'Vite', 'PrimeReact', 'Tailwind CSS', 'ApexCharts', 'Leaflet'] },
      { label: 'Documents', items: ['jsPDF', 'ExcelJS'] },
      { label: 'OCR / QR', items: ['tesseract.js', 'jsQR'] },
      { label: 'Backend', items: ['Supabase', 'PostgreSQL', 'RLS', 'Storage', 'Edge Functions'] }
    ],
    href: ''
  },
  {
    title: 'Thermo Maniq',
    glyph: 'zap',
    accent: ['#7dd3fc', '#2563c9'],
    category: { en: 'Website + CMS', th: 'เว็บไซต์ + CMS' },
    tagline: {
      en: 'Website for a solar and smart-home company, with a custom-built CMS.',
      th: 'เว็บไซต์บริษัทพลังงานโซลาร์และสมาร์ทโฮม พร้อมระบบจัดการเนื้อหา (CMS) ที่เขียนเอง'
    },
    overview: {
      en: 'Visitors browse products, installation work, the benefits of solar and videos. Admins sign in to the back office to add, edit and remove products, work and videos.',
      th: 'คนทั่วไปเข้ามาดูสินค้า ผลงานติดตั้ง ประโยชน์ของโซลาร์ และวิดีโอ แอดมินล็อกอินเข้าหลังบ้านเพื่อเพิ่ม/แก้/ลบสินค้า ผลงาน และวิดีโอ'
    },
    features: {
      en: [
        'Home (hero, smart home, video playlist), Products, Works (categories, search, lightbox), Benefits and About pages',
        'Admin dashboard with product / work / video tabs, search and category filters',
        'Image and video upload'
      ],
      th: [
        'หน้า Home (Hero, Smart Home, วิดีโอแบบ playlist), Products, Works (แยกหมวด, ค้นหา, lightbox), Benefits, About',
        'Admin Dashboard แยกแท็บสินค้า / ผลงาน / วิดีโอ พร้อมค้นหาและกรองตามหมวด',
        'อัปโหลดรูปและวิดีโอ'
      ]
    },
    highlights: {
      en: [
        'Layered REST API (routes → controllers → services → models)',
        'GET endpoints are public; POST/PUT/DELETE require an admin JWT',
        'Uploads through multer with file-type filtering and size limits',
        'Creates the database, tables and a starter admin account automatically on first start (password hashed with bcrypt)',
        'Hand-written WebGL2 shader background (raymarched waves) with GSAP animation'
      ],
      th: [
        'REST API แบบแบ่งชั้น (routes → controllers → services → models)',
        'API แบบ GET เปิดให้ทุกคนเรียกได้ ส่วน POST/PUT/DELETE ต้องใช้ JWT ของแอดมิน',
        'อัปโหลดไฟล์ด้วย multer พร้อมกรองประเภทไฟล์และจำกัดขนาด',
        'สร้าง database, ตาราง และบัญชีแอดมินตั้งต้นอัตโนมัติเมื่อเริ่มระบบ (รหัสผ่าน hash ด้วย bcrypt)',
        'พื้นหลังเขียนเองด้วย WebGL2 shader (raymarched waves) และมีแอนิเมชัน GSAP'
      ]
    },
    tags: ['React', 'Express', 'MySQL', 'WebGL'],
    stack: [
      { label: 'Frontend', items: ['React', 'Vite', 'Tailwind CSS', 'GSAP', 'OGL (WebGL2)'] },
      { label: 'Backend', items: ['Node.js', 'Express', 'MySQL', 'JWT', 'bcrypt', 'Multer'] }
    ],
    href: ''
  },
  {
    title: 'Map-TA',
    glyph: 'map',
    accent: ['#c4b5fd', '#6d44d9'],
    category: { en: 'Infrastructure GIS', th: 'แผนที่โครงสร้างพื้นฐาน' },
    tagline: {
      en: 'Nationwide map for managing CCTV, Wi-Fi and fiber-optic infrastructure.',
      th: 'ระบบแผนที่จัดการโครงสร้างพื้นฐาน CCTV / WiFi / Fiber Optic ทั่วประเทศ'
    },
    overview: {
      en: 'Field and ops teams view and manage installed equipment on a map: NVRs, fiber routes and camera views, plus schools, companies and sub-district health centres.',
      th: 'ทีมภาคสนามและทีม ops ใช้ดูและจัดการอุปกรณ์ที่ติดตั้งไว้บนแผนที่ เช่น NVR, เส้นทาง Fiber และมุมมองกล้อง รวมถึงโรงเรียน บริษัท และ รพ.สต.'
    },
    stats: [
      { value: '1,486', label: { en: 'mapped points', th: 'จุดบนแผนที่' } },
      { value: '771', label: { en: 'CCTV cameras', th: 'กล้อง CCTV' } },
      { value: '369', label: { en: 'Wi-Fi spots', th: 'จุด WiFi' } }
    ],
    features: {
      en: [
        'Province → district → sub-district drill-down map with stat cards that toggle each data layer',
        'Tools for drawing camera view cones and fiber routes on the map',
        'A4 map export at 300 DPI, drawn straight to canvas with a Web Mercator projection (no html2canvas)',
        'Add and edit locations, manage members',
        'Shares user accounts with Goverlution (one login for both)'
      ],
      th: [
        'แผนที่ drill-down จังหวัด → อำเภอ → ตำบล และการ์ดสถิติที่กดเปิด/ปิดแต่ละชั้นข้อมูลได้',
        'เครื่องมือวาดมุมกล้อง (view cone) และเส้นทาง Fiber ลงบนแผนที่',
        'Export แผนที่ขนาด A4 ความละเอียด 300 DPI วาดลง canvas เองด้วย Web Mercator projection ไม่ได้ใช้ html2canvas',
        'เพิ่ม/แก้ไขสถานที่และจัดการสมาชิก',
        'ใช้บัญชีผู้ใช้ร่วมกับ Goverlution ได้ (ล็อกอินด้วยบัญชีเดียวกัน)'
      ]
    },
    highlights: {
      en: [
        'Python ETL converts KML from Google My Maps and Excel files into Supabase, detecting each device type from its KML icon',
        'Vector layer ordering with custom Leaflet panes'
      ],
      th: [
        'เขียน ETL ด้วย Python แปลง KML จาก Google My Maps และไฟล์ Excel เข้า Supabase โดยแยกประเภทอุปกรณ์จาก icon ใน KML อัตโนมัติ',
        'จัดลำดับชั้น vector ด้วย custom Leaflet pane'
      ]
    },
    tags: ['React', 'Leaflet', 'Supabase', 'Python'],
    stack: [
      { label: 'Frontend', items: ['React', 'Vite', 'PrimeReact', 'Tailwind CSS', 'Leaflet', 'Canvas API'] },
      { label: 'Backend', items: ['Supabase', 'PostgreSQL', 'RLS'] },
      { label: 'Data', items: ['Python (ETL)', 'KML', 'GeoJSON'] }
    ],
    href: ''
  }
];

// resolves a { en, th } field (or a plain value) to the current language
export const pick = (value, lang) => (value && typeof value === 'object' && !Array.isArray(value) ? value[lang] ?? value.en : value);

export const TEXT = {
  en: {
    name: 'ITTHIKON SAKUMKAEW',
    nav: { home: 'Home', education: 'Education', skills: 'Skills', projects: 'Projects', contact: 'Contact' },
    available: 'AVAILABLE FOR HIRE',
    viewPhoto: 'View photo',
    aboutTitle: 'About Me',
    about: [
      'I’m a Full-Stack Developer who started out in hardware and electronics (IT Support) before moving into enterprise software development.',
      'What sets me apart is the blend of technical skills — building ERP web applications for government agencies, an OCR slip-verification system, a solar-powered IoT system and GIS systems — with on-site communication and problem-solving skills gained from real-world work experience.',
      'I believe good software doesn’t just need correct code with strong security down to the database level — it also has to be easy to use, stable, and genuinely meet the needs of the people using it.'
    ],
    contactInfo: 'Contact Information',
    github: 'Github',
    gmail: 'Gmail',
    linkedin: 'Linkedin',
    educationTitle: 'EDUCATION JOURNEY',
    education: [
      {
        years: '2022 - 2026',
        degree: 'Bachelor of Engineering',
        field: 'Computer Engineering',
        school: 'Rajamangala University of Technology Isan, Nakhon Ratchasima'
      },
      {
        years: '2019 - 2021',
        degree: 'Vocational Certificate',
        field: 'Electronics',
        school: 'Sakaew Technical College'
      }
    ],
    skillsTitle: 'Skills',
    skillsSub: 'Technologies and tools I work with',
    projectsTitle: 'Projects',
    projectsSub: 'Some of my recent work',
    poke: ['Click me', 'baby'],
    backToFolder: 'Close folder',
    viewProject: 'View project',
    viewDetails: 'View details',
    galleryHint: 'Drag to browse · click a card for details',
    featured: 'Featured',
    overview: 'Overview',
    features: 'Key features',
    highlights: 'Technical highlights',
    stack: 'Tech stack',
    prevProject: 'Previous project',
    nextProject: 'Next project',
    close: 'Close',
    getInTouch: 'Get In Touch',
    question: 'Have a question or want to work together?',
    email: 'Email',
    location: 'Location',
    locationValue: 'Korat, Thailand',
    followMe: 'Follow Me',
    form: { name: 'Name', email: 'Email', message: 'Message', send: 'Send Message', sent: 'Opening your mail app…' },
    role: ['Full-Stack', 'developer'],
    dragCard: 'Drag the card · click to flip it',
    flipCard: 'Tap the card to flip it',
    rights: '© 2026 Itthikon | Portfolio. All rights reserved.',
    themeToLight: 'Switch to light mode',
    themeToDark: 'Switch to dark mode',
    langSwitch: 'เปลี่ยนเป็นภาษาไทย'
  },
  th: {
    name: 'อิทธิกร สกุลแก้ว',
    nav: { home: 'หน้าแรก', education: 'การศึกษา', skills: 'ทักษะ', projects: 'ผลงาน', contact: 'ติดต่อ' },
    available: 'พร้อมร่วมงาน',
    viewPhoto: 'ดูรูป',
    aboutTitle: 'เกี่ยวกับฉัน',
    about: [
      'ผมเป็น Full-Stack Developer ที่มีพื้นฐานการเริ่มต้นเส้นทางสายเทคโนโลยีจากงานฮาร์ดแวร์และอิเล็กทรอนิกส์ (IT Support) ก่อนจะก้าวเข้าสู่การพัฒนาซอฟต์แวร์ระดับองค์กร',
      'ความโดดเด่นของผมคือการผสมผสานระหว่าง "ทักษะเชิงเทคนิค" (เช่น การพัฒนาเว็บแอปพลิเคชัน ERP สำหรับภาครัฐ, ระบบ OCR ตรวจสลิป, ระบบ IoT โซลาร์เซลล์ และระบบ GIS) เข้ากับ "ทักษะการสื่อสารและการแก้ปัญหาหน้างาน" ผ่านประสบการณ์การทำงานจริง',
      'ผมเชื่อว่าซอฟต์แวร์ที่ดีและมีประสิทธิภาพ ไม่เพียงแต่ต้องเขียนโค้ดให้ถูกต้องและมีความปลอดภัยสูงในระดับฐานข้อมูลเท่านั้น แต่ยังต้องใช้งานง่าย เสถียร และตอบโจทย์ผู้ใช้งานได้จริง'
    ],
    contactInfo: 'ช่องทางติดต่อ',
    github: 'Github',
    gmail: 'Gmail',
    linkedin: 'Linkedin',
    educationTitle: 'เส้นทางการศึกษา',
    education: [
      {
        years: '2565 - 2569',
        degree: 'วิศวกรรมศาสตรบัณฑิต',
        field: 'สาขาวิศวกรรมคอมพิวเตอร์',
        school: 'มหาวิทยาลัยเทคโนโลยีราชมงคลอีสาน นครราชสีมา'
      },
      {
        years: '2562 - 2564',
        degree: 'ประกาศนียบัตรวิชาชีพ (ปวช.)',
        field: 'สาขาอิเล็กทรอนิกส์',
        school: 'วิทยาลัยเทคนิคสระแก้ว'
      }
    ],
    skillsTitle: 'ทักษะ',
    skillsSub: 'เทคโนโลยีและเครื่องมือที่ใช้',
    projectsTitle: 'ผลงาน',
    projectsSub: 'ผลงานล่าสุดบางส่วน',
    poke: ['คลิกเปิดแฟ้ม', 'ดูผลงานได้เลย'],
    backToFolder: 'ปิดแฟ้ม',
    viewProject: 'ดูโปรเจค',
    viewDetails: 'ดูรายละเอียด',
    galleryHint: 'ลากเพื่อเลื่อนดู · คลิกการ์ดเพื่อดูรายละเอียด',
    featured: 'ผลงานเด่น',
    overview: 'ระบบนี้ทำอะไร',
    features: 'ฟีเจอร์หลัก',
    highlights: 'จุดเด่นทางเทคนิค',
    stack: 'เครื่องมือ',
    prevProject: 'ผลงานก่อนหน้า',
    nextProject: 'ผลงานถัดไป',
    close: 'ปิด',
    getInTouch: 'ติดต่อฉัน',
    question: 'มีคำถาม หรืออยากร่วมงานกัน?',
    email: 'อีเมล',
    location: 'ที่อยู่',
    locationValue: 'โคราช, ประเทศไทย',
    followMe: 'ติดตาม',
    form: { name: 'ชื่อ', email: 'อีเมล', message: 'ข้อความ', send: 'ส่งข้อความ', sent: 'กำลังเปิดแอปอีเมล…' },
    role: ['Full-Stack', 'developer'],
    dragCard: 'ลากบัตรได้ · คลิกเพื่อพลิกดูด้านหลัง',
    flipCard: 'แตะบัตรเพื่อพลิกดูด้านหลัง',
    rights: '© 2026 Itthikon | Portfolio. สงวนลิขสิทธิ์',
    themeToLight: 'เปลี่ยนเป็นโหมดสว่าง',
    themeToDark: 'เปลี่ยนเป็นโหมดมืด',
    langSwitch: 'Switch to English'
  }
};
