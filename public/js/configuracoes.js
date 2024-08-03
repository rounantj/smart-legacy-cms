


window.addEventListener('load', function () {
  comecando();
  getEmails();
});


function comecando() {
  $.ajax({
    type: "POST",
    url: mainHost + "/getAllAffiliates",
    data: { affiliate_id: localStorage.MASTER_ID },
    headers: {
      "x-access-token": localStorage.token,
    },
    success: function (data) {
      //console.log("atualizando lojas cadastradas")
      localStorage.LOJAS_CADASTRADAS = JSON.stringify(data);
      getLojasCad();
    },
    error: function (data) { },
    complete: function () {
      $(".todasConfiguracoes").css("filter", "none");
    },
  });

  $.ajax({
    type: "POST",
    url: mainHost + "/getSingleTable",
    data: {
      table: "users_profiles",
      idName: "master_id",
      idValue: localStorage.MASTER_ID,
      order: "updatedAt desc",
      limit: "0,100",
    },
    headers: {
      "x-access-token": localStorage.token,
    },
    success: function (data) {
      console.log("getSingleTable", data, {
        table: "users_profiles",
        idName: "master_id",
        idValue: localStorage.MASTER_ID,
        order: "updatedAt desc",
        limit: "0,100",
      });
      localStorage.DT_PF = JSON.stringify(data);
    },
    error: function (data) { },
    complete: function () {
      $(".todasConfiguracoes").css("filter", "none");
    },
  });

  $.ajax({
    type: "POST",
    url: mainHost + "/getSingleTable",
    data: {
      table: "masters",
      idName: "master_estoque_negativo",
      idValue: "'on'",
      order: "updatedAt desc",
      limit: "0,100",
    },
    headers: {
      "x-access-token": localStorage.token,
    },
    success: function (data) {
      console.log("getSingleTable", data, {
        table: "masters",
        idName: "master_estoque_negativo",
        idValue: "on",
        order: "updatedAt desc",
        limit: "0,100",
      });
      sessionStorage.ALL_CLIENTS = JSON.stringify(data);
    },
    error: function (data) { },
    complete: function () {
      $(".todasConfiguracoes").css("filter", "none");
    },
  });

  $.ajax({
    type: "POST",
    url: mainHost + "/getSingleTable",
    data: {
      table: "users_masters",
      idName: "master_id",
      idValue: localStorage.MASTER_ID,
      order: "updatedAt desc",
      limit: "0,10000",
    },
    headers: {
      "x-access-token": localStorage.token,
    },
    success: function (data) {
      sessionStorage.M = JSON.stringify(data);
    },
    error: function (data) { },
    complete: function () {
      $(".todasConfiguracoes").css("filter", "none");
    },
  });
  $.ajax({
    type: "POST",
    url: mainHost + "/getSingleTable",
    data: {
      table: "users_affiliates",
      idName: "users_affiliate_master_id",
      idValue: localStorage.MASTER_ID,
      order: "updatedAt desc",
      limit: "0,10000",
    },
    headers: {
      "x-access-token": localStorage.token,
    },
    success: function (data) {
      sessionStorage.A = JSON.stringify(data);
    },
    error: function (data) { },
    complete: function () {
      $(".todasConfiguracoes").css("filter", "none");
    },
  });

  startSession();
}

async function startSession() {
  //console.log("iniciando a sessão...")
  let result = await ajax(
    mainHost + "/getMasterInfo",
    { masterId: localStorage.MASTER_ID },
    "POST"
  );
  localStorage.DADOS_MATRIZ = JSON.stringify(result[0]);
  $("#textoPrivacidade1").val(result[0].master_custom_texto_privacidade);

  $("#minhaTagManager").val(result[0].master_tag_manager);
  try {
    $("#switch-shadow185")[0].checked =
      result[0].master_estoque_negativo == "on" ? true : false;
  } catch (err) {
    //console.log("erro checked is true",err)
  }

  //console.log('dados da matriz', result);
  if (result.lenght > 0) {
    localStorage.STATUS_LOJA = result[0].status;
    if (localStorage.STATUS_LOJA == "ativo") {
      $("#lojaAtiva").show();
      $("#lojaInativa").hide();
      //console.log('loja ativa');
    } else {
      $("#lojaAtiva").hide();
      $("#lojaInativa").show();
      //console.log('loja inativa');
    }
  }
  setTimeout(() => {
    if (JSON.parse(localStorage.DADOS_MATRIZ).status == "ativo") {
      $("#lojaAtiva").show();
      $("#lojaInativa").hide();
      //console.log("loja ativa")
    } else {
      $("#lojaAtiva").hide();
      $("#lojaInativa").show();
      //console.log("loja inativa")
    }
  }, 300);
}

