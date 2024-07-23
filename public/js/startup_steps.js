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

var mainHost = "https://api-smart-939610cb57d8.herokuapp.com";
var urlLocal = window.location.href.split("?");
if (urlLocal[urlLocal.length - 1] == "login") {
  $(".form").hide();
  $(".form2").hide();
  $(".sub").hide();
  $(".form3").show();
}

function alert(texto) {
  $(".alert").html(texto);
  $(".alert").css("z-index", "12151561651");

  $(".alert").fadeIn();
  setTimeout(() => {
    $(".alert").fadeOut();
    $(".alert").html("");
  }, 3000);
}

if (localStorage.stage == undefined || localStorage.stage == null) {
  localStorage.stage = 1;
}

$(".cardSegmento").click(function () {
  $(".cardSegmento").removeClass("segmentoActive");
  $(".cardSegmento").find(".selectedSegment").hide();
  $(this).addClass("segmentoActive");
  $(this).find(".selectedSegment").show();
  localStorage.segmentoPrincipal = $(this).find(".subLabel").text();
});

$(".continuar").click(function () {
  var url = window.location.href.split("");
  var number = Number(localStorage.idPageStartup);
  if (!Number(localStorage.idPageStartup)) {
    number = 1;
  }
  switch (localStorage.stage) {
    case "1":
      var anomaly = [],
        codeVerify = "";
      $(".digito").each(function () {
        if ($(this).val() == "") {
          anomaly.push({ erro: $(this).val(), element: $(this) });
        } else {
          codeVerify += $(this).val();
        }
      });
      if (anomaly.length == 0) {
        $.ajax({
          type: "POST",
          url: mainHost + "/getValidCode",
          data: { mail: localStorage.mailMaster, token: codeVerify },
          headers: {
            "x-access-token": localStorage.token,
          },
          success: function (data) {
            // //console.log(' getValidCode')
            //  //console.log(data)
            window.location.replace("/startup2");
          },
          error: function (data) {
            //console.log(codeVerify)
            //console.log(data)
            //alert("Código inválido!");
            $(".digito").css("border", "2px solid red");
          },
          complete: function () { },
        });
      } else {
        ////console.log(anomaly)
        //alert("Preencha todos os dígitos!")
        for (const k in anomaly) {
          anomaly[k].element.css("border", "2px solid red");
        }
      }

      break;

    case "3":
      var anomaly = [],
        dadosEndereco = [];
      $(".pegaInput").each(function () {
        dadosEndereco.push({
          tag: $(this).attr("placeholder"),
          value: $(this).val(),
        });
        if ($(this).val() == "") {
          anomaly.push($(this));
        }
      });
      if (anomaly.length == 0) {
        localStorage.DADOS_ENDERECO = JSON.stringify(dadosEndereco);
        localStorage.CNPJ = $("#cnpj").val();
        localStorage.razaoSocial = $("#razaoSocial").val();
        window.location.replace("/startup" + (number + 1));
      } else {
        for (const k in anomaly) {
          anomaly[k].css("border", "1px solid red");
        }
        //alert("Preencha todos os campos em vermelho antes de prosseguir!")
      }
      break;
    case "6":
      enviaUsuarios();
      break;
    case "4":
      var LISTA_LOJAS = [];
      $(".cardLoja").each(function () {
        var card = $(this).find(".cardConteudo");
        var categoria = $(this).attr("categoria");
        var LOJA = [];
        card.each(function () {
          LOJA.push({ tag: $(this).attr("storage"), value: $(this).text() });
        });
        LISTA_LOJAS.push({ categoria: categoria, dados: LOJA });
      });
      ////console.log(LISTA_LOJAS)
      if (LISTA_LOJAS.length > 0) {
        localStorage.LISTA_LOJAS = JSON.stringify(LISTA_LOJAS);
      }
      window.location.replace("/startup" + (number + 1));
      break;
    case "5":
      if (
        localStorage.segmentoPrincipal == undefined ||
        localStorage.segmentoPrincipal == "undefined" ||
        localStorage.segmentoPrincipal == ""
      ) {
        //alert("Selecione algum segmento principal!")
      } else {
        window.location.replace("/startup" + (number + 1));
      }
      break;
    case "11":
      var cat = [];
      $(".tagActive").each(function () {
        cat.push($(this).find(".txtCatSele").text());
      });
      ////console.log(cat)
      localStorage.categorias = JSON.stringify(cat);
      if (cat.length == 0) {
        //alert("Selecione pelo menos uma categoria!")
      } else {
        window.location.replace("/startup" + (number + 1));
      }

      break;
    case "12":
      var ferr = [];
      $(".featureActive").each(function () {
        ferr.push($(this).find(".superTextoUpper2").text());
      });
      ////console.log(ferr)
      localStorage.ferramentas = JSON.stringify(ferr);
      if (ferr.length == 0) {
        //alert("Selecione pelo menos uma opção!")
      } else {
        window.location.replace("/startup" + (number + 1));
      }

      break;
    case "8":
      if (localStorage.nameLogo == undefined || localStorage.nameLogo == "") {
        //alert("Envie sua logo antes de prosseguir!")
      } else {
        window.location.replace("/startup" + (number + 1));
      }
      break;
    default:
      window.location.replace("/startup" + (number + 1));
      break;
  }
});
$(".voltar").click(function () {
  var url = window.location.href.split("");
  var number = Number(localStorage.idPageStartup);
  if (!Number(localStorage.idPageStartup)) {
    number = 1;
  }
  if (number <= 0) {
    number = "";
  }
  window.location.replace("/startup" + (number - 1));
});

