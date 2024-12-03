import { Category } from '../types';

export async function loadAllCategories(): Promise<Category[]> {
  const categories = ['science', 'history', 'art'];
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
  
  // Shuffle questions
  const shuffledQuestions = [...allQuestions].sort(() => Math.random() - 0.5);
  
  // Take first 5 questions or all if less than 5
  const selectedQuestions = shuffledQuestions.slice(0, 5);

  return {
    category: 'Random Mix',
    questions: selectedQuestions
  };
}