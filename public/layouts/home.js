let notFound =
  URL_IMAGES + "/produto-sem-imagem.jpg";
var CATEGORIES = [],
  MY_CATEGORIES = [],
  MINHAS_CATEGORIAS = [];
var arrowDown4 =
  '<div onclick="dropaCategoriasInner($(this).parent()) " class=" deleteThis3 dropCategoriaButton ">' +
  '<svg xmlns="http://www.w3.org/2000/svg" style="fill: #fcfcfd; stroke: silver;" width="36" height="36" viewBox="0 0 36 36">' +
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
  "</div>";

let homePage = {
  logotipo: {
    url: "",
    link: "",
  },
  mainColors: {
    first: "",
    second: "",
    third: "",
    fourty: "",
  },
  asideBanner: {
    url: "",
    link: "",
  },
  header: {
    mainBanner: {
      url: "",
      link: "",
    },
    footerBanners: {
      first: {
        url: "",
        link: "",
      },
      second: {
        url: "",
        link: "",
      },
      third: {
        url: "",
        link: "",
      },
      fourty: {
        url: "",
        link: "",
      },
    },
    asideBanner: {
      url: "",
      link: "",
    },
  },
  body: [],
  newsletter: {
    text: "",
    link: "",
  },
  whatsapp: {
    text: "",
    url: "",
    link: "",
  },
  footerLinks: {
    firstColumnTittle: {
      text: "",
      link: "",
    },
    secondColumnTittle: {
      text: "",
      link: "",
    },
    thirdColumnTittle: {
      text: "",
      link: "",
    },
    firstColumn: [],
    secondColumn: [],
    thirdColumn: [],
    contactData: {
      text: "",
      link: "",
    },
  },
  footerLogo: {
    url: "",
    link: "",
  },
  footerText: {
    text: "",
    link: "",
  },
  socialMidia: {
    facebook: {
      status: false,
      link: "",
    },
    instagram: {
      status: false,
      link: "",
    },
    youTube: {
      status: false,
      link: "",
    },
  },
  legalText: {
    url: "",
    link: "",
  },
};

function isEquivalent(a, b) {
  // Create arrays of property names
  var aProps = Object.getOwnPropertyNames(a);
  var bProps = Object.getOwnPropertyNames(b);

  // If number of properties is different,
  // objects are not equivalent
  if (aProps.length != bProps.length) {
    return false;
  }

  for (var i = 0; i < aProps.length; i++) {
    var propName = aProps[i];

    // If values of same property are not equal,
    // objects are not equivalent
    if (a[propName] !== b[propName]) {
      return false;
    }
  }

  // If we made it this far, objects
  // are considered equivalent
  return true;
}

function corrigeHomePage() {
  homePage = {
    logotipo: {
      url: "",
      link: "",
    },
    mainColors: {
      first: "",
      second: "",
      third: "",
      fourty: "",
    },
    asideBanner: {
      url: "",
      link: "",
    },
    header: {
      mainBanner: {
        url: "",
        link: "",
      },
      footerBanners: {
        first: {
          url: "",
          link: "",
        },
        second: {
          url: "",
          link: "",
        },
        third: {
          url: "",
          link: "",
        },
        fourty: {
          url: "",
          link: "",
        },
      },
      asideBanner: {
        url: "",
        link: "",
      },
    },
    body: [],
    newsletter: {
      text: "",
      link: "",
    },
    whatsapp: {
      text: "",
      url: "",
      link: "",
    },
    footerLinks: {
      firstColumnTittle: {
        text: "",
        link: "",
      },
      secondColumnTittle: {
        text: "",
        link: "",
      },
      thirdColumnTittle: {
        text: "",
        link: "",
      },
      firstColumn: [],
      secondColumn: [],
      thirdColumn: [],
      contactData: {
        text: "",
        link: "",
      },
    },
    footerLogo: {
      url: "",
      link: "",
    },
    footerText: {
      text: "",
      link: "",
    },
    socialMidia: {
      facebook: {
        status: false,
        link: "",
      },
      instagram: {
        status: false,
        link: "",
      },
      youTube: {
        status: false,
        link: "",
      },
    },
    legalText: {
      url: "",
      link: "",
    },
  };
}

//================================NEWS UPDATES==============================

function setOrigins(origin, stage) {
  console.log("ORIGIN in function", origin);
  $(".modal")
    .find("input")
    .each(function () {
      $(this).removeAttr("origin");
    });

  $(".modal")
    .find("textarea")
    .each(function () {
      $(this).removeAttr("origin");
    });

  $(".modal")
    .find("button")
    .each(function () {
      $(this).removeAttr("origin");
    });

  if (origin) {
    $(".modal")
      .find("input")
      .each(function () {
        $(this).attr("origin", origin);
        if (origin.split("_")[0] === "banner") {
          $(this).attr("stage", stage);
        }
      });

    $(".modal")
      .find("textarea")
      .each(function () {
        $(this).attr("origin", origin);
        if (origin.split("_")[0] === "banner") {
          $(this).attr("stage", stage);
        }
      });

    $(".modal")
      .find("button")
      .each(function () {
        $(this).attr("origin", origin);
        if (origin.split("_")[0] === "banner") {
          $(this).attr("stage", stage);
        }
      });

    $(".switch").each(function () {
      $(this).attr("origin", origin);
      if (origin.split("_")[0] === "banner") {
        $(this).attr("stage", stage);
      }
    });
  }
}
var GLOBAL_ELEMENT_EDIT = null;
$(".dropzone").click(function (e) {
  e = window.event;
  GLOBAL_ELEMENT_EDIT = $(this);
  e.stopPropagation();
  let origin = $(this).attr("origin");
  console.log("ORIGIN", origin);
  $("#modalChangePicture").attr("origin", origin);
  $("#modalChangePicture").find("input").attr("origin", origin);
  if ($(this).attr("src")) {
    $("#modalChangePicture").find("img").attr("src", $(this).attr("src"));
  }

  setOrigins(origin);

  $("#modalMudaLink").attr("origin", origin);

  $("fundoModal").show();
  if ($(this).attr("origin") === "asideBanner") {
    $(this).parent().parent().addClass("index9");
  } else {
    $(this).parent().addClass("index9");
  }

  $(this).parent().find(".dropzone-prev").show();
});

function newLink3(element) {
  if (element.parent().find(".novoLink3").css("display") === "none") {
    element.parent().find(".novoLink3").show();
  } else {
    element.parent().find(".novoLink3").hide();
  }
}

function showMyPrev(element) {
  GLOBAL_ELEMENT_EDIT = element;
  let origin = element.attr("origin");
  if (!origin) {
    origin = element.attr("id");
  }
  console.log("A ORIGEM", origin);
  $("#modalChangePicture").attr("origin", origin);
  $("#modalChangePicture").find("input").attr("origin", origin);

  setOrigins(origin);

  if (element.attr("src")) {
    $("#modalChangePicture").find("img").attr("src", element.attr("src"));
  }
  console.log("the id", element, element.attr("id"));

  if (element.attr("id") && element.attr("id").split("_")[0] === "produto") {
    $("#modalVitrine").attr("origin", element.attr("id"));
  } else {
    $("#modalReceitas").attr("origin", element.attr("id"));
  }

  $("#modalMudaLink").attr("origin", origin);
  // element.parent().parent().find("label").addClass("index9");
  // element.parent().parent().find("label").addClass("index9");
  // element.parent().addClass("index9");
  // element.parent().parent().parent().addClass("index9");
  element.parent().addClass("index9");
  element.parent().css("position", "relative");

  element.parent().addClass("borderSelected index9");

  $("fundoModal").show();

  element.parent().find(".dropzone-prev").show();
  element.parent().find(".dropzone-prev").addClass("borderSelected2");
}

$("fundoModal").click(function () {
  $(this).hide();
  $(".dropzone-prev").hide();
  $(".content-dynamic").removeClass("index9");
  $(".content-dynamic").removeClass("borderSelected");

  $(".dropzone").each(function () {
    $(this).parent().parent().removeClass("index9");
    $(this).parent().removeClass("index9");
  });
});

/*
window.onbeforeunload = async function () {
  if ([].length > 0) {
    $("#modalNaoSalvou").click();
    setTimeout(() => {
      return confirm("Necessário salvar");
    }, 2000);
  }
};
*/
function showMe(element) {
  if (element[0].checked === true) {
    element.parent().parent().parent().find(".contentAfter").show();
  } else {
    element.parent().parent().parent().find(".contentAfter").hide();
  }

  let apply = element.attr("id");
  $(".disable-me").each(function () {
    if ($(this).attr("id") !== apply) {
      $(this)[0].checked = false;
    }
  });
}

function showMe2(element) {
  if (element[0].checked === true) {
    element.parent().parent().find(".contentAfter").show();
  } else {
    element.parent().parent().find(".contentAfter").hide();
  }

  let apply = element.attr("id");
  $(".disable-me").each(function () {
    if ($(this).attr("id") !== apply) {
      $(this)[0].checked = false;
    }
  });
}

function uploadAndUpdateFile(element) {
  const loadPictureInner = (picture) => URL && URL.createObjectURL(picture);
  let src = loadPictureInner(element[0].files[0]);
  console.log("SRC", src);
  $("#modalChangePicture").find("img").attr("src", src);
  $("#" + element.attr("origin"))
    .find("img")
    .attr("src", src);

  $("#" + element.attr("origin")).attr("src", src);

  $("#" + element.attr("origin"))
    .find("img")
    .show();
  $("#" + element.attr("origin"))
    .find("img")
    .css("zoom", "90%");
  $("#" + element.attr("origin"))
    .parent()
    .find(".rounded-icon")
    .css("opacity", "0");
}

//==========================================================================
const dropzones = document.querySelectorAll(".dropzone");

const loadPicture = (picture) => URL && URL.createObjectURL(picture);

const handleDragOver = (e) => {
  e.stopPropagation();
  e.preventDefault();
  e.dataTransfer.dropEffect = "copy";
};

const handleDragDrop = (input, image) => (e) => {
  e.stopPropagation();
  e.preventDefault();

  const { files } = e.dataTransfer;
  const src = loadPicture(files[0]);
  image.src = src;
  input.files = files;

  e.target.classList.add("dropped");
};

const handleSelectFile = (dropzone, image) => (e) => {
  const { files } = e.target;
  const src = loadPicture(files[0]);
  image.src = src;

  dropzone.classList.add("dropped");
};

dropzones.forEach((dropzone) => {
  const [input, image] = dropzone.children;

  dropzone.addEventListener("dragover", handleDragOver);
  dropzone.addEventListener("drop", handleDragDrop(input, image));
  //   input.addEventListener("change", handleSelectFile(dropzone, image));
});

const dropdown = document.querySelector(".styled-dropdown");

