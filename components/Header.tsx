import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-teal-600 text-white shadow-md">
      <div className="max-w-4xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">PharmaFriend</h1>
            <p className="text-teal-100 text-sm font-medium">Your Empathetic Medication Guide</p>
          </div>
        </div>
      </div>
    </header>
  );
};