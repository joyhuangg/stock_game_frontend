class App {

  constructor(user){
    this.adapter = new Adapter();
    this.handleProfileClick = this.handleProfileClick.bind(this);
    // this.handleCompanyClick = this.handleCompanyClick.bind(this);
    this.handleBuyFormSubmit = this.handleBuyFormSubmit.bind(this);
    this.handleSellFormSubmit = this.handleSellFormSubmit.bind(this)
    this.createCompanies = this.createCompanies.bind(this);
    this.addCompanies = this.addCompanies.bind(this);
    this.createStock = this.createStock.bind(this)
    this.addStock = this.addStock.bind(this)
    this.user = user
    this.handleBuyBtn = this.handleBuyBtn.bind(this)
    this.renderBuyForm = this.renderBuyForm.bind(this)
  }

  attachEventListeners() {
    document.querySelector('#sell-stock-form').addEventListener('submit', this.handleSellFormSubmit)
    // document.querySelector('#company-list').addEventListener('click', this.handleCompanyClick);
    document.querySelector('#confirm-buy-btn').addEventListener('click',this.handleBuyFormSubmit)
    document.querySelector('#Buy-btn').addEventListener('click', this.handleBuyBtn)
    // document.querySelector('#buy-stock-form').addEventListener('submit', this.handleBuyFormSubmit)
    document.querySelector('#profile').addEventListener('click', this.handleProfileClick)
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
    // debugger
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

  // handleCompanyClick(e){
  //   const id = parseInt(e.target.dataset.id);
  //   const company = Company.findById(id);
  //   if (e.target.innerText === "Buy"){
  //     document.querySelector("#buy-stock-form").innerHTML = company.renderBuyForm();
  //   }
  //   else if (e.target.innerText === "Sell") {
  //     document.querySelector("#sell-stock-form").innerHTML = company.renderSellForm();
  //   }
  //
  // }

  handleProfileClick(e){

    if (e.target.innerText === "Buy"){
      const id = parseInt(e.target.dataset.id);
      const stock = StockCard.findById(id);
      const company = new Company (stock.company)
      document.querySelector("#buy-stock-form").innerHTML = company.renderBuyForm();
    }
    else if (e.target.innerText === "Sell") {
      const id = parseInt(e.target.dataset.id);
      const stock = StockCard.findById(id);
      const company = new Company (stock.company)
      document.querySelector("#sell-stock-form").innerHTML = company.renderSellForm();
    }

  }

  createStock(stock){
    this.adapter.postStockCard(stock)
    .then(this.addStock);
  }

  addStock(stockObj){
    let stock = new StockCard(stockObj)
    this.user.stock_cards.push(stock)
    let scrollbar = document.querySelector("#scrolling-wrapper-flexbox")
    scrollbar.append(stock.renderCard())
  }

// MUST MAKE IT SO THAT USERS WITHOUT ENOUGH BALANCE CANNOT BUY, MUST DEDUCT FROM BALANCE
  handleBuyFormSubmit(e){
    e.preventDefault();
    const id = parseInt(e.target.parentElement.parentElement.parentElement.dataset.id);
    const company = Company.findById(id);
    const user = this.user
    const quantity = parseInt(e.target.parentElement.parentElement.querySelector('input').value);
    const buy_price = company.price
    let stocks = user.stock_cards
    debugger
    // condition in which user has stock already, much send patch request
    if (this.user.hasCompany(company)){
      this.adapter.getStockCards()
      .then(stocks => {
        // let stockCard = StockCard.find(function(stock) {return stock.company.id === company.id && stock.user.id === user.id})
        debugger
      })
    }
    // condition in which user does not have stock, send post request
    else{
      const stock = { quantity, company_id: company.id, user_id: user.id, buy_price};
      // if user has enough money create stock and deduct from balance
      if(user.money > quantity*buy_price){
        let profile = document.querySelector("#profile")
        this.createStock(stock)
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
  }


// MUST MAKE IT SO THAT USERS WITHOUT THE STOCK CANNOT SELL, MUST HAVE IT SO THAT BALANCE GAINS MONEY
  handleSellFormSubmit(e){
    e.preventDefault();
    debugger


    // const id = parseInt(e.target.dataset.id);
    // const company = Company.findById(id);
    // const quantity = parseInt(e.target.querySelector('input').value);
    //
    // const bodyJSON = { quantity };
    // this.adapter.postStockCard(bodyJSON).then(newStock => console.log(newStock));

    //from example
    // fetch(`http://localhost:3000/api/v1/stock_cards/`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Accept: 'application/json',
    //   },
    //   body: JSON.stringify(bodyJSON),
    // })
    //   .then(res => res.json())
    //   // our backend responds with the updated note instance represented as JSON
    //   .then(updatedNote => console.log(updatedNote));
  }
}
