# Personal Project Site — Volunteer & Youth Opportunities

This is a small static site that lists volunteer and extracurricular activities across the U.S., with a map view and filtering controls. It also includes a separate page for tutoring and youth academic resources.

How it works
- `index.html` — map + list of activities; filters: search, category, price, age group, availability, state.
- `opportunities.html` — lists activities that target `children` or `teens`.
- `data/activities.json` — sample dataset (add or update items here to update the site).
- `css/styles.css`, `js/main.js`, `js/opportunities.js` — client code.

Run locally
1. Serve the folder (recommended) with a local static server, e.g.:
```
python -m http.server 8000
```
2. Open `http://localhost:8000/index.html`.

Deploy
The repo already includes a GitHub Actions workflow that deploys to `gh-pages`. Make sure GitHub Pages source is set to the `gh-pages` branch (or push static build there).

Data updates
- To update listings, edit `data/activities.json` and push to the repo. The site fetches the JSON on load and periodically (every 5 minutes).

Privacy & Safety
- This repo contains only sample data. When adding real provider contact details, follow privacy best practices.
# Renara Personal Website

A lightweight, free personal website built with plain HTML, CSS, and JavaScript.

## Run locally

From this folder, start a local server:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

## Deploy for free

This site can be hosted for free using GitHub Pages or Netlify.

- GitHub Pages: push the folder to a GitHub repository and enable Pages.
- Netlify: drag-and-drop the folder into Netlify or connect a GitHub repo.

## Customize

- Update the name, content, and email address in `index.html`
- Edit colors and layout in `styles.css`
- Add project highlights later in the page sections
