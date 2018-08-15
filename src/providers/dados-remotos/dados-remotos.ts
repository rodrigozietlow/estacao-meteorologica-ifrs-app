import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Temperatura } from '../../temperatura.class';

/*
  Generated class for the DadosRemotosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DadosRemotosProvider {

  	constructor(public http: HttpClient) {

	}

	public getAtual(area: string): Observable<any> {

		let params = new HttpParams().append('area', area).append('function', 'dia');
		return this.http.get<Temperatura>("http://localhost:80/~rodrigo/API_Clima/run", {params: params});
	}

	public getMediaAtual(area: string): Observable<any> {

		let params = new HttpParams().append('area', area).append('function', 'media_dia');
		return this.http.get<Temperatura>("http://localhost:80/~rodrigo/API_Clima/run", {params: params});
	}

	public getHistorico(area: string): Observable<any> {

		let params = new HttpParams().append('area', area).append('function', 'historico');
		return this.http.get("http://localhost:80/~rodrigo/API_Clima/run", {params: params});
	}
}
