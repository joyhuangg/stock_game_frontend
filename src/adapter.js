class Adapter{
  constructor(){
    this.baseURL = 'http://localhost:3000/api/v1';
    this.headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
  }

  fetchCompanies(){
    return this.get(`${this.baseURL}/companies`)
  }

  postStockCard(body){
    return this.post(`${this.baseURL}/stock_cards`, body)
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
