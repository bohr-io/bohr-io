import intro from 'intro.js';
import { Locale } from '@/types';

if (window.location.hostname === 'bohr.io') (intro() as any).setDontShowAgain(true);

const labels = {
  'en-US': {
    dontShowAgainLabel: "Don't show again",
    doneLabel: "done",
    nextLabel: "next",
    prevLabel: "back",
  },
  'pt-BR': {
    dontShowAgainLabel: "Não mostrar novamente",
    doneLabel: "finalizar",
    nextLabel: "próximo",
    prevLabel: "voltar",
  },
};

export const introJs = intro;

function setDontShowAgainCookie() {
  (intro() as any).setDontShowAgain(true);
}

function getLabels(selectedLocale: string) {
  const locale = selectedLocale in labels ? selectedLocale : 'en-US';
  return labels[locale as Locale];
}

export const defaultIntro = (steps: intro.Step[], locale: string = 'en-US') => intro().setOptions({
  tooltipClass: 'site__tour',
  showBullets: false,
  showButtons: false,
  steps: steps,
  dontShowAgain: true,
  ...getLabels(locale),
} as any).onexit(setDontShowAgainCookie).oncomplete(setDontShowAgainCookie);
