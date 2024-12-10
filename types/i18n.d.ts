import { resources } from '../i18n';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: typeof resources;
  }
}

export type TranslationKeys = keyof typeof resources.en.translation;