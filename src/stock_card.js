// t.integer "user_id"
// t.integer "company_id"
// t.float "quantity"
// t.float "buy_price"
// t.float "sell_price"


class StockCard{
  constructor(data){
      this.id = data.id
      this.adapter = new Adapter()
      this.user = data.user
      this.company = data.company
      this.quantity = data.quantity
      this.buy_price = data.buy_price
      this.sell_price = data.sell_price
      StockCard.all.push(this)
  }

  renderCard(){
    // debugger
    let new_card = document.createElement("div")
    new_card.className += "card"
    // let most_recent = data["quote"]["latestPrice"]
    new_card.innerHTML =`<h1>${this.company.name} (${this.company.symbol})</h1>
    <button data-id=${this.id}>Buy</button>
    <button data-id=${this.id}>Sell</button>
    <h3>Buy Price: $${this.buy_price}</h3>
    <h3>Quantity: ${this.quantity}</h3>
    <h3>${this.description}</h3>

    <p>News :${this.company.news}</p>
    `

    return new_card
  }

  static findById(id){
    return this.all.find(stock => stock.id === id)
  }

}

StockCard.all = []
