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

<<<<<<< HEAD
  //SWAP THIS OUT LATER WITH SIGNED IN USERS, not really working
=======
  //SWAP THIS OUT LATER WITH SIGNED IN USERS
  let user;
>>>>>>> 225a9e0e45af2539047744f97e80d77255ccce4f
  User.findByUsername("Dummy")
    .then((foundUser) => {
      let user = new User(foundUser)
      user.renderUserProfile();
<<<<<<< HEAD
=======
      app = new App(user)
>>>>>>> 225a9e0e45af2539047744f97e80d77255ccce4f
    })
    .then(() => {

        app.attachEventListeners();

<<<<<<< HEAD

  app.attachEventListeners();
=======
        app.adapter.fetchCompanies().then(app.createCompanies)
>>>>>>> 225a9e0e45af2539047744f97e80d77255ccce4f

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


<<<<<<< HEAD
  // let stocks = ["GE","BB","AMD","NFLX","GOOGL"]
  // stocks.forEach(function(symbol){
  //     app.adapter.getStock(symbol).then(stock => {
  //     companyList.append(renderCard(stock))
  //   })
  // })
  document.querySelector("#title").addEventListener("click", ()=>{
    $('.ui.labeled.icon.sidebar').sidebar('toggle');
  })
  document.querySelector("#signup_link").addEventListener("click", ()=>{
    $('#signup_modal').modal('show');
  })
  document.querySelector("#sign-up").addEventListener("click", ()=>{
    $('#signup_modal').modal('show');
  })
  document.querySelector("#log-in").addEventListener("click", ()=>{
    $('#login_modal').modal('show');
  })
=======
>>>>>>> 225a9e0e45af2539047744f97e80d77255ccce4f

      //change this later to be the user's stocks
      /*

          COMMENTED THIS OUT BECAUSE CAN'T OVERWRITE EXISTING COMPANIES

      */
      // let companies_symbol = ["GE","BB","AMD","NFLX","GOOGL"]
      // companies_symbol.forEach(function(symbol){
      //     app.adapter.getStock(symbol).then(company => {
      //
      //       let data = {description: company.quote.sector,
      //                   price: company.quote.latestPrice,
      //                   news: company["news"][0]["headline"],
      //                   name: company.quote.companyName,
      //                   symbol: company.quote.symbol,
      //                   open_price: company.quote.open,
      //                   close_price: company.quote.close,
      //                   high: company.quote.high,
      //                   low: company.quote.low
      //                   }
      //       app.adapter.postCompany(data)
      //         .then((companyObj) => {
      //           let company = new Company(companyObj)
      //           profile.append(company.renderCompany());
      //         })
      //         .catch(error => {
      //           debugger
      //         })
      //
      //
      //
      //
      //       // this.id = data.id
      //       // this.description = data.description
      //       // this.price = data.price
      //       // this.name = data.name
      //       // this.symbol = data.symbol
      //       // this.adapter = new Adapter()
      //
      //       // Company.all.push(this)
      //       //I want to make the below function a class function, must organize BETTER
      //       //stocks should be made into Company forms first then rendered
      //       // companyList.append(renderCompany())
      //       // profile.append(renderCard(company))
      //   })
      //
      // })


    })



}) //end of DOM content loaded
