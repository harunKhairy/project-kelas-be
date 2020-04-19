const { db } = require('../connection')

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
    }
}