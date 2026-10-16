# Niharika P: Cybersecurity Portfolio

A static portfolio built with HTML, CSS and vanilla JavaScript. No build step, no dependencies. Works on GitHub Pages.

```
portfolio/
├── index.html
├── css/style.css
├── js/script.js
├── assets/
│   ├── resume.pdf        <- you add this
│   └── images/           <- screenshots go here
└── README.md
```

## Preview locally
Open `index.html` in a browser, or run `python3 -m http.server 8000` in this folder and visit http://localhost:8000.
(The "missing resume" check only works over http, not when opening the file directly.)

## Replace placeholders
- **Email:** set `EMAIL` at the top of `js/script.js`. The Contact card becomes a `mailto:` link.
- **Training, dates, years:** search `index.html` for text in `[square brackets]`.
- **Labs:** edit each `.lab` card. When a lab is finished, change `data-status="ongoing"` to `"completed"` and the badge text to `Completed`.
- **Skills:** a tag with class `on` is "practised", without it is "learning". Adjust to match your real experience.
- **Certifications:** replace the "None listed yet" line only with certifications you have earned.
- **Screenshots:** save as `assets/images/sentinel-dashboard.png` and swap the placeholder as described in the HTML comment.
- **More projects:** copy the template comment in the Projects section.

## Add your resume
Save your PDF as `assets/resume.pdf` (exact name, lowercase). Until then, the Resume buttons show instructions instead of a broken page.

## Upload to GitHub
1. Create a repository, e.g. `portfolio` (or `niharika30p-coder.github.io` for a root URL).
2. Upload the folder contents so `index.html` is at the repository root (drag and drop on github.com works), or:
   `git init && git add . && git commit -m "Add portfolio" && git branch -M main && git remote add origin <repo-url> && git push -u origin main`

## Enable GitHub Pages
Repository **Settings → Pages → Build and deployment**: Source = *Deploy from a branch*, Branch = `main`, folder = `/ (root)`, then Save. The site appears after a minute or two at `https://niharika30p-coder.github.io/<repo-name>/`.

## Verify after publishing
- [ ] Page loads with styles and scripts (no 404s in the browser console)
- [ ] All nav links scroll to the right sections; mobile menu opens and closes
- [ ] GitHub, LinkedIn, TryHackMe and the SENTINEL repo links open correctly
- [ ] `assets/resume.pdf` opens from every Resume button
- [ ] Email link works after you set `EMAIL`
- [ ] Lab filter, theme toggle and back-to-top work
- [ ] No horizontal scrolling at 360px, 390px, 768px, 1024px and 1440px
- [ ] No `[placeholder]` text remains that you did not intend

> This site was written without browser testing. Please run the checklist above yourself.
