////console.log("teste")

var AFFILIATE_ID = Number(localStorage.AFFILIATE_ID);
////console.log("AFFILIATE ID",AFFILIATE_ID)
var pedidos = [],
  clientes = [];
getPedidos(pedidos);
getClients(clientes);

//==============================================================

function ajustStrigfy(texto) {
  for (let a = 0; a < 120; a++) {
    texto = texto.replace(/"{/g, "{").replace(/}"/g, "}");
    texto = texto.replace('"[', "[").replace(']"', "]");
  }
  return texto;
}
function detectar_mobile() {
  var check = false; //wrapper no check
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
}

if (!detectar_mobile()) {
  location.replace("/pedidos");
}

startAll();
adjust();

//==============================================================

function FULL_PRICES(produto) {
  try {
    ////console.log("PREPRANDO O PRODUTO ",produto)
    let PRODUDO_FINAL;
    let COMPRA_PESO = {},
      COMPRA_POR_PESO = false;

    try {
      COMPRA_POR_PESO = JSON.parse(
        ajustStrigfy(produto["product_sell_by_weight"])
      )["compraPorPeso"];
    } catch (e) { }

    let DESCONTOS = {};
    try {
      DESCONTOS = JSON.parse(
        ajustStrigfy(produto["product_site_discount_value"])
      );
    } catch (err) { }
    let VENDA;
    let MINIMO_PARA_DESCONTO = 0;
    let VALOR_DESCONTO = 0,
      descontoExiste = false,
      valorDescontado = 0,
      tipoDesconto = "nenhum";

    ////console.log('o desconto',produto['product_site_discount_type'].indexOf('preço total'))
    ////console.log('DESCONTOS',DESCONTOS)
    if (
      produto["product_site_discount_type"].indexOf("compre X pague Y") > -1
    ) {
      VALOR_DESCONTO = DESCONTOS["levePague"].precoFinal;
      tipoDesconto = "levePague";
      valorDescontado = DESCONTOS["levePague"].valorDescontado;
      MINIMO_PARA_DESCONTO = Number(
        DESCONTOS["levePague"].valorDescontado.split(" ")[1]
      );
      descontoExiste = true;
    } else if (
      produto["product_site_discount_type"].indexOf("no carrinho") > -1
    ) {
      if (DESCONTOS["porcentagemProduto"].active) {
        ////console.log(DESCONTOS)
        VALOR_DESCONTO = DESCONTOS["porcentagemProduto"].precoFinal;
        descontoExiste = true;
        valorDescontado = Number(
          DESCONTOS["porcentagemProduto"].percentualDescontado
        );
        tipoDesconto = "percentual";
      }

      if (DESCONTOS["subtracaoProduto"].active) {
        ////console.log(DESCONTOS)
        VALOR_DESCONTO = DESCONTOS["subtracaoProduto"].precoFinal;
        descontoExiste = true;
        valorDescontado = Number(DESCONTOS["subtracaoProduto"].valorDescontado);
        tipoDesconto = "subtracao";
      }
    } else if (
      produto["product_site_discount_type"].indexOf("preço total") > -1
    ) {
      ////console.log('tebgo descobto')
      if (DESCONTOS["porcentagem"].active) {
        ////console.log(DESCONTOS)
        VALOR_DESCONTO = DESCONTOS["porcentagem"].precoFinal;
        descontoExiste = true;
        valorDescontado = Number(DESCONTOS["porcentagem"].percentualDescontado);
        tipoDesconto = "porcentagem";
      }

      if (DESCONTOS["subtracao"].active) {
        ////console.log(DESCONTOS)
        VALOR_DESCONTO = DESCONTOS["subtracao"].precoFinal;
        descontoExiste = true;
        valorDescontado = Number(DESCONTOS["subtracao"].valorDescontado);
        tipoDesconto = "subtracao";
      }
    } else {
      ////console.log('desconto inexistente!', descontoExiste)
    }

    let PRECO_VENDA = produto["product_valor"];

    if (COMPRA_PESO === true) {
      PRECO_VENDA = produto["product_site_value"];
    }

    if (descontoExiste) {
      ////console.log(" O DESCONTO ",VALOR_DESCONTO)
      PRECO_VENDA = VALOR_DESCONTO;
    }

    if (COMPRA_PESO === true) {
      let percentual =
        (produto["product_site_value"] * 100) / produto["product_valor"];
      let AJUSTAR = 100 - percentual;

      ////console.log("ajustando",percentual,AJUSTAR, PRECO_VENDA)

      PRECO_VENDA = PRECO_VENDA * (AJUSTAR / 100);
      VALOR_DESCONTO = VALOR_DESCONTO * (AJUSTAR / 100);

      if (produto["product_average_weight_type"] == "gramas") {
        VALOR_DESCONTO =
          (VALOR_DESCONTO * Number(produto["product_average_weight_value"])) /
          1000;
        PRECO_VENDA =
          (PRECO_VENDA * Number(produto["product_average_weight_value"])) /
          1000;
      }
      if (produto["product_average_weight_type"] == "centimetros") {
        VALOR_DESCONTO =
          (VALOR_DESCONTO * Number(produto["product_average_weight_value"])) /
          100;
        PRECO_VENDA =
          (PRECO_VENDA * Number(produto["product_average_weight_value"])) / 100;
      }

      VENDA = {
        valor_bruto: produto["product_site_value"],
        preco_venda: Number(PRECO_VENDA.toFixed(2)),
        existe_desconto: descontoExiste,
        valor_com_desconto: VALOR_DESCONTO,
        origem_desconto: produto["product_site_discount_type"],
        venda_por_peso: COMPRA_POR_PESO,
        tipo_desconto: tipoDesconto,
        percentual_valor_descontado: valorDescontado,
        peso_por_unidade: Number(produto["product_average_weight_value"]),
        medida_da_unidade: produto["product_average_weight_type"],
        minimo_para_desconto: MINIMO_PARA_DESCONTO,
      };
    } else {
      VENDA = {
        valor_bruto: produto["product_valor"],
        preco_venda: Number(PRECO_VENDA.toFixed(2)),
        existe_desconto: descontoExiste,
        valor_com_desconto: VALOR_DESCONTO,
        origem_desconto: produto["product_site_discount_type"],
        venda_por_peso: COMPRA_POR_PESO,
        tipo_desconto: tipoDesconto,
        percentual_valor_descontado: valorDescontado,
        peso_por_unidade: Number(produto["product_average_weight_value"]),
        medida_da_unidade: produto["product_average_weight_type"],
        minimo_para_desconto: MINIMO_PARA_DESCONTO,
      };
    }

    PRODUDO_FINAL = {
      produto: produto,
      venda: VENDA,
    };

    return PRODUDO_FINAL;
  } catch (err) {
    let VENDA = {
      valor_bruto: produto["product_valor"],
      preco_venda: produto["product_valor"],
      existe_desconto: false,
      valor_com_desconto: produto["product_valor"],
      origem_desconto: produto["product_site_discount_type"],
      venda_por_peso: false,
      tipo_desconto: "nenhum",
      percentual_valor_descontado: produto["product_valor"],
      peso_por_unidade: Number(produto["product_average_weight_value"]),
      medida_da_unidade: produto["product_average_weight_type"],
      minimo_para_desconto: 0,
    };

    let PRODUDO_FINAL = {
      produto: produto,
      venda: VENDA,
    };

    return PRODUDO_FINAL;
  }
}

function colunaMenu(elemento) {
  $(".colunaMenu").removeClass("menuActive");
  $(".itemMenu").removeClass("active");
  elemento.addClass("menuActive");
  elemento.find(".itemMenu").addClass("active");
  var alvo = elemento.attr("alvo");
  $(".cardPedido").hide();
  $("." + alvo).show();
  //console.log(alvo)
  $(".infoAguardando").hide();
  $(".infoAguardando").each(function () {
    if ($(this).attr("alvo") == alvo) {
      $(this).show();
    }
  });
}
function separarPedido(elemento) {
  //console.log("separar pedido 1 .. ")
  if (elemento.find("p").text() == "Começar a separar") {
    $(".edicao-produto").css("display", "inline-flex");
    $(".areaBtnNovoProduto").css("display", "block");
    elemento.find("p").text("Parar edição");
    $(".feedback").show();
  } else {
    $(".areaBtnNovoProduto").css("display", "none");
    $(".edicao-produto").css("display", "none");
    elemento.find("p").text("Começar a separar");
    $(".feedback").hide();
  }

  $(".removeTodoProduto").css("height", $(".cardProduto").css("height"));
  adjust();
}
function separarPedido2(elemento) {
  //console.log("separar pedido 2 .. ")
  if (elemento.text() == "Começar a separar") {
    $(".edicao-produto").css("display", "inline-flex");
    $(".areaBtnNovoProduto").css("display", "block");
    elemento.text("Parar edição");
    $(".feedback").show();
  } else {
    $(".areaBtnNovoProduto").css("display", "none");
    $(".edicao-produto").css("display", "none");
    elemento.text("Começar a separar");
    $(".feedback").hide();
  }
  $(".removeTodoProduto").css("height", $(".cardProduto").css("height"));
}
function closeModal(element) {
  element.parent().parent().parent().hide();
}
function getProductInfo(id) {
  var dadosPedido = JSON.parse(
    ajustStrigfy(
      localStorage.PEDIDO_FULL.trim()
        .replace(/\n/g, "")
        .replace(/\r/g, "")
        .replace(/\t/g, "")
    )
  );
  //console.log(dadosPedido)
  //console.log(id)
  for (const k in dadosPedido) {
    //console.log(dadosPedido[k].product_code,id )
    if (dadosPedido[k].product_code === id) {
      return dadosPedido[k];
    }
  }
  return [];
}
function getProductSearchInfo(id) {
  var dadosPedido = JSON.parse(
    ajustStrigfy(
      localStorage.DADOS_SEARCH.trim()
        .replace(/\n/g, "")
        .replace(/\r/g, "")
        .replace(/\t/g, "")
    )
  );
  //console.log(dadosPedido)
  //console.log(id)
  for (const k in dadosPedido) {
    //console.log(dadosPedido[k].product_code,id )
    if (dadosPedido[k].product_code === id) {
      return dadosPedido[k];
    }
  }
  return [];
}
function editarProduto(elemento) {
  localStorage.produtoEditando = elemento.attr("product_code");
  var prd_code = Number(elemento.attr("product_code"));
  var dadosProduto = getProductInfo(prd_code);
  //console.log(elemento)

  $(".editarProdutoModal")
    .find(".nomeProduto")
    .html(dadosProduto.product_site_name);
  if (dadosProduto.product_average_weight_value > 0) {
    $(".editarProdutoModal")
      .find(".pesoProduto")
      .html(
        "aproximadamente " +
        dadosProduto.product_average_weight_value +
        "" +
        dadosProduto.product_average_weight_type
      );
  } else {
    $(".editarProdutoModal").find(".pesoProduto").hide();
  }
  var imagen = dadosProduto.product_thumbnail;
  if (imagen == null) {
    imagen =
      "http://localhost:6060/images/default/produto-sem-imagem.jpg";
  }
  $(".editarProdutoModal")
    .find(".imagenProduto")
    .css(
      "background",
      "transparent url(" + imagen + ") 0% 0% no-repeat padding-box"
    );
  $(".editarProdutoModal")
    .find(".quantidadePedido")
    .val(Number(dadosProduto.quantidade));
  $(".editarProdutoModal")
    .find(".btnRemoverProdutoModal")
    .attr("product_code", dadosProduto.product_code);
  $(".editarProdutoModal")
    .find(".btnAplicarModal")
    .attr("product_code", dadosProduto.product_code);
  $(".editarProdutoModal")
    .find(".btnDesfazerProdutoModal")
    .attr("product_code", dadosProduto.product_code);

  $(".editarProdutoModal").show();
}
function voltarPagina(elemento) {
  //console.log("clicou voltar..")
  $("." + elemento.attr("paginaClose")).hide();
  //console.log("precisa implementar...")
  location.reload();
}
function novoProdutoModal(elemento) {
  $(".novoProdutoModal").show();
}
function modalAdicionarProduto(elemento) {
  localStorage.produtoEditando = elemento.attr("product_code");
  var prd_code = Number(elemento.attr("product_code"));
  var dadosProduto = getProductSearchInfo(prd_code);
  //console.log('dadosProduto '+elemento.attr("product_code"))
  //console.log(dadosProduto)

  $(".adicionarProdutoModal")
    .find(".nomeProduto")
    .html(dadosProduto.product_site_name);
  $(".adicionarProdutoModal")
    .find(".btnAplicarModal")
    .attr("product_code", dadosProduto.product_code);

  if (dadosProduto.product_average_weight_value > 0) {
    $(".adicionarProdutoModal")
      .find(".pesoProduto")
      .html(
        "aproximadamente " +
        dadosProduto.product_average_weight_value +
        "" +
        dadosProduto.product_average_weight_type
      );
  } else {
    $(".adicionarProdutoModal").find(".pesoProduto").hide();
  }
  var imagen = dadosProduto.product_thumbnail;
  if (imagen == null) {
    imagen =
      "http://localhost:6060/images/default/produto-sem-imagem.jpg";
  }
  $(".adicionarProdutoModal")
    .find(".imagenProduto")
    .css(
      "background",
      "transparent url(" + imagen + ") 0% 0% no-repeat padding-box"
    );
  $(".adicionarProdutoModal")
    .find(".quantidadePedido")
    .val(Number(dadosProduto.quantidade));

  $(".adicionarProdutoModal").show();
}
function redirect(destino, numeroPedido) {
  //console.log(numeroPedido)
  localStorage.numeroPedido = numeroPedido;
  location.replace("/" + destino);
}
function buscaPorPedido(elemento) {
  elemento.hide();
  $(".buscaPedidoOculto").fadeIn();
}
async function cancelaProduto(elemento) {
  var vSubTotal = Number(
    elemento
      .parent()
      .parent()
      .parent()
      .find(".cardProduto")
      .addClass("removido")
      .find(".vSubTotal")
      .text()
      .replace("R$", "")
      .replace(",", ".")
  );
  //console.log(vSubTotal)
  let PRD_CODE = Number(elemento.attr("product_code"));
  atualPedido = JSON.parse(ajustStrigfy(localStorage.ORDER_EDIT));

  for (const k in atualPedido) {
    if (Number(atualPedido[k].product_code) === PRD_CODE) {
      atualPedido[k]["comentario"] = "#CANCELADO#";
    }
  }
  localStorage.ORDER_EDIT = JSON.stringify(atualPedido);

  var valorTotal =
    Number($("#totalPedido").text().replace("R$", "").replace(",", ".")) -
    vSubTotal;
  $("#totalPedido").text(valorTotal.toFixed(2).replace(".", ","));
  elemento.parent().hide();
  elemento
    .parent()
    .parent()
    .parent()
    .find(".areaProdutoPedido")
    .addClass("removido");
  elemento.parent().parent().parent().find(".cardProduto").addClass("removido");
  elemento
    .parent()
    .parent()
    .parent()
    .find(".cardProduto")
    .css("border-left", "5px solid silver");
  elemento.attr("status", "removido");
  elemento
    .parent()
    .parent()
    .parent()
    .find(".opaco")
    .css("filter", "grayscale(1)");
  elemento
    .parent()
    .parent()
    .parent()
    .find(".txtEditarProduto")
    .html("Produto removido");
  elemento
    .parent()
    .parent()
    .parent()
    .find(".txtColetarProduto")
    .html("Voltar produto");
  elemento
    .parent()
    .parent()
    .parent()
    .find(".txtColetarProduto")
    .parent()
    .attr("status", "removido");
  elemento
    .parent()
    .parent()
    .parent()
    .find(".iconeColetar")
    .attr("src", "/assets/icons/desfazBranco.svg");

  updateOrderDetails(
    atualPedido,
    Number(localStorage.numeroPedido),
    valorTotal
  );
}
async function reativaColetaProduto(elemento) {
  //console.log('coleta ou reativa...')
  var vSubTotal = Number(
    elemento
      .parent()
      .parent()
      .parent()
      .parent()
      .find(".cardProduto")
      .addClass("removido")
      .find(".vSubTotal")
      .text()
      .replace("R$", "")
      .replace(",", ".")
  );
  //console.log(vSubTotal)
  var valorTotal =
    Number($("#totalPedido").text().replace("R$", "").replace(",", ".")) +
    vSubTotal;
  $("#totalPedido").text(valorTotal.toFixed(2).replace(".", ","));

  if (elemento.attr("status") == undefined) {
    //console.log('coleta...')
    //console.log("separar item pedido "+elemento.attr('product_code'))
    var listaSeparados = [],
      prd_code = Number(elemento.attr("product_code"));
    if (
      localStorage.listaSeparados != null &&
      localStorage.listaSeparados != undefined &&
      localStorage.listaSeparados != ""
    ) {
      listaSeparados = JSON.parse(
        ajustStrigfy(
          localStorage.listaSeparados
            .trim()
            .replace(/\n/g, "")
            .replace(/\r/g, "")
            .replace(/\t/g, "")
        )
      );
      //console.log(listaSeparados.length)
      if (listaSeparados.length > 0) {
        var separado = false;
        for (const k in listaSeparados) {
          //console.log('listaSeparados[k].produto,prd_code')
          //console.log(listaSeparados[k].produto,prd_code)
          if (Number(listaSeparados[k].produto) === Number(prd_code)) {
            //console.log("produto ja separado antes!")
            separado = true;
          }
        }
        if (!separado) {
          listaSeparados.push({
            produto: prd_code,
            comentario: "Tudo separado",
          });
        }
      } else {
        listaSeparados.push({ produto: prd_code, comentario: "Tudo separado" });
      }

      var pedidosFull = JSON.parse(
        ajustStrigfy(
          localStorage.PEDIDO_FULL.trim()
            .replace(/\n/g, "")
            .replace(/\r/g, "")
            .replace(/\t/g, "")
        )
      ),
        listaOk = [];
      for (const k in pedidosFull) {
        var ok = false;
        for (const a in listaSeparados) {
          if (listaSeparados[a].produto == pedidosFull[k].product_code) {
            ok = true;
          }
        }
        if (ok) {
          listaOk.push(pedidosFull[k]);
        }
      }
      if (pedidosFull.length == listaOk.length) {
        finalizaSeparacao(elemento);
      }
    } else {
      listaSeparados.push({ produto: prd_code, comentario: "Tudo separado" });
    }
    //console.log('listaSeparados')
    //console.log(listaSeparados)
    localStorage.listaSeparados = JSON.stringify(listaSeparados);

    var toDo = insertTracing(
      "separacao",
      localStorage.numeroPedido,
      localStorage.listaSeparados
    );
    //console.log(toDo)
  } else {
    //console.log("reativa item pedido")
    elemento
      .parent()
      .parent()
      .parent()
      .parent()
      .find(".removeTodoProduto")
      .css("display", "block");
    elemento
      .parent()
      .parent()
      .parent()
      .parent()
      .find(".areaProdutoPedido")
      .removeClass("removido");
    elemento
      .parent()
      .parent()
      .parent()
      .parent()
      .find(".cardProduto")
      .removeClass("removido");
    elemento
      .parent()
      .parent()
      .parent()
      .parent()
      .find(".cardProduto")
      .css("border-left", "5px solid #f6b504");

    let PRD_CODE = Number(elemento.attr("product_code"));
    atualPedido = JSON.parse(ajustStrigfy(localStorage.ORDER_EDIT));

    for (const k in atualPedido) {
      if (Number(atualPedido[k].product_code) === PRD_CODE) {
        atualPedido[k]["comentario"] = atualPedido[k]["comentario"]
          ? atualPedido[k]["comentario"].replace(/#CANCELADO#/g, "")
          : "";
      }
    }
    localStorage.ORDER_EDIT = JSON.stringify(atualPedido);
    updateOrderDetails(
      atualPedido,
      Number(localStorage.numeroPedido),
      valorTotal
    );

    elemento.parent().parent().find(".opaco").css("filter", "none");
    elemento.parent().parent().find(".txtEditarProduto").html("Editar produto");
    elemento
      .parent()
      .parent()
      .find(".txtColetarProduto")
      .html("Coletar produto");
    elemento
      .parent()
      .parent()
      .find(".txtColetarProduto")
      .parent()
      .removeAttr("status");
    elemento
      .parent()
      .parent()
      .parent()
      .find(".iconeColetar")
      .attr("src", "/assets/icons/cart.svg");
  }
  elemento.css("background", "green 0% 0% no-repeat padding-box");
  elemento.css("border", "1px solid green");
  elemento.find(".txtColetarProduto").text("Ok");
  elemento.find(".iconeColetar").hide();
  elemento
    .parent()
    .parent()
    .parent()
    .parent()
    .find(".cardProduto")
    .removeClass("removido");
  adjust();
}
function finalizaSeparacao(elemento) {
  $(".finalizaSeparacao").show();
}
async function registraFim(elemento) {
  insertTracing(
    "finalizado",
    localStorage.numeroPedido,
    localStorage.listaSeparados
  );
  location.replace("/picking-pedidos");
}

async function adicionarProdutoAoPedido(elemento) {
  var prd_code = Number(elemento.attr("product_code"));
  var detalhesProduto = getProductSearchInfo(prd_code);
  var quantidade = elemento
    .parent()
    .parent()
    .parent()
    .parent()
    .find(".novaQuantidade")
    .val();

  var comentario = elemento
    .parent()
    .parent()
    .parent()
    .parent()
    .find(".textoComentario")
    .val();

  let produtoFinal = FULL_PRICES(detalhesProduto);

  var detalhes = {
    ...detalhesProduto,
    valor:
      Number(quantidade) >= produtoFinal.venda.minimo_para_desconto
        ? produtoFinal.venda.preco_venda
        : produtoFinal.venda.valor_bruto,
    caracteristica: "",
    comentario: comentario,
    quantidade: Number(quantidade),
    minimo_para_desconto: produtoFinal.venda.minimo_para_desconto,
    desconto: produtoFinal.venda.valor_bruto - produtoFinal.venda.preco_venda,
  };
  var atualPedido = [];
  try {
    atualPedido = JSON.parse(
      ajustStrigfy(
        localStorage.ORDER_EDIT.trim()
          .replace(/\n/g, "")
          .replace(/\r/g, "")
          .replace(/\t/g, "")
      )
    );
  } catch (e) {
    //console.log(e)
  }

  atualPedido.push(detalhes);
  localStorage.ORDER_EDIT = JSON.stringify(atualPedido);
  var valorT =
    Number($("#totalPedido").text().replace(",", ".")) +
    detalhes.quantidade * detalhes.valor;
  var atualiza = updateOrderDetails(
    atualPedido,
    Number(localStorage.numeroPedido),
    valorT
  );
  //console.log(atualiza)
  startAll();

  $(".adicionarProdutoModal").hide();
}
async function removerProdutoAoPedido(elemento) {
  var prd_code = Number(elemento.attr("product_code"));

  var atualPedido = [];
  try {
    atualPedido = JSON.parse(
      ajustStrigfy(
        localStorage.ORDER_EDIT.trim()
          .replace(/\n/g, "")
          .replace(/\r/g, "")
          .replace(/\t/g, "")
      )
    );
  } catch (e) {
    //console.log(e)
  }

  var novoPedido2 = [];
  for (const k in atualPedido) {
    if (atualPedido[k].product_code != prd_code) {
      novoPedido2.push(atualPedido[k]);
    }
  }

  var valorTotal = Number(
    $("#totalPedido").text().replace("R$", "").replace(",", ".")
  );
  var outroValor = 0;
  for (const k in novoPedido2) {
    let produtoFinal = FULL_PRICES(novoPedido2[k]);
    let total =
      Number(novoPedido2[k].quantidade) >=
        produtoFinal.venda.minimo_para_desconto
        ? produtoFinal.venda.preco_venda
        : produtoFinal.venda.valor_bruto;
    outroValor += Number(novoPedido2[k].quantidade) * total;
  }
  //console.log('novoPedido2')
  //console.log(novoPedido2)
  //console.log('outroValor')
  //console.log(outroValor)

  localStorage.ORDER_EDIT = JSON.stringify(novoPedido2);

  var entrega = $("#valEntrega").text();
  entrega = entrega.replace(",", ".");
  //console.log('outroValor + '+entrega)
  //console.log(outroValor)
  outroValor += Number(entrega);
  var atualiza = updateOrderDetails(
    novoPedido2,
    Number(localStorage.numeroPedido),
    outroValor
  );
  //console.log(atualiza)
  startAll();
  $(".editarProdutoModal").hide();
  location.reload();
}
async function editarProdutoDoPedido(elemento) {
  var prd_code = Number(elemento.attr("product_code"));
  var detalhesProduto = getProductSearchInfo(prd_code);
  var quantidade = elemento
    .parent()
    .parent()
    .parent()
    .parent()
    .find(".quantidadePedido")
    .val();

  var comentario = elemento
    .parent()
    .parent()
    .parent()
    .parent()
    .find("textarea")
    .val();

  let produtoFinal = FULL_PRICES(detalhesProduto);

  var detalhes = {
    ...detalhesProduto,
    valor:
      Number(quantidade) >= produtoFinal.venda.minimo_para_desconto
        ? produtoFinal.venda.preco_venda
        : produtoFinal.venda.valor_bruto,
    caracteristica: "",
    comentario: comentario,
    quantidade: Number(quantidade),
    minimo_para_desconto: produtoFinal.venda.minimo_para_desconto,
    desconto: produtoFinal.venda.valor_bruto - produtoFinal.venda.preco_venda,
  };

  var atualPedido = [];
  try {
    atualPedido = JSON.parse(
      ajustStrigfy(
        localStorage.ORDER_EDIT.trim()
          .replace(/\n/g, "")
          .replace(/\r/g, "")
          .replace(/\t/g, "")
      )
    );
  } catch (e) {
    //console.log(e)
  }
  var novoPedido = [];
  for (const k in atualPedido) {
    if (atualPedido[k].product_code != prd_code) {
      novoPedido.push(atualPedido[k]);
    }
  }
  //console.log("comentario")
  //console.log(comentario)
  //console.log("quantidade")
  //console.log(quantidade)
  if (comentario == "" || comentario == undefined) {
    comentario = "Sem comentários";
  }

  var valorTotal = Number(
    $("#totalPedido").text().replace("R$", "").replace(",", ".")
  );

  novoPedido.push(detalhes);
  localStorage.ORDER_EDIT = JSON.stringify(novoPedido);
  var outroValor = 0;
  for (const k in novoPedido) {
    let produtoFinal = FULL_PRICES(novoPedido[k]);
    let total =
      Number(novoPedido[k].quantidade) >=
        produtoFinal.venda.minimo_para_desconto
        ? produtoFinal.venda.preco_venda
        : produtoFinal.venda.valor_bruto;
    outroValor += Number(novoPedido[k].quantidade) * total;
  }
  //console.log('outroValor')
  //console.log(outroValor)
  var entrega = $("#valEntrega").text();
  entrega = entrega.replace(",", ".");
  //console.log('outroValor + '+entrega)
  //console.log(outroValor)
  outroValor += Number(entrega);
  var atualiza = updateOrderDetails(
    novoPedido,
    Number(localStorage.numeroPedido),
    outroValor
  );
  //console.log(atualiza)
  startAll();

  $(".editarProdutoModal").hide();

  location.reload();
}

function digitando(element) {
  element.parent().parent().parent().parent().find(".btnAplicarModal").hide();
  element.parent().parent().parent().parent().css("height", "100vh");
}
function parouDigitar(element) {
  element.parent().parent().parent().parent().find(".btnAplicarModal").show();
  element.parent().parent().parent().parent().css("height", "75vh");
}
function adjust() {
  //console.log("ajustando...")
  $(".removeTodoProduto").each(function () {
    $(this).css("height", $(".cardProduto").css("height"));
  });
  $(".removeTodoProduto").css("max-height", $(".cardProduto").css("height"));

  var leftPos = $(".meuProduto").scrollLeft();
  $(".meuProduto").animate({ scrollLeft: leftPos + 200 }, 800);
  var leftPos = $(".meuProduto").scrollLeft();
  $(".meuProduto").animate({ scrollLeft: leftPos + 200 }, 800);
}
async function startAll() {
  var tracing = getTracing();
  var loader = setInterval(() => {
    if (pedidos.length > 0 && clientes.length > 0) {
      //console.log('pedidos')
      //console.log(pedidos)
      //console.log('tracing')
      //console.log(tracing)

      clearInterval(loader);
      pedidos = pedidos[0];
      clientes = clientes[0];
      //console.log(pedidos)
      localStorage.pedidos = JSON.stringify(pedidos);
      localStorage.clientes = JSON.stringify(clientes);
      $(".listaDePedidos").html("");
      function getStatusTracing(orderNumber) {
        var result = "aguardando";
        for (const a in tracing) {
          if (tracing[a].orderId == orderNumber) {
            result = tracing[a].status;
          }
        }
        return result;
      }
      for (const k in pedidos) {
        var html =
          '<div  pedido="' +
          pedidos[k].id +
          "\" onclick=\"redirect('picking-pedido'," +
          pedidos[k].id +
          ')" class="cardPedido ' +
          getStatusTracing(pedidos[k].id) +
          '">' +
          '<div class="topoPedido">' +
          '<p class="numeroPedido">#' +
          pedidos[k].id +
          '</p> <p class="nomeCliente">' +
          getClientInfo(pedidos[k].order_client_id).users_client_name +
          "</p>" +
          "</div>" +
          '<div class="areaData">' +
          // eslint-disable-next-line no-undef
          '<p class="dataRecebimento">* Recebido ' +
          moment(pedidos[k].createdAt).format("DD/MM HH:mm") +
          "</p>" +
          "</div>" +
          '<div class="areaDetalhe">' +
          // eslint-disable-next-line no-undef
          '<p class="txtDetalhe">' +
          pedidos[k].order_metodo_entrega +
          " " +
          moment(pedidos[k].order_data_entrega).format("DD/MM") +
          " 09h as 13h - R$ " +
          Number(pedidos[k].order_valor_entrega).toFixed(2).replace(".", ",") +
          "</p>" +
          "</div>" +
          "</div>";
        $(".listaDePedidos").append(html);
      }

      $(".removeTodoProduto").css("height", $(".cardProduto").css("height"));
      var leftPos = $(".meuProduto").scrollLeft();
      $(".meuProduto").animate({ scrollLeft: leftPos + 200 }, 800);
      var leftPos = $(".meuProduto").scrollLeft();
      $(".meuProduto").animate({ scrollLeft: leftPos + 200 }, 800);

      $("#aguardandoSeparacao").html($(".aguardando").length);
      $("#emSeparacao").html($(".separacao").length);
      $("#finalizado").html($(".finalizado").length);
    } else {
      //console.log("aguardando pedidos...")
    }
  }, 300);
}
function getClientInfo(id) {
  var clientes = JSON.parse(
    ajustStrigfy(
      localStorage.clientes
        .trim()
        .replace(/\n/g, "")
        .replace(/\r/g, "")
        .replace(/\t/g, "")
    )
  );
  //console.log(clientes)
  //console.log(id)
  for (const k in clientes) {
    //console.log(clientes[k].id,id )
    if (clientes[k].id === id) {
      return clientes[k];
    }
  }
  return [];
}
function getOrderInfo(id) {
  var pedidos2 = JSON.parse(
    ajustStrigfy(
      localStorage.pedidos
        .trim()
        .replace(/\n/g, "")
        .replace(/\r/g, "")
        .replace(/\t/g, "")
    )
  );
  //console.log(pedidos2)
  //console.log(id)
  for (const k in pedidos2) {
    //console.log(pedidos2[k].id,id )
    if (pedidos2[k].id === id) {
      return pedidos2[k];
    }
  }
  //console.log(pedidos)
  localStorage.pedidos = JSON.stringify(pedidos);
  for (const k in pedidos) {
    //console.log(pedidos[k].id,id )
    if (pedidos[k].id === id) {
      return pedidos[k];
    }
  }
  return [];

  // location.reload()
}
async function request(urlEnd, params) {
  return $.ajax({
    type: "POST",
    url: "http://localhost:6060/" + urlEnd,
    headers: { "x-access-token": localStorage.token },
    data: params,
    success: function (data) {
      //console.log("dt",data)
      if (urlEnd == "login") {
        localStorage.token = data.token;
        localStorage.token_me = data.token_me;
        localStorage.AFFILIATE_ID = data.data.users_affiliate_id;
        localStorage.MASTER_ID = data.data.users_affiliate_master_id;
      }
    },
    error: function (data) {
      //console.log(data)
      localStorage.lastError = data;
      // alert("Login incorreto!")
      //location.replace('/picking-login')
    },
    complete: function () { },
  });
}
async function getPedidos(pedidos) {
  AFFILIATE_ID = Number(localStorage.AFFILIATE_ID);
  //console.log("AFFILIATE ID",AFFILIATE_ID)
  var dados = request("getById", {
    table: "orders",
    id_name: "order_affiliate_id",
    id_value: AFFILIATE_ID,
  });
  pedidos.push(dados);
}
async function getTracing() {
  return request("getById", {
    table: "tracingOrder",
    id_name: "affiliate_id",
    id_value: AFFILIATE_ID,
  });
}
async function getClients(clientes) {
  var dados = request("getById", {
    table: "users_clients",
    id_name: "users_client_affiliate_id",
    id_value: AFFILIATE_ID,
  });
  clientes.push(dados);
}
async function login(user, key) {
  return request("login", {
    user: user,
    table: "users_affiliates",
    prefix: "users_affiliate",
    password: key,
  });
}
async function updateOrderDetails(newList, numeroPedido, valorPedido) {
  //console.log(newList, numeroPedido, valorPedido)
  return request("updateOrderDetails", {
    NUM_PEDIDO: numeroPedido,
    VALOR_PEDIDO: valorPedido,
    ITENS_PEDIDO: JSON.stringify(newList),
  });
}
async function insertTracing(status, numeroPedido, detalhes) {
  //console.log(status, numeroPedido, detalhes)
  var tracingAtual = getTracing();
  //console.log('tracingAtual')
  //console.log(tracingAtual)

  return request("insertNew", {
    table: "tracingOrder",
    fields: [
      { column: "affiliate_id", value: AFFILIATE_ID },
      { column: "orderId", value: numeroPedido },
      { column: "status", value: status },
      { column: "details", value: JSON.stringify(detalhes) },
    ],
  });
}
async function search(element) {
  var container = element
    .parent()
    .parent()
    .parent()
    .find(".areaBuscaModalContainer");
  container.html("");
  var dados = request("productSearch", {
    product_affiliate_id: AFFILIATE_ID,
    product_site_name: element.val(),
    product_code: element.val(),
    totalItems: 50,
    lastID: 0,
  });
  //console.log('dados search')
  //console.log(dados)
  if (localStorage.DADOS_SEARCH != undefined) {
    var newDados = JSON.parse(
      ajustStrigfy(
        localStorage.DADOS_SEARCH.trim()
          .replace(/\n/g, "")
          .replace(/\r/g, "")
          .replace(/\t/g, "")
      )
    );
    if (newDados.length > 4000) {
      newDados = [];
    }
    for (const k in dados) {
      newDados.push(dados[k]);
    }
    localStorage.DADOS_SEARCH = JSON.stringify(newDados);
  } else {
    localStorage.DADOS_SEARCH = JSON.stringify(dados);
  }

  for (const k in dados) {
    var imagen = dados[k].product_thumbnail;
    if (imagen == null) {
      imagen =
        "http://localhost:6060/images/default/produto-sem-imagem.jpg";
    }
    let produtoFinal = FULL_PRICES(dados[k]);
    let valorFinal =
      produtoFinal.existe_desconto === true
        ? produtoFinal.venda.preco_venda
        : produtoFinal.venda.valor_bruto;
    var peso =
      '<p class="pesoModalBusca">aproximadamente ' +
      dados[k].product_average_weight_value +
      "" +
      dados[k].product_average_weight_type +
      "</p>";
    if (
      dados[k].product_average_weight_type == null ||
      dados[k].product_average_weight_type == "" ||
      dados[k].product_average_weight_value == 0
    ) {
      peso = "";
    }
    var html =
      '<div class="areaBuscaProduto">' +
      '<img class="imagenCardBusca" src="' +
      imagen +
      '" />' +
      '<div class="areaTextoModal">' +
      '<p class="descricaoModalBusca">' +
      dados[k].product_site_name +
      "</p>" +
      '<p class="precooModalBusca">R$' +
      valorFinal.toFixed(2).replace(".", ",") +
      "</p>" +
      "</div>" +
      '<div class="right">' +
      '<div product_code="' +
      dados[k].product_code +
      '" onclick="modalAdicionarProduto($(this))" class="areaIconeBuscaModal">' +
      '<img class="iconePlusBusca" src="/assets/icons/plusCircular.svg" />' +
      "</div>" +
      "</div>" +
      "</div>";
    container.append(html);
  }
}
