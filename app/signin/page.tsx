"use client";
import React from 'react';
import dynamic from 'next/dynamic';

const SignIn = dynamic(() => import('@clerk/nextjs').then((m) => m.SignIn), { ssr: false });

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cognitive-white p-6">
      <div className="max-w-md w-full bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Sign in to Learnify</h2>
        <SignIn path="/signin" routing="path" signUpUrl="/signup" />
      </div>
    </div>
  );
}
