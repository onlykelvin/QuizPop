import { useEffect } from 'react';
import { useQuizStore } from '../store/quizStore';

export function useNavigationHandler() {
  const { resetQuiz } = useQuizStore();

  useEffect(() => {
    // Handle popstate (back/forward button)
    const handlePopState = (event: PopStateEvent) => {
      event.preventDefault();
      resetQuiz();
    };

    // Handle beforeunload (page refresh/close)
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      resetQuiz();
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Push initial state
    window.history.pushState({ page: 'home' }, '', window.location.pathname);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [resetQuiz]);
}
