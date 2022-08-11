/* Global Variables */

//base URL for OpenWeatherMap API
const baseUrl = "http://api.openweathermap.org/data/2.5/forecast?zip=";

// Personal API Key for OpenWeatherMap API
const apiKey = "&appid=5e8fb36be5e7207d23935ab9db67f1fe&units=metric";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.toDateString();

document.getElementById('generate').addEventListener('click', performAction)

function performAction(){
    const zipValue = document.getElementById('zip').value;
    const feelingsValue = document.getElementById('feelings').value;
    retrieveData( baseUrl, zipValue, apiKey)
    .then(function(data){
        postData('/addData', {name: data.city.name, date: newDate, temp: data.list[0].main.temp, feelings: feelingsValue})
        updateUi();
    })
};

//get data from api
const retrieveData = async(url, zip, key)=>{
    const response = await fetch(url+zip+key);
    try{
        const data = await response.json();
        console.log(data);
        return data;
    }
    catch(error){
        console.log("error", error);
    }
}

//post data to the server
const postData = async(url='', data={})=>{
    const response = await fetch(url, {
        method:'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });
    try{
        const newData = await response.json();
        console.log(newData);
        return newData; 
    }
    catch(error){
        console.log("error", error);
    }
}

//updateUi by getting data from server and add it to the document
const updateUi = async()=>{
    const request = await fetch('/all');
    try{
        const allData = await request.json();
        document.getElementById('city-name').innerHTML = `<span class="dataout"> City Name: ${allData.name} </span>`
        document.getElementById('date').innerHTML = `<span class="dataout"> Date: ${allData.date} </span>`
        document.getElementById('temp').innerHTML = `<span class="dataout"> Temprature: ${Math.round(allData.temp)} degrees</span>`
        document.getElementById('content').innerHTML = `<span class="dataout"> Feelings: ${allData.feelings} </span>`
        document.getElementById('city-name').style.color = "black";
        document.getElementById('date').style.color = "black";
        document.getElementById('temp').style.color = "black";
        document.getElementById('content').style.color = "black";
    }
    catch(error){
        console.log("error", error);
    }
}
