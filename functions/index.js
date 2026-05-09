const functions = require('firebase-functions');
const next = require('next');

// In Cloud Functions, NODE_ENV will be 'production'.
const dev = process.env.NODE_ENV !== 'production';

// Map Firebase functions config to process.env for runtime secrets
try {
  const cfg = functions.config();
  if (cfg.openai && cfg.openai.key) process.env.OPENAI_API_KEY = process.env.OPENAI_API_KEY || cfg.openai.key;
  if (cfg.supabase) {
    process.env.SUPABASE_URL = process.env.SUPABASE_URL || cfg.supabase.url;
    process.env.SUPABASE_KEY = process.env.SUPABASE_KEY || cfg.supabase.key;
  }
  if (cfg.clerk && cfg.clerk.frontend_api) {
    process.env.NEXT_PUBLIC_CLERK_FRONTEND_API = process.env.NEXT_PUBLIC_CLERK_FRONTEND_API || cfg.clerk.frontend_api;
  }
  if (cfg.app && cfg.app.demo_user_id) {
    process.env.NEXT_PUBLIC_DEMO_USER_ID = process.env.NEXT_PUBLIC_DEMO_USER_ID || cfg.app.demo_user_id;
  }
  if (cfg.database && cfg.database.url) process.env.DATABASE_URL = process.env.DATABASE_URL || cfg.database.url;
} catch (e) {
  // functions.config() may be empty in local dev; ignore
}

// distDir should point to the .next folder inside functions (we copy it there during postbuild)
const app = next({ dev, conf: { distDir: '.next' } });
const handle = app.getRequestHandler();

exports.nextServer = functions.https.onRequest((req, res) => {
  return app.prepare().then(() => handle(req, res));
});
