const mysql = require('mysql')

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Ha22091984',
    database:'hokihokijc12',
    port:'3306'
})

db.connect((err) => {
    if (err) {
        console.log(err)
    }
    console.log('mySQL connect')
})

module.exports = db