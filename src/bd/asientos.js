import { supabase } from "./supabase";

export class Asiento {
    //Mapping de las propiedades de la tabla asientos
    constructor (id = null, created_at = null, fabricante = null, material = null, color = null, modelo = null, img = null){
        this.id = id
        this.created_at = created_at
        this.fabricante = fabricante
        this.material = material
        this.color = color
        this.modelo = modelo
        this.img = img
    }

    static async getAll(){
        let { data: asiento, error } = await supabase
        .from('asientos')
        .select('*')    
        .order('created_at', { ascending: false })
        if(error){
            throw new Error(error.message)
        }
        //devuelvo los valores de la tabla asientos
        return asiento.map(({id, created_at, fabricante, material, color, modelo, img}) => {
            return new Asiento(id, created_at, fabricante, material, color, modelo, img)
        })
    }

    static async getById(id) {
       
        let { data: asiento, error } = await supabase
            .from('asientos')
            .select('*')
            .eq('id', id)
            .single()
        if(error) {
            throw new Error(error.message)
        }
        //devuelvo los valores de la tabla asientos con el id que le paso
            return new Asiento(asiento.id, asiento.created_at, asiento.fabricante, asiento.material, asiento.color, asiento.modelo, asiento.img)
    }

    //funcion para crear un motor
    static async crear(asientoObjeto){
        const { data, error } = await supabase
            .from('asientos')
            .insert(asientoObjeto)
            .select()

        if(error){
            throw new Error(error.message)
        }
        return true
    }

    static async borrar(id){
        const { error } = await supabase
        .from('asientos')
        .delete()
        .eq('id', id)
  
      if (error) {
        throw new Error(error.message)
      }
      return true
    }

    

}