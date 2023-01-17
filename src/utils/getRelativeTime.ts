import TimeAgo, { DateInput, FormatOptions, FormatStyleName } from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import pt from 'javascript-time-ago/locale/pt';

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(pt);

const timeAgoInstances = {
  en: new TimeAgo('en'),
  pt: new TimeAgo('pt'),
};

export default function getRelativeTime(locale = 'en', date: DateInput, style?: FormatStyleName, options?: FormatOptions) {
  const localeOption = locale.split('-')[0] as keyof typeof timeAgoInstances;

  if (!(localeOption in timeAgoInstances)) {
    console.warn(`locale ${locale} relativeTime not supported by relativeTime`);
    console.warn('relativeTime fallback to "en"');
  }

  const timeAgo = timeAgoInstances[localeOption] || timeAgoInstances.en;
  return timeAgo.format(date, style, options);
}
