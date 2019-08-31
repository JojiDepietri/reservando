var expect = chai.expect;

describe('Restaurant', () => {
    describe('reservarHorario(horario)', () => {
        it('Si se reserva un horario de un restaurant, el horario se debe eliminar del arreglo horarios.', () => {
            var nuevoRestaurant = new Restaurant();
            nuevoRestaurant.horarios = ["13:00", "15:30", "18:00"];
            nuevoRestaurant.reservarHorario('13:00');
            expect(nuevoRestaurant.horarios).to.eql(['15:30','18:00']);
        })

        it('Si se reserva un horario que el restaurant no posee, el arreglo se mantiene igual.', () => {
            var nuevoRestaurant = new Restaurant();
            nuevoRestaurant.horarios = ["13:00", "15:30", "18:00"];
            nuevoRestaurant.reservarHorario('14:00');
            expect(nuevoRestaurant.horarios).to.eql(["13:00",'15:30','18:00']);
        })

        it('Si se reserva un horario sin pasar parámetro a la función, el arreglo se mantiene igual.', () => {
            var nuevoRestaurant = new Restaurant();
            nuevoRestaurant.horarios = ["13:00", "15:30", "18:00"];
            nuevoRestaurant.reservarHorario();
            expect(nuevoRestaurant.horarios).to.eql(["13:00",'15:30','18:00']);
        })
    })

    describe('obtenerPuntacion()', () => {
        it('Si un restaurant tiene calificaciones, la puntuación se calcula correctamente como el promedio de ellas.', () => {
            var nuevoRestaurant = new Restaurant();
            nuevoRestaurant.calificaciones = [6, 7, 9, 10, 5];
            expect(nuevoRestaurant.obtenerPuntuacion()).to.equal(7.4);
        })

        it('Si un restaurant no tiene ninguna calificación, la puntuación es igual a 0.', () => {
            var nuevoRestaurant = new Restaurant();
            nuevoRestaurant.calificaciones = [];
            expect(nuevoRestaurant.obtenerPuntuacion()).to.equal(0);
        })
    })

    describe('calificar()', () => {
        it('Si la nueva calificación es válida, debe agregarse al arreglo calificaciones.', () => {
            var nuevoRestaurant = new Restaurant();
            nuevoRestaurant.calificaciones = [6, 7, 9, 10, 5];
            nuevoRestaurant.calificar(7);
            expect(nuevoRestaurant.calificaciones).to.eql([6, 7, 9, 10, 5, 7]);
        })

        it('Si la nueva calificación es menor a 0, no debe agregarse al arreglo calificaciones.', () => {
            var nuevoRestaurant = new Restaurant();
            nuevoRestaurant.calificaciones = [6, 7, 9, 10, 5];
            nuevoRestaurant.calificar(-1);
            expect(nuevoRestaurant.calificaciones).to.eql([6, 7, 9, 10, 5]);
        })

        it('Si la nueva calificación es mayor a 10, no debe agregarse al arreglo calificaciones.', () => {
            var nuevoRestaurant = new Restaurant();
            nuevoRestaurant.calificaciones = [6, 7, 9, 10, 5];
            nuevoRestaurant.calificar(11);
            expect(nuevoRestaurant.calificaciones).to.eql([6, 7, 9, 10, 5]);
        })

        it('Si la nueva calificación no es un número entero, no debe agregarse al arreglo calificaciones.', () => {
            var nuevoRestaurant = new Restaurant();
            nuevoRestaurant.calificaciones = [6, 7, 9, 10, 5];
            nuevoRestaurant.calificar(4.5);
            expect(nuevoRestaurant.calificaciones).to.eql([6, 7, 9, 10, 5]);
        })

    })

})

