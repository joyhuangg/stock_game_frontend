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
    new_card.className += "card four wide column" 
    // let most_recent = data["quote"]["latestPrice"]
    new_card.innerHTML =`<h3>${this.name} (${this.symbol})</h3>
    <button data-id=${this.id}>Buy</button>
    <button data-id=${this.id}>Sell</button>
    <h5>Price: $${this.price}</h5>
    <h5>${this.description}</h5>

    <p>News :${this.news}</p>
    `

    let h = new_card.querySelector("h3")
    h.addEventListener("click", () =>{

      //may need to refactor this
      let c_modal = document.querySelector("#company")
      c_modal.querySelector(".header").innerHTML = `${this.name} (${this.symbol})`
      c_modal.querySelector(".description").innerHTML =`

      <br>${this.description}
      <br>current price:${this.price}
      <br>name:${this.name}
      <br>symbol:${this.symbol}
      <br>highest Price:${this.high}
      <br>lowest Price:${this.low}
      <br>open price:${this.open_price}
      <br>close price:${this.close_price}
      `

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
