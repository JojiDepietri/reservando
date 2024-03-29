var Reserva = function(horario, cantPersonas, precioXPersona, codigoDto) {
    this.horario = horario;
    this.cantPersonas = cantPersonas;
    this.precioXPersona = precioXPersona;
    this.codigoDto = codigoDto;
}

Reserva.prototype.calcularPrecioBase = function() {
    return this.cantPersonas * this.precioXPersona;
}

Reserva.prototype.calcularAdicionales = function() {
    var precioBase = this.calcularPrecioBase();
    var horaDeReserva = this.horario.getHours();
    var adicionalPorHora = 0;
    var diaDeReserva = this.horario.getDay();
    var adicionalPorDia = 0;

    if (horaDeReserva >= 13 && horaDeReserva <= 14 || horaDeReserva >= 20 && horaDeReserva <= 21) {
        adicionalPorHora = precioBase * 0.05;  
    }

    if(diaDeReserva === 5 || diaDeReserva === 6 || diaDeReserva === 0) {
        adicionalPorDia = precioBase * 0.1;
    }

    return adicionalPorHora + adicionalPorDia;
}

Reserva.prototype.calcularDescuentos = function() {
    var precioBase = this.calcularPrecioBase();
    var dtoPorGrupo = 0;
    var dtoPorCodigo = 0;

    if (this.cantPersonas >= 4 && this.cantPersonas <= 6) {
        dtoPorGrupo = precioBase * 0.05;
    } else if(this.cantPersonas === 7 || this.cantPersonas === 8) {
        dtoPorGrupo = precioBase * 0.1;
    } else if(this.cantPersonas > 8) {
        dtoPorGrupo = precioBase * 0.15;
    }

    if (this.codigoDto === 'DES15') {
        dtoPorCodigo = precioBase * 0.15;
    } else if(this.codigoDto === 'DES200') {
        dtoPorCodigo = 200;
    } else if(this.codigoDto === 'DES1') {
        dtoPorCodigo = this.precioXPersona;
    }

    return dtoPorGrupo + dtoPorCodigo;
}

Reserva.prototype.calcularPrecioTotal = function() {
    var precioBase = this.calcularPrecioBase();
    var adicionales = this.calcularAdicionales();
    var descuentos = this.calcularDescuentos();

    return precioBase + adicionales - descuentos;
}