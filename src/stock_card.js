class StockCard{
  constructor(data, adapter){
      this.adapter = adapter
      this.user_id = data.user_id
      this.company_id = data.company_id
      StockCard.all.push(this)
  }

  renderCard(data){
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