async function atualizaCampo(elemento, reload) {
  let table = elemento.attr("table");
  let column = elemento.attr("column");
  let newValue = elemento.val() ? elemento.val() : elemento.attr("newValue");
  let columnId = elemento.attr("columnId") ? elemento.attr("columnId") : "id";
  let idValue = elemento.attr("idValue")
    ? elemento.attr("idValue")
    : localStorage.MASTER_ID;

  // if(newValue.indexOf("C:\\fakepath\\")>-1){
  //   newValue = newValue.replace("C:\\fakepath\\","{{SMART_API}}/images/"+localStorage.MASTER_ID+"/")
  // }

  let params = {
    table: table,
    column: column,
    newValue: newValue,
    columnId: columnId,
    idValue: idValue,
  };
  //console.log('params', params);
  let result = await ajax(mainHost + "/singleUpdate", params, "POST");
  //console.log(result);
  if (reload) {
    location.reload();
  }
  elemento.css("color", "#f6b504");
}

async function ajax(url, params, type) {
  return $.ajax({
    type: type,
    url: url,
    data: params,
    headers: {
      "x-access-token": localStorage.token,
    },
    success: function (data) { },
    error: function (data) { },
    complete: function () { },
  });
}

function getLojasCad() {
  //console.log("pegando lojas ...")
  let lojas = JSON.parse(localStorage.LOJAS_CADASTRADAS);
  let html = "",
    bdDourada = "bdDourada";
  for (const k in lojas) {
    if (lojas[k].id == Number(localStorage.AFFILIATE_ID)) {
      bdDourada = "bdDourada bdDourada2";
    }
    html +=
      '<div class="col-md-12 ' +
      bdDourada +
      '" style=" margin: auto; ">' +
      '<div class="row">' +
      '<div class="col-md-8">' +
      '<p class="afiliadaName nome">' +
      lojas[k].affiliates_business_name +
      "</p>" +
      "</div>" +
      '<div class="col-md-2">' +
      "<button onclick=\"showFrame('deleteLoja'," +
      lojas[k].id +
      ')" style="display: inline-flex;width: 190px;gap: 8px;" type="button"' +
      'class="btn btn-access rounded-pill">' +
      '<div style="border: none; margin: auto;" class="input-group-append">' +
      '<svg id="_01_Icons_Line_trash" data-name="01) Icons / Line /  trash"' +
      'xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16">' +
      '<path id="trash"' +
      'd="M10.937,16H3.063A2.208,2.208,0,0,1,.875,13.778V2.666H.438a.444.444,0,0,1,0-.889H4.375V1.334A1.324,1.324,0,0,1,5.687,0H8.313A1.324,1.324,0,0,1,9.625,1.334v.444h3.937a.444.444,0,0,1,0,.889h-.437V13.778A2.208,2.208,0,0,1,10.937,16ZM1.75,2.666V13.778a1.325,1.325,0,0,0,1.313,1.334h7.875a1.325,1.325,0,0,0,1.313-1.334V2.666ZM5.687.889a.441.441,0,0,0-.437.445v.444h3.5V1.334A.441.441,0,0,0,8.313.889Zm3.5,11.556A.442.442,0,0,1,8.75,12V5.778a.437.437,0,1,1,.875,0V12A.441.441,0,0,1,9.188,12.445Zm-4.375,0A.441.441,0,0,1,4.375,12V5.778a.437.437,0,1,1,.875,0V12A.442.442,0,0,1,4.812,12.445Z"' +
      'fill="#f6b504" />' +
      "</svg>" +
      "</div>" +
      "Apagar Loja" +
      "</button>" +
      "</div>" +
      '<div class="col-md-2">' +
      '<button  onclick="editarLoja(' +
      lojas[k].id +
      ')" type="button" class="btn btn-access rounded-pill">Editar</button>' +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-md-4">' +
      '<p class="minTitle">Razão Social</p>' +
      '<p class="contText nomeSocial">' +
      lojas[k].affiliates_business_name +
      "</p>" +
      "</div>" +
      '<div class="col-md-2">' +
      '<p class="minTitle">CNPJ</p>' +
      '<p class="contText cnpj">' +
      lojas[k].affiliates_business_cnpj +
      "</p>" +
      "</div>" +
      '<div class="col-md-2">' +
      '<p class="minTitle">Telefone</p>' +
      '<p class="contText telefone">' +
      lojas[k].affiliates_business_telefone +
      "</p>" +
      "</div>" +
      '<div class="col-md-4">' +
      '<p class="minTitle">e-mail</p>' +
      '<p class="contText email">' +
      lojas[k].affiliates_business_mail +
      "</p>" +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-md-4">' +
      '<p class="minTitle">Horário</p>' +
      '<p class="contText horario">' +
      lojas[k].affiliates_business_horario +
      "</div>" +
      '<div class="col-md-4">' +
      '<p class="minTitle">Endereço</p>' +
      '<p class="contText endereco">' +
      lojas[k].affiliates_business_endereco +
      "</div>" +
      '<div class="col-md-4">' +
      "</div>" +
      "</div>" +
      "</div>";
  }
  $(".listaLojasCadastradas").append(html);
}

