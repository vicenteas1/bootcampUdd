Proceso Reto3
	Definir number como Entero
	Dimension numbersArray[10]
	cantidadPares <- 0
	sumaPares <- 0
	cantidadImpares <- 0
	sumaImpares <- 0
	i <- 1
	
	Para i <- 1 Hasta 10
		Escribir "Ingresa el número entero positivo menor a 1000 para la posicion ", i, " :"
		Leer numbersArray[i]
		
		Mientras numbersArray[i] <= 0 O numbersArray[i] > 1000
			Escribir "Ingresa un número valido entero para la posicion ", i ,". Debe ser mayor a 0 y menor o igual a 1000."
			Leer numbersArray[i]
		FinMientras
	FinPara

	Para i <- 1 Hasta 10 Con Paso 1
		Si numbersArray[i] MOD 2 = 0 Entonces
			sumaPares <- sumaPares + number
			sumaPares <- sumaPares + numbersArray[i]
			cantidadPares <- cantidadPares + 1
		Sino
			sumaImpares <- sumaImpares + number
			sumaImpares <- sumaImpares + numbersArray[i]
			cantidadImpares <- cantidadImpares + 1
		FinSi
	FinPara

	Escribir "Cantidad de números pares encontrados: ", cantidadPares, ". Suma total de todos los pares: ", sumaPares
	Escribir "Cantidad de números impares encontrados: ", cantidadImpares, ". Suma total de todos los impares: ", sumaImpares 
FinProceso