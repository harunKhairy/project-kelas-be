const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')

const PORT=5000
app.use(cors())  //izin ke frontend apapun buat akses backend
app.use(bodyParser.json())  //buat user kirim data ke server
app.use(bodyParser.urlencoded({ extended: false }))  //buat user kirim data ke server
app.use(express.static('public'))


app.get('/', (req, res) => {
    return res.send('<h1>Welcome to API jc-12</h1>')
})

const { userRouters, fotoRouters } = require('./routers')
app.use('/users', userRouters)
app.use('/foto', fotoRouters)

app.listen(PORT, () => console.log('server running on port ' + PORT ))



// // http://localhost:5000/allusers
// app.get('/allusers', )
// // http://localhost:5000/users?username=baron&password=user
// app.get('/users', )
// // http://localhost:5000/users
// app.post('/users', )
// app.put(`/users/:id`, )
// app.delete(`/users/:id`, )
