class Adapter{
  constructor(){
    this.baseURL = 'https://git.heroku.com/stock-game-backend/api/v1';
    this.headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

  }


  /*
    USER FUNCTIONALITY
  */
  getUsers(){
    return this.get(`${this.baseURL}/users`)
  }

  getUser(id){
    return this.get(`${this.baseURL}/users/${id}`)
  }

  postUser(body){
    return this.post(`${this.baseURL}/users`, body)
  }

  patchUser(id, body){
    return this.patch(`${this.baseURL}/users/${id}`, body)
  }

  deleteUser(id){
    return this.delete(`${this.baseURL}/users/${id}`)
  }


  /*
    Company Functionality
  */
  fetchCompanies(){
    console.log('fetching companies')
    return this.get(`${this.baseURL}/companies`)
  }
  postCompany(body){
    console.log(body)
    return this.post(`${this.baseURL}/companies`, body)
  }

  refreshCompanies(){
    console.log('refreshing companies')
    return this.get(`${this.baseURL}/refresh_companies`)
  }


  /*
    STOCK FUNCTIONALITY
  */
  postStockCard(body){
    return this.post(`${this.baseURL}/stock_cards`, body)
  }
  patchStockCard(id, body){
    return this.patch(`${this.baseURL}/stock_cards/${id}`, body)
  }

  deleteStockCard(id){
    return this.delete(`${this.baseURL}/stock_cards/${id}`)
  }

  getStockCard(id){
    return this.get(`${this.baseURL}/stock_cards/${id}`)
  }

  getStockCards(){
    return this.get(`${this.baseURL}/stock_cards`)
  }

  getStock(symbol){
    return this.get(`https://api.iextrading.com/1.0/stock/${symbol}/batch?types=quote,news,chart`)
  }

  postNews(body){
    console.log(body)
    return this.post(`${this.baseURL}/news`, body)
  }



  /*
    GENERAL FUNCTIONALITY
  */
  get(url) {
    return fetch(url).then(res => {
      if(res.status >= 200 && res.status <= 299){
        return res.json()
      }
      else{
        return res.status
      }
    });
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

  delete(url){
    return fetch(url, {
      method: 'DELETE',
      headers: this.headers
    })
  }
}
