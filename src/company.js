// t.string "description"
// t.float "price"
// t.string "name"
// t.string "symbol"
// t.float "high"
// t.float "low"
// t.float "open_price"
// t.float "close_price"

class Company{
  constructor(data){
    this.id = data.id
    this.description = data.description
    this.price = data.price
    this.name = data.name
    this.symbol = data.symbol
    this.high = data.high
    this.low = data.low
    this.news = data.news
    this.open_price = data.open_price
    this.close_price = data.close_price
    this.adapter = new Adapter()
    Company.all.push(this)
  }

  renderCompany(){

    let new_company = document.createElement("div")
    new_company.className += "company-div"
    new_company.innerHTML = `<h3>${this.name} (${this.symbol}) ---- Stock Price: $${this.price}</h3>`
    // new_company.className += "card four wide column"
    // new_company.innerHTML =`<h3>${this.name} (${this.symbol})</h3>
    // <button data-id=${this.id}>Buy</button>
    // <button data-id=${this.id}>Sell</button>
    // <h5>Price: $${this.price}</h5>
    // <h5>${this.description}</h5>
    //
    // <p>News :${this.news}</p>
    // `

    let h = new_company.querySelector("h3")
    h.addEventListener("click", () =>{
      //may need to refactor this
      let c_modal = document.querySelector("#company")
      company.dataset.id = this.id
      c_modal.querySelector(".header").innerHTML = `${this.name} (${this.symbol})`
      c_modal.querySelector(".description").innerHTML =`

      <br>${this.description}
      <br>Current Price: ${this.price}
      <br>Name: ${this.name}
      <br>Symbol: ${this.symbol}
      <br>Highest Price: ${this.high}
      <br>Lowest Price: ${this.low}
      <br>Open Price: ${this.open_price}
      <br>Close Price: ${this.close_price}
      <br>Latest news: ${this.news[0]['headline']}
      `

      let graph = new Graph(this.symbol)
      graph.renderGraph()
      $('#company').modal('show');
    })


    return new_company
  }

  static findById(id){
    return this.all.find(company => company.id === id)
  }


  // change max later to be indicitive of either max possible buys or max amount of stocks available
  renderBuyForm(){
    return `
    <form data-id=${this.id}>
     <label>${this.name}</label>
     <p>${this.description}</p>
     <p>Price: $${this.price}</p>
     <label>Quantity</label>
     <input type="number" min="1" max="10"/>
   </form>
`;
  }

  renderSellForm(){
    return `
    <form data-id=${this.id}>
     <h1>SELL ${this.name}</h1>
     <label>${this.name}</label>
     <p>${this.description}</p>
     <label>Price</label>
     <p>$${this.price}</p>
   </form>
`;
  }

}

Company.all = [];
