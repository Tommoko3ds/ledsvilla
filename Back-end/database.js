const mysql = require('mysql2');

const conexion = mysql.createConnection({host:"localhost",
    user:"root",
    password:"",
    database:"sm52_arduino",

});

conexion.connect((error) => {
    if(error){
    console.error("error askdjaksad",error);
}else{
    console.log("conexcion sisisisi");
}
});
module.exports = conexion;