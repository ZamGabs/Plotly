// CREATING A DRAW CHART TO PLOT ALL OF THE PLOTS 

// CHARTS THAT TAKE IN 4 VARIABLES
function drawChart (userinput) {   
    d3.json("static/js/samples.json").then(function(data) { 
    // DEMOGRAPHIC. INFO. PANEL (METADATA) 
    // SELECTING DEMOGRAPHIC INFO PANEL - CLEARS THE CONTENTS INSIDE - FOR EACH KEY & VALUE IN METADATA - APPEND TO THE KEY 
    var metadata_panel = d3.select("#sample-metadata");  
    var selection = data.metadata.filter(md=>md.id==userinput)
    var firstmeta = selection[0]  
    metadata_panel.html("");                               
    Object.entries(firstmeta).forEach(([key, value]) => {   
        metadata_panel.append("p").text(`${key}: ${value}`);       
    });
    
    // BAR CHART (X & Y DATA + HOVER TEXT)
    idsample = data.samples.filter(ids=>(ids.id ==userinput))
    var firstsample = idsample[0] 
    topids = firstsample.otu_ids.map(ids=>(`otu:${ids}`)).slice(0,10).reverse()
    topsamples = firstsample.sample_values.slice(0,10).reverse()
    topLabels= firstsample.otu_labels.slice(0,10).reverse()
    var trace = {                                 
        x: topsamples,
        y: topids,
        text: topLabels,
        type: 'bar',
        orientation: 'h'
    };

    var data = [trace];

    Plotly.newPlot('bar', data);
    
    // BUBBLE CHART (X & Y DATA + HOVER TEXT) 
    var trace2 = {
        x:firstsample.otu_ids,
        y: firstsample.sample_values,
        text: firstsample.otu_labels,
        mode: 'markers',
        marker: {
            size: firstsample.sample_values,
            color: firstsample.otu_labels
        }
    };

    var data2 = [trace2];

    Plotly.newPlot('bubble', data2);
    

})
};
// FUNCTION FOR DROPDOWN MENU TO SHOW NAMES 
// 1. FUNCTION WILL TAKE IN ONE VARIABLE: 'NAMES' | 2. SELECTS ID DATASET | 3. SELECTS ALL OPTIONS & WILL UPLOAD DATA IN 'NAMES'
function populateDropdown () {     //function take in one variable "names".
d3.json("static/js/samples.json").then(function(data) { 

    var selectTag = d3.select("#selDataset");     
    // var options = selectTag.selectAll('option').data(names);     
    // // ENTER FUNCTIONS
    // options.enter()
    //     .append('option')
    //     .attr('value', function(d) {
    //         return d;
    //     })
    //     .text(function(d) {
    //         return d;
    //     });
    data.names.forEach(datanames=>{
        selectTag.append("option").text(datanames)
    })
        optionChanged(data.names[0])
    })
};
// // FUNCTION FOR DROP DOWN 'EVENT HANDLER'  
function optionChanged (newValue) {                   
drawChart(newValue)}
populateDropdown();
//     d3.json("samples.json").then(function(data) {     

//     sample_new = data["samples"].filter(function(sample) {     
//         return sample.id == newValue;                      

//     });

//     // PLACEHOLDER 
//     metadata_new = data["metadata"].filter(function(metadata) {   

//         return metadata.id == newValue;                    

//     });
    
//     // X & Y DATA = UPDATE
//     x_data = sample_new[0]["otu_ids"];                    
//     y_data = sample_new[0]["sample_values"];             
//     hoverText = sample_new[0]["otu_labels"];             
    
//     console.log(x_data);
//     console.log(y_data);
//     console.log(hoverText);
 
// // DRAW CHART
//     drawChart(x_data, y_data, hoverText, metadata_new[0]);     
//     });
// };


// d3.json("samples.json").then(function(data) {     

//     // DROPDOWN WITH NAMES
//     populateDropdown(data["names"]);                  

//     // PAGE: FIRST VALUE THEN 4 VARIABLES ARE DEFINED
//     x_data = data["samples"][0]["otu_ids"];
//     y_data = data["samples"][0]["sample_values"];
//     hoverText = data["samples"][0]["otu_labels"];
//     metadata = data["metadata"][0];

