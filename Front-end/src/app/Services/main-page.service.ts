import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from 'src/assets/Interfaces/UserObject';
import { PatchDto } from 'src/assets/Interfaces/Dto';

@Injectable({
  providedIn: 'root'
})
export class MainPageService {

  private GetManyUrl: string = 'http://localhost:3000/users/getAll';
  private GetOneUrl: string = 'http://localhost:3000/users/getOne/';
  private PostUrl: string = 'http://localhost:3000/users/create';
  private DeleteUrl: string = 'http://localhost:3000/users/delete/';
  private PatchUrl: string = 'http://localhost:3000/users/patch';

  constructor(private _http:HttpClient) {}

  MakeGetRequestMany(): Observable<IUser[]>{
    return this._http.get<IUser[]>(this.GetManyUrl);
  }

  MakeGetRequestOne(id:number): Observable<IUser>{
    return this._http.get<IUser>(`${this.GetOneUrl}${id}`);
  }

  MakePostRequest(body:IUser){
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this._http.post(this.PostUrl,JSON.stringify(body), {headers});
  }

  MakeDeleteRequest(id:number){
    return this._http.delete(`${this.DeleteUrl}${id}`);
  }

  MakePatchRequest(body:PatchDto){
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this._http.patch(this.PatchUrl, JSON.stringify(body), {headers});
  }
}