$(".tagCatSelect").click(function () {
  if ($(this).attr("class").indexOf("tagActive") > -1) {
    $(this).removeClass("tagActive");
    $(this).find("p").removeClass("txtActive");
  } else {
    $(this).addClass("tagActive");
    $(this).find("p").addClass("txtActive");
  }
});

$(".feature").click(function () {
  if ($(this).attr("class").indexOf("featureActive") > -1) {
    $(this).removeClass("featureActive");
    $(this).find(".selectedFeature").hide();
  } else {
    $(this).addClass("featureActive");
    $(this).find(".selectedFeature").show();
  }
});

$(".addPessoasClick").click(function () {
  var elemento = $(this).parent().find(".listaPessoal");

  var onde = $(this).parent().find(".fieldText").text();
  var html =
    '<h1 class="textoModal">Adicionar pessoas<br> à ' +
    onde +
    "</h1><br>" +
    '<h3 class="subTextoModal">Selecione uma função (você poderá criar e gerenciar funções depois):</h3>' +
    '<div class="row" style="max-width: 80%;margin: auto;">' +
    '<div class="subCardModal">' +
    '<h4 class="txtSubCard">Gerentes</h4>' +
    '<div class="row"><div style="max-width: 15%">' +
    checkVerde2 +
    '</div> <p class="itemEscolhido">Visão global da loja</p></div>' +
    '<div class="row"><div style="max-width: 15%">' +
    checkVerde2 +
    '</div> <p class="itemEscolhido">Pedidos</p></div>' +
    '<div class="row"><div style="max-width: 15%">' +
    checkVerde2 +
    '</div> <p class="itemEscolhido">Marketing</p></div>' +
    '<div class="row"><div style="max-width: 15%">' +
    checkVerde2 +
    '</div> <p class="itemEscolhido">Novos usuários da loja</p></div>' +
    "</div>" +
    '<div class="subCardModal">' +
    '<h4 class="txtSubCard">Marketing</h4>' +
    '<div class="row"><div style="max-width: 15%">' +
    checkSilver +
    '</div> <p class="itemEscolhido">Visão global da loja</p></div>' +
    '<div class="row"><div style="max-width: 15%">' +
    checkVerde2 +
    '</div> <p class="itemEscolhido">Pedidos</p></div>' +
    '<div class="row"><div style="max-width: 15%">' +
    checkVerde2 +
    '</div> <p class="itemEscolhido">Marketing</p></div>' +
    '<div class="row"><div style="max-width: 15%">' +
    checkSilver +
    '</div> <p class="itemEscolhido">Novos usuários da loja</p></div>' +
    "</div>" +
    '<div class="subCardModal">' +
    '<h4 class="txtSubCard">Separadores</h4>' +
    '<div class="row"><div style="max-width: 15%">' +
    checkSilver +
    '</div> <p class="itemEscolhido">Visão global da loja</p></div>' +
    '<div class="row"><div style="max-width: 15%">' +
    checkVerde2 +
    '</div> <p class="itemEscolhido">Pedidos</p></div>' +
    '<div class="row"><div style="max-width: 15%">' +
    checkSilver +
    '</div> <p class="itemEscolhido">Marketing</p></div>' +
    '<div class="row"><div style="max-width: 15%">' +
    checkSilver +
    '</div> <p class="itemEscolhido">Novos usuários da loja</p></div>' +
    "</div>" +
    "</div>" +
    '<h4 class="subSub">Insira os e-mails:</h4>' +
    '<div class="areaMail verticalScroll notScroll">' +
    '<h5 class="subSub2">Insira o e-mail e aperte "ENTER": </h5>' +
    mailIcon +
    '<div class="mails row">' +
    '<input onchange="validacaoEmail($(this))" class="vaiEmail" placeholder="email@mail.com"/>' +
    "</div>" +
    "</div>" +
    '<div style="cursor:pointer" onclick="$(\'.close\').click()" class="btnContinueComLoja">  <p class="txtContinueComLoja">Confirmar</p> </div>';

  bootbox.alert({
    message: html,
    onShow: function () {
      $(".vaiEmail").keyup(function (e) {
        var key = e.which || e.keyCode;
        if (key == 13) {
          if (validacaoEmail($(this))) {
            $(".mails").prepend(addMail($(".vaiEmail").val()));
          }
        }
        $(".closeBtn").click(function () {
          $(this).parent().remove();
        });
      });
      $(".closeBtn").click(function () {
        $(this).parent().remove();
      });
      $(".subCardModal").click(function () {
        $(".subCardModal").removeClass("subCardSelected");
        $(".txtSubCard").removeClass("txtEscolhido");
        $(this).addClass("subCardSelected");
        $(this).find(".txtSubCard").addClass("txtEscolhido");
      });
    },
    callback: function () {
      var pacote = [],
        peoples = [];
      $(".subCardSelected").each(function () {
        pacote.push($(this).find(".txtSubCard").text());
      });
      $(".mail").each(function () {
        peoples.push($(this).text().trim());
      });
      var access = [];
      if (pacote.length == 0) {
        //alert("Nenhum pacote de acessos foi selecionado!")
      } else {
        if (peoples.length == 0) {
          //alert("Nenhum e-mail foi adicionado!")
        } else {
          var atualA = [];

          atualA = JSON.parse(
            localStorage.ACESSOS ? localStorage.ACESSOS : "[]"
          );
          atualA.push({ type: pacote, mails: peoples, onde: onde });
          localStorage.ACESSOS = JSON.stringify(atualA);

          addAccess(elemento, pacote[0], peoples);
        }
      }
    },
  });
  $(".modal-footer").hide();
  $(".modal-content").css("width", "872px");
  $(".modal-content").css("height", "752px");
  $(".modal-content").css("border-radius", "25px");
  $(".modal-content").css("background", "#FFFFFF 0% 0% no-repeat padding-box");
  $(".modal-content").css("box-shadow", " 0px 0px 10px #6A6A6A19");
  $(".modal-content").css("margin", "auto calc(calc(100% - 872px) /2)");
});

