var data = d3.csv("https://raw.githubusercontent.com/mwhar/team6-project3/amber/cleaned%20data/Minimum%20Wage%20Data.csv%201990-2020%202.csv",function(csv){
   return {
       year: Number(csv.Year),
       location: abbr(csv.State),
       stateName: csv.State,
       wage: Number(csv['Effective Minimum Wage'])
   } 
}).then(function(d){
    filtered = d.filter(function(row){
        return row.year === 2019
    });
    // console.log('filterdData: ',filtered); 
    function unpack(rows, key){
        var out =[];
        for(i=0; i<rows.length; i++){
            out.push(rows[i][key])
        }
        return out; 
    }
    var dataPlot =[{
    type: 'choropleth',
    locationmode: 'USA-states',
    locations: unpack(filtered, 'location'),
    z: unpack(filtered, 'wage'),
    text: unpack(filtered, 'stateName'),
    zmin: 0,
    zmax: 15,
    colorscale: [
        [0, 'rgb(242,240,247)'], [0.2, 'rgb(218,218,235)'],
        [0.4, 'rgb(188,189,220)'], [0.6, 'rgb(158,154,200)'],
        [0.8, 'rgb(117,107,177)'], [1, 'rgb(84,39,143)']
    ],
    colorbar: {
        title: 'USD ($)',
        thickness: 10
    },
    marker: {
        line:{
            color: 'rgb(255,255,255)',
            width: 2
        }
    }
    }];
    var layout = {
    title: 'US Minimum Wage by State',
    geo:{
        scope: 'usa',
        showlakes: true,
        lakecolor: 'rgb(255,255,255)'
    }
    };

    Plotly.newPlot("regions_div", dataPlot, layout, {showLink: false});
    });