# Golden Pushers Production — Static Site

A plain **HTML / CSS / JS** rebuild of the site. No build step, no framework,
no npm install required to view it — open `index.html` in a browser and
everything works except the contact form (see below).

## Structure

```
index.html            Homepage — hero sequence, services, gallery, team, contact
about.html             Services accordion (click to expand)
team.html               Full team grid (click a person for their bio)
work.html                Portfolio with category filters
work-*.html         6 individual project pages
contact.html          Standalone contact page (same form/backend as homepage)

css/
  base.css              Palette, typography, layout primitives
  layout.css            Navbar, footer, mobile drawer
  home.css              Homepage sections (hero, ethos, craft, gallery, enquire)
  pages.css             About/Team/Work/Contact page styles

js/
  hero-sequence.js      Scroll-scrubbed canvas image sequence (the hero animation)
  main.js                  Navbar behavior, mobile drawer, scroll-reveal, modal helper
  home.js                  Homepage-only: services accordion, team modal, contact form
  pages.js                 About/Team/Work-only: accordion, team modal, filters

assets/
  sequence/             240 WebP frames for the hero scroll animation
  team/                    Real team photos
  work/                    Real work photos

server.js               Minimal Express backend — ONLY handles /api/send-email
package.json           Just express + resend, for server.js
.env.example           Copy to .env and add your Resend API key
```

## Running it

**Just browsing the design?** Open `index.html` directly in a browser — everything
works (animations, accordions, modals, filters) except the contact form, which
needs a live backend to actually send an email.

**Full functionality (including the contact form):**
```bash
npm install
cp .env.example .env
# edit .env and add your Resend API key
npm start
```
Then visit `http://localhost:3000`.

## Why there's a server.js at all

Sending email requires an API key that can never be exposed in browser
JavaScript — so a tiny backend is unavoidable for the contact form to
actually deliver mail, exactly as it was in the original React version's
`/api/send-email` route. Everything else on the site is genuinely static
and needs no server.

`server.js` is intentionally minimal — no framework beyond Express, no ORM,
no build step. It:
- Escapes all user input before it goes into the email HTML (prevents HTML/script injection)
- Validates email format and field lengths server-side
- Rate-limits to 5 submissions per IP per 10 minutes
- Includes a honeypot field check (silently drops bot submissions)
- Sets `replyTo` so you can reply directly to the enquirer
- Never leaks internal error details to the browser

## Notes on content

- Contact info (phone `+91 80865 60664`, Instagram `@goldenpushers`) was
  corrected to match the studio's real, verified Instagram business page.
- Team names, roles, and photos are the real team — no placeholder/stock people.
- Work page uses the 6 real photos already in the project (`assets/work/ig-*.jpg`)
  rather than the fictional European wedding locations and stock Unsplash
  images the previous version had.
- The contact form has one implementation, used identically on the homepage
  and the standalone contact page — the original had two different, partly
  broken forms posting to two different services.

## Browser support

Built on plain CSS Grid/Flexbox, `IntersectionObserver`, and Canvas —
works in every browser from the last ~5 years. No polyfills included;
add them if you need to support older browsers.
