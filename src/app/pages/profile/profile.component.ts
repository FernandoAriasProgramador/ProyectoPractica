import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../service/service.index';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: string;

  constructor(
                public _usuarioService: UsuarioService
              ) { 
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit() {
  }

  guardar( _usuario: Usuario){
     this.usuario.nombre = _usuario.nombre;
     if(this.usuario.google){
      this.usuario.email = _usuario.email;
     }
      
     this._usuarioService.actualizarUsuario( this.usuario )
                         .subscribe();
  }

  seleccionImagen( archivo:File ){
    if(!archivo){
      this.imagenSubir = null;
      return;
    }

    if( archivo.type.indexOf('image') < 0 ) {
      swal('Solo imagenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => {
      this.imagenTemp = reader.result;
    };
  }

  cambiarImagen(){
    
    this._usuarioService.cambiarImagen(this.imagenSubir, this.usuario._id);

  }

}
