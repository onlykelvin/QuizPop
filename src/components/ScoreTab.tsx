import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { useAudioStore } from '../store/audioStore';

interface TeamScore {
  color: string;
  score: number;
}

interface ScoreTabProps {
  visible: boolean;
  onToggle: () => void;
}

export function ScoreTab({ visible, onToggle }: ScoreTabProps) {
  const { t } = useTranslation();
  const { playScorePlus, playScoreMinus } = useAudioStore();
  const [teams, setTeams] = React.useState<TeamScore[]>([
    { color: 'red', score: 0 },
    { color: 'yellow', score: 0 },
    { color: 'white', score: 0 },
    { color: 'green', score: 0 },
    { color: 'blue', score: 0 }
  ]);

  const handleScore = async (index: number, increment: boolean) => {
    if (increment) {
      playScorePlus();
    } else {
      playScoreMinus();
    }
    
    setTeams(prevTeams => 
      prevTeams.map((team, i) => 
        i === index 
          ? { ...team, score: Math.max(0, team.score + (increment ? 1 : -1)) }
          : team
      )
    );
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'red':
        return 'bg-red-500 border-red-600';
      case 'yellow':
        return 'bg-yellow-400 border-yellow-500';
      case 'white':
        return 'bg-white border-gray-300';
      case 'green':
        return 'bg-green-500 border-green-600';
      case 'blue':
        return 'bg-blue-500 border-blue-600';
      default:
        return 'bg-gray-500 border-gray-600';
    }
  };

  if (!visible) return null;

  return (
    <div className="w-full bg-purple-50 rounded-xl p-4 mb-6 animate-fade-in-up">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {teams.map((team, index) => (
          <div 
            key={team.color}
            className="bg-white rounded-lg p-4 shadow-md flex md:flex-col items-center justify-between md:justify-center gap-4 transition-all duration-200 hover:shadow-lg"
          >
            <div 
              className={clsx(
                "w-8 h-8 rounded-full border-2 transition-transform duration-200 transform hover:scale-110",
                getColorClasses(team.color)
              )}
            />
            <span className="text-2xl font-bold text-gray-800">{team.score}</span>
            <div className="flex md:flex-col gap-2">
              <button
                onClick={() => handleScore(index, true)}
                className="p-2 rounded-full hover:bg-purple-100 transition-colors duration-200"
                aria-label={t('scoreTab.increment')}
              >
                <Plus className="w-5 h-5 text-purple-600" />
              </button>
              <button
                onClick={() => handleScore(index, false)}
                className="p-2 rounded-full hover:bg-purple-100 transition-colors duration-200"
                aria-label={t('scoreTab.decrement')}
              >
                <Minus className="w-5 h-5 text-purple-600" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}