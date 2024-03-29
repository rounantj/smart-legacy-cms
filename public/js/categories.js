var AFFILIATE_ID = localStorage.AFFILIATE_ID;
var MASTER_ID = localStorage.MASTER_ID;

sessionStorage.NEED_TO_SAVE = "";
sessionStorage.PALAVRAS_KEY = "";
localStorage.CAT_SUB_EDIT = "";
localStorage.SUB_EDIT = "";
localStorage.SUB_CAT_ATUAL = "";
localStorage.SUB_CAT_ATUAL_STATUS = "";
sessionStorage.SAVE_SUCCEFULLY = 0;
var TODAS_CATS_NEW = [];

//=============Getting all CATEGORIES================
var CATEGORIES = [],
  MY_CATEGORIES = [],
  MINHAS_CATEGORIAS = [];
mostra();
function mostra() {
  $(".listaDeCategorias").html("");
  $.ajax({
    type: "POST",
    url: "http://localhost:6060/getCatList",
    headers: {
      "x-access-token": localStorage.token,
    },
    data: {
      affiliate_id: AFFILIATE_ID,
      master_id: MASTER_ID,
    },
    success: function (getCatList) {
      MINHAS_CATEGORIAS = getCatList;
      // for(const k in MINHAS_CATEGORIAS){
      //     var myN = {},myA = {},myB = {}
      //     try{
      //         myN = JSON.parse(MINHAS_CATEGORIAS[k].subcategorie_banners)
      //     }catch(e){}
      //     try{
      //         myA = JSON.parse(MINHAS_CATEGORIAS[k].categorie_banners)
      //     }catch(e){}
      //     try{
      //         myB = JSON.parse(MINHAS_CATEGORIAS[k].affiliate_categorie_status)
      //     }catch(e){}

      //     MINHAS_CATEGORIAS[k].affiliate_categorie_status = myB
      //     MINHAS_CATEGORIAS[k].categorie_banners = myA
      //     MINHAS_CATEGORIAS[k].subcategorie_banners = myN

      // }
      // console.log("MINHAS_CATEGORIAS ACERTADAS",MINHAS_CATEGORIAS)

      localStorage.MINHAS_CATEGORIAS = JSON.stringify(MINHAS_CATEGORIAS);
      continua();
    },
    error: function (getCatList) {
      //console.log(getCatList);
      if (getCatList.responseJSON.message.indexOf("token") > -1) {
        //alert("Necessário fazer login!<br>"+data2.responseJSON.message)
        setTimeout(() => {
          localStorage.peregrino =
            location.href.split("/")[location.href.split("/").length - 1];
          location?.replace("/cms-login");
        }, 2000);
      } else {
        ////console.log("Algo saiu errado!<br>"+data2.responseJSON.message)
      }
    },
    complete: function () {
      //console.clear()
    },
  });
}

function continua() {
  try {
    $.ajax({
      type: "POST",
      url: "http://localhost:6060/getCategories",
      headers: {
        "x-access-token": localStorage.token,
      },
      data: {
        affiliate_id: localStorage.AFFILIATE_ID,
        master_id: localStorage.MASTER_ID,
      },
      success: function (categories) {
        try {
          console.log("Categories");
          console.log(categories.results);

          CATEGORIES = categories.results;
          var CATEGORIES_SHOW = [];
          console.log(CATEGORIES);
          var breakPoint = 100,
            count = 0;
          let CAT_CERTAS = [];

          if (CATEGORIES.length > 0 && CATEGORIES[0].product_site_categories) {
            for (const k in CATEGORIES) {
              CATEGORIES[k].product_site_categories =
                CATEGORIES[k].product_site_categories.trim();
            }
            for (const k in CATEGORIES) {
              let exists = CATEGORIES.filter((x) =>
                x.product_site_categories.includes(
                  CATEGORIES[k].product_site_categories
                )
              );
              if (exists && Array.isArray(exists)) {
                let thisCat = null,
                  thisLength = 0;
                for (const a in exists) {
                  if (exists[a].product_site_categories.length > thisLength) {
                    thisCat = exists[a];
                    thisLength = exists[a].product_site_categories.length;
                  }
                }
                if (thisCat) {
                  CAT_CERTAS.push(thisCat);
                }
              } else {
                CAT_CERTAS.push(CATEGORIES[k]);
              }
            }
          }

          var myCategories = getCategorias(CAT_CERTAS);
          MY_CATEGORIES = myCategories;
          console.log("MY_CATEGORIES", MY_CATEGORIES);

          for (const k in myCategories) {
            if (k == 8) {
              $(".listaDeCategorias").append(
                '<br><br><h1 class="hiperTitle">Outras Categorias <span class="hiperTitleSub">(Exibe em "todas as categorias" no menu)</h1><hr>'
              );
            }
            $(".listaDeCategorias").append(
              '<li class="itemSortable2">' +
              getCategorieShow(myCategories[k], Number(k) + 1) +
              "</li>"
            );
          }
          $(".ATIVA_CATEGORIA").click(function (e) {
            e.stopPropagation();
            e.preventDefault();
            ////console.log($(this).find('.ativa-me').attr("checked"))
            if ($(this).find(".ativa-me").attr("checked") == undefined) {
              $(this).find(".ativa-me").attr("checked", "true");
            } else {
              $(this).find(".ativa-me").removeAttr("checked", "true");
            }
          });
          /*
                    $('.ATIVA_SUB_CATEGORIA').click(function(e){
                        e.stopPropagation()
                        e.preventDefault()
                        ////console.log($(this).find('.ativa-me2').attr("checked"))
                        if($(this).find('.ativa-me2').attr("checked") == undefined){
                            $(this).find('.ativa-me2').attr("checked","true")
                        }else{
                            $(this).find('.ativa-me2').removeAttr("checked","true")
                        }
                    })
                    */

          $(".dropCategoriaContent").click(function () {
            if (
              $(this).attr("dropado") == "nao" ||
              $(this).attr("dropado") == undefined
            ) {
              $(this)
                .parent()
                .parent()
                .find(".cabecalho")
                .removeClass("radius20");
              $(this)
                .parent()
                .parent()
                .find(".cabecalho")
                .addClass("radius20Top");
              $(this)
                .parent()
                .parent()
                .find(".cabecalho")
                .addClass("bordaDourada");
              $(".seta").removeClass("rotate180");
              $(this).parent().parent().find(".seta").addClass("rotate180");

              $(this).attr("dropado", "sim");
              $(this).parent().parent().find(".dropCategoria").show();
            } else {
              $(this)
                .parent()
                .parent()
                .find(".cabecalho")
                .removeClass("radius20Top");
              $(this).parent().parent().find(".cabecalho").addClass("radius20");
              $(this)
                .parent()
                .parent()
                .find(".cabecalho")
                .removeClass("bordaDourada");
              $(this).attr("dropado", "nao");
              $(this).parent().parent().find(".dropCategoria").hide();

              $(this).parent().parent().find(".seta").removeClass("rotate180");
            }
          });

          $(".row").children().css("opacity", "1");
          $(".row").removeClass(" bg-gray-400");

          $("#searchCATEGORIES").keyup(function () {
            var searchText = $(this).val().toLowerCase();
            $(".categorie").each(function () {
              var thisText = $(this).text().toLowerCase();
              if (thisText.indexOf(searchText) > -1) {
                $(this).show();
              } else {
                $(this).hide();
              }
            });
          });

          $(".checka").change(function () {
            //////console.log($(this)[0].checked);
            if ($(this)[0].checked) {
              $(this).parent().parent().parent().addClass("selecionado");
            } else {
              $(this).parent().parent().parent().removeClass("selecionado");
            }
          });

          $(".ordena").dblclick(function () {
            reorganiza(
              CATEGORIES_SHOW,
              $(this).attr("field"),
              $(this).attr("sentido")
            );
            $(".ordena").parent().removeClass("selecionado2");
            $(".ordena").removeClass("selecionado2");
            $(this).parent().addClass("selecionado2");

            $(this).addClass("selecionado2");

            if ($(this).attr("sentido") == "ASC") {
              $(this).attr("sentido", "DESC");
            } else {
              $(this).attr("sentido", "ASC");
            }
          });

          $(".duplicate").click(function () {
            var esseHtml2 = $(this).parent().parent().parent().parent();
            var esseHtml = $(this).parent().parent().parent().parent().html();
            var paiDesse = $(this).parent().parent().parent().parent().parent();
            paiDesse.append(esseHtml);
            esseHtml2?.addClass("active");
          });
        } catch (err) {
          console.log("err internal categories get", err);
        }
      },
      error: function (data2) {
        ////console.log('data2 catgo');
        ////console.log(data2);
        try {
          if (data2.responseJSON.message?.indexOf("token") > -1) {
            // alert("Necessário fazer login!<br>"+data2.responseJSON.message)
            setTimeout(() => {
              localStorage.peregrino =
                location.href.split("/")[location.href.split("/").length - 1];
              location?.replace("/cms-login");
            }, 2000);
          } else {
            //console.log("Algo saiu errado!<br>" + data2.responseJSON.message)
          }
        } catch (err) {
          //console.log("erro de error funcion ajax", err)
        }
      },
      complete: function () { },
    });
  } catch (err) {
    //console.log("erro continua 2", err)
  }
}

