# Southampton Cruise Wayfinding · Pitch Demo

Visit Southampton cruise day out, ready to deploy on Railway via GitHub.

A single-page web app for cruise passengers: NFC-driven city wayfinding, four themed tours (History, Food & Drink, Retail, Snow Trail), passport gamification with three discount rewards, supportive safety screen, and a live Whats On feed.

Built as a self-contained static HTML file. No build step, no framework, no database. Just upload and go.

---

## What's in this folder

```
southampton-cruise-deploy/
├── server.js          Zero-dependency Node.js static server
├── package.json       Node 20+ config, start script
├── prepare.js         One-time script to pull in the live HTML
├── railway.json       Railway build & deploy config
├── .gitignore         Standard Node ignores
├── public/            Folder where index.html will live
│   └── .gitkeep
└── README.md          This file
```

---

## Step 1 · One-time content prep

The live HTML demo lives one level up in the parent folder. Copy it into `public/index.html` using whichever option is easiest:

- **Windows (easiest):** double-click `setup.bat`
- **Mac or Linux:** `bash setup.sh`
- **Anywhere with Node installed:** `node prepare.js`

All three do the same thing: copy `../Southampton_Cruise_Wayfinding_v1.html` over the placeholder at `public/index.html`.

You should see a confirmation like:

```
  OK: Copied to public/index.html
```

Re-run any time the source HTML is updated.

> **What's in public/index.html before you run setup?** A placeholder page explaining this step. If you forget to run setup and push anyway, Railway deploys the placeholder, which displays the same setup instructions. Better than a 404.

---

## Step 2 · Local test (optional)

Test that the server works before pushing:

```bash
npm start
```

Then open `http://localhost:3000` in a browser. You'll see the welcome screen. Try `?tag=bargate` to simulate an NFC tap.

`Ctrl+C` to stop.

---

## Step 3 · Push to GitHub

