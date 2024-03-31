import React from 'react';
import '../views/Basket.css';
import ProductBasket from '../components/ProductBasket';

function Basket({ basket, setBasket, basketPrise, setBasketPrice, basketQty, setBasketQty, setModalBox}) {
  function OrderButton() {
    if (basketQty > 0) {
      return (<><button className='order' onClick={() => setModalBox('OrderBox')}>Make order</button></>)
    }
  }


  return (
    
    <div className="Basket">
      <h1>Basket</h1>
      <div className="BasketContent">
        {basket && basket.map((item) => <ProductBasket key={item.id} id={item.id}
          image={item.image} title={item.title}
          price={item.price} setBasket={setBasket}
          setBasketPrice={setBasketPrice}
          setBasketQty={setBasketQty} />)}
      </div>
    <p>Amount of products: {basketQty}</p>
    <p>Total cost of products: {basketPrise}</p>
    <OrderButton />
    </div>
  );
}


export default Basket;