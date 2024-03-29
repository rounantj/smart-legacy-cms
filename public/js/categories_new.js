const api_host = "http://localhost:6060";
let currentCategoryId = null,
  currentSubcategoryId = null;

let categoriesObject = {
  affiliateId: Number(localStorage.AFFILIATE_ID),
  masterId: Number(localStorage.MASTER_ID),
  limitToShow: 8,
  categories: [],
};

function deleteCategoryNew(elemento, idCat, idSub) {
  if (idSub || idSub == 0) {
    const index = categoriesObject.categories
      .find((a) => Number(a.id) === Number(idCat))
      .subcategories.findIndex((x) => Number(x.id) === Number(idSub));
    console.log("O Index", index);
    if (index || index == 0) {
      categoriesObject.categories
        .find((a) => Number(a.id) === Number(idCat))
        .subcategories.splice(index, 1);
    }
  } else {
    const index = categoriesObject.categories.findIndex(
      (x) => Number(x.id) === Number(idCat)
    );
    console.log("O Index", index);
    if (index || index == 0) {
      categoriesObject.categories.splice(index, 1);
    }
  }
  console.log("removing category", categoriesObject);
  showCategories();
}
function duplicateCategoryNew(elemento, idCat, idSub) {
  let alertar = false,
    newId = null;
  if (idSub || idSub == 0) {
    const exists = categoriesObject.categories
      .find((a) => Number(a.id) === Number(idCat))
      .subcategories.find((x) => Number(x.id) === Number(idSub));
    console.log("O exists", exists);
    if (exists) {
      categoriesObject.categories
        .find((a) => Number(a.id) === Number(idCat))
        .subcategories.push({
          ...exists,
          id: categoriesObject.categories[
            Number(idCat)
          ].subcategories.length.toString(),
        });
      newId =
        categoriesObject.categories[
          Number(idCat)
        ].subcategories.length.toString();
      alertar = true;
    }
  } else {
    const exists = categoriesObject.categories.find(
      (x) => Number(x.id) === Number(idCat)
    );
    console.log("O exists", exists);
    if (exists) {
      alertar = true;
      categoriesObject.categories.push({
        ...exists,
        id: categoriesObject.categories.length.toString(),
      });
      newId = categoriesObject.categories.length.toString();
    }
  }
  newId = Number(newId) - 1;
  console.log("duplicate category", categoriesObject);
  showCategories();
  if (alertar) {
    setTimeout(() => {
      let alvo =
        idSub || idSub == 0
          ? ".destaque-" + idCat + "-" + newId
          : ".destaque-" + newId;
      destaque(
        alvo,
        "Duplicamos a sua categoria!",
        "Agora pode editá-la com o mesmo conteúdo da original. \nLembre-se de salvar as alterações ao terminar!"
      );
    }, 1000);
  }
}
function flagCategoryNew(elemento, idCat, idSub) {
  if (idSub || idSub == 0) {
    console.log("sub...");
    const exists = categoriesObject.categories
      .find((a) => Number(a.id) === Number(idCat))
      .subcategories.find((x) => Number(x.id) === Number(idSub));
    console.log("O exists", exists);
    if (exists) {
      categoriesObject.categories
        .find((a) => Number(a.id) === Number(idCat))
        .subcategories.map((x) => {
          if (Number(x.id) === Number(idSub)) {
            x.active = elemento[0].checked;
          }
        });
    }
  } else {
    console.log("cat...");
    const exists = categoriesObject.categories.find(
      (x) => Number(x.id) === Number(idCat)
    );
    console.log("O exists", exists);
    if (exists) {
      categoriesObject.categories.map((x) => {
        if (Number(x.id) === Number(idCat)) {
          x.active = elemento[0].checked;
        }
      });
    }
  }
  console.log("flaging category", categoriesObject);
}

getCategories();

class Category {
  id = 0;
  title = "";
  metatitle = "";
  keywords = [];
  description = "";
  icon = "";
  active = true;
  banners = {
    default: [],
    asideMenu: [],
  };
  subcategories = [];
  constructor(id) {
    this.id = id;
  }
}
function editCategoryField(
  cat,
  id,
  field,
  newValue,
  idSub,
  subField,
  newValueSub
) {
  if (cat) {
    if (field !== "banners" && field !== "subcategories") {
      let currCategory = categoriesObject.categories.find(
        (dt) => Number(dt.id) === Number(id)
      );
      if (field === "keywors") {
        console.log("keywords for cats");
        let exists = currCategory[field].find((a) => a === newValue);
        if (!exists) {
          currCategory[field].push(newValue);
        } else {
          console.log("Value '" + newValue + "' alread exists!");
        }
      } else {
        currCategory[field] = newValue;
      }
      for (const k in categoriesObject.categories) {
        if (Number(categoriesObject.categories[k].id) === Number(id)) {
          categoriesObject.categories[k] = currCategory;
        }
      }
    } else {
      console.log("Not changes this from here...");
    }
  } else {
    if (subField !== "banners" && subField !== "subcategories") {
      let currSubCategory = categoriesObject.categories
        .find((a) => Number(a.id) === Number(id))
        .subcategories.find((dt) => Number(dt.id) === Number(idSub));

      if (subField === "keywors") {
        console.log("keywords for subs");
        let exists = currSubCategory[subField].find((a) => a === newValueSub);
        if (!exists) {
          currSubCategory[subField].push(newValueSub);
        } else {
          console.log("Value '" + newValueSub + "' alread exists!");
        }
      } else {
        currSubCategory[subField] = newValueSub;
      }
      for (const k in categoriesObject.categories) {
        if (categoriesObject.categories[k].id === id) {
          for (const a in categoriesObject.categories[k].subcategories) {
            if (categoriesObject.categories[k].subcategories[a].id === idSub) {
              categoriesObject.categories[k].subcategories[a] = currSubCategory;
            }
          }
        }
      }
    } else {
      console.log("Not changes this from here...");
    }
  }
  console.log(categoriesObject);
}
function setBanners(cat, id, newValue, idSub, newValueSub) {
  if (cat) {
    let currCategory = categoriesObject.categories.find((dt) => dt.id === id);
    let exists = currCategory[field].find((dt) => dt.url === newValue);
    if (!exists) {
      currCategory[field].push({
        id: currCategory[field].length,
        url: newValue,
      });
    } else {
      for (const k in currCategory[field]) {
        if (currCategory[field].id === id) {
          currCategory[field].url = newValue;
        }
      }
    }
    for (const k in categoriesObject.categories) {
      if (categoriesObject.categories[k].id === id) {
        categoriesObject.categories[k] = currCategory;
      }
    }
  } else {
    let currCategory = categoriesObject.categories.find((dt) => dt.id === id);
    let currSubCategory = currCategory.subcategories.find(
      (dt) => dt.id === idSub
    );
    let exists = currSubCategory[field].find((dt) => dt.url === newValueSub);
    if (!exists) {
      currSubCategory[field].push({
        id: currSubCategory[field].length,
        url: newValueSub,
      });
    } else {
      for (const k in currSubCategory[field]) {
        if (currSubCategory[field].id === idSub) {
          currSubCategory[field].url = newValueSub;
        }
      }
    }
    for (const k in categoriesObject.categories) {
      if (categoriesObject.categories[k].id === id) {
        for (const a in categoriesObject.categories[k].subcategories) {
          if (categoriesObject.categories[k].subcategories[a].id === idSub) {
            categoriesObject.categories[k].subcategories[a] = currSubCategory;
          }
        }
      }
    }
  }
}
class Subcategory {
  id = 0;
  title = "";
  keywords = [];
  description = "";
  icon = "";
  active = true;
  banners = {
    default: [],
    asideMenu: [],
  };
  subcategories = [];
  priorization = {
    smart: false,
    bestSellers: false,
    offers: false,
    personal: false,
    products: [],
  };
  constructor(id) {
    this.id = id;
  }
}
function addCategory(id) {
  console.log("adicionando sub", id);
  let newId = null,
    isSub = false,
    alertar = true;
  if (id || id === "0" || id === 0) {
    let currCategory = categoriesObject.categories.find(
      (dt) => Number(dt.id) === Number(id)
    );
    console.log("encontrei a categoria", currCategory);
    if (!currCategory.subcategories) {
      currCategory.subcategories = [];
    }
    console.log("currCat", currCategory);
    let subcategoria = new Subcategory(currCategory.subcategories.length);
    newId = currCategory.subcategories.length.toString();
    currCategory.subcategories.push(subcategoria);

    isSub = true;
    for (const k in categoriesObject.categories) {
      if (categoriesObject.categories[k].id === id) {
        categoriesObject.categories[k] = currCategory;
      }
    }
    console.log(categoriesObject);

    setTimeout(() => {
      $(".itemSortable2").each(function () {
        console.log("encontrando", $(this).attr("idCat"), id);
        if (Number($(this).attr("idCat")) === Number(id)) {
          $(this).find(".dropCategoriaContent2").click();
        }
      });
      $(function () {
        $(".superSortable").sortable({
          placeholder: "ui-state-highlight",
        });
        $(".superSortable").disableSelection();
      });
    }, 200);

    showCategories();
  } else {
    let categoria = new Category(categoriesObject.categories.length);
    newId = categoriesObject.categories.length.toString();
    categoriesObject.categories.push(categoria);
    console.log(categoriesObject);
    showCategories();
  }
  if (alertar) {
    //newId = Number(newId) - 1;
    setTimeout(() => {
      let alvo =
        id || id == 0 ? ".destaque-" + id + "-" + newId : ".destaque-" + newId;
      destaque(
        alvo,
        `Criamos a sua nova ${isSub ? "subcategoria" : "categoria"}`,
        "Agora pode editá-la como desejar! \nLembre-se de salvar as alterações ao terminar!"
      );
    }, 1000);
  }
}

function showCategories() {
  $("#listaCategoriasLoja").html("");
  $(".totalCategorias").text(categoriesObject.categories.length);
  categoriesObject.categories.forEach((cat, index) => {
    console.log("AS CAT", cat);
    $("#listaCategoriasLoja").append(categoryElementLiNew(cat, cat.id));
    console.log(cat.id, categoriesObject.limitToShow - 1);
    if (index === categoriesObject.limitToShow - 1) {
      $("#listaCategoriasLoja").append(
        `<br><br><h1 class="hiperTitle">Outras Categorias <span class="hiperTitleSub">(Exibe em "todas as categorias" no menu)</h1><hr>`
      );
    }
  });
}
async function getCategories() {
  const resultado = await $.ajax({
    type: "GET",
    url: api_host + "/categorie_find/" + localStorage.AFFILIATE_ID,
    headers: {
      "x-access-token": localStorage.token,
    },
    data: "",
  });
  console.log("O RESULTADO", resultado);
  if (!resultado || resultado.data.length === 0) {
    const criaPrimeiroAcesso = await criarPrimeiroAcesso();
    console.log("Primeiro acesso", criaPrimeiroAcesso);
  } else {
    if (Array.isArray(resultado.data)) {
      categoriesObject = resultado.data.find(
        (dt) => dt.affiliateId === Number(localStorage.AFFILIATE_ID)
      );
    } else {
      categoriesObject = resultado.data;
    }
  }
  TODAS_CATS_NEW = resultado.data[0].categories;
  sessionStorage.TODAS_CATS_NEW = JSON.stringify(TODAS_CATS_NEW);
  console.log(resultado, categoriesObject);
  showCategories();
}
async function criarPrimeiroAcesso() {
  const resultado = await $.ajax({
    type: "POST",
    url: api_host + "/categorie_create",
    headers: {
      "x-access-token": localStorage.token,
    },
    data: categoriesObject,
  });
  console.log(resultado);
}
async function publicarAlteracoes() {
  repareObjOk();
  const resultado = await $.ajax({
    type: "POST",
    url: api_host + "/categorie_update/" + localStorage.AFFILIATE_ID,
    headers: {
      "x-access-token": localStorage.token,
    },
    data: categoriesObject,
  });
  informar("success", "Alterações salvas com sucesso!", 4000);
  console.log(resultado);
}

