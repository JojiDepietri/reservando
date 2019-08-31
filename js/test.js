const expect = chai.expect;

describe('Restaurant', () => {
    describe('reservarHorario(horario)', () => {
        it('Si se reserva un horario de un restaurant, el horario se debe eliminar del arreglo horarios.', () => {
            const nuevoRestaurant = new Restaurant();
            nuevoRestaurant.horarios = ["13:00", "15:30", "18:00"];
            nuevoRestaurant.reservarHorario('13:00');
            expect(nuevoRestaurant.horarios).to.eql(['15:30','18:00']);
        })

        it('Si se reserva un horario que el restaurant no posee, el arreglo se mantiene igual.', () => {
            const nuevoRestaurant = new Restaurant();
            nuevoRestaurant.horarios = ["13:00", "15:30", "18:00"];
            nuevoRestaurant.reservarHorario('14:00');
            expect(nuevoRestaurant.horarios).to.eql(["13:00",'15:30','18:00']);
        })

        it('Si se reserva un horario sin pasar parámetro a la función, el arreglo se mantiene igual.', () => {
            const nuevoRestaurant = new Restaurant();
            nuevoRestaurant.horarios = ["13:00", "15:30", "18:00"];
            nuevoRestaurant.reservarHorario();
            expect(nuevoRestaurant.horarios).to.eql(["13:00",'15:30','18:00']);
        })
    })

    describe('obtenerPuntacion()', () => {
        it('Si un restaurant tiene calificaciones, la puntuación se calcula correctamente como el promedio de ellas.', () => {
            const nuevoRestaurant = new Restaurant();
            nuevoRestaurant.calificaciones = [6, 7, 9, 10, 5];
            expect(nuevoRestaurant.obtenerPuntuacion()).to.equal(7.4);
        })

        it('Si un restaurant no tiene ninguna calificación, la puntuación es igual a 0.', () => {
            const nuevoRestaurant = new Restaurant();
            nuevoRestaurant.calificaciones = [];
            expect(nuevoRestaurant.obtenerPuntuacion()).to.equal(0);
        })
    })

    describe('calificar()', () => {
        it('Si la nueva calificación es válida, debe agregarse al arreglo calificaciones.', () => {
            const nuevoRestaurant = new Restaurant();
            nuevoRestaurant.calificaciones = [6, 7, 9, 10, 5];
            nuevoRestaurant.calificar(7);
            expect(nuevoRestaurant.calificaciones).to.eql([6, 7, 9, 10, 5, 7]);
        })

        it('Si la nueva calificación es menor a 0, no debe agregarse al arreglo calificaciones.', () => {
            const nuevoRestaurant = new Restaurant();
            nuevoRestaurant.calificaciones = [6, 7, 9, 10, 5];
            nuevoRestaurant.calificar(-1);
            expect(nuevoRestaurant.calificaciones).to.eql([6, 7, 9, 10, 5]);
        })

        it('Si la nueva calificación es mayor a 10, no debe agregarse al arreglo calificaciones.', () => {
            const nuevoRestaurant = new Restaurant();
            nuevoRestaurant.calificaciones = [6, 7, 9, 10, 5];
            nuevoRestaurant.calificar(11);
            expect(nuevoRestaurant.calificaciones).to.eql([6, 7, 9, 10, 5]);
        })

        it('Si la nueva calificación no es un número entero, no debe agregarse al arreglo calificaciones.', () => {
            const nuevoRestaurant = new Restaurant();
            nuevoRestaurant.calificaciones = [6, 7, 9, 10, 5];
            nuevoRestaurant.calificar(4.5);
            expect(nuevoRestaurant.calificaciones).to.eql([6, 7, 9, 10, 5]);
        })

    })

})

