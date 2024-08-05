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
if (detectar_mobile()) {
  location.replace("/picking-login");
}
localStorage.relacionados = "[]";

var PARAMETROS_FILTROS = [
  { colmun: "categorias", value: null, active: false },
  { colmun: "descricao", value: "", active: false },
  { colmun: "marcas", value: null, active: false },
  { colmun: "tags", value: null, active: false },
  { colmun: "desativados", value: "active", active: false },
  { colmun: "estoque_baixo", value: "20", active: false },
  { colmun: "promocao", value: null, active: false },
  { colmun: "peso_unidade", value: null, active: false },
  { colmun: "variacao", value: null, active: false },
  { colmun: "imagen", value: null, active: false },
];
localStorage.PARAMETROS_FILTROS = JSON.stringify(PARAMETROS_FILTROS);

function removeFiltrosAvancados() {
  var PARAMETROS_FILTROS = [
    { colmun: "categorias", value: null, active: false },
    { colmun: "marcas", value: null, active: false },
    { colmun: "tags", value: null, active: false },
    { colmun: "desativados", value: "active", active: false },
    { colmun: "estoque_baixo", value: "20", active: false },
    { colmun: "promocao", value: null, active: false },
    { colmun: "peso_unidade", value: null, active: false },
    { colmun: "variacao", value: null, active: false },
    { colmun: "imagen", value: null, active: false },
  ];
  localStorage.PARAMETROS_FILTROS = JSON.stringify(PARAMETROS_FILTROS);
  $(".close").click();
  lastHtmlFilter = null;
  $(".totalFiltros").text("0");
  setTimeout(() => {
    filter();
  }, 500);
}
function removeFiltrosAvancadosLoad() {
  var PARAMETROS_FILTROS = [
    { colmun: "categorias", value: null, active: false },
    { colmun: "marcas", value: null, active: false },
    { colmun: "tags", value: null, active: false },
    { colmun: "desativados", value: "active", active: false },
    { colmun: "estoque_baixo", value: "20", active: false },
    { colmun: "promocao", value: null, active: false },
    { colmun: "peso_unidade", value: null, active: false },
    { colmun: "variacao", value: null, active: false },
    { colmun: "imagen", value: null, active: false },
  ];
  localStorage.PARAMETROS_FILTROS = JSON.stringify(PARAMETROS_FILTROS);
  $(".close").click();
  $(".listaDeProdutos").html("");
  request("getAllProducts", 0, 25, 0, 0, 0);

  var parametros = [];
  try {
    parametros = JSON.parse(localStorage.PARAMETROS_FILTROS);
  } catch (e) { }
  let totalFiltros = 0,
    currFilter = null,
    listFiedlsSearch = "";
  for (const k in parametros) {
    if (parametros[k].active == true) {
      if (currFilter != parametros[k].colmun + "," + parametros[k].active) {
        totalFiltros++;
        listFiedlsSearch +=
          parametros[k].colmun +
          ": " +
          (parametros[k].value == null ? "" : parametros[k].value) +
          " ,";
      }
    }
    currFilter = parametros[k].colmun + "," + parametros[k].active;
  }
  $(".totalFiltros").text(totalFiltros);
  setTimeout(() => {
    ajustaFeedback(false, listFiedlsSearch);
  }, 3000);
}

function setPARAMETROS_FILTRO(elemento) {
  if (elemento.attr("id") == "searchProducts") {
    var column = elemento.attr("column"),
      value = elemento.val();
    let active = false;
    if (value != "") {
      active = true;
    }
    try {
      var PRM = JSON.parse(localStorage.PARAMETROS_FILTROS);

      for (const k in PRM) {
        if (column == PRM[k].colmun) {
          PRM[k].active = active;
          PRM[k].value = value;
        }
      }
      localStorage.PARAMETROS_FILTROS = JSON.stringify(PRM);
    } catch (err) {
      console.log({ err });
    }
  } else {
    var column = elemento.attr("column"),
      value = elemento.attr("value"),
      active = elemento[0].checked;
    var PRM = JSON.parse(localStorage.PARAMETROS_FILTROS);
    for (const k in PRM) {
      if (column == PRM[k].colmun) {
        PRM[k].active = active;
      }
    }

    localStorage.PARAMETROS_FILTROS = JSON.stringify(PRM);
    verFeedback();
  }
}
if (localStorage.token == undefined || localStorage.token == "") {
  localStorage.peregrino =
    location.href.split("/")[location.href.split("/").length - 1];
  localStorage.peregrino =
    location.href.split("/")[location.href.split("/").length - 1];
  location.replace("/cms-login");
}

var AFFILIATE_ID = localStorage.AFFILIATE_ID;

var PRODUCTS_IMAGES = [];
var AFFILIATES = JSON.parse(localStorage.LOJAS_CADASTRADAS);
var PRODUCTS = [];
var OM = false;
//totalProducts

window.addEventListener('load', function () {
  $.ajax({
    type: "POST",
    url: mainHost + "/totalProducts",

    headers: {
      "x-access-token": localStorage.token,
    },
    data: {
      affiliate_id: AFFILIATE_ID,
    },
    success: function (data) {
      $(".totalPordutosCadastrados").html(data[0].total.toLocaleString());
    },
    error: function (data) {
      if (data.responseJSON.message.indexOf("token") > -1) {
        setTimeout(() => {
          localStorage.peregrino =
            location.href.split("/")[location.href.split("/").length - 1];
          localStorage.peregrino =
            location.href.split("/")[location.href.split("/").length - 1];
          location.replace("/cms-login");
        }, 2000);
      }
    },
    complete: function () {
    },
  });
});


//products
window.addEventListener('load', function () {
  request("getAllProducts", 0, 25, 0, 0, 0);
});



setTimeout(() => {
  ajustaFeedback(false, "");
}, 5000);
$("#searchProducts").change(function () {
  if ($(this).val() != "") {
    $(this).parent().find(".fecha3").show();
    $(this).parent().find(".pesquisa3").hide();
  } else {
    $(this).parent().find(".fecha").hide();
    $(this).parent().find(".pesquisa3").show();
  }
  setPARAMETROS_FILTRO($(this));
  $(".listaDeProdutos").html("");
  request(
    "productSearch",
    0,
    25,
    $(this).val(),
    localStorage.AFFILIATE_ID,
    $(this).val()
  );
});

function closeBtn() {
  $("#searchProducts").val("");

  $("#searchProducts").parent().find(".fecha3").hide();
  $("#searchProducts").parent().find(".pesquisa3").show();
}

async function atualizaListaProdutos() {
  var last_request = JSON.parse(localStorage.LAST_REQUEST);
  if (
    localStorage.LAST_REQUEST == undefined ||
    localStorage.LAST_REQUEST == ""
  ) {
    var parametros = [];
    try {
      parametros = JSON.parse(localStorage.PARAMETROS_FILTROS);
    } catch (e) { }
    if (parametros.length > 0) {
      buscaPeloFiltro(
        parametros,
        10000,
        false,
        10000,
        last_request.LAST_ID,
        true
      );
    }
  } else {
    PRODUCTS = [];
    var last_request = JSON.parse(localStorage.LAST_REQUEST);
    request(
      last_request.ADDRESS,
      last_request.LAST_ID,
      last_request.TOTAL_ITENS,
      last_request.PRODUCT_CODE,
      last_request.PRODUCT_AFFILIATE_ID,
      last_request.PRODUCT_NAME
    );
  }
}

function ajustaFeedback(add, texto) {
  if (texto == "") {
    $("#parametrosFiltrados").text("");
    $("#totalItensFiltrados").text("0");
  } else {
    $(".feedbackFiltroMenu").css("opacity", 1);
    $("#totalItensFiltrados").text($(".product").length);
    if (add) {
      $("#parametrosFiltrados").text(
        $("#parametrosFiltrados").text() + "," + texto
      );
    } else {
      $("#parametrosFiltrados").text($("#searchProducts").val() + ", " + texto);
    }
  }
}

async function request(
  ADDRESS,
  LAST_ID,
  TOTAL_ITENS,
  PRODUCT_CODE,
  PRODUCT_AFFILIATE_ID,
  PRODUCT_NAME
) {

  var lojas2 = JSON.parse(localStorage.LOJAS_CADASTRADAS);

  for (const k in lojas2) {
    if (lojas2[k].id == Number(localStorage.AFFILIATE_ID)) {
      $("#filialShow").html(" / " + lojas2[k].affiliates_business_name);
      localStorage.NOME_FILIAL = lojas2[k].affiliates_business_name;
      $("#filialShow").css("opacity", "0");
      setTimeout(() => {
      }, 2000);
    }
  }


  $.ajax({
    type: "POST",
    url: mainHost + "/" + ADDRESS,
    headers: {
      "x-access-token": localStorage.token,
    },
    data: {
      affiliate_id: AFFILIATE_ID,
      lastID: LAST_ID,
      totalItems: TOTAL_ITENS,

      product_code: PRODUCT_CODE,
      product_affiliate_id: PRODUCT_AFFILIATE_ID,
      product_site_name: PRODUCT_NAME,
    },
    success: function (products) {
      localStorage.LAST_ID = Number(products[products.length - 1]?.id);
      var lastRequest = {
        ADDRESS: ADDRESS,
        LAST_ID: LAST_ID,
        TOTAL_ITENS: TOTAL_ITENS,
        PRODUCT_CODE: PRODUCT_CODE,
        PRODUCT_AFFILIATE_ID: PRODUCT_AFFILIATE_ID,
        PRODUCT_NAME: PRODUCT_NAME,
      };
      localStorage.LAST_REQUEST = JSON.stringify(lastRequest);
      if (PRODUCTS.length == 0) {
        $(".listaDeProdutos").html("");
      }
      if (products.length == 0) {
        var myText =
          'para "<b style="color:#f6b504">' + PRODUCT_NAME + '</b>" na';
        if (PRODUCT_NAME == 0) {
          myText = " na";
        }
        var semRetorno =
          '<div style="max-width: 60%; margin-top: 50px" class="container">' +
          '<p class="textoSemResultado">Nenhum resultado ' +
          myText +
          " unidade  " +
          $("#filialShow").text().replace("/", "") +
          "</p>" +
          "<br><br>" +
          '<p class="oqueFazer">O que posso fazer?</p>' +
          '<p class="listaFazer"><div class="arrowCheck">' +
          arrowCheck1 +
          "</div> Verifique os termos digitados</p>" +
          '<p class="listaFazer"><div class="arrowCheck">' +
          arrowCheck1 +
          "</div> Tente usar uma única palavra</p>" +
          "</div>";

        $(".listaDeProdutos").html(semRetorno);
      }
      $(".plusProducts").show();

      if (products.length == TOTAL_ITENS) {
        $(".plusProducts").show();
      } else {
        $(".plusProducts").hide();
      }
      localStorage.PRODUCTS_SEARCH = JSON.stringify(products);

      var PRODUCTS_SHOW = [];
      var breakPoint = 1000,
        count = 0;
      for (const k in products) {
        const prd8 = products[k]
        PRODUCTS.push(products[k]);
        console.log({ prd8 })
        var pictureToShow = products[k].product_thumbnail;
        if (
          pictureToShow == null ||
          pictureToShow == undefined ||
          pictureToShow == "null" ||
          pictureToShow == ""
        ) {
          pictureToShow = produtoURL(PRODUCTS_IMAGES).thumbnail;
        }
        if (pictureToShow == null || pictureToShow == "null") {
          pictureToShow = URL_IMAGES + "/produto-sem-imagem.jpg";
        }
        var ativo = "";
        if (
          getProductCaract(products[k].product_code).product_status == "active"
        ) {
          ativo = 'checked="true"';
        }
        var myValor = products[k].product_valor;
        if (myValor == "" || myValor == null) {
          myValor = 0;
        }

        var myEtiquetas = products[k].product_categoria;

        if (myEtiquetas == "" || myEtiquetas == null || myEtiquetas == "null") {
          myEtiquetas = "Novo,";
        }

        var especialClass = "";
        if (myEtiquetas.split(",")[0] == "Novo") {
          especialClass = "newProduct";
        }

        var html =
          '<div onclick="showModalProductF($(this))" product_thumbnail="' +
          products[k].product_thumbnail +
          '" product_code="' +
          products[k].product_code +
          '" product_ean="' +
          products[k].product_ean +
          '"  affiliate_id="' +
          products[k].product_affiliate_id +
          '" class="row radius20 product ' +
          especialClass +
          '" id="element' +
          k +
          "_" +
          products[k].product_ean +
          '">' +
          '<div style="max-width: 70px;" class="col-sm">' +
          '<label class="checkSmart"><input class="checka form-control" type="checkbox" /><span class="checkmark"></span></label>' +
          "</div>" +
          '<div  class="col-sm imgContainer">' +
          '<div style="background: url(' +
          pictureToShow +
          '), url(' + URL_IMAGES + '/produto-sem-imagem.jpg)" class="image img">' +
          //'<img id="'+products[k].product_ean+'" class="firstImage notCrash" style="min-width: 50px; min-height: 50px;" src="'+pictureToShow+'" />' +
          "</div>" +
          "</div>" +
          '<div style="max-width: 90px; min-width: 90px;     padding-top: 22px; text-align: center" class="col-sm">' +
          '<span class="codigoItem">' +
          Number(products[k].product_code) +
          "</span>" +
          "</div>" +
          '<div class="col-sm col-text" style="min-width: 200px !important; max-width: 200px !important;">' +
          '<label class="label" style="line-height: 1.5 !important;">' +
          products[k].product_site_name +
          "</label>" +
          "</div>" +
          '<div  style="min-width: 150px !important; max-width: 150px !important; padding: 10px"  class="col-sm">' +
          '<label style="font-size:10px !important; padding: 10px"  class="infoLabel infoValor">' +
          getAffiliateName(AFFILIATES, products[k].product_affiliate_id) +
          "</label>" +
          "</div>" +
          '<div class="col-sm">' +
          '<label class="infoLabel label2">R$ ' +
          myValor.toLocaleString() +
          "</label>" +
          "</div>" +
          '<div class="col-sm">' +
          '<label class="infoLabel label2">' +
          products[k].product_site_estoque +
          " " +
          products[k].product_average_weight_type +
          "</label>" +
          "</div>" +
          '<div class="col-sm">' +
          '<label class="infoLabel label2">' +
          products[k].product_site_fabricacao +
          "</label>" +
          "</div>" +
          '<div style=" text-align: center" class="col-sm col-text">' +
          '<label style="    margin: auto !important; text-align: center" class="infoLabel label2">' +
          myEtiquetas.split(",")[0] +
          "</label>" +
          "</div>" +
          '<div class="col-sm">' +
          '<div class="switch__container  checkaLiga">' +
          '<input  onchange="acaoCheckbox($(this))" acao="ativarProduto" ' +
          ativo +
          ' product_code="' +
          products[k].product_code +
          '" id="switch-shadow' +
          (k + 30) +
          '" class="switch switch--shadow" type="checkbox" />' +
          '<label class="naoAbreModal" for="switch-shadow' +
          (k + 30) +
          '"></label>' +
          "</div>" +
          "</div>" +
          "</div>";
        if (count <= breakPoint) {
          $(".listaDeProdutos").append(html);
          PRODUCTS_SHOW.push(products[k]);
        } else {
          break;
        }
        count++;
        getProductData(
          products[k].product_ean,
          "#element" + k + "_" + products[k].product_ean,
          $("#element" + k + "_" + products[k].product_ean)
        );
      }

      try {
        localStorage.LAST_ID = Number(products[products.length - 1]?.id);
      } catch (e) {
      }

      $(".row").children().css("opacity", "1");
      $(".row").removeClass(" bg-gray-400");

      $(".checka").change(function (e) {
        e.stopPropagation();
        e.preventDefault();
        if ($(this)[0].checked) {
          $(this).parent().parent().parent().addClass("selecionado");
        } else {
          $(this).parent().parent().parent().removeClass("selecionado");
        }
      });

      $("#carregaMaisProdutos").html("Ver mais...");

      if ($("#searchProducts").val() == "") {
        ajustaFeedback(false, "");
      } else {
        ajustaFeedback(false, $("#searchProducts").val());
      }
    },
    error: function (data2) {
      $("#carregaMaisProdutos").html("Erro :(");
      $("#carregaMaisProdutos").css("border", "2px solid red");
      ////////console.log(data2);
      if (data2.responseJSON.message.indexOf("token") > -1) {
        //alert("Necessário fazer login!<br>"+data2.responseJSON.message)
        setTimeout(() => {
          localStorage.peregrino =
            location.href.split("/")[location.href.split("/").length - 1];
          location.replace("/cms-login");
        }, 2000);
      } else {
        //alert("Algo saiu errado!<br>"+data2.responseJSON.message)
      }
    },
    complete: function () { },
  });
}

async function personalRequest(
  ADDRESS,
  LAST_ID,
  TOTAL_ITENS,
  order_type,
  column_order,
  PRODUCT_AFFILIATE_ID,
  continua
) {
  var lojas2 = JSON.parse(localStorage.LOJAS_CADASTRADAS);
  for (const k in lojas2) {
    if (lojas2[k].id == Number(localStorage.AFFILIATE_ID)) {
      $("#filialShow").html(" / " + lojas2[k].affiliates_business_name);
    }
  }

  let parametros = JSON.parse(localStorage.PARAMETROS_FILTROS);

  $.ajax({
    type: "POST",
    url: mainHost + "/" + ADDRESS,
    headers: {
      "x-access-token": localStorage.token,
    },
    data: {
      product_affiliate_id: AFFILIATE_ID,
      lastID: 0,
      totalItems: TOTAL_ITENS,
      order_type: order_type,
      column_order: column_order,
      parameters: parametros,
    },
    success: function (products) {
      if (continua) {
      } else {
        $(".listaDeProdutos").html("");
      }

      if (products.length == 0) {
        for (const k in lojas2) {
          if (lojas2[k].id != Number(localStorage.AFFILIATE_ID)) {
            $(".listaFiliaisC").append(
              "<button onclick='setLocal(" +
              lojas2[k].id +
              ")' class='btn btn-primary'>Ver <b>'" +
              lojas2[k].affiliates_business_name +
              "'</b></button>"
            );
          }
          if (lojas2[k].id == Number(localStorage.AFFILIATE_ID)) {
            $("#nomeFilial").html(lojas2[k].affiliates_business_name);
          }
        }
      }
      $(".plusProducts").show();

      if (products.length == TOTAL_ITENS) {
        $(".plusProducts").show();
      } else {
        $(".plusProducts").hide();
      }
      //////////console.log(products)
      localStorage.PRODUCTS_SEARCH = JSON.stringify(products);
      if (PRODUCTS.length == 0) {
        $(".listaDeProdutos").html("");
      }

      var PRODUCTS_SHOW = [];
      var breakPoint = 1000,
        count = 0;
      for (const k in products) {
        PRODUCTS.push(products[k]);
        const prd7 = products[k]
        console.log({ prd7 })
        var pictureToShow = products[k].product_thumbnail;
        if (
          pictureToShow == null ||
          pictureToShow == undefined ||
          pictureToShow == "null" ||
          pictureToShow == ""
        ) {
          pictureToShow = produtoURL(PRODUCTS_IMAGES).thumbnail;
        }
        if (pictureToShow == null || pictureToShow == "null") {
          pictureToShow = URL_IMAGES + "/produto-sem-imagem.jpg";
        }
        var ativo = "";
        if (
          getProductCaract(products[k].product_code).product_status == "active"
        ) {
          ativo = 'checked="true"';
        }
        var myValor = products[k].product_valor;
        if (myValor == "" || myValor == null) {
          myValor = 0;
        }

        var myEtiquetas = products[k].product_categoria;

        if (myEtiquetas == "" || myEtiquetas == null || myEtiquetas == "null") {
          myEtiquetas = "Novo,";
        }

        var especialClass = "";
        if (myEtiquetas.split(",")[0] == "Novo") {
          especialClass = "newProduct";
        }
        var html =
          '<div onclick="showModalProductF($(this))" product_code="' +
          products[k].product_code +
          '" product_ean="' +
          products[k].product_ean +
          '"  affiliate_id="' +
          products[k].product_affiliate_id +
          '" class="row radius20 product ' +
          especialClass +
          '" id="element' +
          k +
          "_" +
          products[k].product_ean +
          '">' +
          '<div style="max-width: 70px;" class="col-sm">' +
          '<label class="checkSmart"><input class="checka form-control" type="checkbox" /><span class="checkmark"></span></label>' +
          "</div>" +
          '<div  class="col-sm imgContainer">' +
          '<div style="background: url(' +
          pictureToShow +
          '), url(' + URL_IMAGES + '/produto-sem-imagem.jpg)" class="image img">' +
          //'<img id="'+products[k].product_ean+'" class="firstImage notCrash" style="min-width: 50px; min-height: 50px;" src="'+pictureToShow+'" />' +
          "</div>" +
          "</div>" +
          '<div style="max-width: 90px; min-width: 90px;     padding-top: 22px; text-align: center" class="col-sm">' +
          '<span class="codigoItem">' +
          Number(products[k].product_code) +
          "</span>" +
          "</div>" +
          '<div class="col-sm col-text" style="min-width: 200px !important; max-width: 200px !important;">' +
          '<label class="label" style="line-height: 1.5 !important;">' +
          products[k].product_site_name +
          "</label>" +
          "</div>" +
          '<div  style="min-width: 150px !important; max-width: 150px !important; padding: 10px"  class="col-sm">' +
          '<label style="font-size:10px !important; padding: 10px"  class="infoLabel infoValor">' +
          getAffiliateName(AFFILIATES, products[k].product_affiliate_id) +
          "</label>" +
          "</div>" +
          '<div class="col-sm">' +
          '<label class="infoLabel label2">R$ ' +
          myValor.toLocaleString() +
          "</label>" +
          "</div>" +
          '<div class="col-sm">' +
          '<label class="infoLabel label2">' +
          products[k].product_site_estoque +
          " " +
          products[k].product_average_weight_type +
          "</label>" +
          "</div>" +
          '<div class="col-sm">' +
          '<label class="infoLabel label2">' +
          products[k].product_site_fabricacao +
          "</label>" +
          "</div>" +
          '<div style=" text-align: center" class="col-sm col-text">' +
          '<label style="    margin: auto !important; text-align: center" class="infoLabel label2">' +
          myEtiquetas.split(",")[0] +
          "</label>" +
          "</div>" +
          '<div class="col-sm">' +
          '<div class="switch__container  checkaLiga">' +
          '<input acao="ativarProduto" ' +
          ativo +
          ' product_code="' +
          products[k].product_code +
          '" id="switch-shadow' +
          (k + 30) +
          '" class="switch switch--shadow" type="checkbox" />' +
          '<label class="naoAbreModal" for="switch-shadow' +
          (k + 30) +
          '"></label>' +
          "</div>" +
          "</div>" +
          "</div>";
        if (count <= breakPoint) {
          $(".listaDeProdutos").append(html);
          PRODUCTS_SHOW.push(products[k]);
        } else {
          break;
        }
        count++;
        getProductData(
          products[k].product_ean,
          "#element" + k + "_" + products[k].product_ean,
          $("#element" + k + "_" + products[k].product_ean)
        );
      }

      localStorage.LAST_ID = Number(products[products.length - 1]?.id);

      $(".product").click(function (e) {
        var senderElement = e.target;
        if (senderElement.className == "switch switch--shadow") {
          if (senderElement.className == "switch switch--shadow")
            acaoCheckbox($("#" + senderElement.id));
        } else {
          if (
            senderElement.className != "checkmark" &&
            senderElement.className != "naoAbreModal" &&
            senderElement.className != "checka form-control" &&
            senderElement.className != "switch switch--shadow"
          ) {
            var affiliate_id = $(this).attr("affiliate_id");
            var product_code = $(this).attr("product_code");
            var product_ean = $(this).attr("product_ean");
          }
        }
      });

      $(".row").children().css("opacity", "1");
      $(".row").removeClass(" bg-gray-400");

      $(".checka").change(function (e) {
        e.stopPropagation();
        e.preventDefault();
        ////////////console.log($(this)[0].checked);
        if ($(this)[0].checked) {
          $(this).parent().parent().parent().addClass("selecionado");
        } else {
          $(this).parent().parent().parent().removeClass("selecionado");
        }
      });

      $("#carregaMaisProdutos").html("Ver mais...");
    },
    error: function (data2) {
      $("#carregaMaisProdutos").html("Erro :(");
      $("#carregaMaisProdutos").css("border", "2px solid red");
      if (data2.responseJSON.message.indexOf("token") > -1) {
        //alert("Necessário fazer login!<br>"+data2.responseJSON.message)
        setTimeout(() => {
          localStorage.peregrino =
            location.href.split("/")[location.href.split("/").length - 1];
          location.replace("/cms-login");
        }, 2000);
      } else {
        //alert("Algo saiu errado!<br>"+data2.responseJSON.message)
      }
    },
    complete: function () { },
  });
}

async function carregaMais(ADDRESS, lastID, elemento) {
  //products
  var parametros = [];
  try {
    parametros = JSON.parse(localStorage.PARAMETROS_FILTROS);
  } catch (e) { }
  if (parametros.length > 0) {
    let isOk = false;
    for (const k in parametros) {
      if (parametros[k].active == true) {
        isOk = true;
      }
    }
    if (isOk) {
      buscaPeloFiltro(parametros, 10000, true, 10000, lastID, false);
    } else {
      request(ADDRESS, lastID, 25, 0, 0, 0);
    }
  }
}

