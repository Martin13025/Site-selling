/*import Header from './Header';*/
import './Product.css';
import React from 'react';

function Product({ id, image, title, price, setBasket, setBasketPrice, setBasketQty, basket, setMessage, setModalBox, token }) {

  const product = {
    id: id,
    image: image,
    title: title,
    price: price
  }

  function addToBasket() {
    const index = basket.findIndex(value => value.id === product.id)

    if (index === -1) {
      setBasket(prevState => [...prevState, product])
      setBasketPrice(current => current + product.price)
      setBasketQty(current => current + 1)
    } else {
      return
    }

    setTimeout(() => {
      setMessage('Product has been added to basket')
      setModalBox('MessageBox')
    }, 100)
  }

  function AddToBasketButton() {
    if (token !== null) {
      return (
        <>
          <button className='buy' onClick={() => addToBasket()}>Buy</button>
        </>
      )
  } else {
    return (
      <>
        <p>For add product sign in!</p>
      </>
    )
  }
}



  return (
    <div className="Product">
      <img src={product.image} alt='Product image'/>
      <h1>{product.title}</h1>
      <p>{product.price} $</p>
      <AddToBasketButton />
    </div>
  );
}

export default Product;