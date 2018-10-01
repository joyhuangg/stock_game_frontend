class User{
  constructor(data, adapter){
    this.id = data.id
    this.name = data.name
    this.username = data.username
    this.money = data.money
    this.stock_cards = data.stock_cards
    this.adapter = adapter
    User.all.push(this)
  }
}

User.all = [];
