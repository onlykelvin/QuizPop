import React from 'react';
import { useQuizStore } from '../store/quizStore';

export function Header() {
  const { selectedCategory } = useQuizStore();

  if (selectedCategory) {
    return null;
  }

  return null;
}