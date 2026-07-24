# aaryateja.github.io

Personal site — [aaryateja.github.io](https://aaryateja.github.io/)

Plain HTML, CSS and JavaScript. No framework, no build step, no dependencies.

| File | What's in it |
| --- | --- |
| `index.html` | All markup and content |
| `styles.css` | Global styles, contact panel, breakpoints |
| `script.js` | Intro loader, momentum scroll, cursor dot, reveals, marquee, contact panel |

## Run it locally

```bash
python3 -m http.server 4173
```

Then open <http://localhost:4173>. It **must** be served over HTTP — opening `index.html`
as a `file://` URL leaves the scripts blocked, so the intro loader sits at 0 and nothing
initialises.

## Contact form

The panel posts to [FormSubmit](https://formsubmit.co), which relays to the address in
`FORM_ENDPOINT` in the contact-panel block of `script.js`.

FormSubmit **rejects requests from localhost** — it checks the origin and returns
"Make sure you open this page through a web server". Submitting locally will always show
the error state; that is expected, not a bug. Test on the deployed site.

To keep the destination address out of page source, swap the endpoint for the random
alias FormSubmit issues after activation:

```js
const FORM_ENDPOINT = 'https://formsubmit.co/ajax/<your-alias>';
```

## Deploying

Every push to `main` runs `.github/workflows/deploy.yml`, which publishes the repo root to
GitHub Pages as-is. There is nothing to compile.

## History

This replaced a React + Vite + TypeScript version of the portfolio. That code is not on
any branch — recover it from git history (`git log -- src/`) if you need it.
