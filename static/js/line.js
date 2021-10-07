// d3.json("Resources/wage_data.json").then((data)=>{
const url = '/api/wages'
const drop_url ='/api/states'
d3.json(drop_url).then(function(response){
	console.log(response)
	let dropdown= d3.select ("#selState")	
	let dropdown2= d3.select ("#selYear")	
	response.map(data=>dropdown.append("option").text(data.name).property("value",data.name))
	// response.map(data=>dropdown2.append("option").text(data.Year.toString()).property("value",data.Year.toString()))
	let Years=new Set()
	response.forEach((sampledata)=>{
	Years.add(sampledata.Year)
	})
	console.log(Years)
	Years.forEach((Year)=>{
		dropdown2.append("option").text(Year).property("value",Year)	
	})



});
function optionStateChanged(selectvalue){
console.log(selectvalue)
d3.json(url).then(function(response){
let state=response.filter(st=>st.State==selectvalue)
console.log(state)
let Years=state.map(Y=>Y.Year)
let State_Minimum_Wage=state.map(w=>w["State Minimum Wage"])
console.log(Years)
console.log(State_Minimum_Wage)
var trace1 = {
	name:"State Minimum wage",
	x: Years,
	y: State_Minimum_Wage,
	mode: 'scatters'
  };
  
let eff_Minimum_Wage=state.map(w=>w["Effective Minimum Wage"])
console.log(Years)
console.log(eff_Minimum_Wage)
var trace2 = {
	name:"Effective minimum wage",
	x: Years,
	y: eff_Minimum_Wage,
	mode: 'scatters'
  };
  
  
  
  var data = [ trace1,trace2];
  
  var layout = {
	title:'Line and Scatter Plot'
  };
  
  Plotly.newPlot('linechart_div', data, layout);
  
})
}
optionStateChanged("Alabama")
function optionYearChanged(selectvalue){
console.log(selectvalue)
	filterstatedata(selectvalue)
	createbarchart()
	

}
function filterstatedata(selectvalue){
	d3.json(url).then(function(response){
		console.log(response[0]);
		response.map((data)=>{
			if(data.State==selectvalue) {
				console.log(data)
			}
		})
	
	});
}
function createlinechart(){
	var states =[]
	var wages=[]
	d3.json(url).then ((response)=>{
		response.map((data)=>{
			if(data.Year==1990) {
				console.log(data["State Minimum Wage"])
				states.push(data.State)
				wages.push(data["State Minimum Wage"])
			}
		})
	});
	
	console.log(states)
	console.log(wages)
	
	// var horizontal_data = [
	// {
	// 	x: sample_values.slice(0,10),
	// 	y: tensamples,
		
	// 	type: 'bar',
	// 	orientation:"h"
	// }
	// ];
	// var layout_bar_chart ={
	// title: 'Horizontal chart',
	// showlegend: false,
	// height: 600,
	// width: 600}
	// Plotly.newPlot('bar', horizontal_data, layout_bar_chart)

}