function subcategoryElementLiNew(dado, mainId) {
  let html = "";
  console.log("as sbu ", dado, mainId);
  if (!dado || dado.length === 0) {
    return html;
  }
  let dtN = Date.now() + aleatoryIDNew();
  for (const k in dado) {
    html += `
  <li idCat="${mainId}" idSub="${dado[k].id
      }" draggable="true" class="list-sub-item nova_sub newSub itemSortable ui-sortable-handle " >
                            <div class="row"
                                style="display: flex;-ms-flex-wrap: wrap;flex-wrap: wrap;margin-right: -15px;margin-left: -15px;">
                                <span class="trilha2" style="opacity: 1;">.....</span>
                                <div class="row radius20 subCabecalho"
                                    style="margin-left: 0.2%; border: 1px solid rgb(239, 239, 239); margin-top: 1%; padding-right: 15px; min-width: 100%; background: white !important; opacity: 1;">
                                    <div style="max-width: 100px; opacity: 1; margin: 1% auto;" "showContent($(this))"
                                        class="col-sm dropCategoriaContent2">
                                        <div class="row" style="padding: 5%;">
                                            <div onclick="showContent($(this))" class="col-sm dropCategoriaContent2" style="opacity: 1;"><svg
                                                    class="iconGrid" xmlns="http://www.w3.org/2000/svg"
                                                    style="fill: #687c97;" width="13.5" height="23" viewBox="0 0 9 16">
                                                    <defs></defs>
                                                    <path class="a"
                                                        d="M2.5,16h-1A1.5,1.5,0,0,1,0,14.5v-1A1.5,1.5,0,0,1,1.5,12h1A1.5,1.5,0,0,1,4,13.5v1A1.5,1.5,0,0,1,2.5,16Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1a.5.5,0,0,0,.5-.5v-1a.5.5,0,0,0-.5-.5Zm1-3h-1A1.5,1.5,0,0,1,0,8.5v-1A1.5,1.5,0,0,1,1.5,6h1A1.5,1.5,0,0,1,4,7.5v1A1.5,1.5,0,0,1,2.5,10Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1A.5.5,0,0,0,3,8.5v-1A.5.5,0,0,0,2.5,7Zm1-3h-1A1.5,1.5,0,0,1,0,2.5v-1A1.5,1.5,0,0,1,1.5,0h1A1.5,1.5,0,0,1,4,1.5v1A1.5,1.5,0,0,1,2.5,4Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1A.5.5,0,0,0,3,2.5v-1A.5.5,0,0,0,2.5,1Z">
                                                    </path>
                                                    <path class="a"
                                                        d="M2.5,16h-1A1.5,1.5,0,0,1,0,14.5v-1A1.5,1.5,0,0,1,1.5,12h1A1.5,1.5,0,0,1,4,13.5v1A1.5,1.5,0,0,1,2.5,16Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1a.5.5,0,0,0,.5-.5v-1a.5.5,0,0,0-.5-.5Zm1-3h-1A1.5,1.5,0,0,1,0,8.5v-1A1.5,1.5,0,0,1,1.5,6h1A1.5,1.5,0,0,1,4,7.5v1A1.5,1.5,0,0,1,2.5,10Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1A.5.5,0,0,0,3,8.5v-1A.5.5,0,0,0,2.5,7Zm1-3h-1A1.5,1.5,0,0,1,0,2.5v-1A1.5,1.5,0,0,1,1.5,0h1A1.5,1.5,0,0,1,4,1.5v1A1.5,1.5,0,0,1,2.5,4Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1A.5.5,0,0,0,3,2.5v-1A.5.5,0,0,0,2.5,1Z"
                                                        transform="translate(5)"></path>
                                                </svg></div>
                                            <div class="col-sm  numberCat" style="opacity: 1;">
                                                <sp class="posicaoSubCategoriaNew">${dado[k].id
      }</sp>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm" style="opacity: 1;"><label  
                                            class="label nomeCategoria SUB_CATEGORIA">${dado[k].title
      }</label></div>
                                    <div class="col-sm opacity0" style="opacity: 1;"><label
                                            class="label totalSubCategorias">00 Subcategorias</label></div>
                                    <div class="col-sm" style="opacity: 1;">
                                        <div class="row">
                                            <div class="switch__container "
                                                style="opacity: 1;margin-top: 5%;"><input  
                                                    onchange="flagCategoryNew($(this),${mainId}, ${dado[k]?.id
      })" ${dado[k]?.active && dado?.active !== "false" ? 'checked="checked"' : ""
      }
                                                    
                                                    id="switch-shadow01234019${dtN}-${mainId}-${dado[k]?.id
      }"
                                                    class="switch switch--shadow ativa-me2" type="checkbox"><label
                                                    for="switch-shadow01234019${dtN}-${mainId}-${dado[k]?.id
      }"></label></div><label
                                                class="label catAtiva" style="opacity: 1;">Subcategoria ativa</label>
                                        </div>
                                    </div>
                                    <div class="col-sm" style="opacity: 1;">
                                        <div   onclick="modalEditSubCategories($(this), ${mainId},${dado[k].id
      })" class="input-group catEdit destaque-${mainId}-${dado[k].id}"><label
                                                style="margin: auto; color: #f6b504">Editar Subcategoria</label></div>
                                    </div>
                                    <div style="max-width: 70px; opacity: 1;" class="col-sm ">
                                        <div onclick="duplicateCategoryNew($(this), ${mainId},${dado[k].id
      })" class=" duplicate"><svg xmlns="http://www.w3.org/2000/svg"
                                                style=" fill: #f6b504;   margin: auto;" width="12" height="14"
                                                viewBox="0 0 12 14">
                                                <path id="duplicate"
                                                    d="M7.125,14H1.875A1.913,1.913,0,0,1,0,12.055v-7A1.913,1.913,0,0,1,1.875,3.111H3V1.945A1.913,1.913,0,0,1,4.874,0h4.5A.364.364,0,0,1,9.64.114l2.25,2.334a.391.391,0,0,1,.109.3v6.2a1.913,1.913,0,0,1-1.875,1.945H9v1.165A1.913,1.913,0,0,1,7.125,14ZM1.875,3.889A1.148,1.148,0,0,0,.75,5.055v7a1.148,1.148,0,0,0,1.125,1.167h5.25a1.148,1.148,0,0,0,1.124-1.167V10.89H6.374a.389.389,0,0,1,0-.778h3.75a1.148,1.148,0,0,0,1.125-1.167V3.112H9.374A.383.383,0,0,1,9,2.723V.778H4.874A1.148,1.148,0,0,0,3.75,1.945V5.833a.376.376,0,1,1-.751,0V3.889ZM9.749,1.329V2.334h.97ZM3.375,10.112A.365.365,0,0,1,3.109,10a.4.4,0,0,1,0-.55l3.86-4H5.624a.389.389,0,0,1,0-.778h2.25a.382.382,0,0,1,.375.388V7.389a.375.375,0,1,1-.75,0v-1.4L3.64,10A.365.365,0,0,1,3.375,10.112Z"
                                                    fill="#f6b504"></path>
                                            </svg></div>
                                    </div>
                                    <div style="max-width: 70px; opacity: 1;" class="col-sm">
                                        <div onclick="deleteCategoryNew($(this), ${mainId},${dado[k].id
      })" class=" deleteThis"><svg
                                                xmlns="http://www.w3.org/2000/svg" width="19" height="19"
                                                viewBox="0 0 21 21" style="fill: #f6b504;margin: 9px;">&gt;<defs></defs>
                                                <path class="a"
                                                    d="M10.937,16H3.063A2.208,2.208,0,0,1,.875,13.778V2.666H.438a.444.444,0,0,1,0-.889H4.375V1.334A1.324,1.324,0,0,1,5.687,0H8.313A1.324,1.324,0,0,1,9.625,1.334v.444h3.937a.444.444,0,0,1,0,.889h-.437V13.778A2.208,2.208,0,0,1,10.937,16ZM1.75,2.666V13.778a1.325,1.325,0,0,0,1.313,1.334h7.875a1.325,1.325,0,0,0,1.313-1.334V2.666ZM5.687.889a.441.441,0,0,0-.437.445v.444h3.5V1.334A.441.441,0,0,0,8.313.889Zm3.5,11.556A.442.442,0,0,1,8.75,12V5.778a.437.437,0,1,1,.875,0V12A.441.441,0,0,1,9.188,12.445Zm-4.375,0A.441.441,0,0,1,4.375,12V5.778a.437.437,0,1,1,.875,0V12A.442.442,0,0,1,4.812,12.445Z"
                                                    transform="translate(4 3)"></path>
                                            </svg></div>
                                    </div>
                                </div>
                            </div>
                        </li>
  `;
  }
  return html;
}
function categoryElementLiNew(dado, id) {
  console.log("dado", dado);
  return `
 <li idCat="${dado.id}" class="itemSortable2 ui-sortable-handle ">
    <div title="'null'" description="'null'" draggable="true" class="categorie vouClonar">
        <div class="row radius20 cabecalho" style="border: 1px solid #efefef; margin-top: 1%; padding-right: 2%">
            <div  onclick="showContent($(this))" style="max-width: 100px; opacity: 1; margin: 1% auto;" class="col-sm dropCategoriaContent2">
                <div class="row" style="padding: 5%;">
                    <div class="col-sm dropCategoriaContent" style="opacity: 1;"><svg class="iconGrid"
                            xmlns="http://www.w3.org/2000/svg" style="fill: #687c97;" width="13.5" height="23"
                            viewBox="0 0 9 16">
                            <defs></defs>
                            <path class="a"
                                d="M2.5,16h-1A1.5,1.5,0,0,1,0,14.5v-1A1.5,1.5,0,0,1,1.5,12h1A1.5,1.5,0,0,1,4,13.5v1A1.5,1.5,0,0,1,2.5,16Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1a.5.5,0,0,0,.5-.5v-1a.5.5,0,0,0-.5-.5Zm1-3h-1A1.5,1.5,0,0,1,0,8.5v-1A1.5,1.5,0,0,1,1.5,6h1A1.5,1.5,0,0,1,4,7.5v1A1.5,1.5,0,0,1,2.5,10Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1A.5.5,0,0,0,3,8.5v-1A.5.5,0,0,0,2.5,7Zm1-3h-1A1.5,1.5,0,0,1,0,2.5v-1A1.5,1.5,0,0,1,1.5,0h1A1.5,1.5,0,0,1,4,1.5v1A1.5,1.5,0,0,1,2.5,4Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1A.5.5,0,0,0,3,2.5v-1A.5.5,0,0,0,2.5,1Z">
                            </path>
                            <path class="a"
                                d="M2.5,16h-1A1.5,1.5,0,0,1,0,14.5v-1A1.5,1.5,0,0,1,1.5,12h1A1.5,1.5,0,0,1,4,13.5v1A1.5,1.5,0,0,1,2.5,16Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1a.5.5,0,0,0,.5-.5v-1a.5.5,0,0,0-.5-.5Zm1-3h-1A1.5,1.5,0,0,1,0,8.5v-1A1.5,1.5,0,0,1,1.5,6h1A1.5,1.5,0,0,1,4,7.5v1A1.5,1.5,0,0,1,2.5,10Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1A.5.5,0,0,0,3,8.5v-1A.5.5,0,0,0,2.5,7Zm1-3h-1A1.5,1.5,0,0,1,0,2.5v-1A1.5,1.5,0,0,1,1.5,0h1A1.5,1.5,0,0,1,4,1.5v1A1.5,1.5,0,0,1,2.5,4Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1A.5.5,0,0,0,3,2.5v-1A.5.5,0,0,0,2.5,1Z"
                                transform="translate(5)"></path>
                        </svg></div>
                    <div class="col-sm posicaoCategoriaNew numberCat" style="opacity: 1;">${dado.id
    }</div>
                </div>
            </div>
            <div style="max-width: 70px; margin: 7px auto; opacity: 1;" class="col-sm">
                <div style="max-width: 120px;" class="iconCategorie"><img style="    max-width: 30px !important;"
                        src="${"/assets/icons/" + dado.icon && dado.icon !== ""
      ? "/assets/icons/" + dado.icon
      : `/assets/icons/cliente_IconeEmbalagens.png`
    }"></div>
            </div>
            <div class="col-sm" style="opacity: 1;"><label
                    class="label nomeCategoria CATEGORIA_PRINCIPAL">${dado.title
    }</label></div>
            <div class="col-sm" style="opacity: 1;"><label class="label totalSubCategorias">${dado?.subcategories?.length ?? 0
    } Subcategorias</label>
            </div>
            <div class="col-sm" style="opacity: 1;">
                <div class="row">
                    <div class="switch__container " style="opacity: 1;margin-top: 5%;">
                    <input onchange="flagCategoryNew($(this), ${dado?.id})" ${dado?.active && dado?.active !== "false" ? 'checked="checked"' : ""
    } id="switch-shadow03101${dado?.id
    }" class="switch switch--shadow ativa-me " type="checkbox" />
                    <label
                            for="switch-shadow03101${dado?.id
    }"></label></div><label class="label catAtiva"
                        style="opacity: 1;">Categoria ativa</label>
                </div>
            </div>
            <div class="col-sm" style="opacity: 1;">
                <div  onclick="modalEditCategories($(this), '${id}')"  class="input-group catEdit destaque-${dado.id
    }"><label
                        style="margin: auto; color: #f6b504">Editar Categoria</label></div>
            </div>
            <div style="max-width: 70px; opacity: 1;" class="col-sm ">
                <div  onclick="duplicateCategoryNew($(this), ${dado?.id
    })" class=" duplicate"><svg xmlns="http://www.w3.org/2000/svg"
                        style=" fill: #f6b504;  cursor: pointer;  margin:auto;" width="12" height="14"
                        viewBox="0 0 12 14">
                        <path id="duplicate"
                            d="M7.125,14H1.875A1.913,1.913,0,0,1,0,12.055v-7A1.913,1.913,0,0,1,1.875,3.111H3V1.945A1.913,1.913,0,0,1,4.874,0h4.5A.364.364,0,0,1,9.64.114l2.25,2.334a.391.391,0,0,1,.109.3v6.2a1.913,1.913,0,0,1-1.875,1.945H9v1.165A1.913,1.913,0,0,1,7.125,14ZM1.875,3.889A1.148,1.148,0,0,0,.75,5.055v7a1.148,1.148,0,0,0,1.125,1.167h5.25a1.148,1.148,0,0,0,1.124-1.167V10.89H6.374a.389.389,0,0,1,0-.778h3.75a1.148,1.148,0,0,0,1.125-1.167V3.112H9.374A.383.383,0,0,1,9,2.723V.778H4.874A1.148,1.148,0,0,0,3.75,1.945V5.833a.376.376,0,1,1-.751,0V3.889ZM9.749,1.329V2.334h.97ZM3.375,10.112A.365.365,0,0,1,3.109,10a.4.4,0,0,1,0-.55l3.86-4H5.624a.389.389,0,0,1,0-.778h2.25a.382.382,0,0,1,.375.388V7.389a.375.375,0,1,1-.75,0v-1.4L3.64,10A.365.365,0,0,1,3.375,10.112Z"
                            fill="#f6b504"></path>
                    </svg></div>
            </div>
            <div style="max-width: 70px; opacity: 1;" class="col-sm">
                <div  onclick="deleteCategoryNew($(this), ${dado?.id
    })"   class=" deleteThis"><svg xmlns="http://www.w3.org/2000/svg"
                        width="19" height="19" viewBox="0 0 21 21" style="fill: #f6b504;margin: 9px;">&gt;<defs></defs>
                        <path class="a"
                            d="M10.937,16H3.063A2.208,2.208,0,0,1,.875,13.778V2.666H.438a.444.444,0,0,1,0-.889H4.375V1.334A1.324,1.324,0,0,1,5.687,0H8.313A1.324,1.324,0,0,1,9.625,1.334v.444h3.937a.444.444,0,0,1,0,.889h-.437V13.778A2.208,2.208,0,0,1,10.937,16ZM1.75,2.666V13.778a1.325,1.325,0,0,0,1.313,1.334h7.875a1.325,1.325,0,0,0,1.313-1.334V2.666ZM5.687.889a.441.441,0,0,0-.437.445v.444h3.5V1.334A.441.441,0,0,0,8.313.889Zm3.5,11.556A.442.442,0,0,1,8.75,12V5.778a.437.437,0,1,1,.875,0V12A.441.441,0,0,1,9.188,12.445Zm-4.375,0A.441.441,0,0,1,4.375,12V5.778a.437.437,0,1,1,.875,0V12A.442.442,0,0,1,4.812,12.445Z"
                            transform="translate(4 3)"></path>
                    </svg></div>
            </div>
            <div style="max-width: 70px; opacity: 1;" class="col-sm dropCategoriaContent">
                <div class=" deleteThis dropCategoriaButton "><svg class="seta" xmlns="http://www.w3.org/2000/svg"
                        style="fill: #fcfcfd; stroke: silver;" width="36" height="36" viewBox="0 0 36 36">
                        <g transform="translate(36 36) rotate(180)">
                            <g transform="translate(28 28) rotate(180)">
                                <g class="b">
                                    <g class="c">
                                        <circle class="e" cx="10" cy="10" r="10"></circle>
                                        <circle class="f" cx="10" cy="10" r="9.5"></circle>
                                    </g>
                                    <path class="d"
                                        d="M581.273,789.774a.82.82,0,0,1-.081-1.079l.081-.092,3.685-3.593-3.685-3.593a.82.82,0,0,1-.081-1.079l.081-.093a.849.849,0,0,1,1.094-.081l.094.081,4.279,4.179a.82.82,0,0,1,.081,1.079l-.081.093-4.279,4.179A.849.849,0,0,1,581.273,789.774Z"
                                        transform="translate(795.009 -573.615) rotate(90)"></path>
                                </g>
                            </g>
                        </g>
                    </svg></div>
            </div>
        </div>
        <div class="row radius20Bottom dropCategoria bordaDourada"
            style=" border: 1px solid #efefef; margin-top: -2px; padding-right: 2%; display:none;    background-color: #f8f9ff; max-height: 80vh">
            <div style="margin-top: 1%; width: 100%; opacity: 1;" class="row">
                <div class="col-md-12" style="opacity: 1;">
                    <div   onclick="addCategory(${dado.id})"
                        style="    z-index: 999;;cursor:pointer;border-left: 5px dotted silver;margin-left: 7%;cursor: pointer; border-radius: 20px; font: bold 1rem Roboto; background-color: rgb(246, 181, 4); max-width: 200px; height: 40px; border: 2px solid rgb(246, 181, 4); float: left; opacity: 1;"
                        class="input-group outraSubCat">
                        <div style="border: none; margin: auto;" class="input-group-append">
                            <div style="border: none; margin: auto; padding: 2%;" class="input-group-text"><svg
                                    xmlns="http://www.w3.org/2000/svg" style="margin: -20% auto 0 0; fill: white;"
                                    width="24" height="24" viewBox="0 0 24 24">
                                    <defs></defs>
                                    <path class="a"
                                        d="M10.5,21A10.5,10.5,0,0,1,3.075,3.075,10.5,10.5,0,1,1,10.5,21Zm0-20A9.5,9.5,0,1,0,20,10.5,9.511,9.511,0,0,0,10.5,1Zm0,14a.5.5,0,0,1-.5-.5V11H6.5a.5.5,0,0,1,0-1H10V6.5a.5.5,0,0,1,1,0V10h3.5a.5.5,0,1,1,0,1H11v3.5A.5.5,0,0,1,10.5,15Z"
                                        transform="translate(2 2)"></path>
                                </svg></div>
                        </div><label style="margin: -1% auto; min-width: 60%; color: white !important; cursor:pointer"
                            class="label">Nova Subcategoria</label>
                    </div>
                    <div style="border-left: 5px dotted silver;margin-left: 35px; margin-top: 1%; padding: 1%;    margin-bottom: 15px;"
                        class="col-md-12">
                        <h4 class="label" style="text-align: left ;font-size: 20px; margin-left: 1%; ">A ordem abaixo
                            reflete na ordem do menu e na página de categoria</h4>
                    </div>
                </div>
                <div class="col-md-12 verticalScroll"
                    style="max-height: 550px;margin-bottom: 20px;opacity: 1;margin-top: -12px;margin-left: 1px;">
                    <ul id="sortable" class="listInner3 dropCategoria superSortable ui-sortable" style=""> 
                     ${subcategoryElementLiNew(dado.subcategories, dado.id)}
                    </ul>
                </div>
            </div>
        </div>
    </div>
</li>
  `;
}
function OrdenaJson(lista, chave, ordem) {
  return lista.sort(function (a, b) {
    var x = a[chave];
    var y = b[chave];
    if (ordem === "ASC") {
      return x < y ? -1 : x > y ? 1 : 0;
    }
    if (ordem === "DESC") {
      return x > y ? -1 : x < y ? 1 : 0;
    }
  });
}
function reordenaListas3() {
  $(".superSortable").each(function () {
    var items = $(this).find(".itemSortable");
    var index = 1;
    items.each(function () {
      $(this).find(".posicaoSubCategoriaNew").text(index);
      index++;
    });
  });

  $(".fullSortable").each(function () {
    var items = $(this).find(".itemSortable2");
    var index = 1;
    items.each(function () {
      $(this).find(".posicaoCategoriaNew").text(index);
      index++;
    });
  });
}

