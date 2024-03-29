var Restaurant = function(id, nombre, rubro, ubicacion, horarios, imagen, calificaciones) {
    this.id = id;
    this.nombre = nombre;
    this.rubro = rubro;
    this.ubicacion = ubicacion;
    this.horarios = horarios;
    this.imagen = imagen;
    this.calificaciones = calificaciones;
}

Restaurant.prototype.reservarHorario = function(horarioReservado) {
    var nuevosHorarios = this.horarios.filter((horario) => {return horario !== horarioReservado});
    this.horarios = nuevosHorarios;

            // for (var i = 0; i < this.horarios.length; i++) {
            //     if (this.horarios[i] === horarioReservado) {
            //         this.horarios.splice(i, 1);
            //         return;
            //     }
            // }
}

Restaurant.prototype.calificar = function(nuevaCalificacion) {
    if (Number.isInteger(nuevaCalificacion) && nuevaCalificacion > 0 && nuevaCalificacion < 10) {
        this.calificaciones.push(nuevaCalificacion);
    }
}


function promedio(numeros) {
    var sumatoria = sumatoria(numeros);
    var promedio = sumatoria / numeros.length;
    return Math.round(promedio * 10) / 10;
}


Restaurant.prototype.obtenerPuntuacion = function() {
    if (this.calificaciones.length === 0) {
        return 0;
    } else {
        return promedio(this.calificaciones);

            // var sumatoria = 0;
            // for (var i = 0; i < this.calificaciones.length; i++) {
            //     sumatoria += this.calificaciones[i]
            // }
            // var promedio = sumatoria / this.calificaciones.length;
            // return Math.round(promedio * 10) / 10;
    }

}

function sumatoria(numeros) {
    return numeros.reduce((total, numero) => {return total + numero});
}

function promedio(numeros) {
    var suma = sumatoria(numeros);
    var promedio = suma / numeros.length;
    return Math.round(promedio * 10) / 10;
}

