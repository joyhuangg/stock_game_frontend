class App {

  constructor(){
    this.adapter = new Adapter();
    this.handleBuyClick = this.handleBuyClick.bind(this);
    this.handleBuyFormSubmit = this.handleBuyFormSubmit.bind(this);
    this.createCompanies = this.createCompanies.bind(this);
    this.addCompanies = this.addCompanies.bind(this);
  }
  attachEventListeners() {
    document.querySelector('#company-list').addEventListener('click', this.handleBuyClick);
    document.querySelector('#buy-stock-form').addEventListener('submit', this.handleBuyFormSubmit)
  }


  createCompanies(companies){
    companies.forEach(company => {
      const newCompany = new Company(company)
    })
    this.addCompanies()
  }

  addCompanies(){
    document.querySelector('#company-list').innerHTML = ''
    Company.all.forEach(
      company => (document.querySelector('#company-list').innerHTML += company.renderCompany())
    )
  }

  handleBuyClick(e){
    const id = parseInt(e.target.dataset.id);
    const company = Company.findById(id);
    document.querySelector("#buy-stock-form").innerHTML = company.renderBuyForm();
  }

  handleBuyFormSubmit(e){
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
