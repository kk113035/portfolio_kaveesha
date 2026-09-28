# Kaveesha Punchihewa — Portfolio (game-style)

A single-page, dependency-free portfolio: vanilla HTML/CSS/JS, no build step, no framework.

## Folder structure

```
portfolio-game/
├── index.html          # page structure/content
├── css/
│   └── style.css        # theme variables, layout, animations
├── js/
│   └── main.js            # particle bg, typing effect, scroll reveal, modal, theme toggle
├── assets/
│   ├── cv/                # put your CV PDF here (e.g. assets/cv/cv.pdf)
│   └── images/            # any screenshots/images you add later
└── README.md
```

## Run it locally

No install needed — just open `index.html` in a browser. For a proper local server (some browsers block certain features on `file://`):

```bash
cd portfolio-game
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Adding your CV

1. Drop your PDF at `assets/cv/cv.pdf`
2. In `index.html`, find the disabled CV button:
   ```html
   <button class="btn btn-primary" id="cvBtn" disabled title="CV loading soon">
   ```
3. Replace it with a real link:
   ```html
   <a class="btn btn-primary" href="assets/cv/cv.pdf" download>
     <span>⇩</span> Download CV
   </a>
   ```

## Adding contact links

In `index.html`, under `<section id="contact">`, replace each `href="#" onclick="return false"` with your real link (`mailto:you@email.com`, your GitHub URL, your LinkedIn URL), and delete `onclick="return false"` and `aria-disabled="true"` so they become clickable — also remove the `opacity:.55; cursor:not-allowed;` styling for `.contact-card` in `css/style.css` once they're live.

## Hosting for free — GitHub Pages

```bash
cd portfolio-game
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/<your-username>/portfolio.git
git push -u origin main
```

Then: repo → **Settings → Pages → Source: `main` branch** → save. Live in ~1 minute at:
`https://<your-username>.github.io/portfolio/`

Netlify/Vercel work the same way (drag-and-drop the folder or connect the GitHub repo) if you want a custom-domain-ready alternative.

## Editing later

- **Add a project**: duplicate a `.level-card` block in `index.html`, then add a matching entry to the `LEVELS` object in `js/main.js` (used by the click-to-expand modal).
- **Add a skill/stat**: duplicate a `.stat-row` in `index.html` inside the right `.stat-block`; `data-value` controls the animated bar fill %.
- **Change colors**: everything is CSS variables at the top of `css/style.css` (`:root` = dark, `body[data-theme="light"]` = light).
