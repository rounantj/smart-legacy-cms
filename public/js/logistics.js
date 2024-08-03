var AFFILIATES = [],
  count = 0;
var locais = JSON.parse(ajustStrigfy(localStorage.LOJAS_CADASTRADAS));
////console.log(locais)

// function ajustStrigfy(texto) {
//   for (let a = 0; a < 120; a++) {
//     texto = texto.replace(/"{/g, "{").replace(/}"/g, "}");
//     texto = texto.replace('"[', "[").replace(']"', "]");
//   }
//   return texto;
// }

var url = window.location.href.split("/");
url = url[url.length - 1];
for (const k in locais) {
  if (locais[k].affiliates_business_name.replace(/ /g, "_") == url) {
    //localStorage.AFFILIATE_ID = locais[k].id
  }
}

// function ajustStrigfy(texto) {
//   for (let a = 0; a < 120; a++) {
//     texto = texto.replace(/"{/g, "{").replace(/}"/g, "}");
//     texto = texto.replace('"[', "[").replace(']"', "]");
//   }
//   return texto;
// }

var AFFILIATE_ID = localStorage.AFFILIATE_ID;

var DELIVERY_DETAILS = [
  {
    descricao: "Entrega padrão",
    ativo: true,
    valor_fixo_status: true,
    valor_fixo: 100,
    valor_km_status: true,
    valor_km: 0,
    valor_km_texto: "",
    entrega_padrao: false,
    entrega_padrao_tempo: "",
    entrega_padrao_periodo: "",
    entrega_agendada: false,
    entrega_agendada_tempo: "",
    entrega_agendada_medida: "",
    entrega_agendada_horarios: "",
    localidade_padrao: false,
    localidade_exclui: false,
    localidade_exclui_ceps: "",
  },
];

let FULL_INFO_DELIVERY = [];
window.addEventListener('load', function () {
  $.ajax({
    type: "POST",
    url: mainHost + "/getById",

    headers: {
      "x-access-token": localStorage.token,
    },
    data: {
      affiliate_id: AFFILIATE_ID,
      table: "delivery_default",
      id_name: "affiliate_id",
      id_value: AFFILIATE_ID,
    },
    success: function (data) {
      console.log("pegando detalhes de entrega");
      console.log(data);
      FULL_INFO_DELIVERY = data;
      localStorage.FULL_DELIVERY_DEFAULT = JSON.stringify(data);
      if (data[0].delivery_methods != null) {
        DELIVERY_DETAILS = JSON.parse(ajustStrigfy(data[0].delivery_methods));
        //console.log(DELIVERY_DETAILS)
      }

      if (data[0].retirada_active == 1) {
        $("#switch-shadow985").attr("checked", "true");
      }

      if (
        data[0].lat_lon != undefined &&
        data[0].lat_lon != null &&
        data[0].lat_lon != ""
      ) {
        localStorage.my_lat_lon = data[0].lat_lon;
      }
      console.log("cep", data[0].faixa_cep);
      if (data[0].faixa_cep === 1) {
        try {
          $("#switch-shadow975")[0].checked = true;
          // $("#edicaoAvancadaCheck")[0].checked = false;
          $("#iframeIn").hide();
          $(".areaEsconde").show();
        } catch (err) { }
      }

      if (data[0].exclui_faixa_cep == 1) {
        $("#checkFull").attr("checked", "true");
        $(".faixasCepExcluir").show();
        $(".insereFaixaCepExcluir").show();
      }
      if (data[0].lat_lon_active == 1) {
        // $("#edicaoAvancadaCheck").attr("checked", "true");
        $("#iframe").fadeIn();
        $("#botaoEditarArea").fadeIn();
        $(".areaEsconde").fadeOut();
        if ($("#switch-shadow975")[0] != undefined) {
          $("#switch-shadow975")[0].checked = false;
        }
      }

      $("#descricaoRetirada").text(data[0].retirada_descricao);

      if (data[0].retirada_valor_fixo == 1) {
        $("#valorRetirada").text(data[0].retirada_valor);
      } else {
        $("#valorRetirada").text("0,00");
      }

      if (
        data[0].faixa_cep_values != null &&
        data[0].faixa_cep_values != undefined &&
        data[0].faixa_cep_values != ""
      ) {
        var CEPS = JSON.parse(ajustStrigfy(data[0].faixa_cep_values));
        ////console.log(CEPS)
        $(".faixasCep").html(myCEPSinclude(CEPS));
      }
      if (
        data[0].exclui_faixa_cep_values != null &&
        data[0].exclui_faixa_cep_values != undefined &&
        data[0].exclui_faixa_cep_values != ""
      ) {
        var CEPS2 = JSON.parse(ajustStrigfy(data[0].exclui_faixa_cep_values));
        ////console.log(CEPS2)
        $(".faixasCepExcluir").html(myCepsExclude(CEPS2));
      }

      localStorage.DELIVERY_DETAILS = JSON.stringify(DELIVERY_DETAILS);

      start();
      setTimeout(() => {
        if (data[0].faixa_cep === 1) {
          try {
            $("#switch-shadow975")[0].checked = true;
            // $("#edicaoAvancadaCheck")[0].checked = false;
            $("#iframeIn").hide();
            $(".areaEsconde").show();
          } catch (err) { }
        }
        console.log("após mostrar conteudo");
      }, 2000);
    },
    error: function (data) {
      console.log(data);
    },
    complete: function () {
      // ao final da requisição...
    },
  });
});



var contagem = 0;

function start() {
  console.log("start inicia");
  $(".listaMetodosEntrega").html("");
  for (const k in DELIVERY_DETAILS) {
    var html = "",
      ativado = " ",
      tagPreco = DELIVERY_DETAILS[k].valor_km.toLocaleString() + " por Km";
    if (DELIVERY_DETAILS[k].ativo) {
      ativado = 'checked="true"';
    }
    if (DELIVERY_DETAILS[k].valor_fixo_status) {
      tagPreco = DELIVERY_DETAILS[k].valor_fixo.toLocaleString();
    } else {
    }

    html =
      '<div metodu="' +
      DELIVERY_DETAILS[k].descricao +
      '" onclick="abreModal(this, $(this))" style="border: 1px solid #efefef; margin-top: 5%; padding: 5%" class="row radius20 metodoEntrega">' +
      '<div class="col-md-8">' +
      '<div class="col-md-12"><span class="segundoTxt descricaoMetodo">' +
      DELIVERY_DETAILS[k].descricao +
      "</span></div>" +
      '<div class="col-md-12"><span class="txtGold">R$ ' +
      tagPreco +
      "</span></div>" +
      "</div>" +
      '<div class="col-md-4" style="padding-top: 4%;">' +
      '<div class="switch__container"><input descricao="' +
      DELIVERY_DETAILS[k].descricao +
      '" onchange="uptadeCheckActive(\'' +
      DELIVERY_DETAILS[k].descricao +
      "')\" " +
      ativado +
      ' id="switch-shadow987' +
      contagem +
      '" class="switch switch--shadow" type="checkbox"><label for="switch-shadow987' +
      contagem +
      '"></label></div>' +
      "</div>" +
      "</div>";
    $(".listaMetodosEntrega").append(html);
    contagem++;
  }
}
function removeMetodoEntrega1(element) {
  console.log(element);
}

function uptadeCheckActive(descricao) {
  var check = null;
  ////console.log(DELIVERY_DETAILS)
  ////console.log("DELIVERY_DETAILS")
  for (const k in DELIVERY_DETAILS) {
    ////console.log(descricao, DELIVERY_DETAILS[k].descricao)
    if (DELIVERY_DETAILS[k].descricao == descricao) {
      check = DELIVERY_DETAILS[k].ativo;
    }
  }

  ////console.log("veja "+check)
  if (check == true) {
    updateDetailsDelivery(descricao, "ativo", false);
    ////console.log("Desativando")
  } else {
    updateDetailsDelivery(descricao, "ativo", true);
    ////console.log("Ativando")
  }
  ////console.log(DELIVERY_DETAILS)
}

function updateDetailsDelivery(descricao, columnValue, newValue) {
  console.log(descricao, columnValue, newValue);
  switch (columnValue) {
    case "descricao":
      for (const k in DELIVERY_DETAILS) {
        if (DELIVERY_DETAILS[k].descricao == descricao) {
          DELIVERY_DETAILS[k].descricao = newValue;
        }
      }

      break;
    case "ativo":
      for (const k in DELIVERY_DETAILS) {
        if (DELIVERY_DETAILS[k].descricao == descricao) {
          DELIVERY_DETAILS[k].ativo = newValue;
        }
      }

      break;
    case "valor_fixo_status":
      for (const k in DELIVERY_DETAILS) {
        if (DELIVERY_DETAILS[k].descricao == descricao) {
          DELIVERY_DETAILS[k].valor_fixo_status = newValue;
        }
      }

      break;
    case "valor_fixo":
      for (const k in DELIVERY_DETAILS) {
        if (DELIVERY_DETAILS[k].descricao == descricao) {
          DELIVERY_DETAILS[k].valor_fixo = newValue;
        }
      }

      break;
    case "valor_km_status":
      for (const k in DELIVERY_DETAILS) {
        if (DELIVERY_DETAILS[k].descricao == descricao) {
          DELIVERY_DETAILS[k].valor_km_status = newValue;
        }
      }

      break;
    case "valor_km":
      for (const k in DELIVERY_DETAILS) {
        if (DELIVERY_DETAILS[k].descricao == descricao) {
          DELIVERY_DETAILS[k].valor_km = newValue;
        }
      }

      break;
    case "valor_km_texto":
      for (const k in DELIVERY_DETAILS) {
        if (DELIVERY_DETAILS[k].descricao == descricao) {
          DELIVERY_DETAILS[k].valor_km_texto = newValue;
        }
      }

      break;
    case "entrega_padrao":
      for (const k in DELIVERY_DETAILS) {
        if (DELIVERY_DETAILS[k].descricao == descricao) {
          DELIVERY_DETAILS[k].entrega_padrao = newValue;
        }
      }

      break;
    case "entrega_padrao_tempo":
      for (const k in DELIVERY_DETAILS) {
        if (DELIVERY_DETAILS[k].descricao == descricao) {
          DELIVERY_DETAILS[k].entrega_padrao_tempo = newValue;
        }
      }

      break;
    case "entrega_padrao_periodo":
      for (const k in DELIVERY_DETAILS) {
        if (DELIVERY_DETAILS[k].descricao == descricao) {
          DELIVERY_DETAILS[k].entrega_padrao_periodo = newValue;
        }
      }

      break;
    case "entrega_agendada":
      for (const k in DELIVERY_DETAILS) {
        if (DELIVERY_DETAILS[k].descricao == descricao) {
          DELIVERY_DETAILS[k].entrega_agendada = newValue;
        }
      }

      break;
    case "entrega_agendada_tempo":
      for (const k in DELIVERY_DETAILS) {
        if (DELIVERY_DETAILS[k].descricao == descricao) {
          DELIVERY_DETAILS[k].entrega_agendada_tempo = newValue;
        }
      }

      break;
    case "entrega_agendada_horarios":
      for (const k in DELIVERY_DETAILS) {
        if (DELIVERY_DETAILS[k].descricao == descricao) {
          DELIVERY_DETAILS[k].entrega_agendada_horarios = newValue;
        }
      }

      break;
    case "localidade_padrao":
      for (const k in DELIVERY_DETAILS) {
        if (DELIVERY_DETAILS[k].descricao == descricao) {
          DELIVERY_DETAILS[k].localidade_padrao = newValue;
        }
      }

      break;
    case "localidade_exclui":
      for (const k in DELIVERY_DETAILS) {
        if (DELIVERY_DETAILS[k].descricao == descricao) {
          DELIVERY_DETAILS[k].localidade_exclui = newValue;
        }
      }

      break;
    case "localidade_exclui_ceps":
      for (const k in DELIVERY_DETAILS) {
        if (DELIVERY_DETAILS[k].descricao == descricao) {
          DELIVERY_DETAILS[k].localidade_exclui_ceps = newValue;
        }
      }

      break;
    default:
      break;
  }

  ////console.log(DELIVERY_DETAILS)
  localStorage.DELIVERY_DETAILS = JSON.stringify(DELIVERY_DETAILS);
}

// $("#edicaoAvancadaCheck").change(function () {
//   //////console.log("Mudei")
//   $("#iframe").fadeIn();
//   $("#botaoEditarArea").fadeIn();
//   $(".areaEsconde").fadeOut();
//   $("#switch-shadow975")[0].checked = false;
// });

$("#switch-shadow975").change(function () {
  $("#iframe").fadeOut();
  $("#botaoEditarArea").fadeOut();
  $(".areaEsconde").fadeIn();
  //$("#edicaoAvancadaCheck")[0].checked = false;
});

$("#botaoEditarArea").click(function () {
  var html =
    '<iframe src="/map/mapas/draw.html"style="border:0; border-radius: 20px; width:100%; height: 85vh" allowfullscreen="" loading="lazy"></iframe>';
  bootbox.alert({
    message: html,
    onShow: function () {
      $(".fa-times-circle").click(function () {
        $(this).parent().parent().remove();
      });
      $(".cep").mask("00000-000");
    },
    callback: function () {
      //////console.log("Saiu do draw map!");
      updateDefaultParameters($("#iframeIn"));
      $("#iframeIn").hide();
      $("#iframeIn").attr("src", "");
      setTimeout(() => {
        $("#iframeIn").attr("src", "/map/mapas/areaView.html");
        $("#iframeIn").show();
      }, 300);
      $(".ol-attribution").hide();
    },
  });

  $(".modal-footer").hide();
});