function modalProduct(PRODUCTS, product_code, affiliate_id, URLS) {
  var product_code,
    affiliate_id,
    product_data = [];

  try {
    product_code = Number(product_code);
    affiliate_id = Number(affiliate_id);
    product_data = getProductInfo(PRODUCTS, product_code, affiliate_id);

    if (
      product_data[0].product_code == undefined ||
      product_data[0].product_code == "undefined"
    ) {
      product_data = [
        {
          id: null,
          product_affiliate_id: AFFILIATE_ID,
          product_categoria: "",
          product_code: 0,
          product_descricao: "",
          product_ean: 0,
          product_estoque: 0,
          product_etiquetas: "",
          product_fabricacao: "",
          product_medida: "",
          product_thumbnail: null,
          product_valor: 0.0,
        },
      ];
    }
  } catch (err) {
    ////////////console.log(err)
    product_data = [
      {
        id: null,
        product_affiliate_id: AFFILIATE_ID,
        product_categoria: null,
        product_code: null,
        product_descricao: "null",
        product_ean: null,
        product_estoque: 0,
        product_etiquetas: "",
        product_fabricacao: "",
        product_medida: "",
        product_thumbnail: null,
        product_valor: 0.0,
      },
    ];
  }
  ////////////console.log("ta aaii")
  ////console.log("ta aaii",product_data[0]);

  var DESCONTOS_FULL = {
    produtos: [],
    subtracaoProduto: {
      valorDescontado: 0,
      active: false,
      precoFinal: product_data[0].product_valor,
    },
    porcentagemProduto: {
      percentualDescontado: 0,
      active: false,
      precoFinal: product_data[0].product_valor,
    },
    subtracao: {
      valorDescontado: 0,
      active: false,
      precoFinal: product_data[0].product_valor,
    },
    porcentagem: {
      percentualDescontado: 0,
      active: false,
      precoFinal: product_data[0].product_valor,
    },
    levePague: {
      valorDescontado: "leve 0 pague 0",
      active: false,
      precoFinal: product_data[0].product_valor,
    },
  };

  try {
    DESCONTOS_FULL = JSON.parse(product_data[0].product_site_discount_value);
    if (DESCONTOS_FULL["subtracaoProduto"].active == undefined) {
      DESCONTOS_FULL["subtracaoProduto"].active = false;
    }
    if (DESCONTOS_FULL["porcentagemProduto"].active == undefined) {
      DESCONTOS_FULL["porcentagemProduto"].active = false;
    }
    if (DESCONTOS_FULL["subtracao"].active == undefined) {
      DESCONTOS_FULL["subtracao"].active = false;
    }
    if (DESCONTOS_FULL["porcentagem"].active == undefined) {
      DESCONTOS_FULL["porcentagem"].active = false;
    }
  } catch (e) {
    // //console.log('não foi o parse',e)
  }

  try {
    if (!DESCONTOS_FULL["levePague"]["valorDescontado"]) {
      DESCONTOS_FULL["levePague"] = {
        valorDescontado: "leve 0 pague 0",
        precoFinal: product_data[0].product_valor,
      };
    }
  } catch (e) {
    DESCONTOS_FULL = {
      produtos: [],
      subtracaoProduto: {
        valorDescontado: 0,
        active: false,
        precoFinal: product_data[0].product_valor,
      },
      porcentagemProduto: {
        percentualDescontado: 0,
        active: false,
        precoFinal: product_data[0].product_valor,
      },
      subtracao: {
        valorDescontado: 0,
        active: false,
        precoFinal: product_data[0].product_valor,
      },
      porcentagem: {
        percentualDescontado: 0,
        active: false,
        precoFinal: product_data[0].product_valor,
      },
      levePague: {
        valorDescontado: "leve 0 pague 0",
        active: false,
        precoFinal: product_data[0].product_valor,
      },
    };
    localStorage.listaDescontos = JSON.stringify(DESCONTOS_FULL);
  }


  var compraPorPeso = "",
    mostrarPeso = "",
    relacionadosAtivado = "",
    produtoAtivo = "",
    moreInfo = "",
    nutricional = "",
    precoTotalCK = "",
    pagueLeveCK = "",
    byCarCK = "",
    smart = "",
    maisVendidos = "",
    ofertas = "",
    personal = "",
    feedbackPeso = "inline-flex";

  if (product_data[0].product_site_related_title != "") {
    relacionadosAtivado = 'checked="true"';
  }
  if (product_data[0].product_status == "active") {
    produtoAtivo = 'checked="true"';
  }
  if (product_data[0].product_site_info != "") {
    moreInfo = 'checked="true"';
  }

  if (
    product_data[0].product_site_discount_type == null ||
    product_data[0].product_site_discount_type == "null"
  ) {
  } else {
    if (
      product_data[0].product_site_discount_type.indexOf(
        "Promoção preço total"
      ) > -1
    ) {
      precoTotalCK = 'checked="true"';
    }
    if (
      product_data[0].product_site_discount_type.indexOf(
        "Promoção compre X pague Y"
      ) > -1
    ) {
      pagueLeveCK = 'checked="true"';
    }
    if (
      product_data[0].product_site_discount_type.indexOf(
        "Por produto no carrinho"
      ) > -1
    ) {
      byCarCK = 'checked="true"';
    }
  }

  if (
    product_data[0].product_site_related_type == null ||
    product_data[0].product_site_related_type == "null"
  ) {
  } else {
    if (product_data[0].product_site_related_type.indexOf("Smart") > -1) {
      smart = 'checked="true"';
    }
    if (
      product_data[0].product_site_related_type.indexOf("mais vendidos") > -1
    ) {
      maisVendidos = 'checked="true"';
    }
    if (product_data[0].product_site_related_type.indexOf("Ofertas") > -1) {
      ofertas = 'checked="true"';
    }
    if (
      product_data[0].product_site_related_type.indexOf("Personalizado") > -1
    ) {
      personal = 'checked="true"';
    }
  }
  localStorage.relacionados = product_data[0].product_site_related_code;
  localStorage.tabelaNutricional = product_data[0].product_site_nutrition;
  localStorage.listaDescontos = JSON.stringify(DESCONTOS_FULL);

  localStorage.tags = product_data[0].product_site_tags;
  localStorage.categorias = product_data[0].product_site_categories;
  // localStorage.listaDescontos = JSON.stringify(DESCONTOS_FULL)
  localStorage.textoDescontos = product_data[0].product_site_discount_type;

  vendaPorPesoAutoriza = "";
  // if (product_data[0].product_site_discount_value == undefined || product_data[0].product_site_discount_value == "") {

  // } else {
  //     listandoDescontos = JSON.parse(product_data[0].product_site_discount_value)
  // }
  // //console.log('DESCONTOS_FULL',DESCONTOS_FULL)

  var informacaoNutritiva = [
    { quantidade: 0, titulo: "" },
    { quantidade: 0, titulo: "" },
  ];

  if (
    product_data[0].product_site_nutrition == null ||
    product_data[0].product_site_nutrition == undefined ||
    product_data[0].product_site_nutrition == ""
  ) {
  } else {
    ////////////console.log("informacaoNutritiva")
    informacaoNutritiva = JSON.parse(product_data[0].product_site_nutrition);
  }

  if (informacaoNutritiva == null) {
    informacaoNutritiva = [
      { quantidade: 0, titulo: "" },
      { quantidade: 0, titulo: "" },
    ];
  }
  if (
    product_data[0].product_site_nutrition != null &&
    product_data[0].product_site_nutrition != ""
  ) {
    nutricional = 'checked="true"';
  }
  if (
    product_data[0].product_average_weight_value != null &&
    product_data[0].product_average_weight_type != "" &&
    product_data[0].product_average_weight_value != "" &&
    product_data[0].product_average_weight_type != null
  ) {
    vendaPorPesoAutoriza =
      '<span class="metricas">1 unidade - aproximadamente ' +
      product_data[0].product_average_weight_value +
      " " +
      product_data[0].product_average_weight_type +
      "</span><br>";
  }

  if (
    product_data[0].product_sell_by_weight != "" &&
    product_data[0].product_sell_by_weight != "active" &&
    product_data[0].product_sell_by_weight != "null" &&
    product_data[0].product_sell_by_weight != "undefined" &&
    product_data[0].product_sell_by_weight != null &&
    product_data[0].product_sell_by_weight != undefined
  ) {
    var pesoMostra = JSON.parse(product_data[0].product_sell_by_weight);
    if (pesoMostra.mostrarPeso == true) {
      mostrarPeso = 'checked="true"';
    } else {
      feedbackPeso = "none";
    }
    if (pesoMostra.compraPorPeso == true) {
      compraPorPeso = 'checked="true"';
    }

    localStorage.INFO_PESO = product_data[0].product_sell_by_weight;
  } else {
    feedbackPeso = "none";
  }


  try {
    var informacaoNutricional = JSON.parse(product_data[0].product_site_info);
  } catch (err) {
  }

  function confere(valor, tipo) {
    if (
      valor == null ||
      valor == undefined ||
      valor == "null" ||
      valor == "undefined" ||
      valor == ""
    ) {
      if (tipo == "number") {
        return 0;
      } else {
        return "";
      }
    } else {
      return valor;
    }
  }

  localStorage.listaDescontos = JSON.stringify(DESCONTOS_FULL);

  var myValue2 = product_data[0].product_valor;
  if (myValue2 == "null" || myValue2 == null) {
    myValue2 = 0;
  }

  var htmlModal =
    '<div style="max-width:100% " class="container">' +
    '<div class="row" style="    box-shadow: 0px 3px 5px #edf2f6; max-width: 90%;     margin: -11px auto;  ">' +
    '<div content="caracteristicas" class="col-md tabModal tabModalActive">' +
    '<label class="labelTab"  style="text-align:center">Características</label>' +
    "</div>" +
    '<div content="promocoes" class="col-md tabModal">' +
    '<label class="labelTab"  style="text-align:center">Promoções</label>' +
    "</div>" +
    '<div content="relacionados" class="col-md tabModal">' +
    '<label class="labelTab"  style="text-align:center">Relacionados</label>' +
    "</div>" +
    '<div content="visualizar" class="col-md tabModal">' +
    '<label class="labelTab" style="text-align:center">Visualizar</label>' +
    "</div>" +
    '<div class="col-md">' +
    '<div style="cursor:pointer;border-radius: 20px; font: normal normal bold 1rem Roboto; background-color: #ffffff; max-width: 200px; height: 40px; border: 2px solid #f6b504; float: right; margin:5% auto" class="input-group superCancel">' +
    '<label  style="cursor:pointer;margin:-7%  auto;text-align: center;    min-width: 60%;color: #f6b504 !important; font-size: 1.2rem" class="label ">Cancelar</label>' +
    "</div>" +
    "</div>" +
    '<div class="col-md ">' +
    '<div style="cursor:pointer;border-radius: 20px; font: normal normal bold 1rem Roboto; background-color: #f6b504; max-width: 200px; height: 40px; border: 2px solid #f6b504; float: left; margin:5% auto" class="input-group superSave">' +
    '<label  style="cursor:pointer;margin: -7% auto;text-align: center;    min-width: 60%; color: white !important; font-size: 1.2rem" class="label ">Salvar</label>' +
    "</div>" +
    "</div>" +
    "</div>" +
    '<hr class="baixoCabecalho" style="position: fixed;top: 115px !important;left: 0px !important;width: 100%;box-shadow: 2px 2px 2px silver;"></hr>' +
    //======================================================ABA DE CARACTERÍSTICAS==================================================================================================================
    '<div id="caracteristicas" style="max-width:90% ; margin-top: 2%"  class="container tabContent">' +
    '<div class="row">' +
    '<div style="max-height: 82vh; " class="col-md-4">' +
    '<div class="preview col-md-12">' +
    '<div class="preview-pic tab-content">' +
    imageShows(
      product_data[0].product_affiliate_id,
      product_data[0].product_code,
      URLS[0]
    ) +
    "</div>" +
    '<ul class="preview-thumbnail nav nav-tabs imagensProduto">' +
    //drop here the thumb images
    imageButtons(
      product_data[0].product_affiliate_id,
      product_data[0].product_code,
      URLS
    ) +
    `<li class="thumbProduct thumbProductUpload"><input id="pegaFoto" style="display:none" type="file"><a data-target="#pic-2" data-toggle="tab"><img class="imageThumb "  src="images/products/upload.svg"   onError="this.onerror=null;this.src='' + URL_IMAGES + '/produto-sem-imagem.jpg';"></a></li>` +
    "</ul>" +
    "</div>" +
    "</div>" +
    '<div style="max-height: 82vh; border-left: 1px solid #dee2e6;" class="col-md-8  verticalScroll">' +
    '<div style="padding:0 2%; margin-top: 2%" class="row">' +
    '<span style="font-size: 2rem;font-weight: bold;" class="idProduto">' +
    ("00000" + product_code).slice(-5) +
    "</span> " +
    '<div style="margin: 1% 2%;" class="switch__container ajuste ativaProduto2">' +
    "<input " +
    produtoAtivo +
    ' acao="ativarProduto"  onchange="acaoCheckbox($(this))" product_code="' +
    product_code +
    '" id="switch-shadow6" class="switch switch--shadow" type="checkbox" />' +
    '<label for="switch-shadow6"></label>' +
    "</div>" +
    '<label style=" font-size: 20px;" class="label">Produto ativado</label> ' +
    "</div>" +
    '<div style="padding:0 2%; margin-top: 2%" class="row">' +
    '<label style=" font-size: 20px;" class="label">Nome do produto</label><br> ' +
    "</div>" +
    '<div style="padding:0 2%; margin-top: -2%" class="row">' +
    '<div class="group-input2"><input  acao="product_site_name" product_code="' +
    product_data[0].product_code +
    '" onChange="updateField($(this))" value="' +
    product_data[0].product_site_name +
    '" class="form-control inputProduct" placeholder="Nome do produto" id="nomeProduto"></div><br> ' +
    "</div>" +
    '<hr style="opacity:0">' +
    '<div style=" padding:0 1%;   margin-top: -2%; " class="row">' +
    '<div class="col-md-8"><label style=" font-size: 20px;" class="label">Valor</label></div> ' +
    '<div class="col-md-4"><label style=" font-size: 20px;" class="label">Quantidade/Medida</label></div> ' +
    "</div>" +
    '<div style="padding:0 1%;     margin-top: -2%;" class="row">' +
    '<div class="col-md-8"> <div class="group-input2" style="display: inline-flex;"><div class="iconLogistica"  style=" height: 45px;width: 50px; margin: auto 2%!important;    background: #F9FAFB 0% 0% no-repeat padding-box !important;">' +
    money +
    '</div><input acao="product_valor" product_code="' +
    product_data[0].product_code +
    '" onChange="updateField($(this))" class="form-control inputProduct" placeholder="R$ 0.00" value="' +
    product_data[0].product_valor +
    '" id="valorProduto"></div></div> ' +
    '<div class="col-md-4">' +
    '<div class="group-input2" style="display: inline-flex;"><input     product_code="' +
    product_data[0].product_code +
    '"  acao="product_site_estoque"  onChange="updateField($(this))"  value="' +
    product_data[0].product_valor +
    '" class="form-control inputProduct" placeholder="0.00" id="qtdProduto"><input style="border-left: 1px solid #f6b504" acao="product_average_weight_type" product_code="' +
    product_data[0].product_code +
    '" onChange="updateField($(this))" class="form-control inputProduct" placeholder="Un,Kg" value="' +
    product_data[0].product_average_weight_type +
    '" id="medidaProduto"></div></div> ' +
    "</div>" +
    '<hr style="opacity:1">' +
    '<div style=" padding:0 1%;   margin-top: -2%; " class="row">' +
    '<div class="col-md-8"><label style=" font-size: 20px;" class="label">Valor Atacado</label></div> ' +
    '<div class="col-md-4"><label style=" font-size: 20px;" class="label">Quantidade Mínima</label></div> ' +
    "</div>" +
    '<div style="padding:0 1%;     margin-top: -2%;" class="row">' +
    '<div class="col-md-8"> <div class="group-input2" style="display: inline-flex;"><div class="iconLogistica"  style=" height: 45px;width: 50px; margin: auto 2%!important;    background: #F9FAFB 0% 0% no-repeat padding-box !important;">' +
    money +
    '</div><input acao="product_valor" product_code="' +
    product_data[0].product_code +
    '" class="form-control inputProduct" placeholder="R$ 0.00" readonly value="' +
    product_data[0].product_valor_atacado +
    '" id="valorProduto"></div></div> ' +
    '<div class="col-md-4">' +
    '<div class="group-input2" style="display: inline-flex;"><input     product_code="' +
    product_data[0].product_code +
    '"  acao="product_quantidade_atacado"  readonly  value="' +
    product_data[0].product_quantidade_atacado +
    '" class="form-control inputProduct" placeholder="0.00" id="qtdProduto"> </div></div> ' +
    "</div>" +
    '<div style="padding:0 2%" class="row">' +
    '<label style=" font-size: 20px;" class="label">EAN</label><br> ' +
    "</div>" +
    '<div style="padding:0 2%; margin-top: -2%;" class="row">' +
    '<div class="group-input2"><input value="' +
    product_data[0].product_site_ean +
    '" product_code="' +
    product_data[0].product_code +
    '"  acao="product_site_ean"  onChange="updateField($(this))" class="form-control inputProduct" placeholder="789456132012" id="eanProduto"></div><br> ' +
    "</div>" +
    '<hr style="opacity:0">' +
    '<div style="padding:0 2%" class="row">' +
    '<label style=" font-size: 20px;" class="label">Fabricação</label><br> ' +
    "</div>" +
    '<div style="padding:0 2%; margin-top: -2%;" class="row">' +
    '<div class="group-input2"><input  product_code="' +
    product_data[0].product_code +
    '"  acao="product_site_fabricacao"  onChange="updateField($(this))" value="' +
    product_data[0].product_site_fabricacao +
    '" class="form-control inputProduct" placeholder="Marca" id="marcaProduto"></div><br> ' +
    "</div>" +
    '<hr style="opacity:0">' +
    '<div style="margin-top: 3% !important; ' +
    (compraPorPeso ? "border: 2px solid #f6b504" : "") +
    '" class="col-md-12 grupo">' +
    '<div style="padding:0 2%; margin-top: 2%" class="row">' +
    '<div style="margin: 1% 2%;" class="switch__container  ajuste">' +
    "<input " +
    mostrarPeso +
    ' id="switch-shadow4" objetivo="mostrarPeso" onchange="alteraPeso($(this))" class="switch switch--shadow" type="checkbox" />' +
    '<label for="switch-shadow4"></label>' +
    "</div>" +
    '<label style=" font-size: 20px;" class="label">Peso aproximado por unidade</label> ' +
    "</div>" +
    '<div style="padding:0 2%" class="row">' +
    '<div class="col-md-6 balanca">' +
    '<div style=" " class="row">' +
    '<div class="col-md-6"> <div class="group-input2" style="display: inline-flex; background: none; min-height:none"><div class="iconLogistica"  style=" height: 45px;width: 50px; margin: 5% auto 5%!important;    background: #F9FAFB 0% 0% no-repeat padding-box !important;">' +
    '<svg xmlns="http://www.w3.org/2000/svg" style="fill: black;margin: 10px 10px;width: 25px;height: 25px;" width="14.757" height="12.734" viewBox="0 0 14.757 12.734"><defs></defs><path class="a" d="M16.408,12.7H14.4V11.692h1.34a.335.335,0,1,0,0-.67H14.7a4.356,4.356,0,0,0,2.044-3.686A.335.335,0,0,0,16.408,7H2.333A.335.335,0,0,0,2,7.335a4.356,4.356,0,0,0,2.044,3.686H3a.335.335,0,1,0,0,.67h1.34V12.7H2.333a.338.338,0,0,0-.325.422l1.34,5.027a.335.335,0,0,0,.325.248h.335V19.4a.335.335,0,0,0,.335.335H7.025A.335.335,0,0,0,7.36,19.4V18.394h4.021V19.4a.335.335,0,0,0,.335.335H14.4a.335.335,0,0,0,.335-.335V18.394h.335a.335.335,0,0,0,.335-.248l1.34-5.027a.338.338,0,0,0-.335-.422ZM2.668,7.67h13.4a3.686,3.686,0,0,1-3.686,3.351H6.355A3.686,3.686,0,0,1,2.668,7.67Zm11.059,4.021V12.7H5.014V11.692ZM6.69,19.064H4.679v-.67H6.69Zm7.372,0H12.051v-.67h2.011Zm.747-1.34H3.932L2.769,13.367h13.2Z" transform="translate(-1.997 -7)"/><path class="a" d="M10.335,31.346h4.356a.335.335,0,0,0,.335-.335V29.335A.335.335,0,0,0,14.692,29H10.335a.335.335,0,0,0-.335.335v1.676A.335.335,0,0,0,10.335,31.346Zm.335-1.676h3.686v1.005H10.67Z" transform="translate(-7.318 -21.628)"/><path class="a" d="M32.173,31.346A1.173,1.173,0,1,0,31,30.173a1.173,1.173,0,0,0,1.173,1.173Zm0-1.676a.5.5,0,1,1-.5.5A.5.5,0,0,1,32.173,29.67Z" transform="translate(-21.281 -21.628)"/></svg>' +
    '</div><input acao="product_average_weight_value" product_code="' +
    product_data[0].product_code +
    '" onChange="updateField($(this))" type="number" value="' +
    product_data[0].product_average_weight_value +
    '" class="form-control inputProduct" style="background: none; border: none" placeholder="0.00" id="nomeProduto"></div></div> ' +
    '<div class="col-md-6"><select  acao="product_average_weight_type" product_code="' +
    product_data[0].product_code +
    '" onChange="updateField($(this))" value="' +
    product_data[0].product_average_weight_type +
    '" style="border: none; margin:10% auto;text-align: right;float: right;font-size: 1rem" class="form-control"><option>' +
    product_data[0].product_average_weight_type +
    "</option><option>gramas</option><option>litros</option><option>centimetros</option></select></div> " +
    "</div>" +
    "</div>" +
    '<div style="display: ' +
    feedbackPeso +
    '; " class="col-md-6 areaMostraPeso">' +
    '<div style="margin: 3% 2%;" class="switch__container  ajuste">' +
    "<input " +
    compraPorPeso +
    '  objetivo="compraPorPeso" onchange="alteraPeso($(this))" id="switch-shadow5" class="switch switch--shadow" type="checkbox" />' +
    '<label for="switch-shadow5"></label>' +
    "</div>" +
    '<label style=" font-size: 20px;" class="label">Permitir compra por peso</label> ' +
    "</div>" +
    `${compraPorPeso
      ? '<div style="padding: 15px; width: 100%" class="row precoFinalProduto">' +
      '<div class="col-md-6"> </div>' +
      '<div class="col-md-6">' +
      '<label style=" font-size: 20px;" class="label">Preço que será utilizado:</label> ' +
      '<div class="group-input2" style="display: inline-flex;"><div class="iconLogistica" style=" height: 45px;width: 50px; margin: auto 2%!important;    background: #F9FAFB 0% 0% no-repeat padding-box !important;"><svg xmlns="http://www.w3.org/2000/svg" style="margin: 10px 15px;" width="15" height="25" viewBox="0 0 10.015 15.574"><path id="_105" data-name="105" d="M9.052-6.032c0-3.651-5.346-2.695-5.346-4.375,0-.464.42-.7,1.058-.7a7.9,7.9,0,0,1,3.274,1.087l1-2.1A7.5,7.5,0,0,0,5.865-13.2v-2.115H3.939v2.13c-1.854.3-3.013,1.42-3.013,3.028,0,3.593,5.346,2.55,5.346,4.274,0,.536-.493.826-1.275.826A6.483,6.483,0,0,1,1.317-6.6L.288-4.525a7.485,7.485,0,0,0,3.651,1.55V-.744H5.865V-2.961C7.691-3.207,9.052-4.25,9.052-6.032Z" transform="translate(0.337 15.818)" fill="none" stroke="#687c96" stroke-width="1"></path></svg></div><input acao="product_site_value" product_code="' +
      product_data[0].product_code +
      '" onchange="updateField($(this))" class="form-control inputProduct" placeholder="R$ 0.00" value="' +
      product_data[0].product_site_value +
      '" id="valorProdutoFinal"></div>' +
      "</div>" +
      "</div>"
      : "<div></div>"
    }` +
    "</div>" +
    "</div>" +
    '<hr style="opacity:0">' +
    '<div style="padding:0 2%" class="row">' +
    '<label style=" font-size: 20px;" class="label">Categorias</label><br> ' +
    "</div>" +
    '<div class="col-md-12 grupoCinza">' +
    '<div class="row">' +
    '<div class="col-md-11">' +
    '<div id="listaEtiquetasTag" style="padding:0 2%" class="row ">' +
    retornaCategorias(product_data[0].product_site_categories) +
    "</div>" +
    "</div>" +
    '<div class="col-md-1">' +
    '<div  class="input-group  ico dropItems">' +
    arrowDown +
    "</div>" +
    "</div>" +
    "</div>" +
    '<div style="display:none; margin-top: 3%" class="row grupoCategorias drop">' +
    '<div class="col-md-12">' +
    '<div class="input-group">' +
    '<input id="buscaCategorias" type="text" style="min-width: 300px;font-size: 1.3rem" value="" class="form-control" placeholder="Busque por categorias" />' +
    '<div class="input-group-append">' +
    '<div class="input-group-text">' +
    '<i style="color: #f6b504; font-weight: bold;" class="fas fa-search"></i>' +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    '<div style="max-height: 30vh" class="col-md-12 verticalScroll">' +
    '<ul style="    margin-top: 5%;" class="list animate__animated ">' +
    getCategoriesAndSub(
      TODAS_CATS_NEW,
      product_data[0].product_site_categories
    ) +
    "</ul>" +
    "</div>" +
    "</div>" +
    "</div>" +
    '<hr style="opacity:0">' +
    '<div style="padding:0 2%" class="row">' +
    '<label style=" font-size: 20px;" class="label">Tags</label><br> ' +
    "</div>" +
    '<div class="col-md-12 grupoCinza">' +
    '<div class="row">' +
    '<div class="col-md-10">' +
    '<div id="variates" style="padding:0 2%" class="row ">' +
    retornaCategorias(product_data[0].product_site_tags) +
    "</div>" +
    "</div>" +
    '<div class="col-md-2">' +
    '<div  class="input-group  ico dropItems">' +
    arrowDown +
    "</div>" +
    "</div>" +
    "</div>" +
    '<div style="display:none; margin-top: 3%" class="row grupoCategorias drop">' +
    '<div style="padding-bottom: 50px ; padding-top: 20px class="col-md-12">' +
    '<div class="input-group">' +
    '<input type="text" style="min-width: 300px;font-size: 1.3rem" value="" class="form-control" placeholder="Busque por tags" />' +
    '<div class="input-group-append">' +
    '<div class="input-group-text">' +
    '<i style="color: #f6b504; font-weight: bold;" class="fas fa-search"></i>' +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    '<div  style="padding-bottom: 50px;" class="col-md-12">' +
    '<ul class="list variates listaTags2 animate__animated ">' +
    '<li class="list-item liVariacoes animate__animated ">' +
    '<label class="subSmart animate__animated animate__">Vegano<input   onchange="addTagMarcada($(this),\'variates\')" class="marcar2" type="checkbox"><span class="checkmark"></span></label>' +
    "</li>" +
    "</ul>" +
    '<div style="position: absolute;bottom: 0;left: 0;margin: auto 20px;width: 90%;background: #EFEFEF;border-radius: 5px;padding: 5px;color: #2c2c2c !important;" class="input-group"><i style="transform: rotate(134deg);font-size: 1.5rem;margin: auto 20px;" class="far fa-times-circle"></i>' +
    ' <input onKeyDown="criaNovaTag($(this), this,\'variates\')" type="text" style="border: none;font-size: 18px;" class="form-control" placeholder="Criar nova Tag">' +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    '<hr style="opacity:0">' +
    '<div style="padding:0 2%" class="row">' +
    '<label style=" font-size: 20px;" class="label">Descrição</label><br> ' +
    "</div>" +
    '<div class="col-md-12 grupoCinza">' +
    '<textarea   acao="product_site_description" product_code="' +
    product_data[0].product_code +
    '" onChange="updateField($(this))"  style="background: #EFEFEF; border:none; font-size: 1.3rem; max-height: 100%" rows="3"   class="form-control">' +
    product_data[0].product_site_description +
    "</textarea>" +
    "</div>" +
    '<hr style="opacity:0">' +
    '<div style="padding:0 2%" class="row">' +
    '<label style=" font-size: 20px;" class="label">Variações</label><br> ' +
    "</div>" +
    '<div class="col-md-12 grupoCinza">' +
    '<div class="row">' +
    '<div class="col-md-10">' +
    '<div id="listaVariacoes" style="padding:0 2%" class="row">' +
    retornaCategorias(product_data[0].product_site_variations) +
    "</div>" +
    "</div>" +
    '<div class="col-md-2">' +
    '<div  class="input-group  ico dropItems">' +
    arrowDown +
    "</div>" +
    "</div>" +
    "</div>" +
    '<div style="display:none; margin-top: 3%" class="row grupoCategorias drop">' +
    '<div class="col-md-12">' +
    '<div class="input-group">' +
    '<input type="text" style="min-width: 300px;font-size: 1.3rem" value="" class="form-control" placeholder="Busque por varições" />' +
    '<div class="input-group-append">' +
    '<div class="input-group-text">' +
    '<i style="color: #f6b504; font-weight: bold;" class="fas fa-search"></i>' +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    '<div style="padding-bottom: 50px; padding-top: 20px;" class="col-md-12">' +
    '<ul class="list listaVariacoes   animate__animated ">' +
    '<li class="list-item liVariacoes animate__animated ">' +
    '<label class="subSmart animate__animated animate__">Produção própria<input onchange="addTagMarcada($(this),\'listaVariacoes\')" class="marcar3" type="checkbox"><span class="checkmark"></span></label>' +
    "</li>" +
    '<li class="list-item liVariacoes animate__animated ">' +
    '<label class="subSmart animate__animated animate__">Terceiros<input  onchange="addTagMarcada($(this),\'listaVariacoes\')" class="marcar3" type="checkbox"><span class="checkmark"></span></label>' +
    "</li>" +
    '<li class="list-item liVariacoes animate__animated ">' +
    '<label class="subSmart animate__animated animate__">Importados<input  onchange="addTagMarcada($(this),\'listaVariacoes\')" class="marcar3" type="checkbox"><span class="checkmark"></span></label>' +
    "</li>" +
    "</ul>" +
    '<div style="position: absolute;bottom: 0;left: 0;margin: auto 20px;width: 90%;background: #EFEFEF;border-radius: 5px;padding: 5px;color: #2c2c2c !important;" class="input-group"><i style="transform: rotate(134deg);font-size: 1.5rem;margin: auto 20px;" class="far fa-times-circle"></i>' +
    ' <input onKeyDown="criaNovaTag($(this), this,\'listaVariacoes\')" type="text" style="border: none;font-size: 18px;" class="form-control" placeholder="Criar nova Tag">' +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    '<div style="margin-top: 3% !important" class="col-md-12 grupo">' +
    '<div style="padding:0 2%; margin-top: 2%" class="row">' +
    '<div style="margin: 1% 2%;" class="switch__container  ajuste">' +
    "<input " +
    moreInfo +
    ' id="switch-shadow7" class="switch switch--shadow" type="checkbox" />' +
    '<label for="switch-shadow7"></label>' +
    "</div>" +
    '<label style=" font-size: 20px;" class="label">Informação Importante:</label> ' +
    "</div>" +
    '<div style="padding:0 2%" class="row">' +
    '<textarea   acao="product_site_info" product_code="' +
    product_data[0].product_code +
    '" onChange="updateField($(this))"  style="background: #EFEFEF; border:none; font-size: 1.3rem; max-height: 100%;    padding: 2%;" rows="3" class="form-control">' +
    product_data[0].product_site_info +
    "</textarea>" +
    "</div>" +
    "</div>" +
    '<div style="margin-top: 3% !important" class="col-md-12 grupo listaTabelaNutricional">' +
    '<div style="padding:0 2%; margin-top: 2%" class="row">' +
    '<div style="margin: 1% 2%;" class="switch__container  ajuste">' +
    "<input " +
    nutricional +
    ' id="switch-shadow12" class="switch switch--shadow" type="checkbox" />' +
    '<label for="switch-shadow12"></label>' +
    "</div>" +
    '<label style=" font-size: 20px;" class="label">Tabela Nutricional</label> ' +
    "</div>" +
    listaDevolveN(informacaoNutritiva) +
    '<div style="padding:0 2%; margin: 25px auto" class="row">' +
    '<button class="btn adicionaTabelaNova" style="background:#f6b504; margin: auto 75px auto auto; color: white">Adicionar</button>' +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    //======================================================ABA DE PROMOÇÕES==================================================================================================================
    '<div id="promocoes" style="max-width:70% ; height: 82vh; margin-top: 2%; display:none"  class="container tabContent verticalScroll ">' +
    '<div style="margin-top: 3% !important" class="col-md-12 grupo ">' +
    '<div style="padding:0 2%; margin-top: 2%" class="row">' +
    '<div style="margin: 1% 2%;" class="switch__container  ajuste ativaPromocao">' +
    '<input  id="switch-shadow13" acao="tipoDesconto" ' +
    precoTotalCK +
    ' product_code="' +
    product_data[0].product_code +
    '" tipoDesconto="Promoção preço total" class="switch switch--shadow" type="checkbox" />' +
    '<label for="switch-shadow13"></label>' +
    "</div>" +
    '<label style=" font-size: 20px;" class="label">Promoção preço total</label> ' +
    "</div>" +
    '<div style="padding:0 2%" class="row">' +
    '<div style="max-width: 50px;" class="col-md-1">' +
    "</div>" +
    '<div class="col-md-3">' +
    '<label style=" font-size: 20px;" class="label">Subtração</label><br> ' +
    "</div>" +
    '<div class="col-md-4">' +
    '<label style=" font-size: 20px;" class="label">Preço após desconto</label><br> ' +
    "</div>" +
    '<div class="col-md-3">' +
    "</div>" +
    "</div>" +
    '<div style="padding:0 2%" class="row">' +
    '<div  style="max-width: 50px;" class="col-md-1">' +
    '<label class="checkSmart checkDireita animate__animated animate__"><input ' +
    (DESCONTOS_FULL.subtracao.active ? 'checked="true"' : "") +
    ' onchange="marcaPromocao($(this))" class="marcaPromocao marcaPsubtracao" tipo="subtracao" type="checkbox"><span class="checkmark"></span></label>' +
    "</div>" +
    '<div class="col-md-3">' +
    '<div class="group-input2"><div class="iconLogistica"  style=" height: 45px;width: 50px; margin: auto 2%!important;    background: #F9FAFB 0% 0% no-repeat padding-box !important;">' +
    money +
    '</div><input value="' +
    confere(DESCONTOS_FULL.subtracao.valorDescontado, "number") +
    '" style="max-width: 65%" class="form-control inputProduct darDesconto" origem="Promoção preço total"  preco="' +
    product_data[0].product_valor +
    '" tipo="subtracao" placeholder="-" id="nomeProduto"></div><br> ' +
    //'<div class="group-input2"><input class="form-control inputProduct" placeholder="-" id="nomeProduto"></div><br> '+
    "</div>" +
    '<div class="col-md-3">' +
    '<div class="group-input2"  style="background: none"><input value="' +
    confere(DESCONTOS_FULL.subtracao.precoFinal, "number") +
    '"  style="background: none" class="form-control inputProduct valorDescontadoF" placeholder="-" id="nomeProduto"></div><br> ' +
    "</div>" +
    '<div class="col-md-3">' +
    "</div>" +
    "</div>" +
    "<hr>" +
    '<div style="padding:0 2%" class="row">' +
    '<div  style="max-width: 50px;" class="col-md-1">' +
    "</div>" +
    '<div class="col-md-3">' +
    '<label style=" font-size: 20px;" class="label">Porcentagem</label><br> ' +
    "</div>" +
    '<div class="col-md-4">' +
    '<label style=" font-size: 20px;" class="label">Preço após desconto</label><br> ' +
    "</div>" +
    '<div class="col-md-3">' +
    "</div>" +
    "</div>" +
    '<div style="padding:0 2%" class="row">' +
    '<div style="max-width: 50px;" class="col-md-1">' +
    '<label class="checkSmart checkDireita animate__animated animate__"><input  ' +
    (DESCONTOS_FULL.porcentagem.active ? 'checked="true"' : "") +
    '  onchange="marcaPromocao($(this))"  class="marcaPromocao marcaPporcentagem" tipo="porcentagem" type="checkbox"><span class="checkmark"></span></label>' +
    "</div>" +
    '<div class="col-md-3">' +
    '<div class="group-input2"><div class="iconLogistica"  style=" height: 45px;width: 50px; margin: auto 2%!important;    background: #F9FAFB 0% 0% no-repeat padding-box !important;">' +
    porcentagem +
    '</div><input value="' +
    confere(DESCONTOS_FULL.porcentagem.percentualDescontado, "number") +
    '" style="max-width: 65%" class="form-control inputProduct darDesconto"  origem="Promoção preço total" tipo="porcentagem" preco="' +
    product_data[0].product_valor +
    '" placeholder="-" id="nomeProduto"></div><br> ' +
    //'<div class="group-input2"><input class="form-control inputProduct" placeholder="-" id="nomeProduto"></div><br> '+
    "</div>" +
    '<div class="col-md-3">' +
    '<div class="group-input2" style="background: none"><input value="' +
    confere(DESCONTOS_FULL.porcentagem.precoFinal, "number") +
    '"  style="background: none" class="form-control inputProduct valorDescontadoF" placeholder="-" id="nomeProduto"></div><br> ' +
    "</div>" +
    '<div class="col-md-3">' +
    "</div>" +
    "</div>" +
    "</div>" +
    '<div style="margin-top: 3% !important" class="col-md-12 grupo">' +
    '<div style="padding:0 2%; margin-top: 2%" class="row">' +
    '<div style="margin: 1% 2%;" class="switch__container  ajuste ativaPromocao">' +
    '<input id="switch-shadow14" acao="tipoDesconto" ' +
    pagueLeveCK +
    ' product_code="' +
    product_data[0].product_code +
    '" tipoDesconto="Promoção compre X pague Y" class="switch switch--shadow" type="checkbox" />' +
    '<label for="switch-shadow14"></label>' +
    "</div>" +
    '<label style=" font-size: 20px;" class="label">Promoção compre "x" pague "y"</label> ' +
    "</div>" +
    '<div style="padding:0 2%" class="row">' +
    '<div class="col-md-4">' +
    '<label style=" font-size: 20px;" class="label">Compre</label><br> ' +
    "</div>" +
    '<div class="col-md-3">' +
    '<label style=" font-size: 20px;" class="label">Pague</label><br> ' +
    "</div>" +
    '<div class="col-md-5">' +
    '<label style=" font-size: 20px;" class="label">Preço unitário após desconto</label><br> ' +
    "</div>" +
    "</div>" +
    '<div style="padding:0 2%" class="row">' +
    '<div class="col-md-4">' +
    '<div class="group-input2"><input class="form-control inputProduct darDesconto"   origem="Promoção compre X pague Y" preco="' +
    product_data[0].product_valor +
    '" tipo="levePague" value="' +
    confere(DESCONTOS_FULL.levePague.valorDescontado.split(" ")[1], "number") +
    '" placeholder="-" id="compreD"></div><br> ' +
    "</div>" +
    '<div class="col-md-3">' +
    '<div class="group-input2" ><input class="form-control inputProduct darDesconto"    origem="Promoção compre X pague Y" preco="' +
    product_data[0].product_valor +
    '"  tipo="levePague" value="' +
    confere(DESCONTOS_FULL.levePague.valorDescontado.split(" ")[3], "number") +
    '" placeholder="-" id="pagueD"></div><br> ' +
    "</div>" +
    '<div class="col-md-5">' +
    '<div class="group-input2"  style="background: none"><input  style="background: none" class="form-control inputProduct valorDescontadoD" value="' +
    confere(DESCONTOS_FULL.levePague.precoFinal, "number") +
    '" placeholder="-" id="valorDescontadoD"></div><br> ' +
    "</div>" +
    "</div>" +
    "</div>" +
    '<div style="margin-top: 3% !important" class="col-md-12 grupo">' +
    '<div style="padding:0 2%; margin-top: 2%" class="row">' +
    '<div style="margin: 1% 2%;" class="switch__container  ajuste ativaPromocao">' +
    '<input id="switch-shadow15" acao="tipoDesconto" ' +
    byCarCK +
    ' product_code="' +
    product_data[0].product_code +
    '" tipoDesconto="Por produto no carrinho" class="switch switch--shadow" type="checkbox" />' +
    '<label for="switch-shadow15"></label>' +
    "</div>" +
    '<label style=" font-size: 20px;" class="label">Desconto por outros produtos no carrinho</label> ' +
    "</div>" +
    '<div style="padding:0 2%; margin-top: 2%" class="row">' +
    '<label style=" font-size: 20px;" class="label">Produto</label> ' +
    "</div>" +
    '<div style="padding:0 2%; margin-top: 2%" class="row">' +
    '<div class="group-input2 " style="background: white; border: 1px solid #f6b504;    margin-top: -3%; padding: 1%; display: inline-flex">' +
    '<div class="col-md-10 listaTAGS_CARDS">' +
    cardSelecionadoPromo2(DESCONTOS_FULL.produtos) +
    "</div>" +
    '<div style="max-width: 50px;" class="col-md-1">' +
    '<span style="color: #f6b504;font-size: 1.3rem;float: right;margin: 5% auto; opacity: 0; display: none">1/1</span>' +
    "</div>" +
    '<div style="max-width: 50px;" class="col-md-1">' +
    '<div style="margin: autoç; border: none" class="input-group  ico dropItems">' +
    arrowDown +
    "</div>" +
    "</div>" +
    "</div><br> " +
    '<div style="display:none;width: 900px;min-height: 400px;"  class="row grupoCategorias drop procuraProduto">' +
    '<div class="col-md-12">' +
    '<div class="input-group">' +
    '<input onchange="addProdutoRelacao($(this), 20)" type="text" style="min-width: 300px;font-size: 1.3rem" value="" class="form-control " placeholder="Busque por produtos">' +
    '<div class="input-group-append">' +
    '<div class="input-group-text">' +
    '<svg style="color: #f6b504; font-weight: bold;" class="svg-inline--fa fa-search fa-w-16" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="">' +
    '<path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>' +
    "</svg>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    '<div style="text-align: center;margin:  0 auto;    max-height: 600px;" origem="descontos" id="listaDeCartoes" class="col-md-12 listaDeCartoes verticalScroll">' +
    "</div>" +
    "</div>" +
    "</div>" +
    '<div style="padding:0 2%; margin-top: 2%" class="row">' +
    '<label style=" font-size: 20px;" class="label">Tipo de desconto</label> ' +
    "</div>" +
    '<div style="padding:0 2%" class="row">' +
    '<div style="max-width: 50px;" class="col-md-1">' +
    "</div>" +
    '<div class="col-md-3">' +
    '<label style=" font-size: 20px;" class="label">Subtração</label><br> ' +
    "</div>" +
    '<div class="col-md-4">' +
    '<label style=" font-size: 20px;" class="label">Preço após desconto</label><br> ' +
    "</div>" +
    '<div class="col-md-3">' +
    "</div>" +
    "</div>" +
    '<div style="padding:0 2%" class="row">' +
    '<div style="max-width: 50px;" class="col-md-1">' +
    '<label class="checkSmart checkDireita animate__animated animate__"><input  ' +
    (DESCONTOS_FULL.subtracaoProduto.active ? 'checked="true"' : "") +
    '  onchange="marcaPromocao($(this))"   class="marcaPromocao marcaPsubtracaoProduto" tipo="subtracaoProduto" type="checkbox"><span class="checkmark"></span></label>' +
    "</div>" +
    '<div class="col-md-3">' +
    '<div class="group-input2"><div class="iconLogistica"  style=" height: 45px;width: 50px; margin: auto 2%!important;    background: #F9FAFB 0% 0% no-repeat padding-box !important;">' +
    money +
    '</div><input value="' +
    confere(DESCONTOS_FULL.subtracaoProduto.valorDescontado, "number") +
    '"  style="max-width: 65%" class="form-control inputProduct darDesconto" origem="Desconto por outros produtos no carrinho"  preco="' +
    product_data[0].product_valor +
    '" tipo="subtracaoProduto" placeholder="-" id="nomeProduto"></div><br> ' +
    "</div>" +
    '<div class="col-md-3">' +
    '<div class="group-input2" style="background: none"><input value="' +
    confere(DESCONTOS_FULL.subtracaoProduto.precoFinal, "number") +
    '"  style="background: none" class="form-control inputProduct valorDescontadoF" placeholder="-" id="nomeProduto"></div><br> ' +
    "</div>" +
    '<div class="col-md-3">' +
    "</div>" +
    "</div>" +
    "<hr>" +
    '<div style="padding:0 2%" class="row">' +
    '<div style="max-width: 50px;" class="col-md-1">' +
    "</div>" +
    '<div class="col-md-3">' +
    '<label style=" font-size: 20px;" class="label">Porcentagem</label><br> ' +
    "</div>" +
    '<div class="col-md-4">' +
    '<label style=" font-size: 20px;" class="label">Preço após desconto</label><br> ' +
    "</div>" +
    '<div class="col-md-3">' +
    "</div>" +
    "</div>" +
    '<div style="padding:0 2%" class="row">' +
    '<div style="max-width: 50px;" class="col-md-1">' +
    '<label class="checkSmart checkDireita animate__animated animate__"><input  ' +
    (DESCONTOS_FULL.porcentagemProduto.active ? 'checked="true"' : "") +
    '  onchange="marcaPromocao($(this))"  class="marcaPromocao marcaPporcentagemProduto" tipo="porcentagemProduto" type="checkbox"><span class="checkmark"></span></label>' +
    "</div>" +
    '<div class="col-md-3">' +
    '<div class="group-input2"><div class="iconLogistica"  style=" height: 45px;width: 50px; margin: auto 2%!important;    background: #F9FAFB 0% 0% no-repeat padding-box !important;">' +
    porcentagem +
    '</div><input value="' +
    confere(DESCONTOS_FULL.porcentagem.percentualDescontado, "number") +
    '" style="max-width: 65%" class="form-control inputProduct darDesconto"  origem="Desconto por outros produtos no carrinho"  preco="' +
    product_data[0].product_valor +
    '" tipo="porcentagemProduto" placeholder="-" id="nomeProduto"></div><br> ' +
    "</div>" +
    '<div class="col-md-3">' +
    '<div class="group-input2" style="background: none"><input value="' +
    confere(DESCONTOS_FULL.porcentagemProduto.precoFinal, "number") +
    '"  style="background: none;" class="form-control inputProduct valorDescontadoF" placeholder="-" id="nomeProduto"></div><br> ' +
    "</div>" +
    '<div class="col-md-3">' +
    "</div>" +
    "</div>" +
    '<div style="padding:0 2%; display:none" class="row">' +
    '<div  class="input-group buttonG">' +
    '<label  style="cursor:pointer;margin: -5% auto;text-align: center;    min-width: 90%; color: white !important; font-size: 1.2rem;padding-top: 3%;" class="label"><i class="fas fa-plus-circle"></i> Adicionar outro desconto</label>' +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    //======================================================ABA DE PROMOÇÕES==================================================================================================================
    '<div id="relacionados" style="max-width:70% ; height: 82vh; margin-top: 2%; display:none"  class="container tabContent verticalScroll ">' +
    '<div  class="col-md-12 " style="margin-top: 3% !important; background: white !important">' +
    '<div style="padding:0 2%; margin-top: 2%; border: none !important" class="row">' +
    '<div style="margin: 1% 2%;" class="switch__container  ajuste">' +
    "<input " +
    relacionadosAtivado +
    ' id="switch-shadow18" class="switch switch--shadow" type="checkbox" />' +
    '<label for="switch-shadow18"></label>' +
    "</div>" +
    '<label style=" font-size: 20px;" class="label">Relacionados ativado</label> ' +
    "</div>" +
    '<div style="padding:0 2%" class="row">' +
    '<div class="col-md-12">' +
    '<label style=" font-size: 20px;" class="label">Título</label><br> ' +
    "</div>" +
    "</div>" +
    '<div style="padding:0 2%" class="row">' +
    '<div class="col-md-12">' +
    '<div class="group-input2"  style="background: #F0F0F0 0% 0% no-repeat padding-box;border: 1px solid #EFEFEF;border-radius: 5px;"><input value="' +
    product_data[0].product_site_related_title +
    '"  acao="product_site_related_title" product_code="' +
    product_data[0].product_code +
    '" onChange="updateField($(this))"  style="background: none" class="form-control inputProduct" placeholder="Titulo dos relacionados" id="nomeProduto"></div><br> ' +
    "</div>" +
    "</div>" +
    "</div>" +
    '<div style="padding:0 2%" class="row">' +
    '<div class="col-md-12">' +
    '<label style=" font-size: 20px;" class="label">Escolha o tipo</label><br> ' +
    "</div>" +
    "</div>" +
    '<div style="margin-top: 3% !important" class="col-md-12 grupo">' +
    '<div style="padding:0 2%; margin-top: 2%" class="row">' +
    '<div style="margin: 1% 2%;" class="switch__container  ajuste ativaRelacao">' +
    "<input " +
    smart +
    '  acao="relacionados" tipoRelacionamento="Smart" product_code="' +
    product_data[0].product_code +
    '" id="switch-shadow' +
    (product_data[0].product_code + 30) +
    '" class="switch switch--shadow" type="checkbox" />' +
    '<label for="switch-shadow' +
    (product_data[0].product_code + 30) +
    '"></label>' +
    "</div>" +
    '<label style=" font-size: 20px;" class="label">Smart</label> ' +
    '<label style=" font-size: 20px; float: right !important; color: #f6b504 !important; text-align: right;width: 80%;" class="label">recomendado</label> ' +
    "</div>" +
    '<div style="padding:0 2%" class="row">' +
    '<div class="col-md-10 container">' +
    '<label style=" font-size: 20px;" class="label labelContent">Os produtos serão priorizados com base no consumidor. A plataforma irá exibir os produtos que mais fazem sentido com os hábitos de cada cliente. Cada página será única.</label><br> ' +
    "</div>" +
    "</div>" +
    "</div>" +
    '<div style="margin-top: 3% !important" class="col-md-12 grupo">' +
    '<div style="padding:0 2%; margin-top: 2%" class="row">' +
    '<div style="margin: 1% 2%;" class="switch__container  ajuste ativaRelacao">' +
    "<input " +
    maisVendidos +
    ' acao="relacionados" product_code="' +
    product_data[0].product_code +
    '" tipoRelacionamento="Produtos mais vendidos" id="switch-shadow19" class="switch switch--shadow" type="checkbox" />' +
    '<label for="switch-shadow19"></label>' +
    "</div>" +
    '<label style=" font-size: 20px;" class="label">Produtos mais vendidos</label> ' +
    "</div>" +
    '<div style="padding:0 2%" class="row">' +
    '<div class="col-md-10 container">' +
    '<label style=" font-size: 20px;" class="label labelContent">Os produtos mais vendidos em estoque serão priorizados na classificação na página de categoria e subcategoria.</label><br> ' +
    "</div>" +
    "</div>" +
    "</div>" +
    '<div style="margin-top: 3% !important" class="col-md-12 grupo">' +
    '<div style="padding:0 2%; margin-top: 2%" class="row">' +
    '<div style="margin: 1% 2%;" class="switch__container  ajuste ativaRelacao">' +
    "<input " +
    ofertas +
    ' product_code="' +
    product_data[0].product_code +
    '"  acao="relacionados" tipoRelacionamento="Ofertas" id="switch-shadow193" class="switch switch--shadow" type="checkbox" />' +
    '<label for="switch-shadow193"></label>' +
    "</div>" +
    '<label style=" font-size: 20px;" class="label">Ofertas</label> ' +
    "</div>" +
    '<div style="padding:0 2%" class="row">' +
    '<div class="col-md-10 container">' +
    '<label style=" font-size: 20px;" class="label labelContent">Os produtos com desconto ativo serão priorizados. Os produtos mais vendidos em ofertas serão priorizados na página de categoria e subcategoria. Os produtos sem oferta, irão aparecer em seguida.</label><br> ' +
    "</div>" +
    "</div>" +
    "</div>" +
    '<div style="margin-top: 3% !important" class="col-md-12 grupo">' +
    '<div style="padding:0 2%; margin-top: 2%" class="row">' +
    '<div style="margin: 1% 2%;" class="switch__container  ajuste ativaRelacao">' +
    "<input " +
    personal +
    ' product_code="' +
    product_data[0].product_code +
    '"  acao="relacionados" tipoRelacionamento="Personalizados" id="switch-shadow194" class="switch switch--shadow" type="checkbox" />' +
    '<label for="switch-shadow194"></label>' +
    "</div>" +
    '<label style=" font-size: 20px;" class="label">Personalizados</label> ' +
    "</div>" +
    '<div style="padding:0 2%" class="row">' +
    '<div class="col-md-10 container">' +
    '<label style=" font-size: 20px;" class="label labelContent">Você definirá os produtos relacionados a este item. Escolha no máximo 5 produtos para serem exibidos.</label><br> ' +
    "</div>" +
    "</div>" +
    "<br>" +
    "<br>" +
    '<div style="display:block"  class="row grupoCategorias drop procuraProduto">' +
    '<div class="col-md-12">' +
    '<div class="input-group">' +
    '<input type="text" style="min-width: 300px;font-size: 1.3rem" value="" class="form-control buscaPRD" placeholder="Busque por produtos">' +
    '<div class="input-group-append">' +
    '<div class="input-group-text">' +
    '<svg style="color: #f6b504; font-weight: bold;" class="svg-inline--fa fa-search fa-w-16" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="">' +
    '<path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>' +
    "</svg>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    '<div  origem="relacionados" style="max-height: 300px !important;    text-align: center;"  class="col-md-12 listaDeCartoes verticalScroll">' +
    "</div>" +
    "</div>" +
    "<hr>" +
    '<div  origem="relacionados"  class="col-md-12 listaDeCartoesSelecionados">' +
    "</div>" +
    "</div>" +
    "<br>" +
    "<br>" +
    "</div>" +
    "</div>" +
    '<div id="visualizar" style="max-width:90% ; height: 82vh; margin-top: 2%; display:none"  class="container tabContent verticalScroll ">' +
    '<div class="row">' +
    '<div class="col-md-2">' +
    getS_TAGS(
      product_data[0].product_site_tags,
      '<i class="fas fa-heart"></i>'
    ) +
    '<div class="sTagButton">' +
    '<i  style="color: silver !important" class="fas fa-clipboard-list"></i> <label  class="tagAmostra " style="color: silver !important" > Adicionar a lista</label>' +
    "</div>" +
    "<br>" +
    "<br>" +
    "<br>" +
    getIconsToShow(URLS) +
    "</div>" +
    '<div class="col-md-6">' +
    '<img   id="superMostraImg" style="min-width: 80%;max-width:80%; margin:auto" src="' +
    URLS[0] +
    '">' +
    "</div>" +
    '<div class="col-md-4">' +
    '<span class="fabricacao">' +
    product_data[0].product_fabricacao +
    "</span>" +
    '<h3 class="tituloProduto">' +
    product_data[0].product_descricao +
    "</h3>" +
    vendaPorPesoAutoriza +
    '<span class="stars">' +
    '<i class="fas fa-star"></i>' +
    '<i class="fas fa-star"></i>' +
    '<i class="fas fa-star"></i>' +
    '<i class="fas fa-star"></i>' +
    '<i class="fas fa-star"></i>' +
    "</span><br><br><br>" +
    '<span class="preco2">R$ ' +
    confere(DESCONTOS_FULL.subtracao.precoFinal, "number").toLocaleString() +
    ' <span class="desconto2">R$ ' +
    myValue2.toLocaleString() +
    "</span></span><br><br>" +
    '<div class="boxLike">' +
    "<span>Como você gostaria de receber o produto?</span><br><br>" +
    '<div class="row">' +
    '<div class="label1 sTagButton">Verde</div>' +
    '<div class="label1 sTagButton">Normal</div>' +
    '<div class="label1 sTagButton">Maduro</div>' +
    "</div>" +
    "</div>" +
    '<div class="qtdSelect">' +
    '<div class="row">' +
    '<div class="col-md-4 ">' +
    '<div posicao="topo" class="row  unSelect1 inativoTop">' +
    '<label style="margin: auto;     display: inline-flex;">' +
    '<div id="pUnidade">' +
    unidade2 +
    "</div>" +
    '<span class="inLabel2">Unidade</span> </label>' +
    "</div>" +
    '<div class="row unSelect2">' +
    '<label style="margin: auto;     display: inline-flex;">' +
    '<div id="pPeso">' +
    peso1 +
    "</div>" +
    '<span  class="inLabel2">Peso</span></label>' +
    "</div>" +
    "</div>" +
    '<div class="col-md-8 selectArea">' +
    '<div style="margin: auto" class="col-md-8 selectContent">' +
    '<div class="row">' +
    '<div id="menos" class="col-md-3 btnQtd">' +
    '<i style="margin:60% auto" class="fas fa-minus-circle"></i>' +
    "</div>" +
    '<div style="background: #F6B504 !important; min-height: 50px;     padding-top: 5px;" class="col-md-6 btnQtd">' +
    '<label style="margin:20% auto"><span contentEditable="true" id="valQuantidade">0</span><span id="tipoDeUn">g</span></label>' +
    "</div>" +
    '<div id="mais" class="col-md-3 btnQtd">' +
    '<i style="margin:60% auto"  class="fas fa-plus-circle"></i>' +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    '<div class="row"> ' +
    '<div class="col-md-12">' +
    "</div> " +
    "</div>" +
    '<section style="margin-top: 10%;    max-height: 200px;">' +
    '<div class="row"> ' +
    '<div class="col-md-12">' +
    '<div class="importante">' +
    '<div class="row">' +
    '<div class="col-md-3">' +
    '<p class="infoImportante">Informação Importante:</p>' +
    "</div>" +
    '<div class="col-md-9">' +
    '<p class="info2">Para produtos com o peso a granel procuramos sempre manter o peso igual ou um pouco abaixo do solicitado, desta forma você nunca terá que pagar mais. Nos casos onde o peso é menor que o solicitado, desconatmos e devolvemos o valor pago excendente via extorno</p>' +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div> " +
    "</div>" +
    "</section>" +
    "</div>" +
    "</div>";

  //////////console.log(htmlModal)

  if (!OM) {
    OM = true;

    bootbox.alert({
      message: htmlModal,
      onShow: function () {
        localStorage.relacionados = product_data[0].product_site_related_code;
        ////////////console.log("This was logged in the callback!");
        var listaNutricionalIndex = 3;
        var listaRelacionadas = [];
        try {
          listaRelacionadas = JSON.parse(localStorage.relacionados);
        } catch (er) { }

        $.ajax({
          url: "" + mainHost + "/listaIds",
          headers: {
            "x-access-token": localStorage.token,
          },
          data: {
            affiliate_id: localStorage.AFFILIATE_ID,
            product_list_ids: listaRelacionadas,
          },
          type: "POST",
          success: function (data) {
            //////////console.log(data)
            localStorage.PRODUCTS_RELATEDS = JSON.stringify(data);
            $(".listaDeCartoesSelecionados").html(
              cardSelecionado2(
                JSON.parse(product_data[0].product_site_related_code)
              )
            );
          },
          error: function (data) {
            //////////console.log(data)
          },
        });

        $(".adicionaTabelaNova").click(function () {
          var html5 =
            '<div style="padding:0 2%" class="row removeNovoTabela">' +
            '<div class="col-md-5 ">' +
            '<div style="padding:0 2%; margin-top: 2%" class="row">' +
            '<label style=" font-size: 20px;" class="label">Título</label><br> ' +
            "</div>" +
            "</div>" +
            '<div class="col-md-5">' +
            '<div style="padding:0 2%; margin-top: 2%" class="row">' +
            '<label style=" font-size: 20px;" class="label">Quantidade</label><br> ' +
            "</div>" +
            "</div>" +
            '<div class="col-md-2">' +
            '<div  onclick="limpaCampos($(this))"  style="opacity:0" class="input-group iconOpaco ico etiquetaRedonda">' +
            '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 21 21" style="    margin: auto;">' +
            "<defs></defs>" +
            '<path class="a" d="M10.937,16H3.063A2.208,2.208,0,0,1,.875,13.778V2.666H.438a.444.444,0,0,1,0-.889H4.375V1.334A1.324,1.324,0,0,1,5.687,0H8.313A1.324,1.324,0,0,1,9.625,1.334v.444h3.937a.444.444,0,0,1,0,.889h-.437V13.778A2.208,2.208,0,0,1,10.937,16ZM1.75,2.666V13.778a1.325,1.325,0,0,0,1.313,1.334h7.875a1.325,1.325,0,0,0,1.313-1.334V2.666ZM5.687.889a.441.441,0,0,0-.437.445v.444h3.5V1.334A.441.441,0,0,0,8.313.889Zm3.5,11.556A.442.442,0,0,1,8.75,12V5.778a.437.437,0,1,1,.875,0V12A.441.441,0,0,1,9.188,12.445Zm-4.375,0A.441.441,0,0,1,4.375,12V5.778a.437.437,0,1,1,.875,0V12A.442.442,0,0,1,4.812,12.445Z" transform="translate(4 3)"></path>' +
            "</svg>" +
            "</div>" +
            "</div>" +
            "</div>" +
            '<div style="padding:0 2%" class="row listaNutritiva">' +
            '<div class="col-md-5">' +
            '<div style="padding:0 2%; margin-top: -2%" class="row">' +
            '<div class="group-input2"><input  onchange="setNutrition($(this))" name="titulo" class=" tt form-control inputProduct nutriTitulo' +
            listaNutricionalIndex +
            ' nutritiones"   placeholder="Título" id="nomeProduto"></div><br> ' +
            "</div>" +
            "</div>" +
            '<div class="col-md-5">' +
            '<div style="padding:0 2%; margin-top: -2%" class="row">' +
            '<div class="group-input2"><input  onchange="setNutrition($(this))" name="valor" class=" qt form-control inputProduct nutriQuantidade' +
            listaNutricionalIndex +
            ' nutritiones"   placeholder="Quantidade" id="nomeProduto"></div><br> ' +
            "</div>" +
            "</div>" +
            '<div class="col-md-2">' +
            '<div  onclick="limpaCampos($(this))"  style="margin:auto" class="input-group iconOpaco ico etiquetaRedonda">' +
            '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 21 21" style="    margin: auto;">' +
            "<defs></defs>" +
            '<path class="a" d="M10.937,16H3.063A2.208,2.208,0,0,1,.875,13.778V2.666H.438a.444.444,0,0,1,0-.889H4.375V1.334A1.324,1.324,0,0,1,5.687,0H8.313A1.324,1.324,0,0,1,9.625,1.334v.444h3.937a.444.444,0,0,1,0,.889h-.437V13.778A2.208,2.208,0,0,1,10.937,16ZM1.75,2.666V13.778a1.325,1.325,0,0,0,1.313,1.334h7.875a1.325,1.325,0,0,0,1.313-1.334V2.666ZM5.687.889a.441.441,0,0,0-.437.445v.444h3.5V1.334A.441.441,0,0,0,8.313.889Zm3.5,11.556A.442.442,0,0,1,8.75,12V5.778a.437.437,0,1,1,.875,0V12A.441.441,0,0,1,9.188,12.445Zm-4.375,0A.441.441,0,0,1,4.375,12V5.778a.437.437,0,1,1,.875,0V12A.442.442,0,0,1,4.812,12.445Z" transform="translate(4 3)"></path>' +
            "</svg>" +
            "</div>" +
            "</div>" +
            "</div>";
          listaNutricionalIndex++;
          $(".listaTabelaNutricional").append(html5);
        });

        var modal = $(this);
        $(".superSave").click(function () {
          $(".bootbox-accept").click();
        });
        $(".superCancel").click(function () {
          $(".close").click();
        });

        $(".buscaPRD").keyup(function () {
          var elemento = $(this)
            .parent()
            .parent()
            .parent()
            .find(".listaDeCartoes");
          var tag = $(this)
            .parent()
            .parent()
            .parent()
            .parent()
            .find(".listaDeCartoesSelecionados");
          var texto = $(this).val();
          addProdutoRelacao2($(this), 20);
          //getCardsProducts(elemento, tag, texto, 4);
        });

        $(".iconShow").click(function () {
          var newUrl = $(this).find("img").attr("src");
          $("#superMostraImg").attr("src", newUrl);
        });

        $(".tabModal").click(function (event) {
          event.preventDefault();
          $(".tabModal").removeClass("tabModalActive");
          $(this).addClass("tabModalActive");
          $(".tabContent").hide();
          //////////console.log("#" + $(this).attr("content"));
          $("#" + $(this).attr("content")).fadeIn();

          //////////console.log($(this).attr("content").trim())
          if ($(this).attr("content").trim() == "visualizar") {
            //////////console.log("vou mudar");
            var html =
              '<div class="relacionadosProdutos"><div style="max-width: 90%" class="container">' +
              '<div clas="row">' +
              '<h4 style="max-width: 95%;color: #B4B4B4; text-align: center;  font: normal normal 300 2rem Roboto;">Ótimas combinações <span style="float: right; text-align:right;font-size: 1rem; margin-top: 2%" class="verTodas">ver todas</span></h4>' +
              '<div class="row">' +
              getFromRelations(product_data[0].product_site_related_code) +
              "</div>" +
              "</div>" +
              "</div> </div> ";

            $("#visualizar").append(html);

            $(".noBorder").css("border", "none");
          } else {
            // $(".modal-footer").html("");
            // $(".modal-footer").removeClass("relacionadosProdutos");
          }
        });

        $(".fa-times-circle").click(function (event) {
          event.preventDefault();
          ////////////console.log("ronan34 "+$(this).parent().attr("remove"))
          if ($(this).parent().attr("remove") == "relacionados") {
          } else {
            $(this).parent().parent().remove();
          }
        });

        $(".dropItems").click(function () {
          if ($(this).attr("dropou") == "1") {
            $(this).parent().parent().parent().find(".drop").fadeOut();
            $(this).attr("dropou", "0");
          } else {
            $(this).parent().parent().parent().find(".drop").fadeIn();
            $(this).attr("dropou", "1");
          }
        });

        $(".list-item").click(function () {
          if ($(this).attr("dropou") == "1") {
            $(this).find(".listInner").hide();
            $(this).attr("dropou", "0");
          } else {
            $(this).find(".listInner").show();
            $(this).attr("dropou", "1");
          }
        });
        $(".subCheck").click(function () {
          ////////////console.log("Cliquei")
          if ($(this).attr("dropou") == "1") {
            $(this).parent().find(".listInner").hide();
            $(this).attr("dropou", "0");
          } else {
            $(this).parent().find(".listInner").show();
            $(this).attr("dropou", "1");
          }
        });
        $(".darDesconto").change(function () {
          calculaDesconto(
            $(this).attr("tipo"),
            $(this),
            Number($(this).attr("preco")),
            $(this).attr("origem")
          );
        });

        $("#buscaCategorias").keyup(function () {
          var txt = $(this).val().toLowerCase();
          $(".targetBusca").each(function () {
            if ($(this).text().toLowerCase().indexOf(txt) > -1) {
              $(this).show();
            } else {
              $(this).hide();
            }
          });
        });

        $(".thumbProductUpload").click(function () {
          $("#pegaFoto")[0].click();
        });

        $("#pegaFoto").change(function () {
          uploadPicture(
            $("#pegaFoto"),
            product_data[0].product_ean,
            AFFILIATE_ID
          );
        });

        function uploadPicture(elemento, product_code, affiliate_id) {
          var data = new FormData();
          var contador = 1;
          data.append("fileimagem", elemento[0].files[0]);

          $.ajax({
            url:
              "" +
              mainHost +
              `/uploadLogo/${affiliate_id}/${product_code}/true`,
            headers: {
              "x-access-token": localStorage.token,
              affiliate_id: affiliate_id,
              product_code: product_code,
              is_product_image: true,
            },
            data: data,
            processData: false,
            contentType: false,
            type: "POST",
            success: function (data) {

              var urlNew = data.path;
              var ur =
                '<li draggable="true" picture_name="' +
                elemento[0].files[0] +
                '" class=" thumbProduct ">' +
                "<figure class=\"figurefx pushup\"><div onclick=\"deletaImagen('secundaria','" +
                affiliate_id +
                "','" +
                product_code +
                "','" +
                urlNew +
                "'," +
                "'" +
                elemento[0].files[0] +
                '\', $(this))" class="col-sm paiIcon2">' +
                '</div><img   id="1_8_2" class="imageThumb notCrash firstImage droptarget" src="' +
                urlNew +
                '"><figcaption onmouseleave="mLeave($(this))"  onmouseover="mOver($(this))" class="miuda">' +
                "<div onclick=\"deletaImagen('secundaria','" +
                affiliate_id +
                "','" +
                product_code +
                "','" +
                urlNew +
                "','" +
                elemento[0].files[0] +
                '\', $(this))" class="col-sm paiIcon2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21" class="icoPopUpDelete superFica">&gt;<defs></defs><path class="a" d="M10.937,16H3.063A2.208,2.208,0,0,1,.875,13.778V2.666H.438a.444.444,0,0,1,0-.889H4.375V1.334A1.324,1.324,0,0,1,5.687,0H8.313A1.324,1.324,0,0,1,9.625,1.334v.444h3.937a.444.444,0,0,1,0,.889h-.437V13.778A2.208,2.208,0,0,1,10.937,16ZM1.75,2.666V13.778a1.325,1.325,0,0,0,1.313,1.334h7.875a1.325,1.325,0,0,0,1.313-1.334V2.666ZM5.687.889a.441.441,0,0,0-.437.445v.444h3.5V1.334A.441.441,0,0,0,8.313.889Zm3.5,11.556A.442.442,0,0,1,8.75,12V5.778a.437.437,0,1,1,.875,0V12A.441.441,0,0,1,9.188,12.445Zm-4.375,0A.441.441,0,0,1,4.375,12V5.778a.437.437,0,1,1,.875,0V12A.442.442,0,0,1,4.812,12.445Z" transform="translate(4 3)"></path>' +
                '</svg></div> <br><svg class="movedor2" id="_01_Icons_Line_expand-alt2" data-name="01) Icons / Line /  expand-alt2" xmlns="http://www.w3.org/2000/svg" width="27.002" height="27.001" viewBox="0 0 27.002 27.001"><path id="expand-alt2" d="M13.5,27a.64.64,0,0,1-.456-.189L9.189,22.956a.644.644,0,0,1,.911-.911l2.759,2.761V17.358a.643.643,0,1,1,1.286,0v7.448l2.76-2.761a.644.644,0,1,1,.91.911l-3.857,3.857A.644.644,0,0,1,13.5,27Zm9-9a.644.644,0,0,1-.455-1.1l2.761-2.76H17.358a.643.643,0,1,1,0-1.286h7.448L22.046,10.1a.644.644,0,0,1,.911-.911l3.857,3.857a.644.644,0,0,1,0,.911l-3.857,3.857A.638.638,0,0,1,22.5,18Zm-18,0a.637.637,0,0,1-.455-.189L.189,13.956a.644.644,0,0,1,0-.911L4.046,9.189A.636.636,0,0,1,4.5,9a.65.65,0,0,1,.167.022A.644.644,0,0,1,4.956,10.1L2.2,12.858H9.643a.643.643,0,1,1,0,1.286H2.2l2.76,2.76A.644.644,0,0,1,4.5,18Zm9-7.715a.644.644,0,0,1-.643-.643V2.2L10.1,4.956a.644.644,0,1,1-.911-.91L13.045.189a.644.644,0,0,1,.911,0l3.857,3.858a.643.643,0,0,1-.91.91L14.144,2.2V9.643A.644.644,0,0,1,13.5,10.287Z" ' +
                'transform="translate(0 0)" fill="#fff"></path></svg></figcaption></figure></li>';

              $(".imagensProduto").prepend(ur);
              imagenPadrao(product_code, product_code, urlNew);

              ////////console.log(imageButtons(affiliate_id, product_code,ur))
              var alerta = bootbox.confirm({
                message:
                  'Imagen salva com sucesso! <img   style="width: 60px; " src="' +
                  urlNew +
                  '" /><br>',
                onShow: function () {
                  $(this)[0].id = "modalInner";
                  $("#modalInner").find(".modal-dialog").addClass("miniModal");
                  $("#modalInner")
                    .find(".modal-body")
                    .addClass("miniModalInner");
                  $(".modal-footer").show();
                  $(".bootbox-accept").css("float", "right");
                  $(".bootbox-cancel").css("float", "right");
                },
                callback: function (e) { },
              });
              $(".firstImageShow ").attr("src", urlNew);
              atualizaListaProdutos();
            },
            error: function (data) {
              if (data.responseJSON.message.indexOf("token") > -1) {
                setTimeout(() => {
                  localStorage.peregrino =
                    location.href.split("/")[
                    location.href.split("/").length - 1
                    ];
                  location.replace("/cms-login");
                }, 2000);
              }
            },
          });
        }

        var src = $(".preview-pic").find("img").attr("src");

        var imageMain = $(".imageMain").attr("src");

        if (src == "null" || src == null) {
          if (imageMain == "null" || imageMain == null) {
            $(".preview-pic")
              .find("img")
              .attr("src", URL_IMAGES + "/produto-sem-imagem.jpg");
          } else {
            $(".preview-pic").find("img").attr("src", imageMain);
          }
        }

        $(".thumbProduct").on("dragstart", function (event) {
          localStorage.url1 = $(this).find("img").attr("src");
          localStorage.idDoador = $(this).find("img").attr("id");
        });

        $(".thumbProduct").on("drag", function (event) { });

        $(".thumbProduct").on("dragend", function (event) {
          event.target.style.opacity = "1";
        });

        $(".thumbProduct").on("dragover", function (event) {
          event.preventDefault();
        });

        $(".thumbProduct").on("dragleave", function (event) {
          if (event.target?.className?.indexOf("droptarget") > -1) {
            event.target.style.border = "";
          }
        });

        $(".thumbProduct").on("drop", function (event) {
          event.preventDefault();

          localStorage.url2 = $(this).find("img").attr("src");
          if (event.target.className?.indexOf("droptarget") > -1) {
            var doador = "#" + localStorage.idDoador;
            $(this).find("img").attr("src", localStorage.url1);
            $(this).find("img").css("border", "none");
            $(doador).attr("src", localStorage.url2);

            imagenPadrao(
              product_data[0].product_ean,
              product_data[0].product_code,
              localStorage.url1
            );
          }
        });

        $(".unSelect1").click(function () {
          $(".unSelect2").addClass("inativoBottom");
          $(".unSelect1").removeClass("inativoTop");
          $("#tipoDeUn").text("un");
          $("#pUnidade").html(unidade1);
          $("#pPeso").html(peso2);
        });
        $(".unSelect2").click(function () {
          $(".unSelect2").removeClass("inativoBottom");
          $(".unSelect1").addClass("inativoTop");
          $("#tipoDeUn").text("g");
          $("#pUnidade").html(unidade2);
          $("#pPeso").html(peso1);
        });

        $("#mais").click(function () {
          var val = Number($("#valQuantidade").text()) + 1;
          if (val < 0) {
            val = 0;
          }
          $("#valQuantidade").text(val);
        });
        $("#menos").click(function () {
          var val = Number($("#valQuantidade").text()) - 1;
          if (val < 0) {
            val = 0;
          }
          $("#valQuantidade").text(val);
        });

        $(".sTagButton").click(function () {
          $(".sTagButton").removeClass("sTagButtonActive");
          $(this).addClass("sTagButtonActive");
        });

        $(".ativaProduto2").click(function (e) {
          var senderElement = e.target;
          if (senderElement.className == "switch switch--shadow") {
            ////////////console.log("vou tentar")
            if (senderElement.className == "switch switch--shadow")
              acaoCheckbox($("#" + senderElement.id));
          }
        });

        $(".ativaPromocao").click(function (e) {
          var senderElement = e.target;
          $(".ativaPromocao").each(function () {
            $(this).find("input")[0].checked = false;
          });
          $(this).find("input")[0].checked = !$(this).find("input")[0].checked;
          if (senderElement.className == "switch switch--shadow") {
            ////////////console.log("vou tentar")
            if (senderElement.className == "switch switch--shadow")
              acaoCheckbox($("#" + senderElement.id));
          }
        });
        $(".ativaRelacao").click(function (e) {
          $(".ativaRelacao").each(function () {
            $(this).find("input")[0].checked = false;
          });
          if ($(this).find("input")[0].checked == false) {
            $(this).find("input")[0].checked = true;
          } else {
            $(this).find("input")[0].checked = false;
          }
          var senderElement = e.target;
          if (senderElement.className == "switch switch--shadow") {
            ////////////console.log("vou tentar")
            if (senderElement.className == "switch switch--shadow")
              acaoCheckbox($("#" + senderElement.id));
          }
        });
      },
      callback: function (result) {
        OM = false;

        var categorias1 = $("#listaEtiquetasTag").find("label"),
          categorias = "";
        categorias1.each(function () {
          categorias += $(this).text().trim() + ",";
        });
        var tags1 = $("#variates").find("label"),
          tags = "";
        tags1.each(function () {
          tags += $(this).text().trim() + ",";
        });
        var variacoes1 = $("#listaVariacoes").find("label"),
          variacoes = "";
        variacoes1.each(function () {
          variacoes += $(this).text().trim() + ",";
        });
        var tabelaNutricional = localStorage.tabelaNutricional;
        var descontosTotais = localStorage.listaDescontos;
        var txtDescontos = localStorage.textoDescontos;

        var detalhe = getProductCaract(product_data[0].product_code);
        //  //console.log('detalhe para salvar')
        //  //console.log(detalhe)

        $.ajax({
          type: "POST",
          url: mainHost + "/updateById",
          headers: {
            "x-access-token": localStorage.token,
          },
          data: {
            table: "product_details",
            name_id: "id",
            value_id: detalhe.id,
            fields: [
              {
                column: "product_affiliate_id",
                value: detalhe.product_affiliate_id,
              },
              {
                column: "product_code",
                value: detalhe.product_code,
              },
              {
                column: "product_status",
                value: detalhe.product_status,
              },
              {
                column: "product_site_name",
                value: detalhe.product_site_name,
              },
              {
                column: "product_site_description",
                value: detalhe.product_site_description,
              },
              {
                column: "product_site_categories",
                value: categorias,
              },
              {
                column: "product_site_tags",
                value: tags,
              },
              {
                column: "product_site_variations",
                value: variacoes,
              },
              {
                column: "product_site_info",
                value: detalhe.product_site_info,
              },
              {
                column: "product_site_nutrition",
                value: tabelaNutricional,
              },
              {
                column: "product_site_value",
                value: Number(detalhe.product_site_value),
              },
              {
                column: "product_site_discount_value",
                value: descontosTotais,
              },
              {
                column: "product_site_discount_type",
                value: txtDescontos,
              },
              {
                column: "product_average_weight_type",
                value: detalhe.product_average_weight_type,
              },
              {
                column: "product_sell_by_weight",
                value: localStorage.INFO_PESO,
              },
              {
                column: "product_average_weight_value",
                value: Number(detalhe.product_average_weight_value),
              },
              {
                column: "product_site_related_title",
                value: detalhe.product_site_related_title,
              },
              {
                column: "product_site_related_type",
                value: localStorage.relacionamentos,
              },
              {
                column: "product_site_related_code",
                value: localStorage.relacionados,
              },
            ],
          },
          success: function (data) {
            //  //console.log(data)
            atualizaListaProdutos();
          },
          error: function (data) {
            //  //console.log(data)
            if (data.responseJSON.message.indexOf("token") > -1) {
              //alert("Necessário fazer login!<br>"+data.responseJSON.message)
              setTimeout(() => {
                localStorage.peregrino =
                  location.href.split("/")[location.href.split("/").length - 1];
                location.replace("/cms-login");
              }, 2000);
            } else {
              //alert("Algo saiu errado!<br>"+data.responseJSON.message)
            }
          },
          complete: function () {
            // ao final da requisição...
          },
        });
      },
    });
    $(".bootbox-accept").hide();
  }
}