function repareObjOk() {
  try {
    let categories = categoriesObject.categories;
    let newCats = [];
    $(".itemSortable2").each(function () {
      let subCats = [];
      let idCat = $(this).attr("idCat");
      let thisCat = categories.find((dt) => Number(dt.id) === Number(idCat));
      $(this)
        .find(".itemSortable")
        .each(function () {
          let idSub = $(this).attr("idSub");
          let thisSub = thisCat.subcategories.find(
            (dt) => Number(dt.id) === Number(idSub)
          );
          subCats.push(thisSub);
        });
      thisCat.subcategories = subCats;
      newCats.push(thisCat);
    });
    categoriesObject.categories = newCats;
    console.log("hroa da veradde", categoriesObject);
  } catch (err) {
    console.log(err);
  }
}

function repareObj() {
  try {
    $(".superSortable").each(function () {
      let categories = categoriesObject.categories;
      var items = $(this).find(".itemSortable");
      var index = 1;

      // if (subcategories) {
      //   subs = subcategories;
      // }

      items.each(function () {
        var subs = [];

        let idCat = $(this).attr("idCat");

        console.log("idCat", idCat[0]);
        let subcategories = categories.find(
          (dt) => Number(dt.id) === Number(idCat)
        ).subcategories;

        let idSub = $(this).attr("idSub");
        console.log("ID ", Number(idSub));
        let thisSub = subcategories.find(
          (dt) => Number(dt.id) === Number(idSub)
        );
        console.log(subcategories, thisSub);
        if (thisSub) {
          thisSub.id = (index - 1).toString();
          subs.push(thisSub);
        }

        $(this).find(".posicaoSubCategoriaNew").text(index);
        index++;
        for (const k in categoriesObject.categories) {
          if (Number(categoriesObject.categories[k].id) === Number(idCat)) {
            categoriesObject.categories[k].subcategories = subs;
          }
        }
      });
    });
    let cats = [];
    $(".fullSortable").each(function () {
      var items = $(this).find(".itemSortable2");
      let categories = categoriesObject.categories;
      var index = 1;

      items.each(function () {
        let idCat = $(this).attr("idCat");
        let thisCat = categories.find((dt) => Number(dt.id) === Number(idCat));
        thisCat.id = (index - 1).toString();
        cats.push(thisCat);
        $(this).find(".posicaoCategoriaNew").text(index);
        index++;
      });
    });
    categoriesObject.categories = cats;

    categoriesObject.categories = OrdenaJson(
      categoriesObject.categories,
      "id",
      "ASC"
    );
    for (const k in categoriesObject.categories) {
      categoriesObject.categories[k].subcategories = OrdenaJson(
        categoriesObject.categories[k].subcategories,
        "id",
        "ASC"
      );
    }
  } catch (er) {
    console.log("ERRO => ", er);
  }
}

setTimeout(() => {
  try {
    reordenaListas3();
  } catch (err) {
    console.log(err);
  }
}, 5000);

function showContent(element) {
  if (
    element.attr("dropado") == "nao" ||
    element.attr("dropado") == undefined
  ) {
    element.parent().parent().find(".cabecalho").removeClass("radius20");
    element.parent().parent().find(".cabecalho").addClass("radius20Top");
    element.parent().parent().find(".cabecalho").addClass("bordaDourada");
    $(".seta").removeClass("rotate180");
    element.parent().parent().find(".seta").addClass("rotate180");

    element.attr("dropado", "sim");
    element.parent().parent().find(".dropCategoria").show();
  } else {
    element.parent().parent().find(".cabecalho").removeClass("radius20Top");
    element.parent().parent().find(".cabecalho").addClass("radius20");
    element.parent().parent().find(".cabecalho").removeClass("bordaDourada");
    element.attr("dropado", "nao");
    element.parent().parent().find(".dropCategoria").hide();
    element.parent().parent().find(".seta").removeClass("rotate180");
  }
}

