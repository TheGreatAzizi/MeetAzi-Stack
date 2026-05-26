# MeetAzi Stack - راهنمای فارسی

<div dir="rtl">

**MeetAzi Stack** یک نسخه شخصی‌سازی‌شده و آماده‌ی استقرار از **MiroTalk P2P** است که برای اجرای پایدار روی سرور شخصی، سرور اختصاصی یا محیط self-hosted آماده شده است.

این پروژه بر پایه‌ی پروژه متن‌باز و ارزشمند [MiroTalk](https://github.com/miroslavpejic85/mirotalk) ساخته شده است.

از تیم و سازندگان MiroTalk بابت ارائه‌ی یک پلتفرم متن‌باز، سریع و قابل‌استقرار برای ارتباطات WebRTC تشکر ویژه می‌کنیم. این fork بدون زحمات آن‌ها ممکن نبود.

> ❤️ Shout-out به پروژه اصلی MiroTalk و تمام contributorهای آن.

---

## درباره این Fork

این مخزن یک fork/customized deployment stack از MiroTalk است که با هدف اجرای مستقل‌تر، پایدارتر و مناسب‌تر برای محیط production آماده شده است.

در این نسخه تلاش شده مشکلات عملیاتی و وابستگی‌های خارجی نسخه اولیه کاهش پیدا کند و پروژه بتواند در شرایط محدودتر، مانند سرورهای self-hosted یا محیط‌هایی با دسترسی محدود به CDNهای خارجی، بدون مشکل اجرا شود.

---

## تغییرات و بهبودهای اصلی

### 1. حذف وابستگی به CDNهای خارجی

در این نسخه، فایل‌ها و assetهای موردنیاز تا حد امکان به‌صورت local در پروژه قرار گرفته‌اند تا سرویس بدون وابستگی مستقیم به CDNهای خارجی اجرا شود.

این موضوع باعث می‌شود:

- سرویس در شبکه‌های محدودتر پایدارتر باشد
- سرعت load اولیه قابل‌کنترل‌تر شود
- ریسک قطع شدن به‌خاطر unavailable بودن CDN کاهش پیدا کند
- استقرار روی سرورهای داخلی یا self-hosted ساده‌تر شود
- کنترل کامل‌تری روی فایل‌های frontend وجود داشته باشد

---

### 2. رفع مشکل Chat و ارسال پیام

در نسخه شخصی‌سازی‌شده MeetAzi، مشکل مربوط به chat/message handling در MiroTalk بررسی و اصلاح شده است.

این نسخه روی موارد زیر تمرکز داشته است:

- اصلاح مشکل نمایش یا ارسال پیام‌ها در chat
- بهبود رفتار UI چت
- اصلاح ایرادهای مربوط به placeholder، layout و نمایش متن
- پایدارتر شدن تجربه کاربر هنگام ارسال پیام در جلسه
- بهبود نمایش و رندر شدن پیام‌ها

---

### 3. آماده‌سازی برای اجرای Self-hosted

این repo برای اجرای کامل روی سرور آماده شده و شامل اجزای مرتبط با سرویس است:

- اپلیکیشن اصلی MiroTalk سفارشی‌شده
- تنظیمات نمونه برای Coturn
- سرویس کمکی Node TURN
- فایل‌های startup مخصوص Windows Server
- templateهای لازم برای configهای حساس

---

### 4. پشتیبانی بهتر از Windows Server

این نسخه برای سناریوهای Windows Server آماده‌سازی شده و مناسب حالتی است که سرویس از مسیرهایی مثل زیر اجرا شود:

```text
E:\apps
```

فایل‌هایی مثل `start-meetazi.cmd` و `start-node-turn.cmd` برای ساده‌تر شدن اجرای سرویس روی Windows Server در نظر گرفته شده‌اند.

---

## ساختار پروژه

```text
MeetAzi-Stack/
├── mirotalk/
│   └── mirotalk/
│       ├── app/
│       ├── public/
│       ├── tests/
│       ├── webhook/
│       ├── widgets/
│       ├── package.json
│       ├── package-lock.json
│       └── start-meetazi.cmd
│
├── coturn/
│   └── turnserver.template.conf
│
├── node-turn/
│   ├── package.json
│   ├── package-lock.json
│   ├── server.js
│   └── start-node-turn.cmd
│
├── .gitignore
├── README.md
└── README.fa.md
```

---

## اجزای اصلی

### `mirotalk/mirotalk`

کد اصلی اپلیکیشن MeetAzi/MiroTalk در این مسیر قرار دارد.

این بخش شامل frontend، backend، فایل‌های public، viewها، CSSها، JavaScriptها، APIها و فایل‌های اجرایی مرتبط با MiroTalk است.

---

### `coturn`

این پوشه شامل template تنظیمات Coturn است.

> توجه: فایل واقعی `turnserver.conf` نباید داخل Git commit شود، چون ممکن است شامل secret، credential، IP، domain یا مسیر certificate واقعی باشد.

برای راه‌اندازی روی سرور جدید، از فایل زیر استفاده کنید:

```text
coturn/turnserver.template.conf
```

---

### `node-turn`

این پوشه شامل سرویس کمکی Node TURN است.

فایل‌های اصلی:

```text
node-turn/server.js
node-turn/package.json
node-turn/start-node-turn.cmd
```

---

## فایل‌هایی که نباید commit شوند

برای امنیت و جلوگیری از commit شدن فایل‌های حجیم یا حساس، موارد زیر نباید داخل Git قرار بگیرند:

```text
.env
.env.*
node_modules/
*.log
cert.pem
key.pem
*.pem
*.key
backup-*/
turnserver.conf
```

فایل‌های template قابل commit هستند:

```text
.env.template
turnserver.template.conf
config.template.js
```

---

## نصب و اجرا

### 1. Clone کردن repo

```bash
git clone https://github.com/TheGreatAzizi/MeetAzi-Stack.git
cd MeetAzi-Stack
```

---

### 2. نصب dependencyهای MiroTalk

```bash
cd mirotalk/mirotalk
npm install
```

---

### 3. تنظیم فایل environment

از فایل template کپی بگیرید:

```bash
copy .env.template .env
```

در Linux/macOS:

```bash
cp .env.template .env
```

سپس مقادیر `.env` را بر اساس دامنه، پورت‌ها، TURN/STUN و تنظیمات امنیتی سرور خود تغییر دهید.

---

### 4. تنظیم Coturn

از template زیر استفاده کنید:

```text
coturn/turnserver.template.conf
```

آن را به مسیر کانفیگ Coturn روی سرور مقصد منتقل کنید و مقادیر زیر را تنظیم کنید:

```text
realm
server-name
listening-ip
external-ip
static-auth-secret
cert
pkey
```

---

### 5. اجرای MiroTalk

در Windows Server می‌توانید از فایل command آماده استفاده کنید:

```bash
start-meetazi.cmd
```

یا مستقیم با Node اجرا کنید:

```bash
npm start
```

---

## چک‌لیست امنیتی قبل از Push

قبل از public کردن یا push کردن repo، همیشه staged fileها را بررسی کنید:

```bash
git diff --cached --name-only
```

مطمئن شوید این موارد داخل commit نیستند:

```text
.env
.env.backup
key.pem
cert.pem
turnserver.conf
node_modules
*.log
backup-*
```

---

## اعتبار و تشکر

این پروژه بر پایه‌ی [MiroTalk P2P](https://github.com/miroslavpejic85/mirotalk) ساخته شده است.

MiroTalk یک پروژه متن‌باز self-hosted برای video conferencing بر پایه WebRTC است و امکان اجرای تماس‌های ویدیویی real-time را روی سرور شخصی فراهم می‌کند.

از توسعه‌دهندگان و contributorهای پروژه MiroTalk بابت ساخت و نگهداری این پروژه ارزشمند تشکر می‌کنیم.

MeetAzi Stack صرفاً یک fork/customized deployment stack است که برای نیازهای خاص self-hosting، local assets، رفع برخی مشکلات اجرایی، رفع مشکلات chat/message و آماده‌سازی production شخصی‌سازی شده است.

---

## License

این پروژه بر پایه MiroTalk ساخته شده است. برای اطلاعات دقیق‌تر درباره license، فایل `LICENSE` داخل پروژه و repo رسمی MiroTalk را بررسی کنید.

</div>
