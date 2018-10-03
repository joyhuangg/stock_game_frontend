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
    // this.removeStockCard = this.removeStockCard.bind(this)
  }

  attachEventListeners() {
    document.querySelector('#confirm-buy-btn').addEventListener('click',this.handleBuyFormSubmit)
    document.querySelector('#confirm-sell-btn').addEventListener('click',this.handleSellFormSubmit)
    document.querySelector('#Buy-btn').addEventListener('click', this.handleBuyBtn)
    document.querySelector('#profile').addEventListener('click', this.renderSellForm)
    document.querySelector("#title").addEventListener("click", ()=>{
      $('.ui.labeled.icon.sidebar').sidebar('toggle');
    })
    document.querySelector("#log-in").addEventListener("click", ()=>{
      $('#login_modal').modal('show');
    })
    document.querySelector("#sign-up").addEventListener("click", ()=>{
      $('#signup_modal').modal('show');
    })

    document.querySelector("#title").addEventListener("click", ()=>{
    $('.ui.labeled.icon.sidebar').sidebar('toggle');
    })

  }

  createCompanies(companies){
    companies.forEach(company => {
      const newCompany = new Company(company)
    })
    this.addCompanies()
  }

  addCompanies(){
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
    buyForm.querySelector('.description').innerHTML = company.renderBuyForm();
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
      sellForm.querySelector('.description').innerHTML = company.renderSellForm();
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
    const buy_price = company.price
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
      let balanceh3 = profile.querySelector('h3')
      let balancediv = document.querySelector('#balance-info')
      balanceh3.innerHTML =  `Balance: $${user.money}`
      balancediv.innerHTML = `Balance: $${user.money}`
      alert(`Congrats! You bought ${quantity} ${quantity > 1? 'stocks':'stock'} from ${company.name}`)
    }
    // else alert not enough money
    else{
      alert("You don't have enough money!")
    }

  }


// MUST MAKE IT SO THAT USERS WITHOUT THE STOCK CANNOT SELL, MUST HAVE IT SO THAT BALANCE GAINS MONEY
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



    // must fetch individual company so I can check the current price and update it
    const sell_price = parseInt(company.price)
    deubgger
    user.money += sell_price
    this.adapter.deleteStockCard(id)
    //took below from handleBuyForm, may refactor later
    this.adapter.patchUser(user.id, user)
    let balanceh3 = profile.querySelector('h3')
    let balancediv = document.querySelector('#balance-info')
    balanceh3.innerHTML =  `Balance: $${user.money}`
    balancediv.innerHTML = `Balance: $${user.money}`
    alert(`Congrats! You sold ${company.name} and gained $${sell_price}`)
  }

}
