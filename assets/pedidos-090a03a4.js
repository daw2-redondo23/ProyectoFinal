import { s as supabase } from "./main-03a41ac2.js";
class Pedidos {
  //Mapping de las propiedades de la tabla pedidos
  constructor(id = null, numeroPedido = null, created_at = null, id_coche = null, id_perfil = null, precio = null) {
    this.id = id;
    this.numeroPedido = numeroPedido;
    this.created_at = created_at;
    this.id_coche = id_coche;
    this.id_perfil = id_perfil;
    this.precio = precio;
  }
  static async getAll() {
    let { data: pedido, error } = await supabase.from("pedidos").select("*").order("created_at", { ascending: false });
    if (error) {
      throw new Error(error.message);
    }
    return pedido.map(({ id, numeroPedido, created_at, id_coche, id_perfil, precio }) => {
      return new Pedidos(id, numeroPedido, created_at, id_coche, id_perfil, precio);
    });
  }
  static async getById(id) {
    let { data: pedido, error } = await supabase.from("pedidos").select("*").eq("id", id).single();
    if (error) {
      throw new Error(error.message);
    }
    return new Pedidos(pedido.id, pedido.numeroPedido, pedido.created_at, pedido.id_coche, pedido.id_perfil, pedido.precio);
  }
  static async getAllByPerfilId(id) {
    let { data: pedido, error } = await supabase.from("pedidos").select("*").eq("id_perfil", id).order("created_at", { ascending: true });
    if (error) {
      throw new Error(error.message);
    }
    return pedido.map(({ id: id2, numeroPedido, created_at, id_coche, id_perfil, precio }) => {
      return new Pedidos(id2, numeroPedido, created_at, id_coche, id_perfil, precio);
    });
  }
  //funcion para crear un pedido
  static async crear(pedidoObjeto) {
    const { data, error } = await supabase.from("pedidos").insert(pedidoObjeto).select();
    if (error) {
      throw new Error(error.message);
    }
    return true;
  }
  static async borrar(id) {
    const { error } = await supabase.from("pedidos").delete().eq("id", id);
    if (error) {
      throw new Error(error.message);
    }
    return true;
  }
}
export {
  Pedidos as P
};
