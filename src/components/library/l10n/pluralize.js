/**
 * Plural forms for russian words
 * @param  {Integer} count quantity for word
 * @param  {Array} words Array of words. Example: ['депутат', 'депутата', 'депутатов'], ['коментарий', 'коментария', 'комментариев']
 * @return {String}        Count + plural form for word
 */
export function pluralize(count, words) {
  const cases = [2, 0, 1, 1, 1, 2];
  const word = words[count % 100 > 4 && count % 100 < 20 ? 2 : cases[Math.min(count % 10, 5)]];
  return `${count} ${word}`;
}
