$(window).ready(function() {
  $('#loading').hide();
});

document.addEventListener('DOMContentLoaded', () => {
  let app
  let companyList = document.querySelector("#company-list")
  let profile = document.querySelector("#profile")
  let sidebar = document.querySelector('#sidebar')
  let buyForm = document.querySelector("#buy-stock-form")
  let sellForm = document.querySelector("#sell-stock-form")


  //SWAP THIS OUT LATER WITH SIGNED IN USERS
  let user;

  User.findByUsername("Dummy")
    .then((foundUser) => {
      let user = new User(foundUser)
      user.renderUserProfile();
      let balancediv = document.querySelector('#balance-info')
      balancediv.innerHTML = `Balance: $${user.money}`
      app = new App(user)

    })
    .then(() => {

        app.attachEventListeners();

        app.adapter.fetchCompanies().then(app.createCompanies)

    })

}) //end of DOM content loaded
