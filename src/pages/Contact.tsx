import React from 'react';
import { Mail, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


export function Contact() {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">{t('contact.title')}</h1>
          
          <div className="text-center text-gray-600 mb-12">
            <p className="text-lg">{t('contact.subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-purple-50 rounded-xl p-6 text-center">
              <Mail className="w-8 h-8 text-purple-600 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{t('contact.email.title')}</h2>
              <p className="text-gray-600">{t('contact.email.description')}</p>
              <a href="mailto:contact@quizpop.com" className="inline-block mt-4 text-purple-600 hover:text-purple-700">
                {t('contact.email.address')}
              </a>
            </div>

            <div className="bg-purple-50 rounded-xl p-6 text-center">
              <MessageSquare className="w-8 h-8 text-purple-600 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{t('contact.support.title')}</h2>
              <p className="text-gray-600">{t('contact.support.description')}</p>
              <a href="mailto:support@quizpop.com" className="inline-block mt-4 text-purple-600 hover:text-purple-700">
                {t('contact.support.address')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}