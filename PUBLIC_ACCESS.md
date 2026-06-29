# Public Access

This project uses Cloudflare Tunnel for public access. It does not use ngrok.

## First-Time Setup

Install Cloudflare Tunnel once:

```bash
npm run install:cloudflared
```

Close and reopen the terminal after installation if `cloudflared` is still not recognized.

## Start Public Access

Run:

```bash
npm run public
```

The script will:

1. Build the app.
2. Start the local service on port `401`.
3. Start a Cloudflare Tunnel.
4. Print a public URL like:

```text
https://example-example-example.trycloudflare.com
```

Send that `https://*.trycloudflare.com` URL to other people. They can open it from another network, another city, or a phone on mobile data.

## Important

- Keep the `npm run public` terminal open.
- The `trycloudflare.com` URL is temporary and may change next time you run it.
- Anyone with the URL can access the app while the tunnel is running.