function modalNewProduct() {
  $.ajax({
    type: "POST",
    url: mainHost + "/newProduct",

    headers: {
      "x-access-token": localStorage.token,
    },
    data: {
      affiliate_id: AFFILIATE_ID,
    },
    success: async function (data) {
      ////////console.log(data);
      ////////console.log("productSearch", 0, 25, data.product_code_new, localStorage.AFFILIATE_ID,  data.product_code_new)
      $(".listaDeProdutos").html("");
      request(
        "productSearch",
        0,
        25,
        data.product_code_new,
        localStorage.AFFILIATE_ID,
        data.product_code_new
      );

      setTimeout(() => {
        $(".product")[0].click();
      }, 1000);
    },
    error: function (data) {
      ////////console.log(data)
    },
    complete: function () {
      // ao final da requisição...
    },
  });
}

$("#carregaMaisProdutos").click(function () {
  $(this).html(
    '<div style="width: 25px;height: 25px; margin: auto 25px" class="spinner-border text-warning" role="status"><span class="sr-only">Loading...</span></div>'
  );
  if (localStorage.LAST_ID == "NaN" || localStorage.LAST_ID == NaN) {
    localStorage.LAST_ID = 50;
  }

  try {
    var last_request = JSON.parse(localStorage.LAST_REQUEST);
    carregaMais("getAllProducts", localStorage.LAST_ID, 25, 0, 0, 0);
  } catch (err) {
    $(".spinner-border").remove();
  }
});

