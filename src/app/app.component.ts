import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavComponentComponent} from "./nav-component/nav-component.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'casseTeteVietFront';
}
