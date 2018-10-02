class App {

  constructor(){
    this.adapter = new Adapter();
    this.handleClick = this.handleClick.bind(this);
    this.handleBuyFormSubmit = this.handleBuyFormSubmit.bind(this);
    this.handleSellFormSubmit = this.handleSellFormSubmit.bind(this)
    this.createCompanies = this.createCompanies.bind(this);
    this.addCompanies = this.addCompanies.bind(this);
    this.createStocks = this.createStocks.bind(this)
    this.addStocks = this.addStocks.bind(this)
  }

  attachEventListeners() {
    document.querySelector('#sell-stock-form').addEventListener('submit', this.handleSellFormSubmit)
    document.querySelector('#company-list').addEventListener('click', this.handleClick);
    document.querySelector('#buy-stock-form').addEventListener('submit', this.handleBuyFormSubmit)
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

  handleClick(e){
    const id = parseInt(e.target.dataset.id);
    const company = Company.findById(id);
    if (e.target.innerText === "Buy"){
      document.querySelector("#buy-stock-form").innerHTML = company.renderBuyForm();
    }
    else if (e.target.innerText === "Sell") {
      document.querySelector("#sell-stock-form").innerHTML = company.renderSellForm();
    }

  }

  handleBuyFormSubmit(e){
    e.preventDefault();
    debugger


    const id = parseInt(e.target.dataset.id);
    const company = Company.findById(id);
    const quantity = parseInt(e.target.querySelector('input').value);

    const bodyJSON = { quantity };
    this.adapter.postStockCard(bodyJSON).then(newStock => console.log(newStock));

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
