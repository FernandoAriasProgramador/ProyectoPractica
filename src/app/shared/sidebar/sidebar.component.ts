import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../service/service.index';
import { UsuarioService } from '../../service/service.index';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  usu: Usuario;

  constructor( 
    public _sidebar: SidebarService,
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.usu = this._usuarioService.usuario;
  }

}
