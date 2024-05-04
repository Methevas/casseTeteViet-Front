import {Routes} from '@angular/router';
import {SolutionListComponent} from "./solution-list/solution-list.component";
import {SolutionComponent} from "./solution/solution.component";

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'solutions',
    pathMatch: 'full'
  },
  {
    path: 'solutions',
    component: SolutionListComponent
  },
  {
    path: 'solutions/:id',
    component: SolutionComponent
  },
];
