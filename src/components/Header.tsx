import React from 'react';
import { Brain } from 'lucide-react';

export function Header() {
  return (
    <header className="w-full py-6 px-8 bg-gradient-to-r from-purple-600 to-pink-600">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="w-8 h-8 text-white" />
          <h1 className="text-2xl font-bold text-white">QuizPop</h1>
        </div>
      </div>
    </header>
  );
}