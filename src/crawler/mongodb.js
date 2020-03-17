const mongoose = require("mongoose");
const date = require("../services/datehours");

const URL =
  "mongodb+srv://admin:1234@cluster0-9jhwf.mongodb.net/covid-19?retryWrites=true&w=majority";

const localidadesSchema = new mongoose.Schema({
  country: {
    type: String
  },
  cases: {
    type: String
  },
  death: {
    type: String
  },
  date: {
    type: String
  }
});



module.exports = function(items) {
  var localidadeModel = mongoose.model(
    "places" + " " + date(),
    localidadesSchema
  );

  //var caSe = cases;
  var localidades = [];
  items.forEach(function(item, index) {
    var localidade = new localidadeModel();
    localidade.country = item["localidade"];
    localidade.cases = item["cases"];
    localidade.death = item["death"];
    localidade.date = item["date"];

    localidades.push(localidade);
  });


  mongoose.connect(
    URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    function(error) {
      if (!error) {
        // console.log((localidades))
        localidadeModel
          .insertMany(localidades)
          .then(function(docs) {
            console.log("salvo com sucesso");
            // console.log(localidades);
            mongoose.disconnect();
          })
          .catch(function(error) {
            console.log(error);
            process.exit(2); // remover essa linha após teste
          });
      } else {
        console.log(error);
        process.exit(1); // remover após teste.
      }
    }
  );
};
