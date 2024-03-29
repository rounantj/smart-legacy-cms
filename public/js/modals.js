let MY_PAGES_INST = [];
let MY_LINKS = [];

$.ajax({
  type: "POST",
  url: mainHost + "/getByTableName",
  data: {
    masterId: localStorage.MASTER_ID,
    idName: "master_id",
    tableName: "institucional_pages",
  },
  headers: {
    "x-access-token": localStorage.token,
  },
  success: function (data) {
    MY_PAGES_INST = data;
  },
  error: function (data) {
    console.log("erro institucional", data);
  },
  complete: function () {},
});

$.ajax({
  type: "POST",
  url: mainHost + "/getMyLinksBanners",
  data: { affiliate_id: localStorage.AFFILIATE_ID },
  headers: {
    "x-access-token": localStorage.token,
  },
  success: function (data) {
    MY_LINKS = data;
  },
  error: function (data) {
    console.log("erro institucional", data);
  },
  complete: function () {},
});

async function modalAlteraLinks(elemento, idFuturo) {
  console.log(elemento, idFuturo);
  var TAGS = "",
    MARCAS = "";
  if (
    localStorage.TAGS_MARCAS != null &&
    localStorage.TAGS_MARCAS != "" &&
    localStorage.TAGS_MARCAS != "undefined"
  ) {
    var lst = JSON.parse(localStorage.TAGS_MARCAS);
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
  let futureElement = "#" + elemento.attr("id");

  var html = `
    <h4 style="font-size: 24px !important" class="infoLabel">Alterar o link</h4>
    <p style="text-align: left;  display:none;font-size: 1.2rem;margin: 25px auto;margin-left: 20px;"  id="meuLinkExterno">https://meusite.com.br/<span style="text-weight: bold" id="meuLinkInterno"></span></p>
    <p style="text-align: left;  ;font-size: 1.2rem;margin: 25px auto;margin-left: 20px; color: lightblue;">${
      elemento.attr("linkTarget") ? elemento.attr("linkTarget") : ""
    }</p>
    <div style="max-width: 100%; max-height: 60vh;  margin-top: 80px;" class="container verticalScroll ">
      <hr class="baixoCabecalho" style="position: fixed;top: 165px !important;right: calc((100% - 648px) / 2) !important;width: 648px;box-shadow: 2px 2px 2px silver;/* margin: auto; */">
      <div style="padding:0 2%; margin-top: 5%" class="row"> 
          <label style=" font-size: 18px;" class="label">Categorias</label><br>  
      </div>
      <div class="col-md-12 grupoCinza">
          <div class="row">
            <div class="col-md-10">
                <div style="padding:0 2%" class="row listaCategoriasFilter">
                  
                </div>
            </div>
            <div class="col-md-2">
                <div  class="input-group  ico dropItems"> 
                  ${arrowDown}
                </div>
            </div>
          </div>
          <div style="display:none; margin-top: 3%;      overflow: auto;
          max-height: 390px;" class="row grupoCategorias drop">
            <div class="col-md-12">
                <div class="input-group">
                  <input id="buscaCategorias" type="text" style="min-width: 300px;font-size: 1.3rem" value="" class="form-control" placeholder="Busque por categorias" /> 
                  <div class="input-group-append">
                      <div class="input-group-text"> 
                        <i style="color: #f6b504; font-weight: bold;" class="fas fa-search"></i> 
                      </div>
                  </div>
                </div>
            </div>
            <div style="max-height: 30vh" class="col-md-12 verticalScroll">
                <ul style="    margin-top: 5%;" class="list animate__animated "> 
                  ${getCategoriesAndSubToFilterLinks(MY_CATEGORIES)}
                </ul>
            </div>
          </div>
      </div>
     
      <div style="padding:0 2%; margin-top: 5%" class="row"> 
          <label style=" font-size: 18px;" class="label">Páginas Institucionais</label><br>  
      </div>
      <div class="col-md-12 grupoCinza">
          <div class="row">
            <div class="col-md-10">
                <div style="padding:0 2%" class="row minhasMarcas">
                  
                </div>
            </div>
            <div class="col-md-2">
                <div  class="input-group  ico dropItems"> 
                ${arrowDown} 
                </div>
            </div>
          </div>
          <div style="display:none; margin-top: 3%" class="row grupoCategorias drop">
            <div class="col-md-12">
                <div class="input-group">
                  <input id="buscaCategorias" type="text" style="min-width: 300px;font-size: 1.3rem" value="" class="form-control" placeholder="Busque por páginas" /> 
                  <div class="input-group-append">
                      <div class="input-group-text"> 
                        <i style="color: #f6b504; font-weight: bold;" class="fas fa-search"></i> 
                      </div>
                  </div>
                </div>
            </div>
            <div style="max-height: 30vh" class="col-md-12 verticalScroll">
                <ul style="    margin-top: 5%;" class="list animate__animated "> 
                  ${getMyPagesInst(MY_PAGES_INST, "marcas")}
                </ul>
            </div>
          </div>
      </div> 
      <div style="margin-top: 3% !important;" class="col-md-12 grupo">
          <div style="padding: 0 2%; margin-top: 2%;" class="row">
            <div style="margin: 1% 2%;" class="switch__container ajuste"><input  column="desativados"  id="switch-shadow13" class="switch switch--shadow ativaLinksExterno" type="checkbox" /><label for="switch-shadow13"></label></div>
            <label style="font-size: 20px;" class="label">Link externo</label> 
          </div>
                <div class="input-group">
                  <input id="buscaCategorias" onchange="setaLink($(this))" type="text" style="min-width: 300px;font-size: 1.3rem; max-width: 95%; margin: auto; border-radius: 5px" value="" class="form-control" placeholder="Insira aqui o link externo..." /> 
                
                </div>
      </div>
      
    </div>

    <div  style="padding:0 2%; margin-top: 5%" >
      <label style="font-size: 20px;" class="label">Link em uso: <br><a style="color:#f6b504" href="${getMyUrl(
        sessionStorage.COLUMN_ORIGIN
      )}" target="_blank">${getMyUrl(sessionStorage.COLUMN_ORIGIN)}</a></label>
 
    </div>
 
    <div style="display: inline-flex; width: 100%;border-top: 0.949999988079071px solid #EDEDED;">
      <p   class="removeFiltros">Cancelar</p>
      <div onclick="salvarLinkEscolhido($(this),'${idFuturo}')"  style="font-size: 1.5rem; padding: 8px" class="btnFiltroGet">
          
          <span class="txtFiltroGet">SALVAR</span> 
      </div>
    </div>  `;

  bootbox.alert({
    message: html,
    onShow: function () {
      $(this)[0].id = "modalCentralFiltroInner";
      $(this)[0].height = "85vh";
      $("#modalCentralFiltroInner")
        .find(".modal-dialog")
        .addClass("modalCentralFiltro");
      $("#modalCentralFiltroInner")
        .find(".modal-dialog")
        .css("max-height", "99vh !Important");
      $("#modalCentralFiltroInner")
        .find(".modal-dialog")
        .css("height", "99vh !Important");

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
        ////////console.log("Cliquei")
        if ($(this).attr("dropou") == "1") {
          $(this).parent().find(".listInner").hide();
          $(this).attr("dropou", "0");
        } else {
          $(this).parent().find(".listInner").show();
          $(this).attr("dropou", "1");
        }
      });
    },
    callback: async function () {
      $("#modalInner").find(".modal-dialog").removeClass("modalCentral");
      return sessionStorage.LINK_ESCOLHIDO_TEMP;
    },
  });

  $(".modal-content").css("max-height", "65vh");
  $(".modal-content").css("border", "none");
}

