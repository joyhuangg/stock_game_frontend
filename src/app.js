class App {

  constructor(user){
    this.adapter = new Adapter();
    this.handleProfileClick = this.handleProfileClick.bind(this);
    this.handleCompanyClick = this.handleCompanyClick.bind(this);
    this.handleBuyFormSubmit = this.handleBuyFormSubmit.bind(this);
    this.handleSellFormSubmit = this.handleSellFormSubmit.bind(this)
    this.createCompanies = this.createCompanies.bind(this);
    this.addCompanies = this.addCompanies.bind(this);
    this.createStocks = this.createStocks.bind(this)
    this.addStocks = this.addStocks.bind(this)
    this.user = user
  }

  attachEventListeners() {
    document.querySelector('#sell-stock-form').addEventListener('submit', this.handleSellFormSubmit)
    document.querySelector('#company-list').addEventListener('click', this.handleCompanyClick);
    document.querySelector('#buy-stock-form').addEventListener('submit', this.handleBuyFormSubmit)
    document.querySelector('#profile').addEventListener('click', this.handleProfileClick)
  }

  createStocks(stocks){
    debugger

  }

  addStocks(){
    debugger
  }

  createCompanies(companies){
    companies.forEach(company => {
      const newCompany = new Company(company)
    })
    this.addCompanies()
  }

  addCompanies(){
    Company.all.forEach(
      company => (document.querySelector('#company-list').append( company.renderCompany()))
    )
  }

  handleCompanyClick(e){
    const id = parseInt(e.target.dataset.id);
    const company = Company.findById(id);
    if (e.target.innerText === "Buy"){
      document.querySelector("#buy-stock-form").innerHTML = company.renderBuyForm();
    }
    else if (e.target.innerText === "Sell") {
      document.querySelector("#sell-stock-form").innerHTML = company.renderSellForm();
    }

  }

  handleProfileClick(e){
    const id = parseInt(e.target.dataset.id);
    const stock = StockCard.findById(id);
    const company = new Company (stock.company)
    if (e.target.innerText === "Buy"){
      document.querySelector("#buy-stock-form").innerHTML = company.renderBuyForm();
    }
    else if (e.target.innerText === "Sell") {
      document.querySelector("#sell-stock-form").innerHTML = company.renderSellForm();
    }

  }

// MUST MAKE IT SO THAT USERS WITHOUT ENOUGH BALANCE CANNOT BUY, MUST ADD DEDUCT FROM BALANCE
  handleBuyFormSubmit(e){
    e.preventDefault();
    const id = parseInt(e.target.dataset.id);
    const company = Company.findById(id);
    const user = this.user
    const quantity = parseInt(e.target.querySelector('input').value);
    const buy_price = company.price
    let stocks = user.stock_cards

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
      const bodyJSON = { quantity, company_id: company.id, user_id: user.id, buy_price};
      this.adapter.postStockCard(bodyJSON)
      .then(newStock => {
        let stock = new StockCard(newStock)
        let profile = document.querySelector("#profile")
        debugger
        profile.append(stock.renderCard())
      });
    }
    e.target.parentElement.innerHTML = ''
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
