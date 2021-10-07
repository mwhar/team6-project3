google.charts.load('current', {
    'packages':['geochart']
});
// google.charts.setOnLoadCallback(drawRegionsMap);
const pickURL = "/pick"
var category =
google.charts.setOnLoadCallback(optionCostChanged("C"));
d3.json(pickURL).then(function(response){
	console.log(response[0])
    response = response[0]
	let dropdown= d3.select ("#selState")	
	let dropdown2= d3.select ("#selYear")	
	response.map(data=>dropdown.append("option").text(data.full_name).property("value",data.full_name))
    // response.map(data=>dropdown.append("option").text(data.full_name).property("value",data.full_name))
	// response.map(data=>dropdown2.append("option").text(data.Year.toString()).property("value",data.Year.toString()))
	// let Years=new Set()
	// response.forEach((sampledata)=>{
	
	// Years.add(sampledata.Year)
	// })
	// console.log(Years)
	// Years.forEach((Year)=>{
	// 	dropdown2.append("option").text(Year).property("value",Year)	
	// })
    return response



}).then(function(){
    
    optionStateChanged("Alabama");
    optionCostChanged("C");
});
d3.json()
function optionStateChanged(selectvalue){
    console.log(selectvalue)
    var stateURL = `/${selectvalue}`
    d3.json(stateURL).then(function(response){
    // let state=response.filter(st=>st.State==selectvalue)
    {
        let state=response[0]
        console.log(state)
        let Years=state.map(Y=>Y.year)
        fed_min_wage = [6.63, 7.22, 7.84, 7.61, 7.42, 7.21, 7.01, 7.66, 8.17, 8, 7.74, 7.52, 7.4, 7.24, 7.05, 6.82, 6.61, 6.42, 7.03, 7.9, 8.6, 8.34, 8.17, 8.05, 7.92, 7.91, 7.81, 7.65, 7.47, 7.34, 7.25]
        var trace1 = {
            name:"Federal Min. Wage",
            x: Years,
            y:fed_min_wage,
            fill:'tonexty',
            fillcolor:'gray',
            mode: 'none',
            type: 'scatter'
        }
        let eff_Minimum_Wage=state.map(w=>w.min_wage_eff)
        console.log(Years)
        console.log(eff_Minimum_Wage)
        var trace2 = {
            name:"Effective State Min. Wage",
            x: Years,
            y: eff_Minimum_Wage,
            line:{
                color: "#0000FF"
            },
            mode: 'scatters',
            
        };
        
        var data = [trace1, trace2];
        
        var layout = {
            legend: {
                x: 0,
                y: 1.1,
                bgcolor: 'rgba(255, 255, 255, 0)',
                bordercolor: 'rgba(255, 255, 255, 0)'
              },
            xaxis: {
                tickangle:45
                },
                yaxis: {
                    range: [0, 15.5]
                },
                margin:{
                    l:20,
                    t:10
                }
            };
        
        Plotly.newPlot('linechart_div', data, layout);
    }
    {
        let pce=response[1]
        
        console.log(pce);
        var clothing = pce.filter(function(row){
            return row.pce_cat ==="Clothing and footwear";
        });
        console.log(clothing)
        var gas = pce.filter(function(row){
            return row.pce_cat ==="Gasoline and other energy goods";
        });
        var house = pce.filter(function(row){
            return row.pce_cat ==="Housing and utilities";
        })
        var health = pce.filter(function(row){
            return row.pce_cat ==="Health care";
        });
        out = clothing.map(v=>v.pce_value);
        console.log(out);
        var traceClothing ={
            x: clothing.map(v=>v.year),
            y: clothing.map(v=>v.pce_value),
            name: "Clothing & Footwear",
            marker: {color: 'green'},
            type: 'bar'
        }
        var traceGas = {
            x: gas.map(v=>v.year),
            y: gas.map(v=>v.pce_value),
            name: "Gasoline/Energy",
            marker: {color: 'purple'},
            type: 'bar'
          }
        var traceHouse = {
        x: house.map(v=>v.year),
        y: house.map(v=>v.pce_value),
        name: "Housing & Utilities",
        marker: {color: 'orange'},
        type: 'bar'
        }
        var traceHealth = {
        x: house.map(v=>v.year),
        y: house.map(v=>v.pce_value),
        name: "Health Care",
        marker: {color: 'red'},
        type: 'bar'
        }
        var data = [traceGas, traceClothing, traceHealth, traceHouse];
        var layout = {
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
              margin:{
                l:20,
                t:10
            }
            };
            
            Plotly.newPlot('barchart_div', data, layout);
    }
    
    })
}
function optionCostChanged(selectvalue){
    var stateURL = `/US`
    d3.json(stateURL).then(function(response){
        return response[1];
    }).then(function(pce){
            var category;
            var color;
            if(selectvalue =="C"){
                category = "Clothing and footwear";
                min = 500;
                max = 2500;
                color = "green";
            }
            else if(selectvalue =="HC"){
                category = "Health care";
                min = 5000;
                max = 15000;
                
                color = "red";
            }
            else if(selectvalue =="G"){
                category = "Gasoline and other energy goods";
                min = 500;
                max = 2500;
                color = "purple";
            }else{
                category = "Housing and utilities";
                min = 5000
                max = 15000;
                color = "orange"
            }
            
            var filtered = pce.filter(function(row){
                return row.pce_cat ===category;
            });
            var mapArray = [["State", "Avg Annual Expense"]];
            for (i=0; i<filtered.length;i++){
                mapArray.push([filtered[i].state_name,filtered[i].pce_value])
            }
            console.log("mapData: ",mapArray)
            google.charts.setOnLoadCallback(drawRegionsMap);
            function drawRegionsMap(){
            var mapData = google.visualization.arrayToDataTable(mapArray);
            var options = {
                resolution: 'provinces',
                region: 'US',
                colorAxis: {minValue: min,
                    maxValue: max,
                    colors:['white',color]}
                
            };
        
            var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
        
            chart.draw(mapData, options);
        }
    });
}
// function optionYearChanged(selectvalue){
// console.log(selectvalue)
// 	filterstatedata(selectvalue)
// 	createbarchart()
	

// }
// function filterstatedata(selectvalue){
// 	d3.json("Resources/wage_data.json").then(function(response){
// 		console.log(response[0]);
// 		response.map((data)=>{
// 			if(data.State==selectvalue) {
// 				console.log(data)
// 			}
// 		})
	
// 	});
// }
// function createlinechart(){
// 	var states =[]
// 	var wages=[]
// 	d3.json("wage_data.json").then ((response)=>{
// 		response.map((data)=>{
// 			if(data.Year==1990) {
// 				console.log(data["State Minimum Wage"])
// 				states.push(data.State)
// 				wages.push(data["State Minimum Wage"])
// 			}
// 		})
// 	});
	
// 	console.log(states)
// 	console.log(wages)
// }