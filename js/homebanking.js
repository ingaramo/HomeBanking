//Declaración de variables
const nombreUsuario = "Giselle";
let saldoCuenta = 5000;
let limiteExtraccion = 4000;
let servicios = ['Agua', 'Telefono', 'Luz', 'Internet'];
let precios =[350, 425, 210, 570];
let cuentasAmigas = ['Cuenta amiga 1', 'Cuenta amiga 2'];
let numeroDeCuenta = [ 7654321, 1234567];
let pass =1234;

//Ejecución de las funciones que actualizan los valores de las variables en el HTML.
window.onload = function() {
    cargarNombreEnPantalla();
    actualizarSaldoEnPantalla();
    actualizarLimiteEnPantalla();
}

//Funciones que nuevas
//recibe un valor numerico y lo suma a saldoCuenta
function sumarDinero(mount){
    saldoCuenta += parseInt(mount);
}
function restarDinero(mount){
    saldoCuenta -= parseInt(mount);
}
//funciones para validar
//recibe un valor numerico y lo resta a saldoCuenta
function menorQueLimite(mount){
    if (mount <= limiteExtraccion){
        return true;
    }
    else{
        return false;
    }
}
//recibe un valor numerico y retorna true si es positivo
function esPositivo (mount) {
    return  (mount > 0)}
// recibe un valor numerico y retorna true si es menor que saldoCuenta
function menorQueSaldo(mount){
    if ( mount <= saldoCuenta) {
        return  true;
    }
    else{
        return false;
    }
} 
//recibe un valor numerico y retorna true si es multiplo de 100
function multiplo100(mount){
    if (mount % 100 === 0){
        return true;
    }
    else {
        return false;
    }
}
// Funciones que tenes que completar
//solicita el ingreso de un valor, valida el valor y modifica limiteExtraccion por el valor ingresado
function cambiarLimiteDeExtraccion() {
    let limiteNuevo = parseInt(prompt('Ingrese el nuevo limite de extraccion'))
    if (isNaN(limiteNuevo)||limiteNuevo === null){
        alert('Ingreso incorrecto')
    } else {
        limiteExtraccion = limiteNuevo;
        alert('Tu nuevo limite de extraccion es de: $' + limiteExtraccion);
    }
    actualizarLimiteEnPantalla()
}
//solicita el ingreso de un valor, valida el ingreso (que sea numero, que no sea null, menor limiteExtraccion, mayor que cero, menor que saldoCuenta, multiplo de 100,), resta a saldoCuenta el valor ingresado
function extraerDinero() {
    let aux = true;
    let mount;
    let toPrint='';
    while (aux===true){
        mount = parseInt(prompt ('Ingrese el monto a extraer'));
        let flag = true;
        if (isNaN(mount)){
            alert('Error en el ingreso, intente nuevamente');
            break;
        }
        else{
            aux = false;
        }
        
        if (menorQueLimite(mount)){
        }
        else {
            flag =flag && false; //flag &= true;
            toPrint += 'Supera su limite de extraccion \n';
        }
        if (esPositivo(mount) ){
        }
        else {
            toPrint += 'El monto a extraer es menor que 0 \n';
            flag = flag && false;
        }
        if(menorQueSaldo(mount)){
        }
        else {
            flag = flag && false;
            toPrint += 'El monto supera al saldo de su cuenta \n';
        }
        if (multiplo100(mount)) {
        }
        else {
            flag = flag && false;
            toPrint += 'El monto no es multiplo de 100 \n';
        }
        if (flag === true   ){
            let saldoAnterior = saldoCuenta;
            restarDinero(mount);
            actualizarSaldoEnPantalla();
            toPrint = 'Has extraido: $' + mount + '\n' + 'Saldo anterior: $' + saldoAnterior + '\n' + 'Saldo actual: $' + saldoCuenta;
        }
        alert(toPrint); 
    }
    

}
//solicita el ingreso deun valor, lo valida p
function depositarDinero() {
    let mount = parseInt(prompt ('Ingrese el monto a depositar'));
    if (esPositivo(mount) ){
        let saldoAnterior = saldoCuenta;
        sumarDinero(mount);
        actualizarSaldoEnPantalla();
        alert('Has depositado: $' + mount + '\n' + 'Saldo anterior: $' + saldoAnterior + '\n' + 'Saldo actual: $' + saldoCuenta);
    } else if(isNaN(mount)){
        alert('El valor ingresado nos valido');
    }
    else {
        alert('Solo se puede depositar valores mayores que 0');
    }
}
//solicita el ingreso de un valor y lo valida, resta a saldoCuenta el valor del servicio a pagar
function pagarServicio() {
    let flag = true;
    while (flag === true){
        let option = parseInt(prompt('Ingrese:' + '\n' +'1 - Agua' + '\n' +'2 - Luz' + '\n' + '3 - Internet'  + '\n' + '4 - Telefono'   + '\n' + '5 - Salir' ));
        if (option === 5){
            alert('Operacion cancelada. Hasta luego');
            flag = false;
            break;
        }
        if (precios[option-1] === undefined || option === NaN){
            alert('El valor ingresado no corresponde, intentelo nuevamente');
            flag = true;
        }
        else {
            flag = false;
            let toPrint = '';
            if(menorQueSaldo(precios[option -1])){
                let saldoAnterior = saldoCuenta;
                saldoCuenta -= precios [option - 1]
                toPrint = 'Has pagado el servicio de '+ servicios[option - 1] + '\n' + 'Saldo anterior: $' + saldoAnterior + '\n' + 'Dinero descontado: $' + precios [option - 1] + '\n' + 'Saldo actual: $' + saldoCuenta;  
                actualizarSaldoEnPantalla();
            }
            else {
                toPrint = 'No posee los fondos suficientes para pagar este servicio';
            }
            alert (toPrint);
        }
    }
    
}
// Solicita el ingreso de un valor a transferir, lo valida (mebir qye saldo, NaN, Null, positivo, menor que saldo), resta a saldoCuenta el valor ingresado
function transferirDinero() {
    let toPrint = '';
    let mount = parseInt(prompt('Ingrese el monto a transferir'));
    if (isNaN(mount)|| mount === null){
        toPrint = 'El valor ingresado no es valido';
    }
    else if (!menorQueSaldo( mount)){
        toPrint = 'No se puede transferir, fondos insuficientes';
    }
    else if (!esPositivo(mount)){
        toPrint = 'Solo se puede transferir montos mayores a 0';
    }
    else{
        let cuenta =  parseInt(prompt('Ingrese la cuenta a transferir'));
        if(numeroDeCuenta.indexOf(cuenta) != -1){
            restarDinero(mount);
            toPrint = 'Se ha transferido: $' + mount + '\n' + 'Cuenta destino: ' + cuenta;               
        }
        else {
            toPrint = 'Solo puede transferirse a cuentas amigas';
        }
    }
    alert(toPrint);
    
    actualizarSaldoEnPantalla();

}
//valida contrasenia
function iniciarSesion() {
    let aux = parseInt(prompt('Ingrese la contrasenia'));
    let flag = true;
    let toPrint =  '';
    if (aux === pass){
        toPrint = 'Bienvenido/a ' + nombreUsuario + ' ya puedes comenzar a realizar operaciones';
    }
    else {
        restarDinero(saldoCuenta);
        toPrint = 'Codigo incorrecto. Tu dinero ha sido retenido por cuestiones de seguridad';
    }
    alert(toPrint);

}

//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
}

function actualizarSaldoEnPantalla() {
    document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
}

function actualizarLimiteEnPantalla() {
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}