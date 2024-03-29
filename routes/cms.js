const fs = require("fs").promises;
var formidable = require("formidable");
var express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const axios = require("axios");

var myDomain = process.env.MY_DOMAIN;

// Configurando uma conexão com o database
const mysql = require("mysql");
const conn = mysql.createConnection({
  host: process.env.host,
  port: process.env.port,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});

//==========================================================================================================

// Função para executar um comando SQL
async function execSQL(query, res) {
  console.log(query);
  conn.query(query, async function (error, results, fields) {
    if (!error) {
      res.send(results);
    } else {
      res.send(error);
    }
  });
}

module.exports.all = function (app) {
  function setup(app) {
    app.engine("handlebars", handlebars({ defaultLayout: "cms" }));
    app.set("view engine", "handlebars");
    app.use(express.json());
    app.use(express.static("public"));
  }
  var newAPP = app;

  // Área picking
  function setupPicking(app) {
    app.engine("handlebars", handlebars({ defaultLayout: "picking" }));
    app.set("view engine", "handlebars");
    app.use(express.json());
    app.use(express.static("public"));
  }
  app.get("/picking", async function (req, res) {
    setupPicking(newAPP);
    res.render("picking", { MY_DOMAIN: myDomain });
  });
  app.get("/picking-login", async function (req, res) {
    setupPicking(newAPP);
    res.render("picking-login", { MY_DOMAIN: myDomain });
  });
  app.get("/picking-pedidos", async function (req, res) {
    setupPicking(newAPP);
    res.render("picking-pedidos", { MY_DOMAIN: myDomain });
  });
  app.get("/picking-pedido", async function (req, res) {
    setupPicking(newAPP);
    res.render("picking-pedido", { MY_DOMAIN: myDomain });
  });
  // Fim área picking
  app.get("/iconesSmart", async function (req, res) {
    let listaDeArquivos = await fs.readdir("./public/assets/icons");
    console.log(listaDeArquivos);
    res.send(listaDeArquivos);
  });

  app.post("/uploadIcone", (req, res) => {
    const fs = require("fs");
    try {
      const formidable = require("formidable");
      const form = new formidable.IncomingForm();

      form.parse(req, (err, fields, files) => {
        console.log(files);
        const path = require("path");
        const oldpath = files.fileimagem.path;
        //const newpath = path.join("", './apps/www.smartcommerci.co-api/src/data/images/'+req.headers.affiliate_id+'/', files.fileimage.name);
        const newpath = path.join(
          "",
          "./public/assets/icons/",
          "cliente_" + files.fileimagem.name
        );
        fs.renameSync(oldpath, newpath);
        res.send({ resultOk: true, message: "File uploaded" });
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Invalid data parameters!",
        yourData: "error here out",
        errorMessage: error,
      });
    }
  });

  app.get("/dashboard", async function (req, res) {
    setup(newAPP);
    res.render("cms_home", { MY_DOMAIN: myDomain });
  });
  app.get("/clientes-smart", async function (req, res) {
    setup(newAPP);
    res.render("cms_clientes_smart", { MY_DOMAIN: myDomain });
  });
  app.get("/pedidos", async function (req, res) {
    setup(newAPP);
    res.render("cms_orders", { MY_DOMAIN: myDomain });
  });
  app.get("/vendas", async function (req, res) {
    setup(newAPP);
    res.render("cms_sells", { MY_DOMAIN: myDomain });
  });
  app.get("/produtos", async function (req, res) {
    setup(newAPP);
    res.render("cms_products", { MY_DOMAIN: myDomain });
  });
  app.get("/", async function (req, res) {
    setup(newAPP);
    res.render("cms_products", { MY_DOMAIN: myDomain });
  });

  app.get("/categorias", async function (req, res) {
    setup(newAPP);
    res.render("cms_categories_new", { MY_DOMAIN: myDomain });

  });

  app.get("/categorias_new", async function (req, res) {
    setup(newAPP);
    res.render("cms_categories", { MY_DOMAIN: myDomain });
  });

  app.get("/logistica", async function (req, res) {
    setup(newAPP);
    res.render("cms_logistics", { MY_DOMAIN: myDomain });
  });

  app.get("/minha-conta", async function (req, res) {
    setup(newAPP);
    res.render("cms_minha_conta", { MY_DOMAIN: myDomain });
  });

  app.get("/tipos-usuario", async function (req, res) {
    setup(newAPP);
    res.render("cms_tipo_usuario", { MY_DOMAIN: myDomain });
  });

  app.get("/criar-usuario", async function (req, res) {
    setup(newAPP);
    res.render("cms_criar_usuario", { MY_DOMAIN: myDomain });
  });
  app.get("/promocoes", async function (req, res) {
    setup(newAPP);
    res.render("cms_promocoes", { MY_DOMAIN: myDomain });
  });
  app.get("/cupons", async function (req, res) {
    setup(newAPP);
    res.render("cms_cupons", { MY_DOMAIN: myDomain });
  });
  app.get("/clientes", async function (req, res) {
    setup(newAPP);
    res.render("cms_clientes", { MY_DOMAIN: myDomain });
  });
  app.get("/conteudo", async function (req, res) {
    setup(newAPP);
    res.render("cms_conteudo", { MY_DOMAIN: myDomain });
  });

  app.get("/loja/:loja", async function (req, res) {
    setup(newAPP);
    res.render("cms_market", {
      loja: req.params.loja.replace(/_/g, " "),
      MY_DOMAIN: myDomain,
    });
  });
  app.get("/configuracoes", async function (req, res) {
    setup(newAPP);
    res.render("cms_configuracoes", { MY_DOMAIN: myDomain });
  });
  app.get("/editar_home_cores", async function (req, res) {
    setup(newAPP);
    res.render("cms_home_cores", { MY_DOMAIN: myDomain });
  });
  app.get("/paginas_institucionais/:nome", async function (req, res) {
    setup(newAPP);
    res.render("cms_paginas_institucionais", {
      MY_DOMAIN: myDomain,
      NOME: req.params.nome,
    });
  });
  app.get("/nossos_cuidados", async function (req, res) {
    setup(newAPP);
    res.render("cms_nossos_cuidados", { MY_DOMAIN: myDomain });
  });

  app.get("/receitas", async function (req, res) {
    setup(newAPP);
    res.render("cms_receitas", { MY_DOMAIN: myDomain });
  });

  app.get("/receita_interna/:id", async function (req, res) {
    setup(newAPP);
    res.render("cms_receita_interna", {
      MY_DOMAIN: myDomain,
      RECEITA: req.params.id,
    });
  });
  app.get("/cliente/:id", async function (req, res) {
    setup(newAPP);

    conn.query(
      "select * from orders where order_client_id = " + req.params.id,
      async function (error, orders, fields) {
        if (!error) {
          conn.query(
            "select * from users_clients where  id = " + req.params.id,
            async function (error, me, fields) {
              if (!error) {
                let ME = JSON.parse(JSON.stringify(me)),
                  ORDERS = JSON.parse(JSON.stringify(orders));

                console.log(ORDERS[0]);
                res.render("cms_cliente_id", { ME: ME[0], ORDERS: ORDERS });
              } else {
                res.send(error);
              }
            }
          );
        } else {
          res.send(error);
        }
      }
    );
  });
};
