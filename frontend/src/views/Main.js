import React, { useEffect, useState } from 'react';
import './Main.css';
import Product from '../components/Product';
import image from '../images/tovar.jpg';

function Main({ setBasket, setBasketPrice, setBasketQty, basket, setMessage, setModalBox, token }) {

  const [products, setProducts] = useState([])

  useEffect(() => {
    const api = 'http://localhost:9001/products';
 

    fetch(api)
      .then((result) => result.json())
      .then((result) => {
        // console.debug(result.data)
        setProducts(result.data)
      })
  }, [])

  function AddProduct() {
      
      if (token !== null) {
        return (
          <>
            <button className='addProduct' onClick={() => setModalBox('AddProductBox')}>Add Product</button>
          </>
        )
      }
    }
    
  

  return (
    <div className="Main">
      <AddProduct />
      <div className='mainGrid'>
      {products.map((item) => <Product key={item._id} id={item._id} image={image}
        title={item.title} price={item.price} setBasket={setBasket}
        setBasketPrice={setBasketPrice} setBasketQty={setBasketQty}
        basket={basket} setMessage={setMessage} setModalBox={setModalBox} token={token} />)}
      </div>
    </div>
  );
}

export default Main;