function modalEditCategories(element, catId) {
  element = element.parent().parent().parent();
  console.log("a id", catId, Number(catId), categoriesObject);

  var categoria = categoriesObject.categories.find(
    (x) => Number(x.id) === Number(catId)
  );
  console.log("CATEGORIA SELECIONADA", categoria);
  let BANNERS = categoria?.banners ?? [];
  console.log("BANNERS", BANNERS);
  let asWords = WordKeysNew(categoria?.keywords ?? [], categoria.id);

  var html =
    '<div style="max-width:100% " class="container">' +
    '<div class="row" style="max-width: 90%;margin: -11px auto;border-bottom: 2px solid #EDF2F6;margin-bottom: 10px; ">' +
    '<div content="caracteristicas" class="col-md tabModal tabModalActive">' +
    '<label class="labelTab"  style="text-align:center">Características</label>' +
    "</div>" +
    '<div content="banners" class="col-md tabModal">' +
    '<label class="labelTab"  style="text-align:center">Banners</label>' +
    "</div>" +
    '<div content="icone" class="col-md tabModal">' +
    '<label class="labelTab"  style="text-align:center">Ícone</label>' +
    "</div>" +
    '<div class="col-md">' +
    '<div onclick="CANCELA_EDIT()" style="cursor:pointer;border-radius: 20px; font: normal normal bold 1rem Roboto; background-color: #ffffff; max-width: 200px; height: 40px; border: 2px solid #f6b504; float: right; margin:5% auto" class="input-group">' +
    '<label  style="cursor:pointer;margin:-5%  auto;text-align: center;    min-width: 60%;color: #f6b504 !important; font-size: 1.2rem" class="label">Cancelar</label>' +
    "</div>" +
    "</div>" +
    '<div class="col-md ">' +
    '<div onclick="SALVA_EDIT_NEW()" style="cursor:pointer;border-radius: 20px; font: normal normal bold 1rem Roboto; background-color: #f6b504; max-width: 200px; height: 40px; border: 2px solid #f6b504; float: left; margin:5% auto" class="input-group">' +
    '<label  style="cursor:pointer;margin: -5% auto;text-align: center;    min-width: 60%; color: white !important; font-size: 1.2rem" class="label">Salvar</label>' +
    "</div>" +
    "</div>" +
    "</div>" +
    '<hr class="baixoCabecalho" style="position: fixed;top: 115px !important;left: 0px !important;width: 100%;box-shadow: 2px 2px 2px silver;"></hr>' +
    //======================================================ABA DE BANNERS==================================================================================================================

    `<div id="banners" style="max-width:90% ; margin-top: 2%; display:none" class="container tabContent">
        <input alvo="novo" onchange="uploadBannerCatMainNew($(this), ${categoria.id
    })" type="file" id="pegaBannerCatMain" style="display:none">
        <input alvo="novo" onchange="uploadBannerCatVerticalMainNew($(this), ${categoria.id
    })" type="file" id="inputColetor" style="display:none">
            <section class="areaBanner verticalScroll">
                <div class="row">
                    <div style="margin: 1% 2%;" class="switch__container"><input checked="true" id="switch-shadow1777"
                            class="switch switch--shadow" type="checkbox" /><label style="    margin: 10px 0px 0px 20px;"
                            for="switch-shadow1777"></label></div>
                    <label style="font-size: 20px;" class="label">Página de categoria</label>
                    <p class="txtDescreve">/Formato recomendado: 000px X 000px</p>
                </div>
                <div alvo="novo" style="cursor:pointer" onclick="coletaBannerMain1($(this), ${categoria.id
    })" class="areaDropDot">
                    <div class="iconeDrop9">
                        <svg id="_01_Icons_Line_upload" data-name="01) Icons / Line /  upload"
                            xmlns="http://www.w3.org/2000/svg" width="25" height="27" viewBox="0 0 25 27">
                            <path id="upload"
                                d="M21.323,27H3.677A3.718,3.718,0,0,1,0,23.25v-4.5A.744.744,0,0,1,.736,18a.744.744,0,0,1,.735.751v4.5A2.231,2.231,0,0,0,3.677,25.5H21.323a2.231,2.231,0,0,0,2.206-2.25v-4.5a.735.735,0,1,1,1.47,0v4.5A3.718,3.718,0,0,1,21.323,27ZM12.5,19.5a.743.743,0,0,1-.735-.749V2.562L7.138,7.282a.729.729,0,0,1-.519.22.719.719,0,0,1-.191-.026.742.742,0,0,1-.52-.531A.758.758,0,0,1,6.1,6.22l5.882-6a.726.726,0,0,1,1.042,0l5.882,6a.758.758,0,0,1,.191.725.742.742,0,0,1-.52.531.72.72,0,0,1-.191.026.729.729,0,0,1-.519-.22L13.235,2.562V18.751A.743.743,0,0,1,12.5,19.5Z"
                                fill="#f3b306" />
                        </svg>
                    </div>
                    <p class="descreveDrop">Arraste as imagens aqui</p>
                    <div style="margin: -90px auto;text-align: center;">
                        <p class="txtOu9">|<br>ou<br>|</p>
                    </div>
                    <div class="btnDrop9">
                        <p class="txtBtnDrop9">Selecione do seu computador</p>
                    </div>
                </div>
                <div class="descBanner8">
                    Banners ativos
                    <div class="btnQtdBanner">
                        <p class="txtQtdBanner listaBannersCatActive">${getBannerInnerMainNew(
      BANNERS?.default,
      true,
      categoria.id,
      null,
      categoria.id
    ).total
    }/${BANNERS?.default?.length ? BANNERS?.default?.length : 0
    }</p>
                    </div>
                </div>
                <ul id="listaBannersCatActive" style="list-style: none;" class=" superSortable fullSortable ui-sortable">
                ${getBannerInnerMainNew(
      BANNERS?.default,
      true,
      categoria.id,
      null,
      categoria.id
    ).html
    }
                   
                </ul>
                
            
                <div class="descBanner8">
                    Banners desativados
                    <div class="btnQtdBanner">
                        <p class="txtQtdBanner listaBannersCatInactive">${getBannerInnerMainNew(
      BANNERS?.default,
      "false",
      categoria.id,
      null,
      categoria.id
    ).total
    }/${BANNERS?.default?.length ? BANNERS?.default?.length : 0
    }</p>
                    </div>
                </div>
                <ul id="listaBannersCatInactive" style="list-style: none;" class=" superSortable fullSortable ui-sortable">
                ${getBannerInnerMainNew(
      BANNERS?.default,
      "false",
      categoria.id,
      null,
      categoria.id
    ).html
    }
                   
                </ul>
                
            
                <div  style="display:none" class="descBanner8">
                    Menu de categorias
                    <div class="btnQtdBanner">
                        <p class="txtQtdBanner">1/1</p>
                    </div>
                </div>
                <div class="descBanner8">
                    Banner de menu                  
                </div>
                <hr/>
                <div alvo="novo"  style="cursor:pointer" onclick="coletaBannerVertical($(this), ${categoria.id
    })" class="areaDropDot">
                    <div class="iconeDrop9">
                        <svg id="_01_Icons_Line_upload" data-name="01) Icons / Line /  upload"
                            xmlns="http://www.w3.org/2000/svg" width="25" height="27" viewBox="0 0 25 27">
                            <path id="upload"
                                d="M21.323,27H3.677A3.718,3.718,0,0,1,0,23.25v-4.5A.744.744,0,0,1,.736,18a.744.744,0,0,1,.735.751v4.5A2.231,2.231,0,0,0,3.677,25.5H21.323a2.231,2.231,0,0,0,2.206-2.25v-4.5a.735.735,0,1,1,1.47,0v4.5A3.718,3.718,0,0,1,21.323,27ZM12.5,19.5a.743.743,0,0,1-.735-.749V2.562L7.138,7.282a.729.729,0,0,1-.519.22.719.719,0,0,1-.191-.026.742.742,0,0,1-.52-.531A.758.758,0,0,1,6.1,6.22l5.882-6a.726.726,0,0,1,1.042,0l5.882,6a.758.758,0,0,1,.191.725.742.742,0,0,1-.52.531.72.72,0,0,1-.191.026.729.729,0,0,1-.519-.22L13.235,2.562V18.751A.743.743,0,0,1,12.5,19.5Z"
                                fill="#f3b306" />
                        </svg>
                    </div>
                    <p class="descreveDrop">Arraste as imagens aqui</p>
                    <div style="margin: -90px auto;text-align: center;">
                        <p class="txtOu9">|<br>ou<br>|</p>
                    </div>
                    <div class="btnDrop9">
                        <p class="txtBtnDrop9">Selecione do seu computador</p>
                    </div>
                </div>
                <div id="bannersVerticais">
               ${getBannerVerticalMainNew(
      BANNERS?.asideMenu,
      1,
      categoria.id,
      null,
      categoria.id
    ).html
    }
                 </div>
            </section>
        </div>` +
    //======================================================ABA DE ICONES==================================================================================================================
    '<div id="icone" style="max-width:90% ; margin-top: 5%; display:none"  class="container tabContent">' +
    '<div class="row">' +
    '<div style="    overflow: auto;max-height: 75vh;" class="col-md-8">' +
    '<h3 class="tituloIcone">Ícones Smartcomerci</h3>' +
    '<div class="row">' +
    '<div  sugestao="todos" class="categoriaIcone">' +
    '<label onclick="labelIcones($(this))" class="labelIcones labelIconesActive">Todos</label>' +
    "</div>" +
    '<div sugestao="frutas" class="categoriaIcone">' +
    '<label onclick="labelIcones($(this))" class="labelIcones" >Frutas</label>' +
    "</div>" +
    '<div sugestao="acougue" class="categoriaIcone">' +
    '<label onclick="labelIcones($(this))" class="labelIcones" >Açougue</label>' +
    "</div>" +
    '<div sugestao="padaria" class="categoriaIcone">' +
    '<label onclick="labelIcones($(this))" class="labelIcones" >Padaria</label>' +
    "</div>" +
    '<div sugestao="outros" class="categoriaIcone">' +
    '<label onclick="labelIcones($(this))" class="labelIcones" >Outros</label>' +
    "</div>" +
    "</div>" +
    '<div  style="margin-top: 3%;" class="row">' +
    nossosIcones(categoria) +
    "</div><br><hr>" +
    '<h3 class="tituloIcone">Todos os ícones disponíveis</h3>' +
    '<div  style="margin-top: 3%;" class="row iconesClientes">' +
    nossosIcones2(categoria) +
    "</div>" +
    "</div>" +
    '<div class="col-md-4 areaDropIcon">' +
    '<h3 class="tituloIcone">Suba seu próprio ícone</h3>' +
    '<h5 class="subTitleIcons">Formato recomendado:<br> SVG ou PNG 50px X 50px</h5>' +
    '<div style="margin: auto 0 !important;" class="col-md-8 areaDrop">' +
    '<img onclick="uploadIcone()" class="imageThumb" src="images/products/upload.svg" />' +
    '<h3 class="arraste">Arraste o ícone aqui</h3>' +
    '<h3 class="ou">-ou-</h3>' +
    '<div  onclick="uploadIcone()" class="input-group btnDropPC2"><label class="label">Selecione do seu computador</label></div>' +
    '</div><input class="upIcon" id="upIcon" style="display:none" type="file">' +
    "</div>" +
    "</div>" +
    "</div>" +
    //======================================================ABA CARACTERISTICAS==================================================================================================================
    '<div id="caracteristicas" style="max-width:70% ; height: 75vh; margin-top: 2%"  class="container tabContent verticalScroll notScroll">' +
    '<div  class="col-md-12 " style="margin-top: 3% !important; background: white !important">' +
    '<div style="padding:0 2%; margin-top: 2%; border: none !important" class="row">' +
    '<div style="margin: 18px 2%;" class="switch__container">' +
    "<input " +
    (categoria.active && categoria.active !== "false" ? 'checked="true"' : "") +
    ` id="switch-shadow18" class="switch switch--shadow" type="checkbox" onchange="editCategoryField(true, ${categoria.id},'active',$(this)[0].checked )" />` +
    '<label for="switch-shadow18"></label>' +
    "</div>" +
    '<label style=" font-size: 20px;" class="label">Categoria ativa</label> ' +
    "</div>" +
    '<div style="padding:0 2%" class="row">' +
    '<div class="col-md-12">' +
    '<label style=" font-size: 20px;" class="label">Nome da categoria</label><br> ' +
    "</div>" +
    "</div>" +
    '<div style="padding:0 2%" class="row">' +
    '<div class="col-md-12">' +
    `<div class="group-input2"  style="background: #F0F0F0 0% 0% no-repeat padding-box;border: 1px solid #EFEFEF;border-radius: 5px;"><input  style="background: none" class="form-control inputProduct"  fieldName="affiliate_categorie_name"  
    onchange="editCategoryField(true, ${categoria.id
    },'title',$(this).val() )" placeholder="Categoria genial" id="${aleatoryID()}'" value="${categoria.title
    }"></div><br>` +
    "</div>" +
    "</div><br><hr><br>" +
    '<div style="padding:0 2%" class="row">' +
    '<div class="col-md-12">' +
    '<h3 style=" font-size: 20px;" class="SEO">SEO</h3><br> ' +
    "</div>" +
    "</div>" +
    '<div style="padding:0 2%;    margin-top: -3%;" class="row">' +
    '<div class="col-md-12 container">' +
    '<label style=" font-size: 20px;" class="label labelContent">Você pode preencher os campos relacionados ao SEO e ajudar no resultado das buscas realizadas no Google, Bing, Yahoo, entre outros.</label><br> ' +
    "</div>" +
    "</div><br><br>" +
    '<div style="padding:0 2%" class="row">' +
    '<div class="col-md-12">' +
    '<label style=" font-size: 20px;" class="label">Título da categoria (meta title)</label><br> ' +
    "</div>" +
    "</div>" +
    '<div style="padding:0 2%" class="row">' +
    '<div class="col-md-12">' +
    `<div class="group-input2"  style="background: #F0F0F0 0% 0% no-repeat padding-box;border: 1px solid #EFEFEF;border-radius: 5px;"><input fieldName="categorie_title" 
    onchange="editCategoryField(true, ${categoria.id
    },'metatitle',$(this).val() )" value="${categoria.metatitle}"
    style="background: none" class="form-control inputProduct" placeholder="No Kalimera você encontra tudo em frutas"  
    id="${aleatoryID()}" ></div><br>` +
    "</div>" +
    "</div><br><br>" +
    '<div style="padding:0 2%" class="row">' +
    '<div class="col-md-12">' +
    '<label style=" font-size: 20px;" class="label">Descrição completa (meta description)</label><br> ' +
    "</div>" +
    "</div>" +
    '<div style="padding:0 2%" class="row">' +
    '<div class="col-md-12">' +
    '<div class="group-input2"  style="padding: 1%;background: #F0F0F0 0% 0% no-repeat padding-box;border: 1px solid #EFEFEF;border-radius: 5px;"><textarea fieldName="categorie_description"  id="' +
    aleatoryID() +
    `" onchange="editCategoryField(true, ${categoria.id},'description',$(this).val() )"  
     value="${categoria.description}" placeholder="Frutas no Kalimera. Compre online, limão, tangerina, kiwi e muitas outras frutas com os melhores preços e fretegratis."  style="background: #EFEFEF; border:none; font-size: 1.3rem; max-height: 100%" rows="3"   
     class="form-control">${categoria.description}</textarea>" ` +
    "</div>" +
    "</div>" +
    "</div><br><br>" +
    '<div style="padding:0 2%" class="row">' +
    '<div class="col-md-12">' +
    '<label style=" font-size: 20px;" class="label">Palavras Chaves (meta keywords)</label><br> ' +
    "</div>" +
    "</div>" +
    '<div style="padding:0 2%" class="row">' +
    '<div class="col-md-12">' +
    '<div class="listaPalavrasKey  notScroll verticalScroll contentEditable="true" placeholder="digite aqui e aperte enter..." class="group-input2"  style="padding: 1%;background: #F0F0F0 0% 0% no-repeat padding-box;border: 1px solid #EFEFEF;border-radius: 5px; min-height: 150px !important;">' +
    '<div><input categorie_name="' +
    categoria.title +
    '" type="text" fieldName="categorie_key_words" container="listaPalavrasKey" onkeydown="addWordKeyNew($(this), ' +
    categoria.id +
    ', null, this)" class="form-control entraPalavra" placeholder="Digite sua palavra aqui e pressione enter..." style="border: none; font-size: 1.3rem;height: auto; width: 90%;"/></div>' +
    asWords +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>";

  bootbox.alert({
    message: html,
    onShow: function () {
      $(".tabModal").click(function () {
        $(".tabModal").removeClass("tabModalActive");
        $(this).addClass("tabModalActive");
        $(".tabContent").hide();
        //////console.log("#" + $(this).attr("content"));
        $("#" + $(this).attr("content")).fadeIn();
      });
      $(".categoriaIcone").click(function () {
        var sugestao = $(this).attr("sugestao");
        $(".boxIconDefault").each(function () {
          if ($(this).attr("dica") == sugestao) {
            $(this).show();
          } else {
            $(this).hide();
          }
        });
        if (sugestao == "todos") {
          $(".boxIconDefault").show();
        }
      });
      $("#upIcon").change(function () {
        ////console.log("peguei")
        sobeIcone($("#upIcon"));
      });

      $(".fa-times-circle").click(function () {
        $(this).parent().parent().remove();
      });

      $(".hiperTitle").each(function () {
        $(this).removeClass("ui-sortable-handle");
      });
    },
    callback: function () {
      sessionStorage.PALAVRAS_KEY = "";
    },
  });
  $(".modal-footer").hide();
}
function modalEditSubCategories(element, idCat, idSub) {
  console.log("ME ACIONOU");
  let textElement = element.parent().parent().find(".SUB_CATEGORIA");

  var categoria = categoriesObject.categories.find(
    (x) => Number(x.id) === Number(idCat)
  );
  var subcategoria = categoria.subcategories.find(
    (x) => Number(x.id) === Number(idSub)
  );
  console.log("CATEGORIA SELECIONADA", categoria);
  console.log("SBCATEGORIA SELECIONADA", subcategoria);

  var smart = subcategoria?.priorization?.smart,
    ofertas = subcategoria?.priorization?.offers,
    title = subcategoria?.tittle,
    description = subcategoria?.description,
    key_words = subcategoria?.keywords ?? [],
    maisVendidos = subcategoria?.priorization?.bestSellers,
    personalizada = subcategoria?.priorization?.personal;
  let asWords = WordKeysNew(key_words ?? [], categoria.id, subcategoria.id);
  var activeOrNot = " ";
  if (
    subcategoria?.active === true ||
    subcategoria?.active == 1 ||
    subcategoria?.active === "true"
  ) {
    activeOrNot = ' checked="true" ';
  }

  var html =
    '<div style="max-width:100% " class="container">' +
    '<div class="row" style="box-shadow: 0px 3px 5px #6A6A6A08; max-width: 90%; margin:auto  ;   border-bottom: 2px solid #EDF2F6; ">' +
    '<div content="caracteristicas" class="col-md tabModal tabModalActive">' +
    '<label class="labelTab"  style="text-align:center">Características</label>' +
    "</div>" +
    '<div content="banners" class="col-md tabModal">' +
    '<label class="labelTab"  style="text-align:center">Banners</label>' +
    "</div>" +
    '<div content="priorizacao" class="col-md tabModal">' +
    '<label class="labelTab"  style="text-align:center">Priorização</label>' +
    "</div>" +
    '<div class="col-md">' +
    '<div onclick="CANCELA_EDIT()" style="cursor:pointer;border-radius: 20px; font: normal normal bold 1rem Roboto; background-color: #ffffff; max-width: 200px; height: 40px; border: 2px solid #f6b504; float: right; margin:10% auto" class="input-group">' +
    '<label  style="cursor:pointer;margin:-5%  auto;text-align: center;    min-width: 60%;color: #f6b504 !important; font-size: 1.2rem" class="label">Cancelar</label>' +
    "</div>" +
    "</div>" +
    '<div class="col-md ">' +
    '<div onclick="SALVA_EDIT_NEW()" style="cursor:pointer;border-radius: 20px; font: normal normal bold 1rem Roboto; background-color: #f6b504; max-width: 200px; height: 40px; border: 2px solid #f6b504; float: left; margin:10% auto" class="input-group">' +
    '<label  style="cursor:pointer;margin: -5% auto;text-align: center;    min-width: 60%; color: white !important; font-size: 1.2rem" class="label">Salvar</label>' +
    "</div>" +
    "</div>" +
    "</div>" +
    //======================================================ABA DE BANNERS==================================================================================================================

    `<div id="banners" style="max-width:90% ; margin-top: 2%; display:none" class="container tabContent">
        <input onchange="uploadBannerCatMainNew($(this), ${categoria.id},${subcategoria.id
    })" type="file" id="pegaBannerCatMainSub" style="display:none">
        <input onchange="uploadBannerCatVerticalMainNew($(this), ${categoria.id
    },${subcategoria.id
    })" type="file" id="inputColetorSub" style="display:none">
            <section class="areaBanner verticalScroll">
                <div class="row">
                    <div style="margin: 1% 2%;" class="switch__container"><input id="switch-shadow1777"
                            class="switch switch--shadow" type="checkbox" /><label style="    margin: 10px 0px 0px 20px;"
                            for="switch-shadow1777"></label></div>
                    <label style="font-size: 20px;" class="label">Página de categoria</label>
                    <p class="txtDescreve">/Formato recomendado: 000px X 000px</p>
                </div>
                <div alvo="novo" style="cursor:pointer" onclick="coletaBannerMain1($(this), ${categoria.id
    }, ${subcategoria.id})" class="areaDropDot">
                    <div class="iconeDrop9">
                        <svg id="_01_Icons_Line_upload" data-name="01) Icons / Line /  upload"
                            xmlns="http://www.w3.org/2000/svg" width="25" height="27" viewBox="0 0 25 27">
                            <path id="upload"
                                d="M21.323,27H3.677A3.718,3.718,0,0,1,0,23.25v-4.5A.744.744,0,0,1,.736,18a.744.744,0,0,1,.735.751v4.5A2.231,2.231,0,0,0,3.677,25.5H21.323a2.231,2.231,0,0,0,2.206-2.25v-4.5a.735.735,0,1,1,1.47,0v4.5A3.718,3.718,0,0,1,21.323,27ZM12.5,19.5a.743.743,0,0,1-.735-.749V2.562L7.138,7.282a.729.729,0,0,1-.519.22.719.719,0,0,1-.191-.026.742.742,0,0,1-.52-.531A.758.758,0,0,1,6.1,6.22l5.882-6a.726.726,0,0,1,1.042,0l5.882,6a.758.758,0,0,1,.191.725.742.742,0,0,1-.52.531.72.72,0,0,1-.191.026.729.729,0,0,1-.519-.22L13.235,2.562V18.751A.743.743,0,0,1,12.5,19.5Z"
                                fill="#f3b306" />
                        </svg>
                    </div>
                    <p class="descreveDrop">Arraste as imagens aqui</p>
                    <div style="margin: -90px auto;text-align: center;">
                        <p class="txtOu9">|<br>ou<br>|</p>
                    </div>
                    <div class="btnDrop9">
                        <p class="txtBtnDrop9">Selecione do seu computador</p>
                    </div>
                </div>
                <div class="descBanner8">
                    Banners ativos
                    <div class="btnQtdBanner">
                        <p class="txtQtdBanner listaBannersCatActive">${getBannerInnerMainNew(
      subcategoria?.banners?.default,
      true,
      categoria.id,
      subcategoria.id,
      categoria.id
    ).total
    }/${subcategoria?.banners?.length ?? 0}</p>
                    </div>
                </div>
                <ul id="listaBannersCatActive" style="list-style: none;" class=" superSortable fullSortable ui-sortable">
                ${getBannerInnerMainNew(
      subcategoria?.banners?.default,
      true,
      categoria.id,
      subcategoria.id,
      categoria.id
    ).html
    }
                   
                </ul>
                
            
                <div class="descBanner8">
                    Banners desativados
                    <div class="btnQtdBanner">
                        <p class="txtQtdBanner listaBannersCatInactive">${getBannerInnerMainNew(
      subcategoria?.banners?.default,
      "false",
      categoria.id,
      subcategoria.id,
      categoria.id
    ).total
    }/${subcategoria?.banners?.length ?? 0}</p>
                    </div>
                </div>
                <ul id="listaBannersCatInactive" style="list-style: none;" class=" superSortable fullSortable ui-sortable">
                ${getBannerInnerMainNew(
      subcategoria?.banners?.default,
      "false",
      categoria.id,
      subcategoria.id,
      categoria.id
    ).html
    }
                   
                </ul>
                
            
                <div  style="display:none" class="descBanner8">
                    Menu de categorias
                    <div class="btnQtdBanner">
                        <p class="txtQtdBanner">1/1</p>
                    </div>
                </div>
                <div class="descBanner8">
                    Banner de menu                  
                </div>
                <hr/>
                <div alvo="novo"  style="cursor:pointer" onclick="coletaBannerVertical($(this), ${categoria.id
    }, ${subcategoria.id})" class="areaDropDot">
                    <div class="iconeDrop9">
                        <svg id="_01_Icons_Line_upload" data-name="01) Icons / Line /  upload"
                            xmlns="http://www.w3.org/2000/svg" width="25" height="27" viewBox="0 0 25 27">
                            <path id="upload"
                                d="M21.323,27H3.677A3.718,3.718,0,0,1,0,23.25v-4.5A.744.744,0,0,1,.736,18a.744.744,0,0,1,.735.751v4.5A2.231,2.231,0,0,0,3.677,25.5H21.323a2.231,2.231,0,0,0,2.206-2.25v-4.5a.735.735,0,1,1,1.47,0v4.5A3.718,3.718,0,0,1,21.323,27ZM12.5,19.5a.743.743,0,0,1-.735-.749V2.562L7.138,7.282a.729.729,0,0,1-.519.22.719.719,0,0,1-.191-.026.742.742,0,0,1-.52-.531A.758.758,0,0,1,6.1,6.22l5.882-6a.726.726,0,0,1,1.042,0l5.882,6a.758.758,0,0,1,.191.725.742.742,0,0,1-.52.531.72.72,0,0,1-.191.026.729.729,0,0,1-.519-.22L13.235,2.562V18.751A.743.743,0,0,1,12.5,19.5Z"
                                fill="#f3b306" />
                        </svg>
                    </div>
                    <p class="descreveDrop">Arraste as imagens aqui</p>
                    <div style="margin: -90px auto;text-align: center;">
                        <p class="txtOu9">|<br>ou<br>|</p>
                    </div>
                    <div class="btnDrop9">
                        <p class="txtBtnDrop9">Selecione do seu computador</p>
                    </div>
                </div>
                <div id="bannersVerticais">
               ${getBannerVerticalMainNew(
      subcategoria?.banners?.asideMenu,
      1,
      categoria.id,
      subcategoria.id,
      categoria.id
    ).html
    }
                 </div>
            </section>
        </div>` +
    //======================================================ABA DE CARACTERÍSTICAS==================================================================================================================
    //======================================================ABA DE PRIORIZACAO==================================================================================================================
    '<div id="priorizacao" style="max-width:90% ; margin-top: 2%;height: 75vh; display:none"  class="container tabContent  verticalScroll notScroll">' +
    '<div style="margin-top: 3% !important;" class="col-md-12 grupo">' +
    '<div style="padding: 0 2%; margin-top: 2%;" class="row">' +
    '<div style="margin: 1% 2%;" class="switch__container"><input fieldName="smart" subCategorieName="\'' +
    subcategoria.title +
    `\'" onchange="setPriorizationSubCat($(this), ${categoria.id},${subcategoria.id},'smart')" ` +
    ((smart && smart != "false") || smart == "true" ? 'checked="true"' : "") +
    ' id="switch-shadow1988" class="switch switch--shadow" type="checkbox" /><label for="switch-shadow1988"></label></div>' +
    '<label style="font-size: 20px;" class="label">Smart</label>' +
    "</div>" +
    '<div style="padding: 0 2%;" class="row">' +
    '<div class="col-md-10 container"><label style="font-size: 20px;" class="label labelContent">Os produtos serão priorizados com base no consumidor. A plataforma irá exibir os produtos que mais fazem sentido com os hábitos de cada cliente. Cada página será única.</label><br /></div>' +
    "</div>" +
    "</div>" +
    '<div style="margin-top: 3% !important;" class="col-md-12 grupo">' +
    '<div style="padding: 0 2%; margin-top: 2%;" class="row">' +
    '<div style="margin: 1% 2%;" class="switch__container"><input fieldName="maisVendidos"  subCategorieName="\'' +
    subcategoria.title +
    `\'" onchange="setPriorizationSubCat($(this), ${categoria.id},${subcategoria.id},'bestSellers')" ` +
    ((maisVendidos && maisVendidos != "false") || maisVendidos == "true"
      ? 'checked="true"'
      : "") +
    ' id="switch-shadow1999" class="switch switch--shadow" type="checkbox" /><label for="switch-shadow1999"></label></div>' +
    '<label style="font-size: 20px;" class="label">Produtos mais vendidos da subcategoria</label>' +
    "</div>" +
    '<div style="padding: 0 2%;" class="row">' +
    '<div class="col-md-10 container"><label style="font-size: 20px;" class="label labelContent">Os produtos mais vendidos em estoque serão priorizados na classificação na página de categoria e subcategoria.</label><br /></div>' +
    "</div>" +
    "</div>" +
    '<div style="margin-top: 3% !important;" class="col-md-12 grupo">' +
    '<div style="padding: 0 2%; margin-top: 2%;" class="row">' +
    '<div style="margin: 1% 2%;" class="switch__container"><input fieldName="ofertas" subCategorieName="\'' +
    subcategoria.title +
    `\'" onchange="setPriorizationSubCat($(this), ${categoria.id},${subcategoria.id},'offers')" ` +
    ((ofertas && ofertas != "false") || ofertas == "true"
      ? 'checked="true"'
      : "") +
    ' id="switch-shadow1900" class="switch switch--shadow" type="checkbox" /><label for="switch-shadow1900"></label></div>' +
    '<label style="font-size: 20px;" class="label">Ofertas da subcategoria</label>' +
    "</div>" +
    '<div style="padding: 0 2%;" class="row">' +
    '<div class="col-md-10 container"><label style="font-size: 20px;" class="label labelContent">Os produtos com desconto ativo serão priorizados. Os produtos mais vendidos em ofertas serão priorizados na página de categoria e subcategoria. Os produtos sem oferta, irão aparecer em seguida.</label><br /></div>' +
    "</div>" +
    "</div>" +
    "<hr>" +
    '<div style="margin-top: 3% !important;" class="col-md-12 grupo">' +
    '<div style="padding: 0 2%; margin-top: 2%;" class="row">' +
    '<div style="margin: 1% 2%;" class="switch__container"><input fieldName="personalizada" subCategorieName="\'' +
    subcategoria.title +
    `\'" onchange="setPriorizationSubCat($(this), ${categoria.id},${subcategoria.id},'personal')" ` +
    ((personalizada && personalizada != "false") || personalizada == "true"
      ? 'checked="true"'
      : "") +
    ' id="switch-shadow1944" class="switch switch--shadow" type="checkbox" /><label for="switch-shadow1944"></label></div>' +
    '<label style="font-size: 20px;" class="label">Priorização personalizada</label>' +
    "</div>" +
    '<div style="padding: 0 2%;" class="row">' +
    '<div class="col-md-10 container"><label style="font-size: 20px;" class="label labelContent">Escolha produtos específicos e a ordem para aparecerem na página de categoria e subcategoria. Após os produtos Selecionados, serão exibidos os produtos pelo tipo de priorização.</label><br /></div>' +
    "</div>" +
    "</div>" +
    "</div>" +
    //======================================================ABA DE PROMOÇÕES==================================================================================================================
    '<div id="caracteristicas" style="max-width:70% ; height: 75vh; margin-top: 2%"  class="container tabContent verticalScroll notScroll">' +
    '<div  class="col-md-12 " style="margin-top: 3% !important; background: white !important">' +
    '<div style="padding:0 2%; margin-top: 2%; border: none !important" class="row">' +
    '<div style="margin: 1% 2%;" class="switch__container">' +
    "<input  " +
    activeOrNot +
    '   fieldName="status"  subCategorieName="\'' +
    subcategoria.title +
    `'" onchange="editCategoryField(false, ${categoria.id},'active','NONE',${subcategoria.id},'active',$(this)[0].checked )" id="switch-shadow18" class="switch switch--shadow" type="checkbox" />` +
    '<label for="switch-shadow18"></label>' +
    "</div>" +
    '<label style=" font-size: 20px;" class="label">Subcategoria Ativa</label> ' +
    "</div>" +
    '<div style="padding:0 2%" class="row">' +
    '<div class="col-md-12">' +
    '<label style=" font-size: 20px;" class="label">Nome da categoria</label><br> ' +
    "</div>" +
    "</div>" +
    '<div style="padding:0 2%" class="row">' +
    '<div class="col-md-12">' +
    '<div class="group-input2"  style="background: #F0F0F0 0% 0% no-repeat padding-box;border: 1px solid #EFEFEF;border-radius: 5px;"><input  style="background: none" class="form-control inputProduct" placeholder="Produtos relacionados" id="nomeCategoria" idParent="' +
    textElement.attr("id") +
    '"  fieldName="subCategoria" subCategorieName="\'' +
    subcategoria.title +
    `'" onchange="editCategoryField(false, ${categoria.id},'active','NONE',${subcategoria.id},'title',$(this).val())" value="` +
    subcategoria.title +
    '"></div><br> ' +
    "</div>" +
    "</div><br><hr><br>" +
    '<div style="padding:0 2%" class="row">' +
    '<div class="col-md-12">' +
    '<h3 style=" font-size: 20px;" class="SEO">SEO</h3><br> ' +
    "</div>" +
    "</div>" +
    '<div style="padding:0 2%;    margin-top: -3%;" class="row">' +
    '<div class="col-md-12 container">' +
    '<label style=" font-size: 20px;" class="label labelContent">Você pode preencher os campos relacionados ao SEO e ajudar no resultado das buscas realizadas no Google, Bing, Yahoo, entre outros.</label><br> ' +
    "</div>" +
    "</div><br><br>" +
    '<div style="padding:0 2%" class="row">' +
    '<div class="col-md-12">' +
    '<label style=" font-size: 20px;" class="label">Título da categoria (meta title)</label><br> ' +
    "</div>" +
    "</div>" +
    '<div style="padding:0 2%" class="row">' +
    '<div class="col-md-12">' +
    '<div class="group-input2"  style="background: #F0F0F0 0% 0% no-repeat padding-box;border: 1px solid #EFEFEF;border-radius: 5px;"><input value="' +
    subcategoria?.metatitle +
    '"   fieldName="title" subCategorieName="\'' +
    subcategoria.title +
    `\'" onchange="editCategoryField(false, ${categoria.id},'active','NONE',${subcategoria.id},'metatitle',$(this).val())"  style="background: none" class="form-control inputProduct" placeholder="No Kalimera você encontra tudo em frutas" id="` +
    aleatoryID() +
    '" ></div><br> ' +
    "</div>" +
    "</div><br><br>" +
    '<div style="padding:0 2%" class="row">' +
    '<div class="col-md-12">' +
    '<label style=" font-size: 20px;" class="label">Descrição completa (meta description)</label><br> ' +
    "</div>" +
    "</div>" +
    '<div style="padding:0 2%" class="row">' +
    '<div class="col-md-12">' +
    '<div class="group-input2"  style="padding: 1%;background: #F0F0F0 0% 0% no-repeat padding-box;border: 1px solid #EFEFEF;border-radius: 5px;"><textarea  fieldName="description" subCategorieName="\'' +
    subcategoria.title +
    `\'" onchange="editCategoryField(false, ${categoria.id},'active','NONE',${subcategoria.id},'description',$(this).val())" placeholder="Frutas no Kalimera. Compre online, limão, tangerina, kiwi e muitas outras frutas com os melhores preços e fretegratis."  style="background: #EFEFEF; border:none; font-size: 1.3rem; max-height: 100%" rows="3"   class="form-control">` +
    description +
    "</textarea>" +
    "</div>" +
    "</div>" +
    "</div><br><br>" +
    '<div style="padding:0 2%" class="row">' +
    '<div class="col-md-12">' +
    '<label style=" font-size: 20px;" class="label">Palavras Chaves (meta keywords)</label><br> ' +
    "</div>" +
    "</div>" +
    '<div style="padding:0 2%" class="row">' +
    '<div class="col-md-12">' +
    '<div class="listaPalavrasKey  notScroll verticalScroll" contentEditable="true" placeholder="digite aqui e aperte enter..." class="group-input2"  style="padding: 1%;background: #F0F0F0 0% 0% no-repeat padding-box;border: 1px solid #EFEFEF;border-radius: 5px; min-height: 150px !important;">' +
    '<div><input categorie_name="' +
    subcategoria.title +
    '" container="listaPalavrasKey"  fieldName="key_words" onkeydown="addWordKeyNew($(this), ' +
    categoria.id +
    ", " +
    subcategoria.id +
    ', this)" type="text" class="form-control entraPalavra" placeholder="Digite sua palavra aqui e pressione enter..." style="border: none; font-size: 1.3rem;height: auto; width: 90%;"/></div>' +
    asWords +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>";

  bootbox.alert({
    message: html,
    onShow: function () {
      localStorage.CAT_SUB_EDIT = categoria;
      $(".tabModal").click(function () {
        $(".tabModal").removeClass("tabModalActive");
        $(this).addClass("tabModalActive");
        $(".tabContent").hide();
        //////console.log("#" + $(this).attr("content"));
        $("#" + $(this).attr("content")).fadeIn();
      });
      $(".fa-times-circle").click(function () {
        $(this).parent().parent().remove();
      });
      $(".hiperTitle").each(function () {
        $(this).removeClass("ui-sortable-handle");
      });
      let thisSubCategory = {
        categoryMain: subcategoria?.title,
      };
    },
    callback: function () {
      //////console.log('The styles was removed!');

      localStorage.CAT_SUB_EDIT = "";
      localStorage.SUB_EDIT = "";
      localStorage.SUB_CAT_ATUAL = "";
      localStorage.SUB_CAT_ATUAL_STATUS = "";
      sessionStorage.PALAVRAS_KEY = "";
    },
  });
  $(".modal-footer").hide();
}

