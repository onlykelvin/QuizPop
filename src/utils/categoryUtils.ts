import { Category, Question } from '../types';

export async function loadAllCategories(): Promise<Category[]> {
  const categories = [
    'art', 'history', 'music', 'science', 'geography',
    'technology', 'sports', 'food-drink', 'nature-environment',
    'pop-culture', 'mythology-folklore', 'languages-linguistics'
  ];
  
  const loadedCategories: Category[] = [];
  const currentLanguage = localStorage.getItem('preferred-language') || 'en';

  for (const category of categories) {
    try {
      const response = await import(`../data/translations/categories/${currentLanguage}/${category}.json`);
      loadedCategories.push(response.default);
    } catch (error) {
      // Fallback to English if translation is missing
      try {
        const fallbackResponse = await import(`../data/translations/categories/en/${category}.json`);
        loadedCategories.push(fallbackResponse.default);
        console.warn(`Missing ${currentLanguage} translation for category: ${category}, using English fallback`);
      } catch (fallbackError) {
        console.error(`Failed to load category: ${category}`, fallbackError);
      }
    }
  }

  return loadedCategories;
}

export function createRandomCategory(categories: Category[]): Category {
  const allQuestions = categories.flatMap(category => 
    category.questions.map(q => ({ ...q, originalCategory: category.category }))
  );
  
  const shuffledQuestions = [...allQuestions].sort(() => Math.random() - 0.5);
  const currentLanguage = localStorage.getItem('preferred-language') || 'en';

  return {
    category: currentLanguage === 'en' ? 'Random Mix' : 'Willekeurige Mix',
    description: currentLanguage === 'en' 
      ? 'A mix of questions from various categories' 
      : 'Een mix van vragen uit verschillende categorieën',
    questions: shuffledQuestions
  };
}

export async function loadCategoryQuestions(categoryId: string): Promise<Category> {
  const currentLanguage = localStorage.getItem('preferred-language') || 'en';
  
  try {
    const response = await import(`../data/translations/categories/${currentLanguage}/${categoryId}.json`);
    return response.default;
  } catch (error) {
    // Fallback to English if translation is missing
    try {
      const fallbackResponse = await import(`../data/translations/categories/en/${categoryId}.json`);
      console.warn(`Missing ${currentLanguage} translation for category: ${categoryId}, using English fallback`);
      return fallbackResponse.default;
    } catch (fallbackError) {
      console.error(`Failed to load category: ${categoryId}`, fallbackError);
      throw fallbackError;
    }
  }
}
