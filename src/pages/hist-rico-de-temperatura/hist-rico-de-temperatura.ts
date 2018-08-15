import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TemperaturaPage } from '../temperatura/temperatura';
import { DadosRemotosProvider } from '../../providers/dados-remotos/dados-remotos';
import { Storage } from '@ionic/storage';
import { Temperatura } from '../../temperatura.class';

@Component({
	selector: 'page-hist-rico-de-temperatura',
	templateUrl: 'hist-rico-de-temperatura.html'
})
export class HistRicoDeTemperaturaPage {
	// this tells the tabs component which Pages
	// should be each tab's root Page

	public temperaturas: Temperatura[];

	constructor(public navCtrl: NavController, public apiProvider: DadosRemotosProvider, public storage: Storage) {

		this.storage.get("historicoTemperatura").then(
			(val) => {
				if((typeof this.temperaturas == 'undefined' || this.temperaturas.length == 0 ) && val != null){
					this.temperaturas = val;
				}
			}
		);
		this.buscar();
	}

	public buscar(){
		var x = this;
		this.apiProvider.getHistorico('temperatura').subscribe(
			function (data: any) {
				if(data.sucess){
					x.temperaturas = data.valor;
					x.storage.set("historicoTemperatura", data.valor);
				}
			}
		);
	}

	public goToTemperatura(params){
		if (!params) params = {};
		this.navCtrl.push(TemperaturaPage);
	}
	public goToHistRicoDeTemperatura(params){
		if (!params) params = {};
		this.navCtrl.push(HistRicoDeTemperaturaPage);
	}
}
