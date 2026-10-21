# MeetAzi Stack
[![DevSponsors](https://devsponsors.github.io/assets/badges/sponsor.svg)](https://devsponsors.github.io)
[![DevSponsors](https://devsponsors.github.io/assets/badges/member.svg)](https://devsponsors.github.io)

**MeetAzi Stack** is a customized, Iran-friendly, self-hosted deployment stack based on [MiroTalk P2P](https://github.com/miroslavpejic85/mirotalk).

This project keeps the core idea and foundation of MiroTalk, but packages it as **MeetAzi** with practical fixes and deployment changes for real-world self-hosting, especially on Windows Server and servers where access to external CDNs or global services may be limited.

> ❤️ Big shout-out to the original MiroTalk project and its contributors. MeetAzi exists because of the excellent work done in MiroTalk.

## Persian Documentation

نسخه فارسی این مستندات در فایل زیر قرار دارد:

[README.fa.md](README.fa.md)

---


## What Is MeetAzi?

MeetAzi is a customized fork of MiroTalk focused on making browser-based video meetings easier to run on private infrastructure.

It is designed for cases where you want:

- A self-hosted WebRTC meeting system
- A deployment that works better on Iran-based servers
- Fewer runtime dependencies on external CDN resources
- Localized frontend assets
- A fixed and more stable chat/message experience
- TURN/STUN support for more reliable connectivity
- A Windows Server friendly setup

The project is structured as a full stack around the customized MiroTalk application, with TURN configuration and helper scripts included.

---

## Repository Structure

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

## Main Changes in This Fork

### 1. Rebranded and Customized as MeetAzi

The original MiroTalk application has been customized and prepared under the MeetAzi name.

This includes frontend/UI changes, custom styles, localized assets, and deployment scripts for running the app as a dedicated MeetAzi instance.

---

### 2. CDN-independent Runtime

One of the main goals of this fork is to make the application work without depending on external CDN resources as much as possible.

This is especially useful for:

- Iran-based servers
- Restricted networks
- Environments where external CDNs are slow, blocked, unstable, or unreliable
- Private/self-hosted deployments that should not depend on third-party asset delivery

Frontend assets and libraries have been localized where needed so the application can continue working even when external CDN access is limited.

---

### 3. Chat and Message Fixes

This fork includes fixes and improvements around the MiroTalk chat/message experience.

The customized version focuses on:

- Fixing chat message sending issues
- Fixing message display/rendering issues
- Improving chat layout behavior
- Fixing placeholder and text display problems
- Making the in-meeting chat more stable and usable

---

### 4. Better Fit for Iran-based Servers

MeetAzi was prepared with Iran-based server deployment in mind.

The changes focus on reducing common deployment problems such as:

- External CDN dependency
- TURN/STUN connectivity issues
- Network limitations affecting WebRTC behavior
- Need for local assets
- Need for a predictable Windows Server setup
- Need for deployable config templates instead of hard-coded secrets

---

### 5. TURN Server Support

The repository includes two TURN-related options:

#### Option A: Coturn

A Coturn template is available at:

```text
coturn/turnserver.template.conf
```

This template uses:

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

Use this if you want to run a production-grade Coturn service.

#### Option B: Node TURN

A Node-based TURN helper exists at:

```text
node-turn/server.js
```

The included startup file is:

```text
node-turn/start-node-turn.cmd
```

This Node TURN setup listens on UDP port `3478` and uses a relay port range defined in `server.js`.

> Important: Do not run Coturn and Node TURN on the same server/port at the same time unless you intentionally configure different ports. Both commonly use port `3478`.

---

### 6. Windows Server Startup Scripts

MeetAzi includes Windows `.cmd` startup scripts.

The main app script is:

```text
mirotalk/mirotalk/start-meetazi.cmd
```

By default, it:

- Changes directory to `E:\apps\mirotalk\mirotalk`
- Sets `PORT=9907`
- Creates `app/src/config.js` from `app/src/config.template.js` if missing
- Starts the app with Node.js
- Writes logs to `meetazi-autostart.log`

The Node TURN startup script is:

```text
node-turn/start-node-turn.cmd
```

It starts the Node TURN server and writes logs to `node-turn-autostart.log`.

---

## Requirements

Install the following before running the stack:

- Windows Server or Linux server
- Node.js
- npm
- Git
- A domain or subdomain pointing to your server
- Open firewall ports for the app and TURN server
- Optional but recommended: Coturn for production TURN service

For Windows Server, the included scripts assume Node.js is installed at:

```text
C:\Program Files\nodejs\node.exe
```

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/TheGreatAzizi/MeetAzi-Stack.git
cd MeetAzi-Stack
```

---

### 2. Install MeetAzi/MiroTalk Dependencies

```bash
cd mirotalk/mirotalk
npm install
```

The application package includes the standard MiroTalk start script:

```bash
npm start
```

which runs:

```bash
node app/src/server.js
```

---

### 3. Create Runtime Configuration

Copy the environment template:

#### Windows

```bash
copy .env.template .env
```

#### Linux/macOS

```bash
cp .env.template .env
```

Then edit `.env` and configure your domain, ports, TURN/STUN settings, authentication options, and deployment-specific values.

Also make sure `app/src/config.js` exists. The Windows startup script can create it automatically from:

```text
app/src/config.template.js
```

---

## Running MeetAzi

### Windows Server

From the app directory:

```bash
cd mirotalk/mirotalk
start-meetazi.cmd
```

By default, the script runs MeetAzi on:

```text
PORT=9907
```

So your reverse proxy or firewall should point to this port if you keep the default script unchanged.

---

### Direct Node Run

```bash
cd mirotalk/mirotalk
npm start
```

or:

```bash
node app/src/server.js
```

---

## TURN Setup

WebRTC may require a TURN server when users are behind NAT, strict firewalls, mobile networks, or restricted networks. For Iran-based deployments, TURN is highly recommended.

### Coturn Setup

1. Copy the template:

```bash
copy coturn\turnserver.template.conf coturn\turnserver.conf
```

2. Edit these values:

```text
external-ip=YOUR_SERVER_PUBLIC_IP
realm=turn.your-domain.com
server-name=turn.your-domain.com
user=meetazi:YOUR_STRONG_PASSWORD
```

3. Open the required ports:

```text
UDP 3478
UDP 49160-49200
```

4. Configure your MeetAzi `.env` or app config to use the TURN server.

---

### Node TURN Setup

1. Go to the Node TURN directory:

```bash
cd node-turn
npm install
```

2. Edit `server.js`:

```text
externalIps
credentials
realm
```

3. Start it on Windows:

```bash
start-node-turn.cmd
```

4. Make sure the required UDP ports are open.

> The Node TURN server included here is useful for simple/self-hosted deployments. For production-grade TURN service, Coturn is usually the stronger option.

---

## Recommended Firewall Ports

Depending on your configuration:

```text
TCP 9907        MeetAzi app, if using the included Windows script
TCP 80/443      Reverse proxy / HTTPS
UDP 3478        TURN/STUN
UDP 49160-49200 Coturn relay range from the included template
UDP 49160-65000 Node TURN relay range from server.js, if using Node TURN
```

Use only the relay range that matches the TURN option you actually run.

---

## Deployment Notes for Iran-based Servers

This fork was prepared to reduce common issues when deploying MiroTalk-like WebRTC apps on Iran-based servers.

Recommended setup:

- Serve MeetAzi behind HTTPS
- Use a local TURN server
- Avoid external CDN dependencies
- Keep frontend assets local
- Open UDP TURN ports correctly
- Use a reverse proxy such as Nginx or IIS ARR if needed
- Keep `.env`, certificates, and real TURN credentials private

---

## Security Notes

Do not commit runtime secrets or generated files.

The `.gitignore` is configured to avoid committing common sensitive or heavy files such as:

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

Template files are safe to keep in the repository:

```text
.env.template
turnserver.template.conf
config.template.js
```

Before pushing changes, check:

```bash
git diff --cached --name-only
```

Make sure no secrets, logs, certificates, private keys, or backup folders are staged.

---

## Credits

MeetAzi Stack is based on [MiroTalk P2P](https://github.com/miroslavpejic85/mirotalk).

MiroTalk is an open-source WebRTC video conferencing project. This fork keeps credit to the original project and builds on top of it with deployment-focused customization, CDN-independent usage, chat/message fixes, TURN configuration, and Windows Server friendly scripts.

Special thanks to the original MiroTalk maintainers and contributors.

---

## License

This project is a fork/customized deployment stack based on MiroTalk, which is licensed under the **GNU Affero General Public License v3.0 (AGPL-3.0)**.

Because this project is based on AGPL-licensed software, the same license obligations may apply to this fork and to any modified versions distributed or offered as a network service.

Please review:

- The included `LICENSE` file
- The original MiroTalk repository
- The full AGPL-3.0 license text

Original project: [MiroTalk](https://github.com/miroslavpejic85/mirotalk)
