import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Injectable()
export class UsuarioService {
  // Declaracion de variables
  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router
  ) {
    this.cargarStorage();
  }

  logout(){
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    
    this.router.navigate(['/login']);
  }

  login( usuario: Usuario, recordar: boolean = false ){

    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    let url = URL_SERVICIOS + '/login';
    return this.http.post( url, usuario )
                    .map( (resp: any) => {
                      //  localStorage.setItem('id', resp.id);
                      //  localStorage.setItem('token', resp.token);
                      //  localStorage.setItem('usuario', JSON.stringify(resp.usuario));

                       this.guardarStorage( resp.id, resp.token, resp.usuario);

                       return true;
                    });
  }

  crearUsuario( usuario: Usuario ){
       let url = URL_SERVICIOS + '/usuario';
       return this.http.post( url, usuario)
                  .map((resp: any) => {
                    swal('Usuario creado', usuario.email, 'success');

                    return resp.usuario;
                  });
   }
   // Para conectar a la cuenta de Googel

  loginGoogle( token: string ){
    let url= URL_SERVICIOS + '/login/google';
    return this.http.post ( url, {token} )
                    .map( (resp: any) => {
                      this.guardarStorage( resp.id, resp.token, resp.usuario);
                      return true;
                    });                 

  }

  guardarStorage ( id: string, token: string, usuario: Usuario ){
    
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;

  }

  estaLogueado(){
    return ( this.token.length > 5 ) ? true : false;
  }

  cargarStorage(){
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario') );
    }else{
      this.token = '';
      this.usuario = null;
    }
  }

}
