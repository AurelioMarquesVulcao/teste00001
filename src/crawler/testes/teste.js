//const request = require('request');
const cheerio = require("cheerio");
const axios = require("axios");
var save = require('./mongodb.js')





const notices = "https://www.worldometers.info/coronavirus/#countries";

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

const LeanResponse = (html) => {
  let $ = cheerio.load(html)
  var covid =  $('tbody tr').map((index, element) => ({
  
      country:  $(element).find("td").slice(0,1).text().trim(),
      cases:  $(element).find("td").slice(1,2).text(),
      death:  $(element).find("td").slice(3,4).text(),
      date: RetornaDataHoraAtual()
  })).get()
  return covid
};

const SearchNotices = async LeanResponse => {
  try {
    const response = await axios({ url: notices, method: "get" });
    const objectReurn = await LeanResponse(response.data);
    return Promise.resolve(objectReurn);
  } catch (err) {
    return Promise.reject(err);
  }
};

SearchNotices(LeanResponse)
  .then(resp => console.log("covid-19 localidades", JSON.stringify(resp)))
  .catch(err => console.log("erro", err))
  .then(resp => console.log("covid-19 localidades", save(JSON.stringify(resp))))
  .catch(err => console.log("erro", err))
 
