import {AfterViewInit, Component, ViewChild} from "@angular/core";
import {Solutions} from "./models/solutionList";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {SolutionService} from "../solution/services/solution.service";
import {SolutionDto} from "../solution/models/solutionDto";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSort, MatSortModule, Sort} from "@angular/material/sort";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {NgIf, UpperCasePipe} from "@angular/common";
import {Router, RouterModule} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatCheckbox} from "@angular/material/checkbox";
import {FormsModule} from "@angular/forms";


@Component({
  selector: 'app-solution-list',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatInputModule, MatFormFieldModule, MatSortModule, MatIconModule, MatButtonModule, NgIf, RouterModule, UpperCasePipe, MatCheckbox, FormsModule],
  templateUrl: './solution-list.component.html',
  styleUrl: './solution-list.component.css'
})
export class SolutionListComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'numerotation', 'statut', 'actions'];
  pageSizeOptions: number[] = [5, 10, 25];
  listeSolutions !: Solutions;
  tempsCalcul = 0 ;
  dejaGenere = false;
  dataSource = new MatTableDataSource<SolutionDto>();
  listeDesSolutionsTitre: string = "Liste des solutions trouvées sur 362 880 possibilitées en : ";
  genererSoulutionsTitre: string = "GENERER LES SOLUTIONS";
  supprimerSoulutionsTitre: string = "SUPPRIMER TOUTES LES SOLUTIONS";
  correcte: string = "CORRECTE";
  incorrecte: string = "INCORRECTE";
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private solutionService: SolutionService, private router: Router, private _snackBar: MatSnackBar) {
  }

  ngAfterViewInit(): void {
    this.solutionService.solutionsSontDejaGeneree().subscribe(data => {
      this.dejaGenere = data;
      if(this.dejaGenere) {
        this.recupererToutesLesSolutions();
      }
    })
  }


  // Filtre
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  sortData(sort: Sort) {
    const data = this.listeSolutions.solutions.slice();
    if (!sort.active || sort.direction === '') {
      this.listeSolutions.solutions = data;
      return;
    }
  }

  recupererToutesLesSolutions() {
    this.solutionService.getSolutions().subscribe(data => {
      if (data != null) {
        this.listeSolutions = data;
        this.dataSource = new MatTableDataSource(data.solutions);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.tempsCalcul = this.listeSolutions.tempsCalcul;
      }
    })
  }

  genererLesSolutions() {
    this.solutionService.genererSolution().subscribe(data => {
      if (data != null) {
        this.recupererToutesLesSolutions();
      }
    })
  }
  supprimerLesSolutions() {
    this.solutionService.deleteSolutions().subscribe(data => {
      this.listeSolutions.solutions.splice(0);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.tempsCalcul = 0;
      this.openSnackBar("Les solutions ont été supprimées");
    })
  }

  detail(id: number) {
    this.router.navigate(
      ['solutions/' + id],
      {queryParams: {mode: 'view'}}
    );
  }

  modifier(id: number) {
    this.router.navigate(
      ['solutions/' + id],
      {queryParams: {mode: 'modify'}}
    );
  }

  supprimerSolution(id: number, index: number) {
    this.solutionService.deleteSolution(id).subscribe(data => {
      this.listeSolutions.solutions.splice(index, 1);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.openSnackBar("La solution " + id + " a bien été supprimée");
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
}
