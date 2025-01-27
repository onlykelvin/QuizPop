import React, { useEffect, useState } from 'react';
import { Download } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function InstallPWA() {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptEvent, setPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const handler = (e: Event) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      setPromptEvent(e as BeforeInstallPromptEvent);
      setSupportsPWA(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!promptEvent) {
      return;
    }

    // Show the install prompt
    promptEvent.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await promptEvent.userChoice;
    
    // Clear the saved prompt since it can't be used again
    setPromptEvent(null);

    // Optionally, send analytics event based on outcome
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
  };

  if (!supportsPWA) {
    return null;
  }

  return (
    <button
      onClick={handleInstallClick}
      className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors"
    >
      <Download className="w-4 h-4" />
      <span>{t('pwa.installPrompt')}</span>
    </button>
  );
}