//     // CHART ON LOAD
//     // drawChart(x_data, y_data, hoverText, metadata);
// optionChanged(data.names[0])

// }); 

// function optionChanged(id){
//     drawChart(x_data, y_data, hoverText, metadata_new[0]); 
// }

// CREATING A DRAW CHART TO PLOT ALL OF THE PLOTS 

// // CHARTS THAT TAKE IN 4 VARIABLES
// function drawChart (x_data, y_data, hoverText, metadata) {   

//     // DEMOGRAPHIC. INFO. PANEL (METADATA) 
//     // SELECTING DEMOGRAPHIC INFO PANEL - CLEARS THE CONTENTS INSIDE - FOR EACH KEY & VALUE IN METADATA - APPEND TO THE KEY 
//     var metadata_panel = d3.select("#sample-metadata");    
//     metadata_panel.html("");                               
//     Object.entries(metadata).forEach(([key, value]) => {   
//         metadata_panel.append("p").text(`${key}: ${value}`);       
//     });
    
//     // BAR CHART (X & Y DATA + HOVER TEXT)
//     var trace = {                                 
//         x: y_data
//             .slice(0,10)
//             .sort(function(a,b){
//                 return a-b
//             }),
//         y: x_data
//             .map(d => `OTU ${d}`),
//         text: hoverText,
//         type: 'bar',
//         orientation: 'h'
//     };

//     var data = [trace];

//     Plotly.newPlot('bar', data);
    
//     // BUBBLE CHART (X & Y DATA + HOVER TEXT) 
//     var trace2 = {
//         x: x_data,
//         y: y_data,
//         text: hoverText,
//         mode: 'markers',
//         marker: {
//             size: y_data,
//             color: x_data
//         }
//     };

//     var data2 = [trace2];

//     Plotly.newPlot('bubble', data2);
    


// };
// // FUNCTION FOR DROPDOWN MENU TO SHOW NAMES 
// // 1. FUNCTION WILL TAKE IN ONE VARIABLE: 'NAMES' | 2. SELECTS ID DATASET | 3. SELECTS ALL OPTIONS & WILL UPLOAD DATA IN 'NAMES'
// var populateDropdown = function(names) {     //function take in one variable "names".

//     var selectTag = d3.select("#selDataset");     
//     var options = selectTag.selectAll('option').data(names);     
//     // ENTER FUNCTIONS
//     options.enter()
//         .append('option')
//         .attr('value', function(d) {
//             return d;
//         })
//         .text(function(d) {
//             return d;
//         });

// };
// // FUNCTION FOR DROP DOWN 'EVENT HANDLER'  
// function optionChanged  (newValue) {                   

//     d3.json("static/js/samples.json").then(function(data) {     

//     sample_new = data["samples"].filter(function(sample) {     
//         return sample.id == newValue;                      

//     });

//     // PLACEHOLDER 
//     metadata_new = data["metadata"].filter(function(metadata) {   

//         return metadata.id == newValue;                    

//     });
    
//     // X & Y DATA = UPDATE
//     x_data = sample_new[0]["otu_ids"];                    
//     y_data = sample_new[0]["sample_values"];             
//     hoverText = sample_new[0]["otu_labels"];             
    
//     console.log(x_data);
//     console.log(y_data);
//     console.log(hoverText);
 
// // DRAW CHART
//     drawChart(x_data, y_data, hoverText, metadata_new[0]);     
//     });
// };


// d3.json("static/js/samples.json").then(function(data) {     

//     // DROPDOWN WITH NAMES
//     populateDropdown(data["names"]);                  

//     // PAGE: FIRST VALUE THEN 4 VARIABLES ARE DEFINED
//     x_data = data["samples"][0]["otu_ids"];
//     y_data = data["samples"][0]["sample_values"];
//     hoverText = data["samples"][0]["otu_labels"];
//     metadata = data["metadata"][0];

//     // CHART ON LOAD
//     // drawChart(x_data, y_data, hoverText, metadata);
// optionChanged(data.names[0])

// });
