import React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode };

export default function ButtonPrimary({ children, className = '', ...props }: Props) {
  return (
    <button
      {...props}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white bg-focus-blue hover:brightness-105 transition ${className}`}>
      {children}
    </button>
  );
}
