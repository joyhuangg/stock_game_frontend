// t.integer "user_id"
// t.integer "company_id"
// t.float "quantity"
// t.float "buy_price"
// t.float "sell_price"


class StockCard{
  constructor(data){
      this.adapter = new Adapter()
      this.user_id = data.user_id
      this.company_id = data.company_id
      this.quantity = data.quantity
      this.buy_price = data.buy_price
      this.sell_price = data.sell_price
      StockCard.all.push(this)
  }

  renderCard(data){
    debugger
    let new_card = document.createElement("div")
    new_card.className += "card"
    let most_recent = data["quote"]["latestPrice"]
    new_card.innerHTML =`<h1>${data["quote"]["symbol"]}</h1>
    <h2>price :${data["quote"]["open"]}</h2>
    <h3>high :${data["quote"]["high"]}</h3>
    <h4>low :${data["quote"]["low"]}</h4>
    <h5>news :${data["news"][0]["headline"]}</h5>
    `
    return new_card
  }
}

StockCard.all = []