You'll need a GitHub account. If you don't have the `gh` CLI, just create the repo via the web UI first (https://github.com/new), call it `southampton-cruise-wayfinding`, and leave it empty.

Then from this folder:

```bash
git init
git add .
git commit -m "Initial Southampton cruise wayfinding pitch demo"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/southampton-cruise-wayfinding.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub handle.

---

## Step 4 · Deploy on Railway

1. Go to **https://railway.app** and sign in with GitHub
2. Click **New Project** → **Deploy from GitHub repo**
3. Pick the repo you just pushed
4. Railway auto-detects Node.js. It runs `npm install`, then `npm start`
5. Within ~60 seconds the deploy completes. You'll see green checkmarks
6. Click **Settings → Networking → Generate Domain** (if Railway didn't auto-assign one)
7. Open the generated URL. The app should load on the welcome screen

That's it. The app is live.

---

## Step 5 · Demo URLs to share

Once deployed, you can share these for testing or in the pitch:

| Scenario | URL |
|---|---|
| Cold start (welcome flow) | `https://your-app.up.railway.app/` |
| Arrive at cruise terminal via NFC | `https://your-app.up.railway.app/?tag=cruise-terminal` |
| Arrive at Bargate | `https://your-app.up.railway.app/?tag=bargate` |
| Arrive at WestQuay | `https://your-app.up.railway.app/?tag=westquay` |
| Arrive at Cultural Quarter | `https://your-app.up.railway.app/?tag=cultural-quarter` |
| Arrive at Oxford Street | `https://your-app.up.railway.app/?tag=oxford-street` |
| Arrive at SeaCity Museum | `https://your-app.up.railway.app/?tag=seacity` |
| Arrive at Dancing Man Brewery | `https://your-app.up.railway.app/?tag=dancing-man` |
| Arrive at Old Town anchor | `https://your-app.up.railway.app/?tag=old-town` |
| Reset for next demo | `https://your-app.up.railway.app/?reset=1` |

---

## Step 6 · Updating the demo

When you change `Southampton_Cruise_Wayfinding_v1.html` in the parent folder:

```bash
node prepare.js              # re-copies the HTML into public/
git add public/index.html
git commit -m "Update demo"
git push
```

Railway auto-deploys on every push to `main`. Usually takes under a minute.

---

## Step 7 · Custom domain (optional)

For the pitch you might want a friendlier URL than the Railway default.

1. In Railway → **Settings → Networking → Add a Custom Domain**
2. Type something like `cruise.superspree.com` or `southampton-cruise.your-domain.com`
3. Railway gives you a CNAME target like `xyz.up.railway.app`
4. In your DNS provider (Cloudflare, GoDaddy, Namecheap), add a CNAME record pointing your chosen subdomain at that target
5. Wait for DNS to propagate (usually under 10 minutes)
6. The custom domain now serves the app

---

## Cost

Railway's Hobby plan ($5/month credit) is more than enough for this demo. The app is around 150 KB and serves static content with zero backend. Expect under £0.50/month for typical pitch demo traffic.

For production with cruise-passenger volumes, the next tier ($20/month) is comfortably sufficient. Real production wants a CDN (Cloudflare in front of Railway) to serve images cached at the edge — about 5 minutes to set up.

---

## NFC tag printing

When you're ready to deploy physical Loops in the city, each tag needs to encode the URL pattern:

```
https://your-app.up.railway.app/?tag=<hub-id>
```

Hub IDs in use: `cruise-terminal`, `bargate`, `westquay`, `old-town`, `cultural-quarter`, `oxford-street`, `seacity`, `dancing-man`.

For the Snow Trail (when active), each window has its own NFC URL: `?tag=snow-snowflake-7` etc. The pattern is `snow-<route>-<stopId>` where route is `snowflake` or `star` and stopId is 1 to 12 (Snowflake) or 1 to 11 (Star). Note: the snow-prefixed tag routing needs a small extension to `handleTag()` to wire stamps into `state.snowTrail` — flagged as a v1.1 enhancement in the spec.

For NFC tag writing, any NTAG215 chip with the iOS Shortcuts NFC writer or Android NFC Tools app will do. Pair each Loop with a printed QR card encoding the same URL as a fallback.

---

## What's deployed

This is **v1.0.5** of the demo, covering:

- Welcome flow with EN + DE locales (IT, NL, ES, FR shown but disabled)
- All-aboard countdown and return-to-ship route
- Three evergreen tours: History, Food & Drink, Retail
- Seasonal Snow Windows Trail (23 stops, two routes, submit form, prize code)
- Passport gamification (8 stamps, 3 reward tiers with redeemable codes)
- Whats On feed seeded with the real Southampton City Art Gallery New Acquisitions event
- Help screen with Ask for Angela, safe spots, dusk routes, port agent contact
- Reset for next demo footer link, plus `?reset=1` URL

See the companion `Southampton_Cruise_Wayfinding_Spec_v1.md` in the parent folder for the full design rationale and per-section documentation.

---

## Troubleshooting

**"Not Found. Did you run prepare.js?"** — You haven't run `node prepare.js` yet, or it ran from the wrong directory. Run it from inside `southampton-cruise-deploy/`.

**Railway build fails on `npm install`** — Check the build logs. Most likely Node version mismatch. The `engines.node` field in package.json says `>=20.0.0`. If Railway is using an older Node, set the version explicitly in Railway → Settings → Variables: `NIXPACKS_NODE_VERSION=20`.

**App loads but images don't show** — The images are hot-linked from Visit Southampton's CDN (assets.simpleviewinc.com). If those URLs change, you'll need to swap them in the HTML. The image URLs are all in the `HUBS`, `TOURS`, `WHATS_ON`, and `SNOW_TRAIL` constants.

**Web NFC doesn't work** — Web NFC only works on Android Chrome 89+. On iOS, NFC taps work as "tap to open URL" (the OS handles it), which still loads the app with the right `?tag=`. There's nothing to fix — this is by design.

**?reset=1 doesn't reset** — Check that the user hit the URL fresh (not via a back button). Browser caching can serve a stale page. Test in incognito.

---

Built by Stu · Superspree · 2026