function getBadges(string) {
  var badges = string.split(","),
    result = "";
  for (const k in badges) {
    result += '<span class="badge badge-secondary">' + badges[k] + "</span>";
  }
  return result;
}

function getProductInfo(PRODUCTS, product_code, affiliate_id) {
  ////////////console.log(PRODUCTS, product_code, Number(affiliate_id));
  var result = [];
  for (const k in PRODUCTS) {
    if (
      PRODUCTS[k].product_code == product_code &&
      PRODUCTS[k].product_affiliate_id == Number(affiliate_id)
    ) {
      result.push(PRODUCTS[k]);
    }
  }
  if (result.length > 0) {
    return result;
  } else {
    return false;
  }
}
$("#checkFull").change(function () {
  $("." + $(this).attr("lista"))
    .find(".checka")
    .each(function () {
      $(this)[0].checked = $("#checkFull")[0].checked;
      if ($("#checkFull")[0].checked) {
        $(this).parent().parent().parent().addClass("selecionado");
      } else {
        $(this).parent().parent().parent().removeClass("selecionado");
      }
    });
});

function ajustaDigitos(numero, digitos) {
  var prefix = "",
    result = numero;
  ////////////console.log(numero.toString().length);
  if (numero.toString().length != digitos) {
    for (let a = 0; a < digitos - numero.toString().length; a++) {
      prefix += "0";
    }
    result = prefix + numero;
  }
  return result;
}

function reorganiza(PRODUCTS, field, sentido) { }

function calculaDesconto(tipo, elemento, precoProduto, origem) {
  precoProduto = Number(precoProduto);
  var produtos = [];
  var listaDescontos = {
    subtracao: {},
    percentual: {},
    levePague: {},
    subtracaoProduto: {},
    porcentagemProduto: {},
    produtos: [],
  };
  if (
    localStorage.listaDescontos.length > 0 &&
    localStorage.listaDescontos != "0" &&
    localStorage.listaDescontos != "null" &&
    localStorage.listaDescontos != null
  ) {
    try {
      listaDescontos = JSON.parse(localStorage.listaDescontos);
    } catch (err) { }
  }

  if (tipo == "subtracao") {
    var res = Number(
      (precoProduto - Number(elemento.val().replace(",", ".")))
        .toFixed(2)
        .replace(",", ".")
    );
    elemento.parent().parent().parent().find(".valorDescontadoF").val(res);
    elemento
      .parent()
      .parent()
      .parent()
      .find(".valorDescontadoF")
      .addClass("selecionado2");
    elemento
      .parent()
      .parent()
      .parent()
      .find(".valorDescontadoF")
      .css("color", "#f6b504 !important");
    elemento
      .parent()
      .parent()
      .parent()
      .find(".valorDescontadoF")
      .css("border", "2px solid #f6b504 !important");
    listaDescontos.subtracao = {
      origem: origem,
      tipo: "subtracao",
      precoProduto: precoProduto,
      valorDescontado: elemento.val(),
      precoFinal: res,
    };
  }
  if (tipo == "porcentagem") {
    //  //console.log('calculando aqui ... ')
    var res = Number(
      (
        precoProduto -
        (Number(elemento.val().replace(",", ".")) * precoProduto) / 100
      )
        .toFixed(2)
        .replace(",", ".")
    );
    elemento.parent().parent().parent().find(".valorDescontadoF").val(res);
    elemento
      .parent()
      .parent()
      .parent()
      .find(".valorDescontadoF")
      .addClass("selecionado2");
    elemento
      .parent()
      .parent()
      .parent()
      .find(".valorDescontadoF")
      .css("color", "#f6b504 !important");
    elemento
      .parent()
      .parent()
      .parent()
      .find(".valorDescontadoF")
      .css("border", "2px solid #f6b504 !important");
    var percentual = ((elemento.val() * precoProduto) / 100)
      .toFixed(2)
      .replace(",", ".");
    listaDescontos.porcentagem = {
      origem: origem,
      tipo: "porcentagem",
      precoProduto: precoProduto,
      percentualDescontado: elemento.val(),
      precoFinal: res,
    };
  }

  if (tipo == "subtracaoProduto") {
    var res = Number(
      (precoProduto - Number(elemento.val().replace(",", ".")))
        .toFixed(2)
        .replace(",", ".")
    );
    elemento.parent().parent().parent().find(".valorDescontadoF").val(res);
    elemento
      .parent()
      .parent()
      .parent()
      .find(".valorDescontadoF")
      .addClass("selecionado2");
    elemento
      .parent()
      .parent()
      .parent()
      .find(".valorDescontadoF")
      .css("color", "#f6b504 !important");
    elemento
      .parent()
      .parent()
      .parent()
      .find(".valorDescontadoF")
      .css("border", "2px solid #f6b504 !important");
    listaDescontos.subtracaoProduto = {
      origem: origem,
      tipo: "subtracao",
      precoProduto: precoProduto,
      valorDescontado: elemento.val(),
      precoFinal: res,
    };
    $(".produtoParaPromocao").each(function () {
      produtos.push($(this).attr("product_code"));
    });
    listaDescontos.produtos = produtos;
  }
  if (tipo == "porcentagemProduto") {
    var res = Number(
      (
        precoProduto -
        (Number(elemento.val().replace(",", ".")) * precoProduto) / 100
      )
        .toFixed(2)
        .replace(",", ".")
    );
    elemento.parent().parent().parent().find(".valorDescontadoF").val(res);
    elemento
      .parent()
      .parent()
      .parent()
      .find(".valorDescontadoF")
      .addClass("selecionado2");
    elemento
      .parent()
      .parent()
      .parent()
      .find(".valorDescontadoF")
      .css("color", "#f6b504 !important");
    elemento
      .parent()
      .parent()
      .parent()
      .find(".valorDescontadoF")
      .css("border", "2px solid #f6b504 !important");
    var percentual = ((elemento.val() * precoProduto) / 100)
      .toFixed(2)
      .replace(",", ".");
    listaDescontos.porcentagemProduto = {
      origem: origem,
      tipo: "porcentagem",
      precoProduto: precoProduto,
      percentualDescontado: elemento.val(),
      precoFinal: res,
    };
    $(".produtoParaPromocao").each(function () {
      if ($(this).parent().attr("origem") == "descontos") {
        produtos.push($(this).attr("product_code"));
      }
    });
    listaDescontos.produtos = produtos;
  }
  if (tipo == "levePague") {
    var res = Number(
      (Number($("#pagueD").val().replace(",", ".")) * precoProduto) /
      Number($("#compreD").val()).toFixed(2).replace(",", ".")
    );
    elemento.parent().parent().parent().find(".valorDescontadoD").val(res);
    elemento
      .parent()
      .parent()
      .parent()
      .find(".valorDescontadoD")
      .addClass("selecionado2");
    elemento
      .parent()
      .parent()
      .parent()
      .find(".valorDescontadoD")
      .css("color", "#f6b504 !important");
    elemento
      .parent()
      .parent()
      .parent()
      .find(".valorDescontadoD")
      .css("border", "2px solid #f6b504 !important");
    listaDescontos.levePague = {
      origem: origem,
      tipo: "levePague",
      precoProduto: precoProduto,
      valorDescontado:
        "leve " + $("#compreD").val() + " pague " + $("#pagueD").val(),
      precoFinal: res,
    };
  }
  ////console.log("calculei..." + tipo);
  // //console.log(precoProduto);
  // //console.log(listaDescontos)
  localStorage.listaDescontos = JSON.stringify(listaDescontos);
}

var contadorIds = 0;

function insereCategoria(elemento, outroElemento, texto) {
  ////////console.log(elemento,outroElemento, texto)
  ////////console.log(texto, "mandei")
  outroElemento.attr("id", "desmarcaInput" + contadorIds);
  var newID = "desmarcaInput" + contadorIds;
  if (texto.split(",").length == 0) {
    var html =
      '<div  class="input-group categoriaLabel">' +
      "<label  >" +
      texto +
      "</label>" +
      "<label onclick=\"removerei($(this),'" +
      newID +
      '\')"  class="iconClose  "><i class="far fa-times-circle"></i></label>' +
      "</div>";
    elemento.append(html);
  } else {
    var lista = texto.split(",");
    for (const k in lista) {
      var html =
        '<div  class="input-group categoriaLabel">' +
        "<label  >" +
        lista[k] +
        "</label>" +
        "<label  onclick=\"removerei($(this),'" +
        newID +
        '\')"  class="iconClose  "><i class="far fa-times-circle"></i></label>' +
        "</div>";
      elemento.append(html);
    }
  }
  contadorIds++;
  verFeedback();
}

function removerei(elemento, desmarcar) {
  ////////console.log(desmarcar,"rona3")
  if (elemento.parent().attr("removeStorage") == "relacionados") {
    localStorage.relacionados = localStorage.relacionados.replace(
      /$(this).parent().text()/g,
      ""
    );
  }
  elemento.parent().remove();
  $("#" + desmarcar)[0].checked = !$("#" + desmarcar)[0].checked;
  verFeedback();
}
function meDesmarca(texto) {
  ////////console.log(texto,'vou demsmarcar')
  $(".subSmart").each(function () {
    ////////console.log(texto.trim(),$(this).text().trim())
    if ($(this).text().trim() == texto.trim()) {
      $(this).find("input")[0].checked = !$(this).find("input")[0].checked;
    }
  });
}
function retornaCategorias(texto) {
  ////////console.log('texto')
  ////////console.log(texto)
  var listaEnviada = [];
  function confere(texto) {
    for (const u in listaEnviada) {
      ////////console.log(listaEnviada[u].replace(/,/g,''),texto.replace(/,/g,''))
      if (listaEnviada[u].replace(/,/g, "") == texto.replace(/,/g, "")) {
        return false;
      }
    }
    return true;
  }
  if (texto != null) {
    if (texto.split(",").length == 0) {
      var html =
        '<div  class="input-group categoriaLabel">' +
        "<label  >" +
        texto +
        "</label>" +
        "<label onclick=\"meDesmarca('" +
        texto +
        '\')"  class="iconClose"><i class="far fa-times-circle"></i></label>' +
        "</div>";

      if (confere(texto.replace(/,/, ""))) {
        listaEnviada.push(texto);
        return html;
      } else {
        return "";
      }
    } else {
      var lista = texto.split(","),
        result = "";
      for (const k in lista) {
        if (lista[k].trim() != "") {
          var html =
            '<div  class="input-group categoriaLabel">' +
            "<label  >" +
            lista[k] +
            "</label>" +
            "<label  onclick=\"meDesmarca('" +
            lista[k] +
            '\')"  class="iconClose"><i class="far fa-times-circle"></i></label>' +
            "</div>";

          ////////console.log(confere(lista[k]))
          ////////console.log(listaEnviada)
          if (confere(lista[k])) {
            listaEnviada.push(lista[k]);
            result += html;
          }
        }
      }
      if (
        result == undefined ||
        result == "undefined" ||
        result == null ||
        result == "null"
      ) {
        result = "";
      }

      return result;
    }
  }
  return "";
}

