class App {
  attachEventListeners() {
    document.querySelector('#company-list').addEventListener('click', e => {
      const id = parseInt(e.target.dataset.id);
      const company = Company.findById(id);
      document.querySelector("#buy-stock-form").innerHTML = company.renderBuyForm();
    });

    document.querySelector('#buy-stock-form').addEventListener('submit', e => {
      e.preventDefault();
      debugger


      // const id = parseInt(e.target.dataset.id);
      // const company = Company.findById(id);
      // const quantity = parseInt(e.target.querySelector('input').value);
      //
      // const bodyJSON = { quantity };
      // fetch(`http://localhost:3000/api/v1/stock_cards/`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Accept: 'application/json',
      //   },
      //   body: JSON.stringify(bodyJSON),
      // })
      //   .then(res => res.json())
      //   // our backend responds with the updated note instance represented as JSON
      //   .then(updatedNote => console.log(updatedNote));
    })
  }
}