// dropdown.previousElementSibling.addEventListener("click", () => {
//   dropdown.classList.toggle("show");
// });
//dasd

document
  .querySelector("#dropdown-content-dynamic")
  .addEventListener("click", () => {
    dropdown.classList.toggle("show");
  });

const content = document.querySelector(".preview-home_content");
const content2 = document.querySelector(".listaHOME");
const div = document.createElement("div");
div.innerHTML = `
      <label style="padding: 50px; width: 100%; height: " onclick="showMyPrev($(this))" class="dropzone">  
          <div>
            <img src="" />
            <span  class="rounded-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z"/>
              </svg>
            </span>
          </div> 
      </label> 
    `;

const div2 = document.createElement("div");
div2.innerHTML = `  
      <label onclick="showMyPrev($(this))" style="display: contents; " class="dropzone ">
    <h1 style="position: absolute;margin-top: -25px;" class="labelSwitch">Confira estas ótimas ofertas</h1>
        
        ${getProductCard()}
        ${getProductCard()}
        ${getProductCard()}
        ${getProductCard()}
        ${getProductCard()}
        ${getProductCard()} 
 
      </label> 
    `;

async function getAmostraVitrine(listaIds, title) {
  const div2 = document.createElement("div");
  let dadosPRD = await getProductsListIds(listaIds);
  console.log("dadosPRD", dadosPRD);
  let fullHTML = "";
  for (const k in dadosPRD) {
    fullHTML += getProductCard(dadosPRD[k]);
  }

  div2.innerHTML = `  
      <label onclick="showMyPrev($(this))" style="display: contents; " class="dropzone ">
    <h1 style="position: absolute;margin-top: -25px;" class="labelSwitch">${title.text}</h1>
          ${fullHTML}
    </label> 
      `;

  return div2;
}

const div3 = document.createElement("div");
div3.innerHTML = ` 
      <label onclick="showMyPrev($(this))" style="display: contents; " class="dropzone ">
        <h1 style="position: absolute;margin-top: -25px;" class="labelSwitch">Receitas</h1> 
        ${getRevenueCard()}
        ${getRevenueCard()}
        ${getRevenueCard()}  
      </label> 
    `;

function cutString(str) { }

function getProductCard(data) {
  if (data) {
    console.log("os dados", data);
    let tag = "";
    if (data.product_site_tags) {
      tag = data.product_site_tags?.split(",")[0];
    }
    const card = `<div class="card-color-preview">
                      <div   >
                        <span     class="card-color-preview_tag" style=" z-index: 2 ;background: var(--color-secondary); color: var(--color-primary)">
                          ${tag}
                        </span>
                      </div>

                      <div style="  background: url(${data.product_thumbnail
      }); background-size: cover;     width: 80px;    height: 80px;    margin: -5px auto; " class="card-color-preview_icon">
                      
                      </div>

                      <div style="color: var(--color-primary)" class="card-color-preview_mark">
                       ${data.product_categoria.substr(0, 10)}...
                      </div>

                      <div style="color: var(--color-primary)" class="card-color-preview_title">
                        ${data.product_site_name.substr(0, 15)}...
                      </div>

                      <div style="color: var(--color-primary)" class="card-color-preview_units ">
                        1 unidade
                      </div>

                      <div style="color: var(--color-primary)" class="card-color-preview_stars">
                        ★★★★★
                      </div>

                      <div class="card-color-preview_price">
                        R$ ${data.product_valor}
                      </div>

                      <div style="color: var(--color-primary)" class="card-color-preview_button">
                        <svg  style="fill: var(--color-primary)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                          <path d="M112 112C112 50.14 162.1 0 224 0C285.9 0 336 50.14 336 112V160H400C426.5 160 448 181.5 448 208V416C448 469 405 512 352 512H96C42.98 512 0 469 0 416V208C0 181.5 21.49 160 48 160H112V112zM160 160H288V112C288 76.65 259.3 48 224 48C188.7 48 160 76.65 160 112V160zM136 256C149.3 256 160 245.3 160 232C160 218.7 149.3 208 136 208C122.7 208 112 218.7 112 232C112 245.3 122.7 256 136 256zM312 208C298.7 208 288 218.7 288 232C288 245.3 298.7 256 312 256C325.3 256 336 245.3 336 232C336 218.7 325.3 208 312 208z"></path>
                        </svg>

                        Adicionar
                      </div>
                </div> `;
    return card;
  } else {
    const card = `<div class="card-color-preview">
                      <div   >
                        <span     class="card-color-preview_tag" style=" z-index: 2 ;background: var(--color-primary);">
                          FALTA EDITAR
                        </span>
                      </div>

                      <div style="  background: url(${notFound}); background-size: cover;     width: 80px;    height: 80px;    margin: -5px auto; " class="card-color-preview_icon">
                      
                      </div>

                      <div class="card-color-preview_mark">
                       FALTA EDITAR
                      </div>

                      <div class="card-color-preview_title">
                        FALTA EDITAR
                      </div>

                      <div class="card-color-preview_units ">
                        1 unidade
                      </div>

                      <div class="card-color-preview_stars">
                        ★★★★★
                      </div>

                      <div class="card-color-preview_price">
                        R$ 0,00
                      </div>

                      <div class="card-color-preview_button">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                          <path d="M112 112C112 50.14 162.1 0 224 0C285.9 0 336 50.14 336 112V160H400C426.5 160 448 181.5 448 208V416C448 469 405 512 352 512H96C42.98 512 0 469 0 416V208C0 181.5 21.49 160 48 160H112V112zM160 160H288V112C288 76.65 259.3 48 224 48C188.7 48 160 76.65 160 112V160zM136 256C149.3 256 160 245.3 160 232C160 218.7 149.3 208 136 208C122.7 208 112 218.7 112 232C112 245.3 122.7 256 136 256zM312 208C298.7 208 288 218.7 288 232C288 245.3 298.7 256 312 256C325.3 256 336 245.3 336 232C336 218.7 325.3 208 312 208z"></path>
                        </svg>

                        Adicionar
                      </div>
                </div> `;
    return card;
  }
}

function getRevenueCard() {
  const card = `<div class="card-color-preview2">
                     
                      <div style="  background: url(${notFound}); background-size: cover; background-position: center;    width: 100%;    height: 150px;    margin: -5px auto; " class="card-color-preview_icon"></div>
                      
                      <div style="display: block; width: 90%; margin: auto" class="card-color-preview_button">
                      <div class="lineContents">
                       <h1 style="text-align: left;font-size: 14px;width: 90%;margin: auto;" class="titulo8">Nome da Receita Caseira</h1> 
                      </div>
                       <br>
                       <br>
                   
                        <div class="lineContents">
                          <div style="text-align: center; width: 30%" class="col-md-3">
                            <p>+- 0mins</p>
                          </div>
                          <div style="text-align: center; width: 40%" class="col-md-6">
                            <p> &#183; 0 Ingredientes</p>
                          </div>
                          <div style="text-align: center; width: 30%" class="col-md-3">
                            <p> &#183; 0 porção</p>
                          </div> 
                        </div> 
                 
                      </div>
                </div> `;
  return card;
}
const dropzoneHtml = div.firstElementChild;
const dropzoneHtml2 = div2.firstElementChild;
const dropzoneHtml3 = div3.firstElementChild;

function prepareVitrine(element, position) {
  console.log(element, position);
  let myId = Math.random().toFixed(4).replace(".", "");
  if (element.attr("conteudo") === "produto") {
    if (element.attr("theOrigin")) {
      let thisItem = homePage.body.find(
        (b) => b.id === element.attr("theOrigin")
      );
      console.log(thisItem);

      if (thisItem) {
        addItensToListStantalone(element.attr("theOrigin"));
      } else {
        let item = {
          id: myId,
          type: "vitrine",
          title: {
            text: "",
            link: "",
          },
          categories: [],
          smart: false,
          bestSellers: false,
          offers: false,
          personal: false,
          products: [],
        };
        homePage.body.push(item);
      }
    } else {
      let item = {
        id: myId,
        type: "vitrine",
        title: {
          text: "",
          link: "",
        },
        categories: [],
        smart: false,
        bestSellers: false,
        offers: false,
        personal: false,
        products: [],
      };
      homePage.body.push(item);
    }
  }
  if (element.attr("conteudo") === "receita") {
    let item = {
      id: myId,
      type: "revenues",
      title: {
        text: "",
        link: "",
      },
      categories: [],
      smart: false,
      personal: false,
      revenues: [],
    };

    homePage.body.push(item);
  }
  if (element.attr("conteudo") === "banner") {
    setOrigins(element.attr("origin"), position);
    myId = element.attr("origin").split("_")[1];
    let exists = homePage.body.find(
      (b) => b.type === "banners" && b.id === myId
    );
    if (!exists) {
      let item = {
        id: myId,
        type: "banners",
        [position]: {
          url: "",
          link: "",
        },
      };

      homePage.body.push(item);
    } else {
      for (const k in homePage.body) {
        if (
          homePage.body[k].type === "banners" &&
          homePage.body[k].id === myId
        ) {
          homePage.body[k][position] = {
            url: "",
            link: "",
          };
        }
      }
    }
  }
  if (element.attr("conteudo") === "modalLink") {
    const origin = $("#modalMudaLink").attr("origin");
    const link = homePage[origin].link;
    console.log({ link, origin });
    if (link) {
      $("#modalMudaLink")
        .find("input")
        .each(function () {
          $(this).val(link);
        });
    }
  }
  $("#modalVitrine").attr("idCurrentItem", myId);
  $("#modalReceitas").attr("idCurrentItem", myId);
  $("#modalVitrine")
    .find("input")
    .each(function () {
      $(this).attr("idCurrentItem", myId);
    });
  $("#modalVitrine")
    .find("button")
    .each(function () {
      $(this).attr("idCurrentItem", myId);
    });
  $("#modalReceitas")
    .find("input")
    .each(function () {
      $(this).attr("idCurrentItem", myId);
    });
  $("#modalReceitas")
    .find("button")
    .each(function () {
      $(this).attr("idCurrentItem", myId);
    });
}

async function publicaFecha() {
  const salva = await publishChanges();
  console.log("SALVANDO", salva);
  $(".btn-close").click();
  location.reload();
}

