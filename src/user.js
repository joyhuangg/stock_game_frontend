
class User{
  constructor(data){
    this.id = data.id
    this.name = data.name
    this.username = data.username
    this.money = parseFloat(data.money)
    this.stock_cards = data.stock_cards
    this.companies = data.companies
    this.adapter = new Adapter()
    User.all.push(this)
  }

  static findByUsername(username){
    this.adapter = new Adapter()
    return this.adapter.getUsers()
    .then(users => {
        return users.find( user => user.username === username)
      })
  }

  hasCompany(company){
    return this.companies.map(function(existing_company) {return existing_company.id}).includes(company.id)
  }

  renderUserProfile(){
    let profileDiv = document.querySelector("#profile")
    profileDiv.innerHTML = ''
    //Add up stock value
    let stockVal = 0
    this.stock_cards.forEach(function (stock_card){
      let buyPrice = parseFloat(stock_card.buy_price)
      stockVal += buyPrice
    })
    //total portfolio
    let portfolioVal = (this.money + stockVal).toFixed(2)

    //should refactor this so that just the money area of the user profile re-renders so that i can just call it in app when i handle sell and buy changes
    let toAppend = `
      <h1 class="ui center aligned header" style="color:white">Welcome ${this.name}</h1>
      <h3 class="ui center aligned header" style="color:white">Balance: $${this.money.toFixed(2)}</h3>
      <h3 id="portfolio-area" class="ui center aligned header" style="color:white">Total Portfolio Value: $${portfolioVal}</h3>
      <div class="scrolling-wrapper-flexbox">
      </div>
    `
    let balancediv = document.querySelector('#balance-info')
    balancediv.innerHTML = `Balance: $${this.money.toFixed(2)}`

    profileDiv.innerHTML += toAppend
    let scrollmenu = document.querySelector('.scrolling-wrapper-flexbox')
    this.adapter.getUser(this.id)
      .then((user) => {
        user.cards.forEach(function(stock){
          let stockObj = new StockCard(stock).renderCard()
          scrollmenu.append(stockObj)
        })
      })
  }

}

User.all = [];
