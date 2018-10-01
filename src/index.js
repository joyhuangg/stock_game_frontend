document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.attachEventListeners();
  app.adapter.fetchCompanies().then(app.createCompanies);
})
