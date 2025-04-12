/**
 * Generacion Calculadora
 * Bootcamp UDD
 * 
 * Creacion: VICENTE SAAVEDRA
 *  */

export class Category {
    static categories = [
        {
            category: "Por debajo del peso normal",
            range: {
                minimun: 0,
                maximun: 18.5
            }
        },
        {
            category: "Peso normal",
            range: {
                minimun: 18.5,
                maximun: 24.9
            }
        },
        {
            category: "Sobrepeso",
            range: {
                minimun: 25.0,
                maximun: 29.9
            }
        },
        {
            category: "Obesidad grado 1",
            range: {
                minimun: 30,
                maximun: 34.9
            }
        },
        {
            category: "Obesidad grado 2",
            range: {
                minimun: 35,
                maximun: 39.9
            }
        },
        {
            category: "Obesidad grado 3",
            range: {
                minimun: 40,
                maximun: 100
            }
        }
    ]
}

export default Category;