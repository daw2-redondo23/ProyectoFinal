import { supabase } from "./supabase";

export class Pedidos {
    //Mapping de las propiedades de la tabla pedidos
    constructor (id = null, created_at = null, id_coche = null, nombre = null, id_perfil = null){
        this.id = id
        this.created_at = created_at
        this.id_coche = id_coche
        this.nombre = nombre
        this.id_perfil = id_perfil
    }

    static async getAll(){
        let { data: pedido, error } = await supabase
        .from('pedidos')
        .select('*')    
        .order('created_at', { ascending: false })
        if(error){
            throw new Error(error.message)
        }
        //devuelvo los valores de la tabla pedidos
        return pedido.map(({id, created_at, id_coche, nombre, id_perfil}) => {
            return new Pedidos(id, created_at, id_coche, nombre, id_perfil)
        })
    }

    static async getById(id) {
       
        let { data: pedido, error } = await supabase
            .from('pedidos')
            .select('*')
            .eq('id', id)
            .single()
        if(error) {
            throw new Error(error.message)
        }
        //devuelvo los valores de la tabla pedido con el id que le paso
            return new Pedidos(pedido.id, pedido.created_at, pedido.id_coche, pedido.nombre, pedido.id_perfil)
    }

    //funcion para crear un pedido
    static async crear(pedidoObjeto){
        const { data, error } = await supabase
            .from('pedidos')
            .insert(pedidoObjeto)
            .select()

        if(error){
            throw new Error(error.message)
        }
        return true
    }

    static async borrar(id){
        const { error } = await supabase
        .from('pedidos')
        .delete()
        .eq('id', id)
  
      if (error) {
        throw new Error(error.message)
      }
      return true
    }
}