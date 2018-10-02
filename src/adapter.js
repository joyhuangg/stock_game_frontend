class Adapter{
  constructor(){
    this.baseURL = 'http://localhost:3000/api/v1';
    this.headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
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

  postCompany(body){
    return this.post(`${this.baseURL}/companies`, body)
  }

  getStock(symbol){
    return this.get(`https://api.iextrading.com/1.0/stock/${symbol}/batch?types=quote,news,chart`)
  }


  get(url) {
    return fetch(url).then(res => res.json());
  }

  getUsers(){
    return this.get(`${this.baseURL}/users`)
  }

  getUser(id){
    return this.get(`${this.baseURL}/users/${id}`)
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
