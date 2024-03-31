import React from 'react';
import './OrderBox.css';

function OrderBox({ setModalBox, setMessage, setBasket, setBasketQty, setBasketPrice }) {
    function order() {
        const cardNum = document.getElementById('cardNum').value
        const cardExp = document.getElementById('cardExp').value
        const cvc = document.getElementById('cvc').value

        const validNum = cardNum.match(/^\d{12,16}$/)
        const validExp = cardExp.match(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/)
        const validCvc = cvc.match(/^[0-9]{3,4}$/)

        if (!validNum || ! validExp || !validCvc) {
            document.getElementById('orderError').innerText = 'Your data is mistake!'
            return
        }

        setTimeout(() => {
            setBasket([])
            setBasketQty(0)
            setBasketPrice(0)
            setMessage('Order has been placed')
            setModalBox('MessageBox')
        }, 100)
    }

return (
    <div className="OrderBox">
            <h1>Make order</h1>
            <input id='cardNum' placeholder='Number of card' type='text' />
            <input id='cardExp' placeholder='Validity period' type='text' />
            <input id='cvc' placeholder='CVC-code' type='text' />
            <button id='send' onClick={() => order()}>Make order</button>
            <p id='orderError'></p>
        </div>
    );
}



export default OrderBox;