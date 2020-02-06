/**
 * Returns a function, that, as long as it continues to be invoked, will not be triggered.
 * @param {Function} func Function to call after predetermined number of milliseconds
 * @param {number} wait Number of milliseconds to wait before calling a function
 * @param {boolean} immediate If true - trigger the function on the leading edge, instead of the trailing.
 */
function debounce(func, wait, immediate) {
  let timeout;
  return function debounced(...args) {
    const context = this;
    const later = function runLater() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

/**
 * Plural forms for russian words
 * @param  {Integer} count quantity for word
 * @param  {Array} words Array of words. Example: ['депутат', 'депутата', 'депутатов'], ['коментарий', 'коментария', 'комментариев']
 * @return {String} plural form of word
 */
function pluralize(count, words) {
  const cases = [2, 0, 1, 1, 1, 2];
  const word = words[count % 100 > 4 && count % 100 < 20 ? 2 : cases[Math.min(count % 10, 5)]];
  return word;
}

module.exports = {
  debounce,
  pluralize
};