function getMyUrl(myContent) {
  console.log("mySearch", myContent, MY_LINKS);
  if (myContent) {
    const result = MY_LINKS?.find((ml) => ml.column_origin === myContent);
    if (result) {
      if (result.url.indexOf("http") > -1) {
        return result.url;
      } else {
        try {
          let domain = JSON.parse(localStorage.DADOS_MATRIZ).site_front_domain;
          return `https://${domain}${result.url}`;
        } catch (e) {
          return result.url;
        }
      }
    } else {
      return "";
    }
  } else {
    return "";
  }
}

function getMyPagesInst(TEXTAO, tipo) {
  var html3 = "";

  var LISTA_01 = TEXTAO;
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
        LISTA_01[k].name_page +
        " <input class=\"marcar mcInterna\" onchange=\"setaLink($(this),'pagina','null','null','" +
        LISTA_01[k].name_page +
        '\')"  type="checkbox"><span class="checkmark subCheck"></span></label>';
      html3 += "</li> ";
    }
  }

  return html3;
}

function getCategoriesAndSubToFilterLinks(MY_CATEGORIES) {
  var html3 = "",
    nova = '<li class="novaLI"></li>';

  for (const k in MY_CATEGORIES) {
    var content =
      '<ul class="listInner listInner2 sub-listInner2 animate__animated ">';
    html3 +=
      '<li    class="list-item sub-list-item animate__animated targetBusca">' +
      arrowDown3 +
      '<label style="max-width: 70%; float: left;    margin: 5px 15px ;" class=" subSmart subCheck animate__animated animate__"> <img   src="' +
      MY_CATEGORIES[k].categorie_icon +
      '" style="width: 30px; height: 30px; margin-top -10%"/> ';
    content += nova;
    if (MY_CATEGORIES[k].subCategorias != "?") {
      var txtCategories = MY_CATEGORIES[k].subCategorias.split(",");
      for (let a = 0; a < txtCategories.length; a++) {
        if (
          txtCategories[a].length > 0 &&
          txtCategories[a] != "" &&
          txtCategories[a] != "null" &&
          txtCategories[a] != "undefined" &&
          txtCategories[a] != null &&
          txtCategories[a] != undefined
        ) {
          content +=
            '<li   class="list-sub-item targetBusca"><div class="row"><span style="border-top: 5px dotted silver !important;" class="trilha">..........</span><label class="subSmart  animate__animated animate__"><input class="marcar"  onchange="setaLink($(this),\'subcategoria\',\'' +
            txtCategories[a] +
            "','" +
            MY_CATEGORIES[k].categoria +
            '\')" type="checkbox"><span class="checkmark"></span>' +
            txtCategories[a] +
            "</label></div></li> ";
        }

        ////////////console.log(content)
      }
    }
    content += "</ul>";
    html3 +=
      MY_CATEGORIES[k].categoria +
      " <input class=\"marcar mcInterna\"  onchange=\"setaLink($(this),'categoria','null','" +
      MY_CATEGORIES[k].categoria +
      '\')" type="checkbox"><span class="checkmark subCheck"></span></label>';
    html3 += content + "</li> ";
  }

  return html3;
}

