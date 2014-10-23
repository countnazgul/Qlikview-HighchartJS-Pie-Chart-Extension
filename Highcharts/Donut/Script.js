function init() {
  //Qva.LoadScript('https://getfirebug.com/firebug-lite-beta.js#startOpened=true', function () {
    Qva.LoadScript("/QvAjaxZfc/QvsViewClient.aspx?public=only&name=Extensions/Highcharts/Donut/jquery.min.js", function () {
        Qva.LoadScript("/QvAjaxZfc/QvsViewClient.aspx?public=only&name=Extensions/Highcharts/Donut/highcharts.js", function() {
          Qva.LoadScript("/QvAjaxZfc/QvsViewClient.aspx?public=only&name=Extensions/Highcharts/Donut/exporting.js", setup);
        });
    });
  //});
}

function setup() {
    Qva.AddExtension("Highcharts/Donut", function () {
            var _this = this;

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
                  text: 'Sales vs. Profit (2012)'
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
                  name: 'Versions',
                  data: browserData,
                  size: '100%',
                  innerSize: '70%',
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