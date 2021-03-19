const apiKey = "7d5b28b7b9c1c5872863a37a044330b4";

let searchInput = document.getElementById("search");
let searchBtn = document.getElementById("searchBtn");
let results = document.getElementById("results");
let imgCtn = document.getElementById("imgCtn");

function search() {
  //Fetch con async await
  async function newsSearch(city_name) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${apiKey}`;
    const resp = await fetch(url);
    const info = await resp.json();
    return info;
  }
  let info = newsSearch(searchInput.value);
  info
    .then((response) => {
      console.log(response);
      var temperatura = response.main.temp - 273;
      var redondeo = Math.round(temperatura * 100) / 100;
      results.textContent = `Clima: ${response.weather[0].main}, Temperatura: ${redondeo} °C, Humedad: ${response.main.humidity} %`;
    })
    .catch((error) => {
      console.log(error);
    });
}

/*async function getCastImg() {
  let url = "http://openweathermap.org/img";
  const resp = await fetch(url);
  const data = await resp.json();
  return data;
}

let cast = getCastImg();
cast
  .then((data) => {
    let castImg = document.createElement("img");
    castImg.setAttribute("src", data.message);
    castImg.style.width = "50px";
    imgCtn.appendChild(castImg);
    console.log(data);
  })
  .catch((err) => {
    console.error("fetch failed", err);
  });*/

searchBtn.addEventListener("click", () => {
  search();
});
searchInput.addEventListener("keyup", () => {
  if (event.which === 13 || event.keyCode == 13) {
    search();
  }
});
