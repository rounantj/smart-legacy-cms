

var formidable = require('formidable'); var express = require('express')
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');

var myDomain = process.env.MY_DOMAIN

const fs = require('fs');


module.exports.all = function (app) {
    function setup(app) {
        app.engine('handlebars', handlebars({ defaultLayout: 'startup' }))
        app.set('view engine', 'handlebars')
        app.use(express.json());
        app.use(express.static('public'));
    }
    var newAPP = app;

    app.get('/startup', async function (req, res) {
        setup(newAPP)
        res.render("step1_startup", { MY_DOMAIN: myDomain });
    });
    app.get('/cms-login', async function (req, res) {
        setup(newAPP)
        res.render("cms_login", { MY_DOMAIN: myDomain });
    });
    app.get('/startup2', async function (req, res) {
        setup(newAPP)
        res.render("step2_startup", { MY_DOMAIN: myDomain });
    });
    app.get('/startup3', async function (req, res) {
        setup(newAPP)
        res.render("step3_startup", { MY_DOMAIN: myDomain });
    });
    app.get('/startup4', async function (req, res) {
        setup(newAPP)
        res.render("step4_startup", { MY_DOMAIN: myDomain });
    });
    app.get('/startup5', async function (req, res) {
        setup(newAPP)
        res.render("step5_startup", { MY_DOMAIN: myDomain });
    });
    app.get('/startup6', async function (req, res) {
        setup(newAPP)
        res.render("step6_startup", { MY_DOMAIN: myDomain });
    });
    app.get('/startup7', async function (req, res) {
        setup(newAPP)
        res.render("step7_startup", { MY_DOMAIN: myDomain });
    });

    app.get('/startup8', async function (req, res) {
        setup(newAPP)
        res.render("step8_startup", { MY_DOMAIN: myDomain });
    });

    app.get('/startup9', async function (req, res) {
        setup(newAPP)
        res.render("step9_startup", { MY_DOMAIN: myDomain });
    });
    app.get('/startup10', async function (req, res) {
        setup(newAPP)
        res.render("step10_startup", { MY_DOMAIN: myDomain });
    });
    app.get('/startup11', async function (req, res) {
        setup(newAPP)
        res.render("step11_startup", { MY_DOMAIN: myDomain });
    });
    app.get('/startup12', async function (req, res) {
        setup(newAPP)
        res.render("step12_startup", { MY_DOMAIN: myDomain });
    });
    app.get('/startup13', async function (req, res) {
        setup(newAPP)
        res.render("step13_startup", { MY_DOMAIN: myDomain });
    });
    //==========================================================================================================
    // Rota para coletar as cores da logotipo enviada

    app.post("/myColors", async function (req, res) {
        //console.log(req.body)
        //console.log(req.headers.filename)
        const path = require('path')
        const getColors = require('get-image-colors')
        getColors(path.join("./public/images/" + req.headers.user_id + "/", req.headers.filename)).then(colors => {
            res.send(colors)
        }).catch(error => {
            res.send(error)
        })
    });


    app.post('/uploadLogo', (req, res) => {
        //console.log("veja => ")
        //console.log(req.headers)
        //console.log(req.headers.master_id)

        try {
            if (req.headers.affiliate_id != undefined || req.headers.master_id != undefined) {
                const formidable = require('formidable');
                const form = new formidable.IncomingForm();
                const dir = "./public/images/" + req.headers.master_id;

                if (req.headers.is_product_image == true || req.headers.is_product_image == 'true') {
                    if (req.headers.product_code != undefined && req.headers.product_code != '' && req.headers.product_code != null) {
                        var product_code = req.headers.product_code
                        if (!fs.existsSync(dir)) {
                            fs.mkdirSync(dir);
                        }

                        if (!fs.existsSync(dir + '/' + product_code)) {
                            fs.mkdirSync(dir + '/' + product_code);
                        }

                        form.parse(req, (err, fields, files) => {
                            //console.log(files)
                            const path = require('path');
                            const oldpath = files.fileimagem.path;
                            //const newpath = path.join("", './apps/www.smartcommerci.co-api/src/data/images/'+req.headers.affiliate_id+'/', files.fileimage.name);
                            const newpath = path.join("", './public/images/' + req.headers.affiliate_id + '/' + product_code + '/', files.fileimagem.name);
                            fs.renameSync(oldpath, newpath);
                            res.send({ "resultOk": true, "message": "File uploaded" })
                        });

                    } else {
                        res.status(500).json({ message: "Invalid data parameters!", yourData: req });
                    }
                } else {
                    //console.log("cheguei ...")
                    if (!fs.existsSync(dir)) {
                        fs.mkdirSync(dir);
                    }

                    form.parse(req, (err, fields, files) => {
                        if (!err) {
                            const path = require('path');
                            const oldpath = files.fileimagem.path;
                            const newpath = path.join("", './public/images/' + req.headers.affiliate_id + '/', files.fileimagem.name);
                            fs.renameSync(oldpath, newpath);
                            res.send({ "resultOk": true, "message": "File uploaded" })
                        } else {
                            res.status(500).json({ message: "Internal error!", yourData: req.headers, err5: err });
                        }

                    });
                }

            } else {
                res.status(500).json({ message: "Invalid data parameters!", yourData: req.headers });
            }

        } catch (error) {
            //console.log(error)
            res.status(500).json({ message: "Invalid data parameters!", yourData: "error here out", yourData2: req.headers, errorMessage: error });
        }

    });
}




