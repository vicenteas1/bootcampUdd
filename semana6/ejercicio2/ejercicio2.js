// Factory function
function manejoTienda(productosIniciales = []){

    const inventario = Array.isArray(productosIniciales)
    ? productosIniciales.filter(
        (p) =>
          typeof p.nombre === 'string' &&
          typeof p.precio === 'number' &&
          typeof p.cantidad === 'number'
      )
    : [];
  

    return {
        inventario, 
        
        agregarProducto(producto){
            if(
                typeof producto             !== 'object' 
                || typeof producto.nombre   !== 'string'
                || typeof producto.precio   !== 'number' 
                || typeof producto.cantidad !== 'number'
                || !producto.nombre 
            ){
                const msg = 'Error al agregar producto.'
                return msg
            }

            const existente = this.inventario.find(p => p.nombre === producto.nombre);
            if(existente){
                existente.cantidad  += producto.cantidad;
                existente.precio    = producto.precio;
                console.log(`Producto actualizado: ${producto.nombre}, cantidad: ${existente.cantidad}, valor unitario: ${producto.precio}`);
            } else {
                this.inventario.push(producto);
                console.log(`Producto agregado: ${producto.nombre}, cantidad: ${producto.cantidad}, valor unitario: ${producto.precio}`);
            }
        },

        eliminarProducto(nombre){
            const index  = this.inventario.findIndex(p => p.nombre === nombre);
            
            if (index === -1) {
                console.log('Producto no encontrado');
                return;
            }

            const producto = this.inventario[index];
            producto.cantidad -= 1;

            if(producto.cantidad <= 0){
                this.inventario.splice(index, 1)
                console.log('Producto eliminado')
            } else {
                console.log(`Producto actualizado: ${producto.nombre}, cantidad: ${producto.cantidad}, valor unitario: ${producto.precio}`);
            }
        },

        calcularTotal() {
            const total = this.inventario.reduce((sum, p) => {
                return sum + (p.precio * p.cantidad);
            }, 0);
        
            console.log(`Total del inventario: $${total}`);
            return total;
        }        
    }
}