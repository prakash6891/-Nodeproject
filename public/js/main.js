//const async = require("hbs/lib/async");

const cityName      = document.getElementById('cityName');
const submitBtn     = document.getElementById('submitBtn');
const city_name     = document.getElementById('city_name');
const temp          = document.getElementById('temp');
const temp_info     = document.getElementById('tempData');
const temp_status   = document.getElementById('temp_status');
const match_data    = document.getElementById('match_data');

/*
//code for auto suggestion of city name
const searchCity = async searchText=>{
  const cityData = await fetch('json/city.json') 
  const cityDataObject = await cityData.json();

  // get match to current text insert 
    let matches     = cityDataObject.filter(city => {
    const regex     = new RegExp(`^${searchText}`, `gi`);
    return city.name.match(regex);  
  })
  //let arrMatchData = [matches]
 // console.log(matches);
 if(matches.length === 0){
   matches =  [];
   match_data.innerHTML = "";
 }
    outputHtml(matches);
};

const outputHtml = matches =>{
  //console.log(arrMatchData);
  if(matches.length > 0){
    
    const html = matches.map(match =>`<div class="card card-body mb-1">
      <h4>${match.name}</h4></div>`).join('');
       match_data.innerHTML = html;
    //console.log(html);
  }else{
    console.log(" yaha bi araha hu main");
  }
}

cityName.addEventListener('input', ()=>{
  searchCity(cityName.value)
});

*/

const getInfo = async(event) => {
  event.preventDefault();
      let cityValue = cityName.value;

      if(cityValue === ""){
        city_name.innerText="please Enter city name first";

      }else{

      
        try{  
                //third party API of get latitute & longitude !

               let lat_long_url = `http://www.mapquestapi.com/geocoding/v1/address?key=YZdQAcbznG8O6iPGsAMcRFWX8CPu0v4K&location=${cityValue}`;
                   const lat_long_response = await fetch(lat_long_url);
                   const obj_data = await lat_long_response.json();
                   const arrData = [obj_data];
                   const lat = arrData[0].results[0].locations[0].latLng.lat;
                   const long = arrData[0].results[0].locations[0].latLng.lng;
                  // console.log("latitude == "+ lat + "" +" longitude == " +long);
     
                // third party API of get Weather INFO !

                  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=77da53df9c233ca134a3a590de5ea0ed`;
                  const temp_response = await fetch(url);
                  const temp_data     =await temp_response.json();
                  const temp_arrData  = [temp_data];
                  const c_name        = temp_arrData[0].name;
                  const country_name  = temp_arrData[0].sys.country;
                  const temp_I        = temp_arrData[0].main.temp;

                  city_name.innerHTML = c_name+  " " +  country_name;
                  temp_info.innerHTML = temp_I;        

// set code weather Status

                    const tempStatus = temp_arrData[0].weather[0].main;

                      if (tempStatus == "Clear") {
                        document.getElementById("weathercon").innerHTML =
                              "<i class='fas  fa-sun' style='color: #eccc68;'></i>";
                          } else if (tempStatus == "Clouds") {
                            document.getElementById("weathercon").innerHTML =
                              "<i class='fas  fa-cloud' style='color: #f1f2f6;'></i>";
                          } else if (tempStatus == "Rainy") {
                            document.getElementById("weathercon").innerHTML =
                              "<i class='fas  fa-cloud-rain' style='color: #a4b0be;'></i>";
                          } else {
                            document.getElementById("weathercon").innerHTML =
                              "<i class='fas  fa-cloud' style='color:#f1f2f6;'></i>";
                          }

        }catch{
          city_name.innerText = "Please Enter valid city name";
        }
        
      }
    
    } 
submitBtn.addEventListener('click',getInfo);                   

