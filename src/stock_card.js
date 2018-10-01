class StockCard{
  constructor(data, adapter){
      this.adapter = adapter
      this.user_id = data.user_id
      this.company_id = data.company_id
      StockCard.all.push(this)
  }
}

StockCard.all = []