async function getProductData(EAN, elementParent, pai) {
  pai.addClass("animated-background");
  if (EAN != 0 && EAN != undefined && EAN != "" && EAN != null) {
    try {
      let picture = {
        thumbnail: URL_IMAGES + '/' + localStorage.AFFILIATE_ID + '/' + EAN + "/" + EAN + ".png",
      };
      if (picture.thumbnail != undefined) {
        var novo = true;
        for (const k in PRODUCTS_IMAGES) {
          if (EAN == PRODUCTS_IMAGES[k].EAN) {
            novo = false;
          }
        }
        if (novo) {
          PRODUCTS_IMAGES.push({
            EAN: EAN,
            DATA: picture,
          });
        }
      }

      try {
        pai.removeClass("animated-background");
        $.ajax({
          type: "POST",
          url: mainHost + "/productPictures",
          headers: {
            "x-access-token": localStorage.token,
          },
          data: {
            affiliate_id: $(elementParent).attr("affiliate_id"),
            product_code: $(elementParent).attr("product_code"),
          },
          success: function (data2) {
            $(elementParent)
              .find(".firstImage")
              .attr(
                "src",
                mainHost +
                "/images/" +
                $(elementParent).attr("affiliate_id") +
                "/" +
                $(elementParent).attr("product_code") +
                "/" +
                data2[0]
              );
          },
          error: function (data2) {
            ////////console.log(data2)
            try {
              if (data.responseJSON.message.indexOf("token") > -1) {
                //alert("Necessário fazer login!<br>"+data.responseJSON.message)
                setTimeout(() => {
                  localStorage.peregrino =
                    location.href.split("/")[
                    location.href.split("/").length - 1
                    ];
                  location.replace("/cms-login");
                }, 2000);
              }
            } catch (ee) { }
          },
          complete: function () {
            // ao final da requisição...
          },
        });
      } catch (erru) {
        PRODUCTS_IMAGES.push({
          EAN: EAN,
          DATA: picture,
        });
        $(elementParent)
          .find(".img")
          .css("background", "url(" + picture.thumbnail + ")");
        $(elementParent).find(".description").text(picture.description);
        $(elementParent)
          .find(".fullDescription")
          .attr("src", "THIS FULL DESCRIPTION FROM COSMOS");
        pai.removeClass("animated-background");
      }
    } catch (eru) { }
  } else {
  }
}

function getCatIconFromStorage(catName) {
  var CATS = JSON.parse(localStorage.MINHAS_CATEGORIAS);
  for (const k in CATS) {
    if (catName == CATS[k].affiliate_categorie_name) {
      return CATS[k].categorie_icon;
    }
  }
}

function getCategoriesAndSub(newsCATEGORIES, listaSelecionada = []) {
  var html3 = "",
    nova = '<li class="novaLI"></li>';

  if (!Array.isArray(listaSelecionada)) {
    listaSelecionada = listaSelecionada.split(",");
  }

  function getActive(text, listaSelecionada = []) {

    let eu = listaSelecionada.find((l) => l === text);
    if (eu) {
      return 'checked="true"';
    } else {
      ("");
    }
  }

  for (const k in newsCATEGORIES) {
    var content =
      '<ul class="listInner listInner2 sub-listInner2 animate__animated ">';
    html3 +=
      '<li    class="list-item sub-list-item animate__animated ">' +
      arrowDown4 +
      '<label style="max-width: 70%; float: left;    margin: 5px 15px ;" class=" subSmart subCheck animate__animated animate__"> <img   src="/assets/icons/' +
      newsCATEGORIES[k].icon +
      '" style="width: 30px; height: 30px; margin-top -10%"/> ';
    content += nova;
    if (newsCATEGORIES[k]?.subcategories?.length > 0) {
      var txtCategories = newsCATEGORIES[k].subcategories;
      for (const u in txtCategories) {
        content +=
          '<li   class="list-sub-item "><div class="row"><span style="border-top: 5px dotted silver !important;" class="trilha">..........</span><label class="subSmart  animate__animated animate__"><input ' +
          getActive(txtCategories[u].title, listaSelecionada) +
          ' class="marcar catPromocao"  myValue="' +
          txtCategories[u].title +
          "\"  onchange=\"subTagInputPromo($(this),'listaCategoriasFilter','" +
          txtCategories[u].title +
          '\')" type="checkbox"><span class="checkmark"></span>' +
          txtCategories[u].title +
          "</label></div></li> ";

        ////////////console.log(content)
      }
    }
    content += "</ul>";
    html3 +=
      newsCATEGORIES[k].title +
      " <input " +
      getActive(newsCATEGORIES[k].title, listaSelecionada) +
      ' class="marcar catPromocao"  myValue="' +
      newsCATEGORIES[k].title +
      "\" onchange=\"subTagInputPromo($(this),'listaCategoriasFilter','" +
      newsCATEGORIES[k].title +
      '\')" type="checkbox"><span class="checkmark subCheck"></span></label>';
    html3 += content + "</li> ";
  }

  return html3;
}

function getCategoriesAndSubToFilter(MY_CATEGORIES) {
  var html3 = "",
    nova = '<li class="novaLI"></li>';

  for (const k in MY_CATEGORIES) {
    var content =
      '<ul class="listInner listInner2 sub-listInner2 animate__animated ">';
    html3 +=
      '<li    class="list-item sub-list-item animate__animated targetBusca">' +
      arrowDown3 +
      '<label style="max-width: 70%; float: left;    margin: 5px 15px ;" class=" subSmart subCheck animate__animated animate__"> <img   src="/assets/icons/' +
      MY_CATEGORIES[k].icon +
      '" style="width: 30px; height: 30px; margin-top -10%"/> ';
    content += nova;
    if (MY_CATEGORIES[k]?.subcategories?.length > 0) {
      var txtCategories = MY_CATEGORIES[k]?.subcategories;
      for (const u in txtCategories) {
        content +=
          '<li   class="list-sub-item targetBusca"><div class="row"><span style="border-top: 5px dotted silver !important;" class="trilha">..........</span><label class="subSmart  animate__animated animate__"><input class="marcar" meEncontre="' +
          txtCategories[u].title +
          "\"  onchange=\"subTagInput($(this),'listaCategoriasFilter','" +
          txtCategories[u].title +
          '\')" type="checkbox"><span class="checkmark"></span>' +
          txtCategories[u].title +
          "</label></div></li> ";
      }
    }
    content += "</ul>";
    html3 +=
      MY_CATEGORIES[k].title +
      ' <input class="marcar" meEncontre=\'' +
      MY_CATEGORIES[k].title +
      "'  onchange=\"subTagInput($(this),'listaCategoriasFilter','" +
      MY_CATEGORIES[k].title +
      '\')" type="checkbox"><span class="checkmark subCheck"></span></label>';
    html3 += content + "</li> ";
  }

  return html3;
}

function getTagsAndMarcas(TEXTAO, tipo) {
  var html3 = "",
    nova = '<li class="novaLI"></li>';

  var LISTA_01 = TEXTAO.split(",");
  var elemento = "minhasMarcas";
  if (tipo == "tags") {
    elemento = "minhasTags2";
  }

  for (const k in LISTA_01) {
    if (LISTA_01[k] != "") {
      html3 +=
        '<li    class="list-item sub-list-item animate__animated targetBusca">' +
        arrowDown3 +
        '<label style="max-width: 70%; float: left;    margin: 5px 15px ;" class=" subSmart subCheck animate__animated animate__"> ';
      html3 +=
        LISTA_01[k] +
        ' <input class="marcar" meEncontre="' +
        LISTA_01[k] +
        '"  onchange="subTagInput($(this),\'' +
        elemento +
        "','" +
        LISTA_01[k] +
        '\')" type="checkbox"><span class="checkmark subCheck"></span></label>';
      html3 += "</li> ";
    }
  }

  return html3;
}

function subTagInput(ele, elemento, texto, e) {
  e = window.event;
  e.stopPropagation();

  var listaTags = "",
    listaMarcas = "";

  ////////console.log(elemento,texto)
  var html =
    '<div  class="input-group categoriaLabel  "><label  >' +
    texto +
    '</label><label action="' +
    elemento +
    '" onclick="removeTAGMARCA($(this))"  style="max-width: 20%"  class="iconClose"><i class="far fa-times-circle"></i></label></div>';
  ////////console.log("vou mostrar " ,ele[0].checked )
  if (ele[0].checked == true) {
    insereCategoria($("." + elemento), ele, texto);
  } else {
    $("." + elemento)
      .find(".categoriaLabel")
      .each(function () {
        if ($(this).text() == texto) {
          $(this).remove();
        }
      });
    verFeedback();
  }
}

function getAffiliateName(AFFILIATES, ID) {
  AFFILIATES = JSON.parse(localStorage.LOJAS_CADASTRADAS);
  // console.log("encontre", AFFILIATES, ID);
  for (const k in AFFILIATES) {
    if (AFFILIATES[k].id == Number(ID)) {
      return AFFILIATES[k].affiliates_business_name;
    }
  }
}

function produtoURL(EAN, PRODUCTS_IMAGES) {
  for (const k in PRODUCTS_IMAGES) {
    if (PRODUCTS_IMAGES[k].EAN == EAN) {
      return PRODUCTS_IMAGES[k];
    }
  }
  return {
    DATA: {
      thumbnail: URL_IMAGES + "/produto-sem-imagem.jpg",
      description: "sem informacoes",
      ncm: {
        full_description: "sem informacoes",
      },
    },
  };
}

function imageButtons(affiliate_id, product_code, URLS) {
  var html = "";
  // //console.log(URLS)

  if (URLS.length > 0) {
    for (const k in URLS) {
      if (k > 0) {
        var urlCurrent = URLS[k];
        var pictureName = null;
        if (URLS[k] != undefined) {
          var del =
            "<div onCLick=\"deletaImagen('secundaria','" +
            affiliate_id +
            "','" +
            product_code +
            "','" +
            urlCurrent +
            "','" +
            URLS[k] +
            '\', $(this))"  class="col-sm paiIcon2"><svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 21 21"  class="icoPopUpDelete superFica">&gt;<defs></defs><path class="a" d="M10.937,16H3.063A2.208,2.208,0,0,1,.875,13.778V2.666H.438a.444.444,0,0,1,0-.889H4.375V1.334A1.324,1.324,0,0,1,5.687,0H8.313A1.324,1.324,0,0,1,9.625,1.334v.444h3.937a.444.444,0,0,1,0,.889h-.437V13.778A2.208,2.208,0,0,1,10.937,16ZM1.75,2.666V13.778a1.325,1.325,0,0,0,1.313,1.334h7.875a1.325,1.325,0,0,0,1.313-1.334V2.666ZM5.687.889a.441.441,0,0,0-.437.445v.444h3.5V1.334A.441.441,0,0,0,8.313.889Zm3.5,11.556A.442.442,0,0,1,8.75,12V5.778a.437.437,0,1,1,.875,0V12A.441.441,0,0,1,9.188,12.445Zm-4.375,0A.441.441,0,0,1,4.375,12V5.778a.437.437,0,1,1,.875,0V12A.442.442,0,0,1,4.812,12.445Z" transform="translate(4 3)"></path></svg></div>';
          if (pictureName != null) {
            del = "";
          }
          html += `<li  draggable="true" picture_name="${URLS[k]}"  class=" thumbProduct "><figure class="figurefx pushup"><img   id="${affiliate_id}_${product_code}_${k}" class="imageThumb notCrash firstImage droptarget" src="${urlCurrent}"><figcaption  onmouseleave="mLeave($(this))"  onmouseover="mOver($(this))" class="miuda figcaption2">${del}<br>${moveButton2}</figcaption></figure></li>`;
        }
      }
    }
  }
  console.log(URLS)
  return html;
}

function imageShows(affiliate_id, product_code, URLS) {
  ////////console.log("URLS")
  ////////console.log(URLS)
  var html = "";
  var urlCurrent = "";

  var pictureName = null;
  if (URLS == null) {
    urlCurrent = URL_IMAGES + "/produto-sem-imagem.jpg";
  } else {
    if (URLS.indexOf("produto-sem-imagem") > -1) {
      urlCurrent = URL_IMAGES + "/produto-sem-imagem.jpg";
    } else {
      if (urlCurrent == "" || urlCurrent == null || urlCurrent == undefined) {
        if (URLS != undefined) {
          if (URLS.indexOf("http") > -1) {
            urlCurrent = URLS;
          } else {
            urlCurrent =
              mainHost +
              "/images/" +
              affiliate_id +
              "/" +
              product_code +
              "/" +
              URLS;
            pictureName = URLS;
          }
        } else {
          urlCurrent = URL_IMAGES + "/produto-sem-imagem.jpg";
        }
      }
    }
  }

  var del =
    "<div onCLick=\"deletaImagen('principal','" +
    affiliate_id +
    "','" +
    product_code +
    "','" +
    urlCurrent +
    "','" +
    URLS +
    '\', $(this))"  class="col-sm paiIcon"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 21 21" class="icoPopUpDelete" >&gt;<defs></defs><path class="a" d="M10.937,16H3.063A2.208,2.208,0,0,1,.875,13.778V2.666H.438a.444.444,0,0,1,0-.889H4.375V1.334A1.324,1.324,0,0,1,5.687,0H8.313A1.324,1.324,0,0,1,9.625,1.334v.444h3.937a.444.444,0,0,1,0,.889h-.437V13.778A2.208,2.208,0,0,1,10.937,16ZM1.75,2.666V13.778a1.325,1.325,0,0,0,1.313,1.334h7.875a1.325,1.325,0,0,0,1.313-1.334V2.666ZM5.687.889a.441.441,0,0,0-.437.445v.444h3.5V1.334A.441.441,0,0,0,8.313.889Zm3.5,11.556A.442.442,0,0,1,8.75,12V5.778a.437.437,0,1,1,.875,0V12A.441.441,0,0,1,9.188,12.445Zm-4.375,0A.441.441,0,0,1,4.375,12V5.778a.437.437,0,1,1,.875,0V12A.442.442,0,0,1,4.812,12.445Z" transform="translate(4 3)"></path></svg></div>';

  if (pictureName != null) {
    del = "";
  }

  html += `<div draggable="true" class="  thumbProduct mainImageThumb" ><figure class="figurefx pushup"><img   id="${affiliate_id}_${product_code}" class="firstImageShow mainImageShow notCrash droptarget" src="${urlCurrent}"  onError="this.onerror=null;this.src='' + URL_IMAGES + '/produto-sem-imagem.jpg';" ><figcaption  onmouseleave="mLeave($(this))"  onmouseover="mOver($(this))" class="droptarget">${del} <br>${moveButton}<span class="textFig">Imagem Principal</span></figcaption></figure></div>`;

  ////////////console.log(html)
  return html;
}

function deletaImagen(
  origem,
  affiliate_id,
  product_code,
  picture_url,
  picture_name,
  elemento
) {
  ////////console.log(origem)
  var alerta = bootbox.confirm({
    message:
      '<br> <h4 >Deseja deletar a imagem abaixo?</h4l><hr><img   src="' +
      picture_url +
      '" class=" notCrash" style=" width: 100%;  max-height: 20vh;  max-width: 20vh;  margin: auto;">',
    buttons: {
      confirm: {
        label: "Sim",
        className: "btn-light",
      },
      cancel: {
        label: "Não",
        className: "btn-light",
      },
    },
    onShow: function () {
      $(this)[0].id = "modalInner";
      $("#modalInner").find(".modal-dialog").addClass("modalCentral");
      $("#modalInner").find(".modal-body").addClass("modalCentralInner");
      $("#modalMain").addClass("filterBlur");

      $(".bootbox-accept").text("DELETAR");
      $(".bootbox-cancel").text("CANCELAR");

      $(".modal-footer").show();
      $(".bootbox-accept").show();

      $(".bootbox-accept").css("float", "right");
      $(".bootbox-cancel").css("float", "right");
      $(".bootbox-cancel").css("border", "2px soldi #f6b504");
      $(".bootbox-accept").css("border", "2px soldi #f6b504");
    },
    callback: function (result) {
      if (result) {
        if (origem == "principal") {
          $(".firstImageShow").attr(
            "src",
            URL_IMAGES + "/produto-sem-imagem.jpg"
          );
          imagenPadrao(
            product_code,
            product_code,
            URL_IMAGES + "/produto-sem-imagem.jpg"
          );
        }
        $.ajax({
          type: "POST",
          url: mainHost + "/deletePicture",
          headers: {
            "x-access-token": localStorage.token,
          },
          data: {
            affiliate_id: affiliate_id,
            picture_name: picture_name,
            product_code: product_code,
          },
          success: function (data) {
            ////////////console.log(data)
            elemento.parent().parent().parent().remove();
          },
          error: function (data) {
            ////////////console.log(data)
            if (data.responseJSON.message.indexOf("token") > -1) {
              //alert("Necessário fazer login!<br>"+data.responseJSON.message)
              setTimeout(() => {
                localStorage.peregrino =
                  location.href.split("/")[location.href.split("/").length - 1];
                location.replace("/cms-login");
              }, 2000);
            } else {
              //alert("Algo saiu errado!<br>"+data.responseJSON.message)
            }
          },
          complete: function () {
            atualizaListaProdutos();
          },
        });
      }
    },
  });
  $(".modal-footer").show();
}

function imagenPadrao(product_ean, product_code, URL) {
  var imageURL = URL;

  ////////////console.log(imageURL )

  $.ajax({
    type: "POST",
    url: mainHost + "/definePicture",
    headers: {
      "x-access-token": localStorage.token,
    },
    data: {
      product_affiliate_id: AFFILIATE_ID,
      product_thumbnail: imageURL,
      product_code: product_code,
    },
    success: function (data) {
      ////////////console.log(data)
      $("#" + product_ean).attr("src", imageURL);
    },
    error: function (data) {
      ////////////console.log(data)
      if (data.responseJSON.message.indexOf("token") > -1) {
        //alert("Necessário fazer login!<br>"+data.responseJSON.message)
        setTimeout(() => {
          localStorage.peregrino =
            location.href.split("/")[location.href.split("/").length - 1];
          location.replace("/cms-login");
        }, 2000);
      } else {
        //alert("Algo saiu errado!<br>"+data.responseJSON.message)
      }
    },
    complete: function () { },
  });
}

function getTagEspecial(texto, icone) {
  var tags = [];
  if (texto != null) {
    tags = texto.split(",");
  }
  var html = "";
  for (const k in tags) {
    if (tags[k] != "") {
      html +=
        '<div style="width: 80px; padding-top: 5px" class="sTag">' +
        icone +
        ' <label  class="tagAmostra">' +
        tags[k] +
        "</label>" +
        "</div>";
    }
  }
  return html;
}

function getSimilarProducts(product_data, limite) {
  var html = "",
    contador = 0,
    pesoUnitario = "",
    valorComDesconto = "";
  for (const k in product_data) {
    if (product_data[k] != undefined) {
      var precoComum = product_data[k].product_valor;
      if (
        product_data[k].product_valor == null ||
        product_data[k].product_valor == undefined ||
        product_data[k].product_valor == ""
      ) {
        precoComum = product_data[k].product_valor;
      }
      valorComDesconto =
        '<span class="preco2">R$ ' +
        Number(precoComum.toFixed(2)).toLocaleString() +
        "</span>";
      contador++;
      var precoDescontado = precoComum;

      if (contador <= limite) {
        if (
          product_data[k].product_site_discount_value != "" &&
          product_data[k].product_site_discount_value != null
        ) {
          var descontos = JSON.parse(
            product_data[k].product_site_discount_value
          );
          var mostra = product_data[k].product_site_discount_value;
          ////////////console.log("descontos ", product_data[k].product_site_name)
          ////////////console.log(mostra)
          if (descontos != null) {
            precoDescontado = descontos.subtracao.precoFinal;
            ////////////console.log(precoDescontado)
            if (precoDescontado != null && precoDescontado != "null") {
              valorComDesconto =
                '<span class="preco2">R$ ' +
                precoDescontado +
                ' <span class="desconto2">R$ ' +
                Number(precoComum.toFixed(2)).toLocaleString() +
                "</span></span>";
            }
          }
          ////////////console.log("valorComDesconto")
          ////////////console.log(valorComDesconto)
        }
        if (
          product_data[k].product_average_weight_value != "" &&
          product_data[k].product_average_weight_value != null
        ) {
          pesoUnitario =
            '<span class="metricas">1 unidade - aproximadamente ' +
            product_data[k].product_average_weight_value +
            " " +
            product_data[k].product_average_weight_type +
            "</span>";
        } else {
          pesoUnitario =
            '<span style="opacity: 0" class="metricas">1 unidade - aproximadamente ' +
            product_data[k].product_average_weight_value +
            " " +
            product_data[k].product_average_weight_type +
            "</span>";
        }
        var product_name = product_data[k].product_site_name;
        if (
          product_data[k].product_site_name == undefined ||
          product_data[k].product_site_name == null ||
          product_data[k].product_site_name == ""
        ) {
          product_name = product_data[k].product_descricao;
        }

        html +=
          '<div class="card" style="width: 200px; border-radius: 15px; margin-left: 10px">' +
          '<ul class="list-group list-group-flush">' +
          '<li class="list-group-item noBorder" style="z-index: 1;background: transparent;height: 90px;">' +
          '<div class="row" style="    margin-right: -23px;margin-left: -34px;">' +
          '<div class="col-md-4">' +
          getTagEspecial(
            product_data[k].product_site_tags,
            '<i class="fas fa-heart"></i>'
          ) +
          "</div>" +
          '<div class="col-md-8">' +
          '<div style="float:right; border-radius: 15px 0 0 15px;margin-right: -10%;padding: 5%;min-width: 40px;" class="sTag">' +
          '<i class="fas fa-clipboard-list"></i>' +
          "</div>" +
          "</div>" +
          "</div>" +
          "</li>" +
          '<li class="list-group-item  noBorder mainPicture listaThumb" style=" background: url(' +
          produtoURL(product_data[k].product_ean, PRODUCTS_IMAGES).DATA
            .thumbnail +
          '), url(' + URL_IMAGES + '/produto-sem-imagem.jpg);">' +
          '<img   class="productImageThumb"  /> ' +
          "</li>" +
          '<li style="line-height: 0.2; height: 235px" class="list-group-item noBorder">' +
          '<span class="fabricacao">' +
          product_data[k].product_fabricacao +
          "</span>" +
          '<h3 class="tituloProdutoThumb">' +
          product_name +
          "</h3>" +
          pesoUnitario +
          '<br><span class="stars">' +
          '<i class="fas fa-star"></i>' +
          '<i class="fas fa-star"></i>' +
          '<i class="fas fa-star"></i>' +
          '<i class="fas fa-star"></i>' +
          '<i class="fas fa-star"></i>' +
          "</span><br><br><br>" +
          valorComDesconto +
          "<br><br>" +
          "</li>" +
          '<li style=" border-top: 1px solid #6A6A6A26 !important;text-align: center" class="list-group-item borderedTop">' +
          '<label class="label" style="margin:auto; color: #f6b504 !important; font-size: 1.2rem;     display: inline-flex;">' +
          market2 +
          " Adicionar </label>" +
          "</li>" +
          "</ul>" +
          "</div>";
      }
    }
  }
  return html;
}

function getCardsProducts(elementContainer, tag, texto, limite) {
  var loading =
    '<div style="width: 50px;height: 50px; margin: auto 25px" class="spinner-border text-warning" role="status"><span class="sr-only">Loading...</span></div>';
  elementContainer.html(loading);
  $.ajax({
    type: "POST",
    url: mainHost + "/productSearch",
    data: {
      totalItems: 4,
      lastID: 0,
      product_code: texto,
      product_affiliate_id: localStorage.AFFILIATE_ID,
      product_site_name: texto,
    },
    success: function (data) {
      localStorage.resultSearch = JSON.stringify(data);
      elementContainer.html("");
      for (const k in data) {
        var html =
          '<div product_code="' +
          data[k].product_code +
          '"  class="card PRDseleciona" style="width: 18%; border-radius: 15px; margin-left: 10px;   max-height: 200px">' +
          '<ul class="list-group list-group-flush">' +
          '<li class="list-group-item noBorder" style="border-bottom: none">' +
          iconGridMini2 +
          '<label class="numberCat">' +
          data[k].product_code +
          "</label>" +
          '<label onclick="removeThis2($(this))" remove="relacionados" style="float: right;margin-right: -10px;"  class="iconClose2"><i class="far fa-times-circle"></i></label>' +
          "</li>" +
          '<li class="list-group-item  noBorder mainPicture"  style="border-bottom: none">' +
          '<img   class="productImageThumb" src="' +
          produtoURL(data[k].product_ean, PRODUCTS_IMAGES).DATA.thumbnail +
          '" /> ' +
          "</li>" +
          '<li style="line-height: 0.2;    max-height: 70px;" class="list-group-item noBorder"  style="border-top: none">' +
          '<h3 class="tituloProdutoMini">' +
          data[k].product_site_name +
          "</h3>" +
          "</li>" +
          "</ul>" +
          "</div>";
        elementContainer.append(html);
      }
    },
    error: function (data) {
      ////////////console.log(data)
    },
    complete: function () {
      // ao final da requisição...
    },
  });
}
$("#novoProduto").click(function () {
  var model = [
    {
      id: null,
      product_affiliate_id: AFFILIATE_ID,
      product_categoria: "",
      product_code: 0,
      product_descricao: "",
      product_ean: 0,
      product_estoque: 0,
      product_etiquetas: "",
      product_fabricacao: "",
      product_medida: "",
      product_thumbnail: null,
      product_valor: 0.0,
    },
  ];
  modalProduct(model, null, AFFILIATE_ID, []);
});

