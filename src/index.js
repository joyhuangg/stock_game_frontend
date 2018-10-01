document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  let companyList = document.querySelector("#company-list")
  app.attachEventListeners();

  app.adapter.fetchMyCompanies().then(app.createCompanies)

  let stocks = ["GE","BB","AMD","NFLX","GOOGL"]
  stocks.forEach(function(symbol){
      app.adapter.getStock(symbol).then(stock => {
      companyList.append(renderCard(stock))
    })
  })
  let graph = new Graph("GE")
  graph.renderGraph()
})

function renderCard(data){
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