describe('Listado', () => {
    describe('buscarRestaurante(id)', () => {
        it('Si existe el número de id del restaurant buscado, se debe regresar el restaurant buscado.', () => {
           var nuevaListaDeRestaurantes = [
                new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]),
                new Restaurant(2, "Mandarín Kitchen", "Asiática", "Londres", ["15:00", "14:30", "12:30"], "../img/asiatica2.jpg", [7, 7, 3, 9, 7]),
                new Restaurant(3, "Burgermeister", "Hamburguesa", "Berlín", ["11:30", "12:00", "22:30"], "../img/hamburguesa4.jpg", [5, 8, 4, 9, 9])
           ];
           var nuevoListado = new Listado(nuevaListaDeRestaurantes);
           expect(nuevoListado.buscarRestaurante(1)).to.equal(nuevaListaDeRestaurantes[0]);
        })

        it('Si no existe el número de id del restaurant buscado, se debe mostrar un alerta ', () => {
            var nuevaListaDeRestaurantes = [
                new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]),
                new Restaurant(2, "Mandarín Kitchen", "Asiática", "Londres", ["15:00", "14:30", "12:30"], "../img/asiatica2.jpg", [7, 7, 3, 9, 7]),
                new Restaurant(3, "Burgermeister", "Hamburguesa", "Berlín", ["11:30", "12:00", "22:30"], "../img/hamburguesa4.jpg", [5, 8, 4, 9, 9])
            ];
            var nuevoListado = new Listado(nuevaListaDeRestaurantes);
            expect(nuevoListado.buscarRestaurante(5)).to.equal('No se ha encontrado ningún restaurant');
        })

        it('Si no se ingresa un id como parámetro, se debe mostrar un alerta.', () => {
            var nuevaListaDeRestaurantes = [
                new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]),
                new Restaurant(2, "Mandarín Kitchen", "Asiática", "Londres", ["15:00", "14:30", "12:30"], "../img/asiatica2.jpg", [7, 7, 3, 9, 7]),
                new Restaurant(3, "Burgermeister", "Hamburguesa", "Berlín", ["11:30", "12:00", "22:30"], "../img/hamburguesa4.jpg", [5, 8, 4, 9, 9])
            ];
            var nuevoListado = new Listado(nuevaListaDeRestaurantes);
            expect(nuevoListado.buscarRestaurante()).to.equal('No se ha encontrado ningún restaurant');
        })
    })

    describe('obtenerRestaurantes()', () => {
        it('Si se filtra por Rubro, se debe crear un nuevo Array solo con los restaurants de ese Rubro', () => {
            var nuevaListaDeRestaurantes = [
                new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]),
                new Restaurant(2, "Mandarín Kitchen", "Asiática", "Londres", ["15:00", "14:30", "12:30"], "../img/asiatica2.jpg", [7, 7, 3, 9, 7]),
                new Restaurant(3, "Burgermeister", "Hamburguesa", "Berlín", ["11:30", "12:00", "22:30"], "../img/hamburguesa4.jpg", [5, 8, 4, 9, 9])
            ];
            var nuevoListado = new Listado(nuevaListaDeRestaurantes);
            var restaurentesPorRubro = nuevoListado.obtenerRestaurantes('Asiática', null, null);
            expect(restaurentesPorRubro.length).to.equal(2);
        })

        it('Si se filtra por Ciudad, se debe crear un nuevo Array solo con los restaurants de esa Ciudad', () => {
            var nuevaListaDeRestaurantes = [
                new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]),
                new Restaurant(2, "Mandarín Kitchen", "Asiática", "Nueva York", ["15:00", "14:30", "12:30"], "../img/asiatica2.jpg", [7, 7, 3, 9, 7]),
                new Restaurant(3, "Burgermeister", "Hamburguesa", "Nueva York", ["11:30", "12:00", "22:30"], "../img/hamburguesa4.jpg", [5, 8, 4, 9, 9])
            ];
            var nuevoListado = new Listado(nuevaListaDeRestaurantes);
            var restaurentesPorCiudad = nuevoListado.obtenerRestaurantes(null, 'Nueva York', null);
            expect(restaurentesPorCiudad.length).to.equal(3);
        })

        it('Si se filtra por Horario, se debe crear un nuevo Array solo con los restaurants que se pueden reservar en ese horario', () => {
            var nuevaListaDeRestaurantes = [
                new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]),
                new Restaurant(2, "Mandarín Kitchen", "Asiática", "Londres", ["15:00", "14:30", "12:30"], "../img/asiatica2.jpg", [7, 7, 3, 9, 7]),
                new Restaurant(3, "Burgermeister", "Hamburguesa", "Berlin", ["11:30", "12:00", "22:30"], "../img/hamburguesa4.jpg", [5, 8, 4, 9, 9])
            ];
            var nuevoListado = new Listado(nuevaListaDeRestaurantes);
            var restaurentesPorHorario = nuevoListado.obtenerRestaurantes(null, null, '13:00');
            expect(restaurentesPorHorario.length).to.equal(1);
        })

        it('Si se filtra por Rubro, Ciudad y Horario, se debe crear un nuevo Array solo con los restaurants que cumplan con los 3 requisitos', () => {
            var nuevaListaDeRestaurantes = [
                new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]),
                new Restaurant(2, "Mandarín Kitchen", "Asiática", "Londres", ["15:00", "14:30", "12:30"], "../img/asiatica2.jpg", [7, 7, 3, 9, 7]),
                new Restaurant(3, "Burgermeister", "Hamburguesa", "Berlin", ["11:30", "12:00", "22:30"], "../img/hamburguesa4.jpg", [5, 8, 4, 9, 9])
            ];
            var nuevoListado = new Listado(nuevaListaDeRestaurantes);
            var restaurentesFiltrado = nuevoListado.obtenerRestaurantes('Hamburguesa', 'Berlin', '12:00');
            expect(restaurentesFiltrado.length).to.equal(1);
        })

        it('Si no se ingresa ningún filtro como parámetro, no se genera un nuevo array filtrado, sino que será igual al array restaurantes', () => {
            var nuevaListaDeRestaurantes = [
                new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]),
                new Restaurant(2, "Mandarín Kitchen", "Asiática", "Londres", ["15:00", "14:30", "12:30"], "../img/asiatica2.jpg", [7, 7, 3, 9, 7]),
                new Restaurant(3, "Burgermeister", "Hamburguesa", "Berlin", ["11:30", "12:00", "22:30"], "../img/hamburguesa4.jpg", [5, 8, 4, 9, 9])
            ];
            var nuevoListado = new Listado(nuevaListaDeRestaurantes);
            var restaurentesFiltrado = nuevoListado.obtenerRestaurantes(null, null, null);
            expect(restaurentesFiltrado).to.eql(nuevoListado.restaurantes);
        })

        it('Si se ingresan parámetros que no coinciden con las propiedades Rubro, Ciudad u Horario, el array filtrado quedará vacío', () => {
            var nuevaListaDeRestaurantes = [
                new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]),
                new Restaurant(2, "Mandarín Kitchen", "Asiática", "Londres", ["15:00", "14:30", "12:30"], "../img/asiatica2.jpg", [7, 7, 3, 9, 7]),
                new Restaurant(3, "Burgermeister", "Hamburguesa", "Berlin", ["11:30", "12:00", "22:30"], "../img/hamburguesa4.jpg", [5, 8, 4, 9, 9])
            ];
            var nuevoListado = new Listado(nuevaListaDeRestaurantes);
            var restaurentesFiltrado = nuevoListado.obtenerRestaurantes('Tacos', 'La Lupita', '04:00');
            expect(restaurentesFiltrado.length).to.equal(0);
        })

    })

})

describe('Reserva', () => {
    describe('calcularPrecioBase()', () => {
        it('La funcion debe calcular correctamente el precio base de la reserva', () => {
            var nuevaReserva = new Reserva(new Date(2018, 7, 24, 11, 00), 8, 350, "DES1");
            var testPrecioBase = nuevaReserva.calcularPrecioBase();
            expect(testPrecioBase).to.equal(2800);
        })
    })

    describe('calcularPrecioFinal()', () => {
        it('La funcion debe calcular correctamente el precio total de la reserva', () => {
            var nuevaReserva = new Reserva(new Date(2018, 7, 27, 14, 100), 2, 150, "DES200");
            var testPrecioTotal = nuevaReserva.calcularPrecioTotal();
            expect(testPrecioTotal).to.equal(100);
        })
    })
})
