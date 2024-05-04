import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environments} from "../../../environments/environment";
import {SolutionDto} from "../models/solutionDto";
import {Solutions} from "../../solution-list/models/solutionList";

@Injectable({
  providedIn: 'root'
})
export class SolutionService {

  constructor(private http: HttpClient) { }

  getSolutions(): Observable<Solutions> {
  return this.http.get<Solutions>(environments.baseUrl+environments.context+environments.solutions)
  }
  getSolution(id:number): Observable<SolutionDto | undefined> {
    return this.http.get<SolutionDto>(environments.baseUrl+environments.context+environments.solution+"/"+id);
  }

  updateSolution(solutionDto:SolutionDto): Observable<Object>{
    return this.http.put<Object>(environments.baseUrl+environments.context+environments.solution, solutionDto);
  }

  deleteSolution(id:number): Observable<Object> {
    return this.http.delete<Object>(environments.baseUrl+environments.context+environments.solution+"/"+id);
  }
}