const dynamicContent = {
  produtos: async (list, title, id) => {
    const wrapper = document.createElement("div");
    wrapper.classList.add("content-dynamic");

    if (list && list.length > 0) {
      let content = await getAmostraVitrine(list, title);
      const dropzoneHtml3 = content.firstElementChild;
      const dropzone = dropzoneHtml3.cloneNode(1);
      const [input, image] = dropzone.children;

      let theId = id ?? Math.random().toFixed(5).replace(".", "");
      let thisOrigin = theId;
      dropzone.setAttribute("id", thisOrigin);

      wrapper.prepend(dropzone);
      const prev =
        createElementFromHTML(`<div style="display: none;position: absolute;margin: 300px;" class="dropzone-prev  justify-content-center">
      <button
      onclick="prepareVitrine($(this))"
        theOrigin="${thisOrigin}"
        conteudo="produto"
        data-bs-toggle="modal"
        data-bs-target="#modalVitrine"
        class="dropzone-prev-button  backGold"
      >
        <text class="dropzone-prev-text">Editar Vitrine</text>
      </button>
      <button
        alvoRemove="${thisOrigin}"
        onclick="removeSection($(this))"
        class="dropzone-prev-button"
      >
        <text class="dropzone-prev-text">Excluir Vitrine</text>
      </button>
    </div>`);
      wrapper.setAttribute(
        "id",
        "produto_" + Math.random().toFixed(5).replace(".", "")
      );
      wrapper.appendChild(prev);
      content2.append(wrapper);
    } else {
      $("#dropdown-content-dynamic").click();

      const dropzone = dropzoneHtml2.cloneNode(1);
      const [input, image] = dropzone.children;

      let theId = Math.random().toFixed(5).replace(".", "");
      let thisOrigin = theId;
      dropzone.setAttribute("id", thisOrigin);

      wrapper.prepend(dropzone);
      const prev =
        createElementFromHTML(`<div style="display: none;position: absolute;margin: 300px;" class="dropzone-prev  justify-content-center">
      <button
      onclick="prepareVitrine($(this))"
       theOrigin="${thisOrigin}"
        conteudo="produto"
        data-bs-toggle="modal"
        data-bs-target="#modalVitrine"
        class="dropzone-prev-button  backGold"
      >
        <text class="dropzone-prev-text">Editar Vitrine</text>
      </button>
      <button
        alvoRemove="${thisOrigin}"
        onclick="removeSection($(this))"
        class="dropzone-prev-button"
      >
        <text class="dropzone-prev-text">Excluir Vitrine</text>
      </button>
    </div>`);
      wrapper.setAttribute(
        "id",
        "produto_" + Math.random().toFixed(5).replace(".", "")
      );
      wrapper.appendChild(prev);
      content2.append(wrapper);
    }
  },
  banners: async (list) => {
    if (list) {
      console.log("asdads ", list);

      const container = document.createElement("div");
      const wrapper = document.createElement("div");
      const wrapper1 = document.createElement("div");
      container.classList.add("doisBanners");
      wrapper.classList.add("content-dynamic", "content-dynamic_small");
      wrapper1.classList.add("content-dynamic", "content-dynamic_small");
      //$("#dropdown-content-dynamic").click();

      const dropzone = dropzoneHtml.cloneNode(1);
      const dropzone1 = dropzoneHtml.cloneNode(1);

      let theId = list.id ?? Math.random().toFixed(5).replace(".", "");
      let thisOrigin = "banner_" + theId;

      dropzone.setAttribute("id", theId + "_1");
      dropzone1.setAttribute("id", theId + "_2");
      //asd
      dropzone.setAttribute("origin", thisOrigin);
      dropzone.setAttribute("stage", "first");

      dropzone1.setAttribute("origin", thisOrigin);
      dropzone1.setAttribute("stage", "second");

      dropzone1.setAttribute("id_get", theId + "_banner1");
      dropzone.setAttribute("id_get", theId + "_banner2");

      // dropzone
      //   .querySelector("img")
      //   .setAttribute("src", list[k]["second"].url);
      // dropzone1
      //   .querySelector("img")
      //   .setAttribute("src", list[k]["first"].url);

      // dropzone.querySelector("img").style.width = "100%";

      // dropzone1.querySelector("img").style.width = "100%";

      // dropzone1
      //   .querySelector("img")
      //   .setAttribute("src", list[k]["first"].url);

      wrapper.style.height = "auto";
      wrapper1.style.height = "auto";
      wrapper.appendChild(dropzone);
      wrapper1.appendChild(dropzone1);

      const prev =
        createElementFromHTML(`<div class="dropzone-prev  justify-content-center umBanner">
      <button
      onclick="prepareVitrine($(this), 'first')"
          origin="${thisOrigin}"
        conteudo="banner"
        data-bs-toggle="modal"
        data-bs-target="#modalChangePicture"
        class="dropzone-prev-button  backGold"
      >
        <text class="dropzone-prev-text">Editar Banner</text>
      </button>
      <button
      conteudo="modalLink"
      onclick="prepareVitrine($(this), 'first')"
          origin="${thisOrigin}"
        data-bs-toggle="modal"
        data-bs-target="#modalMudaLink"
        class="dropzone-prev-button"
      >
        <text class="dropzone-prev-text">Editar link</text>
      </button>
      <button
      onclick="prepareVitrine($(this), 'first')"
          origin="${thisOrigin}"
          alvoRemove="${theId}_1"
          onclick="removeSection($(this))"
        class="dropzone-prev-button"
      >
        <text class="dropzone-prev-text">Excluir Lista de Banners</text>
      </button>
          </div>`);

      const prev2 =
        createElementFromHTML(`<div class="dropzone-prev  justify-content-center umBanner">
      <button
      onclick="prepareVitrine($(this),'second')"
          origin="${thisOrigin}"
        conteudo="banner"
        data-bs-toggle="modal"
        data-bs-target="#modalChangePicture"
        class="dropzone-prev-button  backGold"
      >
        <text class="dropzone-prev-text">Editar Banner</text>
      </button>
      <button
      conteudo="modalLink"
      onclick="prepareVitrine($(this),'second')"
          origin="${thisOrigin}"
        data-bs-toggle="modal"
        data-bs-target="#modalMudaLink"
        class="dropzone-prev-button"
      >
        <text class="dropzone-prev-text">Editar link</text>
      </button>
      <button 
          origin="${thisOrigin}"
          alvoRemove="${theId}_2"
          onclick="removeSection($(this))"
        class="dropzone-prev-button"
      >
        <text class="dropzone-prev-text">Excluir Lista de Banners</text>
      </button>
          </div>`);

      wrapper.appendChild(prev);
      wrapper1.appendChild(prev2);
      container.append(wrapper);
      container.append(wrapper1);
      content2.append(container);

      setBannerIn(theId, list["first"].url, "first");
      setBannerIn(theId, list["second"].url, "second");
    } else {
      console.log("uuuuuuu ", list);
      const container = document.createElement("div");
      container.classList.add("doisBanners");
      const wrapper = document.createElement("div");
      const wrapper1 = document.createElement("div");
      wrapper.classList.add("content-dynamic", "content-dynamic_small");
      wrapper1.classList.add("content-dynamic", "content-dynamic_small");
      $("#dropdown-content-dynamic").click();

      const dropzone = dropzoneHtml.cloneNode(1);
      const dropzone1 = dropzoneHtml.cloneNode(1);
      let theId = Math.random().toFixed(5).replace(".", "");
      let thisOrigin = "banner_" + theId;
      dropzone.setAttribute("id", theId + "_1");
      dropzone1.setAttribute("id", theId + "_2");

      dropzone1.setAttribute("id_get", theId + "_banner1");
      dropzone.setAttribute("id_get", theId + "_banner2");
      wrapper.appendChild(dropzone);
      wrapper1.appendChild(dropzone1);

      const prev =
        createElementFromHTML(`<div class="dropzone-prev  justify-content-center umBanner">
      <button
      onclick="prepareVitrine($(this), 'first')"
          origin="${thisOrigin}"
        conteudo="banner"
        data-bs-toggle="modal"
        data-bs-target="#modalChangePicture"
        class="dropzone-prev-button  backGold"
      >
        <text class="dropzone-prev-text">Editar Banner</text>
      </button>
      <button
      conteudo="modalLink"
      onclick="prepareVitrine($(this), 'first')"
          origin="${thisOrigin}"
        data-bs-toggle="modal"
        data-bs-target="#modalMudaLink"
        class="dropzone-prev-button"
      >
        <text class="dropzone-prev-text">Editar link</text>
      </button>
      <button
      onclick="prepareVitrine($(this), 'first')"
          origin="${thisOrigin}"
               alvoRemove="${thisOrigin}_2"
        onclick="removeSection($(this))"
        class="dropzone-prev-button"
      >
        <text class="dropzone-prev-text">Excluir Banner</text>
      </button>
    </div>`);

      const prev2 =
        createElementFromHTML(`<div class="dropzone-prev  justify-content-center umBanner">
      <button
      onclick="prepareVitrine($(this), 'second')"
          origin="${thisOrigin}"
        conteudo="banner"
        data-bs-toggle="modal"
        data-bs-target="#modalChangePicture"
        class="dropzone-prev-button  backGold"
      >
        <text class="dropzone-prev-text">Editar Banner</text>
      </button>
      <button
      conteudo="modalLink"
      onclick="prepareVitrine($(this), 'second')"
          origin="${thisOrigin}"
        data-bs-toggle="modal"
        data-bs-target="#modalMudaLink"
        class="dropzone-prev-button"
      >
        <text class="dropzone-prev-text">Editar link</text>
      </button>
      <button
      onclick="prepareVitrine($(this), 'second')"
          origin="${thisOrigin}"
               alvoRemove="${theId}_1"
        onclick="removeSection($(this))"
        class="dropzone-prev-button"
      >
        <text class="dropzone-prev-text">Excluir Banner</text>
      </button>
    </div>`);

      wrapper.appendChild(prev);
      wrapper1.appendChild(prev2);
      container.append(wrapper);
      container.append(wrapper1);
      content2.append(container);
    }
  },
  receitas: async () => {
    const wrapper = document.createElement("div");
    wrapper.classList.add("content-dynamic");
    $("#dropdown-content-dynamic").click();

    const dropzone = dropzoneHtml3.cloneNode(1);
    // dropzone.addEventListener("dragover", handleDragOver);
    // dropzone.addEventListener("drop", handleDragDrop(input, image));
    // input.addEventListener("change", handleSelectFile(dropzone, image));
    wrapper.appendChild(dropzone);

    const prev =
      createElementFromHTML(`<div style="display: none;position: absolute;margin: 300px;" class="dropzone-prev  justify-content-center">
      <button
        data-bs-toggle="modal"
        data-bs-target="#modalReceitas"
        class="dropzone-prev-button  backGold"
      >
        <text class="dropzone-prev-text">Editar Vitrine</text>
      </button>
      <button
        data-bs-toggle="modal"
        data-bs-target="#modalDeletaVitrine"
        class="dropzone-prev-button"
      >
        <text class="dropzone-prev-text">Excluir Vitrine</text>
      </button>
    </div>`);
    wrapper.appendChild(prev);
    wrapper.setAttribute(
      "id",
      "revenue_" + Math.random().toFixed(5).replace(".", "")
    );
    content2.prepend(wrapper);
  },
};

