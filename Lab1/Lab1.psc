Algoritmo Lab1
	Definir precio					Como Entero
	Definir aplicarDescuento 		Como Entero
	Definir porcentajeDescuento 	Como Entero
	Definir precioDescuento 		Como Entero
	Definir costoEnvio 			Como Entero
	Definir tarifaEnvio 			Como Entero
	Definir cantidadProductos 		Como Entero	

	Definir precioIva 				Como Real
	Definir sumaPrecios 			Como Real
	Definir sumaPeso 				Como Real
	Definir peso 					Como Real
	Definir precioPorPagar			Como Real
	
	Escribir "Cuantos productos desea ingresar"
	Leer cantidadProductos
	
	Dimension arregloProductos[cantidadProductos]
	
	Para i<-1 Hasta cantidadProductos Hacer
		Escribir "Ingrese el precio de su producto ", i
		Leer precio
		
		Escribir "Ingrese el peso de su producto en Kg ", i
		Leer peso
		
		Repetir
			Escribir "¿Se debe aplicar algún descuento?"
			Escribir "Escribir 1 si se debe aplicar algun descuento"
			Escribir "Escribir 2 si no se debe aplicar algun descuento"
			Leer aplicarDescuento
		Hasta Que aplicarDescuento = 1 O aplicarDescuento = 2
		
		Si aplicarDescuento = 1 Entonces	
			Repetir
				Escribir "Ingrese el porcentaje de descuento a aplicar. El descuento no puede ser menor a 0% ni mayor al 100%."
				Leer porcentajeDescuento
			Hasta Que porcentajeDescuento <= 100 Y porcentajeDescuento >= 0
		FinSi
		
		Escribir "Calculando precio para producto: ", i
		precioDescuento <- precio - (precio*porcentajeDescuento/100)	
		
		Escribir "Aplicando IVA...."
		precioIva <- precioDescuento + (precioDescuento*0.12)
		
		Escribir "Precio producto ", i ". ", precioIva
		arregloProductos[i] <- precioIva
		sumaPrecios <- sumaPrecios + precioIva
		sumaPeso <- sumaPeso + peso
	Fin Para
	
	Repetir
		Escribir "¿Se debe aplicar algun descuento por cantidad de productos?"
		Escribir "Escribir 1. Aplicar descuento"
		Escribir "Escribir 2. No se debe aplicar descuento"
		Leer aplicarDescuento
	Hasta Que aplicarDescuento = 1 O aplicarDescuento = 2
	
	Si aplicarDescuento = 1 Entonces	
		Repetir
			Escribir "Ingrese el porcentaje de descuento a aplicar. El descuento no puede ser mayor al 100% del precio del producto ni menor a 0%."
			Leer porcentajeDescuento
		Hasta Que porcentajeDescuento <= 100 Y porcentajeDescuento >= 0		
	FinSi
	
	Escribir "Aplicando descuento por cantidad de productos"
	sumaPrecios <- sumaPrecios - (sumaPrecios*porcentajeDescuento/100)	
	
	Escribir "Ingrese el costo de tarifa por ubicación de destino."
	Leer tarifaEnvio	
	
	Escribir "Calculando costo de envío según tarifa fija, peso del producto y tarifa por ubicación de destino...."
	costoEnvio <- 10 + (sumaPeso*tarifaEnvio)
	
	Escribir "Calculando precio final de el o los productos..."
	precioPorPagar <- sumaPrecios + costoEnvio
	
	Escribir "Se deben pagar: $", precioPorPagar
FinAlgoritmo
