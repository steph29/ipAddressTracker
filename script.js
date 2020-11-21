var send = document.getElementById("submit");
var text = document.getElementById("inputext").value;
const url =
  "https://geo.ipify.org/api/v1?apiKey=at_FyNdEuLyJ6wCS5CyTXgGEVgM3Viwg&ipAddress=" +
  text;

send.addEventListener("click", function () {
  getUrl(url);
});
var pressEnter = document.getElementById("submit");
pressEnter.addEventListener("keyup", function (e) {
  console.log(e.key);
  if (e.key === "Enter") {
    getUrl(url);
  }
});

function getUrl(url) {
  fetch(url)
    .then((res) => {
      const resData = res.json();
      resData.then((dataJson) => {
        // L.geoJSON(dataJson).addTo(map);

        var map = L.map("mapid").setView(
          [dataJson["location"]["lat"], dataJson["location"]["lng"]],
          13
        );
        var iconL = L.icon({
          iconUrl: "images/icon-location.svg",
          iconSize: [38, 45],
        });

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        L.marker([dataJson["location"]["lat"], dataJson["location"]["lng"]], {
          icon: iconL,
        })
          .addTo(map)
          .addTo(map);

        const ipAddress = document.getElementById("ip");
        const ipLocation = document.getElementById("location");
        const iptimezone = document.getElementById("timezone");
        const ipIsp = document.getElementById("isp");

        let addIp = document.createElement("p");
        addIp.appendChild(document.createTextNode(dataJson["ip"]));
        ipAddress.appendChild(addIp);

        let addLocation = document.createElement("p");
        addLocation.appendChild(
          document.createTextNode(dataJson["location"]["city"])
        );
        ipLocation.appendChild(addLocation);

        let addTimezone = document.createElement("p");
        addTimezone.appendChild(
          document.createTextNode("UTC " + dataJson["location"]["timezone"])
        );
        iptimezone.appendChild(addTimezone);

        let addIps = document.createElement("p");
        addIps.appendChild(document.createTextNode(dataJson["isp"]));
        ipIsp.appendChild(addIps);
      });
    })
    .catch((error) => console.log("Error : " + error));
}
