import React from 'react';
import { Box, Brain, Zap, Users } from 'lucide-react';

export function ProductShowcase() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Introducing QuizPop Cards
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The perfect blend of digital and physical learning. Our beautifully designed cards bring the excitement of QuizPop to your table.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <img
              src="https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=800"
              alt="QuizPop Cards"
              className="rounded-2xl shadow-2xl"
            />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Beautiful Design Meets Learning
            </h3>
            <p className="text-lg text-gray-600 mb-8">
              Each card is crafted with premium materials and features stunning illustrations that make learning engaging and memorable. Perfect for family game nights, classroom activities, or solo study sessions.
            </p>
            <div className="space-y-4">
              {[
                { icon: Brain, text: "Scientifically designed for better retention" },
                { icon: Box, text: "Premium quality cards that last" },
                { icon: Users, text: "Perfect for 1-8 players" },
                { icon: Zap, text: "Quick-play format for engaging sessions" }
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
              <h4 className="text-xl font-semibold text-gray-900 mb-2">What's Inside</h4>
              <p className="text-gray-600">
                200 carefully curated cards across multiple categories, housed in a premium box
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">How It Works</h4>
              <p className="text-gray-600">
                Draw cards, answer questions, and learn fascinating facts along the way
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Perfect For</h4>
              <p className="text-gray-600">
                Family game nights, classrooms, team building, or solo learning sessions
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}