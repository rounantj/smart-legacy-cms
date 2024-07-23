$("#alteracaoMassa").click(function () {
  modalDrop();
});

function modalDrop() {
  var html =
    '<div style="max-width:100% ; max-height: 80vh" class="container">' +
    '<h1 class="titleDrop">Alteração em Massa</h1>' +
    '<h5 class="subDrop">Aqui você poderá alterar grandes volumes de produtos de maneira mais rápida!</h5>' +
    '<div style="max-width: 70%" class="container">' +
    '<div style="max-width:90%; margin: auto" class="row">' +
    '<div   class="input-group btnDrop">' +
    '<div style="border: none; margin: auto;" class="input-group-append">' +
    '<div style="border: none; margin: auto; padding: 1%;" class="input-group-text">' +
    '<svg xmlns="http://www.w3.org/2000/svg" style="margin: -20% auto 0 0; fill: #f6b504;" width="24" height="24" viewBox="0 0 24 24">' +
    "<defs></defs>" +
    '<path class="a" d="M13.5,20H2.5A2.5,2.5,0,0,1,0,17.5V2.5A2.5,2.5,0,0,1,2.5,0h9a.494.494,0,0,1,.351.147l4,4A.492.492,0,0,1,16,4.53V17.5A2.5,2.5,0,0,1,13.5,20ZM2.5,1A1.5,1.5,0,0,0,1,2.5v15A1.5,1.5,0,0,0,2.5,19h11A1.5,1.5,0,0,0,15,17.5V5H11.5a.5.5,0,0,1-.5-.5V1Zm9.5.707V4h2.293ZM11.514,16H4.5A1.5,1.5,0,0,1,3,14.5v-4A1.5,1.5,0,0,1,4.5,9h7.014a1.5,1.5,0,0,1,1.5,1.5v4A1.5,1.5,0,0,1,11.514,16ZM7,14v1h4.513a.5.5,0,0,0,.5-.5V14ZM4,14v.5a.5.5,0,0,0,.5.5H6V14Zm3-2v1h5.014V12ZM4,12v1H6V12Zm3-2v1h5.014v-.5a.5.5,0,0,0-.5-.5ZM4.5,10a.5.5,0,0,0-.5.5V11H6V10Z" transform="translate(4 2)"></path>' +
    "</svg>" +
    "</div>" +
    "</div>" +
    '<label style="margin: -1% auto; min-width: 60%; color: #f6b504 !important; cursor:pointer" class="label"><a href="https://api-smart-939610cb57d8.herokuapp.com/modelo.xlsx">Download planilha sem produtos</a></label>' +
    "</div>" +
    '<div   class="input-group btnDrop">' +
    '<div style="border: none; margin: auto;" class="input-group-append">' +
    '<div style="border: none; margin: auto; padding: 1%;" class="input-group-text">' +
    '<svg xmlns="http://www.w3.org/2000/svg" style="margin: -20% auto 0 0; fill: #f6b504;" width="24" height="24" viewBox="0 0 24 24">' +
    "<defs></defs>" +
    '<path class="a" d="M13.5,20H2.5A2.5,2.5,0,0,1,0,17.5V2.5A2.5,2.5,0,0,1,2.5,0h9a.494.494,0,0,1,.351.147l4,4A.492.492,0,0,1,16,4.53V17.5A2.5,2.5,0,0,1,13.5,20ZM2.5,1A1.5,1.5,0,0,0,1,2.5v15A1.5,1.5,0,0,0,2.5,19h11A1.5,1.5,0,0,0,15,17.5V5H11.5a.5.5,0,0,1-.5-.5V1Zm9.5.707V4h2.293ZM11.514,16H4.5A1.5,1.5,0,0,1,3,14.5v-4A1.5,1.5,0,0,1,4.5,9h7.014a1.5,1.5,0,0,1,1.5,1.5v4A1.5,1.5,0,0,1,11.514,16ZM7,14v1h4.513a.5.5,0,0,0,.5-.5V14ZM4,14v.5a.5.5,0,0,0,.5.5H6V14Zm3-2v1h5.014V12ZM4,12v1H6V12Zm3-2v1h5.014v-.5a.5.5,0,0,0-.5-.5ZM4.5,10a.5.5,0,0,0-.5.5V11H6V10Z" transform="translate(4 2)"></path>' +
    "</svg>" +
    "</div>" +
    "</div>" +
    '<label style="margin: -1% auto; min-width: 60%; color: #f6b504 !important; cursor:pointer" class="label">Download planilha com produtos atuais</label>' +
    "</div>" +
    "</div>" +
    '<div class="col-md-8 areaDrop">' +
    '<img style="    max-width: 100%;display: block;margin: 5% auto;" src="images/products/upload.svg"></img>' +
    '<h3 class="arraste">Arraste a planilha aqui</h3>' +
    '<h3 class="ou">-ou-</h3>' +
    '<input style="display:none" type="file" id="minhaPlanilha" />' +
    '<div onclick="openArquivoPlanilha()" class="input-group btnDropPC"><label   class="label">Selecione do seu computador</label></div>' +
    "</div>" +
    "</div>" +
    "</div>";

  bootbox.alert({
    message: html,
    onShow: function () {
      $(".fa-times-circle").click(function () {
        $(this).parent().parent().remove();
      });

      $("#minhaPlanilha").change(function () {
        try {
          var data = new FormData();
          //  console.log($(this))
          var fileName = $(this)[0].files[0].name;
          localStorage.nameLogo = fileName;
          var contador = 1;
          data.append("fileimagem", $(this)[0].files[0]);

          $.ajax({
            url: "https://api-smart-939610cb57d8.herokuapp.com/uploadPlanilha",
            headers: {
              "x-access-token": localStorage.token,
              master_id: localStorage.MASTER_ID,
              affiliate_id: localStorage.MASTER_ID,
              is_product_image: false,
            },
            data: data,
            processData: false,
            contentType: false,
            type: "POST",
            success: function (data) {
              console.log(data);
              let fileName4 = data.filename;

              $.ajax({
                url: "https://api-smart-939610cb57d8.herokuapp.com/excel2Json",
                headers: {
                  "x-access-token": localStorage.token,
                  master_id: localStorage.MASTER_ID,
                  affiliate_id: localStorage.MASTER_ID,
                  filename: data.filename,
                },
                data: data,
                processData: false,
                contentType: false,
                type: "POST",
                success: function (retorno) {
                  console.log("retorno", retorno);
                  let totalMudancas = retorno.dados.length;

                  function verifyTypes() {
                    let tipos = [
                      "product_status",
                      "product_site_name",
                      "product_site_ean",
                      "product_site_info",
                      "product_site_description",
                      "product_site_tags",
                    ];
                    let listaConferida = [];
                    if (retorno.dados.length > 0) {
                      let confere = retorno.dados[0];

                      for (const i in tipos) {
                        let isReady = false;
                        for (const k in confere) {
                          if (
                            tipos[i].toLocaleLowerCase() ==
                            k.toLocaleLowerCase()
                          ) {
                            listaConferida.push({
                              tipo: k.toLocaleLowerCase(),
                              status: true,
                            });
                            isReady = true;
                          }
                        }
                        if (!isReady) {
                          listaConferida.push({
                            tipo: tipos[i].toLocaleLowerCase(),
                            status: isReady,
                          });
                        }
                      }
                      for (const k in listaConferida) {
                        if (!listaConferida[k].status) {
                          return { status: false, msg: listaConferida };
                        }
                      }
                      return { status: true, msg: listaConferida };
                    } else {
                      return { status: false, msg: listaConferida };
                    }
                  }

                  //  console.log("verificando",verifyTypes())

                  if (verifyTypes().status) {
                    let listData = retorno.dados.filter(
                      (x) => x.product_site_ean != ""
                    );
                    console.log("listData0", listData);
                    let listOffQuerys = [];
                    for (const k in listData) {
                      let sql = "update product_details set ";

                      if (
                        listData[k].product_site_ean &&
                        listData[k].product_site_ean !== ""
                      ) {
                        for (const a in listData[k]) {
                          if (a !== "") {
                            if (
                              Number(listData[k][a]) &&
                              a.toLocaleLowerCase() != "product_site_ean" &&
                              a.toLocaleLowerCase() != "product_thumbnail"
                            ) {
                              sql += " " + a + " = " + listData[k][a] + ", ";
                            } else {
                              sql += " " + a + ' = "' + listData[k][a] + '", ';
                            }
                          }
                        }
                        sql +=
                          " where product_affiliate_id =" +
                          localStorage.AFFILIATE_ID +
                          " and product_site_ean = " +
                          listData[k].product_site_ean;
                        sql = sql.replace(/,  where/g, " where");
                        if (listData[k].product_site_ean !== "") {
                          listOffQuerys.push(sql);
                        }
                      }
                    }

                    //  console.log('listOffQuerys',listOffQuerys)
                    //  console.log(JSON.stringify(listOffQuerys))

                    modalDropConfirma(
                      fileName4,
                      listData.length,
                      listOffQuerys
                    );
                  } else {
                    // console.log("planilha incorreta")

                    informar(
                      "alert-danger",
                      "Layout interno da planilha está incorreto!",
                      3000
                    );
                  }
                },
                error: function (data2) {
                  console.log(data2);
                },
              });
            },
            error: function (data) {
              console.log(data);
            },
          });
        } catch (err) {
          informar("alert-danger", "Erro interno!", 3000);
        }
      });
    },
    callback: function () {
      // console.log('This was logged in the callback!');
    },
  });

  $(".bootbox-accept").hide();
}

