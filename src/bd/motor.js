import { supabase } from "./supabase";

export class Motor {
    //Mapping de las propiedades de la tabla motor
    constructor (id = null, created_at = null, fabricante = null, potencia = null, par = null, cilindrada = null, consumo = null, velocidadMax = null, aceleracion = null, numCilindros = null){
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
        return motor.map(({id, created_at, fabricante, potencia, par, cilindrada, consumo, velocidadMax, aceleracion, numCilindros}) => {
            return new Motor(id, created_at, created_at, fabricante, potencia, par, cilindrada, consumo, velocidadMax, aceleracion, numCilindros)
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


    }

}