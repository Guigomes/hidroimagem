import { Component } from '@angular/core';

export interface Item { nome: string; sobrenome:string }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hidroimagem';

}
