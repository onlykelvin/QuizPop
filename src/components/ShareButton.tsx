import React from 'react';
import { Share2 } from 'lucide-react';

interface ShareButtonProps {
  url?: string;
  title?: string;
  text?: string;
  showText?: string;
}

export function ShareButton({ url = window.location.href, title = 'QuizPop - Fun Learning!', text, showText }: ShareButtonProps) {
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title,
          text,
          url,
        });
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(`${text}\n\n${url}`);
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors"
    >
      <Share2 className="w-4 h-4" />
      <span>{showText}</span>
    </button>
  );
}