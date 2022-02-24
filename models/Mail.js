const { consultarCep, calcularPrecoPrazo } = require("correios-brasil");
//geting cep
const cep = "21770200"
//can set any form of var string number...
consultarCep(cep)
.then((response => {
    /* console.log(res); */
})).catch(error => console.log("Error.:"+error.message));


/* query deadlines delivery products */
  const calcPrecoPrazo = (req ,res, next) =>{
  
    if(!req.body.cep) return next();
    const cep = req.cep;
        let args = {
            //any value is valid dont wory with format
            sCepOrigem: '81200100',
            sCepDestino: cep,
            nVlPeso: '1',
            nCdFormato: '1',
            nVlComprimento: '20',
            nVlAltura: '20',
            nVlLargura: '20',
            nCdServico: ['04014', '04510'], //Array com os códigos de serviço
            nVlDiametro: '0',
        };
        calcularPrecoPrazo(args).then((response) => {
            console.log(response);
          }).catch(error => console.log("Error.:"+error.message));
    next();
  }

  module.exports = calcPrecoPrazo;