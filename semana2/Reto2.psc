Algoritmo Reto2
	Escribir ('Ingrese un numero entero') REAL
	Leer number
	
	Mientras number <= 1 Hacer
		Escribir ('Ingrese un numero entero') REAL
		Leer number
	Fin Mientras
	
	count <- 0
	factores <- ""
	Para i<-1 Hasta number Hacer
		SI number % i = 0 Entonces
			count <- count + 1
			Si lista = "" Entonces
				lista <- ConvertirATexto(i)
			SiNo
				lista <- lista + ", " + ConvertirATexto(i)
			FinSi
		FinSi
	Fin Para
	Si count = 2 Entonces
		Escribir "Es primo"
	SiNo
		Escribir "No es primo"
		Escribir "Factores: ", lista
	Fin Si
FinAlgoritmo
