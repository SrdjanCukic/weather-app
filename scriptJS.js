"use strict";

const temperatureDescription = document.querySelector(
  ".temperature-description"
);
const temperatureDegree = document.querySelector(".temperature-degree");
const locationTimezone = document.querySelector(".location-timezone");
const getCurrPossInp = document.querySelector('.getLocationManual');
const button = document.querySelector('.searchLoc');

const key = "b1ad70c371e0a51afa3deafbd1c6e06a";


if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const { longitude } = position.coords;
      const { latitude } = position.coords;

      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const { temp } = data.main;

          const { description } = data.weather[0];
          const location = data.name;
          const iconRaw = data.weather[0].icon;

          const icon = makingIcon(iconRaw);

          setIcons(icon, document.querySelector(".icon"));

          temperatureDegree.textContent = Math.round(temp);
          temperatureDescription.textContent =
            description.charAt(0).toUpperCase() + description.slice(1);
          locationTimezone.textContent = location;
        });
    },
    function () {
      alert("Could not get your location");
    }
  );

function setIcons(icon, iconID) {
  const skycons = new Skycons({ color: "white" });
  const currentIcon = icon.toString().replace(/-/g, "_").toUpperCase();
  skycons.play();
  return skycons.set(iconID, Skycons[currentIcon]);
};

const makingIcon = function (iconRaw) {
  if (iconRaw === "01d") return "CLEAR_DAY";
  if (iconRaw === "01n") return "CLEAR_NIGHT";
  if (iconRaw === "02d") return "PARTLY_CLOUDY_DAY";
  if (iconRaw === "02n") return "PARTLY_CLOUDY_NIGHT";
  if (iconRaw === "03n" || "03d" || "04d" || "04n") return "CLOUDY";
  if (iconRaw === "10d" || "10n" || "09d" || "09n") return "RAIN";
  if (iconRaw === "11d" || "11n") return "SLEET";
  if (iconRaw === "13d" || "13n") return "SNOW";
  if (iconRaw === "50d" || "50n") return "FOG";
  else return 1;
};