$(".edtarText").click(function () {
  $(this).parent().find(".cardConteudo").css("color", "blue");
  $(this).parent().find(".cardConteudo").attr("contentEditable", "true");
  $(this).hide();
  $(this).parent().find(".btnSalvaLoja").show();
});
var LISTA_LOJAS = [];
$(".btnSalvaLoja").click(function () {
  $(this).hide();
  $(this).parent().find(".cardConteudo").attr("contentEditable", "false");
  $(this).parent().find(".cardConteudo").css("color", "black");
  $(this).parent().find(".edtarText").show();
});

$(".btnPlusAddLoja").click(function () {
  var html =
    '<div categoria="afiliada" class="cardLoja">' +
    '<svg class="selectedIcon" xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 31 31"><defs><style>.a{fill:#50c682;}.b{fill:#fff;}</style></defs><path class="a" d="M15.5,0a15.451,15.451,0,1,0,6.033,1.218A15.451,15.451,0,0,0,15.5,0Z"/><g transform="translate(8.977 10.263)"><path class="b" d="M4.5,8.739,13.052.189a.644.644,0,1,1,.911.911l-9,9a.643.643,0,0,1-.911,0L.188,6.245A.644.644,0,1,1,1.1,5.334Z"/></g></svg>' +
    '<h5 class="cardTitulo">Loja afiliada</h5><hr>' +
    '<label  class="cardLabel">Razão Social</label>' +
    '<p storage="razaoSocial" class="cardConteudo razaoSocial">SmartComerci Soluções</p>' +
    '<label  class="cardLabel">CNPJ</label>' +
    '<p storage="cnpj" class="cardConteudo cnpj">12345657/0001-89</p>' +
    '<label  class="cardLabel">Telefone</label>' +
    '<p storage="telefone" class="cardConteudo telefone">+55 11 99999999</p>' +
    '<label  class="cardLabel">E-mail</label>' +
    '<p storage="email" class="cardConteudo email">contato@meuemail.com</p>' +
    '<label  class="cardLabel">Horário</label>' +
    '<p storage="horarios" class="cardConteudo horarios">De segunda a sexta das 08h às 22h<br>Aos Sábados das 08h às 20h<br>Aos domingos de 10h às 16h</p>' +
    '<label  class="cardLabel">Endereço</label>' +
    '<p storage="endereco" class="cardConteudo endereco">Rua xxxxxxxxxx<br>xxxxx - SP - 01234-567</p><hr>' +
    '<label style="cursor: pointer; margin: auto !important" class="edtarText">' +
    '<svg xmlns="http://www.w3.org/2000/svg" style="margin:6% auto; fill: #50C682" width="20" height="20" viewBox="0 0 20 20">' +
    '<defs></defs><path class="a" d="M12.929,15H2.083A2.086,2.086,0,0,1,0,12.917V2.084A2.086,2.086,0,0,1,2.083,0H7.928a.417.417,0,0,1,0,.833H2.083a1.252,1.252,0,0,0-1.25,1.25V12.917a1.252,1.252,0,0,0,1.25,1.25H12.929a1.251,1.251,0,0,0,1.25-1.25V7.084a.417.417,0,0,1,.834,0v5.833A2.086,2.086,0,0,1,12.929,15Zm-5-5.833H6.262a.417.417,0,0,1-.417-.416V7.084a.417.417,0,0,1,.122-.295L12.633.122a.417.417,0,0,1,.59,0L14.89,1.789a.416.416,0,0,1,0,.59L8.223,9.046A.414.414,0,0,1,7.928,9.167Zm5-8.161h0l-6.25,6.25V8.334H7.756l6.25-6.25L12.929,1.007Z" transform="translate(2.488 2.499)"></path>' +
    "</svg>Editar</label>" +
    '<div class="btnSalvaLoja">' +
    '<p class="txtSalvaLoja ">Salvar</p>' +
    "</div>" +
    "</div>";

  $(".myCards").prepend(html);
  $(".edtarText").click(function () {
    $(this).parent().find(".cardConteudo").css("color", "blue");
    $(this).parent().find(".cardConteudo").attr("contentEditable", "true");
    $(this).hide();
    $(this).parent().find(".btnSalvaLoja").show();
  });

  $(".btnSalvaLoja").click(function () {
    $(this).hide();
    $(this).parent().find(".cardConteudo").attr("contentEditable", "false");
    $(this).parent().find(".cardConteudo").css("color", "black");
    $(this).parent().find(".edtarText").show();
  });

  $(".edtarText").click(function () {
    $(this).parent().find(".cardConteudo").css("color", "blue");
    $(this).parent().find(".cardConteudo").attr("contentEditable", "true");
  });
});
$(".enviaCodigo").click(function () {
  if (
    $("#emailMaster").val() != "" &&
    $("#emailMaster").val().indexOf("@") > -1
  ) {
    $.ajax({
      type: "POST",
      url: mainHost + "/startup",
      data: { mail: $("#emailMaster").val() },
      success: function (data) {
        //console.log(data)
        $("#emailUm").html($("#emailMaster").val());
        $(".form").hide();
        $(".form2").show();
        $("#emailMaster").css("border", "2px solid green");
        localStorage.stage = 2;
        localStorage.mailMaster = $("#emailMaster").val();
      },
      error: function (data) {
        //console.log('startup')
        //console.log(data)
        location.replace("/startup?login");

        //alert("Algo saiu errado<br>"+data)
      },
      complete: function () { },
    });
  } else {
    $("#emailMaster").css("border", "2px solid red");
    //alert("Formato de e-mail inválido!")
  }
});
$(".reenviar").click(function () {
  if (
    $("#emailMaster").val() != "" &&
    $("#emailMaster").val().indexOf("@") > -1
  ) {
    $.ajax({
      type: "POST",
      url: mainHost + "/startup",
      data: { mail: $("#emailMaster").val() },
      success: function (data) {
        //console.log(data)
        $("#emailUm").html($("#emailMaster").val());
        $(".form").hide();
        $(".form2").show();
        $("#emailMaster").css("border", "2px solid green");
        localStorage.stage = 2;
        localStorage.mailMaster = $("#emailMaster").val();
      },
      error: function (data) {
        //console.log(data)
        //alert("Algo saiu errado<br>"+data)
      },
      complete: function () {
        $(".digito").val("");
      },
    });
  } else {
    $("#emailMaster").css("border", "2px solid red");
    //alert("Formato de e-mail inválido!")
  }
});

