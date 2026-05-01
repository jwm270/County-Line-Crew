# County Line Crew

County Line Crew is a mobile-first scheduling and invoice app for mowing, cleanup, handyman, hauling, and property work.

The first goal is to build a simple phone-friendly app that can be opened in a browser, saved to a phone home screen later, and used to track customers, jobs, and invoices.

## Current Status

This repo currently includes the first working front-end prototype.

Built so far:

- Mobile-first HTML layout
- Phone-style dashboard
- Bottom navigation
- Home screen
- Jobs screen
- Customers screen
- Invoice preview screen
- Add job form
- Local browser storage for saved jobs

## How to Open the App

For now, this is a simple static web app.

Open this file in a browser:

```text
index.html
```

No install step is required yet.

## Project Files

```text
County-Line-Crew/
  README.md
  index.html
  styles.css
  app.js
  docs/
    app-plan.md
    feature-roadmap.md
    data-model.md
```

## First Version Goal

The first usable version should allow the owner to:

1. Add a customer
2. Add a job
3. View scheduled jobs
4. Track paid and unpaid work
5. Open a simple invoice preview
6. Use the app comfortably from a phone

## Planned Features

Near-term features:

- Better job list
- Customer add/edit form
- Job detail screen
- Paid/unpaid toggle
- Printable invoice view
- Search/filter jobs

Later features:

- PWA install support
- App icon
- Offline support
- Backend database
- Payment links
- Text/email confirmations

## Build Direction

Start simple with plain HTML, CSS, and JavaScript. Keep the app easy to understand and easy to move later.

Possible backend options later:

- Node.js and Express
- SQLite
- PostgreSQL
- Supabase
- Firebase

## Design Notes

The app should stay:

- Phone-first
- Fast
- Practical
- Large-button friendly
- Easy to read outside
- Simple enough for daily field work
