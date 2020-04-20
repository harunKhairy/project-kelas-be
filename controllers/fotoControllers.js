const { db } = require('../connection')
const { uploader } = require('../helper/uploader')
const fs = require('fs')
const crypto = require('crypto')
const transporter = require('../helper/mailer')

module.exports = {
    postfoto: (req, res) => {
        try {
            const path = '/foto'//ini terserah
            const upload = uploader(path, 'TES').fields([{ name: 'image'}])

            upload(req, res, (err) => {
                if (err) {
                    return res.status(500).json({ message: 'Upload picture failed !', error: err.message });
                }
                console.log('pada tahap ini foto berhasil di upload')
                const { image } = req.files;
                console.log(image)
                const imagePath = image ? path + '/' + image[0].filename : null;
                console.log(imagePath)
                console.log(req.body.data)
                const data = JSON.parse(req.body.data);
                console.log(data, '1')
                data.imagefoto = imagePath
                console.log(data, 2)
                var sql = `insert into foto set ?`
                db.query(sql, data, (err, result) => {
                    if (err) {
                        fs.unlinkSync('./public' + imagePath);
                        return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err.message });
                    }
                    sql = `select * from foto`
                    db.query(sql, (err1, result1) => {
                        if (err1) return res.status(500).send(err1)
                        return res.status(200).send(result1)
                    })
                })
            })
        } catch (error) {
            return res.status(500).send(error)
        }
    },

    getfoto: (req, res) => {
        var sql = `select * from foto`
        db.query(sql, (err1, result1) => {
            if (err1) return res.status(500).send(err1)
            return res.status(200).send(result1)
        })
    },

    deletefoto: (req, res) => {
        const {id} = req.params                             //? req.params.id
        var sql = `select * from foto where id=${id}`
        db.query(sql, (err, result) => {
            if (err) res.status(500).send(err)
            if (result.length) {
                sql = `delete from foto where id=${req.params.id}`
                db.query(sql, (err, result2) => {
                    if (err) res.status(500).send(err)
                    console.log(result2)
                    if (result[0].imagefoto) {
                        fs.unlinkSync('./public'+result[0].imagefoto)
                    }
                    sql = `select * from foto`
                    db.query(sql, (err1, result1) => {
                        if (err1) return res.status(500).send(err1)
                        return res.status(200).send(result1)
                    })
                })
            } else {
                return res.status(500).send({message:'nggak ada woy idnya'})
            }
        })
    },

    editfoto:(req, res) => {
        const {id} = req.params
        var sql = `select * from foto where id=${id}`
        db.query(sql, (err, result) => {
            if (err) res.status(500).send(err)
            if (result.length) {
                try {
                    const path ='/foto'//ini terserah
                    const upload = uploader(path,'TES').fields([{ name: 'image'}])
                    upload(req, res, (err) => {
                        if (err) {
                            return res.status(500).json({ message: 'Upload post picture failed !', error: err.message });
                        }
                        console.log('lewat')
                        const { image } = req.files;
                        const imagePath = image ? path + '/' + image[0].filename : null;
                        const data = JSON.parse(req.body.data);
                        if(imagePath) {
                            data.imagefoto = imagePath;
                        }
                        sql = `Update foto set ? where id = ${id};`
                        db.query(sql, data, (err1,result1) => {
                            if (err1) {
                                if (imagePath) {
                                    fs.unlinkSync('./public' + imagePath);
                                }
                                return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err1.message });
                            }

                            if (imagePath) {//hapus foto lama
                                if (result[0].imagefoto) {
                                    fs.unlinkSync('./public' + result[0].imagefoto);
                                }
                            }
                            sql = `select * from foto`
                            db.query(sql, (err1, result2) => {
                                if (err1) return res.status(500).send(err1)
                                return res.status(200).send(result2)
                            })
                        })
                    })
                } 
                catch (error) {
                }
            } else {
                return res.status(500).send({message:'nggak ada woy idnya'})
            }
        })
    },

    encryptkata: (req, res) => {
        const {kata} = req.query
        const kataencript = crypto.createHmac('sha256','puripuri').update(kata).digest('hex')
        res.send(`<h1>${kataencript} dari ${kata} dengan panjang length =${kataencript.length} </h1>`)
    },

    kirimemail: (req, res) => {
        const unyu = fs.readFileSync('unyu.html', 'utf8')
        // console.log(typeof(unyu))
        var mailoptions = {
            from: 'Harun <harun.khairy@gmail.com>',
            to: 'ikumalasari5@gmail.com',
            subject: 'Belajar FullStack JavaScript',
            html: unyu
        }
        transporter.sendMail(mailoptions, (err, result) => {
            if (err) {
                console.log(err)
                return res.status(500).send({ status: err })
            }
            res.status(200).send({ status: 'success', result })
        })
    },

}