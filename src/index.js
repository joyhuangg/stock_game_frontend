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
      app = new App(user)
    })
    .then(() => {

        app.attachEventListeners();

        app.adapter.fetchCompanies().then(app.createCompanies)

        document.querySelector("#title").addEventListener("click", ()=>{
          $('.ui.labeled.icon.sidebar').sidebar('toggle');
        })
        document.querySelector("#login_button").addEventListener("click", ()=>{
          $('#login_modal').modal('show');
        })
        document.querySelector("#signup_button").addEventListener("click", ()=>{
          $('#signup_modal').modal('show');
        })
        document.querySelector("#signup_link").addEventListener("click", ()=>{
          $('#signup_modal').modal('show');
        })

    })

}) //end of DOM content loaded
