import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { SettingsService } from '../../service/service.index';


@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor( public _ajustesService: SettingsService ) { }

  ngOnInit() {
  }

  CambiarColor( tema: string, link: any ) {
    console.log(tema);
    this._ajustesService.aplicarTema(tema);
    this.aplicarCheck(link);
  }
  aplicarCheck(link: any) {
    // tslint:disable-next-line:prefer-const
    let selectores: any = document.getElementsByClassName('selector');
    // tslint:disable-next-line:prefer-const
    for ( let ref of selectores) {
       ref.classList.remove('working');
    }
    link.classList.add('working');
  }
  colocarCheck() {
    // tslint:disable-next-line:prefer-const
    let tema = this._ajustesService.ajustes.tema;
    // tslint:disable-next-line:prefer-const
    let selectores: any = document.getElementsByClassName('selector');
    for ( let ref of selectores) {
      if ( ref.getAttribute('data-theme') === tema ) {
        ref.classList.add('working');
        break;
      }
   }

  }


}
