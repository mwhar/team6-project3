google.charts.load('current', {
    'packages':['geochart']
});

// console.log("pulled data:",expendData);

google.charts.setOnLoadCallback(drawRegionsMap);

function drawRegionsMap() {
  var data = google.visualization.arrayToDataTable([
    ['State', 'RPP'],
    ['Alabama', 200],
    ['Alaska', 300],
    ['Arizona', 400],
    ['Arkansas', 500],
    ['California', 600],
    ['Colorado', 700]
  ]);
  // console.log(selectvalue);
  var options = {
      resolution: 'provinces',
      region: 'US'
  };

  var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

  chart.draw(data, options);
}