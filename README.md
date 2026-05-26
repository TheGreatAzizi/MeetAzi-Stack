# MeetAzi Stack

**MeetAzi Stack** is a customized self-hosted deployment stack based on **MiroTalk P2P**.

This repository is built on top of the excellent open-source [MiroTalk](https://github.com/miroslavpejic85/mirotalk) project.  
Huge thanks and shout-out to the original MiroTalk maintainers and contributors for building and maintaining a powerful WebRTC video conferencing platform.

> ❤️ Shout-out to MiroTalk and its contributors. This fork would not exist without their work.

## فارسی

نسخه فارسی این README در فایل زیر قرار دارد:

[مطالعه نسخه فارسی](README.fa.md)

---

## About This Fork

MeetAzi Stack is a customized fork/deployment stack of MiroTalk, prepared for a more independent, self-hosted, and production-friendly environment.

The goal of this fork is to make the application easier to deploy on private servers, reduce dependency on external services, and address practical issues encountered during real-world usage.

This version focuses on:

- Running without dependency on external CDN resources as much as possible
- Localizing required client-side assets
- Fixing chat/message related issues
- Improving the chat UI and message rendering behavior
- Preparing the stack for Windows Server deployment
- Including Coturn and Node TURN related configuration/templates
- Keeping secrets and runtime-only files out of Git

---

## Main Improvements

### 1. No External CDN Dependency

This fork has been adjusted so the application can run without relying on external CDN resources as much as possible.

Required frontend assets and libraries have been localized into the project where applicable. This helps the application remain usable in restricted networks or environments where external CDNs are blocked, slow, unreliable, or unavailable.

Benefits:

- More reliable self-hosted deployment
- Better control over frontend assets
- Reduced risk of third-party CDN outages
- Better compatibility with restricted or private networks
- Easier deployment on internal servers

---

### 2. Chat and Message Bug Fixes

This fork includes fixes and improvements around the chat and message experience.

The customized version focuses on:

- Fixing chat message sending/display issues
- Improving chat UI behavior
- Fixing placeholder and layout issues
- Improving message rendering stability
- Making the chat experience more reliable during meetings

---

### 3. Self-hosted Production Stack

This repository is structured as a deployment stack and includes:

- Customized MiroTalk application
- Coturn configuration template
- Node TURN helper service
- Windows Server startup scripts
- Safe configuration templates for environment-specific values

---

### 4. Windows Server Friendly Setup

This stack has been prepared for Windows Server style deployment, especially for setups running from paths such as:

```text
E:\apps
```

Startup scripts such as `start-meetazi.cmd` and `start-node-turn.cmd` are included to simplify service execution on Windows Server.

---

## Project Structure

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

## Components

### `mirotalk/mirotalk`

This directory contains the customized MiroTalk application.

It includes the backend, frontend, public assets, views, CSS, JavaScript, APIs, tests, widgets, and related application files.

---

### `coturn`

This directory contains a template configuration for Coturn.

> Important: The real `turnserver.conf` file should not be committed to Git because it may contain secrets, credentials, server IPs, domains, or certificate paths.

Use the provided template as a safe starting point:

```text
coturn/turnserver.template.conf
```

---

### `node-turn`

This directory contains the Node-based TURN helper service.

Main files:

```text
node-turn/server.js
node-turn/package.json
node-turn/start-node-turn.cmd
```

---

## Files That Should Not Be Committed

For security and repository cleanliness, avoid committing:

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

Safe template files may be committed:

```text
.env.template
turnserver.template.conf
config.template.js
```

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/TheGreatAzizi/MeetAzi-Stack.git
cd MeetAzi-Stack
```

---

### 2. Install MiroTalk Dependencies

```bash
cd mirotalk/mirotalk
npm install
```

---

### 3. Configure Environment Variables

Copy the environment template:

```bash
copy .env.template .env
```

On Linux/macOS:

```bash
cp .env.template .env
```

Then edit `.env` and configure your domain, ports, TURN/STUN settings, security options, and deployment-specific values.

---

### 4. Configure Coturn

Use the provided template:

```text
coturn/turnserver.template.conf
```

Copy it to your Coturn configuration path and update values such as:

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

### 5. Run the Application

On Windows Server:

```bash
start-meetazi.cmd
```

Or run directly with Node:

```bash
npm start
```

---

## Security Checklist

Before pushing or publishing the repository, always check staged files:

```bash
git diff --cached --name-only
```

Make sure none of these are included:

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

## Credits

This project is based on [MiroTalk P2P](https://github.com/miroslavpejic85/mirotalk).

MiroTalk is a self-hosted, open-source WebRTC video conferencing platform designed for real-time communication.  
Special thanks to the original MiroTalk maintainers and contributors for their work.

MeetAzi Stack is a customized fork/deployment stack focused on self-hosting, local assets, CDN-independent usage, chat/message fixes, and production-oriented deployment.

---

## License

This project is based on MiroTalk. Please review the included `LICENSE` file and the official MiroTalk repository for license details.
