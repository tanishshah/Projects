
var lati = [];
var loni =[];
var colours =[];
var sizes =[];
var count = 0;
var i;
var cycle = 0;

function map(){
  var mymap = L.map('mapid').setView([0, 0], 1);
            
  //Insert tile layer here
  for(i = 0; i<count; i++)
  {
    var circle = L.circle([lati[i], loni[i]], {color: colours[i], fillColor: colours[i], fillOpacity: 0.5, radius:sizes[i]} ).addTo(mymap);
    circle.bindPopup(`Latitude: ${lati[i]}, Longitude: ${loni[i]}`);
  }
}

function collector(){
  lati[count]= document.getElementById("lat").value;
  loni[count] = document.getElementById("lon").value;
  colours[count] = document.getElementById("col").value;
  sizes[count] = document.getElementById("size").value;
  count += 1;

}

window.onload = function() {
  var fileInput = document.getElementById('fileInput');


  fileInput.addEventListener('change', function(e) {
    var file = fileInput.files[0];
    var finType = /text.*/;

    if (file.type.match(finType)) {
      var reader = new FileReader();

      reader.onload = function(e) {
        var lines = reader.result.split(',');
        
        for(var line = 0; line < lines.length; line++){
          if(cycle == 0){
            lati[count] = lines[line];
            cycle++;
            console.log(lati[count]);
          }
          else if(cycle == 1){
            loni[count] = lines[line];
            cycle++;
            console.log(loni[count]);
          }
          else if(cycle == 2){
            colours[count] = lines[line];
            cycle++;
            console.log(colours[count]);
          }
          else
          {
            sizes[count] = lines[line];
            cycle = 0;
            console.log(sizes[count]);
            count++;
          }
        };
      }
      reader.readAsText(file);	
    }
  });
}


