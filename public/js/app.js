const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
const messageThree = document.querySelector("#message-3");

weatherForm.addEventListener("submit", e => {
  e.preventDefault();

  const location = search.value;
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  fetch("/weather?address=" + location).then(response => {
    response.json().then(data => {
      if (data.error) {
        messageOne.textContent = "Please enter a location";
      } else {
        messageOne.textContent = "Your location is " + data.location;

        messageTwo.textContent =
          "Current weather for your location: " + data.forecast;

        messagethree.textContent =
          "Temperature for your location is: " + body.currently.temperature;
      }
    });
  });
});
