// Representación de la grilla. Cada nro representa a una pieza.
// El 9 es la posición vacía
var grilla = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

var grillaGanadora = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

// Ac&aacute; vamos a ir guardando la posición vacía
var posicionVacia = {
  fila:2,
  columna:2
};

// Esta función va a chequear si el Rompecabezas est&aacute; en la posición ganadora
function chequearSiGano(){
	   
  var veces = 0;
  for (var fila = 0 ; fila < 3 ; fila++) {
    for (var columna = 0; columna < 3; columna++) {
     if (grilla[fila][columna]==grillaGanadora[fila][columna]){
        veces++
     }
    }
  }
  if (veces==9) {
    return true
  } else {
    return false
  }
}




// la hacen los alumnos, pueden mostrar el cartel como prefieran. Pero es importante que usen
// esta función
function mostrarCartelGanador(){

  alert("¡Ganaste!")
}

// Intercambia posiciones grilla y en el DOM
function intercambiarPosiciones(fila1, columna1, fila2, columna2){

  var numero1 = grilla[fila1][columna1];
  var numero2 = grilla[fila2][columna2];
  grilla[fila1][columna1] = numero2
  grilla[fila2][columna2] = numero1

  var ficha1 = document.getElementById(numero1);
  var ficha2 = document.getElementById(numero2);
  var clonFicha1 = ficha1.cloneNode(true);
  var clonFicha2 = ficha2.cloneNode(true);

  var padre = ficha1.parentNode
  padre.replaceChild(clonFicha1, ficha2);
  padre.replaceChild(clonFicha2, ficha1);


}

// Actualiza la posición de la pieza vacía
function actualizarPosicionVacia(nuevaFila,nuevaColumna){
	posicionVacia.fila = nuevaFila;
	posicionVacia.columna = nuevaColumna;
}


// Para chequear si la posicón está dentro de la grilla.
function posicionValida(fila, columna){
	var cantidadTotalFilas = grilla.length;
	var cantidadTotalColumnas = grilla[0].length;
	
	if ( 2 >= fila && fila >= 0 && 2 >= columna && columna >= 0) {
		return true;
	   } else {
		return false;
	}
	
}

// Movimiento de fichas, en este caso la que se mueve es la blanca intercambiando
// su posición con otro elemento
function moverEnDireccion(direccion){

  var nuevaFilaPiezaVacia;
  var nuevaColumnaPiezaVacia;

  // Intercambia pieza blanca con la pieza que está arriba suyo
  if(direccion == 40){
    nuevaFilaPiezaVacia = posicionVacia.fila-1;
    nuevaColumnaPiezaVacia = posicionVacia.columna;
  }
  // Intercambia pieza blanca con la pieza que está abajo suyo
  else if (direccion == 38) {
    nuevaFilaPiezaVacia = posicionVacia.fila+1;
    nuevaColumnaPiezaVacia = posicionVacia.columna;

  }
  // Intercambia pieza blanca con la pieza que está a su izq
  else if (direccion == 39) {
    nuevaColumnaPiezaVacia = posicionVacia.columna-1;
	  nuevaFilaPiezaVacia = posicionVacia.fila;

  }
  // Intercambia pieza blanca con la pieza que está a su der
  else if (direccion == 37) {
    nuevaColumnaPiezaVacia = posicionVacia.columna+1;
	  nuevaFilaPiezaVacia = posicionVacia.fila;
  }

  // Se chequea si la nueva posición es válida, si lo es, se intercambia 
  if (posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia)){
    intercambiarPosiciones(posicionVacia.fila, posicionVacia.columna,
    nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
    actualizarPosicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
  }

}



// Extras, ya vienen dadas

function mezclarPiezas(veces){
  if(veces<=0){return;}
  var direcciones = [40, 38, 39, 37];
  var direccion = direcciones[Math.floor(Math.random()*direcciones.length)];
  moverEnDireccion(direccion);

  setTimeout(function(){
    mezclarPiezas(veces-1);
  },100);
}

function capturarTeclas(){
  document.body.onkeydown = (function(evento) {
    moverEnDireccion(evento.which);

    var gano = chequearSiGano();
    if(gano){
      setTimeout(function(){
        mostrarCartelGanador();  
      },500);
    } 
    evento.preventDefault();
  })
}

function iniciar(){
  mezclarPiezas(60);
  capturarTeclas();
}


iniciar();