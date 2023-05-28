import { supabase } from "./supabase";

export class Pedidos {
    //Mapping de las propiedades de la tabla pedidos
    constructor (id = null, numeroPedido = null, created_at = null, id_coche = null, id_perfil = null){
        this.id = id
        this.numeroPedido = numeroPedido
        this.created_at = created_at
        this.id_coche = id_coche
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
        return pedido.map(({id, numeroPedido, created_at, id_coche,  id_perfil}) => {
            return new Pedidos(id, numeroPedido, created_at, id_coche, id_perfil)
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
            return new Pedidos(pedido.id, pedido.numeroPedido, pedido.created_at, pedido.id_coche, pedido.id_perfil)
    }

    static async getAllByPerfilId(id) {
       
        let { data: pedido, error } = await supabase
            .from('pedidos')
            .select('*')
            .eq('id_perfil', id)
            .order('created_at', { ascending: true })
            if(error) {
            throw new Error(error.message)
        }
        //devuelvo los valores de la tabla pedido con el id que le paso
        return pedido.map(({id, numeroPedido, created_at, id_coche, id_perfil}) => {
            return new Pedidos(id, numeroPedido, created_at, id_coche, id_perfil)
        })
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