$(".digito").change(function () {
  var number = Number($(this).attr("id"));
  if (number == 5) {
    //$(".continuar").click()
  } else {
    $("#0" + number).emulateTab();
  }
});

$(".fazerLogin").click(function () {
  $(".form").hide();
  $(".form2").hide();
  $(".sub").hide();
  $(".form3").show();
});

$("#continuarLogin").click(function () {
  var anomaly = [];
  $(".verifica").each(function () {
    if ($(this).val() == "") {
      anomaly.push({ message: "Preencha todos os campos!", element: $(this) });
    }
  });

  if (anomaly.length == 0) {
    $.ajax({
      type: "POST",
      url: mainHost + "/login",
      data: {
        user: $("#emailMasterLogin").val(),
        table: "users_affiliates",
        prefix: "users_affiliate",
        password: $("#senhaMasterLogin").val(),
      },
      success: function (data) {
        //console.log(data);
        localStorage.token = data.token;
        localStorage.token_me = data.token_me;
        localStorage.MASTER_ID = data.data.users_affiliate_master_id;
        //alert("O login foi correto")

        location.replace("/startup2");
      },
      error: function (data) {
        //console.log(data);
        //alert("O login falhou!")
      },
      complete: function () { },
    });
  } else {
    //alert(anomaly[0].message)
    anomaly[0].element.css("border", "2px solid red");
  }
});
function addMail(text) {
  return '<span class="mail">' + text + " &nbsp;  " + closeIcon2 + "</span>";
}