function setaLink(elemento, tipo, sub, cat, pag) {
  try {
    $(".mcInterna").each(function () {
      $(this)[0].checked = false;
    });
    elemento[0].checked = true;
  } catch (e) {}

  switch (tipo) {
    case "categoria":
      $(".ativaLinksExterno")[0].checked = false;

      $("#meuLinkInterno").text("c/" + cat.trim());
      sessionStorage.LINK_ESCOLHIDO_TEMP = "/c/" + cat.trim();
      break;

    case "subcategoria":
      $(".ativaLinksExterno")[0].checked = false;
      $("#meuLinkInterno").text("c/" + cat.trim() + "/sc/" + sub.trim());
      sessionStorage.LINK_ESCOLHIDO_TEMP =
        "/c/" + cat.trim() + "/sc/" + sub.trim();
      break;

    case "pagina":
      $(".ativaLinksExterno")[0].checked = false;
      $("#meuLinkInterno").text("paginas-institucionais/" + pag.trim());
      sessionStorage.LINK_ESCOLHIDO_TEMP =
        "/paginas-institucionais/" + pag.trim();
      break;

    default:
      $(".ativaLinksExterno")[0].checked = true;
      $("#meuLinkExterno").html(elemento.val());
      sessionStorage.LINK_ESCOLHIDO_TEMP = elemento.val();
      break;
  }
}

async function salvarLinkEscolhido(elemento, idFuturo) {
  console.log(
    elemento,
    "salvando link...",
    idFuturo,
    sessionStorage.LINK_ESCOLHIDO_TEMP
  );

  if (!idFuturo || idFuturo.indexOf("undefined") > -1) {
    idFuturo = elemento.attr("id");
  }
  if (!idFuturo || idFuturo.indexOf("undefined") > -1) {
    let newId = Math.random();
    elemento.attr("id", "newId_" + newId);
    idFuturo = "newId_" + newId;
  }
  idFuturo = idFuturo.trim().replace(/ /g, "");

  $.ajax({
    type: "POST",
    url: mainHost + "/insertNew",
    headers: {
      "x-access-token": localStorage.token,
    },
    data: {
      table: "links",
      fields: [
        { column: "master_id", value: Number(localStorage.MASTER_ID) },
        { column: "affiliate_id", value: Number(localStorage.AFFILIATE_ID) },
        { column: "url", value: sessionStorage.LINK_ESCOLHIDO_TEMP },
        { column: "referencia", value: sessionStorage.REFERENCIA },
        { column: "id_origin", value: sessionStorage.ID_ORIGIN },
        { column: "column_origin", value: sessionStorage.COLUMN_ORIGIN },
        { column: "table_origin", value: sessionStorage.TABLE_ORIGIN },
      ],
    },
    success: function (data) {
      console.log("idFuturo", idFuturo, data);
      informar("alert-success", "As alterações foram salvas!", 3000);

      sessionStorage.MUDA_ID_LINK = JSON.stringify({
        link: sessionStorage.LINK_ESCOLHIDO_TEMP,
        id: "#" + idFuturo,
      });

      $(".close").click();
    },
    error: function (data) {
      informar(
        "alert-danger",
        "Algo saiu errado, alterações não foram salvas!",
        3000
      );
    },
    complete: function () {
      // ao final da requisição...
    },
  });
}
