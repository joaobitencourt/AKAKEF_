require("dotenv").config();
const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const conn = require("./db/conn");
const port = process.env.APP_Port;
//modules
const product = require("./models/Product"); 
const lookbook = require("./models/LookBook");
const AcessType = require("./models/AcessType");
const Cliente = require("./models/Cliente");
const Adress = require("./models/Adress");
const Sessions = require("./models/Sessions");
const Func = require("./models/Func");
const img = require("./models/ImageStorage");
const productsRouts = require("./routes/productsRouts");


//definição da view engine
app.set("view engine", "hbs");
//configurando o template egine
app.engine("hbs", exphbs.engine({
layoutsDir:__dirname + "/views/layouts",
extname: "hbs",//encurtador do extenção do arquivo
defaultLayout:"main",
partialsDir:__dirname + "/views/partials",
}));


/* Midlewars */
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());
app.use(express.static("public"));
app.use("/", require("./routes/lookBookRouts"));
app.use("/", require("./routes/productsRouts"));



conn
  .sync()
  .then(() => {
    app.listen(port);
  })
  .catch((err) => console.log(err));