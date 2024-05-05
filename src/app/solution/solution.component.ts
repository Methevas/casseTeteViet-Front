import {AfterViewInit, Component} from '@angular/core';
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
import {MatCheckbox} from "@angular/material/checkbox";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-solution',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf,
    MatIconModule,
    FormsModule,
    MatCheckbox
  ],
  templateUrl: './solution.component.html',
  styleUrl: './solution.component.css'
})
export class SolutionComponent implements AfterViewInit {
  solution !: SolutionDto;
  DISABLED = true;

  constructor(private route: ActivatedRoute, private router: Router, private solutionService: SolutionService, private _snackBar: MatSnackBar) {
  }

  ngAfterViewInit(): void {
    this.route.queryParamMap
      .subscribe(params => {
        // @ts-ignore
        this.DISABLED = params.get('mode') == 'view';
      });

    this.solutionService.getSolution(this.route.snapshot.params['id']).subscribe(data => {
      if (data != null) {
        this.solution = data;
      }
    })
  }

  modifierSolution() {
    this.solutionService.updateSolution(this.solution).subscribe(data => {
      if (data != null) {
        this.solution.statut = data.toString().includes("Correcte");
        this.openSnackBar(data.toString());
      }
    }, (error: HttpErrorResponse) => {
      this.openSnackBar(error.error);
    })
  }

  supprimerSolution() {
    this.solutionService.deleteSolution(this.solution.id).subscribe(data => {
      this.openSnackBar("La solution " + this.solution.id + " a bien été supprimée");
      this.retourMain();
      // c'est forcément nul vu que c'est void dans le BAACK
      if (data != null) {
        this.openSnackBar(data.toString());
        this.retourMain();
      }
    }, (error: HttpErrorResponse) => {
      this.openSnackBar(error.error);
    })
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Fermer', {
      duration: 5000,
      verticalPosition: 'bottom',
      panelClass: 'snackbar-style'
    });
  }

  retourMain() {
    this.router.navigate(['solutions/']);
  }
}
