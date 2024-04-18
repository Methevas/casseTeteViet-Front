import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MainComponentComponent} from "./main-component/main-component.component";
import {NavComponentComponent} from "./nav-component/nav-component.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainComponentComponent, NavComponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'casseTeteVietFront';
}
