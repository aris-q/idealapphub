# IdealAppHub — Setup & Go-Live Guide

How to deploy this site to **idealapphub.com** and operate it afterwards.
Stack: Next.js 16 · Firebase (Firestore + Google Auth, free Spark plan) · Vercel (free Hobby plan) · Cloudflare (DNS only).

---

## 1. Firebase console (one-time)

Project: **idealapphub** at [console.firebase.google.com](https://console.firebase.google.com)

### 1a. Publish Firestore rules
1. Firestore Database → **Rules** tab
2. Replace everything with the contents of [`firestore.rules`](firestore.rules) from this repo
3. Click **Publish**

Without this, the site shows no news/products data ("Missing or insufficient permissions").

### 1b. Enable Google sign-in
1. Authentication → **Sign-in method** tab
2. Click **Google** → Enable → pick a support email → Save

Admin login uses Google accounts. Who counts as an admin is controlled by the allowlist (see §6).

### 1c. Authorized domains
Authentication → **Settings** → Authorized domains → **Add domain**:
- `idealapphub.com`
- your `*.vercel.app` project domain (after step 3)

`localhost` is already there for local development.

> **Do not enable Cloud Storage** — it requires the paid Blaze plan. Product images use pasted URLs instead (see §7).

---

## 2. Push code to GitHub

```bash
git add .
git commit -m "your message"
git push
```

First time only — create an empty repo at github.com/new, then:

```bash
git remote add origin https://github.com/YOUR_USERNAME/idealapphub.git
git push -u origin main
```

`.env.local` is gitignored — it never gets pushed. Never paste it anywhere public.

---

## 3. Vercel project (one-time)

1. [vercel.com](https://vercel.com) → **Add New → Project** → import the GitHub repo
2. Framework is auto-detected (Next.js) — change nothing
3. Before deploying, add **Environment Variables** (copy values from `.env.local`):

```
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
```

4. **Deploy** → check the `idealapphub-xxx.vercel.app` URL works

---

## 4. Domain: Vercel + Cloudflare (one-time)

### In Vercel
Project → Settings → **Domains**:
- Add `idealapphub.com` (primary)
- Add `www.idealapphub.com` → choose **Redirect to idealapphub.com**
- Leave the `*.vercel.app` domain alone (free testing URL)

### In Cloudflare
DNS → Records — use the **exact values shown on the Vercel Domains page**
(Vercel now issues new-style values, e.g. A `216.198.79.1` and a per-project
CNAME like `xxxx.vercel-dns-0xx.com`; the old `76.76.21.21` /
`cname.vercel-dns.com` still work):

| Type  | Name  | Content                         | Proxy status |
|-------|-------|---------------------------------|--------------|
| A     | `@`   | IP from Vercel Domains page     | **DNS only (grey cloud)** |
| CNAME | `www` | CNAME from Vercel Domains page  | **DNS only (grey cloud)** |

**Keep the grey cloud.** Ignore Cloudflare's "proxying is required..." banner —
Vercel provides its own CDN/HTTPS/DDoS protection, and Cloudflare's orange-cloud
proxy breaks Vercel SSL issuance (redirect loops).

Wait a few minutes until Vercel Domains shows ✓ Valid Configuration and the SSL
certificate is issued. Site is live at https://idealapphub.com.

---

## 5. Verify the live site

- [ ] Home page: AI News populated (Hacker News items), Podcast thumbnails, Hackathons list + filters
- [ ] `/products` page renders (Coming Soon card until products are added)
- [ ] `/admin/login` → Sign in with Google works
- [ ] Add a test news post (with ★ Highlight) → appears on home page
- [ ] Add a test product → appears on `/products`
- [ ] Delete the test items

---

## 6. Managing admins

Admin access = Google account email on the allowlist, enforced in **two places**
(both must be updated):

1. [`lib/admins.js`](lib/admins.js) — gates the admin UI. Add the email to
   `ADMIN_EMAILS`, commit, push (auto-deploys).
2. [`firestore.rules`](firestore.rules) — gates actual database writes (the real
   security). Add the email to the `isAdmin()` list, then republish the rules in
   the Firebase console (§1a).

Anyone not on the list can press the Google button but is rejected with
"…is not an admin account."

---

## 7. Day-to-day operations

| Task | How |
|---|---|
| Publish site changes | `git push` → Vercel auto-deploys (~1 min) |
| Test changes online first | push a branch → Vercel gives a preview URL |
| Roll back a bad deploy | Vercel dashboard → Deployments → ⋯ → Promote previous |
| Post news / highlights | idealapphub.com/admin → News |
| Add products | idealapphub.com/admin → Products (image = paste a URL; put files in `public/` and use `/filename.png`) |
| Local development | `npm run dev` → http://localhost:3000 (uses the real Firestore) |
| Test production build locally | `npm run build && npm start` |

### External feeds (no maintenance needed)
- **AI News**: Hacker News stories mentioning AI, 50+ points, last 7 days — cached 30 min
- **Podcast**: All-In Podcast YouTube RSS — cached 30 min
- **Hackathons**: Devpost API, in-person USA/Canada, next 6 months — cached 6 h

If a source is down, its section is empty/skipped; the site still renders.

### Costs
Everything above runs on free tiers: Vercel Hobby, Firebase Spark, Cloudflare Free.
No credit card required anywhere. Watch for: Vercel Hobby is for non-commercial
use; if the site becomes a business, the Pro plan is $20/mo.