function addWordKeyNew(elemento, idCat, idSub, e) {
  console.log("addWordKeyNew", idCat, idSub);
  e = window.event;
  var code = e.which || e.keyCode;

  if (code == 13) {
    $("." + elemento.attr("container")).append(
      '<div class="input-group categoriaLabel categoriasPalavras"><label class="aPalavra">' +
      elemento.val() +
      '</label><label onclick="meRemoveNew($(this), ' +
      idCat +
      "," +
      idSub +
      ')" class="iconClose"><i class="far fa-times-circle"></i></label></div>'
    );
    palavrasKeyNew(elemento.val(), "add", idCat, idSub);
    elemento.val("");
  }
}

function palavrasKeyNew(palavra, regra, idCat, idSub) {
  console.log("palavrasKeyNew", palavra, regra, idCat, idSub);
  idCat = Number(idCat);
  var palavras = null;
  console.log(idSub, idSub == 0);
  if (idSub || idSub == 0) {
    console.log("opt 1");
    palavras = categoriesObject.categories
      .find((x) => Number(x.id) === Number(idCat))
      .subcategories.find((x) => Number(x.id) === Number(idSub))?.keywords;

    if (!palavras) {
      palavras = [];
    }
  } else if (idCat || idCat == 0) {
    console.log("opt 2");
    palavras = categoriesObject.categories.find(
      (x) => Number(x.id) === Number(idCat)
    )?.keywords;
    if (!palavras) {
      palavras = [];
    }
  } else {
    console.log("Não existem os ids ", idCat, idSub);
    return null;
  }

  if (palavras) {
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
  } else {
    palavras = [];
    palavras.push(palavra);

    var pKey = "";
    for (const p in palavras) {
      pKey += palavras[p] + ",";
    }
  }

  if (idSub || idSub == 0) {
    console.log("opt f 1");

    categoriesObject.categories
      .find((x) => Number(x.id) === Number(idCat))
      .subcategories.find((x) => Number(x.id) === Number(idSub))["keywords"] =
      palavras;
  } else if (idCat || idCat == 0) {
    console.log("opt f 2");

    categoriesObject.categories.find((x) => Number(x.id) === Number(idCat))[
      "keywords"
    ] = palavras;
  }
  console.log(categoriesObject);
}
function WordKeysNew(text, idCat, idSub) {
  var html = "";
  for (const k in text) {
    if (text[k] != "") {
      html +=
        '<div class="input-group categoriaLabel categoriasPalavras"><label class="aPalavra">' +
        text[k] +
        '</label><label onclick="meRemoveNew($(this), ' +
        idCat +
        "," +
        idSub +
        ')" class="iconClose"><i class="far fa-times-circle"></i></label></div>';
    }
  }
  return html;
}

