Algoritmo Ejercicio3
	Definir number como Entero
	Dimension arregloNumeros[10]
	contadorPar <- 0
	contadorImpar <- 0
	i <- 1
	
	Para i = 1 Hasta 10
		Escribir 'Ingrese el numero para agregar en la posicion: ', i
		Leer number
		arregloNumeros[i] <- number
	FinPara
	
	Mientras i <= 10
		resto <-	arregloNumeros[i] % 2
		Si resto = 0 Entonces
			contadorPar <- contadorPar +1
		SiNo
			contadorImpar <- contadorImpar +1
		FinSi	
		i = i + 1
	FinMientras
	
	Escribir  'Cantidad impares: ', contadorImpar
	Escribir  'Cantidad pares: ', contadorPar
FinAlgoritmo
