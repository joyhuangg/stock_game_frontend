
class User{
  constructor(data){
    this.id = data.id
    this.name = data.name
    this.username = data.username
    this.money = data.money
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
    let toAppend = `
      <h1 class="ui center aligned header" style="color:white">Welcome ${this.name}</h1>
      <h2 class="ui center aligned header" style="color:white">Username: ${this.username}</h2>
      <h3 class="ui center aligned header" style="color:white">Balance: $${this.money}</h3>
      <div class="scrolling-wrapper-flexbox">
      </div>
    `
    document.querySelector("#balance-info").innerHTML = `Balance: ${this.money}`

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
