import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, SkipForward, Music, Play, Pause, ListMusic } from 'lucide-react';
import { useAudioStore } from '../store/audioStore';

const tracks = [
  { id: 1, name: 'Upbeat Adventure', path: '/src/assets/audio/music/track1.mp3' },
  { id: 2, name: 'Mysterious Journey', path: '/src/assets/audio/music/track2.mp3' },
  { id: 3, name: 'Epic Quest', path: '/src/assets/audio/music/track3.mp3' },
  { id: 4, name: 'Magical Discovery', path: '/src/assets/audio/music/track4.mp3' },
  { id: 5, name: 'Victory Celebration', path: '/src/assets/audio/music/track5.mp3' },
  { id: 6, name: 'Peaceful Moment', path: '/src/assets/audio/music/track6.mp3' },
  { id: 7, name: 'Final Challenge', path: '/src/assets/audio/music/track7.mp3' },
];

export function AudioController() {
  const { 
    isMuted, 
    volume, 
    toggleMute, 
    setVolume, 
    nextTrack, 
    initializeAudio,
    isPlaying,
    togglePlay,
    currentTrack,
    selectTrack
  } = useAudioStore();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showTrackList, setShowTrackList] = useState(false);

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
        <div className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-lg p-4 min-w-[280px]">
          <div className="space-y-4">
            {/* Volume Control */}
            <div className="flex items-center gap-4">
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
                className="flex-grow"
              />
            </div>

            {/* Playback Controls */}
            <div className="flex items-center justify-between">
              <button
                onClick={togglePlay}
                className="text-purple-600 hover:text-purple-800 transition-colors"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </button>
              <button
                onClick={nextTrack}
                className="text-purple-600 hover:text-purple-800 transition-colors"
              >
                <SkipForward className="w-6 h-6" />
              </button>
              <button
                onClick={() => setShowTrackList(!showTrackList)}
                className="text-purple-600 hover:text-purple-800 transition-colors"
              >
                <ListMusic className="w-6 h-6" />
              </button>
            </div>

            {/* Track Selection */}
            {showTrackList && (
              <div className="mt-2 max-h-48 overflow-y-auto">
                {tracks.map((track, index) => (
                  <button
                    key={track.id}
                    onClick={() => selectTrack(index)}
                    className={`w-full flex items-center p-2 hover:bg-purple-50 rounded-lg transition-colors ${
                      currentTrack === index ? 'bg-purple-100 text-purple-700' : 'text-gray-700'
                    }`}
                  >
                    {currentTrack === index && isPlaying ? (
                      <Pause className="w-4 h-4 mr-2" />
                    ) : (
                      <Play className="w-4 h-4 mr-2" />
                    )}
                    <span className="text-sm">{track.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}