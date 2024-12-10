import { Category, Question } from '../types';

export async function loadAllCategories(): Promise<Category[]> {
  const categories = ['science', 'history', 'art', 'literature', 'music', 'geography', 'technology'];
  const loadedCategories: Category[] = [];

  for (const category of categories) {
    try {
      const response = await import(`../data/categories/${category}.json`);
      loadedCategories.push(response.default);
    } catch (error) {
      console.error(`Failed to load category: ${category}`, error);
    }
  }

  return loadedCategories;
}

export function createRandomCategory(categories: Category[]): Category {
  const allQuestions = categories.flatMap(category => 
    category.questions.map(q => ({ ...q, originalCategory: category.category }))
  );
  
  // Shuffle all questions
  const shuffledQuestions = [...allQuestions].sort(() => Math.random() - 0.5);

  return {
    category: 'Random Mix',
    description: 'A mix of questions from various categories',
    questions: shuffledQuestions // Use all questions instead of slicing
  };
}

export async function loadCategoryQuestions(categoryId: string): Promise<Category> {
  try {
    const response = await import(`../data/categories/${categoryId}.json`);
    return response.default;
  } catch (error) {
    console.error(`Failed to load category: ${categoryId}`, error);
    throw error;
  }
}