function abreModal(e, elemento) {
  e = window.event;
  var src = e.target || e.srcElement;
  ////console.log(e)
  ////console.log(src)

  var descricaoMetodo = elemento.attr("metodu");
  if (e.target.className.indexOf("switch") > -1 || e.target.className == "") {
    ////console.log("Nao e pra abrir "+e.target.className)
  } else {
    ////console.log("abriu "+e.target.className)
    modalEntrega(descricaoMetodo);
  }
}

$(".metodoEntregaRetirada").click(function (event) {
  if (
    event.target.className.indexOf("switch") > -1 ||
    event.target.className == ""
  ) {
    ////console.log("Nao e pra abrir "+event.target.className)
  } else {
    ////console.log("abriu "+event.target.className)
    modalEntregaRetirada($(this).find(".segundoTxt").text());
  }
});

$(".novoMetodo").click(function (event) {
  modalEntrega("");
});

function modalEntrega(descricaoMetodo) {
  var dadosMetodo = [];
  for (const k in DELIVERY_DETAILS) {
    if (DELIVERY_DETAILS[k].descricao == descricaoMetodo) {
      dadosMetodo = DELIVERY_DETAILS[k];
    }
  }
  console.log("DADOS DO METODOD", dadosMetodo);
  var nome_metodo = descricaoMetodo;
  localStorage.METODO_EDICAO = nome_metodo;

  let binIcon = `<svg  xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 21 21" style="margin: auto">&gt;<defs></defs><path class="a" d="M10.937,16H3.063A2.208,2.208,0,0,1,.875,13.778V2.666H.438a.444.444,0,0,1,0-.889H4.375V1.334A1.324,1.324,0,0,1,5.687,0H8.313A1.324,1.324,0,0,1,9.625,1.334v.444h3.937a.444.444,0,0,1,0,.889h-.437V13.778A2.208,2.208,0,0,1,10.937,16ZM1.75,2.666V13.778a1.325,1.325,0,0,0,1.313,1.334h7.875a1.325,1.325,0,0,0,1.313-1.334V2.666ZM5.687.889a.441.441,0,0,0-.437.445v.444h3.5V1.334A.441.441,0,0,0,8.313.889Zm3.5,11.556A.442.442,0,0,1,8.75,12V5.778a.437.437,0,1,1,.875,0V12A.441.441,0,0,1,9.188,12.445Zm-4.375,0A.441.441,0,0,1,4.375,12V5.778a.437.437,0,1,1,.875,0V12A.442.442,0,0,1,4.812,12.445Z" transform="translate(4 3)"></path></svg>`;
  var html =
    '<div style="max-width:100% " class="container">' +
    '<div class="row" style="    box-shadow: 0px 3px 5px #edf2f6; max-width: 90%;    margin: -0.8% auto;  ">' +
    '<div content="caracteristicas" class="col-md tabModal tabModalActive">' +
    '<label class="labelTab"  style="text-align:center">Características</label>' +
    "</div>" +
    '<div content="regras" class="col-md tabModal">' +
    '<label class="labelTab"  style="text-align:center">Regras</label>' +
    "</div>" +
    '<div content="areaEntrega" class="col-md tabModal">' +
    '<label class="labelTab"  style="text-align:center">Área de entrega</label>' +
    "</div>" +
    '<div class="col-md ">' +
    "<div onclick=\"deletaMetodoModal('" +
    nome_metodo +
    '\')" style="cursor:pointer;border-radius: 20px; font: normal normal bold 1rem Roboto; background-color: #f6b504; max-width: 200px; height: 40px; border: 2px solid #f6b504; float: left; margin:5% auto" class="input-group">' +
    '<label  style="cursor:pointer;margin: -7% auto;text-align: center;    min-width: 60%; color: white !important; font-size: 1.2rem" class="label">Excluir</label>' +
    "</div>" +
    "</div>" +
    '<div class="col-md">' +
    '<div onclick="cancelModal()" style="cursor:pointer;border-radius: 20px; font: normal normal bold 1rem Roboto; background-color: #ffffff; max-width: 200px; height: 40px; border: 2px solid #f6b504; float: right; margin:5% auto" class="input-group">' +
    '<label  style="cursor:pointer;margin:-7%  auto;text-align: center;    min-width: 60%;color: #f6b504 !important; font-size: 1.2rem" class="label">Cancelar</label>' +
    "</div>" +
    "</div>" +
    '<div class="col-md ">' +
    "<div onclick=\"salvaModal('" +
    nome_metodo +
    '\')" style="cursor:pointer;border-radius: 20px; font: normal normal bold 1rem Roboto; background-color: #f6b504; max-width: 200px; height: 40px; border: 2px solid #f6b504; float: left; margin:5% auto" class="input-group">' +
    '<label  style="cursor:pointer;margin: -7% auto;text-align: center;    min-width: 60%; color: white !important; font-size: 1.2rem" class="label">Salvar</label>' +
    "</div>" +
    "</div>" +
    "</div>" +
    '<hr class="baixoCabecalho" style="position: fixed;top: 115px !important;left: 0px !important;width: 100%;box-shadow: 2px 2px 2px silver;"></hr>' +
    //======================================================AREA DE ENTREGA============================================================================================================
    '<div id="areaEntrega" style="max-width:90% ; margin-top: 2%; display: none"  class="container tabContent">' +
    '<div class="container" style="max-width: 70%;">' +
    '<div style="padding: 5%; margin-top: 3%;" class="col-md-12 subGrupo2">' +
    '<div class="row">' +
    '<div style="margin-top: -1%;" class="switch__container ajuste2"><input fieldName="localidade_padrao"   onchange="alteraField($(this))"  checked="true" id="switch-shadow97555" class="switch switch--shadow detalheEntrega" type="checkbox" /><label for="switch-shadow97555"></label></div>' +
    '<label class="txtLabel" style="margin-left: 3%;"> Igual a Configurações Gerais</label>' +
    "</div>" +
    "</div>" +
    "</div>" +
    '<div class="container" style="max-width: 70%; margin-top: 10px">' +
    '<div style="padding: 5%; margin-top: 3%; max-height: 60vh" class="col-md-12 subGrupo2 verticalScroll">' +
    '<div class="row">' +
    '<div style="margin-top: -1%;" class="switch__container ajuste2"><input fieldName="localidade_exclui" id="switch-shadow97445" class="switch switch--shadow detalheEntrega"   onchange="alteraField($(this))" type="checkbox" /><label for="switch-shadow97445"></label></div>' +
    '<label class="txtLabel" style="margin-left: 3%;"> Eliminar faixas de CEP</label>' +
    "</div>" +
    '<label style="margin-top: 10px" class="txtLabel modalLabelTxt">Selecione essa opção caso queria remover alguma faixa de CEP deste método de entrega</label>' +
    "<br><br><br>" +
    '<div class="maisFaixa">' +
    "</div>" +
    "</div>" +
    '<div onclick="addMaisFaixa()" style="cursor: pointer; margin: 5% 0%;cursor: pointer; border-radius: 20px; font: bold 1rem Roboto; background-color: rgb(246, 181, 4); max-width: 200px; height: 40px; border: 2px solid rgb(246, 181, 4);     opacity: 1; cursor: pointer" class="input-group novaFaixaCep">' +
    '<div style="border: none; margin: auto;" class="input-group-append">' +
    '<div style="border: none; margin: auto; padding: 2%;" class="input-group-text">' +
    '<svg xmlns="http://www.w3.org/2000/svg" style="margin: -20% auto 0 0; fill: white;" width="24" height="24" viewBox="0 0 24 24">' +
    "<defs></defs>" +
    '<path class="a" d="M10.5,21A10.5,10.5,0,0,1,3.075,3.075,10.5,10.5,0,1,1,10.5,21Zm0-20A9.5,9.5,0,1,0,20,10.5,9.511,9.511,0,0,0,10.5,1Zm0,14a.5.5,0,0,1-.5-.5V11H6.5a.5.5,0,0,1,0-1H10V6.5a.5.5,0,0,1,1,0V10h3.5a.5.5,0,1,1,0,1H11v3.5A.5.5,0,0,1,10.5,15Z" transform="translate(2 2)"></path>' +
    "</svg>" +
    "</div>" +
    "</div>" +
    '<label style="margin: -1% auto; min-width: 60%; color: white !important; cursor: pointer" class="label">Nova faixa de CEP</label>' +
    "</div>" +
    "</div>" +
    "</div>" +
    //======================================================AREA DE ENTREGA============================================================================================================
    '<div id="regras" style="max-width:90% ; margin-top: 2%; display: none"  class="container tabContent verticalScroll notScroll">' +
    '<div class="container" style="max-width: 100%;     max-height: 70vh;">' +
    '<div style="padding: 5%; margin-top: 3%;" class="col-md-12 subGrupo2">' +
    '<div class="row">' +
    '<div style="margin-top: -1%;" class="switch__container ajuste2"><input fieldName="entrega_padrao" id="switch-shadow1975" class="switch switch--shadow detalheEntrega"   onchange="alteraField($(this))" type="checkbox" /><label for="switch-shadow1975"></label></div>' +
    '<label class="txtLabel" style="margin-left: 3%;"> Entrega Padrão</label>' +
    "</div>" +
    '<label style="margin-top: 10px" class="txtLabel modalLabelTxt">Esse é o método mais simples de entrega. Escolha o texto que será exibido ao seu cliente:</label>' +
    "<br><br><br>" +
    '<div class="row">' +
    '<div class="col-md-3">' +
    '<label class="txtLabel">Tempo de entrega</label><br>' +
    '<div class="group-input2"><input onchange="alteraD($(this),\'.horas48\')" fieldName="entrega_padrao_tempo" class="form-control inputProduct  detalheEntrega"    placeholder="Em até 48h"  ></div><br>' +
    "</div>" +
    '<div class="col-md-6">' +
    '<label class="txtLabel">Período de entrega</label><br>' +
    '<div class="group-input2"><input onchange="alteraD($(this),\'.horario48\')" fieldName="entrega_padrao_periodo" class="form-control inputProduct  detalheEntrega"    placeholder="De segunda a sábado"  ></div><br>' +
    "</div>" +
    '<div class="col-md-3">' +
    '<label class="txtLabel">Visualização</label><br>' +
    '<div style="height: auto !important" class="boxIconDefault2 boxIconeActive"><svg class="svg-inline--fa fa-check fa-w-16 iconSelectedCheck2" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg><!-- <i class="fas fa-check iconSelectedCheck2"></i> Font Awesome fontawesome.com -->' +
    '<p class="horas48"></p><br>' +
    '<p class="horario48"></p>' +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    '<div style="padding: 5%; margin-top: 3%;" class="col-md-12 subGrupo2">' +
    '<div class="row">' +
    '<div style="margin-top: -1%;" class="switch__container ajuste2"><input fieldName="entrega_agendada" id="switch-shadow900" class="switch switch--shadow detalheEntrega"   onchange="alteraField($(this))" type="checkbox" /><label for="switch-shadow900"></label></div>' +
    '<label class="txtLabel" style="margin-left: 3%;"> Entrega Agendada</label>' +
    "</div>" +
    '<label style="margin-top: 10px" class="txtLabel modalLabelTxt">Permita que seu cliente escolha o dia e faixa de horário para receber a entrega.</label>' +
    "<br><br><br>" +
    '<span class="segundoTxt modalTitulo2">Tempo mínimo</span><br>' +
    '<label class="txtLabel modalLabelTxt">Defina se deseja um valor fixo para essa entrega independente da localidade ou utilize um preço Baseado na distância.</label>' +
    '<div class="row">' +
    '<div class="meuCombo">' +
    '<select  fieldName="entrega_agendada_tempo" class="detalheEntrega"   onchange="alteraField($(this))">' +
    "<option>01</option>" +
    "<option>02</option>" +
    "<option>03</option>" +
    "<option>04</option>" +
    "<option>05</option>" +
    "<option>06</option>" +
    "<option>07</option>" +
    "<option>08</option>" +
    "<option>09</option>" +
    "<option>10</option>" +
    "<option>11</option>" +
    "<option>12</option>" +
    "<option>13</option>" +
    "<option>14</option>" +
    "<option>15</option>" +
    "<option>16</option>" +
    "<option>17</option>" +
    "<option>19</option>" +
    "<option>20</option>" +
    "<option>21</option>" +
    "<option>22</option>" +
    "<option>23</option>" +
    "<option>24</option>" +
    "</select>" +
    "</div>" +
    '<div class="meuCombo">' +
    '<select   fieldName="entrega_agendada_medida" class="detalheEntrega"   onchange="alteraField($(this))">' +
    "<option>Horas</option>" +
    "<option>Dias</option>" +
    "<option>Semanas</option>" +
    "</select>" +
    "</div>" +
    "</div>" +
    "<br><br><br>" +
    '<span class="segundoTxt modalTitulo2">Definir Horários</span><br>' +
    '<div  class="corridaHorarios horizontalScroll">' +
    '<div dia="segunda" class="cardHorarios card horarioEntrega">' +
    '<div class="card-header">' +
    '<div style="justify-content: center;padding: 10px;" class="row">' +
    '<div style="margin-top: -1%;" class="switch__container ajuste2"><input id="switch-shadow975414' +
    contagem +
    '" class="switch switch--shadow ativadoS" type="checkbox" /><label for="switch-shadow975414' +
    contagem +
    '"></label></div>' +
    '<label class="txtLabel" style="margin-left: 3%;"> Segunda</label>' +
    "</div>" +
    "</div>" +
    '<div class="card-body">' +
    '<div dia="segunda" class="listaHorariosCadastrados verticalScroll notScroll">' +
    "</div>" +
    "</div>" +
    '<div class="novoHoraAdd card-footer">' +
    '<div class="row">' +
    '<div class="col-md-1">  ' +
    '<svg id="_01_Icons_Line_plus-circle" style="margin: auto" data-name="01) Icons / Line /  plus-circle" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">' +
    '<path id="plus-circle" d="M10.5,21A10.5,10.5,0,0,1,3.075,3.075,10.5,10.5,0,1,1,10.5,21Zm0-20A9.5,9.5,0,1,0,20,10.5,9.511,9.511,0,0,0,10.5,1Zm0,14a.5.5,0,0,1-.5-.5V11H6.5a.5.5,0,0,1,0-1H10V6.5a.5.5,0,0,1,1,0V10h3.5a.5.5,0,1,1,0,1H11v3.5A.5.5,0,0,1,10.5,15Z" transform="translate(2 2)" fill="#687c97"/>' +
    "</svg>" +
    "</div>" +
    '<div class="col-md-1">' +
    '<label class="txtLabel" style="margin:auto 3%;"> Nova faixa de horário</label>' +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    //Terça
    '<div dia="terca" class="cardHorarios card">' +
    '<div class="card-header">' +
    '<div style="justify-content: center;padding: 10px;" class="row">' +
    '<div style="margin-top: -1%;" class="switch__container ajuste2"><input id="switch-shadow975424' +
    contagem +
    '" class="switch switch--shadow ativadoS" type="checkbox" /><label for="switch-shadow975424' +
    contagem +
    '"></label></div>' +
    '<label class="txtLabel" style="margin-left: 3%;"> Terça</label>' +
    "</div>" +
    "</div>" +
    '<div class="card-body">' +
    '<div  dia="terca" class="listaHorariosCadastrados verticalScroll notScroll">' +
    "</div>" +
    "</div>" +
    '<div class="novoHoraAdd card-footer">' +
    '<div class="row">' +
    '<div class="col-md-1">  ' +
    '<svg id="_01_Icons_Line_plus-circle" style="margin: auto" data-name="01) Icons / Line /  plus-circle" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">' +
    '<path id="plus-circle" d="M10.5,21A10.5,10.5,0,0,1,3.075,3.075,10.5,10.5,0,1,1,10.5,21Zm0-20A9.5,9.5,0,1,0,20,10.5,9.511,9.511,0,0,0,10.5,1Zm0,14a.5.5,0,0,1-.5-.5V11H6.5a.5.5,0,0,1,0-1H10V6.5a.5.5,0,0,1,1,0V10h3.5a.5.5,0,1,1,0,1H11v3.5A.5.5,0,0,1,10.5,15Z" transform="translate(2 2)" fill="#687c97"/>' +
    "</svg>" +
    "</div>" +
    '<div class="col-md-1">' +
    '<label class="txtLabel" style="margin:auto 3%;"> Nova faixa de horário</label>' +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    //Quarta
    '<div  dia="quarta" class="cardHorarios card">' +
    '<div class="card-header">' +
    '<div style="justify-content: center;padding: 10px;" class="row">' +
    '<div style="margin-top: -1%;" class="switch__container ajuste2"><input id="switch-shadow975434' +
    contagem +
    '" class="switch switch--shadow ativadoS" type="checkbox" /><label for="switch-shadow975434' +
    contagem +
    '"></label></div>' +
    '<label class="txtLabel" style="margin-left: 3%;"> Quarta</label>' +
    "</div>" +
    "</div>" +
    '<div class="card-body">' +
    '<div dia="quarta" class="listaHorariosCadastrados verticalScroll notScroll">' +
    "</div>" +
    "</div>" +
    '<div class="novoHoraAdd card-footer">' +
    '<div class="row">' +
    '<div class="col-md-1">  ' +
    '<svg id="_01_Icons_Line_plus-circle" style="margin: auto" data-name="01) Icons / Line /  plus-circle" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">' +
    '<path id="plus-circle" d="M10.5,21A10.5,10.5,0,0,1,3.075,3.075,10.5,10.5,0,1,1,10.5,21Zm0-20A9.5,9.5,0,1,0,20,10.5,9.511,9.511,0,0,0,10.5,1Zm0,14a.5.5,0,0,1-.5-.5V11H6.5a.5.5,0,0,1,0-1H10V6.5a.5.5,0,0,1,1,0V10h3.5a.5.5,0,1,1,0,1H11v3.5A.5.5,0,0,1,10.5,15Z" transform="translate(2 2)" fill="#687c97"/>' +
    "</svg>" +
    "</div>" +
    '<div class="col-md-1">' +
    '<label class="txtLabel" style="margin:auto 3%;"> Nova faixa de horário</label>' +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    //Quinta
    '<div  dia="quinta" class="cardHorarios card">' +
    '<div class="card-header">' +
    '<div style="justify-content: center;padding: 10px;" class="row">' +
    '<div style="margin-top: -1%;" class="switch__container ajuste2"><input id="switch-shadow975444' +
    contagem +
    '" class="switch switch--shadow ativadoS" type="checkbox" /><label for="switch-shadow975444' +
    contagem +
    '"></label></div>' +
    '<label class="txtLabel" style="margin-left: 3%;"> Quinta</label>' +
    "</div>" +
    "</div>" +
    '<div class="card-body">' +
    '<div dia="quinta" class="listaHorariosCadastrados verticalScroll notScroll">' +
    "</div>" +
    "</div>" +
    '<div class="novoHoraAdd card-footer">' +
    '<div class="row">' +
    '<div class="col-md-1">  ' +
    '<svg id="_01_Icons_Line_plus-circle" style="margin: auto" data-name="01) Icons / Line /  plus-circle" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">' +
    '<path id="plus-circle" d="M10.5,21A10.5,10.5,0,0,1,3.075,3.075,10.5,10.5,0,1,1,10.5,21Zm0-20A9.5,9.5,0,1,0,20,10.5,9.511,9.511,0,0,0,10.5,1Zm0,14a.5.5,0,0,1-.5-.5V11H6.5a.5.5,0,0,1,0-1H10V6.5a.5.5,0,0,1,1,0V10h3.5a.5.5,0,1,1,0,1H11v3.5A.5.5,0,0,1,10.5,15Z" transform="translate(2 2)" fill="#687c97"/>' +
    "</svg>" +
    "</div>" +
    '<div class="col-md-1">' +
    '<label class="txtLabel" style="margin:auto 3%;"> Nova faixa de horário</label>' +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    //Sexta
    '<div dia="sexta" class="cardHorarios card">' +
    '<div class="card-header">' +
    '<div style="justify-content: center;padding: 10px;" class="row">' +
    '<div style="margin-top: -1%;" class="switch__container ajuste2"><input id="switch-shadow975454' +
    contagem +
    '" class="switch switch--shadow ativadoS" type="checkbox" /><label for="switch-shadow975454' +
    contagem +
    '"></label></div>' +
    '<label class="txtLabel" style="margin-left: 3%;"> Sexta</label>' +
    "</div>" +
    "</div>" +
    '<div class="card-body">' +
    '<div dia="sexta" class="listaHorariosCadastrados verticalScroll notScroll">' +
    "</div>" +
    "</div>" +
    '<div class="novoHoraAdd card-footer">' +
    '<div class="row">' +
    '<div class="col-md-1">  ' +
    '<svg id="_01_Icons_Line_plus-circle" style="margin: auto" data-name="01) Icons / Line /  plus-circle" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">' +
    '<path id="plus-circle" d="M10.5,21A10.5,10.5,0,0,1,3.075,3.075,10.5,10.5,0,1,1,10.5,21Zm0-20A9.5,9.5,0,1,0,20,10.5,9.511,9.511,0,0,0,10.5,1Zm0,14a.5.5,0,0,1-.5-.5V11H6.5a.5.5,0,0,1,0-1H10V6.5a.5.5,0,0,1,1,0V10h3.5a.5.5,0,1,1,0,1H11v3.5A.5.5,0,0,1,10.5,15Z" transform="translate(2 2)" fill="#687c97"/>' +
    "</svg>" +
    "</div>" +
    '<div class="col-md-1">' +
    '<label class="txtLabel" style="margin:auto 3%;"> Nova faixa de horário</label>' +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    //Sábado
    '<div  dia="sabado" class="cardHorarios card">' +
    '<div class="card-header">' +
    '<div style="justify-content: center;padding: 10px;" class="row">' +
    '<div style="margin-top: -1%;" class="switch__container ajuste2"><input id="switch-shadow975464' +
    contagem +
    '" class="switch switch--shadow ativadoS" type="checkbox" /><label for="switch-shadow975464' +
    contagem +
    '"></label></div>' +
    '<label class="txtLabel" style="margin-left: 3%;"> Sábado</label>' +
    "</div>" +
    "</div>" +
    '<div class="card-body">' +
    '<div dia="sabado" class="listaHorariosCadastrados verticalScroll notScroll">' +
    "</div>" +
    "</div>" +
    '<div class="novoHoraAdd card-footer">' +
    '<div class="row">' +
    '<div class="col-md-1">  ' +
    '<svg id="_01_Icons_Line_plus-circle" style="margin: auto" data-name="01) Icons / Line /  plus-circle" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">' +
    '<path id="plus-circle" d="M10.5,21A10.5,10.5,0,0,1,3.075,3.075,10.5,10.5,0,1,1,10.5,21Zm0-20A9.5,9.5,0,1,0,20,10.5,9.511,9.511,0,0,0,10.5,1Zm0,14a.5.5,0,0,1-.5-.5V11H6.5a.5.5,0,0,1,0-1H10V6.5a.5.5,0,0,1,1,0V10h3.5a.5.5,0,1,1,0,1H11v3.5A.5.5,0,0,1,10.5,15Z" transform="translate(2 2)" fill="#687c97"/>' +
    "</svg>" +
    "</div>" +
    '<div class="col-md-1">' +
    '<label class="txtLabel" style="margin:auto 3%;"> Nova faixa de horário</label>' +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    //Domingo
    '<div dia="domingo" class="cardHorarios card">' +
    '<div class="card-header">' +
    '<div style="justify-content: center;padding: 10px;" class="row">' +
    '<div style="margin-top: -1%;" class="switch__container ajuste2"><input id="switch-shadow975474' +
    contagem +
    '" class="switch switch--shadow ativadoS" type="checkbox" /><label for="switch-shadow975474' +
    contagem +
    '"></label></div>' +
    '<label class="txtLabel" style="margin-left: 3%;"> Domingo</label>' +
    "</div>" +
    "</div>" +
    '<div class="card-body">' +
    '<div dia="domingo" class="listaHorariosCadastrados verticalScroll notScroll">' +
    "</div>" +
    "</div>" +
    '<div class="novoHoraAdd card-footer">' +
    '<div class="row">' +
    '<div class="col-md-1">  ' +
    '<svg id="_01_Icons_Line_plus-circle" style="margin: auto" data-name="01) Icons / Line /  plus-circle" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">' +
    '<path id="plus-circle" d="M10.5,21A10.5,10.5,0,0,1,3.075,3.075,10.5,10.5,0,1,1,10.5,21Zm0-20A9.5,9.5,0,1,0,20,10.5,9.511,9.511,0,0,0,10.5,1Zm0,14a.5.5,0,0,1-.5-.5V11H6.5a.5.5,0,0,1,0-1H10V6.5a.5.5,0,0,1,1,0V10h3.5a.5.5,0,1,1,0,1H11v3.5A.5.5,0,0,1,10.5,15Z" transform="translate(2 2)" fill="#687c97"/>' +
    "</svg>" +
    "</div>" +
    '<div class="col-md-1">' +
    '<label class="txtLabel" style="margin:auto 3%;"> Nova faixa de horário</label>' +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    //======================================================ABA DE CARACTERÍSTICAS==================================================================================================================
    '<div id="caracteristicas" style="max-width:90% ; margin-top: 2%;"  class="container tabContent">' +
    '<div class="container" style="max-width: 70%;">' +
    '<div style="padding: 5%;" class="col-md-12 ">' +
    '<div class="row">' +
    '<div style="margin-top: -1%;" class="switch__container ajuste2"><input fieldName="ativo" id="switch-shadow3975" class="switch switch--shadow detalheEntrega"   onchange="alteraField($(this))" type="checkbox" /><label for="switch-shadow3975"></label></div>' +
    '<label class="txtLabel" style="margin-left: 3%;"> Método ativo</label>' +
    "</div>" +
    '<div class="areaEsconde">' +
    "<br />" +
    '<label class="txtLabel">Nome do método</label>' +
    '<div class="group-input2"><input fieldName="descricao" class="form-control inputProduct detalheEntrega"   onchange="alteraField($(this))" value="' +
    nome_metodo +
    '" placeholder="Nome do método" /></div>' +
    "<hr />" +
    '<span class="segundoTxt modalTitulo2">Valor de entrega</span>' +
    '<label class="txtLabel modalLabelTxt">Defina se deseja um valor fixo para essa entrega independente da localidade ou utilize um preço Baseado na distância.</label>' +
    '<div style="padding: 5%; margin-top: 3%;" class="col-md-12 subGrupo2">' +
    '<div class="row">' +
    '<div style="margin-top: -1%;" class="switch__container ajuste2"><input fieldName="valor_fixo_status" id="switch-shadow4975" class="switch switch--shadow detalheEntrega"   onchange="alteraField($(this))" type="checkbox" /><label for="switch-shadow4975"></label></div>' +
    '<label class="txtLabel" style="margin-left: 3%;"> Valor Fixo</label>' +
    "</div>" +
    '<div   style="display: inline-flex; max-width: 50%; background: #EFEFEF;"><div class="iconLogistica" style=" height: 45px;width: 50px; margin: auto 2%!important;    background: #F9FAFB 0% 0% no-repeat padding-box !important;"><svg xmlns="http://www.w3.org/2000/svg" style="margin: 10px 15px;" width="15" height="25" viewBox="0 0 10.015 15.574"><path id="_105" data-name="105" d="M9.052-6.032c0-3.651-5.346-2.695-5.346-4.375,0-.464.42-.7,1.058-.7a7.9,7.9,0,0,1,3.274,1.087l1-2.1A7.5,7.5,0,0,0,5.865-13.2v-2.115H3.939v2.13c-1.854.3-3.013,1.42-3.013,3.028,0,3.593,5.346,2.55,5.346,4.274,0,.536-.493.826-1.275.826A6.483,6.483,0,0,1,1.317-6.6L.288-4.525a7.485,7.485,0,0,0,3.651,1.55V-.744H5.865V-2.961C7.691-3.207,9.052-4.25,9.052-6.032Z" transform="translate(0.337 15.818)" fill="none" stroke="#687c96" stroke-width="1"></path></svg></div><input fieldName="valor_fixo" class="form-control inputProduct detalheEntrega"   onchange="alteraField($(this))" type="number" placeholder="R$ 0.00" value="89.99" id="valorProduto"></div>' +
    "<br />" +
    "<br />" +
    '<div style="margin-top: 5%" class="row">' +
    '<div style="margin-top: -1%;" class="switch__container ajuste2"><input fieldName="valor_km_status" id="switch-shadow6975" class="switch switch--shadow detalheEntrega"  onchange="alteraField($(this))" type="checkbox" /><label for="switch-shadow6975"></label></div>' +
    '<label class="txtLabel" style="margin-left: 3%;"> Por Distância</label>' +
    "</div>" +
    '<div style="margin-left: 0px;" class="row">' +
    '<div   style="display: inline-flex; max-width: 35%; background: #EFEFEF;"><div class="iconLogistica" style=" height: 45px;width: 50px; margin: auto 2%!important;    background: #F9FAFB 0% 0% no-repeat padding-box !important;"><svg xmlns="http://www.w3.org/2000/svg" style="margin: 10px 15px;" width="15" height="25" viewBox="0 0 10.015 15.574"><path id="_105" data-name="105" d="M9.052-6.032c0-3.651-5.346-2.695-5.346-4.375,0-.464.42-.7,1.058-.7a7.9,7.9,0,0,1,3.274,1.087l1-2.1A7.5,7.5,0,0,0,5.865-13.2v-2.115H3.939v2.13c-1.854.3-3.013,1.42-3.013,3.028,0,3.593,5.346,2.55,5.346,4.274,0,.536-.493.826-1.275.826A6.483,6.483,0,0,1,1.317-6.6L.288-4.525a7.485,7.485,0,0,0,3.651,1.55V-.744H5.865V-2.961C7.691-3.207,9.052-4.25,9.052-6.032Z" transform="translate(0.337 15.818)" fill="none" stroke="#687c96" stroke-width="1"></path></svg></div><input fieldName="valor_km" class="form-control inputProduct detalheEntrega"  type="number"  onchange="alteraField($(this))" placeholder="R$ 0.00" value="89.99" id="valorProduto"></div>' +
    '<label class="txtLabel" style="margin-left: 3%;margin-top: 2%;margin-right: 2%;"> a cada </label>' +
    '<div   style="display: inline-flex; max-width: 35%; background: #EFEFEF;"><input fieldName="valor_km_texto" class="form-control inputProduct detalheEntrega"  onchange="alteraField($(this))" placeholder="0 km"   list="forDelivery" id="valorProduto">' +
    /*arrowDown+*/ "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>";

  bootbox.alert({
    message: html,
    onShow: function () {
      if (nome_metodo == "") {
        DELIVERY_DETAILS.push({
          descricao: "editando...",
          ativo: false,
          valor_fixo_status: false,
          valor_fixo: 0,
          valor_km_status: false,
          valor_km: 0,
          valor_km_texto: "",
          entrega_padrao: false,
          entrega_padrao_tempo: "",
          entrega_padrao_periodo: "",
          entrega_agendada: false,
          entrega_agendada_tempo: "",
          entrega_agendada_medida: "",
          entrega_agendada_horarios: "",
          localidade_padrao: false,
          localidade_exclui: false,
          localidade_exclui_ceps: "",
        });
      }
      if (
        dadosMetodo.localidade_exclui_ceps &&
        dadosMetodo.localidade_exclui_ceps.length > 0
      ) {
        let value1 = null,
          value2 = null;
        for (const a in dadosMetodo.localidade_exclui_ceps) {
          if (dadosMetodo.localidade_exclui_ceps[a].posicao === "CEP_INICIAL") {
            value1 = dadosMetodo.localidade_exclui_ceps[a].valor;
          }
          if (dadosMetodo.localidade_exclui_ceps[a].posicao === "CEP_FINAL") {
            value2 = dadosMetodo.localidade_exclui_ceps[a].valor;
            addMaisFaixaLoad(value1, value2);
            (value1 = null), (value2 = null);
          }
        }
      } else {
        addMaisFaixa("", "");
      }

      $(".cep").mask("00000-000");
      $(".inicioS").mask("00:00");
      $(".fimS").mask("00:00");

      $(".tabModal").click(function (event) {
        event.preventDefault();
        $(".tabModal").removeClass("tabModalActive");
        $(this).addClass("tabModalActive");
        $(".tabContent").hide();
        //////console.log("#" + $(this).attr("content"));
        $("#" + $(this).attr("content")).fadeIn();
      });

      $(".fa-times-circle").click(function (event) {
        event.preventDefault();
        $(this).parent().parent().remove();
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
      $(".novoHoraAdd").find("label").css("cursor", "pointer");
      $(".novoHoraAdd").click(function () {
        var lastId = $(this).parent().find(".lastIdCard");
        var lastId2 = lastId.length + 1;
        $(".inicioS").mask("00:00");
        $(".fimS").mask("00:00");
        addCard(lastId2, $(this).parent().find(".listaHorariosCadastrados"));
      });

      ////console.log("dadosMetodo")
      ////console.log(dadosMetodo)
      if (
        dadosMetodo.entrega_agendada_horarios != null &&
        dadosMetodo.entrega_agendada_horarios != undefined &&
        dadosMetodo.entrega_agendada_horarios != ""
      ) {
        var lista = dadosMetodo.entrega_agendada_horarios;
        ////console.log("lista")
        ////console.log(lista)
        $(".listaHorariosCadastrados").each(function () {
          var dia = $(this).attr("dia");
          var elementoPai = $(this).parent().parent();
          var elemento = $(this);
          ////console.log("dia => "+dia)
          ////console.log(elementoPai)
          for (const k in lista) {
            if (dia == lista[k].dia) {
              ////console.log("dia dado => "+dia)
              elementoPai.find(".ativadoS").addClass("TE_ACHEI");
              if (lista[k].status) {
                elementoPai.find(".ativadoS").attr("checked", "true");
                //  $(this).find(".ativadoS")[0].checked =true
              }
              if (lista[k].horarios.length > 0) {
                var essa = lista[k].horarios;
                for (const e in essa) {
                  elemento.append(
                    cardHorarioJSON(
                      e + 1,
                      essa[e].limiteAtivo,
                      essa[e].limiteValor,
                      essa[e].inicio,
                      essa[e].fim
                    )
                  );
                }
              }
            }
          }
        });
      }

      $(".detalheEntrega ").each(function () {
        ////console.log('conferindo... '+$(this).attr("fieldName"))

        if ($(this).attr("fieldName") == "ativo") {
          ////console.log($(this))
          if (dadosMetodo.ativo) {
            $(this)[0].checked = true;
            $(this).attr("checked", "true");
          } else {
            $(this)[0].checked = false;
          }
        }
        if ($(this).attr("fieldName") == "valor_fixo_status") {
          if (dadosMetodo.valor_fixo_status) {
            $(this)[0].checked = true;
            $(this).attr("checked", "true");
          } else {
            $(this)[0].checked = false;
          }
        }
        if ($(this).attr("fieldName") == "valor_fixo") {
          $(this).val(dadosMetodo.valor_fixo);
        }
        if ($(this).attr("fieldName") == "valor_km_status") {
          if (dadosMetodo.valor_km_status) {
            $(this)[0].checked = true;
            $(this).attr("checked", "true");
          } else {
            $(this)[0].checked = false;
          }
        }
        if ($(this).attr("fieldName") == "valor_km") {
          $(this).val(dadosMetodo.valor_km);
        }
        if ($(this).attr("fieldName") == "valor_km_texto") {
          $(this).val(dadosMetodo.valor_km_texto);
        }
        if ($(this).attr("fieldName") == "entrega_padrao") {
          if (dadosMetodo.entrega_padrao) {
            $(this)[0].checked = true;
            $(this).attr("checked", "true");
          } else {
            $(this)[0].checked = false;
          }
        }
        if ($(this).attr("fieldName") == "entrega_padrao_tempo") {
          $(this).val(dadosMetodo.entrega_padrao_tempo);
          $(".horas48").text(dadosMetodo.entrega_padrao_tempo);
        }
        if ($(this).attr("fieldName") == "entrega_padrao_periodo") {
          $(this).val(dadosMetodo.entrega_padrao_periodo);
          $(".horario48").text(dadosMetodo.entrega_padrao_periodo);
        }
        if ($(this).attr("fieldName") == "entrega_agendada") {
          if (dadosMetodo.entrega_agendada) {
            $(this)[0].checked = true;
            $(this).attr("checked", "true");
          } else {
            $(this)[0].checked = false;
          }
        }
        if ($(this).attr("fieldName") == "entrega_agendada_tempo") {
          $(this).val(dadosMetodo.entrega_agendada_tempo);
        }
        if ($(this).attr("fieldName") == "entrega_agendada_medida") {
          $(this).val(dadosMetodo.entrega_agendada_medida);
        }

        if ($(this).attr("fieldName") == "localidade_padrao") {
          if (dadosMetodo.localidade_padrao) {
            $(this)[0].checked = true;
            $(this).attr("checked", "true");
          } else {
            $(this)[0].checked = false;
          }
        }
        if ($(this).attr("fieldName") == "localidade_exclui") {
          if (dadosMetodo.localidade_exclui) {
            $(this)[0].checked = true;
            $(this).attr("checked", "true");
          } else {
            $(this)[0].checked = false;
          }
        }
        if ($(this).attr("fieldName") == "localidade_exclui_ceps") {
          ////console.log("aqui faça os ceps...")
        }
      });
    },
    callback: function () { },
  });
  $(".bootbox-accept").hide();
}

function modalEntregaRetirada(descricaoMetodo) {
  var dadosDefault = [];
  if (
    localStorage.FULL_DELIVERY_DEFAULT != undefined &&
    localStorage.FULL_DELIVERY_DEFAULT != null &&
    localStorage.FULL_DELIVERY_DEFAULT != ""
  ) {
    dadosDefault = JSON.parse(ajustStrigfy(localStorage.FULL_DELIVERY_DEFAULT));
  }

  var nome_metodo = descricaoMetodo;
  localStorage.METODO_EDICAO = nome_metodo;
  var html =
    '<div style="max-width:100% " class="container">' +
    '<div class="row" style="    box-shadow: 0px 3px 5px #edf2f6; max-width: 90%;    margin: -0.8% auto;  ">' +
    '<div content="caracteristicas" class="col-md tabModal tabModalActive">' +
    '<label class="labelTab"  style="text-align:center">Características</label>' +
    "</div>" +
    '<div content="regras" class="col-md tabModal">' +
    '<label class="labelTab"  style="text-align:center">Regras</label>' +
    "</div>" +
    '<div class="col-md">' +
    '<div  onclick="cancelaModal2()" style="cursor:pointer;border-radius: 20px; font: normal normal bold 1rem Roboto; background-color: #ffffff; max-width: 200px; height: 40px; border: 2px solid #f6b504; float: right; margin:5% auto" class="input-group">' +
    '<label  style="cursor:pointer;margin:-7%  auto;text-align: center;    min-width: 60%;color: #f6b504 !important; font-size: 1.2rem" class="label">Cancelar</label>' +
    "</div>" +
    "</div>" +
    '<div class="col-md ">' +
    '<div fieldName="retirada_agendada_horarios" onclick="salvaModal2(\'' +
    nome_metodo +
    '\', $(this))" style="cursor:pointer;border-radius: 20px; font: normal normal bold 1rem Roboto; background-color: #f6b504; max-width: 200px; height: 40px; border: 2px solid #f6b504; float: left; margin:5% auto" class="input-group">' +
    '<label  style="cursor:pointer;margin: -7% auto;text-align: center;    min-width: 60%; color: white !important; font-size: 1.2rem" class="label">Salvar</label>' +
    "</div>" +
    "</div>" +
    "</div>" +
    '<hr class="baixoCabecalho" style="position: fixed;top: 115px !important;left: 0px !important;width: 100%;box-shadow: 2px 2px 2px silver;"></hr>' +
    //======================================================AREA DE ENTREGA============================================================================================================

    //======================================================AREA DE ENTREGA============================================================================================================
    '<div id="regras" style="max-width:90% ; margin-top: 2%; display: none"  class="container tabContent verticalScroll notScroll">' +
    '<div class="container" style="max-width: 100%;     max-height: 70vh;">' +
    '<div style="padding: 5%; margin-top: 3%;" class="col-md-12 subGrupo2">' +
    '<div class="row">' +
    '<div style="margin-top: -1%;" class="switch__container ajuste2"><input  fieldName="retirada_padrao" onchange="updateDefaultParameters($(this))" id="switch-shadow1975" class="switch switch--shadow" type="checkbox" /><label for="switch-shadow1975"></label></div>' +
    '<label class="txtLabel" style="margin-left: 3%;"> Retirada Padrão</label>' +
    "</div>" +
    '<label style="margin-top: 10px" class="txtLabel modalLabelTxt">Esse é o método mais simples de retirada. Escolha o texto que será exibido ao seu cliente:</label>' +
    "<br><br><br>" +
    '<div class="row">' +
    '<div class="col-md-3">' +
    '<label class="txtLabel">Tempo de retirada</label><br>' +
    '<div class="group-input2"><input  fieldName="retirada_padrao_tempo" onchange="alteraD2($(this),\'.horas48\')" class="form-control inputProduct " placeholder="Em até 48h" ></div><br>' +
    "</div>" +
    '<div class="col-md-6">' +
    '<label class="txtLabel">Período de retirada</label><br>' +
    '<div class="group-input2"><input  fieldName="retirada_padrao_periodo" onchange="alteraD2($(this),\'.horario48\')" class="form-control inputProduct " placeholder="De segunda a sábado"></div><br>' +
    "</div>" +
    '<div class="col-md-3">' +
    '<label class="txtLabel">Visualização</label><br>' +
    '<div class="boxIconDefault2 boxIconeActive"><svg class="svg-inline--fa fa-check fa-w-16 iconSelectedCheck2" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg><!-- <i class="fas fa-check iconSelectedCheck2"></i> Font Awesome fontawesome.com -->' +
    '<p class="horas48"></p><br>' +
    '<p class="horario48"></p>' +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    '<div style="padding: 5%; margin-top: 3%;" class="col-md-12 subGrupo2">' +
    '<div class="row">' +
    '<div style="margin-top: -1%;" class="switch__container ajuste2"><input  fieldName="retirada_agendada" onchange="updateDefaultParameters($(this))" id="switch-shadow900" class="switch switch--shadow" type="checkbox" /><label for="switch-shadow900"></label></div>' +
    '<label class="txtLabel" style="margin-left: 3%;"> Retirada Agendada</label>' +
    "</div>" +
    '<label style="margin-top: 10px" class="txtLabel modalLabelTxt">Permita que seu cliente escolha o dia e faixa de horário para retirar a entrega.</label>' +
    "<br><br><br>" +
    '<span class="segundoTxt modalTitulo2">Tempo mínimo</span><br>' +
    '<label class="txtLabel modalLabelTxt">Defina se deseja um valor fixo para essa retirada independente da localidade ou utilize um tempo baseado na distância.</label>' +
    '<div class="row">' +
    '<div class="meuCombo">' +
    '<select   fieldName="retirada_agendada_tempo" onchange="updateDefaultParameters($(this))">' +
    "<option>01</option>" +
    "<option>02</option>" +
    "<option>03</option>" +
    "<option>04</option>" +
    "<option>05</option>" +
    "<option>06</option>" +
    "<option>07</option>" +
    "<option>08</option>" +
    "<option>09</option>" +
    "<option>10</option>" +
    "<option>11</option>" +
    "<option>12</option>" +
    "<option>13</option>" +
    "<option>14</option>" +
    "<option>15</option>" +
    "<option>16</option>" +
    "<option>17</option>" +
    "<option>19</option>" +
    "<option>20</option>" +
    "<option>21</option>" +
    "<option>22</option>" +
    "<option>23</option>" +
    "<option>24</option>" +
    "</select>" +
    "</div>" +
    '<div class="meuCombo">' +
    '<select  fieldName="retirada_agendada_medida" onchange="updateDefaultParameters($(this))">' +
    "<option>Horas</option>" +
    "<option>Dias</option>" +
    "<option>Semanas</option>" +
    "</select>" +
    "</div>" +
    "</div>" +
    "<br><br><br>" +
    '<span class="segundoTxt modalTitulo2">Definir Horários</span><br>' +
    '<div  class="corridaHorarios horizontalScroll">' +
    '<div dia="segunda" class="cardHorarios card">' +
    '<div class="card-header">' +
    '<div style="justify-content: center;padding: 10px;" class="row">' +
    '<div style="margin-top: -1%;" class="switch__container ajuste2"><input id="switch-shadow97544" class="switch switch--shadow ativadoS" type="checkbox" /><label for="switch-shadow97544"></label></div>' +
    '<label class="txtLabel" style="margin-left: 3%;"> Segunda</label>' +
    "</div>" +
    "</div>" +
    '<div class="card-body">' +
    '<div dia="segunda" class="listaHorariosCadastrados verticalScroll notScroll">' +
    "</div>" +
    "</div>" +
    '<div class="novoHoraAdd card-footer">' +
    '<div class="row">' +
    '<div class="col-md-1">  ' +
    '<svg id="_01_Icons_Line_plus-circle" style="margin: auto" data-name="01) Icons / Line /  plus-circle" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">' +
    '<path id="plus-circle" d="M10.5,21A10.5,10.5,0,0,1,3.075,3.075,10.5,10.5,0,1,1,10.5,21Zm0-20A9.5,9.5,0,1,0,20,10.5,9.511,9.511,0,0,0,10.5,1Zm0,14a.5.5,0,0,1-.5-.5V11H6.5a.5.5,0,0,1,0-1H10V6.5a.5.5,0,0,1,1,0V10h3.5a.5.5,0,1,1,0,1H11v3.5A.5.5,0,0,1,10.5,15Z" transform="translate(2 2)" fill="#687c97"/>' +
    "</svg>" +
    "</div>" +
    '<div class="col-md-1">' +
    '<label class="txtLabel" style="margin:auto 3%;"> Nova faixa de horário</label>' +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    //Terça
    '<div dia="terca" class="cardHorarios card">' +
    '<div class="card-header">' +
    '<div style="justify-content: center;padding: 10px;" class="row">' +
    '<div style="margin-top: -1%;" class="switch__container ajuste2"><input id="switch-shadow97544" class="switch switch--shadow ativadoS" type="checkbox" /><label for="switch-shadow97544"></label></div>' +
    '<label class="txtLabel" style="margin-left: 3%;"> Terça</label>' +
    "</div>" +
    "</div>" +
    '<div class="card-body">' +
    '<div dia="terca" class="listaHorariosCadastrados verticalScroll notScroll">' +
    "</div>" +
    "</div>" +
    '<div class="novoHoraAdd card-footer">' +
    '<div class="row">' +
    '<div class="col-md-1">  ' +
    '<svg id="_01_Icons_Line_plus-circle" style="margin: auto" data-name="01) Icons / Line /  plus-circle" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">' +
    '<path id="plus-circle" d="M10.5,21A10.5,10.5,0,0,1,3.075,3.075,10.5,10.5,0,1,1,10.5,21Zm0-20A9.5,9.5,0,1,0,20,10.5,9.511,9.511,0,0,0,10.5,1Zm0,14a.5.5,0,0,1-.5-.5V11H6.5a.5.5,0,0,1,0-1H10V6.5a.5.5,0,0,1,1,0V10h3.5a.5.5,0,1,1,0,1H11v3.5A.5.5,0,0,1,10.5,15Z" transform="translate(2 2)" fill="#687c97"/>' +
    "</svg>" +
    "</div>" +
    '<div class="col-md-1">' +
    '<label class="txtLabel" style="margin:auto 3%;"> Nova faixa de horário</label>' +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    //Quarta
    '<div dia="quarta" class="cardHorarios card">' +
    '<div class="card-header">' +
    '<div style="justify-content: center;padding: 10px;" class="row">' +
    '<div style="margin-top: -1%;" class="switch__container ajuste2"><input id="switch-shadow97544" class="switch switch--shadow ativadoS" type="checkbox" /><label for="switch-shadow97544"></label></div>' +
    '<label class="txtLabel" style="margin-left: 3%;"> Quarta</label>' +
    "</div>" +
    "</div>" +
    '<div class="card-body">' +
    '<div dia="quarta" class="listaHorariosCadastrados verticalScroll notScroll">' +
    "</div>" +
    "</div>" +
    '<div class="novoHoraAdd card-footer">' +
    '<div class="row">' +
    '<div class="col-md-1">  ' +
    '<svg id="_01_Icons_Line_plus-circle" style="margin: auto" data-name="01) Icons / Line /  plus-circle" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">' +
    '<path id="plus-circle" d="M10.5,21A10.5,10.5,0,0,1,3.075,3.075,10.5,10.5,0,1,1,10.5,21Zm0-20A9.5,9.5,0,1,0,20,10.5,9.511,9.511,0,0,0,10.5,1Zm0,14a.5.5,0,0,1-.5-.5V11H6.5a.5.5,0,0,1,0-1H10V6.5a.5.5,0,0,1,1,0V10h3.5a.5.5,0,1,1,0,1H11v3.5A.5.5,0,0,1,10.5,15Z" transform="translate(2 2)" fill="#687c97"/>' +
    "</svg>" +
    "</div>" +
    '<div class="col-md-1">' +
    '<label class="txtLabel" style="margin:auto 3%;"> Nova faixa de horário</label>' +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    //Quinta
    '<div dia="quinta" class="cardHorarios card">' +
    '<div class="card-header">' +
    '<div style="justify-content: center;padding: 10px;" class="row">' +
    '<div style="margin-top: -1%;" class="switch__container ajuste2"><input id="switch-shadow97544" class="switch switch--shadow ativadoS" type="checkbox" /><label for="switch-shadow97544"></label></div>' +
    '<label class="txtLabel" style="margin-left: 3%;"> Quinta</label>' +
    "</div>" +
    "</div>" +
    '<div class="card-body">' +
    '<div dia="quinta" class="listaHorariosCadastrados verticalScroll notScroll">' +
    "</div>" +
    "</div>" +
    '<div class="novoHoraAdd card-footer">' +
    '<div class="row">' +
    '<div class="col-md-1">  ' +
    '<svg id="_01_Icons_Line_plus-circle" style="margin: auto" data-name="01) Icons / Line /  plus-circle" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">' +
    '<path id="plus-circle" d="M10.5,21A10.5,10.5,0,0,1,3.075,3.075,10.5,10.5,0,1,1,10.5,21Zm0-20A9.5,9.5,0,1,0,20,10.5,9.511,9.511,0,0,0,10.5,1Zm0,14a.5.5,0,0,1-.5-.5V11H6.5a.5.5,0,0,1,0-1H10V6.5a.5.5,0,0,1,1,0V10h3.5a.5.5,0,1,1,0,1H11v3.5A.5.5,0,0,1,10.5,15Z" transform="translate(2 2)" fill="#687c97"/>' +
    "</svg>" +
    "</div>" +
    '<div class="col-md-1">' +
    '<label class="txtLabel" style="margin:auto 3%;"> Nova faixa de horário</label>' +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    //Sexta
    '<div dia="sexta" class="cardHorarios card">' +
    '<div class="card-header">' +
    '<div style="justify-content: center;padding: 10px;" class="row">' +
    '<div style="margin-top: -1%;" class="switch__container ajuste2"><input id="switch-shadow97544" class="switch switch--shadow ativadoS" type="checkbox" /><label for="switch-shadow97544"></label></div>' +
    '<label class="txtLabel" style="margin-left: 3%;"> Sexta</label>' +
    "</div>" +
    "</div>" +
    '<div class="card-body">' +
    '<div dia="sexta" class="listaHorariosCadastrados verticalScroll notScroll">' +
    "</div>" +
    "</div>" +
    '<div class="novoHoraAdd card-footer">' +
    '<div class="row">' +
    '<div class="col-md-1">  ' +
    '<svg id="_01_Icons_Line_plus-circle" style="margin: auto" data-name="01) Icons / Line /  plus-circle" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">' +
    '<path id="plus-circle" d="M10.5,21A10.5,10.5,0,0,1,3.075,3.075,10.5,10.5,0,1,1,10.5,21Zm0-20A9.5,9.5,0,1,0,20,10.5,9.511,9.511,0,0,0,10.5,1Zm0,14a.5.5,0,0,1-.5-.5V11H6.5a.5.5,0,0,1,0-1H10V6.5a.5.5,0,0,1,1,0V10h3.5a.5.5,0,1,1,0,1H11v3.5A.5.5,0,0,1,10.5,15Z" transform="translate(2 2)" fill="#687c97"/>' +
    "</svg>" +
    "</div>" +
    '<div class="col-md-1">' +
    '<label class="txtLabel" style="margin:auto 3%;"> Nova faixa de horário</label>' +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    //Sábado
    '<div dia="sabado" class="cardHorarios card">' +
    '<div class="card-header">' +
    '<div style="justify-content: center;padding: 10px;" class="row">' +
    '<div style="margin-top: -1%;" class="switch__container ajuste2"><input id="switch-shadow97544" class="switch switch--shadow ativadoS" type="checkbox" /><label for="switch-shadow97544"></label></div>' +
    '<label class="txtLabel" style="margin-left: 3%;"> Sábado</label>' +
    "</div>" +
    "</div>" +
    '<div class="card-body">' +
    '<div dia="sabado" class="listaHorariosCadastrados verticalScroll notScroll">' +
    "</div>" +
    "</div>" +
    '<div class="novoHoraAdd card-footer">' +
    '<div class="row">' +
    '<div class="col-md-1">  ' +
    '<svg id="_01_Icons_Line_plus-circle" style="margin: auto" data-name="01) Icons / Line /  plus-circle" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">' +
    '<path id="plus-circle" d="M10.5,21A10.5,10.5,0,0,1,3.075,3.075,10.5,10.5,0,1,1,10.5,21Zm0-20A9.5,9.5,0,1,0,20,10.5,9.511,9.511,0,0,0,10.5,1Zm0,14a.5.5,0,0,1-.5-.5V11H6.5a.5.5,0,0,1,0-1H10V6.5a.5.5,0,0,1,1,0V10h3.5a.5.5,0,1,1,0,1H11v3.5A.5.5,0,0,1,10.5,15Z" transform="translate(2 2)" fill="#687c97"/>' +
    "</svg>" +
    "</div>" +
    '<div class="col-md-1">' +
    '<label class="txtLabel" style="margin:auto 3%;"> Nova faixa de horário</label>' +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    //Domingo
    '<div dia="domingo" class="cardHorarios card">' +
    '<div class="card-header">' +
    '<div style="justify-content: center;padding: 10px;" class="row">' +
    '<div style="margin-top: -1%;" class="switch__container ajuste2"><input id="switch-shadow97544" class="switch switch--shadow ativadoS" type="checkbox" /><label for="switch-shadow97544"></label></div>' +
    '<label class="txtLabel" style="margin-left: 3%;"> Domingo</label>' +
    "</div>" +
    "</div>" +
    '<div class="card-body">' +
    '<div dia="domingo" class="listaHorariosCadastrados verticalScroll notScroll">' +
    "</div>" +
    "</div>" +
    '<div class="novoHoraAdd card-footer">' +
    '<div class="row">' +
    '<div class="col-md-1">  ' +
    '<svg id="_01_Icons_Line_plus-circle" style="margin: auto" data-name="01) Icons / Line /  plus-circle" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">' +
    '<path id="plus-circle" d="M10.5,21A10.5,10.5,0,0,1,3.075,3.075,10.5,10.5,0,1,1,10.5,21Zm0-20A9.5,9.5,0,1,0,20,10.5,9.511,9.511,0,0,0,10.5,1Zm0,14a.5.5,0,0,1-.5-.5V11H6.5a.5.5,0,0,1,0-1H10V6.5a.5.5,0,0,1,1,0V10h3.5a.5.5,0,1,1,0,1H11v3.5A.5.5,0,0,1,10.5,15Z" transform="translate(2 2)" fill="#687c97"/>' +
    "</svg>" +
    "</div>" +
    '<div class="col-md-1">' +
    '<label class="txtLabel" style="margin:auto 3%;"> Nova faixa de horário</label>' +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    //======================================================ABA DE CARACTERÍSTICAS==================================================================================================================
    '<div id="caracteristicas" style="max-width:90% ; margin-top: 2%;"  class="container tabContent">' +
    '<div class="container" style="max-width: 70%;">' +
    '<div style="padding: 5%;" class="col-md-12 ">' +
    '<div class="row">' +
    '<div style="margin-top: -1%;" class="switch__container ajuste2"><input fieldName="retirada_active" onchange="updateDefaultParameters($(this))" id="switch-shadow3975" class="switch switch--shadow" type="checkbox" /><label for="switch-shadow3975"></label></div>' +
    '<label class="txtLabel" style="margin-left: 3%;"> Método ativo</label>' +
    "</div>" +
    '<div class="areaEsconde">' +
    "<br />" +
    '<label class="txtLabel">Nome do método</label>' +
    '<div class="group-input2"><input fieldName="retirada_descricao" onchange="updateDefaultParameters($(this))" class="form-control inputProduct " value="' +
    nome_metodo +
    '" placeholder="Nome do método"  /></div>' +
    "<hr />" +
    '<span class="segundoTxt modalTitulo2">Taxa de retirada</span>' +
    '<label class="txtLabel modalLabelTxt">Defina se deseja cobrar uma taxa aos seus clientes, se a opção estiver desativada, irá aparecer como gratuito ao usuário.</label>' +
    '<div style="padding: 5%; margin-top: 3%;" class="col-md-12 subGrupo2">' +
    '<div class="row">' +
    '<div style="margin-top: -1%;" class="switch__container ajuste2"><input fieldName="retirada_valor_fixo"  onchange="updateDefaultParameters($(this))" id="switch-shadow4975" class="switch switch--shadow" type="checkbox" /><label for="switch-shadow4975"></label></div>' +
    '<label class="txtLabel" style="margin-left: 3%;"> Valor Fixo</label>' +
    "</div>" +
    '<div   style="display: inline-flex; max-width: 50%; background: #EFEFEF;"><div class="iconLogistica" style=" height: 45px;width: 50px; margin: auto 2%!important;    background: #F9FAFB 0% 0% no-repeat padding-box !important;"><svg xmlns="http://www.w3.org/2000/svg" style="margin: 10px 15px;" width="15" height="25" viewBox="0 0 10.015 15.574"><path id="_105" data-name="105" d="M9.052-6.032c0-3.651-5.346-2.695-5.346-4.375,0-.464.42-.7,1.058-.7a7.9,7.9,0,0,1,3.274,1.087l1-2.1A7.5,7.5,0,0,0,5.865-13.2v-2.115H3.939v2.13c-1.854.3-3.013,1.42-3.013,3.028,0,3.593,5.346,2.55,5.346,4.274,0,.536-.493.826-1.275.826A6.483,6.483,0,0,1,1.317-6.6L.288-4.525a7.485,7.485,0,0,0,3.651,1.55V-.744H5.865V-2.961C7.691-3.207,9.052-4.25,9.052-6.032Z" transform="translate(0.337 15.818)" fill="none" stroke="#687c96" stroke-width="1"></path></svg></div><input  fieldName="retirada_valor" onchange="updateDefaultParameters($(this))" class="form-control inputProduct" placeholder="R$ 0.00"  type="number" value="0" id="valorProduto"></div>' +
    "<br />" +
    "<br />" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>";

  bootbox.alert({
    message: html,
    onShow: function () {
      //////console.log("This was logged in the callback!");
      $(".cep").mask("00000-000");

      $(".tabModal").click(function (event) {
        event.preventDefault();
        $(".tabModal").removeClass("tabModalActive");
        $(this).addClass("tabModalActive");
        $(".tabContent").hide();
        //////console.log("#" + $(this).attr("content"));
        $("#" + $(this).attr("content")).fadeIn();
      });

      $(".fa-times-circle").click(function (event) {
        event.preventDefault();
        $(this).parent().parent().remove();
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
      $(".novoHoraAdd").find("label").css("cursor", "pointer");
      $(".novoHoraAdd").click(function () {
        var lastId = $(this).parent().find(".lastIdCard");
        var lastId2 = lastId.length + 1;
        //////console.log("ai vai o lasTID")
        //////console.log(lastId2)
        addCard(lastId2, $(this).parent().find(".listaHorariosCadastrados"));
      });

      ////console.log("dadosDefault")
      ////console.log(dadosDefault)
      if (
        dadosDefault[0].retirada_agendada_horarios != null &&
        dadosDefault[0].retirada_agendada_horarios != undefined &&
        dadosDefault[0].retirada_agendada_horarios != ""
      ) {
        var lista = JSON.parse(
          ajustStrigfy(dadosDefault[0].retirada_agendada_horarios)
        );
        ////console.log("lista")
        ////console.log(lista)
        $(".listaHorariosCadastrados").each(function () {
          var dia = $(this).attr("dia");
          var elementoPai = $(this).parent().parent();
          var elemento = $(this);
          ////console.log("dia => "+dia)
          ////console.log(elementoPai)
          for (const k in lista) {
            ////console.log("dia lido => "+lista[k].dia)
            if (dia == lista[k].dia) {
              ////console.log("dia dado => "+lista[k].dia)
              elementoPai.find(".ativadoS").addClass("TE_ACHEI");
              if (lista[k].status) {
                elementoPai.find(".ativadoS").attr("checked", "true");
                //  $(this).find(".ativadoS")[0].checked =true
              }
              if (lista[k].horarios.length > 0) {
                var essa = lista[k].horarios;
                for (const e in essa) {
                  elemento.append(
                    cardHorarioJSON(
                      e + 1,
                      essa[e].limiteAtivo,
                      essa[e].limiteValor,
                      essa[e].inicio,
                      essa[e].fim
                    )
                  );
                }
              }
            }
          }
        });
      }
    },
    callback: function () {
      // location.reload()
    },
  });
  $(".bootbox-accept").hide();
}

function addCard(lastID, elemento) {
  $(".inicioS").mask("00:00");
  $(".fimS").mask("00:00");
  count++;

  var html =
    '<br><div class="umHorario card">' +
    '<div style="    padding-left: 25px;" class="row">' +
    '<span class="segundoTxt modalTitulo2 lastIdCard">' +
    lastID +
    "</span><br>" +
    "</div>" +
    '<div style="justify-content: center;padding: 10px;" class="row">' +
    '<div class="col-md-6">' +
    '<label class="txtLabel" style="margin-left: 3%;font: normal normal bold 14px/21px Roboto;"> Início</label>' +
    '<div class="group-input2" ><input   style="font-size: 16px !important;" class="form-control inputProduct inicioS " placeholder="10:00"  ></div><br>' +
    "</div>" +
    '<div class="col-md-6">' +
    '<label class="txtLabel" style="margin-left: 3%;font: normal normal bold 14px/21px Roboto;"> Fim</label>' +
    '<div class="group-input2" ><input   style="font-size: 16px !important;" class="form-control inputProduct fimS " placeholder="10:00"  ></div><br>' +
    "</div>" +
    "</div>" +
    '<div style="padding-left: 25px;" class="row">' +
    '<div class="col-md-6">' +
    '<div class="row">' +
    '<div style="margin-top: -1%;" class="switch__container ajuste2"><input id="switch-shadow18555' +
    lastID +
    "" +
    count +
    '" class="switch switch--shadow limiteS" type="checkbox" /><label for="switch-shadow18555' +
    lastID +
    "" +
    count +
    '"></label></div>' +
    '<label class="txtLabel" style="margin-left: 3%;"> Limite</label>' +
    "</div>" +
    "</div>" +
    '<div class="col-md-6">' +
    '<div class="meuComboInner">' +
    '<select  class="valorLimeteS">' +
    "<option>01</option>" +
    "<option>02</option>" +
    "<option>03</option>" +
    "<option>04</option>" +
    "<option>05</option>" +
    "<option>06</option>" +
    "<option>07</option>" +
    "<option>08</option>" +
    "<option>09</option>" +
    "<option>10</option>" +
    "</select>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>";
  $(".inicioS").mask("00:00");
  $(".fimS").mask("00:00");
  elemento.append(html);
  $(".inicioS").mask("00:00");
  $(".fimS").mask("00:00");
}

function cardHorarioJSON(lastID, limite, limiteValor, inicio, fim) {
  $(".inicioS").mask("00:00");
  $(".fimS").mask("00:00");
  count++;
  var limiteTag = ' checked="true" ';
  if (!limite) {
    limiteTag = "";
  }

  var html =
    '<br><div class="umHorario card">' +
    '<div style="    padding-left: 25px;" class="row">' +
    '<span class="segundoTxt modalTitulo2 lastIdCard">' +
    lastID +
    "</span><br>" +
    "</div>" +
    '<div style="justify-content: center;padding: 10px;" class="row">' +
    '<div class="col-md-6">' +
    '<label class="txtLabel" style="margin-left: 3%;font: normal normal bold 14px/21px Roboto;"> Início</label>' +
    '<div class="group-input2" ><input  value="' +
    inicio +
    '"  style="font-size: 16px !important;" class="form-control inputProduct inicioS " placeholder="10:00"  ></div><br>' +
    "</div>" +
    '<div class="col-md-6">' +
    '<label class="txtLabel" style="margin-left: 3%;font: normal normal bold 14px/21px Roboto;"> Fim</label>' +
    '<div class="group-input2" ><input value="' +
    fim +
    '"  style="font-size: 16px !important;" class="form-control inputProduct fimS " placeholder="10:00"  ></div><br>' +
    "</div>" +
    "</div>" +
    '<div style="padding-left: 25px;" class="row">' +
    '<div class="col-md-6">' +
    '<div class="row">' +
    '<div style="margin-top: -1%;" class="switch__container ajuste2"><input ' +
    limiteTag +
    '  id="switch-shadow18555' +
    lastID +
    "" +
    count +
    '" class="switch switch--shadow limiteS" type="checkbox" /><label for="switch-shadow18555' +
    lastID +
    "" +
    count +
    '"></label></div>' +
    '<label class="txtLabel" style="margin-left: 3%;"> Limite</label>' +
    "</div>" +
    "</div>" +
    '<div class="col-md-6">' +
    '<div class="meuComboInner">' +
    '<select value="' +
    limiteValor +
    '" class="valorLimeteS">' +
    "<option>" +
    limiteValor +
    "</option>" +
    "<option>01</option>" +
    "<option>02</option>" +
    "<option>03</option>" +
    "<option>04</option>" +
    "<option>05</option>" +
    "<option>06</option>" +
    "<option>07</option>" +
    "<option>08</option>" +
    "<option>09</option>" +
    "<option>10</option>" +
    "</select>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>";

  $(".inicioS").mask("00:00");
  $(".fimS").mask("00:00");
  return html;
}

$(document).ready(function () {
  $(".cep").mask("00000-000");
});
$(".novaFaixaCep").css("cursor", "pointer");
/*

*/
function addMaisFaixa() {
  $(".cep").mask("00000-000");
  var html =
    '<div class="row">' +
    '<div style="padding-left: none;" class="col-md-4">' +
    '<label class="txtLabel">Inicial</label><br>' +
    '<div class="group-input2"><input  type="text" fieldName="localidade_exclui_ceps" class="form-control inputProduct cep detalheEntrega"   onchange="alteraField($(this))" placeholder="132001-001" posicao="CEP_INICIAL"></div><br>' +
    "</div>" +
    '<div  style="padding-left: none;" class="col-md-4">' +
    '<label class="txtLabel">Final</label><br>' +
    '<div class="group-input2"><input  fieldName="localidade_exclui_ceps" class="form-control inputProduct cep detalheEntrega"   onchange="alteraField($(this))" placeholder="132001-001" posicao="CEP_FINAL"></div><br>' +
    "</div>" +
    '<div class="col-md-2">' +
    '<div class="input-group iconOpaco ico etiquetaRedonda">' +
    '<svg pedido="00008" onclick="deletarFaixaCep($(this))"  xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 21 21" style="' +
    'margin: auto">&gt;<defs></defs>' +
    '<path class="a" d="M10.937,16H3.063A2.208,2.208,0,0,1,.875,13.778V2.666H.438a.444.444,0,0,1,0-.889H4.375V1.334A1.324,1.324,0,0,1,5.687,0H8.313A1.324,1.324,0,0,1,9.625,1.334v.444h3.937a.444.444,0,0,1,0,.889h-.437V13.778A2.208,2.208,0,0,1,10.937,16ZM1.75,2.666V13.778a1.325,1.325,0,0,0,1.313,1.334h7.875a1.325,1.325,0,0,0,1.313-1.334V2.666ZM5.687.889a.441.441,0,0,0-.437.445v.444h3.5V1.334A.441.441,0,0,0,8.313.889Zm3.5,11.556A.442.442,0,0,1,8.75,12V5.778a.437.437,0,1,1,.875,0V12A.441.441,0,0,1,9.188,12.445Zm-4.375,0A.441.441,0,0,1,4.375,12V5.778a.437.437,0,1,1,.875,0V12A.442.442,0,0,1,4.812,12.445Z" transform="translate(4 3)"></path>' +
    "</svg>" +
    "</div>" +
    "</div>" +
    "</div>";
  $(".cep").mask("00000-000");
  $(".maisFaixa").append(html);
  $(".cep").mask("00000-000");
}

function addMaisFaixaLoad(values1, values2) {
  $(".cep").mask("00000-000");
  var html =
    '<div class="row">' +
    '<div style="padding-left: none;" class="col-md-4">' +
    '<label class="txtLabel">Inicial</label><br>' +
    '<div class="group-input2"><input value="' +
    values1 +
    '" type="text" fieldName="localidade_exclui_ceps" class="form-control inputProduct cep detalheEntrega"   onchange="alteraField($(this))" placeholder="132001-001" posicao="CEP_INICIAL"></div><br>' +
    "</div>" +
    '<div  style="padding-left: none;" class="col-md-4">' +
    '<label class="txtLabel">Final</label><br>' +
    '<div class="group-input2"><input  value="' +
    values2 +
    '"  fieldName="localidade_exclui_ceps" class="form-control inputProduct cep detalheEntrega"   onchange="alteraField($(this))" placeholder="132001-001" posicao="CEP_FINAL"></div><br>' +
    "</div>" +
    '<div class="col-md-2">' +
    '<div class="input-group iconOpaco ico etiquetaRedonda">' +
    '<svg pedido="00008" onclick="deletarFaixaCep($(this))"  xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 21 21" style="' +
    'margin: auto">&gt;<defs></defs>' +
    '<path class="a" d="M10.937,16H3.063A2.208,2.208,0,0,1,.875,13.778V2.666H.438a.444.444,0,0,1,0-.889H4.375V1.334A1.324,1.324,0,0,1,5.687,0H8.313A1.324,1.324,0,0,1,9.625,1.334v.444h3.937a.444.444,0,0,1,0,.889h-.437V13.778A2.208,2.208,0,0,1,10.937,16ZM1.75,2.666V13.778a1.325,1.325,0,0,0,1.313,1.334h7.875a1.325,1.325,0,0,0,1.313-1.334V2.666ZM5.687.889a.441.441,0,0,0-.437.445v.444h3.5V1.334A.441.441,0,0,0,8.313.889Zm3.5,11.556A.442.442,0,0,1,8.75,12V5.778a.437.437,0,1,1,.875,0V12A.441.441,0,0,1,9.188,12.445Zm-4.375,0A.441.441,0,0,1,4.375,12V5.778a.437.437,0,1,1,.875,0V12A.442.442,0,0,1,4.812,12.445Z" transform="translate(4 3)"></path>' +
    "</svg>" +
    "</div>" +
    "</div>" +
    "</div>";
  $(".cep").mask("00000-000");
  $(".maisFaixa").append(html);
  $(".cep").mask("00000-000");
}
function alteraD(e1, e2) {
  $(e2).text(e1.val());
  alteraField(e1);
}

function alteraD2(e1, e2) {
  $(e2).text(e1.val());
  updateDefaultParameters(e1);
}

function alteraField(elemento) {
  console.log("editando...", elemento.attr("fieldName"));

  var nome_metodo = localStorage.METODO_EDICAO;
  if (nome_metodo == "") {
    if (elemento.attr("fieldName") == "descricao") {
      var valor = elemento.val();
      if (elemento.attr("type") == "checkbox") {
        valor = elemento[0].checked;
      }
      updateDetailsDelivery("editando...", elemento.attr("fieldName"), valor);
    }
  } else {
    if (elemento.attr("fieldName") == "localidade_exclui_ceps") {
      var pai = elemento.parent().parent().parent().parent().find(".cep");
      var myExcludeCEPS = [];
      pai.each(function () {
        myExcludeCEPS.push({
          posicao: $(this).attr("posicao"),
          valor: $(this).val(),
        });
      });
      ////console.log("myExcludeCEPS")
      ////console.log(myExcludeCEPS)
      var valor = JSON.stringify(myExcludeCEPS);
      updateDetailsDelivery(nome_metodo, elemento.attr("fieldName"), valor);
    } else {
      var valor = elemento.val();
      if (elemento.attr("type") == "checkbox") {
        valor = elemento[0].checked;
      }
      updateDetailsDelivery(nome_metodo, elemento.attr("fieldName"), valor);
    }
  }
}

async function updateDelivery(fieldName, fieldValue) {
  $.ajax({
    type: "POST",
    url: mainHost + "/updateDeliveryDefault",

    headers: {
      "x-access-token": localStorage.token,
    },
    data: {
      affiliate_id: AFFILIATE_ID,
      fieldName: fieldName,
      fieldValue: fieldValue,
    },
    success: function (data) {
      console.log(data);
    },
    error: function (data) {
      console.log(data);
    },
    complete: function () {
      // ao final da requisição...
    },
  });
}

async function salvaModal(nome_metodo) {
  var dadosEntregaHorario = [];
  $(".cardHorarios").each(function () {
    var dia = $(this).attr("dia");
    var horariosDia = [];
    var status = $(this).find(".ativadoS")[0].checked;
    var horarios = $(this).find(".umHorario");
    horarios.each(function () {
      horariosDia.push({
        limiteAtivo: $(this).find(".limiteS")[0].checked,
        limiteValor: $(this).find(".valorLimeteS").val(),
        inicio: $(this).find(".inicioS").val(),
        fim: $(this).find(".fimS").val(),
      });
    });
    dadosEntregaHorario.push({
      dia: dia,
      status: status,
      horarios: horariosDia,
    });
  });

  ////console.log(dadosEntregaHorario)

  updateDetailsDelivery(
    nome_metodo,
    "entrega_agendada_horarios",
    dadosEntregaHorario
  );

  updateDelivery("delivery_methods", JSON.stringify(DELIVERY_DETAILS));
  start();
  $(".close").click();
  location.reload();
}
function cancelModal() {
  $(".close").click();
}

function salvaModal2(nome_metodo, elemento) {
  var dadosEntregaHorario = [];
  $(".cardHorarios").each(function () {
    var dia = $(this).attr("dia");
    var horariosDia = [];
    var status = $(this).find(".ativadoS")[0].checked;
    var horarios = $(this).find(".umHorario");
    horarios.each(function () {
      horariosDia.push({
        limiteAtivo: $(this).find(".limiteS")[0].checked,
        limiteValor: $(this).find(".valorLimeteS").val(),
        inicio: $(this).find(".inicioS").val(),
        fim: $(this).find(".fimS").val(),
      });
    });
    dadosEntregaHorario.push({
      dia: dia,
      status: status,
      horarios: horariosDia,
    });
  });
  ////console.log(dadosEntregaHorario)
  localStorage.DADOS_ENTREGA_FILIAL = JSON.stringify(dadosEntregaHorario);
  updateDefaultParameters(elemento);
  $(".close").click();
}
function cancelaModal2() {
  $(".close").click();
}

function updateDefaultParameters(elemento) {
  var fieldName = elemento.attr("fieldName");
  var fieldValue = elemento.val();
  if (elemento.attr("type") == "checkbox") {
    if (elemento[0].checked) {
      fieldValue = 1;
    } else {
      fieldValue = 0;
    }
  }
  if (elemento.attr("fieldName") == "retirada_agendada_horarios") {
    fieldValue = localStorage.DADOS_ENTREGA_FILIAL;
  }
  if (elemento.attr("fieldName") == "lat_lon") {
    fieldValue = localStorage.my_lat_lon;
  }
  if (elemento.attr("fieldName") == "exclui_faixa_cep") {
    if (elemento[0].checked) {
      $(".faixasCepExcluir").fadeIn();
      $(".insereFaixaCepExcluir").fadeIn();
    } else {
      $(".faixasCepExcluir").fadeOut();
      $(".insereFaixaCepExcluir").fadeOut();
    }
  }

  $.ajax({
    type: "POST",
    url: mainHost + "/updateDeliveryDefault",

    headers: {
      "x-access-token": localStorage.token,
    },
    data: {
      affiliate_id: AFFILIATE_ID,
      fieldName: fieldName,
      fieldValue: fieldValue,
    },
    success: function (data) {
      //console.log(data)
      elemento.css("color", "#f6b504 !important");
    },
    error: function (data) {
      //console.log(data)
      elemento.css("color", "red !important");
    },
    complete: function () {
      // ao final da requisição...
    },
  });
}

function faixaCepSettings(elemento) {
  var pai = elemento.parent().parent().parent().parent().find(".parCEPS");

  ////console.log(pai)
  var myCEPS = [];
  pai.each(function () {
    var parCEPS1 = $(this).find(".CEP_INICIAL"),
      parCEPS2 = $(this).find(".CEP_FINAL");

    myCEPS.push({
      posicao1: parCEPS1.attr("posicao"),
      valor1: parCEPS1.val(),
      posicao2: parCEPS2.attr("posicao"),
      valor2: parCEPS2.val(),
    });
  });
  ////console.log("myCEPS")
  ////console.log(myCEPS)
  var valor = JSON.stringify(myCEPS);

  $.ajax({
    type: "POST",
    url: mainHost + "/updateDeliveryDefault",

    headers: {
      "x-access-token": localStorage.token,
    },
    data: {
      affiliate_id: AFFILIATE_ID,
      fieldName: "faixa_cep_values",
      fieldValue: valor,
    },
    success: function (data) {
      //console.log(data)
      elemento.css("color", "#f6b504 !important");
    },
    error: function (data) {
      //console.log(data)
      elemento.css("color", "red !important");
    },
    complete: function () {
      // ao final da requisição...
    },
  });
}
function faixaCepSettingsExcluir(elemento) {
  var pai = elemento.parent().parent().parent().parent().find(".parCEPS2");

  ////console.log(pai)
  var myCEPS = [];
  pai.each(function () {
    var parCEPS1 = $(this).find(".CEP_INICIAL"),
      parCEPS2 = $(this).find(".CEP_FINAL");

    myCEPS.push({
      posicao1: parCEPS1.attr("posicao"),
      valor1: parCEPS1.val(),
      posicao2: parCEPS2.attr("posicao"),
      valor2: parCEPS2.val(),
    });
  });
  ////console.log("myCEPS")
  ////console.log(myCEPS)
  var valor = JSON.stringify(myCEPS);

  $.ajax({
    type: "POST",
    url: mainHost + "/updateDeliveryDefault",

    headers: {
      "x-access-token": localStorage.token,
    },
    data: {
      affiliate_id: AFFILIATE_ID,
      fieldName: "exclui_faixa_cep_values",
      fieldValue: valor,
    },
    success: function (data) {
      //console.log(data)
      elemento.css("color", "#f6b504 !important");
    },
    error: function (data) {
      //console.log(data)
      elemento.css("color", "red !important");
    },
    complete: function () {
      // ao final da requisição...
    },
  });
}

function faixaCepContexto(elemento, fieldName) {
  var pai = elemento;

  ////console.log(pai)
  var myCEPS = [];
  pai.each(function () {
    var parCEPS1 = $(this).find(".CEP_INICIAL"),
      parCEPS2 = $(this).find(".CEP_FINAL");

    myCEPS.push({
      posicao1: parCEPS1.attr("posicao"),
      valor1: parCEPS1.val(),
      posicao2: parCEPS2.attr("posicao"),
      valor2: parCEPS2.val(),
    });
  });
  ////console.log("myCEPS")
  ////console.log(myCEPS)
  var valor = JSON.stringify(myCEPS);

  $.ajax({
    type: "POST",
    url: mainHost + "/updateDeliveryDefault",

    headers: {
      "x-access-token": localStorage.token,
    },
    data: {
      affiliate_id: AFFILIATE_ID,
      fieldName: fieldName,
      fieldValue: valor,
    },
    success: function (data) {
      //console.log(data)
      elemento.css("color", "#f6b504 !important");
    },
    error: function (data) {
      //console.log(data)
      elemento.css("color", "red !important");
    },
    complete: function () {
      // ao final da requisição...
    },
  });
}

$(".insereFaixaCep").click(function () {
  ////console.log("clicsicsi")
  var html =
    '<div tipo="include" class="row  parCEPS">' +
    '<div style="padding-left: none;" class="col-md-4">' +
    '<label class="txtLabel">Inicial</label><br>' +
    '<div class="group-input2"><input  onchange="faixaCepSettings($(this))" class="form-control inputProduct cep CEP_INICIAL" placeholder="132001-001" posicao="CEP_INICIAL"></div><br>' +
    "</div>" +
    '<div  style="padding-left: none;" class="col-md-4">' +
    '<label class="txtLabel">Final</label><br>' +
    '<div class="group-input2"><input  onchange="faixaCepSettings($(this))" class="form-control inputProduct  cep CEP_FINAL" placeholder="132001-001" posicao="CEP_FINAL"></div><br>' +
    "</div>" +
    '<div class="col-md-2">' +
    '<div class="input-group iconOpaco ico etiquetaRedonda">' +
    '<svg pedido="00008" onclick="deletarFaixaCep($(this))"  xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 21 21" style="' +
    'margin: auto">&gt;<defs></defs>' +
    '<path class="a" d="M10.937,16H3.063A2.208,2.208,0,0,1,.875,13.778V2.666H.438a.444.444,0,0,1,0-.889H4.375V1.334A1.324,1.324,0,0,1,5.687,0H8.313A1.324,1.324,0,0,1,9.625,1.334v.444h3.937a.444.444,0,0,1,0,.889h-.437V13.778A2.208,2.208,0,0,1,10.937,16ZM1.75,2.666V13.778a1.325,1.325,0,0,0,1.313,1.334h7.875a1.325,1.325,0,0,0,1.313-1.334V2.666ZM5.687.889a.441.441,0,0,0-.437.445v.444h3.5V1.334A.441.441,0,0,0,8.313.889Zm3.5,11.556A.442.442,0,0,1,8.75,12V5.778a.437.437,0,1,1,.875,0V12A.441.441,0,0,1,9.188,12.445Zm-4.375,0A.441.441,0,0,1,4.375,12V5.778a.437.437,0,1,1,.875,0V12A.442.442,0,0,1,4.812,12.445Z" transform="translate(4 3)"></path>' +
    "</svg>" +
    "</div>" +
    "</div>" +
    "</div>";
  $(".cep").mask("00000-000");
  $(".faixasCep").prepend(html);
  $(".cep").mask("00000-000");
});
$(".insereFaixaCepExcluir").click(function () {
  ////console.log("clicsicsi")
  var html =
    '<div tipo="exclude" class="row  parCEPS2">' +
    '<div style="padding-left: none;" class="col-md-4">' +
    '<label class="txtLabel">Inicial</label><br>' +
    '<div class="group-input2"><input  onchange="faixaCepSettingsExcluir($(this))" class="form-control inputProduct cep CEP_INICIAL" placeholder="132001-001" posicao="CEP_INICIAL"></div><br>' +
    "</div>" +
    '<div  style="padding-left: none;" class="col-md-4">' +
    '<label class="txtLabel">Final</label><br>' +
    '<div class="group-input2"><input  onchange="faixaCepSettingsExcluir($(this))" class="form-control inputProduct  cep CEP_FINAL" placeholder="132001-001" posicao="CEP_FINAL"></div><br>' +
    "</div>" +
    '<div class="col-md-2">' +
    '<div class="input-group iconOpaco ico etiquetaRedonda">' +
    '<svg pedido="00008" onclick="deletarFaixaCep($(this))"  xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 21 21" style="' +
    'margin: auto">&gt;<defs></defs>' +
    '<path class="a" d="M10.937,16H3.063A2.208,2.208,0,0,1,.875,13.778V2.666H.438a.444.444,0,0,1,0-.889H4.375V1.334A1.324,1.324,0,0,1,5.687,0H8.313A1.324,1.324,0,0,1,9.625,1.334v.444h3.937a.444.444,0,0,1,0,.889h-.437V13.778A2.208,2.208,0,0,1,10.937,16ZM1.75,2.666V13.778a1.325,1.325,0,0,0,1.313,1.334h7.875a1.325,1.325,0,0,0,1.313-1.334V2.666ZM5.687.889a.441.441,0,0,0-.437.445v.444h3.5V1.334A.441.441,0,0,0,8.313.889Zm3.5,11.556A.442.442,0,0,1,8.75,12V5.778a.437.437,0,1,1,.875,0V12A.441.441,0,0,1,9.188,12.445Zm-4.375,0A.441.441,0,0,1,4.375,12V5.778a.437.437,0,1,1,.875,0V12A.442.442,0,0,1,4.812,12.445Z" transform="translate(4 3)"></path>' +
    "</svg>" +
    "</div>" +
    "</div>" +
    "</div>";
  $(".cep").mask("00000-000");
  $(".faixasCepExcluir").prepend(html);
  $(".cep").mask("00000-000");
});

function myCEPSinclude(dados) {
  var html = "";
  for (const k in dados) {
    html +=
      '<div tipo="include" class="row  parCEPS">' +
      '<div style="padding-left: none;" class="col-md-4">' +
      '<label class="txtLabel">Inicial</label><br>' +
      '<div class="group-input2"><input  onchange="faixaCepSettings($(this))" class="form-control inputProduct cep CEP_INICIAL" value="' +
      dados[k].valor1 +
      '" placeholder="132001-001" posicao="' +
      dados[k].posicao1 +
      '"></div><br>' +
      "</div>" +
      '<div  style="padding-left: none;" class="col-md-4">' +
      '<label class="txtLabel">Final</label><br>' +
      '<div class="group-input2"><input  onchange="faixaCepSettings($(this))" class="form-control inputProduct  cep CEP_FINAL"  value="' +
      dados[k].valor2 +
      '" placeholder="132001-001" posicao="' +
      dados[k].posicao2 +
      '"></div><br>' +
      "</div>" +
      '<div class="col-md-2">' +
      '<div class="input-group iconOpaco ico etiquetaRedonda">' +
      '<svg pedido="00008" onclick="deletarFaixaCep($(this))"  xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 21 21" style="' +
      'margin: auto">&gt;<defs></defs>' +
      '<path class="a" d="M10.937,16H3.063A2.208,2.208,0,0,1,.875,13.778V2.666H.438a.444.444,0,0,1,0-.889H4.375V1.334A1.324,1.324,0,0,1,5.687,0H8.313A1.324,1.324,0,0,1,9.625,1.334v.444h3.937a.444.444,0,0,1,0,.889h-.437V13.778A2.208,2.208,0,0,1,10.937,16ZM1.75,2.666V13.778a1.325,1.325,0,0,0,1.313,1.334h7.875a1.325,1.325,0,0,0,1.313-1.334V2.666ZM5.687.889a.441.441,0,0,0-.437.445v.444h3.5V1.334A.441.441,0,0,0,8.313.889Zm3.5,11.556A.442.442,0,0,1,8.75,12V5.778a.437.437,0,1,1,.875,0V12A.441.441,0,0,1,9.188,12.445Zm-4.375,0A.441.441,0,0,1,4.375,12V5.778a.437.437,0,1,1,.875,0V12A.442.442,0,0,1,4.812,12.445Z" transform="translate(4 3)"></path>' +
      "</svg>" +
      "</div>" +
      "</div>" +
      "</div>";
  }
  return html;
}
function myCepsExclude(dados) {
  //console.log("dados ....")
  //console.log(dados)
  var html = "",
    valor1 = "",
    valor2 = "";

  for (const k in dados) {
    valor1 = dados[k].valor1;
    valor2 = dados[k].valor2;
    if (dados[k].valor1 == undefined || dados[k].valor1 == "undefined") {
      valor1 = "";
    }
    if (dados[k].valor2 == undefined || dados[k].valor2 == "undefined") {
      valor2 = "";
    }

    html +=
      '<div tipo="exclude" class="row  parCEPS">' +
      '<div style="padding-left: none;" class="col-md-4">' +
      '<label class="txtLabel">Inicial</label><br>' +
      '<div class="group-input2"><input  onchange="faixaCepSettingsExcluir($(this))" class="form-control inputProduct cep CEP_INICIAL" value="' +
      valor1 +
      '" placeholder="132001-001" posicao="' +
      dados[k].posicao1 +
      '"></div><br>' +
      "</div>" +
      '<div  style="padding-left: none;" class="col-md-4">' +
      '<label class="txtLabel">Final</label><br>' +
      '<div class="group-input2"><input  onchange="faixaCepSettingsExcluir($(this))" class="form-control inputProduct  cep CEP_FINAL"  value="' +
      valor2 +
      '" placeholder="132001-001" posicao="' +
      dados[k].posicao2 +
      '"></div><br>' +
      "</div>" +
      '<div class="col-md-2">' +
      '<div class="input-group iconOpaco ico etiquetaRedonda">' +
      '<svg pedido="00008" onclick="deletarFaixaCep($(this))"  xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 21 21" style="' +
      'margin: auto">&gt;<defs></defs>' +
      '<path class="a" d="M10.937,16H3.063A2.208,2.208,0,0,1,.875,13.778V2.666H.438a.444.444,0,0,1,0-.889H4.375V1.334A1.324,1.324,0,0,1,5.687,0H8.313A1.324,1.324,0,0,1,9.625,1.334v.444h3.937a.444.444,0,0,1,0,.889h-.437V13.778A2.208,2.208,0,0,1,10.937,16ZM1.75,2.666V13.778a1.325,1.325,0,0,0,1.313,1.334h7.875a1.325,1.325,0,0,0,1.313-1.334V2.666ZM5.687.889a.441.441,0,0,0-.437.445v.444h3.5V1.334A.441.441,0,0,0,8.313.889Zm3.5,11.556A.442.442,0,0,1,8.75,12V5.778a.437.437,0,1,1,.875,0V12A.441.441,0,0,1,9.188,12.445Zm-4.375,0A.441.441,0,0,1,4.375,12V5.778a.437.437,0,1,1,.875,0V12A.442.442,0,0,1,4.812,12.445Z" transform="translate(4 3)"></path>' +
      "</svg>" +
      "</div>" +
      "</div>" +
      "</div>";
  }
  return html;
}
function deletarFaixaCep(elemento) {
  var classePai = elemento.parent().parent().parent().parent();
  elemento.parent().parent().parent().remove();

  ////console.log(classePai.attr("tipo"))
  if (classePai.attr("tipo") == "include") {
    faixaCepContexto(classePai, "faixa_cep_values");
  } else {
    faixaCepContexto(classePai, "exclui_faixa_cep_values");
  }
}

async function deletaMetodoModal(nome_metodo) {
  let newMetodos = [];
  for (const a in DELIVERY_DETAILS) {
    if (DELIVERY_DETAILS[a].descricao !== nome_metodo) {
      newMetodos.push(DELIVERY_DETAILS[a]);
    }
  }
  updateDelivery("delivery_methods", JSON.stringify(newMetodos));

  location.reload();
}
