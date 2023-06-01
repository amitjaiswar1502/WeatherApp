

// API header Options
const options = {
    method: 'GET',
    headers: {
        'content-type': 'application/octet-stream',
        'X-RapidAPI-Key': '1debf46a79msh3a6d0fb03d94adep1c8648jsn6b1896aadb2a',
        'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
    }
};

// Fetching data from weather api
const getWeather = (city) => {
    return new Promise((resolve, reject) => {
        fetch('https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=' + city, options)
            // .then(response => response.json())

            .then((response) => {
                response = response.json();
                //console.log(response);
                resolve(response);
            })
            .catch(err => reject(err));
    });
}

// For Search
submit.addEventListener("click", async (e) => {
    e.preventDefault();
    let city = document.getElementById("city");
    let response = await getWeather(city.value).catch(err => console.error(err));
    // console.log(response);
    setCardData(response, (city.value).toUpperCase());
});

const timeConvert = (epoc_time) => {
    let time = new Date(epoc_time * 1000);

    return (time.toLocaleTimeString().slice(0, 5));

}


// Setting data to main card 
const setCardData = (data, city) => {
    let cityName = document.getElementById("cityName");
    cityName.innerHTML = city;
    cloud_pct.innerHTML = data.cloud_pct;
    temp.innerHTML = data.temp;
    temp2.innerHTML = data.feels_like;
    if (temp2.innerHTML >= 35) {
        document.body.style.backgroundImage = "url('./images/above35.jpg')";
    } else if (temp2.innerHTML < 35 && temp2.innerHTML > 20) {
        document.body.style.backgroundImage = "url('./images/sunny1.jpg')";
    } else {
        document.body.style.backgroundImage = "url('./images/freezingMorning.jpg')";
    }


    feels_like.innerHTML = data.feels_like;
    humidity.innerHTML = data.humidity;
    humidity2.innerHTML = data.humidity;
    min_temp.innerHTML = data.min_temp;
    max_temp.innerHTML = data.max_temp;
    wind_speed.innerHTML = data.wind_speed;
    wind_speed2.innerHTML = data.wind_speed;
    wind_degrees.innerHTML = data.wind_degrees;

    sunrise.innerHTML = timeConvert(data.sunrise);
    sunset.innerHTML = timeConvert(data.sunset);


}

let a = new Date();
let h = a.getHours();
let m = a.getMinutes();
let s = a.getSeconds();
console.log(h)

if (h > sunset.innerHTML) {
    document.getElementById("sunny").src = "/images/icons/clear-night.svg";

}

//setting local time
setInterval(function () {

    document.getElementById("second").innerHTML = " : " + s;
    document.getElementById("hour").innerHTML = h;
    document.getElementById("minute").innerHTML = " : " + m;
}, 1000);



// Creating City wise weather table header
const addTableHeader = (data) => {
    let keys = Object.keys(data); // get all keys from api response
    /* api response format
    { "cloud_pct": 4,"feels_like": 28,"humidity": 12,"max_temp": 31,"min_temp": 30,"sunrise": 1676165872,"sunset": 1676207135,"temp": 30,
    "wind_degrees": 48,"wind_speed": 5.45 }
    */

    let table = document.getElementById("cityDetails"); // Getting table reference from ID

    // Creating Table header
    let thead = document.createElement('thead');
    let tr = document.createElement('tr');
    let firstColumn = document.createElement('td');

    tr.appendChild(firstColumn);

    for (let j = 0; j < keys.length; j++) {
        const colName = keys[j];
        let tableHeadTd = document.createElement('td');
        tableHeadTd.setAttribute("style", "table-layout: fixed;");
        tableHeadTd.innerHTML = `<b>${colName.toUpperCase().replace(/_/g, " ")}</b>`;
        tr.appendChild(tableHeadTd);
    }
    thead.appendChild(tr);
    table.appendChild(thead);

    /* 
    NOTE: For creating html tag elements
           tag import sequence is important

        <table>
            <thead>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    */
}

// Creating city wise table row
const addCityRow = (data, city) => {
    // <thead>
    //     <tr>
    //         <th style="width: 34%;"></th>
    //         <th style="width: 22%;">Cloud_pct</th>
    //         <th style="width: 22%;">Feels_like</th>
    //         <th style="width: 22%;">Humidity</th>
    //         <th style="width: 22%;">Max_temp</th>
    //         <th style="width: 22%;">Min_temp</th>
    //         <th style="width: 22%;">Sunrise</th>
    //         <th style="width: 22%;">Sunset</th>
    //         <th style="width: 22%;">Temp</th>
    //         <th style="width: 22%;">Wind_degrees</th>
    //         <th style="width: 22%;">Wind_speed</th>
    //     </tr>
    // </thead>

    let keys = Object.keys(data);
    let table = document.getElementById("cityDetails");

    let tbody = document.createElement('tbody');
    let row = document.createElement("tr");
    let th = document.createElement("th");
    th.setAttribute("scope", "row");
    th.innerHTML = city;
    row.appendChild(th);

    for (let i = 0; i < keys.length; i++) {
        let td = document.createElement("td");
        let attribute = keys[i];
        td.innerHTML = (attribute == 'sunrise' || attribute == 'sunset') ? timeConvert(data[attribute]) : data[attribute]
        row.appendChild(td);
    }
    tbody.appendChild(row);
    table.appendChild(tbody);
}

// Home city api call for main card
let city = "KALYAN";
getWeather(city).then(res => setCardData(res, city));


// Table data
getWeather('Mumbai').then(res => {  // if more then one statements we need to specify inside {}
    addTableHeader(res);
    addCityRow(res, 'Mumbai');
});
getWeather('Chennai').then(res => { addCityRow(res, 'Chennai'); }); // if only one statement we can specify {} or can be avoided
getWeather('Kolkata').then(res => addCityRow(res, 'Kolkata'));
getWeather('Delhi').then(res => addCityRow(res, 'Delhi'));



