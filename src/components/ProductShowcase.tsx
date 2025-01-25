import React, { useEffect, useRef } from 'react';
import { Box, Brain, Zap, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function ProductShowcase() {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoElement.play();
        } else {
          videoElement.pause();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(videoElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t('productShowcase.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('productShowcase.subtitle')} <br></br><br></br>
            {t('productShowcase.description')}
          </p>
        </div>

        <div className="mt-8 flex justify-center">
            <img 
              src="/assets/images/quizpop/quizpop_wide.jpg" 
              alt="QuizPop Banner" 
              className="rounded-2xl shadow-lg max-w-full h-auto"
              style={{ maxWidth: '800px' }}
            />
          </div>
          
          <br></br>
          <br></br>
          <br></br> 
        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <video ref={videoRef} width="560" height="315" controls>
              <source src="https://quizpop.nl/assets/video/QuizPopIntroduction.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              {t('productShowcase.features.title')}
            </h3>
            <p className="text-lg text-gray-600 mb-8">
              {t('productShowcase.features.description')}
            </p>
            <div className="space-y-4">
              {[
                { icon: Brain, text: t('productShowcase.features.list.gameplay') },
                { icon: Box, text: t('productShowcase.features.list.control') },
                { icon: Users, text: t('productShowcase.features.list.groups') },
                { icon: Zap, text: t('productShowcase.features.list.learning') }
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <feature.icon className="w-6 h-6 text-purple-600" />
                  <span className="text-gray-700">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-purple-50 rounded-3xl p-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Box className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                {t('productShowcase.specs.whatsInside.title')}
              </h4>
              <p className="text-gray-600">
                {t('productShowcase.specs.whatsInside.description')}
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                {t('productShowcase.specs.howItWorks.title')}
              </h4>
              <p className="text-gray-600">
                {t('productShowcase.specs.howItWorks.description')}
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                {t('productShowcase.specs.perfectFor.title')}
              </h4>
              <p className="text-gray-600">
                {t('productShowcase.specs.perfectFor.description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
