import { supabase } from "./supabase";

export class Motor {
    //Mapping de las propiedades de la tabla motor
    constructor (id = null, created_at = null, fabricante = null, potencia = null, par = null, cilindrada = null, consumo = null, velocidadMax = null, aceleracion = null, numCilindros = null, img = null){
        this.id = id
        this.created_at = created_at
        this.fabricante = fabricante
        this.potencia = potencia
        this.par = par
        this.cilindrada = cilindrada
        this.consumo = consumo
        this.velocidadMax = velocidadMax
        this.aceleracion = aceleracion
        this.numCilindros = numCilindros
        this.img = img
    }

    static async getAll(){
        let { data: motor, error } = await supabase
        .from('motor')
        .select('*')    
        .order('created_at', { ascending: false })
        if(error){
            throw new Error(error.message)
        }
        //devuelvo los valores de la tabla motor
        return motor.map(({id, created_at, fabricante, potencia, par, cilindrada, consumo, velocidadMax, aceleracion, numCilindros, img}) => {
            return new Motor(id, created_at, fabricante, potencia, par, cilindrada, consumo, velocidadMax, aceleracion, numCilindros, img)
        })
    }

    static async getById(id) {
       
        let { data: motor, error } = await supabase
            .from('motor')
            .select('*')
            .eq('id', id)
            .single()
        if(error) {
            throw new Error(error.message)
        }
        //devuelvo los valores de la tabla motor con el id que le paso
            return new Motor(motor.id, motor.created_at, motor.fabricante, motor.potencia, motor.par, motor.cilindrada, motor.consumo, motor.velocidadMax, motor.aceleracion, motor.numCilindros, motor.img)
    }

    //funcion para crear un motor
    static async crear(motorobjeto){
        const { data, error } = await supabase
            .from('motor')
            .insert(motorobjeto)
            .select()

        if(error){
            throw new Error(error.message)
        }
        return true
    }

    static async borrar(id){
        const { error } = await supabase
        .from('motor')
        .delete()
        .eq('id', id)
  
      if (error) {
        throw new Error(error.message)
      }
      return true
    }

    

}