// document
//   .querySelector("#content-dynamic-produtos")
//   .addEventListener("click", dynamicContent.produtos);
// document
//   .querySelector("#content-dynamic-banners")
//   .addEventListener("click", dynamicContent.banners);
// document
//   .querySelector("#content-dynamic-receitas")
//   .addEventListener("click", dynamicContent.receitas);

const changeColor = (cssVar, value) => {
  console.log(cssVar, value);
  if (cssVar === "--color-primary") {
    homePage["mainColors"].first = value;
    $("#color-badge_label-primary").html(value);
  } else if (cssVar === "--color-secondary") {
    homePage["mainColors"].second = value;
    $("#color-badge_label-secondary").html(value);
  } else if (cssVar === "--color-actions") {
    homePage["mainColors"].third = value;
    $("#color-badge_label-actions").html(value);
  }
  document.querySelector(":root").style.setProperty(cssVar, value);
};

const handleChangeColor = (cssVar, label) => (e) => {
  changeColor(cssVar, e.target.value);
  label.innerHTML = e.target.value;
};

const inputColorPrimary = document.querySelector("#color-badge_input-primary");
const inputColorSecondary = document.querySelector(
  "#color-badge_input-secondary"
);
const inputColorActions = document.querySelector("#color-badge_input-actions");
const labelColorPrimary = document.querySelector("#color-badge_label-primary");
const labelColorSecondary = document.querySelector(
  "#color-badge_label-secondary"
);
const labelColorActions = document.querySelector("#color-badge_label-actions");

inputColorPrimary.addEventListener(
  "change",
  handleChangeColor("--color-temp-primary", labelColorPrimary)
);
inputColorSecondary.addEventListener(
  "change",
  handleChangeColor("--color-temp-secondary", labelColorSecondary)
);
inputColorActions.addEventListener(
  "change",
  handleChangeColor("--color-temp-actions", labelColorActions)
);

document
  .querySelector("#confirm-change-color")
  .addEventListener("click", () => {
    changeColor("--color-primary", inputColorPrimary.value);
    changeColor("--color-secondary", inputColorSecondary.value);
    changeColor("--color-actions", inputColorActions.value);
  });

const menu = document.querySelector("#menu");
const navMenu = document.querySelector("#nav-menu");

menu.addEventListener("click", (e) => {
  if (!navMenu.contains(e.target)) {
    navMenu.classList.toggle("open");
  }
});

document.body.addEventListener("click", (e) => {
  e.target.contains(menu);
  e.target.contains(navMenu);

  if (!menu.contains(e.target) && !navMenu.contains(e.target)) {
    navMenu.classList.remove("open");
  }
});

function createElementFromHTML(htmlString) {
  var div = document.createElement("div");
  div.innerHTML = htmlString.trim();
  return div.firstChild;
}

//=========================== Área de CRUD =====================
let host = `{{SMART_API}}`;
async function uploadAndUpdateFile(element) {
  if (element.attr("url")) {
    element
      .parent()
      .parent()
      .parent()
      .parent()
      .find("img")
      .attr("src", element.attr("url"));
  }
  element
    .parent()
    .parent()
    .parent()
    .parent()
    .find("button")
    .each(function () {
      $(this).removeAttr("url");
    });

  element
    .parent()
    .parent()
    .parent()
    .parent()
    .find("input")
    .each(function () {
      $(this).removeAttr("url");
    });

  console.log(element);
  let files = element[0].files;
  var data = new FormData();
  data.append("fileimagem", files[0]);
  await $.ajax({
    url: host + "/uploadBanners/" + localStorage.MASTER_ID,
    headers: {
      "x-access-token": localStorage.token,
      master_id: localStorage.MASTER_ID,
    },
    data: data,
    processData: false,
    contentType: false,
    type: "PUT",
    success: function (data) {
      console.log(data);
      let URL = data.path.replace(`./public`, host);
      console.log(`URL`, URL);

      if (URL) {
        element
          .parent()
          .parent()
          .parent()
          .parent()
          .find("button")
          .each(function () {
            $(this).attr("url", URL);
          });

        element
          .parent()
          .parent()
          .parent()
          .parent()
          .find("img")
          .attr("src", URL);

        element
          .parent()
          .parent()
          .parent()
          .parent()
          .find("input")
          .each(function () {
            $(this).attr("url", URL);
          });
      }
    },
    error: function (data) { },
  });
}

async function setBannerIn(targetId, thisURL, stage) {
  console.log(targetId, thisURL, stage);
  let newid = targetId + "_banner1";
  let newid2 = targetId + "_banner2";
  $(".dropzone").each(function () {
    console.log($(this).attr("id_get"), newid, newid2);
    if ($(this).attr("id_get") === newid) {
      if (stage === "second") {
        $(this).find("img").attr("src", thisURL);
        $(this).find("img").css("width", "100%");
        $(this).find("img").css("height", "200px");
        $(this).parent().css("height", "270px");
        $(this).css("border", "none");
        $(this).css("background", "none");
        $(this).find(".rounded-icon").remove();
        $(this).find("img").show();
      }
    }
    if ($(this).attr("id_get") === newid2) {
      if (stage === "first") {
        $(this).find("img").attr("src", thisURL);
        $(this).find("img").css("width", "100%");
        $(this).find("img").css("height", "200px");
        $(this).parent().css("height", "270px");
        $(this).css("border", "none");
        $(this).css("background", "none");
        $(this).find(".rounded-icon").remove();
        $(this).find("img").show();
      }
    }
  });
}

async function changePicture(element) {
  let origin = element.attr("origin");
  if (!homePage) {
    corrigeHomePage();
  }
  if (origin) {
    let thisURL = element.attr("url");
    if (origin.split("_")[0] === "banner") {
      for (const k in homePage.body) {
        if (homePage.body[k].id === origin.split("_")[1]) {
          homePage.body[k][element.attr("stage")].url = thisURL;
          let newid = origin.split("_")[1] + "_banner1";
          let newid2 = origin.split("_")[1] + "_banner2";
          $(".dropzone").each(function () {
            console.log($(this).attr("id_get"), newid, newid2);
            if ($(this).attr("id_get") === newid) {
              if (element.attr("stage") === "second") {
                $(this).find("img").attr("src", thisURL);
                $(this).find("img").css("width", "100%");
                $(this).find("img").css("height", "200px");
                $(this).parent().css("height", "270px");
                $(this).css("border", "none");
                $(this).css("background", "none");
                $(this).find(".rounded-icon").remove();
                $(this).find("img").show();
              }
            }
            if ($(this).attr("id_get") === newid2) {
              if (element.attr("stage") === "first") {
                $(this).find("img").attr("src", thisURL);
                $(this).find("img").css("width", "100%");
                $(this).find("img").css("height", "200px");
                $(this).parent().css("height", "270px");
                $(this).css("border", "none");
                $(this).css("background", "none");
                $(this).find(".rounded-icon").remove();
                $(this).find("img").show();
              }
            }
          });
        }
      }
    } else {
      console.log("homePage ...", homePage);

      if (thisURL) {
        console.log(origin.split("-"));
        if (origin.split("-").length === 1) {
          homePage[origin].url = thisURL;
        } else if (origin.split("-").length === 2) {
          homePage[origin.split("-")[0]][origin.split("-")[1]].url = thisURL;
        } else if (origin.split("-").length === 3) {
          homePage[origin.split("-")[0]][origin.split("-")[1]][
            origin.split("-")[2]
          ].url = thisURL;
        }
        if (origin === `newsletter` || origin === `whatsapp`) {
          GLOBAL_ELEMENT_EDIT.find(`.conteudoSalvo`).css(
            `background`,
            `url(${thisURL})`
          );
          GLOBAL_ELEMENT_EDIT.find(`.conteudoSalvo`).css(
            `background-position`,
            `center`
          );
          GLOBAL_ELEMENT_EDIT.find(`.conteudoSalvo`).css(
            `background-size`,
            `cover`
          );
          GLOBAL_ELEMENT_EDIT.find(`.conteudoSalvo`).css(`zoom`, `90%`);
        }

        GLOBAL_ELEMENT_EDIT.find(`img`).attr(`src`, thisURL);
        GLOBAL_ELEMENT_EDIT.addClass(`dropped`);
        console.log(homePage);
      } else {
        console.log("url ausente");
      }
    }
  } else {
    console.log("origin ausente");
  }
  $(".btn-close").click();
}

async function changeLink(element) {
  let origin = element.attr("origin");
  if (origin.split("_")[0] === "banner") {
    let thisURL = element.attr("url");
    for (const k in homePage.body) {
      if (homePage.body[k].id === origin.split("_")[1]) {
        homePage.body[k][element.attr("stage")].link = thisURL;
      }
    }
  } else {
    if (origin) {
      let thisURL = element.attr("url");
      if (thisURL) {
        console.log(origin.split("-"));
        if (origin.split("-").length === 1) {
          homePage[origin].link = thisURL;
        } else if (origin.split("-").length === 2) {
          homePage[origin.split("-")[0]][origin.split("-")[1]].link = thisURL;
        } else if (origin.split("-").length === 3) {
          homePage[origin.split("-")[0]][origin.split("-")[1]][
            origin.split("-")[2]
          ].link = thisURL;
        }
        console.log(homePage);
      } else {
        console.log("url ausente");
      }
    } else {
      console.log("origin ausente");
    }
  }

  $(".btn-close").click();
}

function nl2br(str) {
  var breakTag = "<br>";
  let ret = (str + "").replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, breakTag);

  return ret;
}

async function changeText(element) {
  let origin = element.attr("origin");
  if (origin) {
    let thisURL = element.attr("texto");
    if (thisURL) {
      console.log(origin.split("-"));
      if (origin.split("-").length === 1) {
        homePage[origin].text = thisURL;
      } else if (origin.split("-").length === 2) {
        homePage[origin.split("-")[0]][origin.split("-")[1]].text = thisURL;
      } else if (origin.split("-").length === 3) {
        homePage[origin.split("-")[0]][origin.split("-")[1]][
          origin.split("-")[2]
        ].text = thisURL;
      }
      thisURL = nl2br(thisURL);
      console.log(`thisURL`, thisURL);
      GLOBAL_ELEMENT_EDIT.find(`.textDemo`).html(thisURL);
      GLOBAL_ELEMENT_EDIT.addClass("dropped");
      GLOBAL_ELEMENT_EDIT.find(".contentP").css("padding", "25px");
      GLOBAL_ELEMENT_EDIT.find(".contentP").html(nl2br(thisURL));
      GLOBAL_ELEMENT_EDIT.css("background", "white");

      console.log(homePage);
    } else {
      console.log("texto ausente");
    }
  } else {
    console.log("origin ausente");
  }
  $(".btn-close").click();

  GLOBAL_ELEMENT_EDIT.addClass("dropped");
}

