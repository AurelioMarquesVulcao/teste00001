module.exports = function RetornaDataHoraAtual() {
    var dNow = new Date();
    var localdate =
      dNow.getFullYear() +
      "/" +
      (dNow.getMonth() + 1) +
      "/" +
      dNow.getDate() +
      " " +
      (dNow.getHours()-1)
  
    return localdate;
  };
  