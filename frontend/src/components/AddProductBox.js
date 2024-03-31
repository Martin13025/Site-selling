import React from 'react';
import './AddProductBox.css';

function AddProductBox({ setModalBox, setMessage }) {

  function AddProduct() {
    const title = document.getElementById('title').value
    const price = document.getElementById('price').value
    
    const validPrice= price.match(/^\d+$/)

    let message

    if (!validPrice || title.length === 0) {
      document.getElementById('addProductError').innerText = "Incorrect data!"
      return
    }

    const data = {
      title: title,
      price: price
    }

    // console.debug(data)

    const api = 'http://127.0.0.1:9001/products/add'

    fetch(api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((result) => result.json())
      .then((result) => message = result.message)

    setTimeout(() => {
      setMessage(message)
      setModalBox('MessageBox')
    }, 100)
  }

  return (
    <div className="AddProductBox">
      <h1>Adding product</h1>
      <input id='title' placeholder='Name of product' type='text' />
      <input id='price' placeholder='Price ofproduct' type='text' />
      <button id='send' onClick={() => AddProduct()}>Add</button>
      <p id='addProductError'></p>
    </div>
  );
}

export default AddProductBox;