function setUrlButton(element, e) {
  element
    .parent()
    .parent()
    .parent()
    .parent()
    .find(".rounded-pill")
    .attr("url", element.val());
}

function setTxtButton(element, e) {
  element
    .parent()
    .parent()
    .parent()
    .parent()
    .find(".rounded-pill")
    .attr("texto", element.val());
}

function setMeSocialMidia(element, target) {
  let destiny = element.attr("destiny");
  if (destiny) {
    if (target === "active") {
      let active = element[0].checked;
      homePage["socialMidia"][destiny]["status"] = active;
    } else {
      let link = element.val();
      homePage["socialMidia"][destiny]["link"] = link;
    }
    GLOBAL_ELEMENT_EDIT.addClass("dropped");
    GLOBAL_ELEMENT_EDIT.css("background", "white");
    GLOBAL_ELEMENT_EDIT.find(".midiasSociais").show();
    setMidiasSociais();
    console.log(homePage);
  } else {
    console.log("destiny ausente");
  }
}

function setMeFooterMenu(element, contatctData) {
  if (!contatctData) {
    let destiny = element.attr("destiny");
    let link = element.attr("link");
    let description = element.attr("description");

    if (destiny) {
      homePage["footerLinks"][destiny].push({
        text: description,
        link: link,
      });

      console.log(homePage);
    } else {
      console.log("destiny ausente");
    }
  } else {
    let destiny = "contactData";
    let text = element.val();

    text = text.replace(/\n\r/g, "<br>");
    text = text.replace(/(\r\n|\n|\r)/gm, "<br>");
    if (destiny) {
      homePage["footerLinks"][destiny].text = text;
      console.log(homePage);
    } else {
      console.log("destiny ausente");
    }
  }
  setLinksFooterElements();
}

function removeMeFooterMenu(element) {
  let destiny = element.attr("destiny");
  let link = element.attr("link");
  let description = element.attr("description");
  if (destiny) {
    let thisObject = homePage["footerLinks"][destiny];
    let newObject = [];
    for (const k in thisObject) {
      console.log(thisObject[k], description, link);
      if (thisObject[k].text !== description || thisObject[k].link !== link) {
        newObject.push({
          text: thisObject[k].text,
          link: thisObject[k].link,
        });
      }
    }
    console.log(newObject);
    homePage["footerLinks"][destiny] = newObject;
    console.log(homePage);
  } else {
    console.log("destiny ausente");
  }
  element.parent().parent().remove();
}

function addLink(element, destiny) {
  let link = element.parent().find(".linkContact").val();
  let text = element.parent().find(".textContact").val();

  GLOBAL_ELEMENT_EDIT.find(`.linksFooter`).show();
  GLOBAL_ELEMENT_EDIT.find(`.linksFooter`).css(`display`, `inline-flex`);
  GLOBAL_ELEMENT_EDIT.css(`background`, `white`);
  GLOBAL_ELEMENT_EDIT.addClass(`dropped`);

  if (link && text && link != "" && text != "") {
    element.attr("destiny", destiny);
    element.attr("link", link);
    element.attr("description", text);
    setMeFooterMenu(element);
    let HTML = `
                        <div class="cardSearch"> 
                          <div class="itemSearch" style="padding-top: 15px;">
                            <svg xmlns="http://www.w3.org/2000/svg" style="fill: #687c97;" width="13.5" height="23" viewBox="0 0 9 16">
                              <defs></defs>
                              <path class="a"
                                d="M2.5,16h-1A1.5,1.5,0,0,1,0,14.5v-1A1.5,1.5,0,0,1,1.5,12h1A1.5,1.5,0,0,1,4,13.5v1A1.5,1.5,0,0,1,2.5,16Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1a.5.5,0,0,0,.5-.5v-1a.5.5,0,0,0-.5-.5Zm1-3h-1A1.5,1.5,0,0,1,0,8.5v-1A1.5,1.5,0,0,1,1.5,6h1A1.5,1.5,0,0,1,4,7.5v1A1.5,1.5,0,0,1,2.5,10Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1A.5.5,0,0,0,3,8.5v-1A.5.5,0,0,0,2.5,7Zm1-3h-1A1.5,1.5,0,0,1,0,2.5v-1A1.5,1.5,0,0,1,1.5,0h1A1.5,1.5,0,0,1,4,1.5v1A1.5,1.5,0,0,1,2.5,4Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1A.5.5,0,0,0,3,2.5v-1A.5.5,0,0,0,2.5,1Z">
                              </path>
                              <path class="a"
                                d="M2.5,16h-1A1.5,1.5,0,0,1,0,14.5v-1A1.5,1.5,0,0,1,1.5,12h1A1.5,1.5,0,0,1,4,13.5v1A1.5,1.5,0,0,1,2.5,16Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1a.5.5,0,0,0,.5-.5v-1a.5.5,0,0,0-.5-.5Zm1-3h-1A1.5,1.5,0,0,1,0,8.5v-1A1.5,1.5,0,0,1,1.5,6h1A1.5,1.5,0,0,1,4,7.5v1A1.5,1.5,0,0,1,2.5,10Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1A.5.5,0,0,0,3,8.5v-1A.5.5,0,0,0,2.5,7Zm1-3h-1A1.5,1.5,0,0,1,0,2.5v-1A1.5,1.5,0,0,1,1.5,0h1A1.5,1.5,0,0,1,4,1.5v1A1.5,1.5,0,0,1,2.5,4Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1A.5.5,0,0,0,3,2.5v-1A.5.5,0,0,0,2.5,1Z"
                                transform="translate(5)"></path>
                            </svg> 
                          </div>
                          <div class="itemSearch" style="padding-top: 15px;width: 60%;">
                            <p class="cardText">${text}</p>
                          </div> 
                          <div class="itemSearch" style=" width: 300px;">
                            <button onclick="removeMeFooterMenu($(this))" link="${link}" description="${text}" destiny="${destiny}" style="zoom: 80%;background-color: white; border: 1px solid #f6b504; color: #f6b504; margin-right: 15px;"
                              type="button" id="picture-save-button" tabindex="6"  
                              class="btn btn-save rounded-pill">Remover da coluna</button>
                          </div>
                        </div>
                        `;
    element.parent().parent().parent().find(".areaMenus").append(HTML);
  }
}

function addLinkObject(text, link, destiny) {
  // let link = element.parent().find(".linkContact").val();
  // let text = element.parent().find(".textContact").val();

  // GLOBAL_ELEMENT_EDIT.find(`.linksFooter`).show();
  // GLOBAL_ELEMENT_EDIT.find(`.linksFooter`).css(`display`, `inline-flex`);
  // GLOBAL_ELEMENT_EDIT.css(`background`, `white`);
  // GLOBAL_ELEMENT_EDIT.addClass(`dropped`);

  if (link && text && link != "" && text != "") {
    // element.attr("destiny", destiny);
    // element.attr("link", link);
    // element.attr("description", text);
    // setMeFooterMenu(element);
    let HTML = `
                        <div class="cardSearch"> 
                          <div class="itemSearch" style="padding-top: 15px;">
                            <svg xmlns="http://www.w3.org/2000/svg" style="fill: #687c97;" width="13.5" height="23" viewBox="0 0 9 16">
                              <defs></defs>
                              <path class="a"
                                d="M2.5,16h-1A1.5,1.5,0,0,1,0,14.5v-1A1.5,1.5,0,0,1,1.5,12h1A1.5,1.5,0,0,1,4,13.5v1A1.5,1.5,0,0,1,2.5,16Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1a.5.5,0,0,0,.5-.5v-1a.5.5,0,0,0-.5-.5Zm1-3h-1A1.5,1.5,0,0,1,0,8.5v-1A1.5,1.5,0,0,1,1.5,6h1A1.5,1.5,0,0,1,4,7.5v1A1.5,1.5,0,0,1,2.5,10Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1A.5.5,0,0,0,3,8.5v-1A.5.5,0,0,0,2.5,7Zm1-3h-1A1.5,1.5,0,0,1,0,2.5v-1A1.5,1.5,0,0,1,1.5,0h1A1.5,1.5,0,0,1,4,1.5v1A1.5,1.5,0,0,1,2.5,4Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1A.5.5,0,0,0,3,2.5v-1A.5.5,0,0,0,2.5,1Z">
                              </path>
                              <path class="a"
                                d="M2.5,16h-1A1.5,1.5,0,0,1,0,14.5v-1A1.5,1.5,0,0,1,1.5,12h1A1.5,1.5,0,0,1,4,13.5v1A1.5,1.5,0,0,1,2.5,16Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1a.5.5,0,0,0,.5-.5v-1a.5.5,0,0,0-.5-.5Zm1-3h-1A1.5,1.5,0,0,1,0,8.5v-1A1.5,1.5,0,0,1,1.5,6h1A1.5,1.5,0,0,1,4,7.5v1A1.5,1.5,0,0,1,2.5,10Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1A.5.5,0,0,0,3,8.5v-1A.5.5,0,0,0,2.5,7Zm1-3h-1A1.5,1.5,0,0,1,0,2.5v-1A1.5,1.5,0,0,1,1.5,0h1A1.5,1.5,0,0,1,4,1.5v1A1.5,1.5,0,0,1,2.5,4Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1A.5.5,0,0,0,3,2.5v-1A.5.5,0,0,0,2.5,1Z"
                                transform="translate(5)"></path>
                            </svg> 
                          </div>
                          <div class="itemSearch" style="padding-top: 15px;width: 60%;">
                            <p class="cardText">${text}</p>
                          </div> 
                          <div class="itemSearch" style=" width: 300px;">
                            <button onclick="removeMeFooterMenu($(this))" link="${link}" description="${text}" destiny="${destiny}" style="zoom: 80%;background-color: white; border: 1px solid #f6b504; color: #f6b504; margin-right: 15px;"
                              type="button" id="picture-save-button" tabindex="6"  
                              class="btn btn-save rounded-pill">Remover da coluna</button>
                          </div>
                        </div>
                        `;
    return HTML;
  }
  return "";
}
function setColumnTitle(element) {
  let destiny = element.attr("destiny");
  if (destiny) {
    homePage["footerLinks"][destiny].text = element.val();
    console.log(homePage);
  } else {
    console.log("destiny ausente");
  }
}

