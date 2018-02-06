import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../service/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
// Se usa para conectar con google
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css'
  ]
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame: boolean = false;
  // Se usa para conectar con google
  auth2: any;

  constructor( public router: Router,
               public _usuarioService: UsuarioService
              ) { }

  ngOnInit() {
    init_plugins();
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 2) {
      this.recuerdame = true;
    }

    this.googleInit();
  }

// Se usa para conectar con google
  googleInit(){
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '1066327961401-aqarqfge7bjar5vant2uidut18p0vkgs.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin( document.getElementById( 'btnGoogle' ) );

    });
  }

  attachSignin( element ){
    this.auth2.attachClickHandler( element, {}, (googleUser) => {
      //let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;

      this._usuarioService.loginGoogle( token )
                          .subscribe( //() => this.router.navigate( ['/dashboard'] ) 
                          () => window.location.href = '#/dashboard'
                        );
    });
  }
  //---------------------------------------------
  Ingresar( forma: NgForm ) {

    if (forma.invalid){
      return;
    }
    
    let usuario = new Usuario(
      null,
      forma.value.email,
      forma.value.password
    );

    this._usuarioService.login( usuario, forma.value.recuerdame )
        .subscribe( /*respuesta => {
          console.log( respuesta );*/
          correcto => this.router.navigate(['/dashboard'])
        /*}*/);

    //this.router.navigate(['/dashboard']);
  }

}
