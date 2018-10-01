class Adapter{
  constructor(){
    this.baseURL = 'http://localhost:3000/api/v1';
    this.headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    this.APIKEY = 'WU45ZT4STMGEM7NW'
    this.SYMBOL = 'MSFT'
    // this.APIURL = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${this.SYMBOL}&interval=60min&apikey=${this.APIKEY}`
    // this.APIURL = `https://api.iextrading.com/1.0/stock/${symbol}/batch?types=quote,news,chart`
  }

  fetchMyCompanies(){
    return this.get(`${this.baseURL}/companies`)
  }

  fetchCompanies(){
    return this.get(this.APIURL)
  }

  postStockCard(body){
    return this.post(`${this.baseURL}/stock_cards`, body)
  }

  getStock(symbol){
    return this.get(`https://api.iextrading.com/1.0/stock/${symbol}/batch?types=quote,news,chart`)
  }


  get(url) {
    return fetch(url).then(res => res.json());
  }

  post(url, body) {
    return fetch(url, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(body),
    }).then(res => res.json());
  }

  patch(url, body) {
    return fetch(url, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(body),
    }).then(res => res.json());
  }
}
