import React from 'react';


function Registration() {



    function Reg(){
        const login = document.getElementById('login').value
        const password = document.getElementById('password').value
        const email = document.getElementById('email').value
        const data = {
          login: login,
          password: password,
          email: email
        }
        console.log(data)

        /*Request block*/
        const api = 'http://localhost:9001/registration'

        fetch(api, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(result => result.json())
        .then((result) => {
          console.log(result)
        })
      
      }


  return (
    <>
        <h1>Registration</h1>
        <input id='login' type='text' placeholder="Login" />
        <input id='password' type='password' placeholder="Password" />
        <input id='email' type='email' placeholder="E-mail" />
        <button type='submit' onClick={Reg}>Sign Up</button>
    </>
  );
}

export default Registration;