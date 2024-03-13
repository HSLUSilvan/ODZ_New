import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ApiConfig, Massnahme, Orgel, Ort } from '../api/Api';
import { DateDialog } from '../dialog/dialog.component';
import { UserDialog } from '../dialogBenutzer/dialogBenutzer.component';
import { PlaceDialog } from '../dialogOrt/dialogOrt.component';
import { KontaktModel, LadenModel, MediumModel, OrganSearch, OrgelModel, OrtModel, RegisterModel, TastenreiheModel, WerkModel } from './organsearch';

@Injectable({
  providedIn: 'root'
})
export class OrganService {

  apiurl = 'https://localhost:7205/api/Organ';
  allorganurl = '/AllOrgans';
  maporganurl = '/MapOrgans';
  organsurl = '/Organs';
  entryurl = '/Entry';
  editurl = '/Edit';
  dispourl = '/Dispo';
  historyurl = '/History';
  placeurl = '/Places';
  editOrgelurl = '/EditOrgel'
  editTastenreiheurl = '/EditTastenreihe'
  editWerkurl = '/EditTWerk'
  editLadenurl = '/EditLaden'
  editRegisterurl = '/EditRegister'
  editOrturl = '/EditOrt'
  editKontakturl = '/EditKontakt'
  editDateInfourl = '/Edit/Datuminfo'
  editPlaceInfourl = '/Edit/Ortinfo'
  editUserInfourl = '/Edit/Benutzerinfo'
  editMediaurl = '/Medium/Add'
  public static editId = 0;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

getConfig() {
  return this.http.get<ApiConfig>(this.organsurl);
}

  constructor(private http: HttpClient) { }

  getAllOrgans(): Observable<OrganSearch[]>  {
    return this.http.get<OrganSearch[]>(this.apiurl + this.allorganurl)
    .pipe(
      tap(_ => console.log('fetched all organs')),
      catchError(this.handleError<OrganSearch[]>('getOrgans', []))
    );
  }

  getMapOrgan(): Observable<Orgel[]>  {
    return this.http.get<Orgel[]>(this.apiurl + this.maporganurl)
    .pipe(
      tap(_ => console.log('fetched all organs')),
      catchError(this.handleError<Orgel[]>('getOrgans', []))
    );
  }


  getOrgans(): Observable<OrganSearch[]>  {
    return this.http.get<OrganSearch[]>(this.apiurl + this.organsurl)
    .pipe(
      tap(v => console.log(JSON.stringify(v))),
      catchError(this.handleError<OrganSearch[]>('getOrgans', []))
    );
  }

  getPlaces(): Observable<PlaceDialog[]>  {
    return this.http.get<PlaceDialog[]>(this.apiurl + this.editPlaceInfourl)
    .pipe(
      tap(_ => console.log('fetched all places')),
      catchError(this.handleError<PlaceDialog[]>('getPlaces', []))
    );
  }

  getDates(): Observable<DateDialog[]>  {
    return this.http.get<DateDialog[]>(this.apiurl + this.editDateInfourl)
    .pipe(
      tap(_ => console.log('fetched all dates')),
      catchError(this.handleError<DateDialog[]>('getPlaces', []))
    );
  }

  getUsers(): Observable<UserDialog[]>  {
    return this.http.get<UserDialog[]>(this.apiurl + this.editUserInfourl)
    .pipe(
      tap(_ => console.log('fetched all users')),
      catchError(this.handleError<UserDialog[]>('getUsers', []))
    );
  }

  getOrgan(id: number): Observable<Massnahme[]>  {
    const configUrl = `${this.apiurl}${this.entryurl}/${id}`;
    return this.http.get<Massnahme[]>(configUrl)
    .pipe(
      tap(_ => console.log('fetched organs')),
      catchError(this.handleError<Orgel[]>('getOrgans', []))
    );
  }

  getDispo(id: number): Observable<Massnahme[]>  {
    const configUrl = `${this.apiurl}${this.dispourl}/${id}`;
    return this.http.get<Massnahme[]>(configUrl)
    .pipe(
      tap(_ => console.log('fetched Dispos')),
      catchError(this.handleError<Massnahme[]>('getDispos', []))
    );
  }

  getHistory(id: number): Observable<Massnahme[]>  {
    const configUrl = `${this.apiurl}${this.historyurl}/${id}`;
    return this.http.get<Massnahme[]>(configUrl)
    .pipe(
      tap(_ => console.log('fetched Histories')),
      catchError(this.handleError<Massnahme[]>('getHistory', []))
    );
  }

  getOrganEdit(id: number): Observable<Orgel[]>  {
    const configUrl = `${this.apiurl}${this.editurl}/${id}`;
    return this.http.get<Orgel[]>(configUrl)
    .pipe(
      tap(_ => console.log('fetched organs')),
      catchError(this.handleError<Orgel[]>('getOrgans', []))
    );
  }