function setLinksFooterElements() {
  $(`.linksInternosPrimeira`).html("");
  $(`.linksInternosSegunda`).html("");
  $(`.linksInternosTerceira`).html("");

  $(`.tituloLinkFooterPrimeira`).text(
    homePage.footerLinks.firstColumnTittle.text
  );
  homePage.footerLinks.firstColumn.forEach((element) => {
    $(`.linksInternosPrimeira`).append(
      `<a class="linkInterno" href="${element.link}"> ${element.text} <a>`
    );
  });
  $(`.tituloLinkFooterSegunda`).text(
    homePage.footerLinks.secondColumnTittle.text
  );
  homePage.footerLinks.secondColumn.forEach((element) => {
    $(`.linksInternosSegunda`).append(
      `<a class="linkInterno" href="${element.link}"> ${element.text} <a>`
    );
  });
  $(`.tituloLinkFooterTerceira`).text(
    homePage.footerLinks.thirdColumnTittle.text
  );
  homePage.footerLinks.thirdColumn.forEach((element) => {
    $(`.linksInternosTerceira`).append(
      `<a class="linkInterno" href="${element.link}"> ${element.text} <a>`
    );
  });
  $(`.contato`)
    .find(`.linksInternos`)
    .html(homePage.footerLinks.contactData.text);
}

function setMidiasSociais() {
  $(`.midiasSociais`).html(``);

  let youtube = `<svg  style="margin: 10px;${homePage.socialMidia.facebook.active === true ? `` : `display: block`
    } " xmlns="http://www.w3.org/2000/svg" width="22.939" height="16.129"
                  viewBox="0 0 22.939 16.129">
                  <path id="facebook"
                    d="M37.393,66.524a2.882,2.882,0,0,0-2.028-2.041C33.576,64,26.4,64,26.4,64s-7.173,0-8.962.482a2.882,2.882,0,0,0-2.028,2.041,32.453,32.453,0,0,0,0,11.114,2.839,2.839,0,0,0,2.028,2.009c1.789.482,8.962.482,8.962.482s7.173,0,8.962-.482a2.839,2.839,0,0,0,2.028-2.009,32.453,32.453,0,0,0,0-11.114ZM24.057,75.492V68.67l6,3.411Z"
                    transform="translate(-14.933 -64)" fill="#8897ad" />
                </svg><a>`;

  $(`.midiasSociais`).append(youtube);
  $(`.midiasSociais`).append(youtube);
  $(`.midiasSociais`).append(youtube);
}

//====================AREA FOR REQUEST========================

getMyObjectHomeMain();
async function applyChanges(homePageNew) {
  if (homePageNew) {
    homePage = homePageNew;
  }
  $("#color-badge_label-actions").html(homePage.mainColors.third);
  $("#color-badge_label-primary").html(homePage.mainColors.first);
  $("#color-badge_label-secondary").html(homePage.mainColors.second);
  console.log(`home page`, homePage);
  $("#contactDataMenu").val(homePage.footerLinks.contactData.text);
  if (homePage.footerLinks.firstColumn.length > 0) {
    console.log("homePage.footerLinks", homePage.footerLinks);
    for (const k in homePage.footerLinks.firstColumn) {
      $(".firstColumn").append(
        addLinkObject(
          homePage.footerLinks.firstColumn[k].text,
          homePage.footerLinks.firstColumn[k].link,
          "firstColumn"
        )
      );
    }
  }
  if (homePage.footerLinks.secondColumn.length > 0) {
    for (const k in homePage.footerLinks.secondColumn) {
      $(".secondColumn").append(
        addLinkObject(
          homePage.footerLinks.secondColumn[k].text,
          homePage.footerLinks.secondColumn[k].link,
          "secondColumn"
        )
      );
    }
  }
  if (homePage.footerLinks.thirdColumn.length > 0) {
    for (const k in homePage.footerLinks.thirdColumn) {
      $(".thirdColumn").append(
        addLinkObject(
          homePage.footerLinks.thirdColumn[k].text,
          homePage.footerLinks.thirdColumn[k].link,
          "thirdColumn"
        )
      );
    }
  }

  for (const k in homePage.footerLinks) {
    $(".colunas").each(function () {
      if ($(this).attr("destiny") === k) {
        $(this).val(homePage.footerLinks[k].text);
      }
    });
  }
  for (const u in homePage.body) {
    const index = Number(u) + 1;
    console.log("index", index);
    let obj = homePage.body[u]; //homePage.body[homePage.body.length - index];
    console.log("O OBJETO", obj);
    if (obj.type === "vitrine") {
      if (obj.products.length > 0) {
        await dynamicContent.produtos(obj.products, obj.title, obj.id);
      }
    }
    if (obj.type === "banners") {
      await dynamicContent.banners(obj);
    }
    if (obj.type === "revenues") {
    }
  }

  // for (const l in conteudo) {
  //   if (conteudo[l].type === "vitrine") {
  //     dynamicContent.produtos(conteudo[l].products, conteudo[l].title);
  //   }
  //   if (conteudo[l].type === "banners") {
  //     dynamicContent.banners(conteudo[l]);
  //   }
  //   if (conteudo[l].type === "revenues") {
  //   }
  // }
  start();
}
async function getMyObjectHomeMain() {
  $.ajax({
    type: "POST",
    url: host + "/getById",
    data: {
      affiliate_id: localStorage.AFFILIATE_ID,
      table: "masters",
      id_name: "id",
      id_value: localStorage.MASTER_ID,
    },
    headers: {
      "x-access-token": localStorage.token,
    },
    success: async function (data) {
      console.log("data", data);
      try {
        let news = JSON.parse(ajustStrigfy(nl2br(data[0].home_main_info)));
        homePage = news;
        $("#color-badge_label-actions").html(news.mainColors.third);
        $("#color-badge_label-primary").html(news.mainColors.first);
        $("#color-badge_label-secondary").html(news.mainColors.second);
        console.log(`home page`, homePage);
        $("#contactDataMenu").val(homePage.footerLinks.contactData.text);
        if (homePage.footerLinks.firstColumn.length > 0) {
          console.log("homePage.footerLinks", homePage.footerLinks);
          for (const k in homePage.footerLinks.firstColumn) {
            $(".firstColumn").append(
              addLinkObject(
                homePage.footerLinks.firstColumn[k].text,
                homePage.footerLinks.firstColumn[k].link,
                "firstColumn"
              )
            );
          }
        }
        if (homePage.footerLinks.secondColumn.length > 0) {
          for (const k in homePage.footerLinks.secondColumn) {
            $(".secondColumn").append(
              addLinkObject(
                homePage.footerLinks.secondColumn[k].text,
                homePage.footerLinks.secondColumn[k].link,
                "secondColumn"
              )
            );
          }
        }
        if (homePage.footerLinks.thirdColumn.length > 0) {
          for (const k in homePage.footerLinks.thirdColumn) {
            $(".thirdColumn").append(
              addLinkObject(
                homePage.footerLinks.thirdColumn[k].text,
                homePage.footerLinks.thirdColumn[k].link,
                "thirdColumn"
              )
            );
          }
        }

        for (const k in homePage.footerLinks) {
          $(".colunas").each(function () {
            if ($(this).attr("destiny") === k) {
              $(this).val(homePage.footerLinks[k].text);
            }
          });
        }
        for (const u in homePage.body) {
          const index = Number(u) + 1;
          console.log("index", index);
          let obj = homePage.body[u]; //homePage.body[homePage.body.length - index];
          console.log("O OBJETO", obj);
          if (obj.type === "vitrine") {
            if (obj.products.length > 0) {
              await dynamicContent.produtos(obj.products, obj.title, obj.id);
            }
          }
          if (obj.type === "banners") {
            await dynamicContent.banners(obj);
          }
          if (obj.type === "revenues") {
          }
        }

        // for (const l in conteudo) {
        //   if (conteudo[l].type === "vitrine") {
        //     dynamicContent.produtos(conteudo[l].products, conteudo[l].title);
        //   }
        //   if (conteudo[l].type === "banners") {
        //     dynamicContent.banners(conteudo[l]);
        //   }
        //   if (conteudo[l].type === "revenues") {
        //   }
        // }
        start();
      } catch (err) {
        console.log(err);
      }
    },
    error: function (data) {
      console.log(data);
    },
    complete: function () { },
  });
}
function start() {
  $(`.dropzone`).each(function () {
    let origin = $(this).attr(`origin`);
    if (origin) {
      console.log(origin, origin.split(`-`).length);
      if (origin.split(`-`).length === 1) {
        $(this).addClass(`dropped`);
        $(this).find(`img`).attr(`src`, homePage[origin]?.url);
      } else if (origin.split(`-`).length === 2) {
        $(this).addClass(`dropped`);
        $(this)
          .find(`img`)
          .attr(
            `src`,
            homePage[origin.split(`-`)[0]][origin.split(`-`)[1]]?.url
          );
      } else if (origin.split(`-`).length === 3) {
        $(this).addClass(`dropped`);
        $(this)
          .find(`img`)
          .attr(
            `src`,
            homePage[origin.split(`-`)[0]][origin.split(`-`)[1]][
              origin.split(`-`)[2]
            ]?.url
          );
      }

      $(this).find(".conteudoSalvo").show();
      $(this)
        .find(".conteudoSalvo")
        .css("background", `url(${homePage[origin]?.url})`);
      $(this).find(".conteudoSalvo").css("background-size", "cover");
      $(this).find(".conteudoSalvo").css("background-position", "center");
      $(this).find(".linksFooter").show();
      if (origin === "footerLinks") {
        $(this).find(".linksFooter").css("display", "inline-flex");
      }
      if (origin === "legalText" || origin === "footerText") {
        $(this).find(".contentP").html(homePage[origin]?.text);
      }
      var r = document.querySelector(":root");
      r.style.setProperty("--color-primary", homePage.mainColors.first);
      r.style.setProperty("--color-secondary", homePage.mainColors.second);
      r.style.setProperty("--color-actions", homePage.mainColors.third);

      document
        .querySelector(":root")
        .style.setProperty("--color-primary", homePage.mainColors.first);
      document
        .querySelector(":root")
        .style.setProperty("--color-secondary", homePage.mainColors.second);
      document
        .querySelector(":root")
        .style.setProperty("--color-actions", homePage.mainColors.third);
    } else {
      console.log($(this), "não tem origin");
    }
  });
  setLinksFooterElements();
  setMidiasSociais();
}

// logarDev();
// async function logarDev() {
//   $.ajax({
//     type: "POST",
//     url: host + "/login",
//     data: {
//       user: `ronantj@hotmail.com`,
//       table: "users_affiliates",
//       prefix: "users_affiliate",
//       password: `mdt1234@`,
//     },
//     success: function (data) {
//       console.log(data);
//       localStorage.AFFILIATE_ID = data.data.users_affiliate_id;
//       localStorage.MASTER_ID = data.data.users_affiliate_master_id;
//       localStorage.token = data.token;
//     },
//     error: function (data) {
//       //console.log(data);
//       //   alertar("O login falhou!")
//     },
//     complete: function () {},
//   });
// }

