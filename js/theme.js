// Runs before the page paints, so there is no dark/light flash.
// Kept as a separate file because the Content Security Policy blocks inline scripts.
(function applySavedTheme() {
  var root = document.documentElement;
  var theme = null;

  try {
    theme = window.localStorage.getItem('theme');
  } catch (error) {
    theme = null;
  }

  if (theme !== 'light' && theme !== 'dark') {
    var prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    theme = prefersLight ? 'light' : 'dark';
  }

  root.setAttribute('data-theme', theme);
  root.classList.add('js');
})();
