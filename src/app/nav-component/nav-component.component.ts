import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'nav-component',
  standalone: true,
  imports: [],
  templateUrl: './nav-component.component.html',
  styleUrl: './nav-component.component.css'
})
export class NavComponentComponent {

  constructor(private router: Router) {
  }

  accueil(){
    this.router.navigate(
      ['solutions/']
    );
  }
}
