import React from 'react';
import { Brain, Box, Users, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


export function HowItWorks() {
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
          <div className="mt-8 flex justify-center">
            <img 
              src="/assets/images/quizpop/quizpop_wide.jpg" 
              alt={t('howItWorks.images.quizpopBanner')}
              className="rounded-2xl shadow-lg max-w-full h-auto"
              style={{ maxWidth: '800px' }}
            />
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('howItWorks.subtitle')}</h2>
            <p className="text-gray-600 mb-8">{t('howItWorks.description')}</p>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { icon: Brain, title: t('howItWorks.features.gameplay'), text: t('howItWorks.features.gameplayDesc') },
                { icon: Box, title: t('howItWorks.features.control'), text: t('howItWorks.features.controlDesc') },
                { icon: Users, title: t('howItWorks.features.groups'), text: t('howItWorks.features.groupsDesc') },
                { icon: Zap, title: t('howItWorks.features.learning'), text: t('howItWorks.features.learningDesc') }
              ].map((feature, index) => (
                <div key={index} className="bg-purple-50 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <feature.icon className="w-6 h-6 text-purple-600" />
                    <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                  </div>
                  <p className="text-gray-600">{feature.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('howItWorks.setup.title')}</h2>
            <div className="space-y-4 text-gray-600">
              <p className="font-semibold">{t('howItWorks.setup.subtitle')}</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>{t('howItWorks.setup.steps.step1')}</li>
                <li>{t('howItWorks.setup.steps.step2')}</li>
                <li>{t('howItWorks.setup.steps.step3')}</li>
                <li>{t('howItWorks.setup.steps.step4')}</li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('howItWorks.abundanceQuestions.title')}</h2>
            <div className="space-y-4 text-gray-600">
              <ul className="list-disc list-inside space-y-2 ml-4">
                {t('howItWorks.abundanceQuestions.description', { returnObjects: true }).map((text, index) => (
                  <li key={index}>{text}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('howItWorks.funFactsContext.title')}</h2>
            <div className="space-y-4 text-gray-600">
              <ul className="list-disc list-inside space-y-2 ml-4">
                {t('howItWorks.funFactsContext.description', { returnObjects: true }).map((text, index) => (
                  <li key={index}>{text}</li>
                ))}
              </ul>
            </div>
          </div>


          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('howItWorks.gameModes.classic.title')}</h2>
            <div className="mt-8 flex justify-center mb-8">
              <img 
                src="/assets/images/howitworks/classic_mode.png"
                alt={t('howItWorks.gameModes.classic.title')}
                className="rounded-2xl shadow-lg max-w-full h-auto"
                style={{ maxWidth: '600px' }}
              />
            </div>
            <p className="text-gray-600 mb-8">{t('howItWorks.gameModes.classic.description')}</p>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('howItWorks.gameModes.quizMaster.title')}</h2>
            <div className="mt-8 flex justify-center mb-8">
              <img 
                src="/assets/images/howitworks/quizmaster_mode.png"
                alt={t('howItWorks.gameModes.quizMaster.title')}
                className="rounded-2xl shadow-lg max-w-full h-auto"
                style={{ maxWidth: '600px' }}
              />
            </div>
            <p className="text-gray-600 mb-8">{t('howItWorks.gameModes.quizMaster.description')}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('howItWorks.musicPlayer.title')}</h2>
            <p className="text-gray-600 mb-8">{t('howItWorks.musicPlayer.description')}</p>
            <div className="mt-8 flex justify-center">
              <img 
                src="/assets/images/howitworks/music_player.png"
                alt={t('howItWorks.musicPlayer.title')}
                className="rounded-2xl shadow-lg max-w-full h-auto"
                style={{ maxWidth: '600px' }}
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('howItWorks.scoreBoard.title')}</h2>
            <p className="text-gray-600 mb-8">{t('howItWorks.scoreBoard.description')}</p>
            <div className="mt-8 flex justify-center">
              <img 
                src="/assets/images/howitworks/score_board.png"
                alt={t('howItWorks.scoreBoard.title')}
                className="rounded-2xl shadow-lg max-w-full h-auto"
                style={{ maxWidth: '600px' }}
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('howItWorks.highScores.title')}</h2>
            <p className="text-gray-600 mb-8">{t('howItWorks.highScores.description')}</p>
            <div className="mt-8 flex justify-center">
              <img 
                src="/assets/images/howitworks/high_scores.png"
                alt={t('howItWorks.highScores.title')}
                className="rounded-2xl shadow-lg max-w-full h-auto"
                style={{ maxWidth: '600px' }}
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('howItWorks.rainbowMode.title')}</h2>
            <p className="text-gray-600 mb-4">{t('howItWorks.rainbowMode.description')}</p>
            <p className="text-gray-600 font-semibold mb-2">{t('howItWorks.rainbowMode.scoring')}</p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-gray-600">
              {[0, 1, 2, 3].map((index) => (
                <li key={index}>{t(`howItWorks.rainbowMode.points.${index}`)}</li>
              ))}
            </ul>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('howItWorks.why.title')}</h2>
            <p className="text-gray-600">{t('howItWorks.why.description')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}