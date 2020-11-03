import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from 'src/assets/Interfaces/UserObject';

@Injectable({
  providedIn: 'root'
})
export class MainPageService {

  constructor(private _http:HttpClient) {}

  MakeGetRequestMany(url: string): Observable<IUser[]>{
    return this._http.get<IUser[]>(url);
  }

  MakeGetRequestOne(url:string): Observable<IUser>{
    return this._http.get<IUser>(url);
  }

  MakePostRequest(url:string, body:string){
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    this._http.post(url,body, {headers}).subscribe();
  }

  MakeDeleteRequest(url:string){
    this._http.delete(url).subscribe();
  }

  MakePatchRequest(url:string, data:string){
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    this._http.patch(url, data, {headers}).subscribe();
  }
}
