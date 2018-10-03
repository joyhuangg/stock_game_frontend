
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
    let new_card = document.createElement("div")
    new_card.className += "card hvr-grow"
    new_card.dataset.id = this.id
    new_card.innerHTML =`<div class="ui one column centered grid" style="height:200px;">
      <div class="top aligned row" style="height:50%"><h3>${this.company.name} (${this.company.symbol})</h3></div>
      <div class="middle aligned row">Buy Price: $${this.buy_price}</div>

        <div class="bottom aligned row" style="height:25%">
          <button data-id=${this.id}>Sell</button>
        </div>
      </div>
    </div>
    `

    return new_card
  }

  static findById(id){
    return this.all.find(stock => stock.id === id)
  }

}

StockCard.all = []