function addAccess(elemento, tipo, lista) {
  for (const k in lista) {
    var html =
      '<div class="funcionario">' +
      '<div class="row">' +
      '<div class="iconFuncionario">' +
      lista[k].split("")[0].toUpperCase() +
      "</div>" +
      '<p class="contatoText">' +
      lista[k] +
      "</p>" +
      '<p class="txtFuncionario">perfil ' +
      tipo +
      "</p>" +
      '<div mail="' +
      lista[k] +
      '" onclick="editaContato1($(this),\'' +
      lista[k] +
      '\')" style="max-width: 5%; float:right; cursor:pointer"><svg xmlns="http://www.w3.org/2000/svg" style="margin:6% auto; fill: #50C682" width="20" height="20" viewBox="0 0 20 20"><defs></defs><path class="a" d="M12.929,15H2.083A2.086,2.086,0,0,1,0,12.917V2.084A2.086,2.086,0,0,1,2.083,0H7.928a.417.417,0,0,1,0,.833H2.083a1.252,1.252,0,0,0-1.25,1.25V12.917a1.252,1.252,0,0,0,1.25,1.25H12.929a1.251,1.251,0,0,0,1.25-1.25V7.084a.417.417,0,0,1,.834,0v5.833A2.086,2.086,0,0,1,12.929,15Zm-5-5.833H6.262a.417.417,0,0,1-.417-.416V7.084a.417.417,0,0,1,.122-.295L12.633.122a.417.417,0,0,1,.59,0L14.89,1.789a.416.416,0,0,1,0,.59L8.223,9.046A.414.414,0,0,1,7.928,9.167Zm5-8.161h0l-6.25,6.25V8.334H7.756l6.25-6.25L12.929,1.007Z" transform="translate(2.488 2.499)"></path></svg></div>' +
      '<label onClick="removeMe($(this))" style="max-width: 5%;font-weight: bold; font-size: 16px; float:right; color: #B0B2B1; margin-right: 2%; margin-left: 3%; cursor:pointer" class="iconClose">x</label>' +
      "</div>" +
      "</div>";
    elemento.append(html);
  }
}

