# Hotel Booking App

## Run locally

Install dependencies and start the app and its local API together:

```sh
npm install
npm run dev
```

The development command starts Vite and the JSON Server API on port 5000.

To run only the API, use `npm run server`.

## Deploy to Render

The root `render.yaml` defines a static frontend and a Node.js API. Push the project
to a GitHub repository, then create a Blueprint in Render and connect that
repository. Render will build both services and set the frontend API URL
automatically.

The API uses a 1 GB persistent disk for `server/db.json`, so bookmarks survive
restarts and redeploys. Render requires a paid web-service plan for persistent
disks; review the current price in Render before creating the Blueprint. The
database is seeded from `server/db.json` the first time the API starts with an
empty disk.
