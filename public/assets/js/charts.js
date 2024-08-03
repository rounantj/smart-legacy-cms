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

window.addEventListener('load', function () {
  $.ajax({
    type: "POST",
    url: mainHost + "/getAllOrdersMaster",
    data: { master_id: localStorage.MASTER_ID },
    headers: {
      "x-access-token": localStorage.token,
    },
    success: function (data) {
      //console.log("dataOrders")
      //console.log(data)
      var pedidosRecebidos = [],
        separacao = [],
        rotaEntrega = [],
        entregues = [],
        valorTotal = 0;
      for (const k in data) {
        if (Number(data[k].order_status) == 1) {
          pedidosRecebidos.push(data[k]);
        }
        if (Number(data[k].order_status) == 2) {
          separacao.push(data[k]);
        }
        if (Number(data[k].order_status) == 3) {
          rotaEntrega.push(data[k]);
        }
        if (Number(data[k].order_status) == 4) {
          entregues.push(data[k]);
        }
        valorTotal += data[k].order_valor_total;
      }
      $("#pedidosRecebidos").html(pedidosRecebidos.length);
      $("#pedidosRecebidos2").html(data.length);
      $("#emSeparacao").html(separacao.length);
      $("#emRotaEntrega").html(rotaEntrega.length);
      $("#pedidosEntregues").html(entregues.length);
      $("#receita").html(valorTotal.toLocaleString());

      var dias = [];
      var ordenes = OrdenaJson(data, "createdAt", "ASC"),
        currDay = "";
      for (const k in ordenes) {
        if (currDay != moment(ordenes[k].createdAt).format("YYYY-MM-DD")) {
          dias.push(moment(ordenes[k].createdAt).format("YYYY-MM-DD"));
        }
        currDay != moment(ordenes[k].createdAt).format("YYYY-MM-DD");
      }
      //console.log('dias',dias)
      var newdata = [];
      for (const k in dias) {
        var valorT = 0,
          actualDay = "";
        for (const a in ordenes) {
          if (dias[k] == moment(ordenes[a].createdAt).format("YYYY-MM-DD")) {
            valorT += ordenes[a].order_valor_total;
            actualDay = moment(dias[k]).format("DD/MM");
          }
        }
        newdata.push({
          day: actualDay,
          vendas: valorT,
        });
      }

      am4core.ready(function () {
        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end

        // Create chart instance
        var chart = am4core.create("chartdiv", am4charts.XYChart);
        chart.scrollbarX = new am4core.Scrollbar();

        // Add data
        chart.data = newdata;
        var example = [
          {
            day: "1",
            vendas: 3025,
          },
        ];

        // Create axes
        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "day";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 30;
        categoryAxis.renderer.labels.template.horizontalCenter = "center";
        categoryAxis.renderer.labels.template.verticalCenter = "middle";

        categoryAxis.tooltip.disabled = true;
        categoryAxis.renderer.minHeight = 110;

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.renderer.minWidth = 50;

        // Create series
        var series = chart.series.push(new am4charts.ColumnSeries());
        series.sequencedInterpolation = true;
        series.dataFields.valueY = "vendas";
        series.dataFields.categoryX = "day";
        series.tooltipText = "R$ [{categoryX}: bold]{valueY}[/]";
        series.columns.template.strokeWidth = 0;

        series.tooltip.pointerOrientation = "vertical";

        series.columns.template.column.cornerRadiusTopLeft = 10;
        series.columns.template.column.cornerRadiusTopRight = 10;
        series.columns.template.column.fillOpacity = 0.8;

        // on hover, make corner radiuses bigger
        var hoverState = series.columns.template.column.states.create("hover");
        hoverState.properties.cornerRadiusTopLeft = 0;
        hoverState.properties.cornerRadiusTopRight = 0;
        hoverState.properties.fillOpacity = 1;

        series.columns.template.adapter.add("fill", function (fill, target) {
          return "#f6b504";
        });

        // Cursor
        chart.cursor = new am4charts.XYCursor();
      }); // end am4core.ready()

      setTimeout(() => {
        $("g").each(function () {
          if ($(this).attr("filter") == 'url("#filter-id-66")') {
            $(this).hide();
          }
        });
      }, 500);
    },
    error: function (data) {
      //console.log(data)
    },
    complete: function () {
      // ao final da requisição...
    },
  });

});

