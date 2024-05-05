import {SolutionDto} from "../../solution/models/solutionDto";


export class Solutions {
  solutions !: SolutionDto[]
  tempsCalcul !: number;

  constructor(listeSolutions?: Solutions, tempsCalcul ?: number) {
    if (listeSolutions != null) {
      this.solutions = listeSolutions.solutions;
      this.tempsCalcul = tempsCalcul ?? 0;
    }
  }
}
