export default interface Modelo {
    codigo: string;
    nombre: string;
    precioVenta: number;
    precioCompra?: number;
    stockActual: number;
    // Agrega aquí cualquier otra propiedad necesaria (ej. categoria, descripcion, imagen, etc.)
}
