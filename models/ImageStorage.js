var admin = require("firebase-admin");

/* sdk key */
var serviceAccount = require("../db/SDKimgsTeste.json");

const BUCKET = "imgteste-a28c8.appspot.com";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  /* BUCKET PATH */
  storageBucket: BUCKET
});

/* Bucket Initialize 
for use any way this instence
*/

const bucket = admin.storage().bucket();

//upload midleware 
const uploadFile = (req, res, next) =>{
    if(!req.file) return next();

    /* geting file name and rename it  */

    //first geting the file object

    const imagem = req.file;
    
    // second: rename it, with now date in mili seconds original name 
    const nomeArquivo = Date.now() + "." + imagem.originalname.split(".").pop();

    /* Storage de file on Fire base Storage */

    //colocando o nome do arquivo no bucket

    const file = bucket.file(nomeArquivo);

    const stream = file.createWriteStream({
        //informando o tipo de arquivo que vai ir pro fire base
        metadata:{
            contentType: imagem.mimetype,
        },
    });

    /* tratamentos listners */

    stream.on("error" , (err) =>{
        console.error(e);
    });

    stream.on("finish", async () => {
        // tornar arquivo publico 
          await file.makePublic();
        //obter url publica
        //criando outro atributo na requisição req.file
        req.file.firebaseUrl = `https://storage.googleapis.com/${BUCKET}/${nomeArquivo}`;

        next();
    });

    /* stream send */

    stream.end(imagem.buffer);

};

module.exports = uploadFile;