async function publishChanges() {
  let newBody = homePage.body,
    theBody = [];
  for (const k in newBody) {
    if (newBody[k].type === "vitrine") {
      if (newBody[k].products.length > 0) {
        theBody.push(newBody[k]);
      }
    } else {
      theBody.push(newBody[k]);
    }
  }
  homePage.body = theBody;

  homePage.legalText.text = nl2br(homePage.legalText.text)
  return $.ajax({
    type: "POST",
    url: host + "/updateMastersTable",
    data: {
      master_id: localStorage.MASTER_ID,
      field: "home_main_info",
      value: JSON.stringify(homePage),
    },
    headers: {
      "x-access-token": localStorage.token,
    },
    success: function (data) {
      console.log("publish", data);
      window.parent.informar(
        "alert-success",
        "As alterações foram aplicadas com sucesso!",
        3000
      );
    },
    error: function (data) {
      console.log(data);
      window.parent.informar("alert-danger", "Ocorreu um erro!", 3000);
    },
    complete: function () { },
  });
}

async function getProductsListIds(listIds) {
  console.log("a lista ", listIds);
  return $.ajax({
    url: host + "/listaIds",
    data: {
      product_list_ids: listIds,
      affiliate_id: localStorage.AFFILIATE_ID,
    },
    type: "POST",
    success: function (data) {
      console.log("produtos", data);
    },
    error: function (data) {
      console.log("erro busca produto", data);
    },
  });
}

function getCardProduct(data, currentId) {
  let HTML = `
                    <div id="prdCode_${data.product_code}" product_code="${data.product_code}" class="cardProduct">
                      <div class="cardHeaderPrd">
                        <svg xmlns="http://www.w3.org/2000/svg" style="fill: #687c97;" width="13.5" height="23" viewBox="0 0 9 16">
                          <defs></defs>
                          <path class="a"
                            d="M2.5,16h-1A1.5,1.5,0,0,1,0,14.5v-1A1.5,1.5,0,0,1,1.5,12h1A1.5,1.5,0,0,1,4,13.5v1A1.5,1.5,0,0,1,2.5,16Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1a.5.5,0,0,0,.5-.5v-1a.5.5,0,0,0-.5-.5Zm1-3h-1A1.5,1.5,0,0,1,0,8.5v-1A1.5,1.5,0,0,1,1.5,6h1A1.5,1.5,0,0,1,4,7.5v1A1.5,1.5,0,0,1,2.5,10Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1A.5.5,0,0,0,3,8.5v-1A.5.5,0,0,0,2.5,7Zm1-3h-1A1.5,1.5,0,0,1,0,2.5v-1A1.5,1.5,0,0,1,1.5,0h1A1.5,1.5,0,0,1,4,1.5v1A1.5,1.5,0,0,1,2.5,4Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1A.5.5,0,0,0,3,2.5v-1A.5.5,0,0,0,2.5,1Z">
                          </path>
                          <path class="a"
                            d="M2.5,16h-1A1.5,1.5,0,0,1,0,14.5v-1A1.5,1.5,0,0,1,1.5,12h1A1.5,1.5,0,0,1,4,13.5v1A1.5,1.5,0,0,1,2.5,16Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1a.5.5,0,0,0,.5-.5v-1a.5.5,0,0,0-.5-.5Zm1-3h-1A1.5,1.5,0,0,1,0,8.5v-1A1.5,1.5,0,0,1,1.5,6h1A1.5,1.5,0,0,1,4,7.5v1A1.5,1.5,0,0,1,2.5,10Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1A.5.5,0,0,0,3,8.5v-1A.5.5,0,0,0,2.5,7Zm1-3h-1A1.5,1.5,0,0,1,0,2.5v-1A1.5,1.5,0,0,1,1.5,0h1A1.5,1.5,0,0,1,4,1.5v1A1.5,1.5,0,0,1,2.5,4Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1A.5.5,0,0,0,3,2.5v-1A.5.5,0,0,0,2.5,1Z"
                            transform="translate(5)"></path>
                        </svg>
                        <p class="cardNumber">${data.product_code}</p>
                     

                         <div class="btnRemoveProduto" style="float: right;width: calc(100% - 60px);align-items: right;">
                          <div currentid="${currentId}" onclick="removeProduto7($(this))" class=" deleteThis" style="float: right;    width: calc(100% - 60px);    margin-top: -10px;    text-align: right; cursor: pointer "><svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 21 21" style="fill: #f6b504;margin: 9px;">&gt;<defs></defs><path class="a" d="M10.937,16H3.063A2.208,2.208,0,0,1,.875,13.778V2.666H.438a.444.444,0,0,1,0-.889H4.375V1.334A1.324,1.324,0,0,1,5.687,0H8.313A1.324,1.324,0,0,1,9.625,1.334v.444h3.937a.444.444,0,0,1,0,.889h-.437V13.778A2.208,2.208,0,0,1,10.937,16ZM1.75,2.666V13.778a1.325,1.325,0,0,0,1.313,1.334h7.875a1.325,1.325,0,0,0,1.313-1.334V2.666ZM5.687.889a.441.441,0,0,0-.437.445v.444h3.5V1.334A.441.441,0,0,0,8.313.889Zm3.5,11.556A.442.442,0,0,1,8.75,12V5.778a.437.437,0,1,1,.875,0V12A.441.441,0,0,1,9.188,12.445Zm-4.375,0A.441.441,0,0,1,4.375,12V5.778a.437.437,0,1,1,.875,0V12A.442.442,0,0,1,4.812,12.445Z" transform="translate(4 3)"></path></svg></div>
                         </div>
                      </div>
                      <div
                        style="background:  url(${data.product_thumbnail}) no-repeat padding-box; background-size: contain;"
                        class="cardImage">
                      </div>
                  
                      <p class="cardText">${data.product_site_name}</p>
                  
                  
                    </div>
  `;
  return HTML;
}

function removeProduto7(element) {
  let code = element.parent().parent().parent().attr("product_code");
  for (const k in homePage.body) {
    if (homePage.body[k].id === element.attr("currentId")) {
      let newPrd = [];
      for (const a in homePage.body[k].products) {
        console.log("coparacao", homePage.body[k].products[a], Number(code));
        if (homePage.body[k].products[a] !== Number(code)) {
          newPrd.push(homePage.body[k].products[a]);
        }
      }
      homePage.body[k].products = newPrd;
    }
  }
  element.parent().parent().parent().remove();
  console.log(homePage);
}

function getProductHTML(data, currentId) {
  let HTML = "";

  for (const k in data) {
    HTML += `<div class="cardSearch">
                  <div
                    style="background:  url(${data[k].product_thumbnail}) no-repeat padding-box; background-size: contain;"
                    class="imgSearch"
                  ></div>

                  <div class="itemSearch" style="padding-top: 15px;">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      style="fill: #687c97;"
                      width="13.5"
                      height="23"
                      viewBox="0 0 9 16"
                    >
                      <defs></defs>
                      <path
                        class="a"
                        d="M2.5,16h-1A1.5,1.5,0,0,1,0,14.5v-1A1.5,1.5,0,0,1,1.5,12h1A1.5,1.5,0,0,1,4,13.5v1A1.5,1.5,0,0,1,2.5,16Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1a.5.5,0,0,0,.5-.5v-1a.5.5,0,0,0-.5-.5Zm1-3h-1A1.5,1.5,0,0,1,0,8.5v-1A1.5,1.5,0,0,1,1.5,6h1A1.5,1.5,0,0,1,4,7.5v1A1.5,1.5,0,0,1,2.5,10Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1A.5.5,0,0,0,3,8.5v-1A.5.5,0,0,0,2.5,7Zm1-3h-1A1.5,1.5,0,0,1,0,2.5v-1A1.5,1.5,0,0,1,1.5,0h1A1.5,1.5,0,0,1,4,1.5v1A1.5,1.5,0,0,1,2.5,4Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1A.5.5,0,0,0,3,2.5v-1A.5.5,0,0,0,2.5,1Z"
                      ></path>
                      <path
                        class="a"
                        d="M2.5,16h-1A1.5,1.5,0,0,1,0,14.5v-1A1.5,1.5,0,0,1,1.5,12h1A1.5,1.5,0,0,1,4,13.5v1A1.5,1.5,0,0,1,2.5,16Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1a.5.5,0,0,0,.5-.5v-1a.5.5,0,0,0-.5-.5Zm1-3h-1A1.5,1.5,0,0,1,0,8.5v-1A1.5,1.5,0,0,1,1.5,6h1A1.5,1.5,0,0,1,4,7.5v1A1.5,1.5,0,0,1,2.5,10Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1A.5.5,0,0,0,3,8.5v-1A.5.5,0,0,0,2.5,7Zm1-3h-1A1.5,1.5,0,0,1,0,2.5v-1A1.5,1.5,0,0,1,1.5,0h1A1.5,1.5,0,0,1,4,1.5v1A1.5,1.5,0,0,1,2.5,4Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1A.5.5,0,0,0,3,2.5v-1A.5.5,0,0,0,2.5,1Z"
                        transform="translate(5)"
                      ></path>
                    </svg>
                    <p class="cardNumber">${data[k].product_code}</p>
                  </div>
             
                  <div class="itemSearch" style="padding-top: 15px;width: 60%;">
                    <p class="cardText">
                      ${data[k].product_site_name}
                    </p>
                  </div>

                  <div style="min-width:  120px;" class="itemSearch">
                    <p class="labelSwitch">R$ ${data[k].product_valor}</p>
                  </div>

                  <div class="itemSearch">
                    <button
                      currentId="${currentId}"
                      onclick="addItensToList($(this), '${data[k].product_code}')"
                      style=" margin-right: 15px"
                      type="button"
                      id="picture-save-button"
                      tabindex="6"
                      class="btn btn-save rounded-pill btnAddItem"
                    >
                      Adicionar
                    </button>
                  </div>
                </div>`;
  }

  return HTML;
}

async function addItensToListStantalone(id) {
  if (id) {
    $("#lista").html("");
    for (const k in homePage.body) {
      if (homePage.body[k].id === id) {
        $("#tituloVitrine1").val(homePage.body[k].title.text);
        if (homePage.body[k].products.length > 0) {
          let products = await getProductsListIds(homePage.body[k].products);
          localStorage.CACHE_SEARCH = JSON.stringify(products);
          for (const k in products) {
            $("#lista").append(getCardProduct(products[k], id));
          }
        }
      }
    }
  }
}

function addItensToList(element, code) {
  for (const k in homePage.body) {
    if (homePage.body[k].id === element.attr("currentId")) {
      const exists = homePage.body[k].products.find(
        (prdt) => prdt === Number(code)
      );
      if (!exists) {
        if (homePage.body[k].products.length < 6) {
          console.log(code);
          let prd = CACHE_SEARCH.find((c) => c.product_code === Number(code));
          homePage.body[k].products.push(prd.product_code);
          $("#lista").append(getCardProduct(prd, element.attr("currentId")));
        } else {
          window.parent.informar(
            "alert-danger",
            "Vitrine só comporta 6 itens!",
            3000
          );
        }
      } else {
        window.parent.informar(
          "alert-danger",
          "Produto ja está na lista!",
          3000
        );
      }
    }
  }
}