function modalDropConfirma(fileName, totalRowsAffecteds, listOffQuerys) {
  var html =
    '<div style="max-width:100% ; max-height: 80vh" class="container">' +
    '<h1 class="titleDrop">Alteração em Massa</h1>' +
    '<h5 class="subDrop">Aqui você poderá alterar grandes volumes de produtos de maneira mais rápida!</h5>' +
    '<div style="max-width: 70%" class="container">' +
    '<div class="col-md-8 areaDrop">' +
    '<div class="iconao">' +
    '<svg id="Layer_x0020_1" xmlns="http://www.w3.org/2000/svg" width="32.854" height="32.854" viewBox="0 0 32.854 32.854">' +
    '<rect id="Retângulo_1684" data-name="Retângulo 1684" width="32.854" height="32.854" fill="none"/>' +
    '<g id="_403294168" transform="translate(4.107 4.363)">' +
    '<path id="_403307224" d="M5.507,1.013v3.08H8.073V5.12H4.48V1.013Z" transform="translate(12.973 -0.5)" fill="#f8c63f"/>' +
    '<path id="_403299424" d="M2.577.907H16.593l.15.15L20.336,4.65l.15.15V18.36H1.493V1.99A1.086,1.086,0,0,1,2.577.907Zm13.59,1.027H2.577a.059.059,0,0,0-.057.057V17.333H19.46V5.226L16.168,1.933Z" transform="translate(1.587 -0.907)" fill="#f8c63f"/>' +
    '<path id="_403300768" d="M2.24,2.613H14.047V3.64H2.24Z" transform="translate(4.433 5.6)" fill="#f8c63f"/>' +
    '<path id="_403305568" d="M2.24,3.36H14.047V4.387H2.24Z" transform="translate(4.433 8.447)" fill="#f8c63f"/>' +
    '<path id="_403297840" d="M2.159,4.32H24.188a1.314,1.314,0,0,1,1.306,1.311v5.078a1.314,1.314,0,0,1-1.306,1.311H2.159A1.314,1.314,0,0,1,.853,10.709V5.631A1.314,1.314,0,0,1,2.159,4.32ZM24.188,5.347H2.159a.277.277,0,0,0-.2.082.286.286,0,0,0-.082.2v5.078a.286.286,0,0,0,.082.2.277.277,0,0,0,.2.082H24.188a.277.277,0,0,0,.2-.082.286.286,0,0,0,.082-.2V5.631a.286.286,0,0,0-.082-.2A.277.277,0,0,0,24.188,5.347Z" transform="translate(-0.853 12.107)" fill="#f8c63f"/>' +
    '<path id="_403304632" d="M2.409,8.426,3.657,6.521,2.526,4.775h.861L4.12,5.948l.717-1.173h.854L4.555,6.548,5.8,8.426H4.914L4.1,7.164,3.293,8.426H2.409Zm3.793,0V4.8h.737V7.811H8.772v.615ZM9.111,7.239l.718-.071a.869.869,0,0,0,.263.531.8.8,0,0,0,.534.169.816.816,0,0,0,.536-.151.447.447,0,0,0,.181-.352.329.329,0,0,0-.077-.22A.59.59,0,0,0,11,6.987c-.086-.031-.283-.083-.59-.16a1.994,1.994,0,0,1-.831-.361A.958.958,0,0,1,9.4,5.209a1,1,0,0,1,.456-.37,1.837,1.837,0,0,1,.718-.127,1.544,1.544,0,0,1,1.035.3,1.067,1.067,0,0,1,.365.805l-.737.032a.624.624,0,0,0-.2-.4.741.741,0,0,0-.467-.123.839.839,0,0,0-.5.132.265.265,0,0,0-.117.226.28.28,0,0,0,.11.222,1.921,1.921,0,0,0,.678.244,3.609,3.609,0,0,1,.8.263,1.034,1.034,0,0,1,.4.371,1.089,1.089,0,0,1,.145.581,1.07,1.07,0,0,1-.174.587,1.043,1.043,0,0,1-.493.407,2.062,2.062,0,0,1-.795.133,1.582,1.582,0,0,1-1.063-.32,1.39,1.39,0,0,1-.443-.933Z" transform="translate(5.076 13.605)" fill="#f8c63f"/>' +
    "</g></svg>" +
    "</div>" +
    '<h3 class="arraste">' +
    fileName +
    "</h3>" +
    '<input style="display:none" type="file" id="minhaPlanilha" />' +
    '<p class="dark4">A planilha selecionada irá alterar <span class="golden4">' +
    totalRowsAffecteds +
    " produtos</span></p>" +
    "</div>" +
    '<p class="dark4">Recomendamos que baixe a <span class="golden4">planilha com produtos atuais</span> antes de executar esta ação</p>' +
    "<br><br>" +
    '<div style="margin:auto;  max-width: 60%" class="row">' +
    '<div onclick="fechaModais4()" style="margin:auto;cursor: pointer; border-radius: 20px; font: bold 1rem Roboto; background-color: rgb(255, 255, 255); max-width: 200px; height: 40px; border: 2px solid rgb(246, 181, 4); float: right; margin-right: 15px; opacity: 1;" class="input-group">' +
    '<label   style="  margin: auto; color: #f6b504 !important; cursor:pointer" class="label">Cancelar</label>' +
    "</div>" +
    '<div  id="finalizador4"   style="margin:auto;cursor: pointer; border-radius: 20px; font: bold 1rem Roboto; background-color: rgb(246, 181, 4); max-width: 200px; height: 40px; border: 2px solid rgb(246, 181, 4); float: right; margin-right: 15px; opacity: 1;" class="input-group">' +
    '<label style="margin: auto;   color: white !important; cursor: pointer" class="label">Sim, alterar os produtos</label>' +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>";

  bootbox.alert({
    message: html,
    onShow: function () {
      $(".fa-times-circle").click(function () {
        $(this).parent().parent().remove();
      });
      $("#finalizador4").click(function () {
        finalizaAjustes(listOffQuerys);
      });
    },
    callback: function () {
      // console.log('This was logged in the callback!');
    },
  });

  $(".bootbox-accept").hide();
}

function fechaModais4() {
  $(".close").click();
}

function openArquivoPlanilha() {
  $("#minhaPlanilha").click();
}

function finalizaAjustes(listOffQuerys) {
  console.log(listOffQuerys);
  $.ajax({
    type: "POST",
    url: "https://api-smart-939610cb57d8.herokuapp.com/multiQuerys",
    data: { listaQuerys: listOffQuerys },
    headers: {
      "x-access-token": localStorage.token,
      master_id: localStorage.MASTER_ID,
      affiliate_id: localStorage.MASTER_ID,
      is_product_image: false,
    },

    success: function (data) {
      informar("alert-success", "Alterações realizadas com sucesso!", 3000);
      setTimeout(() => {
        $(".close").click();
      }, 1500);
    },
    error: function (data) {
      // console.log(data)
      informar("alert-danger", "Erro interno!", 3000);
    },
    complete: function () {
      // ao final da requisição...
    },
  });
}
