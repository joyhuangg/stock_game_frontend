class StockCard{
  constructor(data){
      this.id = data.id
      this.adapter = new Adapter()
      this.user = data.user
      this.company = data.company
      this.buy_price = data.buy_price
      this.sell_price = data.sell_price
      StockCard.all.push(this)
  }

  renderCard(){
    let new_card = document.createElement("div")
    new_card.className += "card"
    new_card.dataset.id = this.id
    new_card.innerHTML =`<h1>${this.company.name} (${this.company.symbol})</h1>
    <button data-id=${this.id}>Sell</button>
    <h3>Buy Price: $${this.buy_price}</h3>
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
