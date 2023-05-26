import { supabase } from "./supabase";

export class Rueda {
    //Mapping de las propiedades de la tabla ruedas
    constructor (id = null, created_at = null, pulgadas = null, medidas = null, ruido = null, fabricante = null, img = null){
        this.id = id
        this.created_at = created_at
        this.pulgadas = pulgadas
        this.medidas = medidas
        this.ruido = ruido
        this.fabricante = fabricante
        this.img = img
    }

    static async getAll(){
        let { data: ruedas, error } = await supabase
        .from('ruedas')
        .select('*')    
        .order('created_at', { ascending: false })
        if(error){
            throw new Error(error.message)
        }
        //devuelvo los valores de la tabla ruedas
        return ruedas.map(({id, created_at, pulgadas, medidas, ruido, fabricante, img}) => {
            return new Rueda(id, created_at, pulgadas, medidas, ruido, fabricante, img)
        })
    }

    static async getById(id) {
       
        let { data: ruedas, error } = await supabase
            .from('ruedas')
            .select('*')
            .eq('id', id)
            .single()
        if(error) {
            throw new Error(error.message)
        }
        //devuelvo los valores de la tabla ruedas con el id que le paso
            return new Rueda(ruedas.id, ruedas.created_at, ruedas.pulgadas, ruedas.medidas, ruedas.ruido, ruedas.fabricante, ruedas.img)
    }

    //funcion para crear un motor
    static async crear(ruedaObjeto){
        const { data, error } = await supabase
            .from('ruedas')
            .insert(ruedaObjeto)
            .select()

        if(error){
            throw new Error(error.message)
        }
        return true
    }

    static async borrar(id){
        const { error } = await supabase
        .from('ruedas')
        .delete()
        .eq('id', id)
  
      if (error) {
        throw new Error(error.message)
      }
      return true
    }

    

}