import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, SkipForward, Music } from 'lucide-react';
import { useAudioStore } from '../store/audioStore';

export function AudioController() {
  const { isMuted, volume, toggleMute, setVolume, nextTrack, initializeAudio } = useAudioStore();
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    initializeAudio();
  }, [initializeAudio]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="bg-white rounded-full p-3 shadow-lg hover:bg-purple-50 transition-colors"
      >
        <Music className="w-6 h-6 text-purple-600" />
      </button>

      {isExpanded && (
        <div className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-lg p-4 flex items-center gap-4">
          <button
            onClick={toggleMute}
            className="text-purple-600 hover:text-purple-800 transition-colors"
          >
            {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
          </button>
          
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-24"
          />
          
          <button
            onClick={nextTrack}
            className="text-purple-600 hover:text-purple-800 transition-colors"
          >
            <SkipForward className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
}