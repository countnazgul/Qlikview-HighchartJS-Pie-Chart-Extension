function init() {
  //Qva.LoadScript('https://getfirebug.com/firebug-lite-beta.js#startOpened=true', function () {
    Qva.LoadScript("/QvAjaxZfc/QvsViewClient.aspx?public=only&name=Extensions/Highcharts/Pie/jquery.min.js", function () {
        Qva.LoadScript("/QvAjaxZfc/QvsViewClient.aspx?public=only&name=Extensions/Highcharts/Pie/highcharts.js", function() {
          Qva.LoadScript("/QvAjaxZfc/QvsViewClient.aspx?public=only&name=Extensions/Highcharts/Pie/exporting.js", setup);
        });
    });
  //});
}

function setup() {
    Qva.AddExtension("Highcharts/Pie", function () {
            var _this = this;

			var innerSize = _this.Layout.Text0.text.toString();
			var seriesSize = _this.Layout.Text1.text.toString();
			var inChartTitle = _this.Layout.Text2.text.toString();
            var colors = Highcharts.getOptions().colors;
            var categories = [];
            var data = [];

            d = this.Data;
            for(a = 0; a < d.Rows.length; a++) {
              categories.push(d.Rows[a][0].text);
              obj = {
                y : parseInt(d.Rows[a][1].text),
                color : colors[a],
                row: a
              };

              data.push(obj);
            }

            var ui = document.createElement("div");
            ui.setAttribute('id', 'container');
            this.Element.appendChild(ui);

              var browserData = [];

          // Build the data arrays

          for (i = 0; i < data.length; i++) {

              // add browser data
              browserData.push({
                  name: categories[i],
                  y: data[i].y,
                  color: data[i].color,
                  row: data[i].row
              });
          }

          $('#container').highcharts({
              chart: {
                  type: 'pie'
              },
              title: {
                  text: inChartTitle
              },
              yAxis: {
                  title: {
                      text: 'Total percent market share'
                  }
              },
              plotOptions: {
                  pie: {
                      shadow: false,
                      center: ['50%', '50%']
                  },
            series: {
                cursor: 'pointer',
                point: {
                    events: {
                        click: function () {
                            _this.Data.SelectRow(this.row);
                        }
                    }
                }
            }
              },
              tooltip: {
                  valueSuffix: '%'
              },
              series: [
              {
                  name: ' ',
                  data: browserData,
                  size: seriesSize + '%',
                  innerSize: innerSize + '%',
                  dataLabels: {
                      formatter: function () {
                          return this.y > 1 ? '<b>' + this.point.name + ':</b> ' + this.y + '%'  : null;
                      }
                  }
              }
              ]
          });


    });
};

init();