function meRemoveNew(elemento, idCat, idSub) {
  var container = $(".entraPalavra");
  elemento.parent().remove();
  palavrasKeyNew(
    elemento.parent().find(".aPalavra").text(),
    "remove",
    idCat,
    idSub
  );
}

function uploadBannerCatMainNew(element, idCat, idSub) {
  console.log("COMECAND UPLOAD", element, idCat, idSub);
  var data = new FormData();
  var contador = 1;
  data.append("fileimagem", element[0].files[0]);
  console.log("ENVIANDO FOTOOOO", {
    url: mainHost + "/uploadBanners/" + localStorage.MASTER_ID,
    headers: {
      "x-access-token": localStorage.token,
      master_id: localStorage.MASTER_ID,
    },
    data: data,
    processData: false,
    contentType: false,
    type: "PUT",
  });
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
      let myUrlPath = "";
      let myId = element.attr("target");
      console.log(
        $("#" + element.attr("target")).attr("alvo"),
        element.attr("target")
      );
      if (
        $("#" + element.attr("target")).attr("alvo") == "novo" ||
        !element.attr("target")
      ) {
        let elementoNew = $("#listaBannersCatInactive");
        elementoNew.append(
          getBannerInnerNew(
            [
              {
                active: 1,
                url: data.path?.replace("./public", api_host),
              },
            ],
            1,
            idCat,
            idSub,
            myId
          ).html
        );
        myUrlPath = data.path?.replace("./public", api_host);
      } else {
        console.log("#" + element.attr("target"));
        let elemento = $("#" + element.attr("target"));
        elemento.css(
          "background",
          `url(${data.path?.replace("./public", api_host)})`
        );
        myUrlPath = data.path?.replace("./public", api_host);
        elemento.css("background-size", "cover !important");
        elemento.css("background-position", "center !important");
        elemento.css("zoom", "100% !important");
      }

      if (idSub || idSub == 0) {
        const busca = categoriesObject.categories
          .find((a) => Number(a.id) === Number(idCat))
          .subcategories.find((a) => Number(a.id) === Number(idSub));
        if (!busca["banners"] || !busca["banners"]["default"]) {
          categoriesObject.categories
            .find((a) => Number(a.id) === Number(idCat))
            .subcategories.find((a) => Number(a.id) === Number(idSub))[
            "banners"
          ] = {
            ...busca["banners"],
            default: [],
          };
        }
        const exists = busca["banners"]["default"].find((x) => x.id === myId);

        if (!exists) {
          categoriesObject.categories
            .find((a) => Number(a.id) === Number(idCat))
            .subcategories.find((a) => Number(a.id) === Number(idSub))
          ["banners"]["default"].push({
            url: myUrlPath,
            id: myId,
            link: "",
            active: 1,
          });
        } else {
          categoriesObject.categories
            .find((a) => Number(a.id) === Number(idCat))
            .subcategories.find((a) => Number(a.id) === Number(idSub))
          ["banners"]["default"].map((x, index) => {
            if (x.id === myId) {
              x.url = myUrlPath;
            }
          });
        }

        console.log("URL CRIADA", data, categoriesObject);
      } else if (idCat || idCat == 0) {
        const busca = categoriesObject.categories.find(
          (a) => Number(a.id) === Number(idCat)
        );

        if (!busca["banners"] || !busca["banners"]["default"]) {
          categoriesObject.categories.find(
            (a) => Number(a.id) === Number(idCat)
          )["banners"] = {
            ...busca["banners"],
            default: [],
          };
        }

        const exists = busca["banners"]["default"].find((x) => x.id === myId);

        if (!exists) {
          categoriesObject.categories
            .find((a) => Number(a.id) === Number(idCat))
          ["banners"]["default"].push({
            url: myUrlPath,
            id: myId,
            link: "",
            active: 1,
          });
        } else {
          categoriesObject.categories
            .find((a) => Number(a.id) === Number(idCat))
          ["banners"]["default"].map((x, index) => {
            if (x.id === myId) {
              x.url = myUrlPath;
            }
          });
        }
        console.log("URL CRIADA", data, categoriesObject);
      }
    },
    error: function (data) {
      console.log("ERRROOOIU", data);
    },
  });
}

