document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.attachEventListeners();
  const endPoint = "http://localhost:3000/api/v1/companies"
  fetch(endPoint)
    .then(res => res.json())
    .then(json => {
      json.forEach(company => {
        const newCompany = new Company(company)
        document.querySelector('#company-list').innerHTML += newCompany.renderCompany()
      })
    })
})
