google.charts.load('current', {
'packages':['geochart'],
});
google.charts.setOnLoadCallback(drawRegionsMap);

  function drawRegionsMap() {
    var csvData = [['State','Rent Index']];
    var states = [];
    var rppAll  =[];
    var rppGoods = [];
    var rppRent = [];
    var rppOther = [];
    d3.csv('data/RPP2019_clean.csv', function(data){
        if(data.GeoName !="United States"){
            var percent = Number (data.Percent);
            switch(data.RPPType){
                case 'All':
                    states.push(data.GeoName);
                    // rppAll.push(percent);
                    break;
                // case 'Goods':
                //     rppGoods.push(percent);
                //     break;
                case 'Rent':
                    rppRent.push(percent);
                    break;
                // case 'Other':
                //     rppOther.push(percent);
                //     break;
            }
        }
      // console.log(data.RPP);
    }).then(function(){
        for (i=0; i< states.length;i++){
            csvData.push([states[i], rppRent[i]]);
        }
    }).then(function(){
        var data = google.visualization.arrayToDataTable(csvData);
        var options = {
            // resolution: 'metros',
            resolution: 'provinces',
            region: 'US'
        };
        var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
        chart.draw(data, options);
    })
    
  }