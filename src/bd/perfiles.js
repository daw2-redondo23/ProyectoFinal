// Importamos la conexión a la base de datos
import { supabase } from './supabase.js'

export class Perfil {
  // Mapping de propiedades de la tabla perfiles
  constructor (id = null, created_at = null, nombre = null, apellidos = null, user_id = null, avatar = null, email = null, telefono = null, rol = null) {
    this.id = id
    this.created_at = created_at
    this.nombre = nombre
    this.apellidos = apellidos
    this.email = email
    this.user_id = user_id
    this.avatar = avatar
    this.telefono = telefono
    this.rol = rol
  }

  // leer todos en orden descendiente a como se han creado
  static async getAll () {
    const { data: perfiles, error } = await supabase
      .from('perfiles')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) {
      throw new Error(error.message)
    }
    // devuelve array de objetos
    return perfiles.map(({ id, created_at, nombre, apellidos, user_id, avatar, email, telefono, rol }) => {
      return new Perfil(id, created_at, nombre, apellidos, user_id, estado, avatar, email, telefono, rol)
    })
  }

  // leer registro por id (método static que se puede leer desde la clase sin necesidad de crear una instancia)
  static async getById (id) {
    const { data: perfil, error } = await supabase
      .from('perfiles')
      .select('*')
      .eq('id', id)
      .single()
    if (error) {
      throw new Error(error.message)
    }
    // Devuelve un nuevo objeto con los datos del registro
    return new Perfil(perfil.id, perfil.created_at, perfil.nombre, perfil.apellidos, perfil.user_id, perfil.avatar, perfil.email, perfil.telefono, perfil.rol)
  }

  // leer registro por id (método static que se puede leer desde la clase sin necesidad de crear una instancia)
  static async getByUserId (id) {
    const { data: perfil, error } = await supabase
      .from('perfiles')
      .select('*')
      .eq('user_id', id)
      .single()
    if (error) {
      throw new Error(error.message)
    }
    // Devuelve un nuevo objeto con los datos del registro
    return new Perfil(perfil.id, perfil.created_at, perfil.nombre, perfil.apellidos, perfil.user_id, perfil.avatar, perfil.email, perfil.telefono, perfil.rol)
  }

  // crear registro (método static que se puede leer desde la clase sin necesidad de crear una instancia)
  static async create (perfilData) {
    const { error } = await supabase
      .from('perfiles')
      .insert(perfilData)
      .select()
      // console.log('nuevo perfil ',error);
    if (error) {
      throw new Error(error.message)
    }
    return true
  }

  // actualizar
  async update () {
    const { error } = await supabase
      .from('perfiles')
      .update({
        nombre: this.nombre,
        apellidos: this.apellidos,
        avatar: this.avatar
      })
      .eq('id', this.id)
      .single()

    if (error) {
      throw new Error(error.message)
    }
    return true
  }



  // borrar
  static async delete (id) {
    const { error } = await supabase
      .from('perfiles')
      .delete()
      .eq('id', id)

    if (error) {
      throw new Error(error.message)
    }
    return true
  }
}
