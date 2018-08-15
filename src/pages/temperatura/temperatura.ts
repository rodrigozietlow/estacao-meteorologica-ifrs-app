import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HistRicoDeTemperaturaPage } from '../hist-rico-de-temperatura/hist-rico-de-temperatura';
import { DadosRemotosProvider } from '../../providers/dados-remotos/dados-remotos';
import { Storage } from '@ionic/storage';
import { Temperatura } from '../../temperatura.class';

@Component({
	selector: 'page-temperatura',
	templateUrl: 'temperatura.html'
})
export class TemperaturaPage {
	// this tells the tabs component which Pages
	// should be each tab's root Page

	public temperaturaAtual: Temperatura;
	public mediaAtual: Temperatura;


	constructor(public navCtrl: NavController, public apiProvider: DadosRemotosProvider, public storage: Storage) {

		this.storage.get("atualTemperatura").then(
			(val) => {
				console.log("encontrou uma temperatura atual em storage: ");
				console.log(val);
				if(typeof this.temperaturaAtual == 'undefined' && val != null){
					this.temperaturaAtual = val;
					console.log("temperatura atual vinda por storage");
				}
			}
		);
		this.storage.get("mediaTemperatura").then(
			(val) => {
				console.log("encontrou uma media atual em storage: ");
				console.log(val);
				if(typeof this.mediaAtual == 'undefined' && val != null){
					this.mediaAtual = val;
					console.log("media atual vinda por storage");
				}
			}
		);
		this.atualizarTemperatura();
	}

	public atualizarTemperatura(){
		this.apiProvider.getAtual("temperatura").subscribe(
			(data : any) => {
				if(data.sucess){
					this.temperaturaAtual = { "valor" : data.valor, "data" : data.data};
					this.storage.set("atualTemperatura", this.temperaturaAtual);
					console.log("temperatura atual vinda por http");
				}
			}
		);
		this.apiProvider.getMediaAtual("temperatura").subscribe(
			(data : any) => {
				if(data.sucess) {
					this.mediaAtual = { "valor" : data.valor, "data" : data.data};
					this.storage.set("mediaTemperatura", this.mediaAtual);
					console.log("media atual vinda por http");
				}
			}
		);
	}

	public goToHistRicoDeTemperatura(params){
		if (!params) params = {};
		this.navCtrl.push(HistRicoDeTemperaturaPage);
	}
	public goToTemperatura(params){
		if (!params) params = {};
		this.navCtrl.push(TemperaturaPage);
	}
}
