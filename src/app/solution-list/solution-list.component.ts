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


@Component({
  selector: 'app-solution-list',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatInputModule, MatFormFieldModule, MatSortModule, MatIconModule, MatButtonModule, NgIf, RouterModule, UpperCasePipe],
  templateUrl: './solution-list.component.html',
  styleUrl: './solution-list.component.css'
})
export class SolutionListComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'numerotation', 'actions'];
  pageSizeOptions: number[] = [5, 10, 25];
  listeSolutions !: Solutions;
  dataSource = new MatTableDataSource<SolutionDto>();
  titre1: string = "Liste des Solutions : ";
  genererSoulutionsTitre: string = "GENERER LES SOLUTIONS";
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private solutionService: SolutionService, private router: Router) {
  }

  ngAfterViewInit(): void {

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

  genererSoulutions() {
    this.solutionService.getSolutions().subscribe(data => {
      if (data != null) {
        this.listeSolutions = data;
        this.dataSource = new MatTableDataSource(data.solutions);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }

  view(id: number) {
    this.router.navigateByUrl('solutions/' + id);
  }
}
