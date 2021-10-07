google.charts.load('current', {
  'packages':['geochart']
});
var expendData;
var data;

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

  var options = {
      resolution: 'provinces',
      region: 'US'
  };

  var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

  chart.draw(data, options);
}

data = d3.csv("https://raw.githubusercontent.com/mwhar/team6-project3/margaret/cleaned%20data/Per%20capita%20personal%20consumption%20expenditures%20(PCE)%20by%20state%202.csv",function(csv){
  var expens = [];
  for (i=2; i<25; i++){
    var year = String(1995+i);
    expens.push(Number(csv[year]));
  }
  return {
    x: ["1997","1998","1999","2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013","2014","2015","2016","2017","2018","2019"],
    y: expens,
    location: abbr(csv.State),
    name: csv.State,
    category: csv["PCE Category"].trim()
    }
  }).then(function(d){
    expendData = d;
    var filtered;
    var clothing;
    var gasoline;
    var housing;
    var health;
    filtered = d.filter(function(row){
      return row.name === "Alabama";
    });
    clothing = filtered.filter(function(row){
      return row.category === "Clothing and footwear";
    });
    gasoline = filtered.filter(function(row){
      return row.category === "Gasoline and other energy goods";
    });
    housing = filtered.filter(function(row){
      return row.category === "Housing and utilities";
    });
    health = filtered.filter(function(row){
      return row.category === "Health care";
    });
    var traceClothing = {
      x: clothing[0].x,
      y: clothing[0].y,
      name: clothing[0].category,
      marker: {color: 'grey'},
      type: 'bar'
    };
    var traceGasoline = {
      x: gasoline[0].x,
      y: gasoline[0].y,
      name: gasoline[0].category,
      marker: {color: 'purple'},
      type: 'bar'
    }
    var traceHousing = {
      x: housing[0].x,
      y: housing[0].y,
      name: housing[0].category,
      marker: {color: 'orange'},
      type: 'bar'
    }
    var traceHealth = {
      x: health[0].x,
      y: health[0].y,
      name: health[0].category,
      marker: {color: 'red'},
      type: 'bar'
    }

    console.log(traceGasoline);
    var data = [traceGasoline,traceClothing, traceHealth, traceHousing];
    var layout = {
      // title: `Annual Personal Consumption Expenditures in ${clothing[0].name} (1997 - 2019)` ,
      xaxis: {
        tickangle:45,
        tickfont: {
          size: 14,
          color: 'rgb(107, 107, 107)'
        },
        dtick: 3
      },
      yaxis: {
        // title: '2020 Dollars',
        titlefont: {
          size: 16,
          color: 'rgb(107, 107, 107)'
        },
        tickfont: {
          size: 14,
          color: 'rgb(107, 107, 107)'
        }
      },
      legend: {
        x: 0,
        y: 1.1,
        bgcolor: 'rgba(255, 255, 255, 0)',
        bordercolor: 'rgba(255, 255, 255, 0)'
      },
      barmode: 'stack',
    };
    
    Plotly.newPlot('barchart_div', data, layout);
  });
  google.charts.setOnLoadCallback(drawRegionsMap);