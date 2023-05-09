import { supabase } from "./supabase";

export class Coche {
    //Mapping de las propiedades de la tabla asientos
    constructor (id = null, created_at = null, asiento = null, motor = null, neumatico = null, aleron = null){
        this.id = id
        this.created_at = created_at
        this.asiento = asiento
        this.motor = motor
        this.neumatico = neumatico
        this.aleron = aleron
    }

    static async getAll(){
        let { data: coche, error } = await supabase
        .from('coche')
        .select('*')    
        .order('created_at', { ascending: false })
        if(error){
            throw new Error(error.message)
        }
        //devuelvo los valores de la tabla asientos
        return coche.map(({id, created_at, asiento, motor, neumatico, aleron}) => {
            return new Coche(id, created_at, asiento, motor, neumatico, aleron)
        })
    }

    static async getById(id) {
       
        let { data: coche, error } = await supabase
            .from('coche')
            .select('*')
            .eq('id', id)
            .single()
        if(error) {
            throw new Error(error.message)
        }
        //devuelvo los valores de la tabla asientos con el id que le paso
            return new Coche(coche.id, coche.created_at, coche.asiento, coche.motor, coche.neumatico, coche.aleron)
    }

    //funcion para crear un coche
    static async crear(cocheObjeto){
        const { data, error } = await supabase
            .from('coche')
            .insert(cocheObjeto)
            .select()

        if(error){
            throw new Error(error.message)
        }
        return true
    }

    static async borrar(id){
        const { error } = await supabase
        .from('coche')
        .delete()
        .eq('id', id)
  
      if (error) {
        throw new Error(error.message)
      }
      return true
    }
}