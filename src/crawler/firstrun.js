
const cheerio = require("cheerio");
const request = require("request");
var save = require('./firtrundb')
const Date = require("../services/datenow")


const notices = "https://www.worldometers.info/coronavirus/#countries";


var localidades = [];


module.exports = () => {
  request(notices, function(error, response, body) {
  var $ = cheerio.load(body);
  $('tbody tr').each(function(element){
      localidade = $(this).find('td').slice(0,1).text().trim();
      caSe = $(this).find('td').slice(1,2).text().trim();
      death = $(this).find('td').slice(3,4).text().trim();
      date = Date()
      localidades.push({'localidade':localidade, 'cases':caSe, 'death':death, 'date':date})

     
  });
  console.log(JSON.stringify(localidades[0]) + ' ' + 'Captura realizada com sucesso')

  save(localidades);

})};