  /** PUT: update the organ on the server */
updateOrgan(organ: OrgelModel): Observable<OrgelModel> {
  return this.http.put(this.apiurl + this.editOrgelurl, organ).pipe(
    tap(_ => console.log(`updated organ id=${organ.id}`)),
    catchError(this.handleError<any>('updateOrgan'))
  );
}

addOrgan(organ: OrgelModel): Observable<OrgelModel> {
  return this.http.post<OrgelModel>(this.apiurl + this.editOrgelurl, organ).pipe(
    tap((newOrgel: OrgelModel) => console.log(`added orgel with id=${organ.id}`)),
    catchError(this.handleError<OrgelModel>('addOrgel'))
  );
}

updateTastenreihe(organ: TastenreiheModel): Observable<TastenreiheModel> {
  return this.http.put(this.apiurl + this.editTastenreiheurl, organ).pipe(
    tap(_ => console.log(`updated organ id=${organ.id}`)),
    catchError(this.handleError<any>('updateOrgan'))
  );
}

addTastenreihe(organ: TastenreiheModel): Observable<TastenreiheModel> {
  return this.http.post<TastenreiheModel>(this.apiurl + this.editTastenreiheurl, organ).pipe(
    tap((newOrgel: TastenreiheModel) => console.log(`added tastenreihe with id=${organ.id}`)),
    catchError(this.handleError<TastenreiheModel>('addTastenreihe'))
  );
}

updateWerk(organ: WerkModel): Observable<WerkModel> {
  return this.http.put(this.apiurl + this.editWerkurl, organ).pipe(
    tap(_ => console.log(`updated werk id=${organ.id}`)),
    catchError(this.handleError<any>('updateWerk'))
  );
}

addWerk(organ: WerkModel): Observable<WerkModel> {
  return this.http.post<WerkModel>(this.apiurl + this.editWerkurl, organ).pipe(
    tap((newOrgel: WerkModel) => console.log(`added werk with id=${organ.id}`)),
    catchError(this.handleError<WerkModel>('addWerk'))
  );
}

updateLaden(organ: LadenModel): Observable<LadenModel> {
  return this.http.put(this.apiurl + this.editLadenurl, organ).pipe(
    tap(_ => console.log(`updated laden id=${organ.id}`)),
    catchError(this.handleError<any>('updateLaden'))
  );
}

addLaden(organ: LadenModel): Observable<LadenModel> {
  return this.http.post<LadenModel>(this.apiurl + this.editLadenurl, organ).pipe(
    tap((newOrgel: LadenModel) => console.log(`added laden with id=${organ.id}`)),
    catchError(this.handleError<LadenModel>('addLaden'))
  );
}

updateRegister(organ: RegisterModel): Observable<RegisterModel> {
  return this.http.put(this.apiurl + this.editRegisterurl, organ).pipe(
    tap(_ => console.log(`updated register id=${organ.id}`)),
    catchError(this.handleError<any>('updateRegister'))
  );
}

addRegister(organ: RegisterModel): Observable<RegisterModel> {
  return this.http.post<RegisterModel>(this.apiurl + this.editRegisterurl, organ).pipe(
    tap((newOrgel: RegisterModel) => console.log(`added register with id=${organ.id}`)),
    catchError(this.handleError<RegisterModel>('addRegister'))
  );
}

updateOrt(organ: OrtModel): Observable<OrtModel> {
  return this.http.put(this.apiurl + this.editOrturl, organ).pipe(
    tap(_ => console.log(`updated organ id=${organ.id}`)),
    catchError(this.handleError<any>('updateOrgan'))
  );
}

addOrt(organ: OrtModel): Observable<OrtModel> {
  return this.http.post<OrtModel>(this.apiurl + this.editOrturl, organ).pipe(
    tap((newOrt: OrtModel) => console.log(`added orgel with id=${organ.id}`)),
    catchError(this.handleError<OrtModel>('addOrgel'))
  );
}

updateKontakt(organ: KontaktModel): Observable<KontaktModel> {
  return this.http.put(this.apiurl + this.editKontakturl, organ).pipe(
    tap(_ => console.log(`updated organ id=${organ.id}`)),
    catchError(this.handleError<any>('updateOrgan'))
  );
}

addKontakt(organ: KontaktModel): Observable<KontaktModel> {
  return this.http.post<KontaktModel>(this.apiurl + this.editKontakturl, organ).pipe(
    tap((newKontakt: KontaktModel) => console.log(`added orgel with id=${organ.id}`)),
    catchError(this.handleError<KontaktModel>('addOrgel'))
  );
}

addMedia(organ: MediumModel): Observable<MediumModel> {
  return this.http.post<MediumModel>(this.apiurl + this.editMediaurl, organ).pipe(
    tap((newOrt: MediumModel) => console.log(`added orgel with id=${organ.name}`)),
    catchError(this.handleError<MediumModel>('addOrgel'))
  );
}

searchOrgans(term: string): Observable<Orgel[]> {
  if (!term.trim()) {
    // if not search term, return empty orgel array.
    return of([]);
  }
  return this.http.get<Orgel[]>(`${this.apiurl}${this.organsurl}/?name=${term}`).pipe(
    tap(x => x.length ?
       console.log(`found organs matching "${term}"`) :
       console.log(`no organs matching "${term}"`)),
    catchError(this.handleError<Orgel[]>('searchOrgan', []))
  );
    }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
