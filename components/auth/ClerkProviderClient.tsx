"use client";
import React from 'react';
import { ClerkProvider } from '@clerk/nextjs';

export default function ClerkProviderClient({ children }: { children: React.ReactNode }) {
  const frontendApi = process.env.NEXT_PUBLIC_CLERK_FRONTEND_API ?? '';
  // If no Clerk frontend API is configured for local development, render children directly.
  if (!frontendApi) return <>{children}</>;

  return <ClerkProvider frontendApi={frontendApi}>{children}</ClerkProvider>;
}
