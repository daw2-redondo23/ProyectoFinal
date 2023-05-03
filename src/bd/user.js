// Importamos la conexión a la base de datos
import { supabase } from './supabase.js'

export class User {
  // Mapping de propiedades de la tabla perfiles
  constructor (id = null, email = null, password = null) {
    this.id = id
    this.email = email
    this.password = password
  }

  // crear registro (método static que se puede leer desde la clase sin necesidad de crear una instancia)
  static async create (userData) {
    const { data, error } = await supabase.auth.signUp(userData)

    if (error) {
      throw new Error(error.message)
    }
    console.log('usuario creado correctamente ', data)
    return new User(data.user.id, data.user.email)
  }

  // login
  static async login (userData) {
  // USER LOGIN
    const { data, error } = await supabase.auth.signInWithPassword(userData)
    if (error) {
      throw new Error(error.message)
    }
    console.log('usuario logeado', data.user)
    return new User(data.user.id, data.user.email)
  }

  // logout
  static async logout () {
    // USER LOGOUT
    const { error } = await supabase.auth.signOut()
    if (error) {
      throw new Error(error.message)
    }
    return true
  }

  // leer user logeado
  static async getUser () {
    // GET USER
    const { data: { user }, error } = await supabase.auth.getUser()
    console.log('Ususario logeado desde getuser', user)
    if (error) {
      throw new Error(error.message)
    }
    return new User(user.id, user.email)
  }
}
