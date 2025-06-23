# 🌐 FutureSocial

**FutureSocial** is a minimalist social media platform built with Next.js, Firebase, and Cloudinary. Users can sign up, create posts, view a global feed, upload and view stories, and explore public profiles.

---

## 🚀 Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Firebase** (Auth + Firestore)
- **Cloudinary** (Image uploads for stories)
- **Tailwind CSS** (UI Styling)
- **Vercel** (Deployment)

---

## ⚙️ Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/future-social.git
cd future-social
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Firebase & Cloudinary

Create a `.env.local` file in the root directory and fill it with your Firebase credentials:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id (optional)
```

Also set up a Cloudinary unsigned upload preset and store your cloud name in the `story/page.tsx` file:

```ts
const cloudName = 'your_cloud_name'
const uploadPreset = 'your_unsigned_preset'
```

### 4. Run locally

```bash
npm run dev
```

---

## ✨ Key Features

- 🔐 **User Authentication** (Signup / Login with Firebase Auth)
- 📝 **Post Creation** (text + optional image)
- 📰 **Global Feed** (realtime Firestore updates)
- 👤 **User Profiles** (`/profile/[uid]`)
- 🔍 **Search** users and post content
- 📸 **Stories Upload** (Cloudinary + Firestore)
- 👁 **Story Viewer Modal** (click on profile pic to view)
- 👏 **Like (Clap) System**
- 🧠 **Protected Routes** using custom context

---

## ⚠️ Limitations / Known Issues

- ❌ No comment or follow system (yet)
- ⚠️ Stories do not expire after 24 hours (optional feature)
- 🛑 No notifications or DM support
- 📱 Limited mobile responsiveness (basic Tailwind applied)

---

## 📦 Deployment

Deployed via **Vercel**\
🔗 Live site: https://future-university-social-1671920je-garvits-projects-104731e1.vercel.app

---

## 📄 License

MIT License — free to use, modify, and distribute.

---

## 💬 Contributions

Pull requests are welcome! If you'd like to suggest features or report bugs, open an issue or reach out.

---

## 🙌 Author

Made by **Garvit Gupta**\
🎓 B.Tech CSE | Thapar University\


