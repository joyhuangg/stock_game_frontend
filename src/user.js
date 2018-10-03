// t.string "name"
// t.string "username"
// t.float "money"

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
          // <div id=​"scrolling-wrapper-flexbox">​
          //
          // ​</div>​
    let toAppend = `
      <h1>Welcome ${this.name}</h1>
      <h2>Username: ${this.username}</h2>
      <h3>Balance: $${this.money}</h3>
      <div class="scrolling-wrapper-flexbox">

      </div>
    `


    profileDiv.innerHTML += toAppend
    let scrollmenu = document.querySelector('.scrolling-wrapper-flexbox')
    this.adapter.getUser(this.id)
      .then((user) => {
        user.cards.forEach(function(stock){
          let stockObj = new StockCard(stock).renderCard()
          scrollmenu.append(stockObj)
        })
      })
    // this.companies.forEach(function(company){
    //   debugger


    //   // will be something like let stockObj = new StockCard(stock)
    //   //then add to toAppend string
    // })

  }

}

User.all = [];
