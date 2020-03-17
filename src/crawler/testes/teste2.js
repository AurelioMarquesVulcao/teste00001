
const cheerio = require("cheerio");
const request = require("request");
const axios = require("axios");
var save = require('./mongodb.js')


function RetornaDataHoraAtual() {
    var dNow = new Date();
    var localdate =
      dNow.getDate() +
      "/" +
      (dNow.getMonth() + 1) +
      "/" +
      dNow.getFullYear() +
      " " +
      dNow.getHours() +
      ":" +
      dNow.getMinutes();
    return localdate;
  }

const notices = "https://www.worldometers.info/coronavirus/#countries";

var localidades = [];

request(notices, function(error, response, body) {
    var $ = cheerio.load(body);
    var covid =  $('tbody tr').map((index, element) => ({
  
        country: $(element).find("td").slice(0,1).text().trim(),
        // cases: $(element).find("td").slice(1,2).text(),
        // death: $(element).find("td").slice(3,4).text(),
        // date: RetornaDataHoraAtual()
    })).get() 
    // console.log(covid[0]["country"])
    console.log(JSON.stringify(covid[0]))
    //console.log(JSON.stringify(covid.length))
    localidades.push((covid))

    save(localidades);
})
