import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {ActivatedRoute, Router} from "@angular/router";
import {SolutionService} from "./services/solution.service";
import {SolutionDto} from "./models/solutionDto";
import {MatFormFieldModule} from "@angular/material/form-field";
import {NgIf} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-solution',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf,
    FormsModule
  ],
  templateUrl: './solution.component.html',
  styleUrl: './solution.component.css'
})
export class SolutionComponent implements AfterViewInit {
  solution !: SolutionDto;

  constructor(private route: ActivatedRoute,private router:Router, private solutionService: SolutionService,private _snackBar: MatSnackBar) {
  }

  ngAfterViewInit(): void {
    this.solutionService.getSolution(this.route.snapshot.params['id']).subscribe(data => {
      if (data != null) {
        this.solution = data;
      }
    })
  }

  modifierSolution() {
      this.solutionService.updateSolution(this.solution).subscribe(data => {
        if (data != null) {
          this.openSnackBar(data.toString());
        }
      },(error: HttpErrorResponse) => {
        this.openSnackBar(error.error);
      })
    console.log("modifier: "+this.solution.valeurs);
  }

  supprimerSolution() {
    this.solutionService.deleteSolution(this.solution.id).subscribe(data => {
       this.openSnackBar("CEST SUPPRIME");
      this.retourMain();
      // c'est forcément nul vu que c'est void dans le BAACK
      if (data != null) {
        this.openSnackBar(data.toString());
        this.retourMain();
        console.log("on est la")
      }
    },(error: HttpErrorResponse) => {
      this.openSnackBar(error.error);
    })
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Fermer', {
      duration: 5000,
      verticalPosition: 'bottom',
      panelClass: 'snackbar-style'});
  }

  retourMain() {
    this.router.navigate(['solutions/']);
  }
}
