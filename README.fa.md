# MeetAzi Stack - مستندات فارسی

<div dir="rtl">

**MeetAzi Stack** یک نسخه شخصی‌سازی‌شده، آماده‌ی نصب و مناسب سرور ایران است که بر پایه‌ی [MiroTalk P2P](https://github.com/miroslavpejic85/mirotalk) ساخته شده است.

در این fork، هسته‌ی اصلی MiroTalk حفظ شده، اما پروژه با نام **MeetAzi** برای استفاده واقعی روی سرور شخصی/اختصاصی آماده‌سازی شده است. تمرکز اصلی این نسخه روی اجرای پایدارتر در محیط‌هایی مثل سرورهای ایران، حذف وابستگی به CDNهای خارجی، رفع مشکلات chat/message و آماده‌سازی برای Windows Server است.

> ❤️ تشکر ویژه از پروژه اصلی MiroTalk و تمام contributorهای آن. MeetAzi بر پایه زحمات آن پروژه ساخته شده است.

---

## English README

English documentation is available here:

[README.md](README.md)

---

## MeetAzi چیست؟

MeetAzi یک fork سفارشی‌شده از MiroTalk است که هدفش ساده‌تر کردن اجرای یک سیستم جلسه ویدیویی WebRTC روی زیرساخت شخصی است.

این نسخه مناسب حالتی است که می‌خواهید:

- سیستم تماس ویدیویی self-hosted داشته باشید
- پروژه روی سرور ایران بهتر اجرا شود
- وابستگی runtime به CDNهای خارجی کمتر شود
- assetهای frontend به‌صورت local استفاده شوند
- مشکل chat و ارسال/نمایش پیام‌ها رفع شود
- TURN/STUN برای اتصال پایدارتر آماده باشد
- اجرا روی Windows Server ساده‌تر باشد

---

## ساختار پروژه

```text
MeetAzi-Stack/
├── coturn/
│   └── turnserver.template.conf
│
├── node-turn/
│   ├── package.json
│   ├── package-lock.json
│   ├── server.js
│   └── start-node-turn.cmd
│
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
├── .gitignore
├── README.md
└── README.fa.md
```

---

## تغییرات اصلی این Fork

### 1. تغییر برند و شخصی‌سازی با نام MeetAzi

پروژه اصلی MiroTalk در این نسخه با نام MeetAzi شخصی‌سازی شده است.

این تغییرات شامل ظاهر، فایل‌های frontend، استایل‌ها، assetهای local و اسکریپت‌های اجرای مخصوص سرور است.

---

### 2. حذف وابستگی به CDNهای خارجی

یکی از مهم‌ترین اهداف این fork این بوده که پروژه تا حد امکان بدون وابستگی به CDN خارجی اجرا شود.

این موضوع برای سرور ایران اهمیت زیادی دارد، چون ممکن است بعضی CDNها:

- کند باشند
- فیلتر یا محدود باشند
- از داخل ایران ناپایدار باشند
- باعث شود صفحه یا بخشی از UI درست load نشود

در MeetAzi فایل‌ها و کتابخانه‌های frontend تا حد امکان local شده‌اند تا سیستم حتی در محیط‌های محدود هم قابل اجرا باشد.

---

### 3. رفع مشکل Chat و ارسال پیام

در این نسخه مشکلات مربوط به chat/message در MiroTalk بررسی و اصلاح شده‌اند.

تمرکز این تغییرات روی موارد زیر بوده است:

- رفع مشکل ارسال پیام در چت
- رفع مشکل نمایش پیام‌ها
- بهبود layout چت
- اصلاح placeholder و نمایش متن
- پایدارتر شدن تجربه کاربر هنگام استفاده از chat داخل جلسه

---

### 4. مناسب‌سازی برای سرور ایران

MeetAzi برای deployment روی سرور ایران آماده‌سازی شده است.

هدف این تغییرات کم کردن مشکلات رایج در اجرای WebRTC روی سرور ایران است، از جمله:

- وابستگی به CDN خارجی
- مشکلات TURN/STUN
- محدودیت‌های شبکه
- نیاز به assetهای local
- نیاز به اجرای ساده روی Windows Server
- نیاز به template برای configها بدون commit کردن secretها

---

### 5. پشتیبانی از TURN Server

این repo دو مسیر برای TURN دارد:

#### گزینه اول: Coturn

فایل template مربوط به Coturn در مسیر زیر قرار دارد:

```text
coturn/turnserver.template.conf
```

این template شامل تنظیماتی مثل موارد زیر است:

```text
listening-port=3478
listening-ip=0.0.0.0
external-ip=CHANGE_ME
realm=CHANGE_ME
server-name=CHANGE_ME
user=meetazi:CHANGE_ME
min-port=49160
max-port=49200
```

برای production، استفاده از Coturn معمولاً انتخاب قوی‌تری است.

#### گزینه دوم: Node TURN

سرویس Node TURN در مسیر زیر قرار دارد:

```text
node-turn/server.js
```

فایل اجرای Windows آن:

```text
node-turn/start-node-turn.cmd
```

این سرویس روی UDP port `3478` اجرا می‌شود و بازه پورت relay در `server.js` تعریف شده است.

> نکته مهم: Coturn و Node TURN را هم‌زمان روی یک port اجرا نکنید، مگر اینکه پورت‌هایشان را جدا تنظیم کرده باشید. هر دو معمولاً از port `3478` استفاده می‌کنند.

---

### 6. آماده برای Windows Server

MeetAzi شامل فایل‌های `.cmd` برای اجرای ساده روی Windows Server است.

فایل اجرای اصلی:

```text
mirotalk/mirotalk/start-meetazi.cmd
```

این فایل به‌صورت پیش‌فرض:

- وارد مسیر `E:\apps\mirotalk\mirotalk` می‌شود
- مقدار `PORT=9907` را تنظیم می‌کند
- اگر `app/src/config.js` وجود نداشته باشد، آن را از `config.template.js` می‌سازد
- برنامه را با Node.js اجرا می‌کند
- لاگ‌ها را داخل `meetazi-autostart.log` می‌نویسد

فایل اجرای Node TURN:

```text
node-turn/start-node-turn.cmd
```

این فایل Node TURN را اجرا می‌کند و لاگ را داخل `node-turn-autostart.log` می‌نویسد.

---

## پیش‌نیازها

برای اجرای پروژه به موارد زیر نیاز دارید:

- Windows Server یا Linux Server
- Node.js
- npm
- Git
- دامنه یا subdomain متصل به سرور
- باز بودن پورت‌های موردنیاز در firewall
- در حالت production، بهتر است Coturn هم نصب و تنظیم شود

در Windows Server، اسکریپت‌های آماده فرض می‌کنند Node.js در مسیر زیر نصب است:

```text
C:\Program Files\nodejs\node.exe
```

---

## نصب پروژه

### 1. Clone کردن repo

```bash
git clone https://github.com/TheGreatAzizi/MeetAzi-Stack.git
cd MeetAzi-Stack
```

---

### 2. نصب dependencyهای MeetAzi/MiroTalk

```bash
cd mirotalk/mirotalk
npm install
```

در `package.json` پروژه، دستور start به شکل زیر تعریف شده است:

```bash
npm start
```

که در نهایت این فایل را اجرا می‌کند:

```bash
node app/src/server.js
```

---

### 3. ساخت فایل تنظیمات runtime

از فایل template کپی بگیرید:

#### Windows

```bash
copy .env.template .env
```

#### Linux/macOS

```bash
cp .env.template .env
```

بعد فایل `.env` را بر اساس دامنه، پورت‌ها، تنظیمات TURN/STUN، امنیت و نیازهای سرور خود ویرایش کنید.

همچنین باید فایل زیر وجود داشته باشد:

```text
app/src/config.js
```

در Windows، فایل `start-meetazi.cmd` اگر این فایل وجود نداشته باشد، آن را از `app/src/config.template.js` می‌سازد.

---

## اجرای MeetAzi

### اجرا روی Windows Server

از مسیر برنامه:

```bash
cd mirotalk/mirotalk
start-meetazi.cmd
```

به‌صورت پیش‌فرض این اسکریپت MeetAzi را روی پورت زیر اجرا می‌کند:

```text
9907
```

پس اگر reverse proxy یا firewall دارید، باید این پورت را در نظر بگیرید.

---

### اجرای مستقیم با Node

```bash
cd mirotalk/mirotalk
npm start
```

یا:

```bash
node app/src/server.js
```

---

## تنظیم TURN

برای WebRTC، در بسیاری از شبکه‌ها مخصوصاً پشت NAT، firewall سخت‌گیر، اینترنت موبایل یا شبکه‌های محدود، TURN بسیار مهم است.

برای سرور ایران، داشتن TURN local شدیداً توصیه می‌شود.

---

### راه‌اندازی Coturn

1. از template کپی بگیرید:

```bash
copy coturn\turnserver.template.conf coturn\turnserver.conf
```

2. مقادیر زیر را ویرایش کنید:

```text
external-ip=YOUR_SERVER_PUBLIC_IP
realm=turn.your-domain.com
server-name=turn.your-domain.com
user=meetazi:YOUR_STRONG_PASSWORD
```

3. پورت‌های لازم را باز کنید:

```text
UDP 3478
UDP 49160-49200
```

4. سپس در تنظیمات MeetAzi، آدرس TURN را اضافه کنید.

---

### راه‌اندازی Node TURN

1. وارد مسیر Node TURN شوید:

```bash
cd node-turn
npm install
```

2. فایل `server.js` را ویرایش کنید:

```text
externalIps
credentials
realm
```

3. روی Windows اجرا کنید:

```bash
start-node-turn.cmd
```

4. پورت‌های UDP لازم را در firewall باز کنید.

> Node TURN برای deployment ساده و self-hosted کاربردی است؛ اما برای production جدی، Coturn معمولاً گزینه قوی‌تر و استانداردتری است.

---

## پورت‌های پیشنهادی Firewall

بسته به تنظیمات شما:

```text
TCP 9907        برنامه MeetAzi در اسکریپت Windows
TCP 80/443      Reverse proxy / HTTPS
UDP 3478        TURN/STUN
UDP 49160-49200 بازه relay در template مربوط به Coturn
UDP 49160-65000 بازه relay در Node TURN server.js
```

فقط بازه‌ای را باز کنید که مربوط به TURN انتخابی شماست.

---

## نکات Deployment روی سرور ایران

برای اجرای پایدارتر روی سرور ایران پیشنهاد می‌شود:

- MeetAzi را پشت HTTPS اجرا کنید
- از TURN local استفاده کنید
- وابستگی به CDN خارجی را حذف یا کم کنید
- assetهای frontend را local نگه دارید
- پورت‌های UDP مربوط به TURN را درست باز کنید
- در صورت نیاز از Nginx یا IIS ARR به‌عنوان reverse proxy استفاده کنید
- فایل‌های `.env`، certificateها و credentialهای واقعی TURN را private نگه دارید

---

## نکات امنیتی

فایل‌های runtime، secretها و لاگ‌ها را commit نکنید.

در `.gitignore` موارد زیر ignore شده‌اند:

```text
.env
.env.*
node_modules/
*.log
cert.pem
key.pem
*.pem
*.key
*.crt
turnserver.conf
backup-*/
```

فایل‌های template قابل نگهداری در repo هستند:

```text
.env.template
turnserver.template.conf
config.template.js
```

قبل از push کردن، حتماً staged fileها را بررسی کنید:

```bash
git diff --cached --name-only
```

مطمئن شوید secret، certificate، private key، log، backup یا `node_modules` داخل commit نیست.

---

## اعتبار و تشکر

MeetAzi Stack بر پایه [MiroTalk P2P](https://github.com/miroslavpejic85/mirotalk) ساخته شده است.

MiroTalk یک پروژه متن‌باز WebRTC برای تماس ویدیویی real-time است. این fork با حفظ اعتبار پروژه اصلی، روی آماده‌سازی deployment، حذف وابستگی CDN، رفع مشکلات chat/message، تنظیم TURN و اجرای ساده‌تر روی Windows Server تمرکز دارد.

از maintainerها و contributorهای پروژه اصلی MiroTalk بابت زحماتشان تشکر می‌کنیم.

---

## مجوز / License

این پروژه یک fork/customized deployment stack بر پایه MiroTalk است. پروژه اصلی MiroTalk تحت مجوز **GNU Affero General Public License v3.0 (AGPL-3.0)** منتشر شده است.

از آن‌جایی که این پروژه بر پایه نرم‌افزار AGPL ساخته شده، تعهدات همین license ممکن است برای این fork و نسخه‌های تغییر‌یافته‌ای که منتشر می‌شوند یا به‌صورت سرویس شبکه‌ای ارائه می‌شوند نیز اعمال شود.

لطفاً موارد زیر را بررسی کنید:

- فایل `LICENSE` موجود در پروژه
- repository اصلی MiroTalk
- متن کامل AGPL-3.0

پروژه اصلی: [MiroTalk](https://github.com/miroslavpejic85/mirotalk)
