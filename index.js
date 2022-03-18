require("dotenv").config();
const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const conn = require("./db/conn");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");
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
const pay = require("./models/Pay");

/* Configs */

/* sessions */
require("./config/Auth")(passport);
app.use(session({
  secret:"naovaisubirninguem",
  resave:true,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

/* middleware */
//posso criar variaveis locais com a possibilidade de serem referenciadas anyware
app.use((req, res, next) =>{
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.cep = req.flash("cep");
  res.locals.user = req.user || null;
  next();
});

/* View engine config */
//definição da view engine
app.set("view engine", "hbs");
//configurando o template egine
app.engine("hbs", exphbs.engine({
layoutsDir:__dirname + "/views/layouts",
extname: "hbs",//encurtador do extenção do arquivo
defaultLayout:"main",
partialsDir:__dirname + "/views/partials",
}));

/* Body parser */
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

/* public */
app.use(express.static("public"));

/* Routes */
app.use("/", require("./routes/PayRouts"));
app.use("/", require("./routes/UserRouts"));
app.use("/", require("./routes/lookBookRouts"));
app.use("/", require("./routes/productsRouts"));


/* bd connction test */
conn
  .sync()
  .then(() => {
    app.listen(port);
  })
  .catch((err) => console.log(err));