async function updateAffiliate(dados) {
  let params = {
    table: "affiliates",
    name_id: "id",
    value_id: dados.id,
    fields: [
      { column: "affiliate_id", value: dados.id },
      { column: "affiliates_master_id", value: dados.affiliates_master_id },
      {
        column: "affiliates_business_name",
        value: dados.affiliates_business_name,
      },
      {
        column: "affiliates_business_telefone",
        value: dados.affiliates_business_telefone,
      },
      {
        column: "affiliates_business_mail",
        value: dados.affiliates_business_mail,
      },
      {
        column: "affiliates_business_horario",
        value: dados.affiliates_business_horario,
      },
      {
        column: "affiliates_business_endereco",
        value: dados.affiliates_business_endereco,
      },
      {
        column: "affiliates_business_numero",
        value: dados.affiliates_business_numero,
      },
      {
        column: "affiliates_business_cep",
        value: dados.affiliates_business_cep,
      },
      {
        column: "affiliates_business_bairro",
        value: dados.affiliates_business_bairro,
      },
      {
        column: "affiliates_business_cidade",
        value: dados.affiliates_business_cidade,
      },
      {
        column: "affiliates_business_estado",
        value: dados.affiliates_business_estado,
      },
      {
        column: "affiliates_business_lat_lon",
        value: dados.affiliates_business_lat_lon,
      },
      {
        column: "affiliates_business_tipo",
        value: dados.affiliates_business_tipo,
      },
      {
        column: "affiliates_business_cnpj",
        value: dados.affiliates_business_cnpj,
      },
      {
        column: "affiliates_business_mapa",
        value: dados.affiliates_business_mapa,
      },
      {
        column: "affiliates_business_photo",
        value: dados.affiliates_business_photo,
      },
    ],
  };
  //console.log(params)
  let result = await ajax(mainHost + "/updateById", params, "POST");
  //console.log(result)
  location.reload();
}

async function atualizaUser(elemento, reload) {
  let table = elemento.attr("table");
  let column = elemento.attr("column");
  let newValue = elemento.val() ? elemento.val() : elemento.attr("newValue");
  let columnId = elemento.attr("columnId") ? elemento.attr("columnId") : "id";
  let idValue = elemento.attr("idValue")
    ? elemento.attr("idValue")
    : localStorage.MASTER_ID;

  let params = {
    table: table,
    column: column,
    newValue: newValue,
    columnId: columnId,
    idValue: idValue,
  };
  //console.log('params', params);
  let result = await ajax(mainHost + "/updateUserFromCMS", params, "POST");
  //console.log(result);
  if (reload) {
    location.reload();
  }
  elemento.css("color", "#f6b504");
}

$("#checkFull").removeAttr("checked");



async function getEmails() {
  const myEmails = await ajax(
    mainHost + "/getSingleTable",
    {
      idName: "master_id",
      idValue: localStorage.MASTER_ID,
      table: "emails_marketing",
      order: " id asc ",
      limit: 50,
    },
    "POST"
  );

  if (myEmails) {
    for (const k in myEmails) {
      let html = `
                <div class="col-md-12 itemMsg">
                  <div class="row">
                      <div class="col-md-3 mginAuto">
                          <p class="txtToMsg">${myEmails[k].tipo_email}</p>
                      </div>
                      <div class="col-md-6 mginAuto" style="border-left: 1px solid #EDF2F6;">
                          <p class="txtInMsg">${myEmails[k].descricao}</p>
                      </div>
                      <div class="col-md-3 mginAuto">
                          <button onclick="showFrame('editarEmail','${myEmails[k].tipo_email}')" type="button"
                              class="btn btn-access rounded-pill">Editar E-mail</button>
                      </div>
  
                  </div>
                </div>
                `;
      $(".listandoEmails4").append(html);
    }
  }
}
