import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'main-component',
  standalone: true,
  imports: [MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './main-component.component.html',
  styleUrl: './main-component.component.css'
})
export class MainComponentComponent {
  titre!: string;
  snaps!: number;

  ngOnInit(): void {
    this.titre = "casseTeteVietFront";
    this.snaps = 0;
  }

  onAddSnap() {
    this.snaps++;
  }
}
