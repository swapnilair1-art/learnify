"use client";
import React from 'react';
import dynamic from 'next/dynamic';

const SignUp = dynamic(() => import('@clerk/nextjs').then((m) => m.SignUp), { ssr: false });

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cognitive-white p-6">
      <div className="max-w-md w-full bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Create your Learnify account</h2>
        <SignUp path="/signup" routing="path" signInUrl="/signin" />
      </div>
    </div>
  );
}