function getBannerInnerNew(imgURLs, actives, idCat, idSub, id) {
  let html = "",
    counter = 0;
  for (const k in imgURLs) {
    let RANDOM = Math.random();
    if (imgURLs[k].active == actives) {
      if (!imgURLs[k].id) {
        imgURLs[k].id = id;
        console.log("getBannerInnerNew", imgURLs, actives, idCat, idSub, id);
      }
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
                   
                    <div  alvo="update" id="${imgURLs[k].id}"
                    onclick="uploadBannerCatMainNew($(this), ${idCat},${idSub},${imgURLs[k].id
        })"  ${imgURLs[k].url
          ? `style="background-size: cover !important; background-position: center; zoom: 100%;background: url(${imgURLs[k].url})"`
          : ""
        }  class="borderRight">
                    </div>
                </div>
                 <div class="group-input2"  style="background: #F0F0F0 0% 0% no-repeat padding-box;border: 1px solid #EFEFEF;border-radius: 5px;"><input  style="background: none" class="form-control inputProduct"  fieldName="affiliate_categorie_name"  
    onchange="editLinkFromBanner($(this), ${idCat},${idSub}, 'default','${imgURLs[k].id
        }')" placeholder="Link para o banner acima" id="${aleatoryID()}'" value="${imgURLs[k].link ?? ""
        }"></div>
                 
               
            </li>`;
    }
  }
  return { html: html, total: counter };
}

function uploadBannerCatVerticalMainNew(element, idCat, idSub) {
  console.log("ALTERANDO BANNERS VERTICAIS", idCat, idSub);
  var data = new FormData();
  var contador = 1;
  data.append("fileimagem", element[0].files[0]);

  console.log("ENVIANDO ver", {
    url: mainHost + "/uploadBanners/" + localStorage.MASTER_ID,
    headers: {
      "x-access-token": localStorage.token,
      master_id: localStorage.MASTER_ID,
    },
    data: data,
    processData: false,
    contentType: false,
    type: "PUT",
  });

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
      let myUrlPath = "";
      let myId = element.attr("target");
      if (
        $("#" + element.attr("target")).attr("alvo") == "novo" ||
        !element.attr("target")
      ) {
        let elementoNew = $("#bannersVerticais");

        elementoNew.append(
          getBannerVerticalNew(
            [
              {
                active: 1,
                url: data.path?.replace("./public", api_host),
              },
            ],
            1,
            idCat,
            idSub,
            myId
          ).html
        );
        myUrlPath = data.path?.replace("./public", api_host);
      } else {
        $("#" + element.attr("target")).css(
          "background",
          `url(${data.path?.replace("./public", api_host)})`
        );
        myUrlPath = data.path?.replace("./public", api_host);
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

      if (idSub || idSub == 0) {
        const busca = categoriesObject.categories
          .find((a) => Number(a.id) === Number(idCat))
          .subcategories.find((a) => Number(a.id) === Number(idSub));
        if (!busca["banners"] || !busca["banners"]["asideMenu"]) {
          categoriesObject.categories
            .find((a) => Number(a.id) === Number(idCat))
            .subcategories.find((a) => Number(a.id) === Number(idSub))[
            "banners"
          ] = {
            ...busca["banners"],
            asideMenu: [],
          };
        }

        const exists = busca["banners"]["asideMenu"].find((x) => x.id === myId);
        console.log("EXISTO", exists);
        if (!exists) {
          console.log("TENTANDO PUSH", {
            url: myUrlPath,
            id: myId,
            link: "",
            active: 1,
          });
          categoriesObject.categories
            .find((a) => Number(a.id) === Number(idCat))
            .subcategories.find((a) => Number(a.id) === Number(idSub))
          ["banners"]["asideMenu"].push({
            url: myUrlPath,
            id: myId,
            link: "",
            active: 1,
          });
        } else {
          categoriesObject.categories
            .find((a) => Number(a.id) === Number(idCat))
            .subcategories.find((a) => Number(a.id) === Number(idSub))
          ["banners"]["asideMenu"].map((x, index) => {
            if (x.id === myId) {
              x.url = myUrlPath;
            }
          });
        }
      } else if (idCat || idCat == 0) {
        const busca = categoriesObject.categories.find(
          (a) => Number(a.id) === Number(idCat)
        );
        if (!busca["banners"] || !busca["banners"]["asideMenu"]) {
          categoriesObject.categories.find(
            (a) => Number(a.id) === Number(idCat)
          )["banners"] = {
            ...busca["banners"],
            asideMenu: [],
          };
        }
        console.log(
          categoriesObject.categories.find(
            (a) => Number(a.id) === Number(idCat)
          )["banners"]
        );

        const exists = busca["banners"]["asideMenu"].find((x) => x.id === myId);
        console.log("EXISTO CAT", exists);
        if (!exists) {
          categoriesObject.categories
            .find((a) => Number(a.id) === Number(idCat))
          ["banners"]["asideMenu"].push({
            url: myUrlPath,
            id: myId,
            link: "",
            active: 1,
          });
        } else {
          categoriesObject.categories
            .find((a) => Number(a.id) === Number(idCat))
          ["banners"]["asideMenu"].map((x, index) => {
            if (x.id === myId) {
              x.url = myUrlPath;
            }
          });
        }
      }

      console.log("URL CRIADA VERT", data, categoriesObject);
    },
    error: function (data) {
      console.log(data);
    },
  });
}

function getBannerVerticalNew(imgURLs, actives, idCat, idSub, id) {
  console.log(imgURLs, actives, idCat, idSub, id);
  let html = "",
    counter = 0;
  for (const k in imgURLs) {
    if (!imgURLs[k].id) {
      imgURLs[k].id = id;
      console.log("getBannerVerticalNew", imgURLs, actives, idCat, idSub, id);
    }
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
      }" onchange="changeMyActiveMainNew($(this), ${idCat}, ${idSub},'asideMenu','${imgURLs[k].id
      }')" id="switch-shadow1799${RANDOM}" ${imgURLs[k].active == true ? 'checked="true"' : ""
      }
                            class="switch switch--shadow" type="checkbox" /><label style="    margin-top: 15px;"
                            for="switch-shadow1799${RANDOM}"></label></div>
                    <div onclick="deleteMyActiveMainNew('${imgURLs[k].url
      }',${idCat}, ${idSub},'asideMenu', $(this),'${imgURLs[k].id
      }')" style=" cursor: pointer;margin-top: 15px" class=" deleteThis">
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
                <div alvo="update" id="${imgURLs[k].id
      }" onclick="coletaBannerMain1($(this), ${idCat}, ${idSub}, ${id})" ${imgURLs[k].url
        ? `style="background-repeat: no-repeat;background-repeat: no-repeat !important; background-position: center; zoom: 80%; min-height: 490px; width: calc(100% - 100px); float: right; background: url(${imgURLs[k].url})"`
        : ""
      }   class="borderRightVertical">
                </div>
                   <div class="group-input2"  style="background: #F0F0F0 0% 0% no-repeat padding-box;border: 1px solid #EFEFEF;border-radius: 5px;"><input  style="background: none" class="form-control inputProduct"  fieldName="affiliate_categorie_name"  
    onchange="editLinkFromBanner($(this), ${idCat},${idSub},'asideMenu','${imgURLs[k].id
      }')" placeholder="Link para o banner acima" id="${aleatoryID()}'" value="${imgURLs[k].link ?? ""
      }"></div>
            </div>`;
  }
  return { html: html, total: counter };
}

function getBannerInnerMainNew(imgURLs, actives, idCat, idSub, id) {
  console.log(imgURLs, actives.toString(), idCat, idSub, id);
  let html = "",
    counter = 0;
  if (imgURLs) {
    for (const k in imgURLs) {
      if (!imgURLs[k].id) {
        imgURLs[k].id = id;
        console.log(
          "getBannerInnerMainNew",
          imgURLs,
          actives,
          idCat,
          idSub,
          id
        );
      }
      let RANDOM = Math.random();
      if (
        Number(imgURLs[k].active) == actives ||
        imgURLs[k].active.toString() == actives ||
        imgURLs[k].active == actives
      ) {
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
                            <div style="text-align: center" class="switch__container"><input onchange="changeMyActiveMainNew($(this), ${idCat}, ${idSub}, 'default', '${imgURLs[k].id
          }')" thisUrl="${imgURLs[k].url}" ${imgURLs[k].active == true ? 'checked="true"' : ""
          } id="switch-shadow1778${RANDOM}"
                                    class="switch switch--shadow" type="checkbox" /><label style="    margin-top: 15px;"
                                    for="switch-shadow1778${RANDOM}"></label></div>
                            <div  onclick="deleteMyActiveMainNew('${imgURLs[k].url
          }',${idCat}, ${idSub},'default', $(this), '${imgURLs[k].id
          }')" style=" cursor: pointer;margin-top: 15px" class=" deleteThis">
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
                    
                        <div  alvo="update" id="${imgURLs[k].id
          }" onclick="coletaBannerMain1($(this), ${idCat}, ${idSub}, ${id})" ${imgURLs[k].url
            ? `style="background-size: cover !important; background-position: center; zoom: 100%;background: url(${imgURLs[k].url})"`
            : ""
          }  class="borderRight">
                        </div>
                    </div>
                       <div class="group-input2"  style="background: #F0F0F0 0% 0% no-repeat padding-box;border: 1px solid #EFEFEF;border-radius: 5px;"><input  style="background: none" class="form-control inputProduct"  fieldName="affiliate_categorie_name"  
    onchange="editLinkFromBanner($(this), ${idCat},${idSub}, 'default','${imgURLs[k].id
          }')" placeholder="Link para o banner acima" id="${aleatoryID()}'" value="${imgURLs[k].link ?? ""
          }"></div>
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

