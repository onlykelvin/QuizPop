import { GameMode } from '../types';

interface HighScore {
  score: number;
  total: number;
  category: string;
  date: string;
  mode: GameMode;
}

export function saveHighScore(score: number, total: number, category: string, mode: GameMode): void {
  const highScores = getHighScores();
  const newScore = {
    score,
    total,
    category,
    date: new Date().toISOString(),
    mode
  };

  highScores.push(newScore);
  highScores.sort((a, b) => (b.score / b.total) - (a.score / a.total));
  
  const topScores = highScores.slice(0, 10); // Keep only top 10
  localStorage.setItem('quizpop_highscores', JSON.stringify(topScores));
}

export function getHighScores(): HighScore[] {
  const scores = localStorage.getItem('quizpop_highscores');
  return scores ? JSON.parse(scores) : [];
}

export function saveLastPlayedTrack(trackIndex: number): void {
  localStorage.setItem('quizpop_last_track', trackIndex.toString());
}

export function getLastPlayedTrack(): number {
  const track = localStorage.getItem('quizpop_last_track');
  return track ? parseInt(track, 10) : 0;
}