async function criaNovaCategoria() {
  $.ajax({
    type: "POST",
    url: "http://localhost:6060/maisUmaCategoria",
    headers: {
      "x-access-token": localStorage.token,
    },
    data: {
      master_id: MASTER_ID,
      affiliate_id: AFFILIATE_ID,
    },
    success: async function (resultado) {
      ////console.log(resultado)
      var alvoD = null;
      $(".categorie").each(function () {
        ////console.log($(this).find(".duplicate")[0])
        alvoD = $(this).find(".duplicate")[0];
      });
      alvoD.click();

      var alvoE = null;
      $(".categorie").each(function () {
        ////console.log($(this).find(".CATEGORIA_PRINCIPAL")[0])
        alvoE = $(this).find(".CATEGORIA_PRINCIPAL")[0];
      });
      alvoE.innerText = "EDITE ESTE CAMPO";

      var alvoC = null;
      $(".categorie").each(function () {
        ////console.log($(this).find(".catEdit")[0])
        $(this).find(".CATEGORIA_PRINCIPAL").innerText = "EDITE ESTE CAMPO";
        alvoC = $(this).find(".catEdit")[0];
      });
      updateSequencia("esconder");
      alvoC.click();
    },
    error: function (resultado) {
      ////console.log(resultado);
    },
    complete: function () { },
  });
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

function getCategorias(CATEGORIES) {
  var listaCategoriasPrimarias = [],
    CATEGORIAS_FULL = [];
  var currCategorie = null;

  CATEGORIES = OrdenaJson(CATEGORIES, "title", "ASC");
  for (const k in CATEGORIES) {
    var textou = CATEGORIES[k].product_site_categories;
    if (textou == null || textou == "null") {
      textou = "Novo,";
    }
    if (textou.split(",")[0] != currCategorie) {
      listaCategoriasPrimarias.push({ categoria: textou.split(",")[0] });
    }
    currCategorie = textou.split(",")[0];
  }

  var listaSubCategorias = [];
  for (const k in listaCategoriasPrimarias) {
    var thisCategorieGroup = "";
    for (const s in CATEGORIES) {
      if (CATEGORIES[s].product_site_categories != null) {
        if (
          CATEGORIES[s].product_site_categories.split(",")[0] ==
          listaCategoriasPrimarias[k].categoria
        ) {
          var list = CATEGORIES[s].product_site_categories.split(",");
          for (const l in list) {
            if (thisCategorieGroup.indexOf(list[l]) < 0 && l > 0) {
              thisCategorieGroup += list[l] + ",";
            }
          }
        }
      }
    }
    thisCategorieGroup += "CRIE UMA CATEGORIA";
    thisCategorieGroup = thisCategorieGroup?.replace(",CRIE UMA CATEGORIA", "");

    const exists = CATEGORIAS_FULL.find(
      (x) => x.categoria.trim() === listaCategoriasPrimarias[k].categoria.trim()
    );
    if (exists) {
      if (exists.subCategorias.length < thisCategorieGroup.length) {
        CATEGORIAS_FULL.map((x) => {
          if (
            x.categoria.trim() === listaCategoriasPrimarias[k].categoria.trim()
          ) {
            x.subCategorias = exists.subCategorias;
          }
        });
      }
    } else {
      CATEGORIAS_FULL.push({
        categoria: listaCategoriasPrimarias[k].categoria,
        subCategorias: thisCategorieGroup,
        cat_status: 0,
        sub_status: "[]",
      });
    }
  }
  console.log("CATEGORIAS_FULL", CATEGORIAS_FULL);

  if (MINHAS_CATEGORIAS.length == 0) {
    if (CATEGORIAS_FULL.length == 0) {
    } else {
      setTimeout(() => {
        $("#salvandoAlteracoes").click();
      }, 5000);

      return CATEGORIAS_FULL;
    }
  } else {
    return MINHAS_CATEGORIAS;
  }
}

function infoCategoria_status(categoria) {
  var lis = JSON.parse(localStorage.MINHAS_CATEGORIAS);
  for (const k in lis) {
    if (categoria == lis[k].affiliate_categorie_name) {
      var dev = JSON.parse(ajustStrigfy(lis[k].affiliate_categorie_status));
      if (categoria == "ACOUGUE") {
        //console.log(dev)
      }

      return dev;
    }
  }
}
function infoCategoria_keyWord(categoria) {
  var lis = JSON.parse(localStorage.MINHAS_CATEGORIAS);
  for (const k in lis) {
    if (categoria == lis[k].affiliate_categorie_name) {
      if (
        lis[k].categorie_key_words != undefined &&
        lis[k].categorie_key_words != "undefined" &&
        lis[k].categorie_key_words != null
      ) {
        var dev = lis[k].categorie_key_words;
        if (categoria == "ACOUGUE") {
          //console.log(dev)
        }

        return dev;
      } else {
        return "";
      }
    }
  }
}

// function updateSequencia(mostra1) {
//     var lista = []
//     $(".categorie").each(function () {
//         var principal = $(this).find(".CATEGORIA_PRINCIPAL").text(),
//             esseIcone = $(this).find("img").attr("src"),
//             title = $(this).attr("title"),
//             description = $(this).attr("description"),
//             subs = ''
//         var listaSubCategorias = []
//         $(this).find(".SUB_CATEGORIA").each(function () {
//             ////console.log($(this).parent().parent().find(".ativa-me2"))
//             var status = 0, status2 = $(this).parent().parent().find(".ativa-me2")[0]?.checked
//             if (status2 == false) { status = 0 } else { status = 1 }

//             listaSubCategorias.push({ "subCategoria": $(this).text(), "status": status })
//             subs += $(this).text() + ','
//         });
//         var catStatus = 0, catStatus2 = $(this).parent().find(".ativa-me")[0]?.checked
//         var status1 = infoCategoria_status(principal)
//         if (status1 != undefined) {
//             status1 = JSON.stringify(infoCategoria_status(principal))
//         } else {
//             status1 = JSON.stringify(listaSubCategorias)
//         }

//         console.log("minhas subs",listaSubCategorias)

//         if (catStatus2 == true) { catStatus = 1 } else { catStatus = 0 }
//         lista.push({
//             "categoria": principal, "subCategorias": subs, "categorie_key_words": JSON.stringify(infoCategoria_keyWord(principal)), "cat_status": catStatus, "sub_status": status1,
//             "icone": esseIcone
//         })

//     })
//     ////console.log("nova lsita",lista)
//     $(".cabecalho").addClass("animated-background")

//     $.ajax({
//         type: "POST",
//         url: "http://localhost:6060/updateCategoryList",
//         headers: {
//             "x-access-token": localStorage.token,
//         },
//         data: {
//             "affiliate_id": AFFILIATE_ID,
//             "master_id": MASTER_ID,
//             "categorias": lista

//         },
//         success: function (resultado) {
//             console.log(resultado)
//             ////console.log("Alterações salvas com sucesso!")
//             $(".cabecalho").removeClass("animated-background")

//             if (mostra1 == 'esconder') {

//             } else {
//                 mostra();
//             }

//         },
//         error: function (resultado) {
//             ////console.log(resultado);
//             if (resultado.responseJSON.message.indexOf("token") > -1) {
//                 ////console.log("Necessário fazer login!<br>"+resultado.responseJSON.message)
//                 setTimeout(() => {
//                     localStorage.peregrino = location.href.split("/")[location.href.split("/").length - 1]
//                     location?.replace("/cms-login")
//                 }, 2000)

//             } else {
//                 ////console.log("Algo saiu errado!<br>"+resultado.responseJSON.message)
//             }
//         },
//         complete: function () { },
//     });

// }

async function updateSequencia(mostra1) {
  var lista = [];
  $(".categorie").each(function () {
    var status8 = 0,
      status4 = $(this).find(".CHECK_PRINCIPAL")[0]?.checked;
    // console.log()
    if (status4 == false) {
      status8 = 0;
    } else {
      status8 = 1;
    }

    var principal = $(this).find(".CATEGORIA_PRINCIPAL").text(),
      esseIcone = $(this).find("img").attr("src"),
      title = $(this).attr("title"),
      description = $(this).attr("description"),
      subs = "";
    var listaSubCategorias = [];
    // console.log("estou ativo", status8,$(this).find(".CHECK_PRINCIPAL"))

    let getMyData = null;
    try {
      let DT = JSON.parse(localStorage.MINHAS_CATEGORIAS);
      for (const k in DT) {
        if (DT[k].affiliate_categorie_name === principal) {
          getMyData = {
            categoria: principal,
            subcategorie_banners: DT[k].subcategorie_banners,
            subCategorias: DT[k].subCategorias,
            categorie_key_words: DT[k].categorie_key_words,
            cat_status: status8,
            sub_status: DT[k].affiliate_categorie_status,
            icone: DT[k].categorie_icon,
          };
        }
      }
    } catch (e) { }
    // console.log("getMYdata", getMyData)

    if (getMyData != null) {
      $(this)
        .find(".SUB_CATEGORIA")
        .each(function () {
          var status = 0,
            status2 = $(this).parent().parent().find(".ativa-me2")[0]?.checked;
          if (status2 == false) {
            status = 0;
          } else {
            status = 1;
          }
          listaSubCategorias.push({
            subCategoria: $(this).text(),
            status: status,
          });
          subs += $(this).text() + ",";
        });
      getMyData["sub_status"] = JSON.stringify(listaSubCategorias);
      lista.push(getMyData);
      //  console.log('vou usar getMyData',getMyData)
    } else {
      $(this)
        .find(".SUB_CATEGORIA")
        .each(function () {
          ////console.log($(this).parent().parent().find(".ativa-me2"))
          var status = 0,
            status2 = $(this).parent().parent().find(".ativa-me2")[0]?.checked;
          if (status2 == false) {
            status = 0;
          } else {
            status = 1;
          }

          listaSubCategorias.push({
            subCategoria: $(this).text(),
            status: status,
          });
          subs += $(this).text() + ",";
        });
      var catStatus = 0,
        catStatus2 = $(this).parent().find(".ativa-me")[0]?.checked;
      var status1 = infoCategoria_status(principal);
      //  console.log(principal, status1)
      if (status1 != undefined) {
        status1 = JSON.stringify(infoCategoria_status(principal));
      } else {
        status1 = JSON.stringify(listaSubCategorias);
      }

      // console.log("minhas subs", listaSubCategorias)

      if (catStatus2 == true) {
        catStatus = 1;
      } else {
        catStatus = 0;
      }
      lista.push({
        categoria: principal,
        subcategorie_banners: "{}",
        subCategorias: subs,
        categorie_key_words: JSON.stringify(infoCategoria_keyWord(principal)),
        cat_status: catStatus,
        sub_status: status1,
        icone: esseIcone,
      });
    }
  });
  // console.log("nova lsita", lista)
  $(".cabecalho").addClass("animated-background");

  for (const k in lista) {
    var minhasSubs = [];
    try {
      minhasSubs = JSON.parse(ajustStrigfy(lista[k].sub_status));
    } catch (e) { }
    var myCats = "";
    for (const a in minhasSubs) {
      myCats += minhasSubs[a].subCategoria + ",";
    }
    lista[k]["subCategorias"] = myCats;
  }

  console.log("as sequencias", {
    affiliate_id: AFFILIATE_ID,
    master_id: MASTER_ID,
    categorias: lista,
  });
  $.ajax({
    type: "POST",
    url: "http://localhost:6060/updateCategoryList",
    headers: {
      "x-access-token": localStorage.token,
    },
    data: {
      affiliate_id: AFFILIATE_ID,
      master_id: MASTER_ID,
      categorias: lista,
    },
    success: function (resultado) {
      // console.log(resultado)
      ////console.log("Alterações salvas com sucesso!")
      $(".cabecalho").removeClass("animated-background");

      if (mostra1 == "esconder") {
      } else if (mostra1 == "reload") {
        location.reload();
      } else {
        mostra();
      }
    },
    error: function (resultado) {
      ////console.log(resultado);
      if (resultado.responseJSON.message.indexOf("token") > -1) {
        ////console.log("Necessário fazer login!<br>"+resultado.responseJSON.message)
        setTimeout(() => {
          localStorage.peregrino =
            location.href.split("/")[location.href.split("/").length - 1];
          location?.replace("/cms-login");
        }, 2000);
      } else {
        ////console.log("Algo saiu errado!<br>"+resultado.responseJSON.message)
      }
    },
    complete: function () { },
  });
}

function removeCate(elemento) {
  elemento.parent().parent().parent().remove();
}

function getCategorieShow(dataCategorie, ID) {
  var totalSubCategorias = 0;
  if (dataCategorie.subCategorias != "?") {
    totalSubCategorias = dataCategorie.subCategorias.split(",").length;
  }
  var checkB = "";

  if (dataCategorie.affiliate_sub_categorie_status == 1) {
    checkB = 'checked="checked"';
  }
  if (dataCategorie.cat_status == 1) {
    checkB = 'checked="checked"';
  }
  var icone =
    '<img style="    max-width: 30px !important;" src="images/icons/frutas.png" />';
  if (dataCategorie.categorie_icon != null) {
    icone =
      '<img style="    max-width: 30px !important;" src="' +
      dataCategorie.categorie_icon +
      '" />';
  }

  var html =
    "<div title=\"'" +
    dataCategorie.categorie_title +
    "'\"  description=\"'" +
    dataCategorie.categorie_description +
    '\'"  draggable="true" class="categorie vouClonar">' +
    '<div class="row radius20 cabecalho" style="border: 1px solid #efefef; margin-top: 1%; padding-right: 2%">' +
    '<div style="max-width: 100px; opacity: 1; margin: 1% auto;" class="col-sm dropCategoriaContent">' +
    '<div class="row" style="padding: 5%;">' +
    '<div class="col-sm dropCategoriaContent">' +
    iconGridMini +
    "</div>" +
    '<div class="col-sm posicaoCategoria numberCat">' +
    ID +
    "</div>" +
    "</div>" +
    "</div>" +
    '<div style="max-width: 70px; max-width: 70px; margin: 7px auto;" class="col-sm">' +
    '<div style="max-width: 120px;" class="iconCategorie">' +
    icone +
    //  '<img src="images/icons/frutas.png" />'+
    "</div>" +
    "</div>" +
    '<div class="col-sm"  >' +
    '<label  class="label nomeCategoria CATEGORIA_PRINCIPAL">' +
    dataCategorie.categoria +
    "</label>" +
    "</div>" +
    '<div class="col-sm">' +
    '<label class="label totalSubCategorias">' +
    (totalSubCategorias - 1) +
    " Subcategorias</label>" +
    "</div>" +
    '<div class="col-sm" style="opacity: 1;">' +
    '<div class="row">' +
    '<div class="switch__container ATIVA_CATEGORIA"   style="opacity: 1;margin-top: 5%;"><input ' +
    checkB +
    ' id="switch-shadow0310' +
    ID +
    '" class="switch switch--shadow ativa-me CHECK_PRINCIPAL" type="checkbox"><label for="switch-shadow0310' +
    ID +
    '"></label>' +
    "</div>" +
    '<label  class="label catAtiva">Categoria ativa</label>' +
    "</div>" +
    "</div>" +
    '<div class="col-sm">' +
    '<div onClick="modalEditCategories($(this))" class="input-group catEdit">' +
    '<label style="margin: auto; color: #f6b504">Editar Categoria</label>' +
    "</div>" +
    "</div>" +
    '<div style=" max-width: 70px;" class="col-sm ">' +
    '<div class=" duplicate">' +
    copiar +
    "</div>" +
    "</div>" +
    '<div style=" max-width: 70px;" class="col-sm">' +
    '<div onclick="removeCate($(this))" class=" deleteThis">' +
    '<svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 21 21" style="fill: #f6b504;margin: 9px;">' +
    "&gt;" +
    "<defs></defs>" +
    '<path class="a" d="M10.937,16H3.063A2.208,2.208,0,0,1,.875,13.778V2.666H.438a.444.444,0,0,1,0-.889H4.375V1.334A1.324,1.324,0,0,1,5.687,0H8.313A1.324,1.324,0,0,1,9.625,1.334v.444h3.937a.444.444,0,0,1,0,.889h-.437V13.778A2.208,2.208,0,0,1,10.937,16ZM1.75,2.666V13.778a1.325,1.325,0,0,0,1.313,1.334h7.875a1.325,1.325,0,0,0,1.313-1.334V2.666ZM5.687.889a.441.441,0,0,0-.437.445v.444h3.5V1.334A.441.441,0,0,0,8.313.889Zm3.5,11.556A.442.442,0,0,1,8.75,12V5.778a.437.437,0,1,1,.875,0V12A.441.441,0,0,1,9.188,12.445Zm-4.375,0A.441.441,0,0,1,4.375,12V5.778a.437.437,0,1,1,.875,0V12A.442.442,0,0,1,4.812,12.445Z" transform="translate(4 3)"></path>' +
    "</svg>" +
    "</div>" +
    "</div>" +
    '<div style=" max-width: 70px;" class="col-sm dropCategoriaContent">' +
    '<div class=" deleteThis dropCategoriaButton ">' +
    '<svg class="seta" xmlns="http://www.w3.org/2000/svg" style="fill: #fcfcfd; stroke: silver;" width="36" height="36" viewBox="0 0 36 36">' +
    '<g transform="translate(36 36) rotate(180)">' +
    '<g transform="translate(28 28) rotate(180)">' +
    '<g class="b">' +
    '<g class="c">' +
    '<circle class="e" cx="10" cy="10" r="10" />' +
    '<circle class="f" cx="10" cy="10" r="9.5" />' +
    "</g>" +
    '<path class="d" d="M581.273,789.774a.82.82,0,0,1-.081-1.079l.081-.092,3.685-3.593-3.685-3.593a.82.82,0,0,1-.081-1.079l.081-.093a.849.849,0,0,1,1.094-.081l.094.081,4.279,4.179a.82.82,0,0,1,.081,1.079l-.081.093-4.279,4.179A.849.849,0,0,1,581.273,789.774Z"' +
    ' transform="translate(795.009 -573.615) rotate(90)"/>' +
    "</g>" +
    "</g>" +
    "</g>" +
    "</svg>" +
    "</div>" +
    "</div>" +
    "</div>" +
    '<div class="row radius20Bottom dropCategoria bordaDourada " style=" border: 1px solid #efefef; margin-top: -2px; padding-right: 2%; display:none;    background-color: #f8f9ff; max-height: 80vh">' +
    '<div style="margin-top: 1%;width: 100%" class="row  ">' +
    '<div class="col-md-12">' +
    '<div myCat="' +
    dataCategorie.categoria +
    '" onclick="outraSubCategoria($(this))"   style="    z-index: 999;;cursor:pointer;border-left: 5px dotted silver;margin-left: 7%;cursor: pointer; border-radius: 20px; font: bold 1rem Roboto; background-color: rgb(246, 181, 4); max-width: 200px; height: 40px; border: 2px solid rgb(246, 181, 4); float: left; opacity: 1;" class="input-group outraSubCat">' +
    '<div style="border: none; margin: auto;" class="input-group-append">' +
    '<div style="border: none; margin: auto; padding: 2%;" class="input-group-text">' +
    '<svg xmlns="http://www.w3.org/2000/svg" style="margin: -20% auto 0 0; fill: white;" width="24" height="24" viewBox="0 0 24 24">' +
    "<defs></defs>" +
    '<path class="a" d="M10.5,21A10.5,10.5,0,0,1,3.075,3.075,10.5,10.5,0,1,1,10.5,21Zm0-20A9.5,9.5,0,1,0,20,10.5,9.511,9.511,0,0,0,10.5,1Zm0,14a.5.5,0,0,1-.5-.5V11H6.5a.5.5,0,0,1,0-1H10V6.5a.5.5,0,0,1,1,0V10h3.5a.5.5,0,1,1,0,1H11v3.5A.5.5,0,0,1,10.5,15Z" transform="translate(2 2)"></path>' +
    "</svg>" +
    "</div>" +
    "</div>" +
    '<label style="margin: -1% auto; min-width: 60%; color: white !important; cursor:pointer" class="label">Nova Subcategoria</label>' +
    "</div>" +
    '<div  style="border-left: 5px dotted silver;margin-left: 35px; margin-top: 1%; padding: 1%;    margin-bottom: 15px;" class="col-md-12">' +
    '<h4 class="label" style="text-align: left ;font-size: 20px; margin-left: 1%; " >A ordem abaixo reflete na ordem do menu e na página de categoria</h4>' +
    "</div>" +
    "</div>" +
    '<div class="col-md-12 verticalScroll" style="max-height: 550px;margin-bottom: 20px;opacity: 1;margin-top: -12px;margin-left: 1px;">' +
    '<ul id="sortable" class="listInner3 dropCategoria superSortable">' +
    getSubCategorias(
      dataCategorie.subCategorias,
      dataCategorie.affiliate_categorie_status,
      ID,
      dataCategorie.affiliate_categorie_name
    ) +
    //aqui começa outras radius20

    "</ul>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>";

  $(function () {
    $(".superSortable").sortable({
      placeholder: "ui-state-highlight",
    });
    $(".superSortable").disableSelection();
  });
  return html;
}

function outraSubCategoria(elemento) {
  let categories = JSON.parse(localStorage.MINHAS_CATEGORIAS);
  // console.log("categories 1",categories)
  for (const k in categories) {
    if (categories[k].categoria == elemento.attr("myCat")) {
      let mySubs = JSON.parse(
        ajustStrigfy(categories[k].affiliate_categorie_status)
      );
      //  console.log("mySubs",mySubs)
      mySubs.push({
        subCategoria: "NOVA-CATEGORIA",
        status: 0,
      });

      categories[k].affiliate_categorie_status = JSON.stringify(mySubs);
    }
  }
  // console.log("categories",categories)

  localStorage.MINHAS_CATEGORIAS = JSON.stringify(categories);

  elemento
    .parent()
    .parent()
    .find("#sortable")
    .append(
      `<li draggable="true" class="list-sub-item nova_sub newSub itemSortable ui-sortable-handle" id="NOVA-CATEGORIA_5"><div class="row" style="display: flex;-ms-flex-wrap: wrap;flex-wrap: wrap;margin-right: -15px;margin-left: -15px;"><span class="trilha2" style="opacity: 1;">.....</span><div class="row radius20 subCabecalho" style="margin-left: 0.2%; border: 1px solid rgb(239, 239, 239); margin-top: 1%; padding-right: 15px; min-width: 100%; background: white !important; opacity: 1;"><div style="max-width: 100px; opacity: 1; margin: 1% auto;" class="col-sm dropCategoriaContent"><div class="row" style="padding: 5%;"><div class="col-sm dropCategoriaContent" style="opacity: 1;"><svg class="iconGrid" xmlns="http://www.w3.org/2000/svg" style="fill: #687c97;" width="13.5" height="23" viewBox="0 0 9 16"><defs></defs><path class="a" d="M2.5,16h-1A1.5,1.5,0,0,1,0,14.5v-1A1.5,1.5,0,0,1,1.5,12h1A1.5,1.5,0,0,1,4,13.5v1A1.5,1.5,0,0,1,2.5,16Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1a.5.5,0,0,0,.5-.5v-1a.5.5,0,0,0-.5-.5Zm1-3h-1A1.5,1.5,0,0,1,0,8.5v-1A1.5,1.5,0,0,1,1.5,6h1A1.5,1.5,0,0,1,4,7.5v1A1.5,1.5,0,0,1,2.5,10Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1A.5.5,0,0,0,3,8.5v-1A.5.5,0,0,0,2.5,7Zm1-3h-1A1.5,1.5,0,0,1,0,2.5v-1A1.5,1.5,0,0,1,1.5,0h1A1.5,1.5,0,0,1,4,1.5v1A1.5,1.5,0,0,1,2.5,4Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1A.5.5,0,0,0,3,2.5v-1A.5.5,0,0,0,2.5,1Z"></path><path class="a" d="M2.5,16h-1A1.5,1.5,0,0,1,0,14.5v-1A1.5,1.5,0,0,1,1.5,12h1A1.5,1.5,0,0,1,4,13.5v1A1.5,1.5,0,0,1,2.5,16Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1a.5.5,0,0,0,.5-.5v-1a.5.5,0,0,0-.5-.5Zm1-3h-1A1.5,1.5,0,0,1,0,8.5v-1A1.5,1.5,0,0,1,1.5,6h1A1.5,1.5,0,0,1,4,7.5v1A1.5,1.5,0,0,1,2.5,10Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1A.5.5,0,0,0,3,8.5v-1A.5.5,0,0,0,2.5,7Zm1-3h-1A1.5,1.5,0,0,1,0,2.5v-1A1.5,1.5,0,0,1,1.5,0h1A1.5,1.5,0,0,1,4,1.5v1A1.5,1.5,0,0,1,2.5,4Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1A.5.5,0,0,0,3,2.5v-1A.5.5,0,0,0,2.5,1Z" transform="translate(5)"></path></svg></div><div class="col-sm  numberCat" style="opacity: 1;"><sp class="posicaoSubCategoria">5</sp></div></div></div><div class="col-sm" style="opacity: 1;"><label class="label nomeCategoria SUB_CATEGORIA">NOVA-CATEGORIA</label></div><div class="col-sm opacity0" style="opacity: 1;"><label class="label totalSubCategorias">00 Subcategorias</label></div><div class="col-sm" style="opacity: 1;"><div class="row"><div class="switch__container ATIVA_SUB_CATEGORIA" style="opacity: 1;margin-top: 5%;"><input subcategoria="NOVA-CATEGORIA" categorianame="ALIMENTICIOS" onchange="ativaSubCatInner($(this))" id="switch-shadow01234419${Math.random()}" class="switch switch--shadow ativa-me2" type="checkbox"><label for="switch-shadow01234419"></label></div><label class="label catAtiva" style="opacity: 1;">Subcategoria ativa</label></div></div><div class="col-sm" style="opacity: 1;"><div title="'undefined'" description="'undefined'" smart="'undefined'" maisvendidos="'undefined'" ofertas="'undefined'" personalizada="'undefined'" id="temp_MECLICA" onclick="modalEditSubCategories('NOVA-CATEGORIA', 'ALIMENTICIOS',$(this))" class="input-group catEdit"><label style="margin: auto; color: #f6b504">Editar Subcategoria</label></div></div><div style="max-width: 70px; opacity: 1;" class="col-sm "><div class=" duplicate"><svg xmlns="http://www.w3.org/2000/svg" style=" fill: #f6b504;   margin: 12px;" width="12" height="14" viewBox="0 0 12 14"><path id="duplicate" d="M7.125,14H1.875A1.913,1.913,0,0,1,0,12.055v-7A1.913,1.913,0,0,1,1.875,3.111H3V1.945A1.913,1.913,0,0,1,4.874,0h4.5A.364.364,0,0,1,9.64.114l2.25,2.334a.391.391,0,0,1,.109.3v6.2a1.913,1.913,0,0,1-1.875,1.945H9v1.165A1.913,1.913,0,0,1,7.125,14ZM1.875,3.889A1.148,1.148,0,0,0,.75,5.055v7a1.148,1.148,0,0,0,1.125,1.167h5.25a1.148,1.148,0,0,0,1.124-1.167V10.89H6.374a.389.389,0,0,1,0-.778h3.75a1.148,1.148,0,0,0,1.125-1.167V3.112H9.374A.383.383,0,0,1,9,2.723V.778H4.874A1.148,1.148,0,0,0,3.75,1.945V5.833a.376.376,0,1,1-.751,0V3.889ZM9.749,1.329V2.334h.97ZM3.375,10.112A.365.365,0,0,1,3.109,10a.4.4,0,0,1,0-.55l3.86-4H5.624a.389.389,0,0,1,0-.778h2.25a.382.382,0,0,1,.375.388V7.389a.375.375,0,1,1-.75,0v-1.4L3.64,10A.365.365,0,0,1,3.375,10.112Z" fill="#f6b504"></path></svg></div></div><div style="max-width: 70px; opacity: 1;" class="col-sm"><div onclick="removeCate($(this))" class=" deleteThis"><svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 21 21" style="fill: #f6b504;margin: 9px;">&gt;<defs></defs><path class="a" d="M10.937,16H3.063A2.208,2.208,0,0,1,.875,13.778V2.666H.438a.444.444,0,0,1,0-.889H4.375V1.334A1.324,1.324,0,0,1,5.687,0H8.313A1.324,1.324,0,0,1,9.625,1.334v.444h3.937a.444.444,0,0,1,0,.889h-.437V13.778A2.208,2.208,0,0,1,10.937,16ZM1.75,2.666V13.778a1.325,1.325,0,0,0,1.313,1.334h7.875a1.325,1.325,0,0,0,1.313-1.334V2.666ZM5.687.889a.441.441,0,0,0-.437.445v.444h3.5V1.334A.441.441,0,0,0,8.313.889Zm3.5,11.556A.442.442,0,0,1,8.75,12V5.778a.437.437,0,1,1,.875,0V12A.441.441,0,0,1,9.188,12.445Zm-4.375,0A.441.441,0,0,1,4.375,12V5.778a.437.437,0,1,1,.875,0V12A.442.442,0,0,1,4.812,12.445Z" transform="translate(4 3)"></path></svg></div></div></div></div></li>`
    );
  updateSequencia("esconder");
  // setTimeout(() => {
  //     $("#temp_MECLICA").click()
  // }, 1000);
}

function getSubCategorias(categoriasText, sub_status, ID, categoriaName) {
  ////console.log(sub_status)
  var lista = categoriasText.split(",");
  var html = "";
  for (const k in lista) {
    var checkB = "";
    try {
      if (sub_status != undefined) {
        var confere = JSON.parse(sub_status);
        for (const c in confere) {
          if (confere[c].subCategoria.trim() == lista[k].trim()) {
            if (confere[c].status == 1) {
              checkB = 'checked="checked"';
            }
          }
        }
      }
    } catch (erru) {
      ////console.log(erru)
    }

    if (lista[k] != "" && lista[k].length > 0) {
      html +=
        '<li  draggable="true" class="list-sub-item nova_sub newSub itemSortable" id="' +
        lista[k] +
        "_" +
        (Number(k) + 1) +
        '">' +
        '<div class="row" style="display: flex;-ms-flex-wrap: wrap;flex-wrap: wrap;margin-right: -15px;margin-left: -15px;"><span class="trilha2">.....</span>' +
        '<div class="row radius20 subCabecalho" style="    margin-left: 0.2%;border: 1px solid #efefef; margin-top: 1%; padding-right: 15px; min-width: 100%; background: white !important;">' +
        '<div style="max-width: 100px; opacity: 1; margin: 1% auto;" class="col-sm dropCategoriaContent">' +
        '<div class="row" style="padding: 5%;">' +
        '<div class="col-sm dropCategoriaContent">' +
        '<svg  class="iconGrid" xmlns="http://www.w3.org/2000/svg" style="fill: #687c97;" width="13.5" height="23" viewBox="0 0 9 16">' +
        "<defs></defs>" +
        '<path class="a" d="M2.5,16h-1A1.5,1.5,0,0,1,0,14.5v-1A1.5,1.5,0,0,1,1.5,12h1A1.5,1.5,0,0,1,4,13.5v1A1.5,1.5,0,0,1,2.5,16Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1a.5.5,0,0,0,.5-.5v-1a.5.5,0,0,0-.5-.5Zm1-3h-1A1.5,1.5,0,0,1,0,8.5v-1A1.5,1.5,0,0,1,1.5,6h1A1.5,1.5,0,0,1,4,7.5v1A1.5,1.5,0,0,1,2.5,10Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1A.5.5,0,0,0,3,8.5v-1A.5.5,0,0,0,2.5,7Zm1-3h-1A1.5,1.5,0,0,1,0,2.5v-1A1.5,1.5,0,0,1,1.5,0h1A1.5,1.5,0,0,1,4,1.5v1A1.5,1.5,0,0,1,2.5,4Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1A.5.5,0,0,0,3,2.5v-1A.5.5,0,0,0,2.5,1Z"/>' +
        '<path class="a" d="M2.5,16h-1A1.5,1.5,0,0,1,0,14.5v-1A1.5,1.5,0,0,1,1.5,12h1A1.5,1.5,0,0,1,4,13.5v1A1.5,1.5,0,0,1,2.5,16Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1a.5.5,0,0,0,.5-.5v-1a.5.5,0,0,0-.5-.5Zm1-3h-1A1.5,1.5,0,0,1,0,8.5v-1A1.5,1.5,0,0,1,1.5,6h1A1.5,1.5,0,0,1,4,7.5v1A1.5,1.5,0,0,1,2.5,10Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1A.5.5,0,0,0,3,8.5v-1A.5.5,0,0,0,2.5,7Zm1-3h-1A1.5,1.5,0,0,1,0,2.5v-1A1.5,1.5,0,0,1,1.5,0h1A1.5,1.5,0,0,1,4,1.5v1A1.5,1.5,0,0,1,2.5,4Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1A.5.5,0,0,0,3,2.5v-1A.5.5,0,0,0,2.5,1Z" transform="translate(5)"/>' +
        "</svg>" +
        "</div>" +
        '<div class="col-sm  numberCat"><sp class="posicaoSubCategoria">' +
        (Number(k) + 1) +
        "</sp></div>" +
        "</div>" +
        "</div>" +
        /*
                '<div style="max-width: 70px; max-width: 70px; margin: 7px auto;" class="col-sm">'+
                    '<div style="max-width: 120px;" class="iconCategorie">'+
                        '<img src="images/icons/frutas.png" />'+
                    '</div>'+
                '</div>'+
                */
        '<div class="col-sm"  >' +
        '<label id="' +
        (categoriaName?.replace(/ /g, "_") +
          "_" +
          lista[k]?.replace(/ /g, "_") +
          "_" +
          k) +
        '"  class="label nomeCategoria SUB_CATEGORIA">' +
        lista[k] +
        "</label>" +
        "</div>" +
        '<div class="col-sm opacity0" style="opacity: 0 !important"><label class="label totalSubCategorias">00 Subcategorias</label></div>' +
        '<div class="col-sm" style="opacity: 1;">' +
        '<div class="row">' +
        '<div class="switch__container ATIVA_SUB_CATEGORIA"   style="opacity: 1;margin-top: 5%;"><input subCategoria="' +
        lista[k] +
        '" categoriaName="' +
        categoriaName +
        '" onchange="ativaSubCatInner($(this))" ' +
        checkB +
        ' id="switch-shadow01234' +
        k +
        ID +
        '9" class="switch switch--shadow ativa-me2" type="checkbox"><label for="switch-shadow01234' +
        k +
        ID +
        '9"></label>' +
        "</div>" +
        '<label  class="label catAtiva">Subcategoria ativa</label>' +
        "</div>" +
        "</div>" +
        '<div class="col-sm">' +
        "<div " +
        "title=\"'" +
        atributoSubCat(categoriaName, lista[k], "title") +
        "'\" " +
        "description=\"'" +
        atributoSubCat(categoriaName, lista[k], "description") +
        "'\" " +
        "smart=\"'" +
        atributoSubCat(categoriaName, lista[k], "smart") +
        "'\" " +
        "maisVendidos=\"'" +
        atributoSubCat(categoriaName, lista[k], "maisVendidos") +
        "'\" " +
        "ofertas=\"'" +
        atributoSubCat(categoriaName, lista[k], "ofertas") +
        "'\" " +
        "personalizada=\"'" +
        atributoSubCat(categoriaName, lista[k], "personalizada") +
        "'\" " +
        " onClick=\"modalEditSubCategories('" +
        lista[k] +
        "', '" +
        categoriaName +
        '\',$(this))" class="input-group catEdit">' +
        '<label style="margin: auto; color: #f6b504">Editar Subcategoria</label>' +
        "</div>" +
        "</div>" +
        '<div style=" max-width: 70px;" class="col-sm ">' +
        '<div class=" duplicate">' +
        '<svg  xmlns="http://www.w3.org/2000/svg" style=" fill: #f6b504;   margin: 12px;" width="12" height="14" viewBox="0 0 12 14">' +
        '<path id="duplicate" d="M7.125,14H1.875A1.913,1.913,0,0,1,0,12.055v-7A1.913,1.913,0,0,1,1.875,3.111H3V1.945A1.913,1.913,0,0,1,4.874,0h4.5A.364.364,0,0,1,9.64.114l2.25,2.334a.391.391,0,0,1,.109.3v6.2a1.913,1.913,0,0,1-1.875,1.945H9v1.165A1.913,1.913,0,0,1,7.125,14ZM1.875,3.889A1.148,1.148,0,0,0,.75,5.055v7a1.148,1.148,0,0,0,1.125,1.167h5.25a1.148,1.148,0,0,0,1.124-1.167V10.89H6.374a.389.389,0,0,1,0-.778h3.75a1.148,1.148,0,0,0,1.125-1.167V3.112H9.374A.383.383,0,0,1,9,2.723V.778H4.874A1.148,1.148,0,0,0,3.75,1.945V5.833a.376.376,0,1,1-.751,0V3.889ZM9.749,1.329V2.334h.97ZM3.375,10.112A.365.365,0,0,1,3.109,10a.4.4,0,0,1,0-.55l3.86-4H5.624a.389.389,0,0,1,0-.778h2.25a.382.382,0,0,1,.375.388V7.389a.375.375,0,1,1-.75,0v-1.4L3.64,10A.365.365,0,0,1,3.375,10.112Z" fill="#f6b504"/>' +
        "</svg>" +
        "</div>" +
        "</div>" +
        '<div style=" max-width: 70px;" class="col-sm">' +
        '<div onclick="removeCate($(this))" class=" deleteThis">' +
        '<svg  xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 21 21" style="fill: #f6b504;margin: 9px;">' +
        "&gt;" +
        "<defs></defs>" +
        '<path class="a" d="M10.937,16H3.063A2.208,2.208,0,0,1,.875,13.778V2.666H.438a.444.444,0,0,1,0-.889H4.375V1.334A1.324,1.324,0,0,1,5.687,0H8.313A1.324,1.324,0,0,1,9.625,1.334v.444h3.937a.444.444,0,0,1,0,.889h-.437V13.778A2.208,2.208,0,0,1,10.937,16ZM1.75,2.666V13.778a1.325,1.325,0,0,0,1.313,1.334h7.875a1.325,1.325,0,0,0,1.313-1.334V2.666ZM5.687.889a.441.441,0,0,0-.437.445v.444h3.5V1.334A.441.441,0,0,0,8.313.889Zm3.5,11.556A.442.442,0,0,1,8.75,12V5.778a.437.437,0,1,1,.875,0V12A.441.441,0,0,1,9.188,12.445Zm-4.375,0A.441.441,0,0,1,4.375,12V5.778a.437.437,0,1,1,.875,0V12A.442.442,0,0,1,4.812,12.445Z" transform="translate(4 3)"></path>' +
        "</svg>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</li>";
    }
  }

  return html;
}
// function modalEditCategories(element) {
//   element = element.parent().parent().parent();
//   var categoria = element.find(".CATEGORIA_PRINCIPAL");
//   localStorage.CAT_SUB_EDIT = categoria.text();

//   var active = element.find(".CHECK_PRINCIPAL")[0]?.checked;

//   var iconeElemento = element.find("img");
//   var subCategorias = element.parent().find(".nomeSubCategoria");
//   var listaSubCategorias = [];
//   subCategorias.each(function () {
//     listaSubCategorias.push({ subCategoria: $(this).text() });
//   });
//   var dados = {
//     categoria: categoria.text(),
//     subCategorias: listaSubCategorias,
//   };
//   ////console.log(categoria)
//   var dadosCategoria = [];
//   var list = JSON.parse(localStorage.MINHAS_CATEGORIAS);
//   for (const k in list) {
//     if (categoria.text() == list[k].affiliate_categorie_name) {
//       dadosCategoria = list[k];
//     }
//   }
//   ////console.log(dadosCategoria)
//   var asWords = "";
//   if (
//     dadosCategoria.categorie_key_words != "" &&
//     dadosCategoria.categorie_key_words != undefined &&
//     dadosCategoria.categorie_key_words != null
//   ) {
//     if (dadosCategoria.categorie_key_words != "undefined") {
//       asWords = WordKeys(dadosCategoria.categorie_key_words.split(","));
//     } else {
//       asWords = " ";
//     }
//   }
//   //console.log(dadosCategoria.categorie_key_words)
//   localStorage.PALAVRAS_KEY = dadosCategoria.categorie_key_words;
//   let BANNERS;
//   try {
//     BANNERS = JSON.parse(ajustStrigfy(dadosCategoria?.subcategorie_banners));
//   } catch (e) {
//     BANNERS = dadosCategoria?.subcategorie_banners;
//   }

//   // console.log('BANNERS',BANNERS)

//   var html =
//     '<div style="max-width:100% " class="container">' +
//     '<div class="row" style="max-width: 90%;margin: -11px auto;border-bottom: 2px solid #EDF2F6;margin-bottom: 10px; ">' +
//     '<div content="caracteristicas" class="col-md tabModal tabModalActive">' +
//     '<label class="labelTab"  style="text-align:center">Características</label>' +
//     "</div>" +
//     '<div content="banners" class="col-md tabModal">' +
//     '<label class="labelTab"  style="text-align:center">Banners</label>' +
//     "</div>" +
//     '<div content="icone" class="col-md tabModal">' +
//     '<label class="labelTab"  style="text-align:center">Ícone</label>' +
//     "</div>" +
//     '<div class="col-md">' +
//     '<div onclick="CANCELA_EDIT()" style="cursor:pointer;border-radius: 20px; font: normal normal bold 1rem Roboto; background-color: #ffffff; max-width: 200px; height: 40px; border: 2px solid #f6b504; float: right; margin:5% auto" class="input-group">' +
//     '<label  style="cursor:pointer;margin:-5%  auto;text-align: center;    min-width: 60%;color: #f6b504 !important; font-size: 1.2rem" class="label">Cancelar</label>' +
//     "</div>" +
//     "</div>" +
//     '<div class="col-md ">' +
//     '<div onclick="SALVA_EDIT()" style="cursor:pointer;border-radius: 20px; font: normal normal bold 1rem Roboto; background-color: #f6b504; max-width: 200px; height: 40px; border: 2px solid #f6b504; float: left; margin:5% auto" class="input-group">' +
//     '<label  style="cursor:pointer;margin: -5% auto;text-align: center;    min-width: 60%; color: white !important; font-size: 1.2rem" class="label">Salvar</label>' +
//     "</div>" +
//     "</div>" +
//     "</div>" +
//     '<hr class="baixoCabecalho" style="position: fixed;top: 115px !important;left: 0px !important;width: 100%;box-shadow: 2px 2px 2px silver;"></hr>' +
//     //======================================================ABA DE CARACTERÍSTICAS==================================================================================================================

//     `<div id="banners" style="max-width:90% ; margin-top: 2%; display:none" class="container tabContent">
//         <input onchange="uploadBannerCatMain($(this))" type="file" id="pegaBannerCatMain" style="display:none">
//         <input onchange="uploadBannerCatVerticalMain($(this))" type="file" id="pegaBannerCatVerticalMain" style="display:none">
//             <section class="areaBanner verticalScroll">
//                 <div class="row">
//                     <div style="margin: 1% 2%;" class="switch__container"><input checked="true" id="switch-shadow1777"
//                             class="switch switch--shadow" type="checkbox" /><label style="    margin: 10px 0px 0px 20px;"
//                             for="switch-shadow1777"></label></div>
//                     <label style="font-size: 20px;" class="label">Página de categoria</label>
//                     <p class="txtDescreve">/Formato recomendado: 000px X 000px</p>
//                 </div>
//                 <div alvo="novo" style="cursor:pointer" onclick="alteraBannerCatMain($(this))" class="areaDropDot">
//                     <div class="iconeDrop9">
//                         <svg id="_01_Icons_Line_upload" data-name="01) Icons / Line /  upload"
//                             xmlns="http://www.w3.org/2000/svg" width="25" height="27" viewBox="0 0 25 27">
//                             <path id="upload"
//                                 d="M21.323,27H3.677A3.718,3.718,0,0,1,0,23.25v-4.5A.744.744,0,0,1,.736,18a.744.744,0,0,1,.735.751v4.5A2.231,2.231,0,0,0,3.677,25.5H21.323a2.231,2.231,0,0,0,2.206-2.25v-4.5a.735.735,0,1,1,1.47,0v4.5A3.718,3.718,0,0,1,21.323,27ZM12.5,19.5a.743.743,0,0,1-.735-.749V2.562L7.138,7.282a.729.729,0,0,1-.519.22.719.719,0,0,1-.191-.026.742.742,0,0,1-.52-.531A.758.758,0,0,1,6.1,6.22l5.882-6a.726.726,0,0,1,1.042,0l5.882,6a.758.758,0,0,1,.191.725.742.742,0,0,1-.52.531.72.72,0,0,1-.191.026.729.729,0,0,1-.519-.22L13.235,2.562V18.751A.743.743,0,0,1,12.5,19.5Z"
//                                 fill="#f3b306" />
//                         </svg>
//                     </div>
//                     <p class="descreveDrop">Arraste as imagens aqui</p>
//                     <div style="margin: -90px auto;text-align: center;">
//                         <p class="txtOu9">|<br>ou<br>|</p>
//                     </div>
//                     <div class="btnDrop9">
//                         <p class="txtBtnDrop9">Selecione do seu computador</p>
//                     </div>
//                 </div>
//                 <div class="descBanner8">
//                     Banners ativos
//                     <div class="btnQtdBanner">
//                         <p class="txtQtdBanner listaBannersCatActive">${
//                           getBannerInnerMain(BANNERS?.banners, true).total
//                         }/${
//       BANNERS?.banners?.length ? BANNERS?.banners?.length : 0
//     }</p>
//                     </div>
//                 </div>
//                 <ul id="listaBannersCatActive" style="list-style: none;" class=" superSortable fullSortable ui-sortable">
//                 ${getBannerInnerMain(BANNERS?.banners, true).html}

//                 </ul>

//                 <div class="descBanner8">
//                     Banners desativados
//                     <div class="btnQtdBanner">
//                         <p class="txtQtdBanner listaBannersCatInactive">${
//                           getBannerInnerMain(BANNERS?.banners, false).total
//                         }/${
//       BANNERS?.banners?.length ? BANNERS?.banners?.length : 0
//     }</p>
//                     </div>
//                 </div>
//                 <ul id="listaBannersCatInactive" style="list-style: none;" class=" superSortable fullSortable ui-sortable">
//                 ${getBannerInnerMain(BANNERS?.banners, false).html}

//                 </ul>

//                 <div  style="display:none" class="descBanner8">
//                     Menu de categorias
//                     <div class="btnQtdBanner">
//                         <p class="txtQtdBanner">1/1</p>
//                     </div>
//                 </div>
//                 <div class="descBanner8">
//                     Banner de menu
//                 </div>
//                 <hr/>
//                 <div alvo="novo"  style="cursor:pointer" onclick="alteraBannerCatVerticalMain($(this))" class="areaDropDot">
//                     <div class="iconeDrop9">
//                         <svg id="_01_Icons_Line_upload" data-name="01) Icons / Line /  upload"
//                             xmlns="http://www.w3.org/2000/svg" width="25" height="27" viewBox="0 0 25 27">
//                             <path id="upload"
//                                 d="M21.323,27H3.677A3.718,3.718,0,0,1,0,23.25v-4.5A.744.744,0,0,1,.736,18a.744.744,0,0,1,.735.751v4.5A2.231,2.231,0,0,0,3.677,25.5H21.323a2.231,2.231,0,0,0,2.206-2.25v-4.5a.735.735,0,1,1,1.47,0v4.5A3.718,3.718,0,0,1,21.323,27ZM12.5,19.5a.743.743,0,0,1-.735-.749V2.562L7.138,7.282a.729.729,0,0,1-.519.22.719.719,0,0,1-.191-.026.742.742,0,0,1-.52-.531A.758.758,0,0,1,6.1,6.22l5.882-6a.726.726,0,0,1,1.042,0l5.882,6a.758.758,0,0,1,.191.725.742.742,0,0,1-.52.531.72.72,0,0,1-.191.026.729.729,0,0,1-.519-.22L13.235,2.562V18.751A.743.743,0,0,1,12.5,19.5Z"
//                                 fill="#f3b306" />
//                         </svg>
//                     </div>
//                     <p class="descreveDrop">Arraste as imagens aqui</p>
//                     <div style="margin: -90px auto;text-align: center;">
//                         <p class="txtOu9">|<br>ou<br>|</p>
//                     </div>
//                     <div class="btnDrop9">
//                         <p class="txtBtnDrop9">Selecione do seu computador</p>
//                     </div>
//                 </div>
//                 <div id="bannersVerticais">
//                ${getBannerVerticalMain(BANNERS?.bannersVertical, false).html}
//                  </div>
//             </section>
//         </div>` +
//     //======================================================ABA DE CARACTERÍSTICAS==================================================================================================================
//     '<div id="icone" style="max-width:90% ; margin-top: 5%; display:none"  class="container tabContent">' +
//     '<div class="row">' +
//     '<div style="    overflow: auto;max-height: 75vh;" class="col-md-8">' +
//     '<h3 class="tituloIcone">Ícones Smartcomerci</h3>' +
//     '<div class="row">' +
//     '<div  sugestao="todos" class="categoriaIcone">' +
//     '<label onclick="labelIcones($(this))" class="labelIcones labelIconesActive">Todos</label>' +
//     "</div>" +
//     '<div sugestao="frutas" class="categoriaIcone">' +
//     '<label onclick="labelIcones($(this))" class="labelIcones" >Frutas</label>' +
//     "</div>" +
//     '<div sugestao="acougue" class="categoriaIcone">' +
//     '<label onclick="labelIcones($(this))" class="labelIcones" >Açougue</label>' +
//     "</div>" +
//     '<div sugestao="padaria" class="categoriaIcone">' +
//     '<label onclick="labelIcones($(this))" class="labelIcones" >Padaria</label>' +
//     "</div>" +
//     '<div sugestao="outros" class="categoriaIcone">' +
//     '<label onclick="labelIcones($(this))" class="labelIcones" >Outros</label>' +
//     "</div>" +
//     "</div>" +
//     '<div  style="margin-top: 3%;" class="row">' +
//     iconesSmartCommerci(categoria.text()) +
//     "</div><br><hr>" +
//     '<h3 class="tituloIcone">Todos os ícones disponíveis</h3>' +
//     '<div  style="margin-top: 3%;" class="row iconesClientes">' +
//     iconesSmartCommerci2(categoria.text()) +
//     "</div>" +
//     "</div>" +
//     '<div class="col-md-4 areaDropIcon">' +
//     '<h3 class="tituloIcone">Suba seu próprio ícone</h3>' +
//     '<h5 class="subTitleIcons">Formato recomendado:<br> SVG ou PNG 50px X 50px</h5>' +
//     '<div style="margin: auto 0 !important;" class="col-md-8 areaDrop">' +
//     '<img onclick="uploadIcone()" class="imageThumb" src="images/products/upload.svg" />' +
//     '<h3 class="arraste">Arraste o ícone aqui</h3>' +
//     '<h3 class="ou">-ou-</h3>' +
//     '<div  onclick="uploadIcone()" class="input-group btnDropPC2"><label class="label">Selecione do seu computador</label></div>' +
//     '</div><input class="upIcon" id="upIcon" style="display:none" type="file">' +
//     "</div>" +
//     "</div>" +
//     "</div>" +
//     //======================================================ABA DE PROMOÇÕES==================================================================================================================
//     '<div id="caracteristicas" style="max-width:70% ; height: 75vh; margin-top: 2%"  class="container tabContent verticalScroll notScroll">' +
//     '<div  class="col-md-12 " style="margin-top: 3% !important; background: white !important">' +
//     '<div style="padding:0 2%; margin-top: 2%; border: none !important" class="row">' +
//     '<div style="margin: 18px 2%;" class="switch__container">' +
//     "<input " +
//     (active ? 'checked="true"' : "") +
//     ' id="switch-shadow18" class="switch switch--shadow" type="checkbox" />' +
//     '<label for="switch-shadow18"></label>' +
//     "</div>" +
//     '<label style=" font-size: 20px;" class="label">Categoria ativa</label> ' +
//     "</div>" +
//     '<div style="padding:0 2%" class="row">' +
//     '<div class="col-md-12">' +
//     '<label style=" font-size: 20px;" class="label">Nome da categoria</label><br> ' +
//     "</div>" +
//     "</div>" +
//     '<div style="padding:0 2%" class="row">' +
//     '<div class="col-md-12">' +
//     '<div class="group-input2"  style="background: #F0F0F0 0% 0% no-repeat padding-box;border: 1px solid #EFEFEF;border-radius: 5px;"><input  style="background: none" class="form-control inputProduct"  fieldName="affiliate_categorie_name"  onchange="fila($(this), \'' +
//     categoria.text() +
//     '\',\'updateCategoriaDetalhe\')" placeholder="Produtos relacionados" id="' +
//     aleatoryID() +
//     '" value="' +
//     categoria.text() +
//     '"></div><br> ' +
//     "</div>" +
//     "</div><br><hr><br>" +
//     '<div style="padding:0 2%" class="row">' +
//     '<div class="col-md-12">' +
//     '<h3 style=" font-size: 20px;" class="SEO">SEO</h3><br> ' +
//     "</div>" +
//     "</div>" +
//     '<div style="padding:0 2%;    margin-top: -3%;" class="row">' +
//     '<div class="col-md-12 container">' +
//     '<label style=" font-size: 20px;" class="label labelContent">Você pode preencher os campos relacionados ao SEO e ajudar no resultado das buscas realizadas no Google, Bing, Yahoo, entre outros.</label><br> ' +
//     "</div>" +
//     "</div><br><br>" +
//     '<div style="padding:0 2%" class="row">' +
//     '<div class="col-md-12">' +
//     '<label style=" font-size: 20px;" class="label">Título da categoria (meta title)</label><br> ' +
//     "</div>" +
//     "</div>" +
//     '<div style="padding:0 2%" class="row">' +
//     '<div class="col-md-12">' +
//     '<div class="group-input2"  style="background: #F0F0F0 0% 0% no-repeat padding-box;border: 1px solid #EFEFEF;border-radius: 5px;"><input fieldName="categorie_title" onchange="fila($(this), \'' +
//     categoria.text() +
//     "', 'updateCategoriaDetalhe')\" value=\"" +
//     dadosCategoria.categorie_title +
//     '" style="background: none" class="form-control inputProduct" placeholder="No Kalimera você encontra tudo em frutas"  id="' +
//     aleatoryID() +
//     '" ></div><br> ' +
//     "</div>" +
//     "</div><br><br>" +
//     '<div style="padding:0 2%" class="row">' +
//     '<div class="col-md-12">' +
//     '<label style=" font-size: 20px;" class="label">Descrição completa (meta description)</label><br> ' +
//     "</div>" +
//     "</div>" +
//     '<div style="padding:0 2%" class="row">' +
//     '<div class="col-md-12">' +
//     '<div class="group-input2"  style="padding: 1%;background: #F0F0F0 0% 0% no-repeat padding-box;border: 1px solid #EFEFEF;border-radius: 5px;"><textarea fieldName="categorie_description"  id="' +
//     aleatoryID() +
//     '" onchange="fila($(this), \'' +
//     categoria.text() +
//     "','updateCategoriaDetalhe')\" value=\"" +
//     dadosCategoria.categorie_description +
//     '" placeholder="Frutas no Kalimera. Compre online, limão, tangerina, kiwi e muitas outras frutas com os melhores preços e fretegratis."  style="background: #EFEFEF; border:none; font-size: 1.3rem; max-height: 100%" rows="3"   class="form-control">' +
//     dadosCategoria.categorie_description +
//     "</textarea>" +
//     "</div>" +
//     "</div>" +
//     "</div><br><br>" +
//     '<div style="padding:0 2%" class="row">' +
//     '<div class="col-md-12">' +
//     '<label style=" font-size: 20px;" class="label">Palavras Chaves (meta keywords)</label><br> ' +
//     "</div>" +
//     "</div>" +
//     '<div style="padding:0 2%" class="row">' +
//     '<div class="col-md-12">' +
//     '<div class="listaPalavrasKey  notScroll verticalScroll contentEditable="true" placeholder="digite aqui e aperte enter..." class="group-input2"  style="padding: 1%;background: #F0F0F0 0% 0% no-repeat padding-box;border: 1px solid #EFEFEF;border-radius: 5px; min-height: 150px !important;">' +
//     '<div><input categorie_name="' +
//     categoria.text() +
//     '" type="text" fieldName="categorie_key_words" container="listaPalavrasKey" onkeydown="addWordKey($(this), this)" class="form-control entraPalavra" placeholder="Digite sua palavra aqui e pressione enter..." style="border: none; font-size: 1.3rem;height: auto; width: 90%;"/></div>' +
//     asWords +
//     "</div>" +
//     "</div>" +
//     "</div>" +
//     "</div>" +
//     "</div>" +
//     "</div>";

//   bootbox.alert({
//     message: html,
//     onShow: function () {
//       $(".tabModal").click(function () {
//         $(".tabModal").removeClass("tabModalActive");
//         $(this).addClass("tabModalActive");
//         $(".tabContent").hide();
//         //////console.log("#" + $(this).attr("content"));
//         $("#" + $(this).attr("content")).fadeIn();
//       });
//       $(".categoriaIcone").click(function () {
//         var sugestao = $(this).attr("sugestao");
//         $(".boxIconDefault").each(function () {
//           if ($(this).attr("dica") == sugestao) {
//             $(this).show();
//           } else {
//             $(this).hide();
//           }
//         });
//         if (sugestao == "todos") {
//           $(".boxIconDefault").show();
//         }
//       });
//       $("#upIcon").change(function () {
//         ////console.log("peguei")
//         sobeIcone($("#upIcon"));
//       });

//       $(".fa-times-circle").click(function () {
//         $(this).parent().parent().remove();
//       });

//       $(".hiperTitle").each(function () {
//         $(this).removeClass("ui-sortable-handle");
//       });
//     },
//     callback: function () {
//       sessionStorage.PALAVRAS_KEY = "";
//     },
//   });
//   $(".modal-footer").hide();
// }
// function modalEditSubCategories(subCategoria, categoria, element) {
//   let textElement = element.parent().parent().find(".SUB_CATEGORIA");

//   var dataSubCategoria = [],
//     todasCategorias = [];
//   if (
//     localStorage.MINHAS_CATEGORIAS != undefined &&
//     localStorage.MINHAS_CATEGORIAS != null &&
//     localStorage.MINHAS_CATEGORIAS != "null" &&
//     localStorage.MINHAS_CATEGORIAS != ""
//   ) {
//     todasCategorias = JSON.parse(localStorage.MINHAS_CATEGORIAS);
//     for (const k in todasCategorias) {
//       if (todasCategorias[k].affiliate_categorie_name == categoria) {
//         dataSubCategoria = todasCategorias[k];
//       }
//     }
//   }
//   ////
//   //console.log("data sub",dataSubCategoria)

//   var status = [],
//     essaSubCat = [];
//   try {
//     status = JSON.parse(
//       ajustStrigfy(dataSubCategoria.affiliate_categorie_status)
//     );
//   } catch (e) {}
//   for (const k in status) {
//     if (status[k].subCategoria == subCategoria) {
//       essaSubCat = status[k];
//     }
//   }

//   if (essaSubCat.length == 0) {
//     essaSubCat = { subCategoria: subCategoria, status: 0 };
//   }

//   if (essaSubCat.key_words == undefined) {
//     localStorage.PALAVRAS_KEY = "null";
//   }

//   localStorage.SUB_EDIT = JSON.stringify(status);

//   var smart = element.attr("smart"),
//     ofertas = element.attr("ofertas"),
//     title = element.attr("title"),
//     description = element.attr("description"),
//     key_words = element.attr("key_words"),
//     maisVendidos = element.attr("maisVendidos"),
//     personalizada = element.attr("personalizada");
//   if (element.attr("title") == "undefined") {
//     title = "";
//   }
//   if (element.attr("smart") == "undefined") {
//     smart = 0;
//   }
//   if (element.attr("description") == "undefined") {
//     description = "";
//   }
//   if (element.attr("key_words") == "undefined") {
//     key_words = "";
//   }
//   if (element.attr("maisVendidos") == "undefined") {
//     maisVendidos = 0;
//   }
//   if (element.attr("ofertas") == "undefined") {
//     ofertas = 0;
//   }
//   if (element.attr("personalizada") == "undefined") {
//     personalizada = 0;
//   }

//   if (Number(ofertas) == 1) {
//     ofertas = ' checked="true"';
//   }
//   if (Number(personalizada) == 1) {
//     personalizada = ' checked="true"';
//   }
//   if (Number(smart) == 1) {
//     smart = ' checked="true"';
//   }
//   if (Number(maisVendidos) == 1) {
//     maisVendidos = ' checked="true"';
//   }

//   localStorage.SUB_CAT_ATUAL = essaSubCat.subCategoria;
//   localStorage.SUB_CAT_ATUAL_STATUS = essaSubCat.status;
//   var activeOrNot = " ";
//   if (essaSubCat.status == 1) {
//     activeOrNot = ' checked="true" ';
//   }
//   //console.log(key_words)
//   //console.log("essaSubCat")
//   //console.log(essaSubCat)

//   if (
//     essaSubCat.key_words == undefined ||
//     essaSubCat.key_words == null ||
//     essaSubCat.key_words == ""
//   ) {
//     key_words = [];
//   } else {
//     key_words = essaSubCat.key_words.split(",");
//   }
//   //console.log("key words")
//   //console.log(key_words)
//   localStorage.PALAVRAS_KEY = essaSubCat.key_words;

//   var html =
//     '<div style="max-width:100% " class="container">' +
//     '<div class="row" style="box-shadow: 0px 3px 5px #6A6A6A08; max-width: 90%; margin:auto  ;   border-bottom: 2px solid #EDF2F6; ">' +
//     '<div content="caracteristicas" class="col-md tabModal tabModalActive">' +
//     '<label class="labelTab"  style="text-align:center">Características</label>' +
//     "</div>" +
//     '<div content="banners" class="col-md tabModal">' +
//     '<label class="labelTab"  style="text-align:center">Banners</label>' +
//     "</div>" +
//     '<div content="priorizacao" class="col-md tabModal">' +
//     '<label class="labelTab"  style="text-align:center">Priorização</label>' +
//     "</div>" +
//     '<div class="col-md">' +
//     '<div onclick="CANCELA_EDIT()" style="cursor:pointer;border-radius: 20px; font: normal normal bold 1rem Roboto; background-color: #ffffff; max-width: 200px; height: 40px; border: 2px solid #f6b504; float: right; margin:10% auto" class="input-group">' +
//     '<label  style="cursor:pointer;margin:-5%  auto;text-align: center;    min-width: 60%;color: #f6b504 !important; font-size: 1.2rem" class="label">Cancelar</label>' +
//     "</div>" +
//     "</div>" +
//     '<div class="col-md ">' +
//     '<div onclick="salvaModalSubCategoria()" style="cursor:pointer;border-radius: 20px; font: normal normal bold 1rem Roboto; background-color: #f6b504; max-width: 200px; height: 40px; border: 2px solid #f6b504; float: left; margin:10% auto" class="input-group">' +
//     '<label  style="cursor:pointer;margin: -5% auto;text-align: center;    min-width: 60%; color: white !important; font-size: 1.2rem" class="label">Salvar</label>' +
//     "</div>" +
//     "</div>" +
//     "</div>" +
//     //======================================================ABA DE BANNERS==================================================================================================================

//     `<div id="banners" style="max-width:90% ; margin-top: 2%; display:none" class="container tabContent">
//         <input onchange="uploadBannerCat($(this))" type="file" id="pegaBannerCat" style="display:none">
//         <input onchange="uploadBannerCatVertical($(this))" type="file" id="pegaBannerCatVertical" style="display:none">
//             <section class="areaBanner verticalScroll">
//                 <div class="row">
//                     <div style="margin: 1% 2%;" class="switch__container"><input id="switch-shadow1777"
//                             class="switch switch--shadow" type="checkbox" /><label style="    margin: 10px 0px 0px 20px;"
//                             for="switch-shadow1777"></label></div>
//                     <label style="font-size: 20px;" class="label">Página de categoria</label>
//                     <p class="txtDescreve">/Formato recomendado: 000px X 000px</p>
//                 </div>
//                 <div alvo="novo" style="cursor:pointer" onclick="alteraBannerCat($(this))" class="areaDropDot">
//                     <div class="iconeDrop9">
//                         <svg id="_01_Icons_Line_upload" data-name="01) Icons / Line /  upload"
//                             xmlns="http://www.w3.org/2000/svg" width="25" height="27" viewBox="0 0 25 27">
//                             <path id="upload"
//                                 d="M21.323,27H3.677A3.718,3.718,0,0,1,0,23.25v-4.5A.744.744,0,0,1,.736,18a.744.744,0,0,1,.735.751v4.5A2.231,2.231,0,0,0,3.677,25.5H21.323a2.231,2.231,0,0,0,2.206-2.25v-4.5a.735.735,0,1,1,1.47,0v4.5A3.718,3.718,0,0,1,21.323,27ZM12.5,19.5a.743.743,0,0,1-.735-.749V2.562L7.138,7.282a.729.729,0,0,1-.519.22.719.719,0,0,1-.191-.026.742.742,0,0,1-.52-.531A.758.758,0,0,1,6.1,6.22l5.882-6a.726.726,0,0,1,1.042,0l5.882,6a.758.758,0,0,1,.191.725.742.742,0,0,1-.52.531.72.72,0,0,1-.191.026.729.729,0,0,1-.519-.22L13.235,2.562V18.751A.743.743,0,0,1,12.5,19.5Z"
//                                 fill="#f3b306" />
//                         </svg>
//                     </div>
//                     <p class="descreveDrop">Arraste as imagens aqui</p>
//                     <div style="margin: -90px auto;text-align: center;">
//                         <p class="txtOu9">|<br>ou<br>|</p>
//                     </div>
//                     <div class="btnDrop9">
//                         <p class="txtBtnDrop9">Selecione do seu computador</p>
//                     </div>
//                 </div>
//                 <div class="descBanner8">
//                     Banners ativos
//                     <div class="btnQtdBanner">
//                         <p class="txtQtdBanner listaBannersCatActive">${
//                           getBannerInner(essaSubCat?.banners, true).total
//                         }/${
//       essaSubCat?.banners?.length ? essaSubCat?.banners?.length : 0
//     }</p>
//                     </div>
//                 </div>
//                 <ul id="listaBannersCatActive" style="list-style: none;" class=" superSortable fullSortable ui-sortable">
//                 ${getBannerInner(essaSubCat?.banners, true).html}

//                 </ul>

//                 <div class="descBanner8">
//                     Banners desativados
//                     <div class="btnQtdBanner">
//                         <p class="txtQtdBanner listaBannersCatInactive">${
//                           getBannerInner(essaSubCat?.banners, false).total
//                         }/${
//       essaSubCat?.banners?.length ? essaSubCat?.banners?.length : 0
//     }</p>
//                     </div>
//                 </div>
//                 <ul id="listaBannersCatInactive" style="list-style: none;" class=" superSortable fullSortable ui-sortable">
//                 ${getBannerInner(essaSubCat?.banners, false).html}

//                 </ul>

//                 <div  style="display:none" class="descBanner8">
//                     Menu de categorias
//                     <div class="btnQtdBanner">
//                         <p class="txtQtdBanner">1/1</p>
//                     </div>
//                 </div>
//                 <div class="descBanner8">
//                     Banner de menu
//                 </div>
//                 <hr/>
//                 <div alvo="novo"  style="cursor:pointer" onclick="alteraBannerCatVertical($(this))" class="areaDropDot">
//                     <div class="iconeDrop9">
//                         <svg id="_01_Icons_Line_upload" data-name="01) Icons / Line /  upload"
//                             xmlns="http://www.w3.org/2000/svg" width="25" height="27" viewBox="0 0 25 27">
//                             <path id="upload"
//                                 d="M21.323,27H3.677A3.718,3.718,0,0,1,0,23.25v-4.5A.744.744,0,0,1,.736,18a.744.744,0,0,1,.735.751v4.5A2.231,2.231,0,0,0,3.677,25.5H21.323a2.231,2.231,0,0,0,2.206-2.25v-4.5a.735.735,0,1,1,1.47,0v4.5A3.718,3.718,0,0,1,21.323,27ZM12.5,19.5a.743.743,0,0,1-.735-.749V2.562L7.138,7.282a.729.729,0,0,1-.519.22.719.719,0,0,1-.191-.026.742.742,0,0,1-.52-.531A.758.758,0,0,1,6.1,6.22l5.882-6a.726.726,0,0,1,1.042,0l5.882,6a.758.758,0,0,1,.191.725.742.742,0,0,1-.52.531.72.72,0,0,1-.191.026.729.729,0,0,1-.519-.22L13.235,2.562V18.751A.743.743,0,0,1,12.5,19.5Z"
//                                 fill="#f3b306" />
//                         </svg>
//                     </div>
//                     <p class="descreveDrop">Arraste as imagens aqui</p>
//                     <div style="margin: -90px auto;text-align: center;">
//                         <p class="txtOu9">|<br>ou<br>|</p>
//                     </div>
//                     <div class="btnDrop9">
//                         <p class="txtBtnDrop9">Selecione do seu computador</p>
//                     </div>
//                 </div>
//                 <div id="bannersVerticais">
//                ${getBannerVertical(essaSubCat?.bannersVertical, false).html}
//                  </div>
//             </section>
//         </div>` +
//     //======================================================ABA DE CARACTERÍSTICAS==================================================================================================================
//     //======================================================ABA DE PRIORIZACAO==================================================================================================================
//     '<div id="priorizacao" style="max-width:90% ; margin-top: 2%;height: 75vh; display:none"  class="container tabContent  verticalScroll notScroll">' +
//     '<div style="margin-top: 3% !important;" class="col-md-12 grupo">' +
//     '<div style="padding: 0 2%; margin-top: 2%;" class="row">' +
//     '<div style="margin: 1% 2%;" class="switch__container"><input fieldName="smart" subCategorieName="\'' +
//     subCategoria +
//     '\'" onchange="setSubCatAtt($(this))" ' +
//     smart +
//     ' id="switch-shadow1988" class="switch switch--shadow" type="checkbox" /><label for="switch-shadow1988"></label></div>' +
//     '<label style="font-size: 20px;" class="label">Smart</label>' +
//     "</div>" +
//     '<div style="padding: 0 2%;" class="row">' +
//     '<div class="col-md-10 container"><label style="font-size: 20px;" class="label labelContent">Os produtos serão priorizados com base no consumidor. A plataforma irá exibir os produtos que mais fazem sentido com os hábitos de cada cliente. Cada página será única.</label><br /></div>' +
//     "</div>" +
//     "</div>" +
//     '<div style="margin-top: 3% !important;" class="col-md-12 grupo">' +
//     '<div style="padding: 0 2%; margin-top: 2%;" class="row">' +
//     '<div style="margin: 1% 2%;" class="switch__container"><input fieldName="maisVendidos"  subCategorieName="\'' +
//     subCategoria +
//     '\'" onchange="setSubCatAtt($(this))" ' +
//     maisVendidos +
//     ' id="switch-shadow1999" class="switch switch--shadow" type="checkbox" /><label for="switch-shadow1999"></label></div>' +
//     '<label style="font-size: 20px;" class="label">Produtos mais vendidos da subcategoria</label>' +
//     "</div>" +
//     '<div style="padding: 0 2%;" class="row">' +
//     '<div class="col-md-10 container"><label style="font-size: 20px;" class="label labelContent">Os produtos mais vendidos em estoque serão priorizados na classificação na página de categoria e subcategoria.</label><br /></div>' +
//     "</div>" +
//     "</div>" +
//     '<div style="margin-top: 3% !important;" class="col-md-12 grupo">' +
//     '<div style="padding: 0 2%; margin-top: 2%;" class="row">' +
//     '<div style="margin: 1% 2%;" class="switch__container"><input fieldName="ofertas" subCategorieName="\'' +
//     subCategoria +
//     '\'" onchange="setSubCatAtt($(this))" ' +
//     ofertas +
//     ' id="switch-shadow1900" class="switch switch--shadow" type="checkbox" /><label for="switch-shadow1900"></label></div>' +
//     '<label style="font-size: 20px;" class="label">Ofertas da subcategoria</label>' +
//     "</div>" +
//     '<div style="padding: 0 2%;" class="row">' +
//     '<div class="col-md-10 container"><label style="font-size: 20px;" class="label labelContent">Os produtos com desconto ativo serão priorizados. Os produtos mais vendidos em ofertas serão priorizados na página de categoria e subcategoria. Os produtos sem oferta, irão aparecer em seguida.</label><br /></div>' +
//     "</div>" +
//     "</div>" +
//     "<hr>" +
//     '<div style="margin-top: 3% !important;" class="col-md-12 grupo">' +
//     '<div style="padding: 0 2%; margin-top: 2%;" class="row">' +
//     '<div style="margin: 1% 2%;" class="switch__container"><input fieldName="personalizada" subCategorieName="\'' +
//     subCategoria +
//     '\'" onchange="setSubCatAtt($(this))" ' +
//     personalizada +
//     ' id="switch-shadow1944" class="switch switch--shadow" type="checkbox" /><label for="switch-shadow1944"></label></div>' +
//     '<label style="font-size: 20px;" class="label">Priorização personalizada</label>' +
//     "</div>" +
//     '<div style="padding: 0 2%;" class="row">' +
//     '<div class="col-md-10 container"><label style="font-size: 20px;" class="label labelContent">Escolha produtos específicos e a ordem para aparecerem na página de categoria e subcategoria. Após os produtos Selecionados, serão exibidos os produtos pelo tipo de priorização.</label><br /></div>' +
//     "</div>" +
//     "</div>" +
//     "</div>" +
//     //======================================================ABA DE PROMOÇÕES==================================================================================================================
//     '<div id="caracteristicas" style="max-width:70% ; height: 75vh; margin-top: 2%"  class="container tabContent verticalScroll notScroll">' +
//     '<div  class="col-md-12 " style="margin-top: 3% !important; background: white !important">' +
//     '<div style="padding:0 2%; margin-top: 2%; border: none !important" class="row">' +
//     '<div style="margin: 1% 2%;" class="switch__container">' +
//     "<input  " +
//     activeOrNot +
//     '   fieldName="status"  subCategorieName="\'' +
//     subCategoria +
//     '\'" onchange="setSubCatAtt($(this))" id="switch-shadow18" class="switch switch--shadow" type="checkbox" />' +
//     '<label for="switch-shadow18"></label>' +
//     "</div>" +
//     '<label style=" font-size: 20px;" class="label">Subcategoria Ativa</label> ' +
//     "</div>" +
//     '<div style="padding:0 2%" class="row">' +
//     '<div class="col-md-12">' +
//     '<label style=" font-size: 20px;" class="label">Nome da categoria</label><br> ' +
//     "</div>" +
//     "</div>" +
//     '<div style="padding:0 2%" class="row">' +
//     '<div class="col-md-12">' +
//     '<div class="group-input2"  style="background: #F0F0F0 0% 0% no-repeat padding-box;border: 1px solid #EFEFEF;border-radius: 5px;"><input  style="background: none" class="form-control inputProduct" placeholder="Produtos relacionados" id="nomeCategoria" idParent="' +
//     textElement.attr("id") +
//     '"  fieldName="subCategoria" subCategorieName="\'' +
//     subCategoria +
//     '\'" onchange="setSubCatAtt($(this))" value="' +
//     subCategoria +
//     '"></div><br> ' +
//     "</div>" +
//     "</div><br><hr><br>" +
//     '<div style="padding:0 2%" class="row">' +
//     '<div class="col-md-12">' +
//     '<h3 style=" font-size: 20px;" class="SEO">SEO</h3><br> ' +
//     "</div>" +
//     "</div>" +
//     '<div style="padding:0 2%;    margin-top: -3%;" class="row">' +
//     '<div class="col-md-12 container">' +
//     '<label style=" font-size: 20px;" class="label labelContent">Você pode preencher os campos relacionados ao SEO e ajudar no resultado das buscas realizadas no Google, Bing, Yahoo, entre outros.</label><br> ' +
//     "</div>" +
//     "</div><br><br>" +
//     '<div style="padding:0 2%" class="row">' +
//     '<div class="col-md-12">' +
//     '<label style=" font-size: 20px;" class="label">Título da categoria (meta title)</label><br> ' +
//     "</div>" +
//     "</div>" +
//     '<div style="padding:0 2%" class="row">' +
//     '<div class="col-md-12">' +
//     '<div class="group-input2"  style="background: #F0F0F0 0% 0% no-repeat padding-box;border: 1px solid #EFEFEF;border-radius: 5px;"><input value="' +
//     title +
//     '"   fieldName="title" subCategorieName="\'' +
//     subCategoria +
//     '\'" onchange="setSubCatAtt($(this))"  style="background: none" class="form-control inputProduct" placeholder="No Kalimera você encontra tudo em frutas" id="' +
//     aleatoryID() +
//     '" ></div><br> ' +
//     "</div>" +
//     "</div><br><br>" +
//     '<div style="padding:0 2%" class="row">' +
//     '<div class="col-md-12">' +
//     '<label style=" font-size: 20px;" class="label">Descrição completa (meta description)</label><br> ' +
//     "</div>" +
//     "</div>" +
//     '<div style="padding:0 2%" class="row">' +
//     '<div class="col-md-12">' +
//     '<div class="group-input2"  style="padding: 1%;background: #F0F0F0 0% 0% no-repeat padding-box;border: 1px solid #EFEFEF;border-radius: 5px;"><textarea  fieldName="description" subCategorieName="\'' +
//     subCategoria +
//     '\'" onchange="setSubCatAtt($(this))" placeholder="Frutas no Kalimera. Compre online, limão, tangerina, kiwi e muitas outras frutas com os melhores preços e fretegratis."  style="background: #EFEFEF; border:none; font-size: 1.3rem; max-height: 100%" rows="3"   class="form-control">' +
//     description +
//     "</textarea>" +
//     "</div>" +
//     "</div>" +
//     "</div><br><br>" +
//     '<div style="padding:0 2%" class="row">' +
//     '<div class="col-md-12">' +
//     '<label style=" font-size: 20px;" class="label">Palavras Chaves (meta keywords)</label><br> ' +
//     "</div>" +
//     "</div>" +
//     '<div style="padding:0 2%" class="row">' +
//     '<div class="col-md-12">' +
//     '<div class="listaPalavrasKey  notScroll verticalScroll" contentEditable="true" placeholder="digite aqui e aperte enter..." class="group-input2"  style="padding: 1%;background: #F0F0F0 0% 0% no-repeat padding-box;border: 1px solid #EFEFEF;border-radius: 5px; min-height: 150px !important;">' +
//     '<div><input categorie_name="' +
//     subCategoria +
//     '" container="listaPalavrasKey"  fieldName="key_words" onkeydown="addWordKey2($(this),this)" type="text" class="form-control entraPalavra" placeholder="Digite sua palavra aqui e pressione enter..." style="border: none; font-size: 1.3rem;height: auto; width: 90%;"/></div>' +
//     WordKeys2(key_words) +
//     "</div>" +
//     "</div>" +
//     "</div>" +
//     "</div>" +
//     "</div>" +
//     "</div>";

//   bootbox.alert({
//     message: html,
//     onShow: function () {
//       updateSequencia("esconder");
//       localStorage.CAT_SUB_EDIT = categoria;
//       $(".tabModal").click(function () {
//         $(".tabModal").removeClass("tabModalActive");
//         $(this).addClass("tabModalActive");
//         $(".tabContent").hide();
//         //////console.log("#" + $(this).attr("content"));
//         $("#" + $(this).attr("content")).fadeIn();
//       });

//       $(".fa-times-circle").click(function () {
//         $(this).parent().parent().remove();
//       });

//       $(".hiperTitle").each(function () {
//         $(this).removeClass("ui-sortable-handle");
//       });

//       let thisSubCategory = {
//         categoryMain: subCategoria,
//       };

//       function makeMeToSet(element) {
//         let subCategory = element.attr("subCategory");
//         let myValue = element.val();
//         let myNameValue = element.attr("nameValue");
//         if (element.attr("type") == "checkbox") {
//           myValue = element[0].checked;
//         }
//         thisSubCategory[myNameValue] = myValue;
//       }
//     },
//     callback: function () {
//       //////console.log('The styles was removed!');

//       localStorage.CAT_SUB_EDIT = "";
//       localStorage.SUB_EDIT = "";
//       localStorage.SUB_CAT_ATUAL = "";
//       localStorage.SUB_CAT_ATUAL_STATUS = "";
//       sessionStorage.PALAVRAS_KEY = "";
//     },
//   });
//   $(".modal-footer").hide();
// }
function iconesSmartCommerci(categorieName) {
  var cate = JSON.parse(localStorage.MINHAS_CATEGORIAS),
    essaCat = [];
  for (const k in cate) {
    if (cate[k].affiliate_categorie_name == categorieName) {
      essaCat = cate[k];
    }
  }
  var html = "";
  var ver = essaCat.categorie_icon?.split("/")
    ? essaCat.categorie_icon.split("/")
    : [];
  ver = ver[ver.length - 1]?.replace(/ /g, "");
  function sugestao(n) {
    switch (n) {
      case 28:
        return "acougue";
      case 3:
        return "acougue";
      case 5:
        return "acougue";
      case 6:
        return "acougue";
      case 10:
        return "frutas";
      case 11:
        return "frutas";
      case 23:
        return "frutas";
      case 9:
        return "padaria";
      case 11:
        return "padaria";
      default:
        return "outros";
    }
  }

  for (let a = 1; a < 29; a++) {
    if (a < 10) {
      a = "0" + a;
    }
    var ver2 = ("images/icons/Arquivo 000" + a + ".svg").split("/");
    ver2 = ver2[ver2.length - 1]?.replace(/ /g, "");
    //console.log( ver, ver2)
    if (ver == ver2) {
      //console.log("Achei..........")

      html +=
        '<div dica="' +
        sugestao(Number(a)) +
        '" id="' +
        aleatoryID("images/icons/Arquivo 000" + a + ".svg") +
        '_icone" onclick="fila($(this), \'' +
        categorieName +
        "','updateIconSVG')\" class=\"boxIconDefault boxIconeActive\">" +
        '<i class="fas fa-check iconSelectedCheck"></i>' +
        '<img class="imgIcone" style="width: 100%;" src="images/icons/Arquivo 000' +
        a +
        '.svg" />' +
        "</div>";
    } else {
      html +=
        '<div dica="' +
        sugestao(Number(a)) +
        '" id="' +
        aleatoryID("images/icons/Arquivo 000" + a + ".svg") +
        '_icone"  onclick="fila($(this), \'' +
        categorieName +
        "','updateIconSVG')\" class=\"boxIconDefault boxIcone\">" +
        '<i style="display:none" class="fas fa-check iconSelectedCheck"></i>' +
        '<img class="imgIcone" style="width: 100%;" src="images/icons/Arquivo 000' +
        a +
        '.svg" />' +
        "</div>";
    }
  }
  return html;
}

function iconesSmartCommerci2(categorieName) {
  var cate = JSON.parse(localStorage.MINHAS_CATEGORIAS),
    essaCat = [];
  for (const k in cate) {
    if (cate[k].affiliate_categorie_name == categorieName) {
      essaCat = cate[k];
    }
  }
  var html = "";
  var ver = essaCat.categorie_icon?.split("/")
    ? essaCat.categorie_icon.split("/")
    : [];
  ver = ver[ver.length - 1]?.replace(/ /g, "");
  function sugestao(n) {
    switch (n) {
      case 28:
        return "acougue";
      case 3:
        return "acougue";
      case 5:
        return "acougue";
      case 6:
        return "acougue";
      case 10:
        return "frutas";
      case 11:
        return "frutas";
      case 23:
        return "frutas";
      case 9:
        return "padaria";
      case 11:
        return "padaria";
      default:
        return "outros";
    }
  }
  var list = localStorage.ICONES_SMARTCOMERCI;
  if (list == null) {
    list = "[]";
  }
  var LISTA_ICONES = JSON.parse(list);
  ////console.log('LISTA_ICONES',LISTA_ICONES)
  for (const k in LISTA_ICONES) {
    if (LISTA_ICONES[k].indexOf("cliente_") > -1) {
      html +=
        '<div style="background: #FFFBF2 0% 0% no-repeat padding-box;"   id="' +
        aleatoryID("/assets/icons/" + LISTA_ICONES[k]) +
        '_icone" onclick="fila($(this), \'' +
        categorieName +
        "','updateIconSVG')\" class=\"boxIconDefault \">" +
        '<i  style="display:none" class="fas fa-check iconSelectedCheck"></i>' +
        '<img class="imgIcone" style="width: 100%;" src="/assets/icons/' +
        LISTA_ICONES[k] +
        '" />' +
        "</div>";
    }
  }
  return html;
}
let catsAndSubs = [];
function reordenaListas() {
  $(".superSortable").each(function () {
    var items = $(this).find(".itemSortable");
    var index = 1;
    items.each(function () {
      $(this).find(".posicaoSubCategoria").text(index);
      index++;
    });
  });

  $(".fullSortable").each(function () {
    var items = $(this).find(".itemSortable2");
    var index = 1;
    items.each(function () {
      $(this).find(".posicaoCategoria").text(index);
      index++;
    });
  });
}
setInterval(() => {
  reordenaListas();
}, 1000);

function updateIconSVG(element, categorieName) {
  ////console.log("asdsadasd")
  $(".boxIconDefault").removeClass("boxIconeActive");
  $(".boxIconDefault").find(".iconSelectedCheck").hide();
  element.addClass("boxIconeActive");
  element.find(".iconSelectedCheck").show();
  var content = element.find("img").attr("src");
  ////console.log(content)

  $.ajax({
    type: "POST",
    url: "http://localhost:6060/updateCategorieDetail",
    headers: {
      "x-access-token": localStorage.token,
    },
    data: {
      master_id: localStorage.MASTER_ID,
      fieldName: "categorie_icon",
      fieldValue: content,
      categorie_name: categorieName,
    },
    success: function (myIcons) {
      //  console.log({
      //     "master_id": localStorage.MASTER_ID,
      //     "fieldName": "categorie_icon",
      //     "fieldValue": content,
      //     "categorie_name": categorieName
      // },myIcons);
      sessionStorage.SAVE_SUCCEFULLY =
        Number(sessionStorage.SAVE_SUCCEFULLY) + 1;
      mostra();
    },
    error: function (myIcons) {
      ////console.log(myIcons);
    },
    complete: function () { },
  });
}

function updateCategoriaDetalhe(element, categorieName) {
  var content = "";
  var fieldName = element.attr("fieldName");
  ////console.log("tentando...")
  ////console.log(element, categorieName)
  if (fieldName != undefined) {
    if (fieldName.trim() == "categorie_key_words") {
      content = localStorage.PALAVRAS_KEY;
    } else {
      content = element.val();
    }

    $.ajax({
      type: "POST",
      url: "http://localhost:6060/updateCategorieDetail",
      headers: {
        "x-access-token": localStorage.token,
      },
      data: {
        master_id: localStorage.MASTER_ID,
        fieldName: fieldName,
        fieldValue: content,
        categorie_name: categorieName,
      },
      success: function (myIcons) {
        ////console.log(myIcons);
        element.css("color", "#f6b504");
        sessionStorage.SAVE_SUCCEFULLY =
          Number(sessionStorage.SAVE_SUCCEFULLY) + 1;

        mostra();
      },
      error: function (myIcons) {
        ////console.log(myIcons);
      },
      complete: function () { },
    });
  } else {
    //console.log("Field Name não pode faltar...")
  }
}

function mudaDetalhe(fieldName, content, categorieName) {
  $.ajax({
    type: "POST",
    url: "http://localhost:6060/updateCategorieDetail",
    headers: {
      "x-access-token": localStorage.token,
    },
    data: {
      master_id: localStorage.MASTER_ID,
      fieldName: fieldName,
      fieldValue: content,
      categorie_name: categorieName,
    },
    success: function (myIcons) {
      //   console.log(myIcons);
    },
    error: function (myIcons) {
      //   console.log(myIcons);
    },
    complete: function () { },
  });
}

function addWordKey(elemento, e) {
  e = window.event;
  var code = e.which || e.keyCode;

  if (code == 13) {
    $("." + elemento.attr("container")).append(
      '<div class="input-group categoriaLabel categoriasPalavras"><label class="aPalavra">' +
      elemento.val() +
      '</label><label onclick="meRemoveX($(this))" class="iconClose"><i class="far fa-times-circle"></i></label></div>'
    );
    palavrasKey(elemento.val(), "add");
    elemento.val("");
    updateCategoriaDetalhe(elemento, elemento.attr("categorie_name"));
  }
}
function addWordKey2(elemento, e) {
  e = window.event;
  var code = e.which || e.keyCode;

  if (code == 13) {
    $("." + elemento.attr("container")).append(
      '<div class="input-group categoriaLabel categoriasPalavras"><label class="aPalavra">' +
      elemento.val() +
      '</label><label onclick="meRemoveX2($(this))" class="iconClose"><i class="far fa-times-circle"></i></label></div>'
    );
    palavrasKey(elemento.val(), "add");
    elemento.val("");
    setSubCatAtt(elemento);
  }
}

function WordKeys(text) {
  var html = "";
  for (const k in text) {
    if (text[k] != "") {
      html +=
        '<div class="input-group categoriaLabel categoriasPalavras"><label class="aPalavra">' +
        text[k] +
        '</label><label onclick="meRemoveX($(this))" class="iconClose"><i class="far fa-times-circle"></i></label></div>';
    }
  }
  return html;
}
function WordKeys2(text) {
  var html = "";
  for (const k in text) {
    if (text[k] != "") {
      html +=
        '<div class="input-group categoriaLabel categoriasPalavras"><label class="aPalavra">' +
        text[k] +
        '</label><label onclick="meRemoveX2($(this))" class="iconClose"><i class="far fa-times-circle"></i></label></div>';
    }
  }
  return html;
}

function meRemoveX(elemento) {
  var container = $(".entraPalavra");

  palavrasKey(elemento.parent().find(".aPalavra").text(), "remove");
  updateCategoriaDetalhe(container, container.attr("categorie_name"));
  elemento.parent().remove();
}
function meRemoveX2(elemento) {
  var container = $(".entraPalavra");

  palavrasKey(elemento.parent().find(".aPalavra").text(), "remove");
  removeKeyWord2();
  setSubCatAtt(elemento);
  elemento.parent().remove();
}

function palavrasKey(palavra, regra) {
  var palavras = [];
  if (
    localStorage.PALAVRAS_KEY != "undefined" &&
    localStorage.PALAVRAS_KEY != undefined &&
    localStorage.PALAVRAS_KEY != null &&
    localStorage.PALAVRAS_KEY != "" &&
    localStorage.PALAVRAS_KEY != "null"
  ) {
    //console.log(localStorage.PALAVRAS_KEY)
    palavras = localStorage.PALAVRAS_KEY.split(",");
    var novasPalavras = [];
    if (regra == "add") {
      var faz = true;
      for (const k in palavras) {
        if (palavra == palavras[k]) {
          faz = false;
        }
        if (palavras[k] == "") {
          palavras.splice(k, 1);
        }
      }
      if (faz) {
        palavras.push(palavra);
      }
    } else {
      var faz = true;
      for (const k in palavras) {
        if (palavra == palavras[k] || palavras[k] == "") {
          palavras.splice(k, 1);
        }
      }
    }

    var pKey = "";
    for (const p in palavras) {
      pKey += palavras[p] + ",";
    }
    localStorage.PALAVRAS_KEY = pKey;
  } else {
    palavras = [];
    palavras.push(palavra);

    var pKey = "";
    for (const p in palavras) {
      pKey += palavras[p] + ",";
    }
    localStorage.PALAVRAS_KEY = pKey;
  }
}
function removeKeyWord2() {
  //console.log("passei aqui")
  try {
    var listaSub2 = JSON.parse(localStorage.SUB_EDIT);
    var listaSub = {};
    for (const k in listaSub2) {
      // ////console.log(listaSub2[k].subCategoria,localStorage.SUB_CAT_ATUAL)
      if (listaSub2[k].subCategoria == localStorage.SUB_CAT_ATUAL) {
        listaSub = listaSub2[k];
      }
    }
    listaSub.key_words = localStorage.PALAVRAS_KEY;
    for (const k in listaSub2) {
      if (listaSub2[k].subCategoria == localStorage.SUB_CAT_ATUAL) {
        ////console.log(listaSub2[k])
        listaSub2[k] = listaSub;
      }
    }
    // ////console.log(listaSub2)
    localStorage.SUB_EDIT = JSON.stringify(listaSub2);
  } catch (err) {
    //////console.log(err)
  }
}

function setAttrCategorie(element, attr, value) {
  element.attr(attr, value);
}

function fila(elemento, categorieName, funcao) {
  if (funcao == "updateIconSVG") {
    updateIconSVG(elemento, categorieName);
    $(".boxIconDefault").removeClass("boxIconeActive");
    $(".boxIconDefault").find(".iconSelectedCheck").hide();
    elemento.addClass("boxIconeActive");
    elemento.find(".iconSelectedCheck").show();
  }
  if (
    sessionStorage.NEED_TO_SAVE == undefined ||
    sessionStorage.NEED_TO_SAVE == null ||
    sessionStorage.NEED_TO_SAVE == ""
  ) {
    var lista_mudancas = [];
    lista_mudancas.push({
      ID_ELEMENTO: elemento.attr("id"),
      NOME_CATEGORIA: categorieName,
      FUNCAO: funcao,
    });
    sessionStorage.NEED_TO_SAVE = JSON.stringify(lista_mudancas);
  } else {
    var lista_mudancas = JSON.parse(sessionStorage.NEED_TO_SAVE);
    lista_mudancas.push({
      ID_ELEMENTO: elemento.attr("id"),
      NOME_CATEGORIA: categorieName,
      FUNCAO: funcao,
    });
    sessionStorage.NEED_TO_SAVE = JSON.stringify(lista_mudancas);
  }
}
function aleatoryID(text) {
  var randLetter = Math.random.toString().replace(/./g, "");
  if (text) {
    // console.log('text',text)
    randLetter = text
      .replace(/\./g, "")
      .replace(/:/g, "")
      .replace(/ /g, "")
      .replace(/-/g, "");
    let newT = "";
    let lista = randLetter.split("/");
    for (const k in lista) {
      //  console.log(lista[k])
      newT += lista[k];
    }

    randLetter = newT;
  }
  var uniqid = randLetter + Date.now();
  return uniqid;
}
function CANCELA_EDIT() {
  if (
    sessionStorage.NEED_TO_SAVE != undefined ||
    sessionStorage.NEED_TO_SAVE != null ||
    sessionStorage.NEED_TO_SAVE == ""
  ) {
    try {
      var mudancas = JSON.parse(sessionStorage.NEED_TO_SAVE);
    } catch (err) {
      $(".close").click();
    }
    if (mudancas != undefined) {
      if (mudancas.length == 0) {
        sessionStorage.NEED_TO_SAVE = "";
        sessionStorage.SAVE_SUCCEFULLY = 0;
        $(".close").click();
      } else {
        bootbox.confirm({
          message:
            "<p style='font: normal normal normal 24px Roboto;'>Deseja <b>CANCELAR</b> as alterações feitas?</p>",
          onShow: function () {
            $(this)[0].id = "modalInner";
            $("#modalInner").find(".modal-dialog").addClass("miniModal");
            $("#modalInner").find(".modal-body").addClass("miniModalInner");
            $(".modal-footer").show();
            $(".bootbox-accept").css("float", "right");
            $(".bootbox-cancel").css("float", "right");
            $(".bootbox-body").css("padding", "50px");
          },
          callback: function (result) {
            if (result) {
              sessionStorage.NEED_TO_SAVE = "";
              $(".close").click();
            }
          },
        });
      }
    } else {
      sessionStorage.NEED_TO_SAVE = "";
      sessionStorage.SAVE_SUCCEFULLY = 0;
      $(".close").click();
    }
  } else {
    sessionStorage.NEED_TO_SAVE = "";
    sessionStorage.SAVE_SUCCEFULLY = 0;
    $(".close").click();
  }
}
async function SALVA_EDIT() {
  updateSequencia("esconder");
  if (
    sessionStorage.NEED_TO_SAVE != undefined ||
    sessionStorage.NEED_TO_SAVE != null ||
    sessionStorage.NEED_TO_SAVE == ""
  ) {
    try {
      var mudancas = JSON.parse(sessionStorage.NEED_TO_SAVE);
    } catch (err) {
      $(".close").click();
    }
    if (mudancas != undefined) {
      if (mudancas.length > 0) {
        for (const k in mudancas) {
          ////console.log(mudancas[k])
          switch (mudancas[k].FUNCAO) {
            case "updateCategoriaDetalhe":
              updateCategoriaDetalhe(
                $("#" + mudancas[k].ID_ELEMENTO),
                mudancas[k].NOME_CATEGORIA
              );
              break;
            case "updateIconSVG":
              //updateIconSVG($("#" + mudancas[k].ID_ELEMENTO), mudancas[k].NOME_CATEGORIA);
              break;

            default:
              break;
          }
        }
        var verifica = setInterval(() => {
          if (Number(sessionStorage.SAVE_SUCCEFULLY) >= mudancas.length) {
            alert("Todas as mudanças foram feitas...");
            sessionStorage.NEED_TO_SAVE = "";
            sessionStorage.SAVE_SUCCEFULLY = 0;
            $(".close").click();
            clearInterval(verifica);
          }
        }, 1000);
      }
    } else {
      sessionStorage.SAVE_SUCCEFULLY = 0;
      $(".close").click();
    }
  } else {
    sessionStorage.SAVE_SUCCEFULLY = 0;
    $(".close").click();
  }
  let thisCategory = localStorage.CAT_SUB_EDIT;
  let subs = JSON.parse(localStorage.MINHAS_CATEGORIAS);
  let thisCategoryData;
  for (const k in subs) {
    if (subs[k].categoria == thisCategory) {
      thisCategoryData = subs[k];
    }
  }
  // console.log('detectando',subs,thisCategoryData)
  mudaDetalhe(
    "subcategorie_banners",
    JSON.stringify(thisCategoryData.subcategorie_banners),
    thisCategory
  );
}

//console.log('mostre as cats',JSON.parse(localStorage.MINHAS_CATEGORIAS))
setTimeout(() => {
  $(".totalCategoriasCadastradas").text($(".categorie").length);
}, 5000);

function atributoSubCat(categoria, subCat, fieldName) {
  var lista = JSON.parse(localStorage.MINHAS_CATEGORIAS),
    listaSub = [];
  for (const k in lista) {
    if (lista[k].affiliate_categorie_name == categoria) {
      //console.log(lista[k].affiliate_categorie_status)
      //console.log("affiliate_categorie_status")
      listaSub = JSON.parse(ajustStrigfy(lista[k].affiliate_categorie_status));
    }
  }
  for (const k in listaSub) {
    if (subCat == listaSub[k].subCategoria) {
      switch (fieldName) {
        case "title":
          return listaSub[k].title;
        case "description":
          return listaSub[k].description;
        case "key_words":
          return listaSub[k].key_words;
        case "smart":
          return listaSub[k].smart;
        case "maisVendidos":
          return listaSub[k].maisVendidos;
        case "ofertas":
          return listaSub[k].ofertas;
        case "personalizada":
          return listaSub[k].personalizada;

        default:
          return listaSub[k];
      }
    }
  }
}

function setSubCatAtt(elemento) {
  ////console.log("tentando subcategoria...")
  var fieldName = elemento.attr("fieldName");
  ////console.log(fieldName)
  var subCategorieName = localStorage.SUB_CAT_ATUAL;
  var dado = "";
  if (elemento.attr("type") == "checkbox") {
    dado = elemento[0].checked;
  } else {
    dado = elemento.val();
  }
  var listaSub2 = JSON.parse(localStorage.SUB_EDIT);
  var listaSub = {};
  for (const k in listaSub2) {
    ////console.log(listaSub2[k].subCategoria,subCategorieName)
    if (listaSub2[k].subCategoria == subCategorieName) {
      listaSub = listaSub2[k];
    }
  }

  listaSub.subCategoria = localStorage.SUB_CAT_ATUAL;
  listaSub.status = localStorage.SUB_CAT_ATUAL_STATUS;
  let changeName = false,
    lastName = subCategorieName;

  switch (fieldName) {
    case "subCategoria":
      listaSub.subCategoria = dado;
      localStorage.SUB_CAT_ATUAL = dado;
      changeName = true;
      let lista = JSON.parse(localStorage.MINHAS_CATEGORIAS);
      for (const k in lista) {
        if (lista[k].categoria == localStorage.CAT_SUB_EDIT) {
          let names = lista[k].affiliate_sub_categorie_name?.replace(
            `${lastName}`,
            `${dado}`
          );
          let names2 = lista[k].subCategorias?.replace(
            `${lastName}`,
            `${dado}`
          );
          lista[k].affiliate_sub_categorie_name = names;
          lista[k].subCategorias = names2;
        }
      }
      localStorage.MINHAS_CATEGORIAS = JSON.stringify(lista);
      $("#" + elemento.attr("idParent")).text(dado);

      updateSequencia("esconder");

      break;
    case "status":
      if (dado) {
        dado = 1;
      } else {
        dado = 0;
      }
      listaSub.status = dado;
      break;
    case "title":
      listaSub.title = dado;
      break;
    case "description":
      listaSub.description = dado;
      break;
    case "key_words":
      var ele = localStorage.PALAVRAS_KEY;
      listaSub.key_words = ele;
      break;
    case "smart":
      listaSub.smart = dado;
      break;
    case "maisVendidos":
      listaSub.maisVendidos = dado;
      break;
    case "ofertas":
      listaSub.ofertas = dado;
      break;
    case "personalizada":
      listaSub.personalizada = dado;
      break;
    case "banners":
      listaSub.personalizada = dado;
      break;

    default:
      break;
  }
  // console.log("Minha lista sub" ,listaSub)

  for (const k in listaSub2) {
    // console.log(listaSub2[k].subCategoria,subCategorieName)
    if (changeName == true) {
      if (listaSub2[k].subCategoria == lastName) {
        //   console.log("achei 2... ")
        // console.log(listaSub2[k])
        listaSub2[k] = listaSub;
      }
    } else {
      if (listaSub2[k].subCategoria == subCategorieName) {
        //  console.log("achei ... ")
        //   console.log(listaSub2[k])
        listaSub2[k] = listaSub;
      }
    }
  }
  //console.log("Minha lista sub salva" ,listaSub2)
  localStorage.SUB_EDIT = JSON.stringify(listaSub2);
}

function salvaModalSubCategoria() {
  var faz = false;
  if (localStorage.SUB_EDIT != undefined && localStorage.SUB_EDIT != "") {
    faz = true;
  }
  if (
    localStorage.CAT_SUB_EDIT != undefined &&
    localStorage.CAT_SUB_EDIT != ""
  ) {
    faz = true;
  }

  if (faz) {
    var editados = JSON.parse(localStorage.SUB_EDIT);
    //  console.log("editados")
    //  console.log(editados)
    $.ajax({
      type: "POST",
      url: "http://localhost:6060/updateCategorieDetail",
      headers: {
        "x-access-token": localStorage.token,
      },
      data: {
        master_id: localStorage.MASTER_ID,
        fieldName: "affiliate_categorie_status",
        fieldValue: JSON.stringify(editados),
        categorie_name: localStorage.CAT_SUB_EDIT,
      },
      success: function (myIcons) {
        // console.log(myIcons);
        mostra();
        $(".close").click();
      },
      error: function (myIcons) {
        // console.log(myIcons);
      },
      complete: function () { },
    });
  } else {
    alert("Algo saiu errado, tente novamente após o recarregamento da página!");
  }
}

function labelIcones(elemento) {
  $(".labelIcones").removeClass("labelIconesActive");
  elemento.addClass("labelIconesActive");
  elemento.find(".iconSelectedCheck").show();
}

function ativaSubCatInner(elemento) {
  var lista = JSON.parse(localStorage.MINHAS_CATEGORIAS),
    todasSub = [],
    essaCat = [];
  var essaSub = elemento.attr("subCategoria");
  for (const k in lista) {
    if (elemento.attr("categoriaName") == lista[k].affiliate_categorie_name) {
      todasSub = JSON.parse(lista[k].affiliate_categorie_status);
      for (const c in todasSub) {
        if (todasSub[c].subCategoria == essaSub) {
          if (elemento[0].checked) {
            todasSub[c].status = 1;
          } else {
            todasSub[c].status = 0;
          }
        }
      }
      lista[k].affiliate_categorie_status = JSON.stringify(todasSub);
    }
  }
  localStorage.MINHAS_CATEGORIAS = JSON.stringify(lista);
  //console.log("lista")
  //console.log(lista)
}
$.ajax({
  type: "GET",
  url: "/iconesSmart",
  headers: {
    "x-access-token": localStorage.token,
  },
  data: "",
  success: function (resultado) {
    ////console.log(resultado)
    localStorage.ICONES_SMARTCOMERCI = JSON.stringify(resultado);
  },
  error: function (resultado) {
    ////console.log(resultado)
  },
  complete: function () { },
});

function uploadIcone() {
  $("#upIcon")[0].click();
}

function sobeIcone(elemento) {
  var data = new FormData();
  //data.append('fileimagem', $('#fileimagem')[0].files[0]);
  var contador = 1;
  data.append("fileimagem", elemento[0].files[0]);

  ////console.log(elemento[0].files[0])

  $.ajax({
    url: "/uploadIcone",
    headers: {
      "x-access-token": localStorage.token,
    },
    data: data,
    processData: false,
    contentType: false,
    type: "POST",
    success: function (data) {
      console.log(data);
      var html =
        '<div style="background: #FFFBF2 0% 0% no-repeat padding-box;" id="' +
        aleatoryID("/assets/icons/cliente_" + elemento[0].files[0].name) +
        '_icone" onclick="fila($(this), \'ALIMENTICIOS\',\'updateIconSVG\')" class="boxIconDefault "><svg style="display: none;" class="svg-inline--fa fa-check fa-w-16 iconSelectedCheck" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg>' +
        '<!-- <i style="display:none" class="fas fa-check iconSelectedCheck"></i> Font Awesome fontawesome.com --><img class="imgIcone" style="width: 100%;" src="/assets/icons/cliente_' +
        elemento[0].files[0].name +
        '"></div>';
      $(".iconesClientes").prepend(html);

      var alerta = bootbox.confirm({
        message: "Icone salvo com sucesso!  ",
        onShow: function () {
          $(this)[0].id = "modalInner";
          $("#modalInner").find(".modal-dialog").addClass("miniModal");
          $("#modalInner").find(".modal-body").addClass("miniModalInner");
          $(".modal-footer").show();
          $(".bootbox-accept").css("float", "right");
          $(".bootbox-cancel").css("float", "right");
        },
        callback: function (e) { },
      });
    },
    error: function (data) {
      ////console.log(data)
    },
  });
}

$("#checkFull").removeAttr("checked");

function getBannerInner(imgURLs, actives) {
  let html = "",
    counter = 0;
  for (const k in imgURLs) {
    let RANDOM = Math.random();
    if (imgURLs[k].active == actives) {
      counter++;
      html += `
            <li class="itemSortable2 ui-sortable-handle"> 
                <div class="areaBannerInner">
                    <div class="borderLeft">
                        <div style="margin-top: 10px;">
                            <div class="col-sm dropCategoriaContent"
                                style="opacity: 1;max-width: 60px;display: inline-flex;    float: left;" dropado="nao">
                                <svg class="iconGrid" xmlns="http://www.w3.org/2000/svg"
                                    style="fill: #687c97;    float: left;    margin: -10px 0px 25px 5px !important;"
                                    width="13.5" height="23" viewBox="0 0 9 16">
                                    <defs></defs>
                                    <path class="a"
                                        d="M2.5,16h-1A1.5,1.5,0,0,1,0,14.5v-1A1.5,1.5,0,0,1,1.5,12h1A1.5,1.5,0,0,1,4,13.5v1A1.5,1.5,0,0,1,2.5,16Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1a.5.5,0,0,0,.5-.5v-1a.5.5,0,0,0-.5-.5Zm1-3h-1A1.5,1.5,0,0,1,0,8.5v-1A1.5,1.5,0,0,1,1.5,6h1A1.5,1.5,0,0,1,4,7.5v1A1.5,1.5,0,0,1,2.5,10Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1A.5.5,0,0,0,3,8.5v-1A.5.5,0,0,0,2.5,7Zm1-3h-1A1.5,1.5,0,0,1,0,2.5v-1A1.5,1.5,0,0,1,1.5,0h1A1.5,1.5,0,0,1,4,1.5v1A1.5,1.5,0,0,1,2.5,4Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1A.5.5,0,0,0,3,2.5v-1A.5.5,0,0,0,2.5,1Z">
                                    </path>
                                    <path class="a"
                                        d="M2.5,16h-1A1.5,1.5,0,0,1,0,14.5v-1A1.5,1.5,0,0,1,1.5,12h1A1.5,1.5,0,0,1,4,13.5v1A1.5,1.5,0,0,1,2.5,16Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1a.5.5,0,0,0,.5-.5v-1a.5.5,0,0,0-.5-.5Zm1-3h-1A1.5,1.5,0,0,1,0,8.5v-1A1.5,1.5,0,0,1,1.5,6h1A1.5,1.5,0,0,1,4,7.5v1A1.5,1.5,0,0,1,2.5,10Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1A.5.5,0,0,0,3,8.5v-1A.5.5,0,0,0,2.5,7Zm1-3h-1A1.5,1.5,0,0,1,0,2.5v-1A1.5,1.5,0,0,1,1.5,0h1A1.5,1.5,0,0,1,4,1.5v1A1.5,1.5,0,0,1,2.5,4Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1A.5.5,0,0,0,3,2.5v-1A.5.5,0,0,0,2.5,1Z"
                                        transform="translate(5)"></path>
                                </svg>
                            </div>
                            <div class="col-sm posicaoCategoria numberCat"
                                style="opacity: 1;max-width: 30px;display: inline-flex;    float: left;     margin-left: -25px !important;">
                                1
                            </div>
                        </div>
                        <br />
                        <div style="text-align: center" class="switch__container"><input onchange="changeMyActive($(this))" thisUrl="${imgURLs[k].url
        }" ${imgURLs[k].active == true ? 'checked="true"' : ""
        } id="switch-shadow1778${RANDOM}"
                                class="switch switch--shadow" type="checkbox" /><label style="    margin-top: 15px;"
                                for="switch-shadow1778${RANDOM}"></label></div>
                        <div  onclick="removeBanner('${imgURLs[k].url
        }','banners', $(this))" style="margin-top: 15px" class=" deleteThis">
                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 21 21"
                                style="fill: #f6b504;margin: 9px;">
                                &gt;
                                <defs></defs>
                                <path class="a"
                                    d="M10.937,16H3.063A2.208,2.208,0,0,1,.875,13.778V2.666H.438a.444.444,0,0,1,0-.889H4.375V1.334A1.324,1.324,0,0,1,5.687,0H8.313A1.324,1.324,0,0,1,9.625,1.334v.444h3.937a.444.444,0,0,1,0,.889h-.437V13.778A2.208,2.208,0,0,1,10.937,16ZM1.75,2.666V13.778a1.325,1.325,0,0,0,1.313,1.334h7.875a1.325,1.325,0,0,0,1.313-1.334V2.666ZM5.687.889a.441.441,0,0,0-.437.445v.444h3.5V1.334A.441.441,0,0,0,8.313.889Zm3.5,11.556A.442.442,0,0,1,8.75,12V5.778a.437.437,0,1,1,.875,0V12A.441.441,0,0,1,9.188,12.445Zm-4.375,0A.441.441,0,0,1,4.375,12V5.778a.437.437,0,1,1,.875,0V12A.442.442,0,0,1,4.812,12.445Z"
                                    transform="translate(4 3)"></path>
                            </svg>
                        </div>
                    </div>
                   
                    <div  alvo="update" onclick="alteraBannerCat($(this))" ${imgURLs[k].url
          ? `style="background-size: cover !important; background-position: center; zoom: 100%;background: url(${imgURLs[k].url})"`
          : ""
        }  class="borderRight">
                    </div>
                </div>
                 
                <button style="margin-top: 50px;" onclick="modalAlteraLinks($(this))" class="botaoParaLink">Alterar Link</button>
            </li>`;
    }
  }
  return { html: html, total: counter };
}

function getBannerInnerMain(imgURLs, actives) {
  let html = "",
    counter = 0;
  if (imgURLs) {
    for (const k in imgURLs) {
      let RANDOM = Math.random();
      if (Number(imgURLs[k].active) == actives) {
        counter++;
        html += `
                <li class="itemSortable2 ui-sortable-handle"> 
                    <div class="areaBannerInner">
                        <div class="borderLeft">
                            <div style="margin-top: 10px;">
                                <div class="col-sm dropCategoriaContent"
                                    style="opacity: 1;max-width: 60px;display: inline-flex;    float: left;" dropado="nao">
                                    <svg class="iconGrid" xmlns="http://www.w3.org/2000/svg"
                                        style="fill: #687c97;    float: left;    margin: -10px 0px 25px 5px !important;"
                                        width="13.5" height="23" viewBox="0 0 9 16">
                                        <defs></defs>
                                        <path class="a"
                                            d="M2.5,16h-1A1.5,1.5,0,0,1,0,14.5v-1A1.5,1.5,0,0,1,1.5,12h1A1.5,1.5,0,0,1,4,13.5v1A1.5,1.5,0,0,1,2.5,16Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1a.5.5,0,0,0,.5-.5v-1a.5.5,0,0,0-.5-.5Zm1-3h-1A1.5,1.5,0,0,1,0,8.5v-1A1.5,1.5,0,0,1,1.5,6h1A1.5,1.5,0,0,1,4,7.5v1A1.5,1.5,0,0,1,2.5,10Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1A.5.5,0,0,0,3,8.5v-1A.5.5,0,0,0,2.5,7Zm1-3h-1A1.5,1.5,0,0,1,0,2.5v-1A1.5,1.5,0,0,1,1.5,0h1A1.5,1.5,0,0,1,4,1.5v1A1.5,1.5,0,0,1,2.5,4Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1A.5.5,0,0,0,3,2.5v-1A.5.5,0,0,0,2.5,1Z">
                                        </path>
                                        <path class="a"
                                            d="M2.5,16h-1A1.5,1.5,0,0,1,0,14.5v-1A1.5,1.5,0,0,1,1.5,12h1A1.5,1.5,0,0,1,4,13.5v1A1.5,1.5,0,0,1,2.5,16Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1a.5.5,0,0,0,.5-.5v-1a.5.5,0,0,0-.5-.5Zm1-3h-1A1.5,1.5,0,0,1,0,8.5v-1A1.5,1.5,0,0,1,1.5,6h1A1.5,1.5,0,0,1,4,7.5v1A1.5,1.5,0,0,1,2.5,10Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1A.5.5,0,0,0,3,8.5v-1A.5.5,0,0,0,2.5,7Zm1-3h-1A1.5,1.5,0,0,1,0,2.5v-1A1.5,1.5,0,0,1,1.5,0h1A1.5,1.5,0,0,1,4,1.5v1A1.5,1.5,0,0,1,2.5,4Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1A.5.5,0,0,0,3,2.5v-1A.5.5,0,0,0,2.5,1Z"
                                            transform="translate(5)"></path>
                                    </svg>
                                </div>
                                <div class="col-sm posicaoCategoria numberCat"
                                    style="opacity: 1;max-width: 30px;display: inline-flex;    float: left;     margin-left: -25px !important;">
                                    1
                                </div>
                            </div>
                            <br />
                            <div style="text-align: center" class="switch__container"><input onchange="changeMyActiveMain($(this))" thisUrl="${imgURLs[k].url
          }" ${imgURLs[k].active == true ? 'checked="true"' : ""
          } id="switch-shadow1778${RANDOM}"
                                    class="switch switch--shadow" type="checkbox" /><label style="    margin-top: 15px;"
                                    for="switch-shadow1778${RANDOM}"></label></div>
                            <div  onclick="removeBannerMain('${imgURLs[k].url
          }','banners', $(this))" style="margin-top: 15px" class=" deleteThis">
                                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 21 21"
                                    style="fill: #f6b504;margin: 9px;">
                                    &gt;
                                    <defs></defs>
                                    <path class="a"
                                        d="M10.937,16H3.063A2.208,2.208,0,0,1,.875,13.778V2.666H.438a.444.444,0,0,1,0-.889H4.375V1.334A1.324,1.324,0,0,1,5.687,0H8.313A1.324,1.324,0,0,1,9.625,1.334v.444h3.937a.444.444,0,0,1,0,.889h-.437V13.778A2.208,2.208,0,0,1,10.937,16ZM1.75,2.666V13.778a1.325,1.325,0,0,0,1.313,1.334h7.875a1.325,1.325,0,0,0,1.313-1.334V2.666ZM5.687.889a.441.441,0,0,0-.437.445v.444h3.5V1.334A.441.441,0,0,0,8.313.889Zm3.5,11.556A.442.442,0,0,1,8.75,12V5.778a.437.437,0,1,1,.875,0V12A.441.441,0,0,1,9.188,12.445Zm-4.375,0A.441.441,0,0,1,4.375,12V5.778a.437.437,0,1,1,.875,0V12A.442.442,0,0,1,4.812,12.445Z"
                                        transform="translate(4 3)"></path>
                                </svg>
                            </div>
                        </div>
                    
                        <div  alvo="update" onclick="alteraBannerCatMain($(this))" ${imgURLs[k].url
            ? `style="background-size: cover !important; background-position: center; zoom: 100%;background: url(${imgURLs[k].url})"`
            : ""
          }  class="borderRight">
                        </div>
                    </div>
                    <button  style="margin-top: 50px;" onclick="modalAlteraLinks($(this))" class="botaoParaLink">Alterar Link</button>
                </li>`;
      }
    }
    //console.log('dado ',{html :html, total: counter})
    return { html: html, total: counter };
  } else {
    // console.log('dado ',{html :'', total: counter})
    return { html: "", total: counter };
  }
}

function getBannerVertical(imgURLs, actives) {
  let html = "",
    counter = 0;
  for (const k in imgURLs) {
    let RANDOM = Math.random();
    let LENGTH = $(".bnnVertical").length ? $(".bnnVertical").length + 1 : 1;

    counter++;
    html += `
            <div class="areaBannerInner bnnVertical" style=" margin-top: 15px;min-height: 490px !important">
                <div class="borderLeft" style="    min-height: 490px !important">
                    <div style="margin-top: 10px;">
                        <div class="col-sm dropCategoriaContent"
                            style="opacity: 1;max-width: 60px;display: inline-flex;    float: left;" dropado="nao">
                            <svg class="iconGrid" xmlns="http://www.w3.org/2000/svg"
                                style="fill: #687c97;    float: left;    margin: -10px 0px 25px 5px !important;"
                                width="13.5" height="23" viewBox="0 0 9 16">
                                <defs></defs>
                                <path class="a"
                                    d="M2.5,16h-1A1.5,1.5,0,0,1,0,14.5v-1A1.5,1.5,0,0,1,1.5,12h1A1.5,1.5,0,0,1,4,13.5v1A1.5,1.5,0,0,1,2.5,16Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1a.5.5,0,0,0,.5-.5v-1a.5.5,0,0,0-.5-.5Zm1-3h-1A1.5,1.5,0,0,1,0,8.5v-1A1.5,1.5,0,0,1,1.5,6h1A1.5,1.5,0,0,1,4,7.5v1A1.5,1.5,0,0,1,2.5,10Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1A.5.5,0,0,0,3,8.5v-1A.5.5,0,0,0,2.5,7Zm1-3h-1A1.5,1.5,0,0,1,0,2.5v-1A1.5,1.5,0,0,1,1.5,0h1A1.5,1.5,0,0,1,4,1.5v1A1.5,1.5,0,0,1,2.5,4Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1A.5.5,0,0,0,3,2.5v-1A.5.5,0,0,0,2.5,1Z">
                                </path>
                                <path class="a"
                                    d="M2.5,16h-1A1.5,1.5,0,0,1,0,14.5v-1A1.5,1.5,0,0,1,1.5,12h1A1.5,1.5,0,0,1,4,13.5v1A1.5,1.5,0,0,1,2.5,16Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1a.5.5,0,0,0,.5-.5v-1a.5.5,0,0,0-.5-.5Zm1-3h-1A1.5,1.5,0,0,1,0,8.5v-1A1.5,1.5,0,0,1,1.5,6h1A1.5,1.5,0,0,1,4,7.5v1A1.5,1.5,0,0,1,2.5,10Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1A.5.5,0,0,0,3,8.5v-1A.5.5,0,0,0,2.5,7Zm1-3h-1A1.5,1.5,0,0,1,0,2.5v-1A1.5,1.5,0,0,1,1.5,0h1A1.5,1.5,0,0,1,4,1.5v1A1.5,1.5,0,0,1,2.5,4Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1A.5.5,0,0,0,3,2.5v-1A.5.5,0,0,0,2.5,1Z"
                                    transform="translate(5)"></path>
                            </svg>
                        </div>
                        <div class="col-sm posicaoCategoria numberCat"
                            style="opacity: 1;max-width: 30px;display: inline-flex;    float: left;     margin-left: -25px !important;">
                            ${LENGTH}
                        </div>
                    </div>
                    <br />
                    <div style="text-align: center" class="switch__container"><input thisUrl="${imgURLs[k].url
      }" onchange="changeMyActiveVertical($(this))" id="switch-shadow1799${RANDOM}" ${imgURLs[k].active == true ? 'checked="true"' : ""
      }
                            class="switch switch--shadow" type="checkbox" /><label style="    margin-top: 15px;"
                            for="switch-shadow1799${RANDOM}"></label></div>
                    <div onclick="removeBanner('${imgURLs[k].url
      }','bannersVertical', $(this))" style="margin-top: 15px" class=" deleteThis">
                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 21 21"
                            style="fill: #f6b504;margin: 9px;">
                            &gt;
                            <defs></defs>
                            <path class="a"
                                d="M10.937,16H3.063A2.208,2.208,0,0,1,.875,13.778V2.666H.438a.444.444,0,0,1,0-.889H4.375V1.334A1.324,1.324,0,0,1,5.687,0H8.313A1.324,1.324,0,0,1,9.625,1.334v.444h3.937a.444.444,0,0,1,0,.889h-.437V13.778A2.208,2.208,0,0,1,10.937,16ZM1.75,2.666V13.778a1.325,1.325,0,0,0,1.313,1.334h7.875a1.325,1.325,0,0,0,1.313-1.334V2.666ZM5.687.889a.441.441,0,0,0-.437.445v.444h3.5V1.334A.441.441,0,0,0,8.313.889Zm3.5,11.556A.442.442,0,0,1,8.75,12V5.778a.437.437,0,1,1,.875,0V12A.441.441,0,0,1,9.188,12.445Zm-4.375,0A.441.441,0,0,1,4.375,12V5.778a.437.437,0,1,1,.875,0V12A.442.442,0,0,1,4.812,12.445Z"
                                transform="translate(4 3)"></path>
                        </svg>
                    </div>
                </div>
                <div alvo="update" onclick="alteraBannerCatVertical($(this))" ${imgURLs[k].url
        ? `style="background-repeat: no-repeat;background-repeat: no-repeat !important; background-position: center; zoom: 80%; min-height: 490px; width: calc(100% - 100px); float: right; background: url(${imgURLs[k].url})"`
        : ""
      }   class="borderRightVertical">
                </div>
                <button  style="margin-top: 50px;" onclick="modalAlteraLinks($(this))" class="botaoParaLink">Alterar Link</button>
            </div>`;
  }
  return { html: html, total: counter };
}

function getBannerVerticalMain(imgURLs, actives) {
  let html = "",
    counter = 0;
  if (imgURLs) {
    for (const k in imgURLs) {
      let RANDOM = Math.random();
      let LENGTH = $(".bnnVertical").length ? $(".bnnVertical").length + 1 : 1;

      counter++;
      html += `
                <div class="areaBannerInner bnnVertical" style=" margin-top: 15px;min-height: 490px !important">
                    <div class="borderLeft" style="    min-height: 490px !important">
                        <div style="margin-top: 10px;">
                            <div class="col-sm dropCategoriaContent"
                                style="opacity: 1;max-width: 60px;display: inline-flex;    float: left;" dropado="nao">
                                <svg class="iconGrid" xmlns="http://www.w3.org/2000/svg"
                                    style="fill: #687c97;    float: left;    margin: -10px 0px 25px 5px !important;"
                                    width="13.5" height="23" viewBox="0 0 9 16">
                                    <defs></defs>
                                    <path class="a"
                                        d="M2.5,16h-1A1.5,1.5,0,0,1,0,14.5v-1A1.5,1.5,0,0,1,1.5,12h1A1.5,1.5,0,0,1,4,13.5v1A1.5,1.5,0,0,1,2.5,16Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1a.5.5,0,0,0,.5-.5v-1a.5.5,0,0,0-.5-.5Zm1-3h-1A1.5,1.5,0,0,1,0,8.5v-1A1.5,1.5,0,0,1,1.5,6h1A1.5,1.5,0,0,1,4,7.5v1A1.5,1.5,0,0,1,2.5,10Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1A.5.5,0,0,0,3,8.5v-1A.5.5,0,0,0,2.5,7Zm1-3h-1A1.5,1.5,0,0,1,0,2.5v-1A1.5,1.5,0,0,1,1.5,0h1A1.5,1.5,0,0,1,4,1.5v1A1.5,1.5,0,0,1,2.5,4Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1A.5.5,0,0,0,3,2.5v-1A.5.5,0,0,0,2.5,1Z">
                                    </path>
                                    <path class="a"
                                        d="M2.5,16h-1A1.5,1.5,0,0,1,0,14.5v-1A1.5,1.5,0,0,1,1.5,12h1A1.5,1.5,0,0,1,4,13.5v1A1.5,1.5,0,0,1,2.5,16Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1a.5.5,0,0,0,.5-.5v-1a.5.5,0,0,0-.5-.5Zm1-3h-1A1.5,1.5,0,0,1,0,8.5v-1A1.5,1.5,0,0,1,1.5,6h1A1.5,1.5,0,0,1,4,7.5v1A1.5,1.5,0,0,1,2.5,10Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1A.5.5,0,0,0,3,8.5v-1A.5.5,0,0,0,2.5,7Zm1-3h-1A1.5,1.5,0,0,1,0,2.5v-1A1.5,1.5,0,0,1,1.5,0h1A1.5,1.5,0,0,1,4,1.5v1A1.5,1.5,0,0,1,2.5,4Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1A.5.5,0,0,0,3,2.5v-1A.5.5,0,0,0,2.5,1Z"
                                        transform="translate(5)"></path>
                                </svg>
                            </div>
                            <div class="col-sm posicaoCategoria numberCat"
                                style="opacity: 1;max-width: 30px;display: inline-flex;    float: left;     margin-left: -25px !important;">
                                ${LENGTH}
                            </div>
                        </div>
                        <br />
                        <div style="text-align: center" class="switch__container"><input thisUrl="${imgURLs[k].url
        }" onchange="changeMyActiveVerticalMain($(this))" id="switch-shadow1799${RANDOM}" ${imgURLs[k].active == true ? 'checked="true"' : ""
        }
                                class="switch switch--shadow" type="checkbox" /><label style="    margin-top: 15px;"
                                for="switch-shadow1799${RANDOM}"></label></div>
                        <div onclick="removeBannerMain('${imgURLs[k].url
        }','bannersVertical', $(this))" style="margin-top: 15px" class=" deleteThis">
                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 21 21"
                                style="fill: #f6b504;margin: 9px;">
                                &gt;
                                <defs></defs>
                                <path class="a"
                                    d="M10.937,16H3.063A2.208,2.208,0,0,1,.875,13.778V2.666H.438a.444.444,0,0,1,0-.889H4.375V1.334A1.324,1.324,0,0,1,5.687,0H8.313A1.324,1.324,0,0,1,9.625,1.334v.444h3.937a.444.444,0,0,1,0,.889h-.437V13.778A2.208,2.208,0,0,1,10.937,16ZM1.75,2.666V13.778a1.325,1.325,0,0,0,1.313,1.334h7.875a1.325,1.325,0,0,0,1.313-1.334V2.666ZM5.687.889a.441.441,0,0,0-.437.445v.444h3.5V1.334A.441.441,0,0,0,8.313.889Zm3.5,11.556A.442.442,0,0,1,8.75,12V5.778a.437.437,0,1,1,.875,0V12A.441.441,0,0,1,9.188,12.445Zm-4.375,0A.441.441,0,0,1,4.375,12V5.778a.437.437,0,1,1,.875,0V12A.442.442,0,0,1,4.812,12.445Z"
                                    transform="translate(4 3)"></path>
                            </svg>
                        </div>
                    </div>
                    <div alvo="update" onclick="alteraBannerCatVerticalMain($(this))" ${imgURLs[k].url
          ? `style="background-repeat: no-repeat;background-repeat: no-repeat !important; background-position: center; zoom: 80%; min-height: 490px; width: calc(100% - 100px); float: right; background: url(${imgURLs[k].url})"`
          : ""
        }   class="borderRightVertical">
                    </div>
                    <button  style="margin-top: 50px;" onclick="modalAlteraLinks($(this))" class="botaoParaLink">Alterar Link</button>
                </div>`;
    }
    return { html: html, total: counter };
  } else {
    return { html: "", total: counter };
  }
}

function alteraBannerCat(elemento) {
  let newID = Math.random().toFixed(5)?.replace(/./g, "_");
  elemento.attr("id", newID);
  $("#pegaBannerCat").attr("target", newID);
  $("#pegaBannerCat").click();
}
function alteraBannerCatMain(elemento) {
  let newID = Math.random().toFixed(5)?.replace(/./g, "_");
  elemento.attr("id", newID);
  $("#pegaBannerCatMain").attr("target", newID);
  $("#pegaBannerCatMain").click();
}
function alteraBannerCatVerticalMain(elemento) {
  let newID = Math.random().toFixed(7)?.replace(/./g, "_");
  elemento.attr("id", newID);
  $("#pegaBannerCatVerticalMain").attr("target", newID);
  $("#pegaBannerCatVerticalMain").click();
}

function alteraBannerCatVertical(elemento) {
  let newID = Math.random().toFixed(7)?.replace(/./g, "_");
  elemento.attr("id", newID);
  $("#pegaBannerCatVertical").attr("target", newID);
  $("#pegaBannerCatVertical").click();
}

function uploadBannerCat(element) {
  var data = new FormData();
  var contador = 1;
  data.append("fileimagem", element[0].files[0]);
  $.ajax({
    url: mainHost + "/uploadBanners/" + localStorage.MASTER_ID,
    headers: {
      "x-access-token": localStorage.token,
      master_id: localStorage.MASTER_ID,
    },
    data: data,
    processData: false,
    contentType: false,
    type: "PUT",
    success: function (data) {
      //  console.log(data)
      // console.log('o alvo -> ',$("#"+element.attr("target")).attr("alvo"))

      if ($("#" + element.attr("target")).attr("alvo") == "novo") {
        let elementoNew = $("#listaBannersCatInactive");
        elementoNew.append(
          getBannerInner(
            [
              {
                active: false,
                url: data.path?.replace(
                  "./public",
                  "http://localhost:6060"
                ),
              },
            ],
            false
          ).html
        );
      } else {
        $("#" + element.attr("target")).css(
          "background",
          `url(${data.path?.replace(
            "./public",
            "http://localhost:6060"
          )})`
        );
        $("#" + element.attr("target")).css(
          "background-size",
          "cover !important"
        );
        $("#" + element.attr("target")).css(
          "background-position",
          "center !important"
        );
        $("#" + element.attr("target")).css("zoom", "100% !important");
      }

      // console.log(element.parent().parent().find('input'))
      // console.log(`${data.path?.replace('./public','http://localhost:6060')}`)

      let thisCategory = localStorage.SUB_CAT_ATUAL;
      let subs = JSON.parse(localStorage.SUB_EDIT);
      for (const k in subs) {
        if (subs[k].subCategoria.trim() == thisCategory.trim()) {
          let bnn = subs[k]["banners"];
          try {
            if (bnn[0].url == undefined) {
              subs[k]["banners"] = [
                {
                  active: element.parent().parent().find("input")[0].checked,
                  url: `${data.path?.replace(
                    "./public",
                    "http://localhost:6060"
                  )}`,
                },
              ];
            } else {
              bnn.push({
                active: element.parent().parent().find("input")[0].checked,
                url: `${data.path?.replace(
                  "./public",
                  "http://localhost:6060"
                )}`,
              });
              subs[k]["banners"] = bnn;
            }
          } catch (e) {
            subs[k]["banners"] = [
              {
                active: element.parent().parent().find("input")[0].checked,
                url: `${data.path?.replace(
                  "./public",
                  "http://localhost:6060"
                )}`,
              },
            ];
          }
        }
      }
      localStorage.SUB_EDIT = JSON.stringify(subs);
    },
    error: function (data) {
      // console.log(data)
    },
  });
}

function uploadBannerCatMain(element) {
  var data = new FormData();
  var contador = 1;
  data.append("fileimagem", element[0].files[0]);
  $.ajax({
    url: mainHost + "/uploadBanners/" + localStorage.MASTER_ID,
    headers: {
      "x-access-token": localStorage.token,
      master_id: localStorage.MASTER_ID,
    },
    data: data,
    processData: false,
    contentType: false,
    type: "PUT",
    success: function (data) {
      //   console.log(data)
      //  console.log('o alvo principal -> ',$("#"+element.attr("target")).attr("alvo"))

      if ($("#" + element.attr("target")).attr("alvo") == "novo") {
        let elementoNew = $("#listaBannersCatInactive");
        elementoNew.append(
          getBannerInner(
            [
              {
                active: false,
                url: data.path?.replace(
                  "./public",
                  "http://localhost:6060"
                ),
              },
            ],
            false
          ).html
        );
      } else {
        $("#" + element.attr("target")).css(
          "background",
          `url(${data.path?.replace(
            "./public",
            "http://localhost:6060"
          )})`
        );
        $("#" + element.attr("target")).css(
          "background-size",
          "cover !important"
        );
        $("#" + element.attr("target")).css(
          "background-position",
          "center !important"
        );
        $("#" + element.attr("target")).css("zoom", "100% !important");
      }

      //    console.log(element.parent().parent().find('input'))
      //    console.log(`${data.path?.replace('./public','http://localhost:6060')}`)

      let thisCategory = localStorage.CAT_SUB_EDIT;
      let subs = JSON.parse(localStorage.MINHAS_CATEGORIAS);
      for (const k in subs) {
        if (subs[k].categoria.trim() == thisCategory.trim()) {
          if (subs[k]["subcategorie_banners"] == null) {
            subs[k]["subcategorie_banners"] = {};
          } else {
            try {
              if (subs[k]["subcategorie_banners"].banners) {
              } else {
                subs[k]["subcategorie_banners"] = JSON.parse(
                  subs[k]["subcategorie_banners"]
                );
              }
            } catch (e) {
              subs[k]["subcategorie_banners"] = JSON.parse(
                subs[k]["subcategorie_banners"]
              );
            }
          }
          let bnn = subs[k]["subcategorie_banners"]["banners"];
          try {
            if (bnn[0].url == undefined) {
              //    console.log("undefined sim")
              subs[k]["subcategorie_banners"]["banners"] = [
                {
                  active: element.parent().parent().find("input")[0].checked,
                  url: `${data.path?.replace(
                    "./public",
                    "http://localhost:6060"
                  )}`,
                },
              ];
              subs[k]["subcategorie_banners"] = JSON.stringify(
                subs[k]["subcategorie_banners"]
              );
            } else {
              //  console.log("undefined não")
              bnn.push({
                active: element.parent().parent().find("input")[0].checked,
                url: `${data.path?.replace(
                  "./public",
                  "http://localhost:6060"
                )}`,
              });
              subs[k]["subcategorie_banners"]["banners"] = bnn;
              subs[k]["subcategorie_banners"] = JSON.stringify(
                subs[k]["subcategorie_banners"]
              );
            }
          } catch (e) {
            // console.log("catch sim")
            subs[k]["subcategorie_banners"] = {};

            subs[k]["subcategorie_banners"]["banners"] = [
              {
                active: element.parent().parent().find("input")[0].checked,
                url: `${data.path?.replace(
                  "./public",
                  "http://localhost:6060"
                )}`,
              },
            ];
            subs[k]["subcategorie_banners"] = JSON.stringify(
              subs[k]["subcategorie_banners"]
            );
          }
        }
      }
      localStorage.MINHAS_CATEGORIAS = JSON.stringify(subs);
    },
    error: function (data) {
      //console.log(data)
    },
  });
}

function uploadBannerCatVertical(element) {
  var data = new FormData();
  var contador = 1;
  data.append("fileimagem", element[0].files[0]);
  $.ajax({
    url: mainHost + "/uploadBanners/" + localStorage.MASTER_ID,
    headers: {
      "x-access-token": localStorage.token,
      master_id: localStorage.MASTER_ID,
    },
    data: data,
    processData: false,
    contentType: false,
    type: "PUT",
    success: function (data) {
      //console.log(data)
      // console.log('o alvo -> ',$("#"+element.attr("target")).attr("alvo"))

      if ($("#" + element.attr("target")).attr("alvo") == "novo") {
        let elementoNew = $("#bannersVerticais");
        elementoNew.append(
          getBannerVertical(
            [
              {
                active: false,
                url: data.path?.replace(
                  "./public",
                  "http://localhost:6060"
                ),
              },
            ],
            false
          ).html
        );
      } else {
        $("#" + element.attr("target")).css(
          "background",
          `url(${data.path?.replace(
            "./public",
            "http://localhost:6060"
          )})`
        );
        $("#" + element.attr("target")).css(
          "background-size",
          "cover !important"
        );
        $("#" + element.attr("target")).css(
          "background-position",
          "center !important"
        );
        $("#" + element.attr("target")).css("zoom", "100% !important");
      }

      //  console.log(element.parent().parent().find('input'))
      //  console.log(`${data.path?.replace('./public','http://localhost:6060')}`)

      let thisCategory = localStorage.SUB_CAT_ATUAL;
      let subs = JSON.parse(localStorage.SUB_EDIT);
      for (const k in subs) {
        if (subs[k].subCategoria.trim() == thisCategory.trim()) {
          let bnn = subs[k]["bannersVertical"];
          try {
            if (bnn[0].url == undefined) {
              subs[k]["bannersVertical"] = [
                {
                  active: element.parent().parent().find("input")[0].checked,
                  url: `${data.path?.replace(
                    "./public",
                    "http://localhost:6060"
                  )}`,
                },
              ];
            } else {
              bnn.push({
                active: element.parent().parent().find("input")[0].checked,
                url: `${data.path?.replace(
                  "./public",
                  "http://localhost:6060"
                )}`,
              });
              subs[k]["bannersVertical"] = bnn;
            }
          } catch (e) {
            subs[k]["bannersVertical"] = [
              {
                active: element.parent().parent().find("input")[0].checked,
                url: `${data.path?.replace(
                  "./public",
                  "http://localhost:6060"
                )}`,
              },
            ];
          }
        }
      }
      localStorage.SUB_EDIT = JSON.stringify(subs);
    },
    error: function (data) {
      // console.log(data)
    },
  });
}

function uploadBannerCatVerticalMain(element) {
  var data = new FormData();
  var contador = 1;
  data.append("fileimagem", element[0].files[0]);
  $.ajax({
    url: mainHost + "/uploadBanners/" + localStorage.MASTER_ID,
    headers: {
      "x-access-token": localStorage.token,
      master_id: localStorage.MASTER_ID,
    },
    data: data,
    processData: false,
    contentType: false,
    type: "PUT",
    success: function (data) {
      // console.log(data)
      // console.log('o alvo pricipal -> ',$("#"+element.attr("target")).attr("alvo"))

      if ($("#" + element.attr("target")).attr("alvo") == "novo") {
        let elementoNew = $("#bannersVerticais");
        elementoNew.append(
          getBannerVertical(
            [
              {
                active: false,
                url: data.path?.replace(
                  "./public",
                  "http://localhost:6060"
                ),
              },
            ],
            false
          ).html
        );
      } else {
        $("#" + element.attr("target")).css(
          "background",
          `url(${data.path?.replace(
            "./public",
            "http://localhost:6060"
          )})`
        );
        $("#" + element.attr("target")).css(
          "background-size",
          "cover !important"
        );
        $("#" + element.attr("target")).css(
          "background-position",
          "center !important"
        );
        $("#" + element.attr("target")).css("zoom", "100% !important");
      }

      // console.log(element.parent().parent().find('input'))
      // console.log(`${data.path?.replace('./public','http://localhost:6060')}`)

      let thisCategory = localStorage.CAT_SUB_EDIT;
      let subs = JSON.parse(localStorage.MINHAS_CATEGORIAS);
      // console.log('subs',thisCategory,subs)
      for (const k in subs) {
        if (subs[k]["categoria"].trim() == thisCategory.trim()) {
          if (subs[k]["subcategorie_banners"] == null) {
            subs[k]["subcategorie_banners"] = {};
          } else {
            try {
              if (subs[k]["subcategorie_banners"].banners) {
              } else {
                subs[k]["subcategorie_banners"] = JSON.parse(
                  ajustStrigfy(subs[k]["subcategorie_banners"])
                );
              }
            } catch (e) {
              subs[k]["subcategorie_banners"] = JSON.parse(
                ajustStrigfy(subs[k]["subcategorie_banners"])
              );
            }
          }

          try {
            //  console.log('achei',subs[k])
            let bnn = subs[k]["subcategorie_banners"]["bannersVertical"];
            // console.log('achei',subs[k]['subcategorie_banners'])
            if (bnn[0].url == undefined) {
              subs[k]["subcategorie_banners"]["bannersVertical"] = [
                {
                  active: element.parent().parent().find("input")[0].checked,
                  url: `${data.path?.replace(
                    "./public",
                    "http://localhost:6060"
                  )}`,
                },
              ];
              subs[k]["subcategorie_banners"] = JSON.stringify(
                subs[k]["subcategorie_banners"]
              );
            } else {
              bnn.push({
                active: element.parent().parent().find("input")[0].checked,
                url: `${data.path?.replace(
                  "./public",
                  "http://localhost:6060"
                )}`,
              });
              subs[k]["subcategorie_banners"]["bannersVertical"] = bnn;
              subs[k]["subcategorie_banners"] = JSON.stringify(
                subs[k]["subcategorie_banners"]
              );
            }
          } catch (e) {
            //  console.log(e)
            subs[k]["subcategorie_banners"]["bannersVertical"] = [
              {
                active: element.parent().parent().find("input")[0].checked,
                url: `${data.path?.replace(
                  "./public",
                  "http://localhost:6060"
                )}`,
              },
            ];
            subs[k]["subcategorie_banners"] = JSON.stringify(
              subs[k]["subcategorie_banners"]
            );
          }
        }
      }
      localStorage.MINHAS_CATEGORIAS = JSON.stringify(subs);
    },
    error: function (data) {
      // console.log(data)
    },
  });
}

function changeMyActive(element) {
  if (element[0].checked) {
    let me = element.parent().parent().parent().parent();
    me.appendTo("#listaBannersCatActive");
    $(".listaBannersCatActive").html(
      $("#listaBannersCatActive").find("li").length +
      "/" +
      me.parent().parent().find(".itemSortable2").length
    );
    up();
  } else {
    let me = element.parent().parent().parent().parent();
    me.appendTo("#listaBannersCatInactive");

    $(".listaBannersCatInactive").html(
      $("#listaBannersCatInactive").find("li").length +
      "/" +
      me.parent().parent().find(".itemSortable2").length
    );
    up();
  }

  function up() {
    let thisCategory = localStorage.SUB_CAT_ATUAL;
    let subs = JSON.parse(localStorage.SUB_EDIT);
    for (const k in subs) {
      if (subs[k].subCategoria.trim() == thisCategory.trim()) {
        let bnn = subs[k]["banners"];
        try {
          for (const a in bnn) {
            if (bnn[a].url == element.attr("thisUrl")) {
              bnn[a].active = element[0].checked;
            }
          }
        } catch (e) {
          //   console.log(e)
        }
      }
    }
    localStorage.SUB_EDIT = JSON.stringify(subs);
  }
}

function changeMyActiveVertical(element) {
  //console.log("editando-me ...",element)

  let thisCategory = localStorage.SUB_CAT_ATUAL;
  let subs = JSON.parse(ajustStrigfy(localStorage.SUB_EDIT));
  for (const k in subs) {
    if (subs[k].subCategoria.trim() == thisCategory.trim()) {
      let bnn = subs[k]["bannersVertical"];
      try {
        for (const a in bnn) {
          if (bnn[a].url == element.attr("thisUrl")) {
            bnn[a].active = element[0].checked;
          }
        }
      } catch (e) {
        // console.log(e)
      }
    }
  }
  localStorage.SUB_EDIT = JSON.stringify(subs);
}

function changeMyActiveMain(element) {
  if (element[0].checked) {
    let me = element.parent().parent().parent().parent();
    me.appendTo("#listaBannersCatActive");
    $(".listaBannersCatActive").html(
      $("#listaBannersCatActive").find("li").length +
      "/" +
      me.parent().parent().find(".itemSortable2").length
    );
    up();
  } else {
    let me = element.parent().parent().parent().parent();
    me.appendTo("#listaBannersCatInactive");

    $(".listaBannersCatInactive").html(
      $("#listaBannersCatInactive").find("li").length +
      "/" +
      me.parent().parent().find(".itemSortable2").length
    );
    up();
  }

  function up() {
    let thisCategory = localStorage.CAT_SUB_EDIT;
    let subs = JSON.parse(localStorage.MINHAS_CATEGORIAS);
    for (const k in subs) {
      if (subs[k].categoria.trim() == thisCategory.trim()) {
        if (subs[k]["subcategorie_banners"] == null) {
          subs[k]["subcategorie_banners"] = {};
        } else {
          try {
            if (subs[k]["subcategorie_banners"].banners) {
            } else {
              subs[k]["subcategorie_banners"] = JSON.parse(
                ajustStrigfy(subs[k]["subcategorie_banners"])
              );
            }
          } catch (e) {
            subs[k]["subcategorie_banners"] = JSON.parse(
              ajustStrigfy(subs[k]["subcategorie_banners"])
            );
          }
        }
        let bnn = subs[k]["subcategorie_banners"]["banners"];
        try {
          for (const a in bnn) {
            if (bnn[a].url == element.attr("thisUrl")) {
              bnn[a].active = element[0].checked;
            }
          }
        } catch (e) {
          //    console.log(e)
        }
        subs[k]["subcategorie_banners"] = JSON.stringify(
          subs[k]["subcategorie_banners"]
        );
      }
    }

    localStorage.MINHAS_CATEGORIAS = JSON.stringify(subs);
  }
}

function changeMyActiveVerticalMain(element) {
  // console.log("editando-me ...",element) teste

  let thisCategory = localStorage.CAT_SUB_EDIT;
  let subs = JSON.parse(localStorage.MINHAS_CATEGORIAS);
  for (const k in subs) {
    if (subs[k].categoria.trim() == thisCategory.trim()) {
      if (subs[k]["subcategorie_banners"] == null) {
        subs[k]["subcategorie_banners"] = {};
      } else {
        try {
          if (subs[k]["subcategorie_banners"].bannersVertical) {
          } else {
            subs[k]["subcategorie_banners"] = JSON.parse(
              subs[k]["subcategorie_banners"]
            );
          }
        } catch (e) {
          subs[k]["subcategorie_banners"] = JSON.parse(
            ajustStrigfy(subs[k]["subcategorie_banners"])
          );
        }
      }
      let bnn = subs[k]["subcategorie_banners"]["bannersVertical"];
      try {
        for (const a in bnn) {
          if (bnn[a].url == element.attr("thisUrl")) {
            bnn[a].active = element[0].checked;
          }
        }
      } catch (e) {
        //   console.log(e)
      }
      subs[k]["subcategorie_banners"] = JSON.stringify(
        subs[k]["subcategorie_banners"]
      );
    }
  }

  localStorage.MINHAS_CATEGORIAS = JSON.stringify(subs);
}

function removeBanner(URL, table, element) {
  //  console.log("editando-me ...",element)

  let thisCategory = localStorage.SUB_CAT_ATUAL;
  let subs;
  try {
    subs = JSON.parse(localStorage.SUB_EDIT);
  } catch (e) {
    //   console.log(e)
    try {
      subs = localStorage.SUB_EDIT;
    } catch (ee) {
      //  console.log(ee)
    }
  }

  let newSubs = [];
  for (const k in subs) {
    if (subs[k].subCategoria.trim() == thisCategory.trim()) {
      let bnn = subs[k][table];
      try {
        for (const a in bnn) {
          if (bnn[a].url != URL) {
            newSubs.push(bnn[a]);
          }
        }
        subs[k][table] = newSubs;
      } catch (e) {
        //  console.log(e)
      }
    }
  }
  localStorage.SUB_EDIT = JSON.stringify(subs);
  element.parent().parent().parent().remove();
}

function removeBannerMain(URL, table, element) {
  //  console.log("editando-me ...",element)

  let thisCategory = localStorage.CAT_SUB_EDIT;
  let subs = JSON.parse(localStorage.MINHAS_CATEGORIAS);
  let newSubs = [];
  for (const k in subs) {
    if (subs[k].categoria.trim() == thisCategory.trim()) {
      if (subs[k]["subcategorie_banners"] == null) {
        subs[k]["subcategorie_banners"] = {};
      } else {
        try {
          if (subs[k]["subcategorie_banners"][table]) {
          } else {
            subs[k]["subcategorie_banners"] = JSON.parse(
              ajustStrigfy(subs[k]["subcategorie_banners"])
            );
          }
        } catch (e) {
          //console.log(e)
          subs[k]["subcategorie_banners"] = JSON.parse(
            ajustStrigfy(subs[k]["subcategorie_banners"])
          );
        }
      }
      let bnn = subs[k]["subcategorie_banners"][table];
      try {
        for (const a in bnn) {
          if (bnn[a].url != URL) {
            newSubs.push(bnn[a]);
          }
        }
        subs[k]["subcategorie_banners"][table] = newSubs;
        subs[k]["subcategorie_banners"] = JSON.stringify(
          subs[k]["subcategorie_banners"]
        );
      } catch (e) {
        // console.log(e)
      }
    }
  }
  localStorage.MINHAS_CATEGORIAS = JSON.stringify(subs);
  element.parent().parent().parent().remove();
}

function ajustStrigfy(texto) {
  texto = texto.replace(/"{/g, "{").replace(/}"/g, "}");
  texto = texto.replace('"[', "[").replace(']"', "]");
  return texto;
}
