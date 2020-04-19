const { db } = require('../connection')
const { uploader } = require('../helper/uploader')
const fs = require('fs')

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
    }
}