const expect = chai.expect;

describe('Restaurant', () => {
    describe('reservarHorario(horario)', () => {
        it('Cuando se reserva un horario de un restaurant, el horario correspondiente se elimina del arreglo.', () => {
            const nuevoRestaurant = new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]);
            nuevoRestaurant.reservarHorario('13:00');
            expect(nuevoRestaurant.horarios).to.eql(['15:30','18:00']);
        })

        it('Cuando se reserva un horario que el restaurant no posee, el arreglo se mantiene igual.', () => {
            const nuevoRestaurant = new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]);
            nuevoRestaurant.reservarHorario('14:00');
            expect(nuevoRestaurant.horarios).to.eql(["13:00",'15:30','18:00']);
        })

        it('Cuando se intenta reservar un horario pero no se le pasa ningún parámetro a la función, el arreglo se mantiene igual.', () => {
            const nuevoRestaurant = new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]);
            nuevoRestaurant.reservarHorario();
            expect(nuevoRestaurant.horarios).to.eql(["13:00",'15:30','18:00']);
        })
    })

    describe('obtenerPuntacion()', () => {
        it('Dado un restaurant con determinadas calificaciones, la puntuación (que es el promedio de ellas) se calcula correctamente.', () => {
            const nuevoRestaurant = new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]);
            expect(nuevoRestaurant.obtenerPuntuacion()).to.equal(7.4);
        })

        it('Dado un restaurant que no tiene ninguna calificación, la puntuación es igual a 0.', () => {
            const nuevoRestaurant = new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", []);
            expect(nuevoRestaurant.obtenerPuntuacion()).to.equal(0);
        })
    })

    describe('calificar()', () => {
        it('Al agregar una nueva calificación válida, la misma debe agregarse al arreglo calificaciones.', () => {
            const nuevoRestaurant = new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]);
            nuevoRestaurant.calificar(7);
            expect(nuevoRestaurant.calificaciones).to.eql([6, 7, 9, 10, 5, 7]);
        })

        it('Si la nueva calificación es menor a 0 no debe agregarse al arreglo calificaciones.', () => {
            const nuevoRestaurant = new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]);
            nuevoRestaurant.calificar(-1);
            expect(nuevoRestaurant.calificaciones).to.eql([6, 7, 9, 10, 5]);
        })

        it('Si la nueva calificación es mayor a 10 no debe agregarse al arreglo calificaciones.', () => {
            const nuevoRestaurant = new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]);
            nuevoRestaurant.calificar(11);
            expect(nuevoRestaurant.calificaciones).to.eql([6, 7, 9, 10, 5]);
        })

        it('Si la nueva calificación no es un número entero no debe agregarse al arreglo calificaciones.', () => {
            const nuevoRestaurant = new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]);
            nuevoRestaurant.calificar(4.5);
            expect(nuevoRestaurant.calificaciones).to.eql([6, 7, 9, 10, 5]);
        })

    })

})

describe('Listado', () => {
    describe('buscarRestaurante(id)', () => {
        it('Se debe regresar el restaurant buscado si existe el número de id.', () => {
           const restaurantBuscado = listado.buscarRestaurante(1);
           const restaurantIdUno = listado.restaurantes[0];
           expect(restaurantBuscado).to.equal(restaurantIdUno);

        })
    
        it('Se debe mostrar un alerta si no existe el número de id del restaurant buscado.', () => {
            const restaurantBuscado = listado.buscarRestaurante(30);
            expect(restaurantBuscado).to.equal('No se ha encontrado ningún restaurant');
        })

        it('Se debe mostrar un alerta si no se ingresa un id como parámetro.', () => {
            const restaurantBuscado = listado.buscarRestaurante(0);
            expect(restaurantBuscado).to.equal('No se ha encontrado ningún restaurant');
        })
    })

    describe('obtenerRestaurantes()', () => {
        it('Si se filtra por Rubro se deberá crear un nuevo Array solo con los restaurants de ese Rubro', () => {
            const restaurantObtenido = listado.obtenerRestaurantes('Pasta', null, null);
            expect(restaurantObtenido.lenght).to.eql(5);
           

        })

        it('Si se filtra por Ciudad se deberá crear un nuevo Array solo con los restaurants de esa Ciudad', () => {
           
        })

        it('Si se filtra por Horario se deberá crear un nuevo Array solo con los restaurants que se pueden reservar en ese horario', () => {
           
        })

        it('Si se filtra por Rubro, Ciudad y Horario se deberá crear un nuevo Array solo con los restaurants que cumplan con los 3 requisitos', () => {
           
        })

        it('Si no se ingresa ningún filtro como parámetro no se genera un nuevo array filtrado', () => {
           
        })

        it('Si se ingresan parámetros que no coinciden con las propiedades Rubro, Ciudad u Horario no se genera un nuevo array filtrado', () => {
           
        })
    
    })

})