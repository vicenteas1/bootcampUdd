Algoritmo Lab1
	Definir precio				Como Entero
	Definir aplicarDescuento	Como Entero
	Definir porcentajeDescuento	Como Entero
	Definir precioDescuento		Como Entero
	Definir costoEnvio			Como Entero
	Definir tarifaEnvio			Como Entero
	Definir cantidadProductos	Como Entero	

	Definir precioIva			Como Real
	Definir sumaPrecios			Como Real
	Definir sumaPeso			Como Real
	Definir peso				Como Real
	Definir precioPorPagar		Como Real
	
	Escribir "Cuantos productos desea ingresar"
	Leer cantidadProductos
	
	Dimension arregloProductos[cantidadProductos]
	
	Para i<-1 Hasta cantidadProductos Hacer
		Escribir "Producto: ", i, ". Ingresar precio."
		Leer precio
		
		Escribir "Producto: ", i, ". Ingresar peso (Kg)."
		Leer peso
		
		Repetir
			Escribir "¿Se debe aplicar algún descuento?"
			Escribir "Escribir 1. Aplicar descuento"
			Escribir "Escribir 2. No se debe aplicar descuento"
			Leer aplicarDescuento
		Hasta Que aplicarDescuento = 1 O aplicarDescuento = 2
		
		Si aplicarDescuento = 1 Entonces	
			Repetir
				Escribir "Ingrese el porcentaje de descuento a aplicar."
				Escribir "El descuento no puede ser menor a 0% ni mayor al 100%."
				Leer porcentajeDescuento
			Hasta Que porcentajeDescuento <= 100 Y porcentajeDescuento >= 0
		FinSi
		
		Escribir "Producto: ", i, ". Calculando precio..."
		precioDescuento <- precio - (precio*porcentajeDescuento/100)	
		
		Escribir "Aplicando IVA...."
		precioIva <- precioDescuento + (precioDescuento*0.12)
		
		Escribir "Producto: ", i, ". Precio con descuento e iva incluido: ", precioIva
		
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
			Escribir "Ingrese el porcentaje de descuento a aplicar."
			Escribir "El descuento no puede ser menor a 0% ni mayor al 100%."
			Leer porcentajeDescuento
		Hasta Que porcentajeDescuento <= 100 Y porcentajeDescuento >= 0		
	FinSi
	
	Escribir "Aplicando descuento por cantidad de productos..."
	sumaPrecios <- sumaPrecios - (sumaPrecios*porcentajeDescuento/100)	
	
	Escribir "Ingrese el costo de tarifa por ubicación de destino."
	Leer tarifaEnvio	
	
	Escribir "Calculando costo de envío según tarifa fija, peso del producto y tarifa por ubicación de destino...."
	costoEnvio <- 10 + (sumaPeso*tarifaEnvio)
	
	Escribir "Calculando precio final de el o los productos..."
	precioPorPagar <- sumaPrecios + costoEnvio
	
	Escribir "Monto total a pagar: ", precioPorPagar
FinAlgoritmo