let CACHE_SEARCH = [];

async function searchProducts(element) {
  let text = element.val();
  let currentId = element.attr("idcurrentitem");
  let exi = homePage.body.find((bd) => bd.id === element.attr("idcurrentitem"));

  if (element.attr("origin") && !exi) {
    exi = homePage.body.find((bd) => bd.id === element.attr("origin"));
    if (exi) {
      currentId = element.attr("origin");
    }
  }

  $("#searchSpinner").show();
  if (text != "") {
    $.ajax({
      url: host + "/productSearchSite",
      data: {
        product_code: text,
        product_site_name: text,
        product_affiliate_id: localStorage.AFFILIATE_ID,
        lastID: 0,
        totalItems: 50,
      },
      type: "POST",
      success: function (data) {
        console.log("produtos", data);
        CACHE_SEARCH = data;

        $(".areaResultado").html(getProductHTML(data, currentId));

        //here
        $("#searchSpinner").hide();
      },
      error: function (data) {
        console.log("erro busca produto", data);
        $("#searchSpinner").hide();
      },
    });
  } else {
    $(".areaResultado").html("");
    $("#searchSpinner").hide();
  }
}

function setVitrine(element) {
  let splitContent = element.attr("conteudo").split("-").length;
  if (splitContent === 1) {
    if (element.attr("conteudo") === "products") {
    } else if (element.attr("conteudo") === "categories") {
    } else if (element.attr("conteudo") === "personal") {
      showMe(element);
    } else if (element.attr("conteudo") === "search") {
      searchProducts(element);
    } else if (element.attr("conteudo") === "revenues") {
    } else {
      let exist = homePage.body.find(
        (bd) => bd.id === element.attr("idcurrentitem")
      );
      if (exist) {
        for (const k in homePage.body) {
          if (homePage.body[k].id === element.attr("idcurrentitem")) {
            homePage.body[k][element.attr("conteudo")] = element[0].checked;
          }
        }
      } else {
        for (const k in homePage.body) {
          if (homePage.body[k].id === element.attr("origin")) {
            homePage.body[k][element.attr("conteudo")] = element[0].checked;
          }
        }
      }
    }
  } else if (splitContent === 2) {
    let exist = homePage.body.find(
      (bd) => bd.id === element.attr("idcurrentitem")
    );
    if (exist) {
      for (const k in homePage.body) {
        if (homePage.body[k].id === element.attr("idcurrentitem")) {
          if (homePage.body[k].type === "banners") {
          } else {
            homePage.body[k][element.attr("conteudo").split("-")[0]].text =
              element.val();
          }
        }
      }
    } else {
      for (const k in homePage.body) {
        if (homePage.body[k].id === element.attr("origin")) {
          if (homePage.body[k].type === "banners") {
          } else {
            homePage.body[k][element.attr("conteudo").split("-")[0]].text =
              element.val();
          }
        }
      }
    }
  }
  console.log(homePage);
}

function ajustStrigfy(texto) {
  for (let a = 0; a < 120; a++) {
    texto = texto.replace(/"{/g, "{").replace(/}"/g, "}");
    texto = texto.replace('"[', "[").replace(']"', "]");
  }

  return texto;
}

function removeSection(element) {
  if (
    element.attr("alvoRemove").indexOf("_1") > -1 ||
    element.attr("alvoRemove").indexOf("_2") > -1
  ) {
    $("#" + element.attr("alvoRemove"))
      .parent()
      .parent()
      .remove();
  } else {
    $("#" + element.attr("alvoRemove"))
      .parent()
      .remove();
  }

  let theId = element.attr("alvoRemove").replace("_1", "").replace("_2", "");
  homePage.body = homePage.body.filter((bd) => bd.id !== theId);
  console.log(homePage);

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

  function addContentRevenues(data) {
    if (data && data.title && data.title != null && data.title != "null") {
      var html = `<li class="nav-menu_item">
    <a href="" class="nav-menu_link">
     ${data.title}
    </a>
  </li>
  `;
      return html;
    } else {
      return "";
    }
  }

  function addContentPageI(data) {
    var html = `<li class="nav-menu_item">
                <a href="" class="nav-menu_link">
                 ${data.titulo_page}
                </a>
              </li>
              `;
    return html;
  }

  $.ajax({
    type: "POST",
    url: mainHost + "/getByTableName",
    data: {
      masterId: localStorage.MASTER_ID,
      idName: "master_id",
      tableName: "revenues",
    },
    headers: {
      "x-access-token": localStorage.token,
    },
    success: function (data2) {
      try {
        let paginas = JSON.parse(localStorage.INSTITUCIONAL_PAGES);
        console.log("revenuess", data2, paginas);
        for (const k in data2) {
          $("#listaReceitas").append(addContentRevenues(data2[k]));
        }

        for (const k in paginas) {
          $("#listaPaginas").append(addContentPageI(paginas[k]));
        }
      } catch (error) { }
    },
    error: function (data) {
      window.parent.informar("alert-danger", "Algo saiu errado!", 3000);
    },
    complete: function () { },
  });

  function getCategorias(CATEGORIES) {
    var listaCategoriasPrimarias = [],
      CATEGORIAS_FULL = [];
    var currCategorie = null;

    CATEGORIES = OrdenaJson(CATEGORIES, "product_site_categories", "ASC");
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
  let proxyList = [];

  function monitor(elemento) {
    if (proxyList.length > 0) {
      let last = proxyList[proxyList.length - 1];
      if (!isEquivalent(homePage, last)) {
        proxyList.push(homePage);
      }
    } else {
      proxyList.push(homePage);
    }
    console.log(proxyList);
  }

  function ir() { }
  function voltar() { }

  //==================PREPARANDO OS DRAG DROP================

  eventPrepare(".picture-drop", "#file-upload", uploadAndUpdateFile);

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  async function getCategoriesHome() {
    const resultado = await $.ajax({
      type: "GET",
      url: mainHost + "/categorie_find/" + localStorage.AFFILIATE_ID,
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
    MINHAS_CATEGORIAS = resultado.data[0].categories;
    sessionStorage.MINHAS_CATEGORIAS = JSON.stringify(MINHAS_CATEGORIAS);
  }

  $(".showCategorias").each(async function () {
    let HTML = await getCategoriesAndSubHome(
      $(".showCategorias").attr("categorie_list")?.split(",") ?? []
    );
    console.log("HTML", HTML);
    $(this).html(HTML);
  });

  $(".showPagesInst").each(async function () {
    let HTML = await getInstitucionalPagesHome(
      $(this).attr("categorie_list")?.split(",") ?? []
    );
    console.log("HTML", HTML);
    $(this).html(HTML);
  });

  async function getCategoriesAndSubHome(listaSelecionada = []) {
    await getCategoriesHome();
    let newsCATEGORIES = MINHAS_CATEGORIAS;
    console.log("IN HOMEE", newsCATEGORIES, listaSelecionada);
    var html3 = "",
      nova = '<li class="novaLI"></li>';

    if (!Array.isArray(listaSelecionada)) {
      listaSelecionada = listaSelecionada.split(",");
    }

    function getActive(text, listaSelecionada = []) {
      console.log(text, listaSelecionada);

      let eu = listaSelecionada.find((l) => l === text);
      if (eu) {
        return 'checked="true"';
      } else {
        ("");
      }
    }

    for (const k in newsCATEGORIES) {
      console.log("TRATANDO", newsCATEGORIES[k]);
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
    console.log(html3);

    return html3;
  }

  $(".dropCategoriaContent").click(function () {
    if (
      $(this).attr("dropado") == "nao" ||
      $(this).attr("dropado") == undefined
    ) {
      $(this).parent().parent().find(".cabecalho").removeClass("radius20");
      $(this).parent().parent().find(".cabecalho").addClass("radius20Top");
      $(this).parent().parent().find(".cabecalho").addClass("bordaDourada");
      $(".seta").removeClass("rotate180");
      $(this).parent().parent().find(".seta").addClass("rotate180");

      $(this).attr("dropado", "sim");
      $(this).parent().parent().find(".dropCategoria").show();
    } else {
      $(this).parent().parent().find(".cabecalho").removeClass("radius20Top");
      $(this).parent().parent().find(".cabecalho").addClass("radius20");
      $(this).parent().parent().find(".cabecalho").removeClass("bordaDourada");
      $(this).attr("dropado", "nao");
      $(this).parent().parent().find(".dropCategoria").hide();

      $(this).parent().parent().find(".seta").removeClass("rotate180");
    }
  });
  function dropaCategoriasInner(element) {
    console.log("Dropando");
    if (element.find(".listInner2 ").attr("dropei") === "1") {
      element.find(".listInner2 ").attr("dropei", "0");
      element.find(".listInner2 ").hide();
    } else {
      element.find(".listInner2 ").attr("dropei", "1");
      element.find(".listInner2 ").show();
    }
  }

  function getInstitucionalPagesHome(listaSelecionada = []) {
    try {
      let newsCATEGORIES = JSON.parse(localStorage.INSTITUCIONAL_PAGES);
      console.log("IN PAGESS", newsCATEGORIES, listaSelecionada);
      var html3 = "",
        nova = '<li class="novaLI"></li>';

      if (!Array.isArray(listaSelecionada)) {
        listaSelecionada = listaSelecionada.split(",");
      }

      function getActive(text, listaSelecionada = []) {
        console.log(text, listaSelecionada);

        let eu = listaSelecionada.find((l) => l === text);
        if (eu) {
          return 'checked="true"';
        } else {
          ("");
        }
      }

      for (const k in newsCATEGORIES) {
        console.log("TRATANDO", newsCATEGORIES[k]);
        html3 +=
          '<li    class="list-item sub-list-item animate__animated ">' +
          arrowDown4 +
          '<label style="max-width: 70%; float: left;    margin: 5px 15px ;" class=" subSmart subCheck animate__animated animate__"> ';
        html3 +=
          newsCATEGORIES[k].titulo_page +
          " <input " +
          getActive(newsCATEGORIES[k].titulo_page, listaSelecionada) +
          ' class="marcar catPromocao"  myValue="' +
          newsCATEGORIES[k].titulo_page +
          "\" onchange=\"subTagInputPromo($(this),'listaCategoriasFilter','" +
          newsCATEGORIES[k].titulo_page +
          '\')" type="checkbox"><span class="checkmark subCheck"></span></label>';
        html3 += "</li> ";
      }
      console.log(html3);

      return html3;
    } catch (err) {
      return "";
    }
  }