function acaoCheckbox(elemento, e) {
  e = window.event;
  ////console.log("status do elemento",elemento, elemento[0].checked)

  var status = "inactive",
    add = true;
  if (elemento[0].checked == false) {
    elemento.removeAttr("checked");
    status = "inactive";
    add = false;
  } else {
    elemento.attr("checked", "true");
    status = "active";
  }
  ////console.log(elemento.attr("checked"))
  var detalhe = getProductCaract(elemento.attr("product_code"));
  ////console.log("cliquei no checkbox")
  ////console.log(detalhe)

  switch (elemento.attr("acao")) {
    case "nutricao":
      break;
    case "compraPorPeso":
      break;
    case "informacaoImportante":
      break;
    case "ativarProduto":
      ////console.log("tentando ativar " )
      setProductCaract(elemento.attr("product_code"), "product_status", status);
      $.ajax({
        type: "POST",
        url: mainHost + "/updateById",
        headers: {
          "x-access-token": localStorage.token,
        },
        data: {
          table: "product_details",
          name_id: "id",
          value_id: detalhe.id,
          fields: [
            {
              column: "product_affiliate_id",
              value: detalhe.product_affiliate_id,
            },
            {
              column: "product_code",
              value: detalhe.product_code,
            },
            {
              column: "product_status",
              value: status,
            },
            {
              column: "product_site_name",
              value: detalhe.product_site_name,
            },
            {
              column: "product_site_description",
              value: detalhe.product_site_description,
            },
            {
              column: "product_site_categories",
              value: detalhe.product_site_categories,
            },
            {
              column: "product_site_tags",
              value: detalhe.product_site_tags,
            },
            {
              column: "product_site_variations",
              value: detalhe.product_site_variations,
            },
            {
              column: "product_site_info",
              value: detalhe.product_site_info,
            },
            {
              column: "product_site_nutrition",
              value: detalhe.product_site_nutrition,
            },
            {
              column: "product_site_value",
              value: Number(detalhe.product_site_value),
            },
            {
              column: "product_site_discount_value",
              value: detalhe.product_site_discount_value,
            },
            {
              column: "product_site_discount_type",
              value: detalhe.product_site_discount_type,
            },

            {
              column: "product_average_weight_type",
              value: detalhe.product_average_weight_type,
            },
            {
              column: "product_average_weight_value",
              value: Number(detalhe.product_average_weight_value),
            },

            {
              column: "product_site_related_title",
              value: detalhe.product_site_related_title,
            },
            {
              column: "product_site_related_type",
              value: detalhe.product_site_related_type,
            },
            {
              column: "product_site_related_code",
              value: detalhe.product_site_related_code,
            },
          ],
        },
        success: function (data) {
          ////console.log(data)
        },
        error: function (data) {
          ////console.log(data)
          if (data.responseJSON.message.indexOf("token") > -1) {
            //alert("Necessário fazer login!<br>"+data.responseJSON.message)
            setTimeout(() => {
              localStorage.peregrino =
                location.href.split("/")[location.href.split("/").length - 1];
              location.replace("/cms-login");
            }, 2000);
          } else {
            //alert("Algo saiu errado!<br>"+data.responseJSON.message)
          }
        },
        complete: function () {
          // ao final da requisição...
        },
      });
      break;
    case "tipoDesconto":
      ////////////console.log("ai o add => "+add)
      var desconto = elemento.attr("tipoDesconto");
      var txtDescontos = desconto;
      localStorage.textoDescontos = desconto;
      $.ajax({
        type: "POST",
        url: mainHost + "/updateById",
        headers: {
          "x-access-token": localStorage.token,
        },
        data: {
          table: "product_details",
          name_id: "id",
          value_id: detalhe.id,
          fields: [
            {
              column: "product_affiliate_id",
              value: detalhe.product_affiliate_id,
            },
            {
              column: "product_code",
              value: detalhe.product_code,
            },
            {
              column: "product_status",
              value: detalhe.product_status,
            },
            {
              column: "product_site_name",
              value: detalhe.product_site_name,
            },
            {
              column: "product_site_description",
              value: detalhe.product_site_description,
            },
            {
              column: "product_site_categories",
              value: detalhe.product_site_categories,
            },
            {
              column: "product_site_tags",
              value: detalhe.product_site_tags,
            },
            {
              column: "product_site_variations",
              value: detalhe.product_site_variations,
            },
            {
              column: "product_site_info",
              value: detalhe.product_site_info,
            },
            {
              column: "product_site_nutrition",
              value: detalhe.product_site_nutrition,
            },
            {
              column: "product_site_value",
              value: Number(detalhe.product_site_value),
            },
            {
              column: "product_site_discount_value",
              value: detalhe.product_site_discount_value,
            },
            {
              column: "product_site_discount_type",
              value: txtDescontos,
            },
            {
              column: "product_average_weight_type",
              value: detalhe.product_average_weight_type,
            },
            {
              column: "product_average_weight_value",
              value: Number(detalhe.product_average_weight_value),
            },
            {
              column: "product_site_related_title",
              value: detalhe.product_site_related_title,
            },
            {
              column: "product_site_related_type",
              value: detalhe.product_site_related_type,
            },
            {
              column: "product_site_related_code",
              value: detalhe.product_site_related_code,
            },
          ],
        },
        success: function (data) {
          ////////////console.log(data)
        },
        error: function (data) {
          ////////////console.log(data)
          if (data.responseJSON.message.indexOf("token") > -1) {
            //alert("Necessário fazer login!<br>"+data.responseJSON.message)
            setTimeout(() => {
              localStorage.peregrino =
                location.href.split("/")[location.href.split("/").length - 1];
              location.replace("/cms-login");
            }, 2000);
          } else {
            //alert("Algo saiu errado!<br>"+data.responseJSON.message)
          }
        },
        complete: function () {
          // ao final da requisição...
        },
      });
      break;

    case "relacionados":
      ////////////console.log("ai o add => "+add)
      var tipoRelacionamento = elemento.attr("tipoRelacionamento");

      var relacionamentos = "";
      if (localStorage.relacionamentos == undefined) {
        localStorage.relacionamentos = "," + tipoRelacionamento;
        relacionamentos = localStorage.relacionamentos;
      } else {
        ////////////console.log("passo 1 ")
        relacionamentos = localStorage.relacionamentos;
        if (relacionamentos.indexOf(tipoRelacionamento) > -1) {
          ////////////console.log("passo 2 ")
          if (add == false) {
            ////////////console.log("passo 3 ")
            relacionamentos = relacionamentos.replace(
              "," + tipoRelacionamento,
              ""
            );
          }
        } else {
          ////////////console.log("passo ERRO ")
          relacionamentos += "," + tipoRelacionamento;
        }
      }

      localStorage.relacionamentos = relacionamentos;

      $.ajax({
        type: "POST",
        url: mainHost + "/updateById",
        headers: {
          "x-access-token": localStorage.token,
        },
        data: {
          table: "product_details",
          name_id: "id",
          value_id: detalhe.id,
          fields: [
            {
              column: "product_affiliate_id",
              value: detalhe.product_affiliate_id,
            },
            {
              column: "product_code",
              value: detalhe.product_code,
            },
            {
              column: "product_status",
              value: detalhe.product_status,
            },
            {
              column: "product_site_name",
              value: detalhe.product_site_name,
            },
            {
              column: "product_site_description",
              value: detalhe.product_site_description,
            },
            {
              column: "product_site_categories",
              value: detalhe.product_site_categories,
            },
            {
              column: "product_site_tags",
              value: detalhe.product_site_tags,
            },
            {
              column: "product_site_variations",
              value: detalhe.product_site_variations,
            },
            {
              column: "product_site_info",
              value: detalhe.product_site_info,
            },
            {
              column: "product_site_nutrition",
              value: detalhe.product_site_nutrition,
            },
            {
              column: "product_site_value",
              value: Number(detalhe.product_site_value),
            },
            {
              column: "product_site_discount_value",
              value: detalhe.product_site_discount_value,
            },
            {
              column: "product_site_discount_type",
              value: detalhe.product_site_related_title,
            },
            {
              column: "product_average_weight_type",
              value: detalhe.product_site_discount_type,
            },
            {
              column: "product_average_weight_value",
              value: Number(detalhe.product_average_weight_value),
            },
            {
              column: "product_site_related_title",
              value: detalhe.product_site_related_title,
            },
            {
              column: "product_site_related_type",
              value: relacionamentos,
            },
            {
              column: "product_site_related_code",
              value: detalhe.product_site_related_code,
            },
          ],
        },
        success: function (data) {
          ////////////console.log(data)
        },
        error: function (data) {
          ////////////console.log(data)
          if (data.responseJSON.message.indexOf("token") > -1) {
            //alert("Necessário fazer login!<br>"+data.responseJSON.message)
            setTimeout(() => {
              localStorage.peregrino =
                location.href.split("/")[location.href.split("/").length - 1];
              location.replace("/cms-login");
            }, 2000);
          } else {
            //alert("Algo saiu errado!<br>"+data.responseJSON.message)
          }
        },
        complete: function () {
          // ao final da requisição...
        },
      });
      break;

    default:
      break;
  }

  e.stopPropagation();
}

function getProductCaract(product_code) {
  ////////console.log('product_code')
  ////////console.log(product_code)
  var MY_PRD = [],
    enviou = false,
    vouRetornar = [];
  if (
    localStorage.PRODUCTS_SEARCH == undefined ||
    localStorage.PRODUCTS_SEARCH == ""
  ) {
  } else {
    MY_PRD = JSON.parse(localStorage.PRODUCTS_SEARCH);
  }

  if (MY_PRD.length > 0) {
    for (const k in MY_PRD) {
      if (MY_PRD[k].product_code == product_code) {
        enviou = true;
        vouRetornar = MY_PRD[k];
        break;
      }
    }
  } else {
    if (
      localStorage.resultSearch == undefined ||
      localStorage.resultSearch == ""
    ) {
    } else {
      MY_PRD = JSON.parse(localStorage.resultSearch);
      for (const k in MY_PRD) {
        if (MY_PRD[k].product_code == product_code) {
          enviou = true;
          vouRetornar = MY_PRD[k];
          break;
        }
      }
    }
  }

  if (vouRetornar.length > 0) {
    return vouRetornar;
  } else {
    if (
      localStorage.resultSearch == undefined ||
      localStorage.resultSearch == ""
    ) {
    } else {
      MY_PRD = JSON.parse(localStorage.resultSearch);
      for (const k in MY_PRD) {
        if (MY_PRD[k].product_code == product_code) {
          enviou = true;
          vouRetornar = MY_PRD[k];
          break;
        }
      }
    }
    if (vouRetornar.length == 0) {
      ////////console.log(localStorage.relacionados)

      let RELACIONADOS = [];
      try {
        RELACIONADOS = JSON.parse(localStorage.relacionados);
      } catch (e) { }

      MY_PRD = RELACIONADOS;
      for (const k in MY_PRD) {
        if (MY_PRD[k].product_code == product_code) {
          enviou = true;
          vouRetornar = MY_PRD[k];
          break;
        }
      }
      return vouRetornar;
    } else {
      return vouRetornar;
    }
  }
}

function setProductCaract(product_code, column, newValue) {
  ////////console.log('product_code')
  ////////console.log(product_code)
  var MY_PRD = [],
    enviou = false,
    vouRetornar = [];
  if (
    localStorage.PRODUCTS_SEARCH == undefined ||
    localStorage.PRODUCTS_SEARCH == ""
  ) {
  } else {
    MY_PRD = JSON.parse(localStorage.PRODUCTS_SEARCH);
  }

  if (MY_PRD.length > 0) {
    for (const k in MY_PRD) {
      if (MY_PRD[k].product_code == product_code) {
        enviou = true;
        MY_PRD[k][column] = newValue;
        vouRetornar = MY_PRD[k];
        break;
      }
    }
    localStorage.resultSearch = JSON.stringify(MY_PRD);
  } else {
    if (
      localStorage.resultSearch == undefined ||
      localStorage.resultSearch == ""
    ) {
    } else {
      MY_PRD = JSON.parse(localStorage.resultSearch);
      for (const k in MY_PRD) {
        if (MY_PRD[k].product_code == product_code) {
          enviou = true;
          MY_PRD[k][column] = newValue;
          vouRetornar = MY_PRD[k];
          break;
        }
      }
    }

    localStorage.resultSearch = JSON.stringify(MY_PRD);
  }

  if (vouRetornar.length > 0) {
    vouRetornar[column] = newValue;
    return vouRetornar;
  } else {
    if (
      localStorage.resultSearch == undefined ||
      localStorage.resultSearch == ""
    ) {
    } else {
      MY_PRD = JSON.parse(localStorage.resultSearch);
      for (const k in MY_PRD) {
        if (MY_PRD[k].product_code == product_code) {
          enviou = true;
          MY_PRD[k][column] = newValue;
          vouRetornar = MY_PRD[k];
          break;
        }
      }

      localStorage.resultSearch = JSON.stringify(MY_PRD);
    }
    if (vouRetornar.length == 0) {
      ////////console.log(localStorage.relacionados)
      MY_PRD = JSON.parse(localStorage.relacionados);
      for (const k in MY_PRD) {
        if (MY_PRD[k].product_code == product_code) {
          enviou = true;
          MY_PRD[k][column] = newValue;
          vouRetornar = MY_PRD[k];
          break;
        }
      }
      localStorage.resultSearch = JSON.stringify(MY_PRD);
      vouRetornar[column] = newValue;
      return vouRetornar;
    } else {
      localStorage.resultSearch = JSON.stringify(MY_PRD);
      vouRetornar[column] = newValue;
      return vouRetornar;
    }
  }
}

function getProductCaract_local(product_code) {
  var MY_PRD = [];
  //////////console.log("product_code")
  //////////console.log(product_code)
  MY_PRD = JSON.parse(localStorage.PRODUCTS_RELATEDS);

  for (const k in MY_PRD) {
    if (MY_PRD[k].product_code == product_code) {
      return MY_PRD[k];
    }
  }
}

function updateField(elemento) {
  var product_code = elemento.attr("product_code");
  var acao = elemento.attr("acao");
  var valor = elemento.val();
  var detalhe = getProductCaract(product_code);
  ////console.log('detalhe')
  /////console.log(detalhe)

  let VALOR_FINAL_PRODUTO = Number(detalhe.product_site_value);
  if (acao == "product_average_weight_value") {
    switch (detalhe.product_average_weight_type) {
      case "gramas":
        VALOR_FINAL_PRODUTO = (detalhe.product_valor / 1000) * valor;
        $("#valorProdutoFinal").val(Number(VALOR_FINAL_PRODUTO.toFixed(2)));
        break;

      case "centimetros":
        VALOR_FINAL_PRODUTO = (detalhe.product_valor / 100) * valor;
        $("#valorProdutoFinal").val(Number(VALOR_FINAL_PRODUTO.toFixed(2)));
        break;

      default:
        break;
    }
  }

  var lista = [
    {
      column: "product_affiliate_id",
      value: detalhe.product_affiliate_id,
    },
    {
      column: "product_code",
      value: detalhe.product_code,
    },
    {
      column: "product_status",
      value: detalhe.product_status,
    },
    {
      column: "product_site_name",
      value: detalhe.product_site_name,
    },
    {
      column: "product_site_fabricacao",
      value: detalhe.product_site_fabricacao,
    },
    {
      column: "product_site_estoque",
      value: detalhe.product_site_estoque,
    },
    {
      column: "product_site_ean",
      value: detalhe.product_site_ean,
    },
    {
      column: "product_site_description",
      value: detalhe.product_site_description,
    },
    {
      column: "product_site_categories",
      value: detalhe.product_site_categories,
    },
    {
      column: "product_site_tags",
      value: detalhe.product_site_tags,
    },
    {
      column: "product_site_variations",
      value: detalhe.product_site_variations,
    },
    {
      column: "product_site_info",
      value: detalhe.product_site_info,
    },
    {
      column: "product_site_nutrition",
      value: detalhe.product_site_nutrition,
    },
    {
      column: "product_site_value",
      value: VALOR_FINAL_PRODUTO,
    },
    {
      column: "product_site_discount_value",
      value: detalhe.product_site_discount_value,
    },
    {
      column: "product_site_discount_type",
      value: detalhe.product_site_discount_type,
    },
    {
      column: "product_average_weight_type",
      value: detalhe.product_average_weight_type,
    },
    {
      column: "product_average_weight_value",
      value: Number(detalhe.product_average_weight_value),
    },
    {
      column: "product_site_related_title",
      value: detalhe.product_site_related_title,
    },
    {
      column: "product_site_related_type",
      value: detalhe.product_site_related_type,
    },
    {
      column: "product_site_related_code",
      value: detalhe.product_site_related_code,
    },
  ];
  for (const k in lista) {
    if (acao == lista[k].column) {
      if (acao == "product_average_weight_value") {
        valor = Number(valor);
      }
      lista[k].value = valor;
    }
  }
  var txt = JSON.stringify(lista);
  // //console.log(lista)
  $.ajax({
    type: "POST",
    url: mainHost + "/updateById",
    headers: {
      "x-access-token": localStorage.token,
    },
    data: {
      table: "product_details",
      name_id: "id",
      value_id: detalhe.id,
      fields: JSON.parse(txt),
    },
    success: function (data) {
      //  //console.log(data)
      elemento.css("color", "#f6b504");

      atualizaListaProdutos();
    },
    error: function (data) {
      elemento.css("color", "red");
      ////////////console.log(data)
      if (data.responseJSON.message.indexOf("token") > -1) {
        //alert("Necessário fazer login!<br>"+data.responseJSON.message)
        setTimeout(() => {
          localStorage.peregrino =
            location.href.split("/")[location.href.split("/").length - 1];
          location.replace("/cms-login");
        }, 2000);
      } else {
        //alert("Algo saiu errado!<br>"+data.responseJSON.message)
      }
    },
    complete: function () {
      // ao final da requisição...
    },
  });
}

function addTags(product_code, element, elementParent) {
  var TAGS = [];
  try {
    TAGS = JSON.parse(localStorage.CURRENT_TAGS_PRODUCT);
  } catch (err) {
    ////////////console.log(err)
  }
  if (TAGS.length > 0) {
    insereCategoria(elementParent, element, texto);
  } else {
    insereCategoria(elementParent, element, texto);
  }
}

function cardSelecionado(product_data) {
  /*
    var html = '<div  product_code="' + product_data.product_code + '" class="col-md-12 produtoParaPromocao">' +
        '<div style="margin: auto !important; border: 1px solid #EDF2F6; max-width: 80% !important"  class="input-group categoriaLabel2">' +
        '<div style="margin: auto; border: none" class="input-group  ico dropItems">' +
        '<div class="col-md-2 imgProcuraProduto" style="background: url(' + produtoURL(product_data.product_ean, PRODUCTS_IMAGES).DATA.thumbnail + ')"></div>' +
        "</div>" +
        '<label class="innerLabel PRD_code">' +
        product_data.product_code +
        "</label>" +
        "<label  >" +
        product_data.product_descricao +
        "</label>" +
        '<label remove="relacionados" id="' + product_data.product_code + '_elimina" class="iconClose"><i class="far fa-times-circle"></i></label>' +
        "</div>" +
        "</div><br>";
        */
  var product_name = product_data.product_site_name;
  if (
    product_data.product_site_name == null ||
    product_data.product_site_name == undefined ||
    product_data.product_site_name == ""
  ) {
    product_name = product_data.product_descricao;
  }
  var html =
    '<div product_code="' +
    product_data.product_code +
    '" class="card PRDseleciona"   style="width: 18%; border-radius: 15px; margin-left: 10px; max-height: 200px">' +
    '<ul class="list-group list-group-flush">' +
    '<li class="list-group-item noBorder" style="border-bottom: none">' +
    iconGridMini2 +
    '<label class="numberCat">' +
    product_data.product_code +
    "</label>" +
    '<label product_code="' +
    product_data.product_code +
    '" product_code="' +
    product_data.product_code +
    '" onclick="removeThis2($(this))" product_code="' +
    product_data.product_code +
    '" remove="relacionados" style="float: right;margin-right: -10px;"  class="iconClose2"><i class="far fa-times-circle"></i></label>' +
    "</li>" +
    '<li class="list-group-item  noBorder mainPicture"  style="border-bottom: none">' +
    '<img   class="productImageThumb" src="' +
    produtoURL(product_data.product_ean, PRODUCTS_IMAGES).DATA.thumbnail +
    '" /> ' +
    "</li>" +
    '<li style="line-height: 0.2;    max-height: 70px;" class="list-group-item noBorder"  style="border-top: none">' +
    '<h3 class="tituloProdutoMini">' +
    product_name +
    "</h3>" +
    "</li>" +
    "</ul>" +
    "</div>";

  return html;
}

function cardSelecionado2(lista) {
  var html = "";
  //////////console.log("lista")
  //////////console.log(lista)
  if (lista != null) {
    if (lista.length > 0) {
      for (const k in lista) {
        var product_data = getProductCaract_local(lista[k]);
        //////////console.log("product_data")
        //////////console.log(product_data)
        if (product_data != undefined) {
          var product_name = product_data.product_site_name;
          if (
            product_data.product_site_name == null ||
            product_data.product_site_name == undefined ||
            product_data.product_site_name == ""
          ) {
            product_name = product_data.product_descricao;
          }

          html +=
            '<div product_code="' +
            product_data.product_code +
            '" class="card PRDseleciona"   style="width: 18%; border-radius: 15px; margin-left: 10px; max-height: 200px">' +
            '<ul class="list-group list-group-flush">' +
            '<li class="list-group-item noBorder" style="border-bottom: none">' +
            iconGridMini2 +
            '<label class="numberCat">' +
            product_data.product_code +
            "</label>" +
            '<label onclick="removeThis2($(this))" product_code="' +
            product_data.product_code +
            '" remove="relacionados" style="float: right;margin-right: -10px;"  class="iconClose2"><i class="far fa-times-circle"></i></label>' +
            "</li>" +
            '<li class="list-group-item  noBorder mainPicture"  style="border-bottom: none">' +
            '<img   class="productImageThumb" src="' +
            produtoURL(product_data.product_ean, PRODUCTS_IMAGES).DATA
              .thumbnail +
            '" /> ' +
            "</li>" +
            '<li style="line-height: 0.2;    max-height: 70px;" class="list-group-item noBorder"  style="border-top: none">' +
            '<h3 class="tituloProdutoMini">' +
            product_name +
            "</h3>" +
            "</li>" +
            "</ul>" +
            "</div>";
        }
      }
    }
  }

  return html;
}

function cardSelecionadoPromo(product_data, onde) {
  var html =
    '<div  product_code="' +
    product_data.product_code +
    '" class="col-md-12 produtoParaPromocao">' +
    '<div style="margin: auto !important; border: 1px solid #EDF2F6; max-width: 80% !important"  class="input-group categoriaLabel2">' +
    '<div style="margin: auto; border: none" class="input-group  ico dropItems">' +
    '<div class="col-md-2 imgProcuraProduto" style="background: url(' +
    produtoURL(product_data.product_ean, PRODUCTS_IMAGES).DATA.thumbnail +
    '), url(' + URL_IMAGES + '/produto-sem-imagem.jpg)"></div>' +
    "</div>" +
    '<label class="innerLabel">' +
    product_data.product_code +
    "</label>" +
    "<label  >" +
    product_data.product_descricao +
    "</label>" +
    '<label onclick="removeThis2($(this))"   class="iconClose"><i class="far fa-times-circle"></i></label>' +
    "</div>" +
    "</div><br>";
  return html;
}

function cardSelecionadoPromo2(lista, onde) {
  var html = "";
  //////////console.log("lista 2")
  //////////console.log(lista)
  if (lista.length > 0) {
    for (const k in lista) {
      //////////console.log(lista[k])
      var product_data = getProductCaract(lista[k]);
      ////////console.log(product_data)
      html +=
        '<div product_code="' +
        product_data.product_code +
        '" class="col-md-12 produtoParaPromocao">' +
        '<div style="margin: auto !important; border: 1px solid #EDF2F6; max-width: 80% !important"  class="input-group categoriaLabel2">' +
        '<div style="margin: auto; border: none" class="input-group  ico dropItems">' +
        '<div class="col-md-2 imgProcuraProduto" style="background: url(' +
        produtoURL(product_data.product_ean, PRODUCTS_IMAGES).DATA.thumbnail +
        '), url(' + URL_IMAGES + '/produto-sem-imagem.jpg)"></div>' +
        "</div>" +
        '<label class="innerLabel">' +
        product_data.product_code +
        "</label>" +
        "<label  >" +
        product_data.product_descricao +
        "</label>" +
        '<label product_code="' +
        product_data.product_code +
        '"  onclick="removeProdutoDesconto($(this))"  class="iconClose"><i class="far fa-times-circle"></i></label>' +
        "</div>" +
        "</div><br>";
    }
  }

  return html;
}

function getFromRelations(lista) {
  var lista2 = [];
  if (lista != null && lista != undefined && lista != "") {
    lista2 = JSON.parse(lista);
  }
  var html = "",
    product_data = [];
  //////////console.log(lista2)
  for (const k in lista2) {
    var detalhes = getProductCaract_local(lista2[k]);
    //////////console.log("detalhes")
    //////////console.log(detalhes)
    product_data.push(detalhes);
  }

  html = getSimilarProducts(product_data, 5);

  ////////////console.log(product_data)

  return html;
}

function imagen_URL(EAN, product_code, PRODUCTS_IMAGES) {
  var img_UPLOAD = [],
    fullLista = [];
  if (
    localStorage.LISTA_IMAGENS == undefined ||
    localStorage.LISTA_IMAGENS == null
  ) {
  } else {
    img_UPLOAD = JSON.parse(localStorage.LISTA_IMAGENS);
  }
  var URL_IMAGE = "";
  for (const k in PRODUCTS_IMAGES) {
    ////////////console.log(PRODUCTS_IMAGES[k].EAN,EAN )

    if (PRODUCTS_IMAGES[k].EAN === EAN) {
      fullLista.push(PRODUCTS_IMAGES[k].DATA.thumbnail);
      URL_IMAGE = PRODUCTS_IMAGES[k].DATA.thumbnail;
      break;
    }
  }
  //////////console.log("URL_IMAGE MOSTRA", URL_IMAGE)
  //////////console.log("img_UPLOAD MOSTRA", img_UPLOAD)
  for (const k in img_UPLOAD) {
    if (URL_IMAGE.indexOf(PRODUCTS_IMAGES[k]) > -1) {
    } else {
      ////////////console.log("vou ver --- ",img_UPLOAD[k])
      if (img_UPLOAD[k] != null) {
        if (img_UPLOAD[k].indexOf("http") > -1) {
        } else {
          var contexto = img_UPLOAD[k],
            prefixo = mainHost + "/";

          if (contexto.indexOf("http") > -1) {
          } else {
            if (contexto.indexOf("images/") > -1) {
              contexto = prefixo + contexto;
            } else if (contexto.indexOf("produto-sem-imagem.jpg") > -1) {
              contexto = URL_IMAGES + "/produto-sem-imagem.jpg";
            } else {
              contexto =
                prefixo +
                "images/" +
                localStorage.AFFILIATE_ID +
                "/" +
                product_code +
                "/" +
                contexto;
            }
          }
          fullLista.push(contexto);
          ////////////console.log("contexto ",contexto)
        }
      }
    }
  }

  if (fullLista.length == 0) {
    fullLista.push(URL_IMAGES + "/produto-sem-imagem.jpg");
  }
  ////////////console.log("img_UPLOAD")
  ////////////console.log(img_UPLOAD)
  ////////////console.log("fullLista")
  ////////////console.log(fullLista)
  return fullLista;
}

function getIconsToShow(URLS) {
  var html = ""
  var imagens = URLS
  for (const k in imagens) {
    if (k > 0) {
      var contexto = "";
      if (
        imagens[k] != null &&
        imagens[k] != "" &&
        imagens[k] != undefined &&
        imagens[k] != " "
      ) {
        (contexto = imagens[k]), (prefixo = mainHost + "/");
        if (contexto.indexOf("http") > -1) {
        } else if (contexto.indexOf("produto-sem-imagem.jpg") > -1) {
          contexto = URL_IMAGES + "/produto-sem-imagem.jpg";
        } else {
          contexto = prefixo + contexto;
        }
        html +=
          '<div   class="iconShow">' +
          '<img   class="iconToShow" src="' +
          contexto +
          '">' +
          "</div><br>";
      }
    }

  }


  return html;
}

function getS_TAGS(texto, icone) {
  var html = "";
  if (lista != null) {
    var lista = texto.split(",");
    for (const k in lista) {
      if (lista[k] != "") {
        html +=
          '<div class="sTag">' +
          icone +
          ' <label  class="tagAmostra">' +
          lista[k] +
          "</label>" +
          "</div>";
      }
    }
  }

  return html;
}

function getImageFromEAN(EAN, product_code, element) {
  //Example of cosmos bluesoft cunsult

  if (EAN != 0 && EAN != undefined && EAN != "" && EAN != null) {
    try {
      $.ajax({
        type: "POST",
        url: mainHost + "/getMyPicture",
        headers: {
          "x-access-token": localStorage.token,
        },
        data: {
          EAN: EAN,
          method: "GET",
        },
        success: function (picture) {
          //////////console.log("picture")
          //////////console.log(picture)

          if (picture.thumbnail != undefined) {
            var novo = true;
            for (const k in PRODUCTS_IMAGES) {
              if (EAN == PRODUCTS_IMAGES[k].EAN) {
                novo = false;
              }
            }
            if (novo) {
              PRODUCTS_IMAGES.push({
                EAN: EAN,
                DATA: picture,
              });
            }
          }

          try {
            $.ajax({
              type: "POST",
              url: mainHost + "/productPictures",
              headers: {
                "x-access-token": localStorage.token,
              },
              data: {
                affiliate_id: localStorage.AFFILIATE_ID,
                product_code: product_code,
              },
              success: function (data2) {
                element.css(
                  "background",
                  "url(" +
                  mainHost +
                  "/images/" +
                  localStorage.AFFILIATE_ID +
                  "/" +
                  product_code +
                  "/" +
                  data2[0] +
                  ")"
                );
              },
              error: function (data2) {
                try {
                  if (data.responseJSON.message.indexOf("token") > -1) {
                    //alert("Necessário fazer login!<br>"+data.responseJSON.message)
                    setTimeout(() => {
                      localStorage.peregrino =
                        location.href.split("/")[
                        location.href.split("/").length - 1
                        ];
                      location.replace("/cms-login");
                    }, 2000);
                  } else {
                  }
                } catch (ee) {
                  ////////////console.log("erro ee")
                  ////////////console.log(ee)
                }
              },
              complete: function () {
                // ao final da requisição...
              },
            });
          } catch (erru) {
            element.css("background", "url(" + picture.thumbnail + ")");
          }
        },
        error: function (data) {
          if (data.responseJSON.message.indexOf("token") > -1) {
            setTimeout(() => {
              localStorage.peregrino =
                location.href.split("/")[location.href.split("/").length - 1];
              location.replace("/cms-login");
            }, 2000);
          } else {
          }

          $.ajax({
            type: "POST",
            url: mainHost + "/productPictures",
            headers: {
              "x-access-token": localStorage.token,
            },
            data: {
              affiliate_id: localStorage.AFFILIATE_ID,
              product_code: product_code,
            },
            success: function (data2) {
              element.css(
                "background",
                "url(" +
                mainHost +
                "/images/" +
                localStorage.AFFILIATE_ID +
                "/" +
                product_code +
                "/" +
                data2[0] +
                ")"
              );
            },
            error: function (data2) {
              try {
                if (data.responseJSON.message.indexOf("token") > -1) {
                  //alert("Necessário fazer login!<br>"+data.responseJSON.message)
                  setTimeout(() => {
                    localStorage.peregrino =
                      location.href.split("/")[
                      location.href.split("/").length - 1
                      ];
                    location.replace("/cms-login");
                  }, 2000);
                }
              } catch (ee) {
                element.css(
                  "background",
                  "url(images/default/produto-sem-imagem.jpg)"
                );
              }
            },
            complete: function () {
              // ao final da requisição...
            },
          });
        },
        complete: function () {
          // ao final da requisição...
        },
      });
    } catch (eru) {
      ////////////console.log(eru)
    }
  } else {
    //////////console.log("This product EAN is invalid = '" + EAN)
  }
}

function CriaPDF(html, titulo) {
  var style = "<style>";

  style = style + "</style>";

  var win = window.open("50", "50", "height=900,width=1280");
  win.document.write(html);
  win.document.write(style);
  win.document.close();

  win.print();
  win.close();
}

