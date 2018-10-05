class App {

  constructor(user){
    this.adapter = new Adapter();
    this.renderSellForm = this.renderSellForm.bind(this);
    this.handleBuyFormSubmit = this.handleBuyFormSubmit.bind(this);
    this.handleSellFormSubmit = this.handleSellFormSubmit.bind(this)
    this.createCompanies = this.createCompanies.bind(this);
    this.addCompanies = this.addCompanies.bind(this);
    this.createStock = this.createStock.bind(this)
    this.addStock = this.addStock.bind(this)
    this.user = user
    this.handleBuyBtn = this.handleBuyBtn.bind(this)
    this.renderBuyForm = this.renderBuyForm.bind(this)
    this.renderSignUpForm = this.renderSignUpForm.bind(this)
    this.handleSignUpSubmit = this.handleSignUpSubmit.bind(this)
    this.signUserOut = this.signUserOut.bind(this)
    this.renderLogInForm = this.renderLogInForm.bind(this)
  }

  attachEventListeners() {
    document.querySelector('#confirm-buy-btn').addEventListener('click',this.handleBuyFormSubmit)
    document.querySelector('#confirm-sell-btn').addEventListener('click',this.handleSellFormSubmit)
    document.querySelector('#Buy-btn').addEventListener('click', this.handleBuyBtn)
    document.querySelector('#profile').addEventListener('click', this.renderSellForm)
    document.querySelector("#sign-up").addEventListener("click", this.renderSignUpForm)
    document.querySelector('#signup_modal form .stacked .button').addEventListener('click', this.handleSignUpSubmit)
    document.querySelector('#sign-out').addEventListener('click', this.signUserOut)
    document.querySelector("#log-in").addEventListener("click", this.renderLogInForm)
    document.querySelector('#login_modal form .stacked .button').addEventListener('click', this.handleLogInSubmit)
    document.querySelector("#title").addEventListener("click", ()=>{
      $('.ui.labeled.icon.sidebar').sidebar('toggle');
    })
    document.querySelector("#signup_link").addEventListener("click", ()=>{
      $('#signup_modal').modal('show');
    })

    document.querySelector("#title").addEventListener("click", ()=>{
    $('.ui.labeled.icon.sidebar').sidebar('toggle');
    })

  }

  signUserOut(e){
    $('.ui.labeled.icon.sidebar').sidebar('toggle');
    this.user = undefined
    let profileDiv = document.querySelector("#profile")
    profileDiv.innerHTML = ''
  }

  renderSignUpForm(e){
    $('#signup_modal').modal('show');
  }

  handleSignUpSubmit(e){
    let inputs = e.target.parentNode.children
    let name = inputs[0].querySelector('.input').querySelector('input').value
    let username = inputs[1].querySelector('.input').querySelector('input').value
    this.adapter.postUser({name,username,money:1000})
      .then((userObj) => {
        this.user = new User(userObj)
        this.user.renderUserProfile()
      })
    inputs[0].querySelector('.input').querySelector('input').value = ''
    inputs[1].querySelector('.input').querySelector('input').value = ''
    $('#signup_modal').modal('hide');
    $('.ui.labeled.icon.sidebar').sidebar('toggle');
    //should redirect to signing in the user that just signed up and show their info

  }

  renderLogInForm(e){
    $('#login_modal').modal('show');
  }

  handleLogInSubmit(e){
    let inputs = e.target.parentNode.children
    let username = inputs[0].querySelector('.input').querySelector('input').value
    User.findByUsername(username)
      .then((userObj) => {
        this.user = new User(userObj)
        this.user.renderUserProfile()
      })
      .catch(() => {
        alert('Not a valid username')
      })
    inputs[0].querySelector('.input').querySelector('input').value = ''
    $('#login_modal').modal('hide');
    $('.ui.labeled.icon.sidebar').sidebar('toggle');
  }

  createCompanies(companies){
    console.log('creating companies...')
    console.log('wiping company list')
    document.querySelector('#company-list').innerHTML = ''
    companies.forEach(company => {
      const newCompany = new Company(company)
      document.querySelector('#company-list').append( newCompany.renderCompany())

    })
    // this.addCompanies()
  }

  addCompanies(){
    document.querySelector('#company-list').innerText = ''
    Company.all.forEach(
      (company) => document.querySelector('#company-list').append( company.renderCompany())
    )
  }

  handleBuyBtn(e){
    let id = parseInt(e.target.parentElement.parentElement.parentElement.dataset.id)
    this.renderBuyForm(id)

  }

  renderBuyForm(id){
    let buyForm = document.querySelector("#buy-stock-form")
    buyForm.dataset.id = id
    const company = Company.findById(id);
    buyForm.querySelector(".header").innerHTML = `Buy ${company.name} (${company.symbol}) Stock`
    buyForm.querySelector('.description').innerHTML = `Available Balance: ${this.user.money}</br>` + company.renderBuyForm();
    $('#buy-stock-form').modal('show');
  }

  renderSellForm(e){

    if (e.target.innerText === "Sell") {
      let sellForm = document.querySelector("#sell-stock-form")
      const id = parseInt(e.target.dataset.id);
      sellForm.dataset.id = id
      const stock = StockCard.findById(id);
      const company = new Company (stock.company)
      // must fetch individual company so I can check the current price and update it
      sellForm.querySelector(".header").innerHTML = `Sell ${company.name} (${company.symbol}) Stock`
      sellForm.querySelector('.description').innerHTML = stock.renderSellForm();
      $('#sell-stock-form').modal('show');
    }

  }

  createStock(stock){
    this.adapter.postStockCard(stock)
    .then(this.addStock);
  }

  addStock(stockObj){
    let stock = new StockCard(stockObj)
    this.user.stock_cards.push(stock)
    let scrollbar = document.querySelector(".scrolling-wrapper-flexbox")
    scrollbar.append(stock.renderCard())
  }


  handleBuyFormSubmit(e){
    e.preventDefault();
    const id = parseInt(e.target.parentElement.parentElement.parentElement.dataset.id);
    const company = Company.findById(id);
    const user = this.user
    const quantity = parseInt(e.target.parentElement.parentElement.querySelector('input').value);
    const buy_price = parseFloat(company.price)
    let stocks = user.stock_cards
    const stock = {company_id: company.id, user_id: user.id, buy_price};
    // if user has enough money create stock and deduct from balance
    if(user.money > quantity*buy_price){
      let profile = document.querySelector("#profile")
      for (let i = 0; i < quantity; i++){
        this.createStock(stock)
      }
      user.money -= quantity*buy_price

      this.adapter.patchUser(user.id, user)
        .then((updatedUser) => {

            user.renderUserProfile()
          })

      alert(`Congrats! You bought ${quantity} ${quantity > 1? 'stocks':'stock'} from ${company.name}`)
    }
    // else alert not enough money
    else{
      alert("You don't have enough money!")
    }

  }


  handleSellFormSubmit(e){
    e.preventDefault();
    let profile = document.querySelector("#profile")
    const id = parseInt(e.target.parentElement.parentElement.parentElement.dataset.id);
    const stock = StockCard.findById(id);
    const user = this.user
    const company = new Company (stock.company)



    // get cards and find card to delete and delete it
    let stocks = profile.querySelectorAll('.card')
    let card;
    for (let i = 0; i < stocks.length; i++){
      if (parseInt(stocks[i].dataset.id) === id){
        card = stocks[i]
      }
    }
    card.remove();




    const sell_price = parseFloat(company.price)
    user.money += sell_price
    this.adapter.deleteStockCard(id)
    this.adapter.patchUser(user.id, user)
    user.renderUserProfile()

    alert(`Congrats! You sold ${company.name} and gained $${sell_price}`)
  }

}
