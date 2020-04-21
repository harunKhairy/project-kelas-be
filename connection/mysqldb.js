const mysql = require('mysql')

// const db = mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:'Ha22091984',
//     database:'hokihokijc12',
//     port:'3306'
// })

const db = mysql.createConnection({
    host:'db4free.net',
    user:'harun8422',
    password:'Ha22091984',
    database:'purwadikajc12har',
    port:'3306'
})

db.connect((err) => {
    if (err) {
        console.log(err)
    }
    console.log('mySQL connect')
})

module.exports = db