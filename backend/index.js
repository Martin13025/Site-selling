const PORT = 9001
const URLDB = 'mongodb://127.0.0.1:27017/'

const express = require('express')
const cors = require('cors')
const jsonwebtoken = require('jsonwebtoken')
const mongoose = require('mongoose')
const { secret } = require('./config')
const User = require('./models/User')
const Product = require('./models/Product')

const app = express()

const generateAccessToken = (id, login, email) => {
    const payload = {
        id, login, email
    }

    return jsonwebtoken.sign(payload, secret, { expiresIn: '24h' })
}

app.use(cors())
app.use(express.json())

app.post('/registration', async (req, res) => {
    console.log(req.body)
    const { login, password, email } = req.body
    const user = new User({ login, password, email })

    try {
        await user.save()
    } catch (err) {
        if (err && err.code !== 11000) {
            res.json({
                message: 'Error'
            })
                .status(500)

            return
        }

       
        if (err && err.code === 11000) {
            res.json({
                message: 'Try to make duplicate'
            })
                .status(400)
            console.error('Try to make duplicate')

            return
        }
    }

    res.json({
        message: 'Successfull registration'
    })
})

app.post('/login', async (req, res) => {
    console.log(req.body)
    const { login, password } = req.body
    let user

    try {
        user = await User.findOne({ login })
    } catch (err) {
        res.json({
            message: 'Error'
        })
            .status(500)

        return
    }

    if (!user) {
        return res.status(400).json({ message: 'User did not find' })
    }
    if (user.password !== password) {
        return res.status(400).json({ message: 'Wrong login and password' })
    }
    const jwtToken = generateAccessToken(user._id, user.login, user.email)

    res.json({
        message: 'Successfull login',
        token: jwtToken
    })
})

app.post('/user/changePassword', async (req, res) => {
    console.log(req.body)
    const { token, password } = req.body
    let user

    try {
        user = await User.findOneAndUpdate({ login: jsonwebtoken.verify(token, secret).login },
            { password: password }, { returnOriginal: false })

        if (user === null) {
            res.json({
                message: 'User didn not find'
            })
                .status(400)
        }
    } catch (err) {
        res.json({
            message: 'Error'
        })
            .status(500)

        return
    }

    res.json({
        message: 'Password has been changed',
        newPassword: user.password
    })
})

app.post('/user/changeEmail', async (req, res) => {
    console.log(req.body)
    const { token, email } = req.body
    let user

    try {
        user = await User.findOneAndUpdate({ login: jsonwebtoken.verify(token, secret).login },
            { email: email }, { returnOriginal: false })

        if (user === null) {
            res.json({
                message: 'User did not find'
            })
                .status(400)
        }
    } catch (err) {
        if (err && err.code !== 11000) {
            res.json({
                message: 'Error'
            })
                .status(500)

            return
        }

       
        if (err && err.code === 11000) {
            res.json({
                message: 'Try to make duplicate'
            })
                .status(400)
            console.error('Try to make duplicate')

            return
        }
    }

    res.json({
        message: 'E-Mail has been changed! For apply changes re-login!',
        newEmail: user.email
    })
})

app.get('/products', async (req, res) => {
    let products

    try {
        products = await Product.find()
    } catch (err) {
        res.json({
            message: 'Error'
        })
            .status(500)

        return
    }

    res.json({
        data: products
    })
})

const start = async () => {
    try {
        await mongoose.connect(URLDB)
        app.listen(PORT, () => console.log(`Сервер работает на порту ${PORT}`))
    } catch (e) {
        console.error(e)
    }
}

app.post('/products/add', async (req, res) => {
    console.log(req.body)
    const { title, price } = req.body
    const product = new Product({ title, price })

    try {
        await product.save()
    } catch (err) {
        if (err && err.code !== 11000) {
            res.json({
                message: 'Error'
            })
                .status(500)

            return
        }
    }

    res.json({
        message: 'Produst has been successfully added.'
    })
})

start()