function addProdutoRelacao(element, limite, dados) {
  var elemento = $("#listaDeCartoes");
  var texto = element.val();
  var loading =
    '<div style="width: 50px;height: 50px; margin: auto 25px" class="spinner-border text-warning" role="status"><span class="sr-only">Loading...</span></div>';
  elemento.html(loading);

  if (dados != undefined) {
    var data = dados;
    //////////console.log(data)
    localStorage.resultSearch = JSON.stringify(data);
    elemento.html("");
    for (const k in data) {
      var html =
        '<div style="margin:5px auto"  class="listaProdSearch ">' +
        '<div  style="max-width: 50px; margin: 10px  auto" class="col">' +
        '<div style="background: url(' +
        produtoURL(data[k].product_ean, PRODUCTS_IMAGES).DATA.thumbnail +
        '), url(' + URL_IMAGES + '/produto-sem-imagem.jpg)" class="bkgImagem"></div>' +
        "</div>" +
        '<div  style="max-width: 50px; margin: auto" class="col">' +
        '<label class="textoCodigo1">' +
        data[k].product_code +
        "</label>" +
        "</div>" +
        '<div  style="width: 200px; margin: auto" class="col">' +
        '<label class="textoDesc1">' +
        data[k].product_site_name +
        "</label>" +
        "</div>" +
        '<div  style="width: 60px; margin: auto" class="col">' +
        '<label class="textoPreco11">' +
        data[k].product_valor +
        "</label>" +
        "</div>" +
        '<div  style="width: 170px; margin: auto;" class="col">' +
        '<div style=";padding-left: 5px !important;" myPicture="' +
        produtoURL(data[k].product_ean, PRODUCTS_IMAGES).DATA.thumbnail +
        '" product_value="' +
        data[k].product_valor +
        '" product_code="' +
        data[k].product_code +
        '" onclick="prdSeleciona5($(this))" class="prodSearchBtn PRDseleciona5">' +
        '<label class="prodSearchTxt">Adicionar</label>' +
        "</div>" +
        "</div>" +
        "</div>";

      elemento.append(html);
    }

    $(".PRDseleciona3").click(function (e) {
      e.stopPropagation();
      e.preventDefault();
      var dados = JSON.parse(localStorage.resultSearch);
      salvaCard2($(".listaTAGS_CARDS"), dados, Number(prd_code));
    });
  } else {
    $.ajax({
      type: "POST",
      url: mainHost + "/productSearch",
      data: {
        totalItems: limite,
        lastID: 0,
        product_code: texto,
        product_affiliate_id: localStorage.AFFILIATE_ID,
        product_site_name: texto,
      },
      success: function (data) {
        //////////console.log(data)
        localStorage.resultSearch = JSON.stringify(data);
        elemento.html("");
        for (const k in data) {
          var html =
            '<div style="margin:5px auto"  class="listaProdSearch ">' +
            '<div  style="max-width: 50px; margin: 10px  auto" class="col">' +
            '<div style="background: url(' +
            produtoURL(data[k].product_ean, PRODUCTS_IMAGES).DATA.thumbnail +
            '), url(' + URL_IMAGES + '/produto-sem-imagem.jpg)" class="bkgImagem"></div>' +
            "</div>" +
            '<div  style="max-width: 50px; margin: auto" class="col">' +
            '<label class="textoCodigo1">' +
            data[k].product_code +
            "</label>" +
            "</div>" +
            '<div  style="width: 200px; margin: auto" class="col">' +
            '<label class="textoDesc1">' +
            data[k].product_site_name +
            "</label>" +
            "</div>" +
            '<div  style="width: 60px; margin: auto" class="col">' +
            '<label class="textoPreco11">' +
            data[k].product_valor +
            "</label>" +
            "</div>" +
            '<div  style="width: 170px; margin: auto" class="col">' +
            '<div style=";padding-left: 5px !important;" myPicture="' +
            produtoURL(data[k].product_ean, PRODUCTS_IMAGES).DATA.thumbnail +
            '" product_code="' +
            data[k].product_code +
            '"  onclick="prdSeleciona5($(this))" class="prodSearchBtn PRDseleciona5">' +
            '<label class="prodSearchTxt">Adicionar</label>' +
            "</div>" +
            "</div>" +
            "</div>";

          elemento.append(html);
        }
      },
      error: function (data) {
        ////////////console.log(data)
      },
      complete: function () {
        // ao final da requisição...
      },
    });
  }
}

function addProdutoRelacao2(element, limite, dados) {
  var elemento = $(".listaDeCartoes");
  var texto = element.val();
  var loading =
    '<div style="width: 50px;height: 50px; margin: auto 25px" class="spinner-border text-warning" role="status"><span class="sr-only">Loading...</span></div>';
  elemento.html(loading);

  if (dados != undefined) {
    var data = dados;
    //////////console.log(data)
    localStorage.resultSearch = JSON.stringify(data);
    elemento.html("");
    for (const k in data) {
      var html =
        '<div style="margin:5px auto"  class="listaProdSearch ">' +
        '<div  style="max-width: 50px; margin: 10px  auto" class="col">' +
        '<div style="background: url(' +
        produtoURL(data[k].product_ean, PRODUCTS_IMAGES).DATA.thumbnail +
        '), url(' + URL_IMAGES + '/produto-sem-imagem.jpg)" class="bkgImagem"></div>' +
        "</div>" +
        '<div  style="max-width: 50px; margin: auto" class="col">' +
        '<label class="textoCodigo1">' +
        data[k].product_code +
        "</label>" +
        "</div>" +
        '<div  style="width: 200px; margin: auto" class="col">' +
        '<label class="textoDesc1">' +
        data[k].product_site_name +
        "</label>" +
        "</div>" +
        '<div  style="width: 60px; margin: auto" class="col">' +
        '<label class="textoPreco11">' +
        data[k].product_valor +
        "</label>" +
        "</div>" +
        '<div  style="width: 170px; margin: auto;" class="col">' +
        '<div style=";padding-left: 5px !important;" myPicture="' +
        produtoURL(data[k].product_ean, PRODUCTS_IMAGES).DATA.thumbnail +
        '" product_code="' +
        data[k].product_code +
        '" onclick="addRelacionados($(this))" class="prodSearchBtn PRDseleciona4">' +
        '<label class="prodSearchTxt">Adicionar</label>' +
        "</div>" +
        "</div>" +
        "</div>";

      elemento.append(html);
    }
  } else {
    $.ajax({
      type: "POST",
      url: mainHost + "/productSearch",
      data: {
        totalItems: limite,
        lastID: 0,
        product_code: texto,
        product_affiliate_id: localStorage.AFFILIATE_ID,
        product_site_name: texto,
      },
      success: function (data) {
        //////////console.log(data)
        localStorage.resultSearch = JSON.stringify(data);

        elemento.html("");
        for (const k in data) {
          var html =
            '<div style="margin:5px auto"  class="listaProdSearch ">' +
            '<div  style="max-width: 50px; margin: 10px  auto" class="col">' +
            '<div style="background: url(' +
            produtoURL(data[k].product_ean, PRODUCTS_IMAGES).DATA.thumbnail +
            '), url(' + URL_IMAGES + '/produto-sem-imagem.jpg)" class="bkgImagem"></div>' +
            "</div>" +
            '<div  style="max-width: 50px; margin: auto" class="col">' +
            '<label class="textoCodigo1">' +
            data[k].product_code +
            "</label>" +
            "</div>" +
            '<div  style="width: 200px; margin: auto" class="col">' +
            '<label class="textoDesc1">' +
            data[k].product_site_name +
            "</label>" +
            "</div>" +
            '<div  style="width: 60px; margin: auto" class="col">' +
            '<label class="textoPreco11">' +
            data[k].product_valor +
            "</label>" +
            "</div>" +
            '<div  style="width: 170px; margin: auto" class="col">' +
            '<div style=";padding-left: 5px !important;" myPicture="' +
            produtoURL(data[k].product_ean, PRODUCTS_IMAGES).DATA.thumbnail +
            '" product_code="' +
            data[k].product_code +
            '"  onclick="addRelacionados($(this))" class="prodSearchBtn PRDseleciona4">' +
            '<label class="prodSearchTxt">Adicionar</label>' +
            "</div>" +
            "</div>" +
            "</div>";

          elemento.append(html);
        }
      },
      error: function (data) {
        ////////////console.log(data)
      },
      complete: function () {
        // ao final da requisição...
      },
    });
  }
}

function salvaCard(elementContainer, data, code) {
  for (const k in data) {
    if (Number(data[k].product_code) == code) {
      var html =
        '<div product_code="' +
        data[k].product_code +
        '" class="card PRDseleciona"   style="width: 18%; border-radius: 15px; margin-left: 10px;   max-height: 200px">' +
        '<ul class="list-group list-group-flush">' +
        '<li class="list-group-item noBorder" style="border-bottom: none">' +
        iconGridMini2 +
        '<label class="numberCat">' +
        data[k].product_code +
        "</label>" +
        '<label onclick="removeThis2($(this))" product_code="' +
        data[k].product_code +
        '" remove="relacionados" style="float: right;margin-right: -10px;"  class="iconClose2"><i class="far fa-times-circle"></i></label>' +
        "</li>" +
        '<li class="list-group-item  noBorder mainPicture"  style="border-bottom: none">' +
        '<img   class="productImageThumb" src="' +
        produtoURL(data[k].product_ean, PRODUCTS_IMAGES).DATA.thumbnail +
        '" /> ' +
        "</li>" +
        '<li style="line-height: 0.2;    max-height: 70px;" class="list-group-item noBorder"  style="border-top: none">' +
        '<h3 class="tituloProdutoMini">' +
        data[k].product_site_name +
        "</h3>" +
        "</li>" +
        "</ul>" +
        "</div>";
      elementContainer.append(html);
    }
  }
}
function salvaCard2(elementContainer, data, code) {
  for (const k in data) {
    if (Number(data[k].product_code) == code) {
      var html = cardSelecionadoPromo2([Number(data[k].product_code)]);
      elementContainer.append(html);
    }
  }
}
function removeThis2(element) {
  ////////////console.log("rona3")

  //localStorage.relacionados = localStorage.relacionados.replace(/element.parent().text()/g, "")
  if (element.attr("remove") == "relacionados") {
    //////////console.log("sou igual")
    var news = [],
      ele = $(".iconClose2");

    var esse = element.attr("product_code");
    //////////console.log("ele")

    //////////console.log(ele)

    //////////console.log("esse")
    //////////console.log(esse)

    element.text();
    element.parent().parent().parent().remove();
    // element.parent().parent().parent().parent().parent().remove()
    ele.each(function () {
      if (Number($(this).attr("product_code")) != Number(esse)) {
        news.push(Number($(this).attr("product_code")));
      }
    });
    //////////console.log(news)
    localStorage.relacionados = JSON.stringify(news);
  } else {
    element.parent().parent().remove();
    var esseID = element.attr("product_code");
  }
}
function removeProdutoDesconto(element) {
  element.parent().parent().remove();
  var esseID = element.attr("product_code");
  let DESCONTOS = JSON.parse(localStorage.listaDescontos);

  let PRDs = DESCONTOS["produtos"];
  // //console.log(esseID,DESCONTOS )
  let thisPRDs = [];
  for (const k in PRDs) {
    if (Number(PRDs[k]) != Number(esseID)) {
      thisPRDs.push(Number(PRDs[k]));
    }
  }
  DESCONTOS["produtos"] = thisPRDs;

  // //console.log(DESCONTOS )
  localStorage.listaDescontos = JSON.stringify(DESCONTOS);
}
function removeTAGMARCA(element) {
  var txt = element.parent().text();
  element.parent().remove();
}

function setNutrition(elemento) {
  var listaN = [];
  $(".listaNutritiva").each(function () {
    listaN.push({
      titulo: $(this).find(".tt").val(),
      quantidade: $(this).find(".qt").val(),
    });
  });
  localStorage.tabelaNutricional = JSON.stringify(listaN);
  ////////console.log(listaN)
}
function limpaCampos(element) {
  element.parent().parent().find("input").val("");
}
function limpaCampos2(element) {
  element.parent().parent().parent().remove();
}
function listaDevolveN(lista) {
  var html5 = "";
  for (const k in lista) {
    html5 +=
      '<div style="padding:0 2%" class="row">' +
      '<div class="col-md-5">' +
      '<div style="padding:0 2%; margin-top: 2%" class="row">' +
      '<label style=" font-size: 20px;" class="label">Título</label><br> ' +
      "</div>" +
      "</div>" +
      '<div class="col-md-5">' +
      '<div style="padding:0 2%; margin-top: 2%" class="row">' +
      '<label style=" font-size: 20px;" class="label">Quantidade</label><br> ' +
      "</div>" +
      "</div>" +
      '<div class="col-md-2">' +
      '<div  onclick="limpaCampos($(this))"  style="opacity:0" class="input-group iconOpaco ico etiquetaRedonda">' +
      '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 21 21" style="    margin: auto;">' +
      "<defs></defs>" +
      '<path class="a" d="M10.937,16H3.063A2.208,2.208,0,0,1,.875,13.778V2.666H.438a.444.444,0,0,1,0-.889H4.375V1.334A1.324,1.324,0,0,1,5.687,0H8.313A1.324,1.324,0,0,1,9.625,1.334v.444h3.937a.444.444,0,0,1,0,.889h-.437V13.778A2.208,2.208,0,0,1,10.937,16ZM1.75,2.666V13.778a1.325,1.325,0,0,0,1.313,1.334h7.875a1.325,1.325,0,0,0,1.313-1.334V2.666ZM5.687.889a.441.441,0,0,0-.437.445v.444h3.5V1.334A.441.441,0,0,0,8.313.889Zm3.5,11.556A.442.442,0,0,1,8.75,12V5.778a.437.437,0,1,1,.875,0V12A.441.441,0,0,1,9.188,12.445Zm-4.375,0A.441.441,0,0,1,4.375,12V5.778a.437.437,0,1,1,.875,0V12A.442.442,0,0,1,4.812,12.445Z" transform="translate(4 3)"></path>' +
      "</svg>" +
      "</div>" +
      "</div>" +
      "</div>" +
      '<div style="padding:0 2%" class="row listaNutritiva">' +
      '<div class="col-md-5">' +
      '<div style="padding:0 2%; margin-top: -2%" class="row">' +
      '<div class="group-input2"><input value="' +
      lista[k].titulo +
      '"  onchange="setNutrition($(this))" name="titulo" class=" tt form-control inputProduct nutriTitulo  nutritiones"   placeholder="Título" id="nomeProduto"></div><br> ' +
      "</div>" +
      "</div>" +
      '<div class="col-md-5">' +
      '<div style="padding:0 2%; margin-top: -2%" class="row">' +
      '<div class="group-input2"><input value="' +
      lista[k].quantidade +
      '"  onchange="setNutrition($(this))" name="valor" class=" qt form-control inputProduct nutriQuantidade  nutritiones"   placeholder="Quantidade" id="nomeProduto"></div><br> ' +
      "</div>" +
      "</div>" +
      '<div class="col-md-2">' +
      '<div onclick="limpaCampos($(this))" style="margin:auto" class="input-group iconOpaco ico etiquetaRedonda">' +
      '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 21 21" style="    margin: auto;">' +
      "<defs></defs>" +
      '<path class="a" d="M10.937,16H3.063A2.208,2.208,0,0,1,.875,13.778V2.666H.438a.444.444,0,0,1,0-.889H4.375V1.334A1.324,1.324,0,0,1,5.687,0H8.313A1.324,1.324,0,0,1,9.625,1.334v.444h3.937a.444.444,0,0,1,0,.889h-.437V13.778A2.208,2.208,0,0,1,10.937,16ZM1.75,2.666V13.778a1.325,1.325,0,0,0,1.313,1.334h7.875a1.325,1.325,0,0,0,1.313-1.334V2.666ZM5.687.889a.441.441,0,0,0-.437.445v.444h3.5V1.334A.441.441,0,0,0,8.313.889Zm3.5,11.556A.442.442,0,0,1,8.75,12V5.778a.437.437,0,1,1,.875,0V12A.441.441,0,0,1,9.188,12.445Zm-4.375,0A.441.441,0,0,1,4.375,12V5.778a.437.437,0,1,1,.875,0V12A.442.442,0,0,1,4.812,12.445Z" transform="translate(4 3)"></path>' +
      "</svg>" +
      "</div>" +
      "</div>" +
      "</div>";
  }
  return html5;
}

function criaNovaTag(elemento, e, elementoContainer) {
  e = window.event;
  var code = e.which || e.keyCode;
  ////////console.log(e, elemento)
  if (code == 13) {
    var html =
      '<li class="list-item liVariacoes animate__animated ">' +
      '<label class="subSmart animate__animated animate__">' +
      elemento.val() +
      "<input  onchange=\"addTagMarcada($(this),'" +
      elementoContainer +
      '\')" class="marcar2" type="checkbox"><span class="checkmark"></span></label>' +
      "</li>";
    $("." + elementoContainer).append(html);
    elemento.val("");
  }
}

function addTagMarcada(elemento, IDalvo) {
  var texto = elemento.parent().text().trim();
  if (elemento[0].checked == true) {
    insereCategoria($("#" + IDalvo), elemento, texto);
  } else {
    var lista = $("#" + IDalvo).find("label");
    lista.each(function () {
      if ($(this).text().trim() == texto) {
        $(this).parent().remove();
      }
    });
  }
}
function setLocal(id) {
  localStorage.AFFILIATE_ID = id;
  location.reload();
}

function changeMarcar(elemento, eu) {
  var texto = elemento.parent().text().trim();
  ////////console.log(elemento,eu,"vai")
  if (elemento[0].checked == true) {
    insereCategoria($("#listaEtiquetasTag"), elemento, texto);
    $(".iconClose").click(function () {
      ////////////console.log("rona1")
      if ($(this).parent().attr("removeStorage") == "relacionados") {
        localStorage.relacionados = localStorage.relacionados.replace(
          /$(this).parent().text()/g,
          ""
        );
      }

      $(this).parent().remove();
      /*
            ////////console.log('alvo',alvo)
            $("."+alvo).each(function(){
                ////////console.log($(this).text() ,texto)
                if($(this).text() == texto){
                    $(this).parent().find("input")[0].checked = !$(this).parent().find("input")[0].checked
                }

            })
            */
    });
  } else {
    var lista = $("#listaEtiquetasTag").find("label");
    lista.each(function () {
      ////////////console.log($(this).text().trim(),texto)
      if ($(this).text().trim() == texto) {
        $(this).parent().remove();
      }
    });
  }
}

function addRelacionados(elemento) {
  if (
    localStorage.relacionados == null ||
    localStorage.relacionados == "null"
  ) {
    localStorage.relacionados = "[]";
  }
  var dados = JSON.parse(localStorage.resultSearch);
  var prd_code = elemento.attr("product_code");
  var codigo_produto = Number(elemento.attr("product_code"));
  salvaCard($(".listaDeCartoesSelecionados"), dados, codigo_produto);
  var relacionados = [];
  try {
    relacionados = JSON.parse(localStorage.relacionados);
  } catch (err) { }
  relacionados.push(Number(elemento.attr("product_code")));
  localStorage.relacionados = JSON.stringify(relacionados);
}

function prdSeleciona5(elemento) {
  var listaDescontosOld = {
    produtos: [],
    subtracaoProduto: {
      valorDescontado: 0,
      precoFinal: Number(elemento.attr("product_value")),
    },
    porcentagemProduto: {
      percentualDescontado: 0,
      precoFinal: Number(elemento.attr("product_value")),
    },
    subtracao: {
      valorDescontado: 0,
      precoFinal: Number(elemento.attr("product_value")),
    },
    porcentagem: {
      percentualDescontado: 0,
      precoFinal: Number(elemento.attr("product_value")),
    },
    levePague: {
      valorDescontado: "leve 0 pague 0",
      precoFinal: Number(elemento.attr("product_value")),
    },
  };
  ////////console.log("tentando")
  ////////console.log(elemento)
  if (
    localStorage.listaDescontos == null ||
    localStorage.listaDescontos == "null" ||
    localStorage.listaDescontos == undefined
  ) {
    localStorage.listaDescontos = JSON.stringify(listaDescontosOld);
  }
  var dados = JSON.parse(localStorage.resultSearch);
  ////////console.log(dados)
  var prd_code = elemento.attr("product_code");
  var codigo_produto = Number(elemento.attr("product_code"));
  var news = JSON.parse(localStorage.listaDescontos);
  ////////console.log('news')
  ////////console.log(news)
  if (news) news.produtos.push(Number(prd_code));
  localStorage.listaDescontos = JSON.stringify(news);
  salvaCard2($(".listaTAGS_CARDS"), dados, Number(prd_code));
}

async function buscaAvancadaFiltros(html) {
  //console.log(html);
  lastHtmlFilter = html.parent().html();
  var cat = $(".listaCategoriasFilter").find(".categoriaLabel");
  var marc = $(".minhasMarcas").find(".categoriaLabel");
  var tag = $(".minhasTags2").find(".categoriaLabel");

  var LISTA_SEARCH = JSON.parse(localStorage.PARAMETROS_FILTROS);
  cat.each(function () {
    LISTA_SEARCH.push({
      colmun: "categorias",
      value: $(this).text(),
      active: true,
    });
  });
  tag.each(function () {
    LISTA_SEARCH.push({ colmun: "tags", value: $(this).text(), active: true });
  });
  marc.each(function () {
    LISTA_SEARCH.push({
      colmun: "marcas",
      value: $(this).text(),
      active: true,
    });
  });
  localStorage.PARAMETROS_FILTROS = JSON.stringify(LISTA_SEARCH);
  buscaPeloFiltro(LISTA_SEARCH, 10000, false, 10000, true);
  var parametros = [];
  try {
    parametros = JSON.parse(localStorage.PARAMETROS_FILTROS);
  } catch (e) { }
}

function verFeedback() {
  var cat = $(".listaCategoriasFilter").find(".categoriaLabel");
  var marc = $(".minhasMarcas").find(".categoriaLabel");
  var tag = $(".minhasTags2").find(".categoriaLabel");

  var LISTA_SEARCH = JSON.parse(localStorage.PARAMETROS_FILTROS);
  LISTA_SEARCH.map((a) =>
    a.colmun === "marcas" || a.colmun === "categorias" || a.colmun === "tags"
      ? (a.active = false)
      : (a.active = a.active)
  );

  // for (const k in LISTA_SEARCH) {
  //   if (
  //     LISTA_SEARCH[k].colmun == "tags" ||
  //     LISTA_SEARCH[k].colmun == "categorias" ||
  //     LISTA_SEARCH[k].colmun == "marcas"
  //   ) {
  //     LISTA_SEARCH[k].active = false;
  //   }
  // }
  cat.each(function () {
    let exist = LISTA_SEARCH.find(
      (l) => l.colmun === "categorias" && l.value === $(this).text()
    );
    if (!exist) {
      LISTA_SEARCH.push({
        colmun: "categorias",
        value: $(this).text(),
        active: true,
      });
    } else {
      LISTA_SEARCH.map((l) =>
        l.colmun === "categorias" &&
          l.value === $(this).text() &&
          l.active === false
          ? (l.active = true)
          : (l.active = l.active)
      );
    }
  });
  tag.each(function () {
    let exist = LISTA_SEARCH.find(
      (l) => l.colmun === "tags" && l.value === $(this).text()
    );
    if (!exist) {
      LISTA_SEARCH.push({
        colmun: "tags",
        value: $(this).text(),
        active: true,
      });
    } else {
      LISTA_SEARCH.map((l) =>
        l.colmun === "tags" && l.value === $(this).text() && l.active === false
          ? (l.active = true)
          : (l.active = l.active)
      );
    }
  });
  marc.each(function () {
    let exist = LISTA_SEARCH.find(
      (l) => l.colmun === "marcas" && l.value === $(this).text()
    );
    if (!exist) {
      LISTA_SEARCH.push({
        colmun: "marcas",
        value: $(this).text(),
        active: true,
      });
    } else {
      LISTA_SEARCH.map((l) =>
        l.colmun === "marcas" &&
          l.value === $(this).text() &&
          l.active === false
          ? (l.active = true)
          : (l.active = l.active)
      );
    }
  });
  localStorage.PARAMETROS_FILTROS = JSON.stringify(LISTA_SEARCH);
  feedbackPeloFiltro($(".txtFiltroGet"), LISTA_SEARCH, 10000, false, 10000);
}

var lastHtmlFilter = null;

