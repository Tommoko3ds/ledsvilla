const mysql = require('mysql2');

const conexion = mysql.createConnection({
    host:"mysql-keniaescamilla.alwaysdata.net",
    user:"345342_je",
    password:"1234561331",
    database:"keniaescamilla_arduino",

});

conexion.connect((error) => {
    if(error){
    console.error("error al conectarse con la BD",error);
}else{
    console.log("conexion exitosa a la BD");
}
});
module.exports = conexion;