function validacaoEmail(field) {
  usuario = field.val().substring(0, field.val().indexOf("@"));
  dominio = field
    .val()
    .substring(field.val().indexOf("@") + 1, field.val().length);

  if (
    usuario.length >= 1 &&
    dominio.length >= 3 &&
    usuario.search("@") == -1 &&
    dominio.search("@") == -1 &&
    usuario.search(" ") == -1 &&
    dominio.search(" ") == -1 &&
    dominio.search(".") != -1 &&
    dominio.indexOf(".") >= 1 &&
    dominio.lastIndexOf(".") < dominio.length - 1
  ) {
    field.css("border", "1px solid green");
    return true;
  } else {
    field.css("border", "1px solid red");
    //alert("E-mail invalido!");
    return false;
  }
}
function removeMe(element) {
  element.parent().parent().remove();
}

function editaContato1(element, contato) {
  var opcao = element.parent().parent().find(".txtFuncionario");

  opcao = opcao[0].innerText.split(" ")[1].toLowerCase().trim();

  var fieldText = element
    .parent()
    .parent()
    .parent()
    .parent()
    .find(".fieldText"),
    listaPessoal = element
      .parent()
      .parent()
      .parent()
      .parent()
      .find(".listaPessoal");
  var elemento = listaPessoal;
  element.parent().parent().remove();
  var onde = fieldText[0].innerText;
  //console.log("onde")
  //console.log(onde)
  var html =
    '<h1 class="textoModal">Adicionar pessoas<br> à ' +
    onde +
    "</h1><br>" +
    '<h3 class="subTextoModal">Selecione uma função (você poderá criar e gerenciar funções depois):</h3>' +
    '<div class="row" style="max-width: 80%;margin: auto;">' +
    '<div id="gerentes" opcao="gerentes" class="subCardModal">' +
    '<h4 class="txtSubCard">Gerentes</h4>' +
    '<div class="row"><div style="max-width: 15%">' +
    checkVerde2 +
    '</div> <p class="itemEscolhido">Visão global da loja</p></div>' +
    '<div class="row"><div style="max-width: 15%">' +
    checkVerde2 +
    '</div> <p class="itemEscolhido">Pedidos</p></div>' +
    '<div class="row"><div style="max-width: 15%">' +
    checkVerde2 +
    '</div> <p class="itemEscolhido">Marketing</p></div>' +
    '<div class="row"><div style="max-width: 15%">' +
    checkVerde2 +
    '</div> <p class="itemEscolhido">Novos usuários da loja</p></div>' +
    "</div>" +
    '<div id="marketing" opcao="marketing" class="subCardModal">' +
    '<h4 class="txtSubCard">Marketing</h4>' +
    '<div class="row"><div style="max-width: 15%">' +
    checkSilver +
    '</div> <p class="itemEscolhido">Visão global da loja</p></div>' +
    '<div class="row"><div style="max-width: 15%">' +
    checkVerde2 +
    '</div> <p class="itemEscolhido">Pedidos</p></div>' +
    '<div class="row"><div style="max-width: 15%">' +
    checkVerde2 +
    '</div> <p class="itemEscolhido">Marketing</p></div>' +
    '<div class="row"><div style="max-width: 15%">' +
    checkSilver +
    '</div> <p class="itemEscolhido">Novos usuários da loja</p></div>' +
    "</div>" +
    '<div  id="separadores" opcao="separadores" class="subCardModal">' +
    '<h4 class="txtSubCard">Separadores</h4>' +
    '<div class="row"><div style="max-width: 15%">' +
    checkSilver +
    '</div> <p class="itemEscolhido">Visão global da loja</p></div>' +
    '<div class="row"><div style="max-width: 15%">' +
    checkVerde2 +
    '</div> <p class="itemEscolhido">Pedidos</p></div>' +
    '<div class="row"><div style="max-width: 15%">' +
    checkSilver +
    '</div> <p class="itemEscolhido">Marketing</p></div>' +
    '<div class="row"><div style="max-width: 15%">' +
    checkSilver +
    '</div> <p class="itemEscolhido">Novos usuários da loja</p></div>' +
    "</div>" +
    "</div>" +
    '<h4 class="subSub">Insira os e-mails:</h4>' +
    '<div class="areaMail verticalScroll notScroll">' +
    '<h5 class="subSub2">Insira o e-mail e aperte "ENTER": </h5>' +
    mailIcon +
    '<div class="mails row">' +
    '<span class="mail">' +
    contato +
    ' &nbsp;  <img class="closeBtn" src="images/icons/cancel.png" style="width: 15px; height: 15px;margin: auto -5px auto auto;cursor:pointer"></span>' +
    '<input onchange="validacaoEmail($(this))" class="vaiEmail" value="' +
    contato +
    '" placeholder="email@mail.com"/>' +
    "</div>" +
    "</div>";

  bootbox.alert({
    message: html,
    onShow: function () {
      //console.log("$('#"+opcao+"').click()")
      setTimeout(() => {
        $("#" + opcao).click();
      }, 1000);

      $(".vaiEmail").keyup(function (e) {
        var key = e.which || e.keyCode;
        if (key == 13) {
          if (validacaoEmail($(this))) {
            $(".mails").prepend(addMail($(".vaiEmail").val()));
          }
        }
        $(".closeBtn").click(function () {
          $(this).parent().remove();
        });
      });
      $(".closeBtn").click(function () {
        $(this).parent().remove();
      });
      $(".subCardModal").click(function () {
        $(".subCardModal").removeClass("subCardSelected");
        $(".txtSubCard").removeClass("txtEscolhido");
        $(this).addClass("subCardSelected");
        $(this).find(".txtSubCard").addClass("txtEscolhido");
      });
    },
    callback: function () {
      var pacote = [],
        peoples = [];
      $(".subCardSelected").each(function () {
        pacote.push($(this).find(".txtSubCard").text());
      });
      $(".mail").each(function () {
        peoples.push($(this).text().trim());
      });
      var access = [];
      if (pacote.length == 0) {
        //alert("Nenhum pacote de acessos foi selecionado!")
      } else {
        if (peoples.length == 0) {
          //alert("Nenhum e-mail foi adicionado!")
        } else {
          var atualA = [];

          atualA = JSON.parse(
            localStorage.ACESSOS ? localStorage.ACESSOS : "[]"
          );

          atualA.push({ type: pacote, mails: peoples, onde: onde });
          localStorage.ACESSOS = JSON.stringify(atualA);
          addAccess(elemento, pacote[0], peoples);
        }
      }
    },
  });
  $(".modal-footer").hide();
  $(".modal-content").css("width", "872px");
  $(".modal-content").css("height", "652px");
  $(".modal-content").css("border-radius", "25px");
  $(".modal-content").css("background", "#FFFFFF 0% 0% no-repeat padding-box");
  $(".modal-content").css("box-shadow", " 0px 0px 10px #6A6A6A19");
  $(".modal-content").css("margin", "auto calc(calc(100% - 872px) /2)");
}

