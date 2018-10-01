class Company{
  constructor(data, adapter){
    this.id = data.id
    this.description = data.description
    this.price = data.price
    this.name = data.name
    this.adapter = adapter
    Company.all.push(this)
  }

  renderCompany(){

    // let new_card = document.createElement("div")
    // new_card.className += "card"
    // let most_recent = data["quote"]["latestPrice"]
    // new_card.innerHTML =`<h1>${data["quote"]["symbol"]}</h1>
    // <h2>price :${data["quote"]["open"]}</h2>
    // <h3>high :${data["quote"]["high"]}</h3>
    // <h4>low :${data["quote"]["low"]}</h4>
    // <h5>news :${data["news"][0]["headline"]}</h5>
    // `
    // return new_card

    
    return `
    <li>
      <h3>${this.name}
        <button data-id=${this.id}>Buy</button>
      </h3>
      <p>Price: ${this.price}</p>
      <p>Description: ${this.description}</p>
    </li>`


  }

  static findById(id){
    return this.all.find(company => company.id === id)
  }


  // change max later to be indicitive of either max possible buys or max amount of stocks available
  renderBuyForm(){
    return `
    <form data-id=${this.id}>
     <h1>BUY FORM</h1>
     <label>${this.name}</label>
     <p>${this.description}</p>
     <label>Price</label>
     <p>$${this.price}</p>
     <label>Quantity</label>
     <input type="number" min="1" max="10"/>
     <button type='submit'>Buy Stock</button>
   </form>
`;
  }

}

Company.all = [];
