import React from 'react';
import { useQuizStore } from '../store/quizStore';
import { Brain, BookOpen, Atom, Palette, Music, Globe, Cpu, Dumbbell, UtensilsCrossed, Leaf, Tv2, BookMarked, Languages, Gift, Snowflake, Sun, Cloud, BookHeart, Plane, Gamepad2, Heart, Shirt, Github, Linkedin } from 'lucide-react';
import { ShareButton } from './ShareButton';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LanguageToggle } from './LanguageToggle';
import { loadCategoryQuestions } from '../utils/categoryUtils';

export function Footer() {
  const { setCategory, setGameMode } = useQuizStore();
  const { t } = useTranslation();

  const handleCategorySelect = async (categoryId: string) => {
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      const categoryData = await loadCategoryQuestions(categoryId);
      setCategory(categoryData);
      setGameMode('classic');
    } catch (error) {
      console.error('Failed to load category:', error);
    }
  };

  const handleNavigation = (event: React.MouseEvent<HTMLAnchorElement>) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const mainCategories = [
    { id: 'science', name: t('categories.main.science'), icon: Atom },
    { id: 'history', name: t('categories.main.history'), icon: BookOpen },
    { id: 'art', name: t('categories.main.art'), icon: Palette },
    { id: 'literature', name: t('categories.main.literature'), icon: Brain },
    { id: 'music', name: t('categories.main.music'), icon: Music },
    { id: 'geography', name: t('categories.main.geography'), icon: Globe },
    { id: 'technology', name: t('categories.main.technology'), icon: Cpu },
    { id: 'sports', name: t('categories.main.sports'), icon: Dumbbell },
    { id: 'food-drink', name: t('categories.main.foodDrink'), icon: UtensilsCrossed },
    { id: 'nature-environment', name: t('categories.main.nature'), icon: Leaf },
    { id: 'pop-culture', name: t('categories.main.popCulture'), icon: Tv2 },
    { id: 'mythology-folklore', name: t('categories.main.mythology'), icon: BookMarked },
    { id: 'languages-linguistics', name: t('categories.main.languages'), icon: Languages },
  ];

  const specialCategories = [
    { id: 'new-year', name: t('categories.special.newYear'), icon: Gift },
    { id: 'christmas', name: t('categories.special.christmas'), icon: Gift },
    { id: 'easter', name: t('categories.special.easter'), icon: Gift },
    { id: 'santa-claus', name: t('categories.special.santaClaus'), icon: Gift },
    { id: 'winter', name: t('categories.special.winter'), icon: Snowflake },
    { id: 'summer', name: t('categories.special.summer'), icon: Sun },
    { id: 'autumn', name: t('categories.special.autumn'), icon: Cloud },
    { id: 'spring', name: t('categories.special.spring'), icon: Leaf },
    { id: 'book-club', name: t('categories.special.bookClub'), icon: BookHeart },
    { id: 'travel', name: t('categories.special.travel'), icon: Plane },
    { id: 'sci-fi-fantasy', name: t('categories.special.sciFiFantasy'), icon: BookMarked },
    { id: 'video-games', name: t('categories.special.videoGames'), icon: Gamepad2 },
    { id: 'health-wellness', name: t('categories.special.health'), icon: Heart },
    { id: 'fashion-style', name: t('categories.special.fashion'), icon: Shirt },
  ];

  return (
    <footer className="bg-white py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">{t('footer.mainCategories')}</h3>
            <div className="space-y-2">
            {mainCategories.map(({ id, name, icon: Icon }) => (
              <Link to="/" key={id}>
                <button
                  onClick={() => handleCategorySelect(id)}
                  className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors"
                >
                <Icon className="w-4 h-4" />
                <span>{name}</span>
              </button>
              </Link>
            ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">{t('footer.specialCategories')}</h3>
            <div className="space-y-2">
              {specialCategories.map(({ id, name, icon: Icon }) => (
                <Link to="/" key={id}>
                <button
                  key={id}
                  onClick={() => handleCategorySelect(id)}
                  className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors w-full"
                >
                  <Icon className="w-4 h-4" />
                  <span>{name}</span>
                </button>
                </Link>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">{t('footer.about')}</h3>
            <ul className="space-y-2">
              <li><Link to="/about" onClick={handleNavigation} className="text-gray-600 hover:text-purple-600">{t('nav.about')}</Link></li>
              <li><Link to="/how-it-works" onClick={handleNavigation} className="text-gray-600 hover:text-purple-600">{t('nav.howItWorks')}</Link></li>
              <li><Link to="/contact" onClick={handleNavigation} className="text-gray-600 hover:text-purple-600">{t('nav.contact')}</Link></li>
            </ul>
            
            <h3 className="text-lg font-bold text-gray-900 mb-4 mt-6">{t('footer.language')}</h3>
            <ul className="space-y-2">
              <li><LanguageToggle /></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">{t('footer.connect')}</h3>
            <ul className="space-y-2">
              <li><ShareButton text="Check out QuizPop - The most fun way to learn! 🎯" showText={t('footer.shareWebsite')} /></li>
              <li>
                <a href="https://www.kelvincdeen.nl" target="_blank" className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">
                  <Globe className="w-4 h-4" />
                  <span>www.kelvincdeen.nl</span>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/kelvindeen" target="_blank" className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              </li>
              <li className="mt-4">
                <img
                  src="https://media.licdn.com/dms/image/v2/D4D03AQGz2L7WE6VQ-Q/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1727038073022?e=1739404800&v=beta&t=3TjfWBRf48jzOtw6CHuWyjDBcfP2cyXDxE7AgSfh2lk"
                  alt="Portrait"
                  className="rounded-full w-16 h-16 object-cover"
                />
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8 text-center">
          <p className="text-gray-600">{t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
}
