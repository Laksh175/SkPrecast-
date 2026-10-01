// Clean SPA Navigation Helper (HTML5 PushState Routing)
export const navigateTo = (path, e) => {
  if (e && typeof e.preventDefault === 'function') {
    e.preventDefault();
  }
  if (window.location.pathname !== path) {
    window.history.pushState({}, '', path);
  }
  window.dispatchEvent(new Event('app-navigate'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
