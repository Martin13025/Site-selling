import React from 'react';
import './Login.css';

function Login({ setModalBox, setToken, setMessage }) {

  function Log() {
    const login = document.getElementById('login').value
    const password = document.getElementById('pass').value

    const validLogin = login.match(/^[a-z0-9]+$/i)

    let message

    if (!validLogin || password.length === 0) {
      document.getElementById('loginError').innerText = "Error data"
      return
    }

    const data = {
      login: login,
      password: password
    }

    const api = 'http://127.0.0.1:9001/login'

    fetch(api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((result) => result.json())
      .then((result) => {
        message = result.message
        if (result.token !== undefined) {
          localStorage.setItem('token', result.token)
          setToken(result.token)
        }
      })

    setTimeout(() => {
      setMessage(message)
      setModalBox('MessageBox')
    }, 100)
  }

  return (
    <div className="Login">
      <h1>Логин:</h1>
      <input id='login' placeholder='Логин' type='text' />
      <input id='pass' placeholder='Пароль' type='password' />
      <button id='send' onClick={() => Log()}>Войти</button>
      <p id='loginError'></p>
    </div>
  );
}

export default Login;
/*import React from 'react';


function Login() {


    function Log(){
        const login = document.getElementById('login').value
        const password = document.getElementById('password').value

        const validLogin = login.match(/^[a-z0-9]+$/i)

        const data = {
          login: login,
          password: password
        }
        console.log(data)
        
        const api = 'http://localhost:9001/login'

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
          localStorage.setItem('token', result.token)
          setToken(result.token)
        })
    }

  return (
    <>
        <h1>Login</h1>
        <input id='login' type='text' placeholder="Login" />
        <input id='password' type='password' placeholder="Password" />
        <button onClick={Log}>Sign In</button>
    </>
  );
}

export default Login;*/