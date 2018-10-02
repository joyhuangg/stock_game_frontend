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
    this.adapter = new Adapter()
    User.all.push(this)
  }

  static findByUsername(username){
    this.adapter = new Adapter()
    return this.adapter.getUsers()
    .then(users => {
        return users.data.find( user => user.attributes.username === username)
        debugger
      })
  }

}

User.all = [];