describe('Listado', () => {
    describe('buscarRestaurante(id)', () => {
        it('Si existe el número de id del restaurant buscado, se debe regresar el restaurant buscado.', () => {
           const restaurantBuscado = listado.buscarRestaurante(1);
           const restaurantIdUno = listado.restaurantes[0];
           expect(restaurantBuscado).to.equal(restaurantIdUno);

        })

        it('Si no existe el número de id del restaurant buscado, se debe mostrar un alerta ', () => {
            const restaurantBuscado = listado.buscarRestaurante(30);
            expect(restaurantBuscado).to.equal('No se ha encontrado ningún restaurant');
        })

        it('Si no se ingresa un id como parámetro, se debe mostrar un alerta.', () => {
            const restaurantBuscado = listado.buscarRestaurante(0);
            expect(restaurantBuscado).to.equal('No se ha encontrado ningún restaurant');
        })
    })

    describe('obtenerRestaurantes()', () => {
        it('Si se filtra por Rubro, se debe crear un nuevo Array solo con los restaurants de ese Rubro', () => {
            const nuevoListado = new Listado(listadoDeRestaurantes);
            const restaurentesPorRubro = nuevoListado.obtenerRestaurantes('Pizza', null, null);
            expect(restaurentesPorRubro.length).to.equal(4);
        })

        it('Si se filtra por Ciudad, se debe crear un nuevo Array solo con los restaurants de esa Ciudad', () => {
            const nuevoListado = new Listado(listadoDeRestaurantes);
            const restaurentesPorRubro = nuevoListado.obtenerRestaurantes(null,'París', null);
            expect(restaurentesPorRubro.length).to.equal(6);
        })

        it('Si se filtra por Horario, se debe crear un nuevo Array solo con los restaurants que se pueden reservar en ese horario', () => {
            const nuevoListado = new Listado(listadoDeRestaurantes);
            const restaurentesPorRubro = nuevoListado.obtenerRestaurantes(null, null, '20:30');
            expect(restaurentesPorRubro.length).to.equal(1);
        })

        it('Si se filtra por Rubro, Ciudad y Horario, se debe crear un nuevo Array solo con los restaurants que cumplan con los 3 requisitos', () => {
            const nuevoListado = new Listado(listadoDeRestaurantes);
            const restaurentesPorRubro = nuevoListado.obtenerRestaurantes('Pizza', 'París', '12:00');
            expect(restaurentesPorRubro.length).to.equal(1);
        })

        it('Si no se ingresa ningún filtro como parámetro, no se genera un nuevo array filtrado, sino que será igual al array restaurantes', () => {
            const nuevoListado = new Listado(listadoDeRestaurantes);
            const restaurentesPorRubro = nuevoListado.obtenerRestaurantes( null, null, null);
            expect(restaurentesPorRubro).to.eql(nuevoListado.restaurantes);
        })

        it('Si se ingresan parámetros que no coinciden con las propiedades Rubro, Ciudad u Horario, el array filtrado quedará vacío', () => {
            const nuevoListado = new Listado(listadoDeRestaurantes);
            const restaurentesPorRubro = nuevoListado.obtenerRestaurantes( 'Tacos', 'La Lupita', '04:00');
            expect(restaurentesPorRubro.length).to.equal(0);
        })

    })

})

describe('Reserva', () => {
    describe('calcularPrecioBase()', () => {
        it('La funcion debe calcular correctamente el precio base de la reserva', () => {
            const nuevaReserva = new Reserva(new Date(2018, 7, 24, 11, 00), 8, 350, "DES1");
            const testPrecioBase = nuevaReserva.calcularPrecioBase();
            expect(testPrecioBase).to.equal(2800);
        })
    })

    describe('calcularPrecioFinal()', () => {
        it('La funcion debe calcular correctamente el precio total de la reserva', () => {
            const nuevaReserva = new Reserva(new Date(2018, 7, 27, 14, 100), 2, 150, "DES200");
            const testPrecioTotal = nuevaReserva.calcularPrecioTotal();
            expect(testPrecioTotal).to.equal(100);
        })
    })
})
