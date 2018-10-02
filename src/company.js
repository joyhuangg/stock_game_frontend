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
    this.open_price = data.open_price
    this.close_price = data.close_price
    this.adapter = new Adapter()
    Company.all.push(this)
  }

  renderCompany(){

    // <h3>high :${data["quote"]["high"]}</h3>
    // <h4>low :${data["quote"]["low"]}</h4>

    let new_card = document.createElement("div")
    new_card.className += "card"
    // let most_recent = data["quote"]["latestPrice"]
    new_card.innerHTML =`<h1>${this.name} (${this.symbol})</h1>
    <button data-id=${this.id}>Buy</button>
    <button data-id=${this.id}>Sell</button>
    <h3>Price: $${this.price}</h2>
    <h3>${this.description}</h3>

    <p>News :${this.news}</p>
    `

    let h1 = new_card.querySelector("h1")
    h1.addEventListener("click", () =>{
      let graph = new Graph(this.symbol)
      graph.renderGraph()
      $('#company').modal('show');

    })


    return new_card
  }

  static findById(id){
    return this.all.find(company => company.id === id)
  }


  // change max later to be indicitive of either max possible buys or max amount of stocks available
  renderBuyForm(){
    return `
    <form data-id=${this.id}>
     <h1>BUY FORM</h1>
     <label>${this.name}</label>
     <p>${this.description}</p>
     <label>Price</label>
     <p>$${this.price}</p>
     <label>Quantity</label>
     <input type="number" min="1" max="10"/>
     <button type='submit'>Buy Stock</button>
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
     <label>Quantity</label>
     <input type="number" min="1" max="10"/>
     <button type='submit'>Buy Stock</button>
   </form>
`;
  }

}

Company.all = [];
