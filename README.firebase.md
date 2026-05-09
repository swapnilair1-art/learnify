This project is prepared to deploy to Firebase Hosting backed by a Cloud Function that serves Next.js.

Quick steps to deploy (run locally in project root):

1. Install Firebase CLI (recommended locally or globally):

```bash
npm install -g firebase-tools
# or use npx: npx firebase
```

2. Login and select your project:

```bash
firebase login
firebase use --add
# enter your Firebase project id when prompted
```

3. Build the Next.js app and prepare functions artifacts:

```bash
npm run build
npm run postbuild
npm run prepare:functions
```

4. Set production environment variables (example):

```bash
# For runtime secrets used by Cloud Functions
firebase functions:config:set openai.key="YOUR_OPENAI_KEY" supabase.url="..." supabase.key="..."

# For NEXT_PUBLIC_* variables needed at build time, create .env.production
```

5. Deploy hosting + functions:

```bash
firebase deploy --only hosting,functions
```

Notes:
- Replace `YOUR_FIREBASE_PROJECT_ID` in `.firebaserc` or use `firebase use` to set the default project.
- Firebase Hosting uses HTTPS by default.
- Ensure `functions/.next` exists (the `postbuild` script copies it). Functions will serve the app.
- If your app requires large server bundles, consider deploying to Cloud Run and rewriting Hosting to the Cloud Run service.
