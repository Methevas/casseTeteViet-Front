import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environments} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SolutionService {

  constructor(private http: HttpClient) { }

  public getSolutions(): Observable<any> {
  return this.http.get(environments.baseUrl+environments.context+environments.solutions)
  }
}