function getBannerVerticalMainNew(imgURLs, actives, idCat, idSub, id) {
  console.log(imgURLs, actives, idCat, idSub, id);
  let html = "",
    counter = 0;
  if (imgURLs) {
    for (const k in imgURLs) {
      if (!imgURLs[k].id) {
        imgURLs[k].id = id;
        console.log(
          "getBannerVerticalMainNew",
          imgURLs,
          actives,
          idCat,
          idSub,
          id
        );
      }
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
        }" onchange="changeMyActiveMainNew($(this), ${idCat}, ${idSub},'asideMenu', '${imgURLs[k].id
        }')" id="switch-shadow1799${RANDOM}" ${imgURLs[k].active == true ? 'checked="true"' : ""
        }
                                class="switch switch--shadow" type="checkbox" /><label style="    margin-top: 15px;"
                                for="switch-shadow1799${RANDOM}"></label></div>
                        <div onclick="deleteMyActiveMainNew('${imgURLs[k].url
        }',${idCat}, ${idSub},'asideMenu', $(this), '${imgURLs[k].id
        }')" style=" cursor: pointer;margin-top: 15px" class=" deleteThis">
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
                    <div alvo="update" id="${imgURLs[k].id
        }" onclick="coletaBannerVertical($(this), ${idCat}, ${idSub}, ${id})" ${imgURLs[k].url
          ? `style="background-repeat: no-repeat;background-repeat: no-repeat !important; background-position: center; zoom: 80%; min-height: 490px; width: calc(100% - 100px); float: right; background: url(${imgURLs[k].url})"`
          : ""
        }   class="borderRightVertical">
                    </div>
                      <div class="group-input2"  style="background: #F0F0F0 0% 0% no-repeat padding-box;border: 1px solid #EFEFEF;border-radius: 5px;"><input  style="background: none" class="form-control inputProduct"  fieldName="affiliate_categorie_name"  
    onchange="editLinkFromBanner($(this), ${idCat},${idSub},'asideMenu','${imgURLs[k].id
        }')" placeholder="Link para o banner acima" id="${aleatoryID()}'" value="${imgURLs[k].link ?? ""
        }"></div>
                </div>`;
    }
    return { html: html, total: counter };
  } else {
    return { html: "", total: counter };
  }
}
function coletaBannerMain1(elemento, idCat, idSub) {
  console.log("ELEMNTO ID ", elemento.attr("id"));
  let newID =
    elemento.attr("id") && elemento.attr("alvo") !== "novo"
      ? elemento.attr("id")
      : idCat + "-" + idSub + "-" + Date.now();
  elemento.attr("id", newID);
  if (idSub || idSub == 0) {
    $("#pegaBannerCatMainSub").attr("target", newID);
    $("#pegaBannerCatMainSub").click();
  } else {
    $("#pegaBannerCatMain").attr("target", newID);
    $("#pegaBannerCatMain").click();
  }
}
function coletaBannerVertical(elemento, idCat, idSub) {
  console.log("ELEMNTO ID ", elemento.attr("id"));
  let newID =
    elemento.attr("id") && elemento.attr("alvo") !== "novo"
      ? elemento.attr("id")
      : idCat + "-" + idSub + "-" + Date.now();
  elemento.attr("id", newID);
  if (idSub || idSub == 0) {
    $("#inputColetorSub").attr("target", newID);
    $("#inputColetorSub").click();
  } else {
    $("#inputColetor").attr("target", newID);
    $("#inputColetor").click();
  }
}

function changeMyActiveMainNew(element, idCat, idSub, type, id) {
  if (idSub || idSub == 0) {
    const exists = categoriesObject.categories
      .find((x) => Number(x.id) === Number(idCat))
      .subcategories.find((x) => Number(x.id) === Number(idSub))
      .banners[type].find((x) => x.id === id);
    if (exists) {
      categoriesObject.categories
        .find((x) => Number(x.id) === Number(idCat))
        .subcategories.find((x) => Number(x.id) === Number(idSub))
        .banners[type].map((x) => {
          if (x.id === id) {
            x.active = element[0].checked;
          }
        });
    }
  } else if (idCat || idCat == 0) {
    const exists = categoriesObject.categories
      .find((x) => Number(x.id) === Number(idCat))
      .banners[type].find((x) => x.id === id);
    if (exists) {
      categoriesObject.categories
        .find((x) => Number(x.id) === Number(idCat))
        .banners[type].map((x) => {
          if (x.id === id) {
            x.active = element[0].checked;
          }
        });
    }
  }

  console.log("CHECK URL BANNER", categoriesObject);
}

function deleteMyActiveMainNew(url, idCat, idSub, type, element, id) {
  console.log("REMOVE", url, idCat, idSub, type, element, id);
  if (idSub || idSub == 0) {
    const exists = categoriesObject.categories
      .find((x) => Number(x.id) === Number(idCat))
      .subcategories[idSub].banners[type].find((x) => x.id === id);

    if (exists) {
      categoriesObject.categories
        .find((x) => Number(x.id) === Number(idCat))
        .subcategories.find((x) => Number(x.id) === Number(idSub))
        .banners[type].map((x, index) => {
          if (x.id === id) {
            categoriesObject.categories
              .find((x) => Number(x.id) === Number(idCat))
              .subcategories.find((x) => Number(x.id) === Number(idSub))
              .banners[type].splice(index, 1);
          }
        });
    }
  } else if (idCat || idCat == 0) {
    const exists = categoriesObject.categories
      .find((x) => Number(x.id) === Number(idCat))
      .banners[type].find((x) => x.id === id);
    if (exists) {
      categoriesObject.categories
        .find((x) => Number(x.id) === Number(idCat))
        .banners[type].map((x, index) => {
          if (x.id === id) {
            categoriesObject.categories
              .find((x) => Number(x.id) === Number(idCat))
              .banners[type].splice(index, 1);
          }
        });
    }
  }
  element.parent().parent().parent().remove();

  console.log("REMOVING BANNER", categoriesObject);
}
function aleatoryIDNew(text) {
  var randLetter = Math.random().toString().replace(/./g, "");
  var uniqid = randLetter + Date.now();
  return uniqid;
}
async function SALVA_EDIT_NEW() {
  $(".close").click();
  await publicarAlteracoes();
  getCategories();
}

function editLinkFromBanner(elemento, idCat, idSub, type, id) {
  console.log({ elemento, idCat, idSub, type, id });
  if (idSub || idSub == 0) {
    const exists = categoriesObject.categories
      .find((x) => Number(x.id) === Number(idCat))
      .subcategories[idSub].banners[type].find((x) => x.id === id);
    console.log("ESISTIR", exists);
    if (exists) {
      categoriesObject.categories
        .find((x) => Number(x.id) === Number(idCat))
        .subcategories.find((x) => Number(x.id) === Number(idSub))
        .banners[type].map((x, index) => {
          if (x.id === id) {
            x.link = elemento.val();
          }
        });
    }
  } else if (idCat || idCat == 0) {
    const exists = categoriesObject.categories
      .find((x) => Number(x.id) === Number(idCat))
      .banners[type].find((x) => x.id === id);
    console.log("ESISTIR r", type, id, exists);
    if (exists) {
      categoriesObject.categories
        .find((x) => Number(x.id) === Number(idCat))
        .banners[type].map((x, index) => {
          if (x.id === id) {
            x.link = elemento.val();
          }
        });
    }
  }
  console.log("EDITING LINK", categoriesObject);
  elemento.css("color", "#f6b504");
}

function nossosIcones(essaCat, essaSubCat) {
  var html = "";

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

  if (!essaSubCat) {
    for (let a = 1; a < 26; a++) {
      if (a < 10) {
        a = "0" + a;
      }
      var ver2 = ("images/icons/Arquivo000" + a + ".svg").split("/");
      ver2 = ver2[ver2.length - 1]?.replace(/ /g, "");
      //console.log( ver, ver2)
      if (essaCat.icon == ver2) {
        //console.log("Achei..........")

        html +=
          '<div dica="' +
          sugestao(Number(a)) +
          '" id="' +
          aleatoryID("images/icons/Arquivo000" + a + ".svg") +
          '_icone" onclick="escolheIcone($(this),\'' +
          ver2 +
          "', " +
          essaCat.id +
          ')" class="boxIconDefault boxIconeActive">' +
          '<i class="fas fa-check iconSelectedCheck"></i>' +
          '<img class="imgIcone" style="width: 100%;" src="images/icons/Arquivo000' +
          a +
          '.svg" />' +
          "</div>";
      } else {
        html +=
          '<div dica="' +
          sugestao(Number(a)) +
          '" id="' +
          aleatoryID("images/icons/Arquivo000" + a + ".svg") +
          '_icone"  onclick="escolheIcone($(this),\'' +
          ver2 +
          "', " +
          essaCat.id +
          ')" class="boxIconDefault boxIcone">' +
          '<i style="display:none" class="fas fa-check iconSelectedCheck"></i>' +
          '<img class="imgIcone" style="width: 100%;" src="images/icons/Arquivo000' +
          a +
          '.svg" />' +
          "</div>";
      }
    }
  } else {
    for (let a = 1; a < 26; a++) {
      if (a < 10) {
        a = "0" + a;
      }
      var ver2 = ("images/icons/Arquivo000" + a + ".svg").split("/");
      ver2 = ver2[ver2.length - 1]?.replace(/ /g, "");
      //console.log( ver, ver2)
      if (essaCat.icon == ver2) {
        //console.log("Achei..........")

        html +=
          '<div dica="' +
          sugestao(Number(a)) +
          '" id="' +
          aleatoryID("images/icons/Arquivo000" + a + ".svg") +
          '_icone" onclick="escolheIcone($(this),\'' +
          ver2 +
          "', " +
          essaCat.id +
          "," +
          essaSubCat.id +
          ')" class="boxIconDefault boxIconeActive">' +
          '<i class="fas fa-check iconSelectedCheck"></i>' +
          '<img class="imgIcone" style="width: 100%;" src="images/icons/Arquivo000' +
          a +
          '.svg" />' +
          "</div>";
      } else {
        html +=
          '<div dica="' +
          sugestao(Number(a)) +
          '" id="' +
          aleatoryID("images/icons/Arquivo000" + a + ".svg") +
          '_icone"  onclick="escolheIcone($(this),\'' +
          ver2 +
          "', " +
          essaCat.id +
          "," +
          essaSubCat.id +
          ')" class="boxIconDefault boxIcone">' +
          '<i style="display:none" class="fas fa-check iconSelectedCheck"></i>' +
          '<img class="imgIcone" style="width: 100%;" src="images/icons/Arquivo000' +
          a +
          '.svg" />' +
          "</div>";
      }
    }
  }

  return html;
}

function nossosIcones2(essaCat, essaSubCat) {
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
  if (!essaSubCat) {
    for (const k in LISTA_ICONES) {
      if (LISTA_ICONES[k].indexOf("cliente_") > -1) {
        html +=
          '<div style="background: #FFFBF2 0% 0% no-repeat padding-box;"   id="' +
          aleatoryID("/assets/icons/" + LISTA_ICONES[k]) +
          '_icone" onclick="escolheIcone($(this),\'' +
          LISTA_ICONES[k] +
          "'," +
          essaCat.id +
          `)" class="boxIconDefault ${essaCat.icon !== LISTA_ICONES[k] ? "" : "boxIconeActive"
          } ">` +
          `<i  ${essaCat.icon === LISTA_ICONES[k] ? "" : 'style="display:none"'
          } class="fas fa-check iconSelectedCheck"></i>` +
          '<img class="imgIcone" style="width: 100%;" src="/assets/icons/' +
          LISTA_ICONES[k] +
          '" />' +
          "</div>";
      }
    }
  } else {
    for (const k in LISTA_ICONES) {
      if (LISTA_ICONES[k].indexOf("cliente_") > -1) {
        html +=
          '<div style="background: #FFFBF2 0% 0% no-repeat padding-box;"   id="' +
          aleatoryID("/assets/icons/" + LISTA_ICONES[k]) +
          '_icone" onclick="escolheIcone($(this),\'' +
          LISTA_ICONES[k] +
          "'," +
          essaCat.id +
          "," +
          essaSubCat.id +
          `)" class="boxIconDefault ${essaCat.icon === LISTA_ICONES[k] ? "boxIconeActive" : ""
          }">` +
          `<i  ${essaCat.icon === LISTA_ICONES[k] ? "" : 'style="display:none"'
          } class="fas fa-check iconSelectedCheck"></i>` +
          '<img class="imgIcone" style="width: 100%;" src="/assets/icons/' +
          LISTA_ICONES[k] +
          '" />' +
          "</div>";
      }
    }
  }

  return html;
}

function escolheIcone(elemento, url, idCat, idSub) {
  console.log("MUDANO O ICONE", elemento, url, idCat, idSub);
  if (idSub || idSub == 0) {
    categoriesObject.categories
      .find((a) => Number(a.id) === Number(idCat))
      .subcategories.map((x) => {
        if (Number(x.id) === Number(idSub)) {
          x.icon = url;
        }
      });
  } else if (idCat || idCat == 0) {
    categoriesObject.categories.map((x) => {
      if (Number(x.id) === Number(idCat)) {
        x.icon = url;
      }
    });
  }
  console.log("EDITING ICON", categoriesObject);
  $(".boxIconDefault").removeClass("boxIconeActive");
  $(".iconSelectedCheck").hide();
  elemento.find(".iconSelectedCheck").show();

  elemento.addClass("boxIconeActive");
}

function setPriorizationSubCat(elemento, idCat, idSub, type) {
  console.log(elemento, idCat, idSub, type);
  categoriesObject.categories
    .find((a) => Number(a.id) === Number(idCat))
    .subcategories.find((x) => Number(x.id) === Number(idSub)).priorization[
    type
  ] = elemento[0].checked;
  console.log("seting priorization", categoriesObject);
}

function destaque(alvo, titulo, instrucao) {
  console.log(alvo, titulo, instrucao);
  const tour = new Shepherd.Tour({
    defaultStepOptions: {
      cancelIcon: {
        enabled: true,
      },
      classes: `'${alvo.split(".")[1]}'`,
      scrollTo: { behavior: "smooth", block: "center" },
    },
  });

  tour.addStep({
    title: titulo,
    text: instrucao,
    attachTo: {
      element: alvo,
      on: "bottom",
    },
    buttons: [
      {
        action() {
          console.log("proximo");
          return this.next();
        },
        classes: "botaoInstrutorVolta",
        text: "Veja onde salvar!",
      },
    ],
    id: "creating",
  });
  tour.addStep({
    title: "Clique aqui para salvar!",
    text: "Este campo salva as suas alterações definitivamente!",
    attachTo: {
      element: ".destaqueSalvar",
      on: "bottom",
    },
    buttons: [
      {
        action() {
          return this.back();
        },
        classes: "botaoInstrutorProximo",
        text: "Volta",
      },
      {
        action() {
          console.log("proximo");
          return this.next();
        },
        classes: "botaoInstrutorVolta",
        text: "Ok, entendido!",
      },
    ],
    id: "creating",
  });

  tour.start();
}
function searchPorCategorias(element) {
  let valor = element.val();
  console.log("Buscando por", valor);
  $(".itemSortable2").each(function () {
    let conteudo = $(this).text();
    if (conteudo.indexOf(valor) > -1) {
      $(this).show();
    } else {
      $(this).hide();
    }
  });
}
