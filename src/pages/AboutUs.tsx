import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Linkedin } from 'lucide-react'; // Import the Linkedin icon

export function AboutUs() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
        <Link to="/">
            <span className="block text-purple-600 font-modak text-6xl sm:text-7xl md:text-8xl mt-4" 
                  style={{ WebkitTextStroke: "1px white", 
                          textShadow: "-1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 #9333ea, 1px 1px 0 #9333ea", 
                          fontSize: "200%" }}>
              {t('hero.title')}
            </span>
          </Link>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">{t('about.title')}</h1>
          
          <div className="prose prose-lg max-w-none text-gray-600 space-y-6">
            <p>{t('about.description1')}</p>
            <p>{t('about.description2')}</p>
            
            <ul className="list-none space-y-4">
              <li>
                <a href="https://www.linkedin.com/in/kelvindeen" target="_blank" className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              </li>
              <li className="mt-4">
                <img
                  src="https://avatars.githubusercontent.com/u/143399058?v=4"
                  alt="Portrait"
                  className="rounded-full w-16 h-16 object-cover"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
