const { db } = require('../connection')
const encrypt = require ('../helper/crypto')
const transporter = require('../helper/mailer')

module.exports = {
    allusers: (req, res) => {
        db.query('SELECT * FROM users', (err, result) => {
            if (err) return res.status(500).send(err)
            return res.status(200).send(result)
        })
    },

    users: (req, res) => {
        const { username, password } = req.query
        var sql = `SELECT * FROM users WHERE username = ? and password = ?`
        db.query(sql, [ username, password ], (err, result) => {
            if (err) return res.status(500).send(err)
            return res.status(200).send(result[0])
        })
    },

    addnewuser: (req, res) => {
        if ( req.body.username === '' || req.body.password === '' ) {
            return res.status(500).send('please insert data!')
        }
        var sql = `insert into users set ?`
        db.query(sql, req.body, (err, result) => {
            if (err) return res.status(500).send(err)
            db.query('select * from users', (err, result1) => {
                if (err) return res.status(500).send(err)
                return res.status(200).send(result1)
            })
        })
    },

    edituser: (req, res) => {
        console.log('params', req.params)
        console.log(req.body)
        var sql=`update users set ? where id=${req.params.id}`
        db.query(sql, req.body, (err, result) => {
            if (err) return res.status(500).send(err)
            db.query('select * from users', (err, result1) => {
                if (err) return res.status(500).send(err)
                return res.status(200).send(result1)
            })
        })
    },

    deleteuser: (req, res) => {
        var sql = `delete from users where id=${req.params.id}`
        db.query(sql, req.body, (err, result) => {
            if (err) return res.status(500).send(err)
            db.query('select * from users', (err, result1) => {
                if (err) return res.status(500).send(err)
                return res.status(200).send(result1)
            })
        })
    },

    registeruser: (req,res) => {
        const { username, password, email } = req.body
        const hashpass = encrypt(password)
        var sql = `select * from users where username='${username}'`
        db.query(sql, (err, result) => {
            if (err) return res.status(500).send(err)
            if (result.length) {
                return res.status(500).send({ message: 'username telah dipakai' })
            } else {
                sql = `insert into users set ?`
                var data = {
                    username: username,
                    password: hashpass,
                    email
                }
                db.query(sql, data, (err, result1) => {
                    if (err) return res.status(500).send(err)
                    var LinkVerifikasi = `http://localhost:3000/verified?userid=${result1.insertId}&password=${hashpass}`
                    transporter.sendMail({
                        from: 'Harun <harun.khairy@gmail.com>',
                        to: email,
                        subject: 'Welcome',
                        html: `tolong klik link ini untuk verifikasi :
                        <a href=${LinkVerifikasi}>MInimales verified</a>`,
                    }, (err, result2) => {
                        if (err) return res.status(500).send(err)
                        sql = `select * from users where id=${result1.insertId}`
                        db.query(sql, (err, result3) => {
                            if (err) return res.status(500).send(err)
                            return res.status(200).send(result3[0])
                        })
                    })
                })
            }
        })
    },

    keeplogin: (req, res) => {
        const { idusers } = req.params
        var sql = `select * from users where id=${idusers}`
        db.query(sql, (error, result) => {
            if (error) {
                return res.status(500).send(error)
            }
            return res.status(200).send(result[0])
        })
    }
}