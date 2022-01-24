const refranes = [
    "AL QUE MADRUGA DIOS LO AYUDA",
    "A CABALLO REGALADO NO SE LE MIRA EL DIENTE",
    "CAMARON QUE SE DUERME SE LO LLEVA LA CORRIENTE",
    "DONDE HUBO FUEGO CENIZAS QUEDAN"
]

let refran;
let refranOculto;
let numeroIntentoErrado = 0;
let enEjecucion = true;

const elegirRefran = () => {
    const pos = Math.round(Math.random() * (refranes.length - 1))
    return refranes[pos]
}

const ocultarRefran = (refran) => {
    let refranOcultado = "";
    for (let caracter of refran)  {
        if (caracter != " ") {
            // Debemos ocultar el caracter
            refranOcultado += "_"
        }else {
            // No debemos ocultar
            refranOcultado += caracter
        }
    }
    return refranOcultado
}

const cargarRefran = (refranOculto) => {
    const divRefran = document.getElementById("zona_refran")
    divRefran.innerText = refranOculto
}

const buscarLetraEnRefran = (letra, refran, refranOculto) => {
    let nuevoRefranOculto = ""
    for (let i=0; i < refran.length; i++) {
        if (refran[i] == letra) {
            nuevoRefranOculto += letra
        }else {
            nuevoRefranOculto += refranOculto[i]
        }
    }
    return nuevoRefranOculto
}

const cargarImagenNueva = (numero) => {
    //const rutaImagen = "/images/Hangman-" + numero + ".png"
    const rutaImagen = `/images/Hangman-${numero}.png`
    document.getElementById("imagen").setAttribute("src", rutaImagen)
}

const cargarMensajeFin = (gano) => {
    if (gano) {
        // CArgar el div verde
        const div = document.getElementById("mensaje_ganador")
        div.setAttribute("class", "alert alert-success")
    } else {
        // Cargar el div rojo
        const div = document.getElementById("mensaje_perdedor")
        div.setAttribute("class", "alert alert-danger")
    }
}

const letraInputOnKeyPress = (event) => {

    if (enEjecucion) {
        const letra = event.key.toUpperCase()
        const nuevoRefranOculto = buscarLetraEnRefran(letra, refran, refranOculto)
        
        if (nuevoRefranOculto == refranOculto) {
            // No ha habido cambios, hay un error del jugador
            numeroIntentoErrado++
            if (numeroIntentoErrado < 7) {
                cargarImagenNueva(numeroIntentoErrado)
            }else {
                // Termino el juego y perdio el jugador
                enEjecucion = false
                cargarMensajeFin(false)
            }
            
        }else {
            // No ha habido error
            if (nuevoRefranOculto == refran) {
                // Gano
                enEjecucion = false
                cargarMensajeFin(true)
            }
        }
        refranOculto = nuevoRefranOculto
        cargarRefran(refranOculto)
    }

}

const main = () => {
    //1. Elegir un refran de forma aleatoria
    refran = elegirRefran();
    //2. Ocultar refran y mostrarlo
    refranOculto = ocultarRefran(refran)
    cargarRefran(refranOculto)

    //3. Configurar el evento keypress
    document.getElementById("txt_letras_ingresadas").addEventListener("keypress", letraInputOnKeyPress)
}

window.addEventListener("load", main)