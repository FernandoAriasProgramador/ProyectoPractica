import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../service/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarUsuarios();
    this._modalUploadService.notificacion
                            .subscribe( resp => this.cargarUsuarios());
  }

  cargarUsuarios(){
    this.cargando = true;
    this._usuarioService.cargarUsuarios( this.desde )
                        .subscribe( (resp: any) => {
                          console.log(resp);
                          this.totalRegistros = resp.Total;
                          this.usuarios = resp.usuarios;
                          this.cargando = false;

                        });
  }

  cambiarDesde(desde: number){
    let des = this.desde + desde;
    if (des >= this.totalRegistros){
      return;
    }
    if(des < 0){
      return;
    }
    this.desde += desde;
    this.cargarUsuarios();
  }

  buscarUsuario(termino: string){
    if( termino.length <= 0 ){
      this.cargarUsuarios();
      return;
    }
    this.cargando = true;
    this._usuarioService.buscarUsuario(termino)
                        .subscribe( (_usuarios: Usuario[]) => {
                          console.log(_usuarios);
                          this.usuarios = _usuarios;
                          this.totalRegistros = _usuarios.length;

                          this.cargando = false;
                        });
  }

  borrarUsuario(_usuario: Usuario){
    if(_usuario._id === this._usuarioService.usuario._id){
      swal('No se puede borrar usuario', 'No se puede borrar a si mismo', 'error');
      return;
    }

    swal({
      title: 'Esta seguro?',
      text: 'Esta seguro de borrar a ' + _usuario.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    })
    .then( borrar => {
      if(borrar){
        this._usuarioService.borrarUsuario( _usuario._id )
                            .subscribe( resp => {
                              this.cargarUsuarios();
                            });

      }
    });
  }

  guardarUsuario(_usuario: Usuario){
    this._usuarioService.actualizarUsuario( _usuario )
                        .subscribe();
  }

  mostrarModal( id: string ){
    this._modalUploadService.mostrarModal('usuarios', id);
  }


}