function filter() {
  var TAGS = "",
    MARCAS = "";
  if (
    localStorage.TAGS_MARCAS != null &&
    localStorage.TAGS_MARCAS != "" &&
    localStorage.TAGS_MARCAS != "undefined"
  ) {
    var lst = JSON.parse(localStorage.TAGS_MARCAS);
    ////////console.log('lst')
    ////////console.log(lst)
    var mrc = lst.marcas;
    var lis = lst.tags;
    for (const k in mrc) {
      if (
        mrc[k].marcas != "" &&
        mrc[k].marcas != null &&
        mrc[k].marcas != "null"
      ) {
        MARCAS += mrc[k].marcas + ",";
      }
    }
    for (const k in lis) {
      if (lis[k].tags != "" && lis[k].tags != null && lis[k].tags != "null") {
        TAGS += lis[k].tags + ",";
      }
    }
  }
  localStorage.TAGS_FILTRAR = TAGS;
  localStorage.MARCAS_FILTRAR = MARCAS;

  var html =
    '<h4 style="font-size: 24px !important" class="infoLabel">Filtros</h4><div style="max-width: 100%;max-height: 60vh;margin-top: 40px;    height: auto;" class="container verticalScroll ">' +
    '<hr class="baixoCabecalho" style="position: fixed;top: 165px !important;right: calc((100% - 648px) / 2) !important;width: 648px;box-shadow: 2px 2px 2px silver;/* margin: auto; */">' +
    '<div style="padding:0 2%; margin-top: 5%" class="row">' +
    '<label style=" font-size: 18px;" class="label">Categorias</label><br> ' +
    "</div>" +
    '<div class="col-md-12 grupoCinza">' +
    '<div class="row">' +
    '<div class="col-md-10">' +
    '<div style="padding:0 2%" class="row listaCategoriasFilter">' +
    // '<div  class="input-group categoriaLabel">' + "<label  >TESTE</label>" + '<label  style="max-width: 20%"  class="iconClose"><i class="far fa-times-circle"></i></label>' + "</div>" +
    "</div>" +
    "</div>" +
    '<div class="col-md-2">' +
    '<div  class="input-group  ico dropItems">' +
    arrowDown +
    "</div>" +
    "</div>" +
    "</div>" +
    '<div style="display:none; margin-top: 3%" class="row grupoCategorias drop">' +
    '<div class="col-md-12">' +
    '<div class="input-group">' +
    '<input id="buscaCategorias" type="text" style="min-width: 300px;font-size: 1.3rem" value="" class="form-control" placeholder="Busque por categorias" />' +
    '<div class="input-group-append">' +
    '<div class="input-group-text">' +
    '<i style="color: #f6b504; font-weight: bold;" class="fas fa-search"></i>' +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    '<div style="max-height: 30vh" class="col-md-12 verticalScroll">' +
    '<ul style="    margin-top: 5%;" class="list animate__animated ">' +
    getCategoriesAndSubToFilter(newsCATEGORIES) +
    "</ul>" +
    "</div>" +
    "</div>" +
    "</div>" +
    //MARCAS
    '<div style="padding:0 2%; margin-top: 5%" class="row">' +
    '<label style=" font-size: 18px;" class="label">Marcas</label><br> ' +
    "</div>" +
    '<div class="col-md-12 grupoCinza">' +
    '<div class="row">' +
    '<div class="col-md-10">' +
    '<div style="padding:0 2%" class="row minhasMarcas">' +
    // '<div  class="input-group categoriaLabel">' + "<label  >TESTE</label>" + '<label  style="max-width: 20%"  class="iconClose"><i class="far fa-times-circle"></i></label>' + "</div>" +
    "</div>" +
    "</div>" +
    '<div class="col-md-2">' +
    '<div  class="input-group  ico dropItems">' +
    arrowDown +
    "</div>" +
    "</div>" +
    "</div>" +
    '<div style="display:none; margin-top: 3%" class="row grupoCategorias drop">' +
    '<div class="col-md-12">' +
    '<div class="input-group">' +
    '<input id="buscaCategorias" type="text" style="min-width: 300px;font-size: 1.3rem" value="" class="form-control" placeholder="Busque por marcas" />' +
    '<div class="input-group-append">' +
    '<div class="input-group-text">' +
    '<i style="color: #f6b504; font-weight: bold;" class="fas fa-search"></i>' +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    '<div style="max-height: 30vh" class="col-md-12 verticalScroll">' +
    '<ul style="    margin-top: 5%;" class="list animate__animated ">' +
    getTagsAndMarcas(MARCAS, "marcas") +
    "</ul>" +
    "</div>" +
    "</div>" +
    "</div>" +
    //TAGS
    '<div style="padding:0 2%; margin-top: 5%" class="row">' +
    '<label style=" font-size: 18px;" class="label">Tags</label><br> ' +
    "</div>" +
    '<div class="col-md-12 grupoCinza">' +
    '<div class="row">' +
    '<div class="col-md-10">' +
    '<div style="padding:0 2%" class="row minhasTags2">' +
    // '<div  class="input-group categoriaLabel">' + "<label  >TESTE</label>" + '<label  style="max-width: 20%"  class="iconClose"><i class="far fa-times-circle"></i></label>' + "</div>" +
    "</div>" +
    "</div>" +
    '<div class="col-md-2">' +
    '<div  class="input-group  ico dropItems">' +
    arrowDown +
    "</div>" +
    "</div>" +
    "</div>" +
    '<div style="display:none; margin-top: 3%" class="row grupoCategorias drop">' +
    '<div class="col-md-12">' +
    '<div class="input-group">' +
    '<input id="buscaCategorias" type="text" style="min-width: 300px;font-size: 1.3rem" value="" class="form-control" placeholder="Busque por tags" />' +
    '<div class="input-group-append">' +
    '<div class="input-group-text">' +
    '<i style="color: #f6b504; font-weight: bold;" class="fas fa-search"></i>' +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    '<div style="max-height: 30vh" class="col-md-12 verticalScroll">' +
    '<ul style="    margin-top: 5%;" class="list animate__animated ">' +
    getTagsAndMarcas(TAGS, "tags") +
    "</ul>" +
    "</div>" +
    "</div>" +
    "</div>" +
    '<div style="margin-top: 3% !important;" class="col-md-12 grupo">' +
    '<div style="padding: 0 2%; margin-top: 2%;" class="row">' +
    '<div style="margin: 1% 2%;" class="switch__container ajuste"><input onchange="setPARAMETROS_FILTRO($(this))" column="desativados"  id="switch-shadow13" class="switch switch--shadow" type="checkbox" /><label for="switch-shadow13"></label></div>' +
    '<label style="font-size: 20px;" class="label">Produtos desativados</label>' +
    "</div>" +
    "</div>" +
    '<div style="margin-top: 3% !important;" class="col-md-12 grupo">' +
    '<div style="padding: 0 2%; margin-top: 2%;" class="row">' +
    '<div style="margin: 1% 2%;" class="switch__container ajuste"><input onchange="setPARAMETROS_FILTRO($(this))"  column="estoque_baixo" id="switch-shadow113" class="switch switch--shadow" type="checkbox" /><label for="switch-shadow113"></label></div>' +
    '<label style="font-size: 20px;" class="label">Produtos com estoque baixo</label>' +
    "</div>" +
    "</div>" +
    '<div style="margin-top: 3% !important;" class="col-md-12 grupo">' +
    '<div style="padding: 0 2%; margin-top: 2%;" class="row">' +
    '<div style="margin: 1% 2%;" class="switch__container ajuste"><input onchange="setPARAMETROS_FILTRO($(this))" onchange="setPARAMETROS_FILTRO($(this))"  column="promocao" id="switch-shadow123" class="switch switch--shadow" type="checkbox" /><label for="switch-shadow123"></label></div>' +
    '<label style="font-size: 20px;" class="label">Produtos em promoção</label>' +
    "</div>" +
    "</div>" +
    '<div style="margin-top: 3% !important;" class="col-md-12 grupo">' +
    '<div style="padding: 0 2%; margin-top: 2%;" class="row">' +
    '<div style="margin: 1% 2%;" class="switch__container ajuste"><input onchange="setPARAMETROS_FILTRO($(this))"  column="variacao" id="switch-shadow1323" class="switch switch--shadow" type="checkbox" /><label for="switch-shadow1323"></label></div>' +
    '<label style="font-size: 20px;" class="label">Produtos com variações</label>' +
    "</div>" +
    "</div>" +
    '<div style="margin-top: 3% !important;" class="col-md-12 grupo">' +
    '<div style="padding: 0 2%; margin-top: 2%;" class="row">' +
    '<div style="margin: 1% 2%;" class="switch__container ajuste"><input onchange="setPARAMETROS_FILTRO($(this))"  column="peso_unidade" id="switch-shadow143" class="switch switch--shadow" type="checkbox" /><label for="switch-shadow143"></label></div>' +
    '<label style="font-size: 20px;" class="label">Produtos com peso aproximado por unidade</label>' +
    "</div>" +
    "</div>" +
    '<div style="margin-top: 3% !important;" class="col-md-12 grupo">' +
    '<div style="padding: 0 2%; margin-top: 2%;" class="row">' +
    '<div style="margin: 1% 2%;" class="switch__container ajuste"><input onchange="setPARAMETROS_FILTRO($(this))"  column="imagen" id="switch-shadow153" class="switch switch--shadow" type="checkbox" /><label for="switch-shadow153"></label></div>' +
    '<label style="font-size: 20px;" class="label">Produtos sem imagem</label>' +
    "</div>" +
    "</div>" +
    "</div>" +
    '<div style="display: inline-flex; width: 100%;border-top: 0.949999988079071px solid #EDEDED;">' +
    '<p onclick="removeFiltrosAvancados()" class="removeFiltros">Remover Filtros</p>' +
    `<div onclick="buscaAvancadaFiltros($(this).parent().parent())" class="btnFiltroGet">` +
    '<svg style="margin: auto;" xmlns="http://www.w3.org/2000/svg" width="16.667" height="16.667" viewBox="0 0 16.667 16.667">' +
    '<path id="filter-alt" d="M8.333,16.667a8.333,8.333,0,1,1,8.333-8.333A8.343,8.343,0,0,1,8.333,16.667Zm0-15.833a7.5,7.5,0,1,0,6.495,3.75A7.508,7.508,0,0,0,8.333.833Zm1.25,10.834h-2.5a.417.417,0,0,1,0-.834h2.5a.417.417,0,0,1,0,.834Zm1.667-2.5H5.417a.417.417,0,0,1,0-.833H11.25a.417.417,0,1,1,0,.833Zm1.667-2.5H3.75a.417.417,0,1,1,0-.833h9.167a.417.417,0,1,1,0,.833Z" fill="#fff"/>' +
    "</svg>" +
    '<span class="txtFiltroGet">Mostrar 0 produtos</span>' +
    "</div>" +
    "</div>";

  bootbox.alert({
    message: lastHtmlFilter !== null ? lastHtmlFilter : html,
    onShow: function () {
      $(this)[0].id = "modalCentralFiltroInner";
      $(this)[0].height = "50vh";
      $("#modalCentralFiltroInner")
        .find(".modal-dialog")
        .addClass("modalCentralFiltro");
      $("#modalCentralFiltroInner")
        .find(".modal-dialog")
        .css("height", "50vh !important");

      $(".dropItems").click(function () {
        if ($(this).attr("dropou") == "1") {
          $(this).parent().parent().parent().find(".drop").fadeOut();
          $(this).attr("dropou", "0");
        } else {
          $(this).parent().parent().parent().find(".drop").fadeIn();
          $(this).attr("dropou", "1");
        }
      });
      $("#buscaCategorias").keyup(function () {
        var txt = $(this).val().toLowerCase();
        $(".targetBusca").each(function () {
          if ($(this).text().toLowerCase().indexOf(txt) > -1) {
            $(this).show();
          } else {
            $(this).hide();
          }
        });
      });

      $(".list-item").click(function () {
        if ($(this).attr("dropou") == "1") {
          $(this).find(".listInner").hide();
          $(this).attr("dropou", "0");
        } else {
          $(this).find(".listInner").show();
          $(this).attr("dropou", "1");
        }
      });
      $(".subCheck").click(function () {
        //////////console.log("Cliquei")
        if ($(this).attr("dropou") == "1") {
          $(this).parent().find(".listInner").hide();
          $(this).attr("dropou", "0");
        } else {
          $(this).parent().find(".listInner").show();
          $(this).attr("dropou", "1");
        }
      });

      let parametrosF = JSON.parse(localStorage.PARAMETROS_FILTROS);
      let listChecked = [];
      for (const k in parametrosF) {
        if (
          parametrosF[k].active === true ||
          parametrosF[k].active === "true"
        ) {
          listChecked.push(parametrosF[k].value);
        }
      }
      //console.log("listChecked", listChecked);

      $(".bootbox-body")
        .find("input")
        .each(function () {
          let text = $(this).attr("meEncontre");
          //console.log("texto ", text);
          if (text) {
            for (const k in listChecked) {
              //console.log(listChecked[k], text);
              if (listChecked[k] === text) {
                //console.log($(this)[0]);
                $(this)[0].checked = true;
              }
            }
          }
        });
    },
    callback: function () {
      $("#modalInner").find(".modal-dialog").removeClass("modalCentral");
    },
  });

  $(".modal-content").css("max-height", "50vh");
  $(".modal-content").css("border", "none");
}

function mOver(element) {
  element.parent().find("img").css("filter", "blur(5px)");
  element.css("opacity", "1");
}
function mLeave(element) {
  element.parent().find("img").css("filter", "none");
  element.css("opacity", "0");
}

function alteraPeso(elemento) {
  // //console.log("tentando...")
  // //console.log(elemento[0].checked)
  // //console.log(elemento.attr("objetivo"))

  var INFO_PESO = { compraPorPeso: false, mostrarPeso: false },
    novoPeso = [];
  if (
    localStorage.INFO_PESO != null &&
    localStorage.INFO_PESO != undefined &&
    localStorage.INFO_PESO != ""
  ) {
    try {
      INFO_PESO = JSON.parse(localStorage.INFO_PESO);

      if (elemento.attr("objetivo") == "mostrarPeso") {
        ////////console.log("tentando outro")
        INFO_PESO.mostrarPeso = elemento[0].checked;

        if (elemento[0].checked === true) {
          document.getElementsByClassName("areaMostraPeso")[0].style.display =
            "inline-flex";
          $(".areaMostraPeso").css("display", "inline-flex");
          $(".precoFinalProduto").css("display", "flex");
        } else {
          document.getElementsByClassName("areaMostraPeso")[0].style.display =
            "none";
          $(".areaMostraPeso").css("display", "none");
          $(".precoFinalProduto").css("display", "none");
        }
      } else {
        ////////console.log("tentando outro1")
        INFO_PESO.compraPorPeso = elemento[0].checked;
      }
    } catch (errrou) {
      ////////console.log(errrou)
      INFO_PESO = null;
      localStorage.INFO_PESO = null;
    }
    //  //console.log('monstrar o infopeso')
    //  //console.log(INFO_PESO)
    ////////console.log('pareidemostrar')
    //  //console.log('if', JSON.stringify(INFO_PESO))
    novoPeso = INFO_PESO;
    // //console.log('if', JSON.stringify(novoPeso))
    localStorage.INFO_PESO = JSON.stringify(novoPeso);
  } else {
    if (elemento.attr("objetivo") == "mostrarPeso") {
      INFO_PESO = { compraPorPeso: false, mostrarPeso: elemento[0].checked };
      if (elemento[0].checked === true) {
        //   //console.log("mostra")
        document.getElementsByClassName("areaMostraPeso")[0].style.display =
          "inline-flex";
        $(".areaMostraPeso").css("display", "inline-flex");
        $(".precoFinalProduto").css("display", "flex");
      } else {
        //   //console.log("esconde")
        document.getElementsByClassName("areaMostraPeso")[0].style.display =
          "none";
        $(".areaMostraPeso").css("display", "none");
        $(".precoFinalProduto").css("display", "none");
      }
    } else {
      ////////console.log("tentando outro2")
      INFO_PESO = { compraPorPeso: elemento[0].checked, mostrarPeso: false };
    }

    // //console.log('else', JSON.stringify(INFO_PESO))
  }
  novoPeso = INFO_PESO;
  ////////console.log('if',JSON.stringify(novoPeso))
  localStorage.INFO_PESO = JSON.stringify(novoPeso);
}

localStorage.listaSelecaoCheck = "";
function listaAcoes(elemento) {
  var listaMarcada = [];
  $(".selecionado").each(function () {
    if ($(this).attr("product_code") != undefined) {
      listaMarcada.push({
        elemento: $(this),
        product_code: $(this).attr("product_code"),
        product_ean: $(this).attr("product_ean"),
        product_affiliate_id: $(this).attr("product_affiliate_id"),
      });
    }
  });
  ////////console.log(elemento.val())
  localStorage.listaSelecaoCheck = JSON.stringify(listaMarcada);

  if (listaMarcada.length > 0) {
    switch (elemento.val().trim().toLowerCase()) {
      case "ativar":
        mostraAcoes("ATIVAR", listaMarcada.length);
        break;
      case "desativar":
        mostraAcoes("DESATIVAR", listaMarcada.length);
        break;
      case "excluir":
        mostraAcoes("EXCLUIR", listaMarcada.length);
        break;
      default: ////////console.log("nada");
        break;
    }
  }
}

function mostraAcoes(qualAcao, quantosProdutos) {
  $("#qualAcao").text(qualAcao);
  $("#quantosProdutos").text(quantosProdutos);
  $(".modalAcoes").show();
}
function SIM() {
  var acao = $("#qualAcao").text().toLowerCase();
  var lista = [];
  if (
    localStorage.listaSelecaoCheck != null &&
    localStorage.listaSelecaoCheck != undefined
  ) {
    try {
      lista = JSON.parse(localStorage.listaSelecaoCheck);
    } catch (erro) {
      ////////console.log(erro)
    }
  }

  if (lista.length > 0) {
    $.ajax({
      type: "POST",
      url: mainHost + "/alterList",

      headers: {
        "x-access-token": localStorage.token,
      },
      data: {
        affiliate_id: AFFILIATE_ID,
        acao: acao,
        lista: lista,
      },
      success: function (data) {
        ////////console.log(data);
        atualizaListaProdutos();
      },
      error: function (data) {
        ////////console.log(data)
        atualizaListaProdutos();
      },
      complete: function () { },
    });
  }
}
function NAO() {
  $(".modalAcoes").hide();
}

function orderBY(coluna, sentido) {
  var lastID = localStorage.LAST_ID;
  if (lastID == NaN || lastID == "NaN") {
    lastID = 0;
  }
  personalRequest(
    "productsOrderBy",
    lastID,
    20,
    sentido,
    coluna,
    localStorage.AFFILIATE_ID,
    false
  );
}

$(".ordena").click(function () {
  orderBY($(this).attr("field"), $(this).attr("sentido"));
  $(".ordena").parent().removeClass("selecionado2");
  $(".ordena").removeClass("selecionado2");
  $(this).parent().addClass("selecionado2");

  $(this).addClass("selecionado2");

  if ($(this).attr("sentido") == "ASC") {
    $(this).attr("sentido", "DESC");
    $(this).find("svg");
    $(this).find("svg").removeClass("fa-arrow-up");
    $(this).find("svg").addClass("fa-arrow-down");
  } else {
    $(this).attr("sentido", "ASC");
    $(this).find("svg").removeClass("fa-arrow-down");
    $(this).find("svg").addClass("fa-arrow-up");
  }
});

async function buscaPeloFiltro(
  parametros,
  TOTAL_ITENS,
  continuando,
  limite,
  lastID,
  loading,
  order_type,
  column_order
) {
  // //console.log("buscando pelo filtro", {
  //   affiliate_id: localStorage.AFFILIATE_ID,
  //   limite: limite,
  //   parameters: parametros,
  //   explain: false,
  //   lastId: lastID,
  //   order_type: order_type,
  //   column_order: column_order,
  // });
  if (loading) {
    // $("modalLoading").show();
  }

  $.ajax({
    type: "POST",
    url: mainHost + "/productAdvancedSearch",
    data: {
      affiliate_id: localStorage.AFFILIATE_ID,
      limite: limite,
      parameters: parametros,
      explain: false,
      lastId: lastID,
    },
    headers: {
      "x-access-token": localStorage.token,
      is_product_image: true,
    },
    success: function (products) {
      //console.log("by filtro", products);
      var lastRequest = {
        ADDRESS: "productAdvancedSearch",
        LAST_ID: Number(products[products.length - 1]?.id),
        TOTAL_ITENS: TOTAL_ITENS,
        PRODUCT_CODE: 0,
        PRODUCT_AFFILIATE_ID: localStorage.AFFILIATE_ID,
        PRODUCT_NAME: "",
      };
      ////console.log("last request pelo filtro")
      localStorage.LAST_REQUEST = JSON.stringify(lastRequest);

      if (products.length == 0) {
        for (const k in lojas2) {
          if (lojas2[k].id != Number(localStorage.AFFILIATE_ID)) {
            $(".listaFiliaisC").append(
              "<button onclick='setLocal(" +
              lojas2[k].id +
              ")' class='btn btn-primary'>Ver <b>'" +
              lojas2[k].affiliates_business_name +
              "'</b></button>"
            );
          }
          if (lojas2[k].id == Number(localStorage.AFFILIATE_ID)) {
            $("#nomeFilial").html(lojas2[k].affiliates_business_name);
          }
        }
      }
      $(".plusProducts").show();

      if (products.length == TOTAL_ITENS) {
        $(".plusProducts").show();
      } else {
        $(".plusProducts").hide();
      }
      //////////console.log(products)
      localStorage.PRODUCTS_SEARCH = JSON.stringify(products);
      // if (PRODUCTS.length == 0) {
      //     $(".listaDeProdutos").html("")
      // }
      if (continuando == false) {
        $(".listaDeProdutos").html("");
      }

      var PRODUCTS_SHOW = [];
      var breakPoint = 1000,
        count = 0;
      for (const k in products) {
        const prd9 = products[k]
        PRODUCTS.push(products[k]);
        console.log({ prd9 })
        var pictureToShow = products[k].product_thumbnail;
        if (
          pictureToShow == null ||
          pictureToShow == undefined ||
          pictureToShow == "null" ||
          pictureToShow == ""
        ) {
          pictureToShow = produtoURL(PRODUCTS_IMAGES).thumbnail;
        }
        if (pictureToShow == null || pictureToShow == "null") {
          pictureToShow = URL_IMAGES + "/produto-sem-imagem.jpg";
        }
        var ativo = "";
        if (
          getProductCaract(products[k].product_code).product_status == "active"
        ) {
          ativo = 'checked="true"';
        }
        var myValor = products[k].product_valor;
        if (myValor == "" || myValor == null) {
          myValor = 0;
        }

        var myEtiquetas = products[k].product_categoria;

        if (myEtiquetas == "" || myEtiquetas == null || myEtiquetas == "null") {
          myEtiquetas = "Novo,";
        }

        var especialClass = "";
        if (myEtiquetas.split(",")[0] == "Novo") {
          especialClass = "newProduct";
        }

        var html =
          '<div onclick="showModalProductF($(this))" product_code="' +
          products[k].product_code +
          '" product_ean="' +
          products[k].product_ean +
          '"  affiliate_id="' +
          products[k].product_affiliate_id +
          '" class="row radius20 product ' +
          especialClass +
          '" id="element' +
          k +
          "_" +
          products[k].product_ean +
          '">' +
          '<div style="max-width: 70px;" class="col-sm">' +
          '<label class="checkSmart"><input class="checka form-control" type="checkbox" /><span class="checkmark"></span></label>' +
          "</div>" +
          '<div  class="col-sm imgContainer">' +
          '<div style="background: url(' +
          pictureToShow +
          '), url(' + URL_IMAGES + '/produto-sem-imagem.jpg)" class="image img">' +
          //'<img id="'+products[k].product_ean+'" class="firstImage notCrash" style="min-width: 50px; min-height: 50px;" src="'+pictureToShow+'" />' +
          "</div>" +
          "</div>" +
          '<div style="max-width: 90px; min-width: 90px;     padding-top: 22px; text-align: center" class="col-sm">' +
          '<span class="codigoItem">' +
          Number(products[k].product_code) +
          "</span>" +
          "</div>" +
          '<div class="col-sm col-text" style="min-width: 200px !important; max-width: 200px !important;">' +
          '<label class="label" style="line-height: 1.5 !important;">' +
          products[k].product_site_name +
          "</label>" +
          "</div>" +
          '<div  style="min-width: 150px !important; max-width: 150px !important; padding: 10px"  class="col-sm">' +
          '<label style="font-size:10px !important; padding: 10px"  class="infoLabel infoValor">' +
          getAffiliateName(AFFILIATES, localStorage.AFFILIATE_ID) +
          "</label>" +
          "</div>" +
          '<div class="col-sm">' +
          '<label class="infoLabel label2">R$ ' +
          myValor.toLocaleString() +
          "</label>" +
          "</div>" +
          '<div class="col-sm">' +
          '<label class="infoLabel label2">' +
          products[k].product_site_estoque +
          " " +
          products[k].product_medida +
          "</label>" +
          "</div>" +
          '<div class="col-sm">' +
          '<label class="infoLabel label2">' +
          products[k].product_site_fabricacao +
          "</label>" +
          "</div>" +
          '<div style=" text-align: center" class="col-sm col-text">' +
          '<label style="    margin: auto !important; text-align: center" class="infoLabel label2">' +
          myEtiquetas.split(",")[0] +
          "</label>" +
          "</div>" +
          '<div class="col-sm">' +
          '<div class="switch__container  checkaLiga">' +
          '<input onchange="acaoCheckbox($(this))" acao="ativarProduto" ' +
          ativo +
          ' product_code="' +
          products[k].product_code +
          '" id="switch-shadow' +
          (k + 30) +
          '" class="switch switch--shadow" type="checkbox" />' +
          '<label class="naoAbreModal" for="switch-shadow' +
          (k + 30) +
          '"></label>' +
          "</div>" +
          "</div>" +
          "</div>";
        if (count <= breakPoint) {
          $(".listaDeProdutos").append(html);
          PRODUCTS_SHOW.push(products[k]);
        } else {
          break;
        }
        count++;
        getProductData(
          products[k].product_ean,
          "#element" + k + "_" + products[k].product_ean,
          $("#element" + k + "_" + products[k].product_ean)
        );
      }
      ////console.log("mudando o lastID 1", Number(products[products.length - 1]?.id))
      localStorage.LAST_ID = Number(products[products.length - 1]?.id);

      $(".row").children().css("opacity", "1");
      $(".row").removeClass(" bg-gray-400");

      $(".checka").change(function (e) {
        e.stopPropagation();
        e.preventDefault();
        ////////////console.log($(this)[0].checked);
        if ($(this)[0].checked) {
          $(this).parent().parent().parent().addClass("selecionado");
        } else {
          $(this).parent().parent().parent().removeClass("selecionado");
        }
      });

      $("#carregaMaisProdutos").html("Ver mais...");

      localStorage.LAST_REQUEST = "";

      $("modalLoading").hide();
      let totalFiltros = 0,
        currFilter = null,
        listFiedlsSearch = "";
      //console.log("parametros", parametros);

      for (const k in parametros) {
        if (parametros[k].active == true) {
          if (currFilter != parametros[k].colmun + "," + parametros[k].active) {
            totalFiltros++;
            listFiedlsSearch +=
              (parametros[k].value == null ? "" : parametros[k].value) + " ,";
          }
        }
        currFilter = parametros[k].colmun + "," + parametros[k].active;
      }
      $(".totalFiltros").text(totalFiltros);
      setTimeout(() => {
        ajustaFeedback(false, listFiedlsSearch);
      }, 3000);

      $(".close").click();
    },
    error: function (data2) {
      $("#carregaMaisProdutos").html("Erro :(");
      $("#carregaMaisProdutos").css("border", "2px solid red");
      ////////console.log(data2);
      if (data2.responseJSON.message.indexOf("token") > -1) {
        //alert("Necessário fazer login!<br>"+data2.responseJSON.message)
        setTimeout(() => {
          localStorage.peregrino =
            location.href.split("/")[location.href.split("/").length - 1];
          location.replace("/cms-login");
        }, 2000);
      } else {
        //alert("Algo saiu errado!<br>"+data2.responseJSON.message)
      }
      $("modalLoading").hide();
    },
    complete: function () { },
  });
}
function feedbackPeloFiltro(
  elemento,
  parametros,
  TOTAL_ITENS,
  continuando,
  limite
) {
  //console.log("buscando pelo feedback");
  var aguarde =
    '<div class="spinner-border text-light" style="color: white" role="status"><span class="sr-only">Loading...</span>  </div>';
  elemento.html(aguarde);
  $.ajax({
    type: "POST",
    url: mainHost + "/productAdvancedSearch",
    data: {
      affiliate_id: localStorage.AFFILIATE_ID,
      limite: limite,
      explain: true,
      lastId: 0,
      parameters: parametros,
    },
    headers: {
      "x-access-token": localStorage.token,
      is_product_image: true,
    },
    success: function (products) {
      //console.log("fdbf", products);
      var quantos = products[0].rows;
      if (quantos == undefined || quantos == "undefined") {
        quantos = 0;
      }
      ////////console.log(quantos)
      elemento.text("Mostrar " + quantos + " produtos");
    },
    error: function (data2) { },
    complete: function () {
      // ao final da requisição...
    },
  });
}


window.addEventListener('load', function () {
  updateTagsMarcas();
});



function updateTagsMarcas() {
  $.ajax({
    type: "POST",
    url: mainHost + "/tagsMarcas",
    headers: {
      "x-access-token": localStorage.token,
    },
    data: {
      affiliate_id: localStorage.AFFILIATE_ID,
    },
    success: function (data) {
      ////////console.log('tags e marcas')
      ////////console.log(data)
      localStorage.TAGS_MARCAS = JSON.stringify(data);
    },
    error: function (data) {
      ////////console.log(data)
    },
    complete: function () {
      // ao final da requisição...
    },
  });
}

function marcaPromocao(elemento) {
  //console.log(elemento.attr("tipo"), elemento);
  let DESCONTOS = JSON.parse(localStorage.listaDescontos);

  if (elemento.attr("tipo") == "subtracao") {
    DESCONTOS["subtracao"].active = elemento[0].checked;
    DESCONTOS["porcentagem"].active = !elemento[0].checked;
    $(".marcaPporcentagem")[0].checked = !elemento[0].checked;
  }
  if (elemento.attr("tipo") == "porcentagem") {
    DESCONTOS["porcentagem"].active = elemento[0].checked;
    DESCONTOS["subtracao"].active = !elemento[0].checked;

    $(".marcaPsubtracao")[0].checked = !elemento[0].checked;
  }
  if (elemento.attr("tipo") == "subtracaoProduto") {
    ////////console.log(  $(".marcaPsubtracao")[0].checked, !elemento[0].checked)
    DESCONTOS["subtracaoProduto"].active = elemento[0].checked;
    DESCONTOS["porcentagemProduto"].active = !elemento[0].checked;
    $(".marcaPporcentagemProduto")[0].checked = !elemento[0].checked;
  }
  if (elemento.attr("tipo") == "porcentagemProduto") {
    ////////console.log(  $(".marcaPsubtracao")[0].checked, !elemento[0].checked)
    DESCONTOS["porcentagemProduto"].active = elemento[0].checked;
    DESCONTOS["subtracaoProduto"].active = !elemento[0].checked;
    $(".marcaPsubtracaoProduto")[0].checked = !elemento[0].checked;
  }

  localStorage.listaDescontos = JSON.stringify(DESCONTOS);
}

function retornoAlteraMassa() {
  var html =
    '<div style="max-width:100% " class="container">' +
    '<div class="row" style=" max-width: 90%;     margin: 50px auto;  ">' +
    '<div style="max-width: 872px; margin: auto">' +
    '<h2 class="alteraMassaTitle">Alteração em Massa</h2>' +
    '<h3 class="alteraMassaSubTitle">Aqui você poderá alterar grandes volumes de produtos de maneira mais rápida</h3>' +
    "<br/><br/>" +
    '<div class="alteraMassaArea">' +
    "<br/><br/>" +
    '<div style="display: inline-flex">' +
    '<div class="alteraMassaIcone">' +
    "icone" +
    "</div>" +
    '<div><p class="alteraMassaNameFile">planilha_atualizada_fev_2023.xls</p></div>' +
    "</div>" +
    "<br/><br/>" +
    '<p class="alteraMassaNegrito">' +
    'A planilha selecionada irá alterar <span class="alteraMassaSpan">10.412 produtos</span>' +
    "</p>" +
    "</div>" +
    "<br/><br/>" +
    '<p class="alteraMassaNegrito">' +
    'Recomendamos que baixe a <span class="alteraMassaSpan">planilha com produtos atuais</span> antes de executar esta ação' +
    "</p>" +
    '<p class="alteraMassaNegrito">' +
    "Deseja continuar?" +
    "</p>" +
    "<br/><br/>" +
    '<div style="width: 100%; display: inline-flex">' +
    '<div class="alteraMassaCancelar">' +
    '<p class="alteraMassaTxtCancelar">Cancelar</p>' +
    "</div>" +
    '<div class="alteraMassaAlterar">' +
    '<p class="alteraMassaTxtAlterar">Sim, alterar produtos</p>' +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>";

  bootbox.alert({
    message: html,
    onShow: function () { },
    callback: function () { },
  });
}

function showModalProductF(elemento, e) {
  e = window.event;
  var senderElement = e.target;
  if (senderElement.className == "switch switch--shadow") {
    if (senderElement.className == "switch switch--shadow")
      acaoCheckbox($("#" + senderElement.id));
  } else {
    if (
      senderElement.className != "checkmark" &&
      senderElement.className != "naoAbreModal" &&
      senderElement.className != "checka form-control" &&
      senderElement.className != "switch switch--shadow"
    ) {
      var affiliate_id = elemento.attr("affiliate_id");
      var product_code = elemento.attr("product_code");
      var product_ean = elemento.attr("product_ean");

      $.ajax({
        type: "POST",
        url: mainHost + "/getFilesUrl",
        headers: {
          "x-access-token": localStorage.token,
        },
        data: {
          folderName: `${affiliate_id}/${product_ean}`
        },
        success: function (data) {
          modalProduct(PRODUCTS, product_code, affiliate_id, data?.data);
        },
        error: function (data) {
          console.log({ data })
        },
        complete: function () {
        },
      });
    }
  }
}

$("#checkFull").removeAttr("checked");
