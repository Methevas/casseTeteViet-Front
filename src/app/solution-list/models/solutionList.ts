import {SolutionDto} from "../../solution/models/solutionDto";


export class Solutions {
  solutions !: SolutionDto[]

  constructor(listeSolutions?: Solutions) {
    if (listeSolutions != null) {
      this.solutions = listeSolutions.solutions;
    }
  }
}
