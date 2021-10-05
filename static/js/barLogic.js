google.charts.load('current', {'packages':['bar']});
      google.charts.setOnLoadCallback(drawStuff);

      function drawStuff() {

        var chartDiv = document.getElementById('barchart_div');

        var data = google.visualization.arrayToDataTable([
            ['Genre', 'Fantasy & Sci Fi', 'Romance', 'Mystery/Crime', 'General',
             'Western', 'Literature', { role: 'style' } ],
            ['2010', 10, 24, 20, 32, 18, 5, ''],
            ['2020', 16, 22, 23, 30, 16, 9, ''],
            ['2030', 28, 19, 29, 30, 12, 13, '']
          ]);
        var options = {
        width: 600,
        height: 400,
        legend: { position: 'top', maxLines: 3 },
        
        isStacked: true,
        };

        var materialOptions = {
        //   width: 600,
        //   height: 700,
          chart: {
            title: 'book sales',
            subtitle: 'by genre and compared across time'
          },
          bar: { groupWidth: '5%' },
          isStacked: true
        //   series: {
        //     0: { axis: 'distance' }, // Bind series 0 to an axis named 'distance'.
        //     1: { axis: 'brightness' } // Bind series 1 to an axis named 'brightness'.
        //   },
        //   axes: {
        //     y: {
        //       distance: {label: 'parsecs'}, // Left y-axis.
        //       brightness: {side: 'right', label: 'apparent magnitude'} // Right y-axis.
        //     }
        //   }
        };


        function drawMaterialChart() {
          var materialChart = new google.charts.Bar(chartDiv);
          materialChart.draw(data, google.charts.Bar.convertOptions(materialOptions));
          
        }


        drawMaterialChart();
    };