function enviaUsuarios() {
  //console.log(localStorage.ACESSOS)
  var ACESSOS = JSON.parse(localStorage.ACESSOS);
  var LOJAS_CADASTRADAS = JSON.parse(localStorage.LOJAS_CADASTRADAS);

  for (const k in ACESSOS) {
    var essaLoja = ACESSOS[k].onde;
    for (const a in LOJAS_CADASTRADAS) {
      if (LOJAS_CADASTRADAS[a].affiliates_business_name == essaLoja) {
        ACESSOS[k].AFFILIATE_ID = LOJAS_CADASTRADAS[a].id;
      }
    }
    if (ACESSOS[k].AFFILIATE_ID == undefined) {
      ACESSOS[k].AFFILIATE_ID = 0;
    }
  }
  //console.log("ACESSOS", ACESSOS)

  $.ajax({
    type: "POST",
    url: mainHost + "/usuariosAcessosAdd",
    data: { master_id: 2, lista_emails: ACESSOS },
    headers: {
      "x-access-token": localStorage.token,
    },
    success: function (data) {
      //console.log(' inserindo dados ', data)
      for (const k in ACESSOS) {
        var mails = ACESSOS[k].mails;
        for (const a in mails) {
          $("#listaDeAcessosConcedidos").append(
            "<tr>" +
            "<td>" +
            mails[a] +
            "</td>" +
            "<td>" +
            ACESSOS[k].type[0] +
            "</td>" +
            "<td>" +
            ACESSOS[k].onde +
            "</td>" +
            "</tr>"
          );
        }
      }

      $(".feedbackAcessos").fadeIn();
    },
    error: function (data) {
      //console.log(data)
    },
    complete: function () { },
  });
}
