import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HistRicoDeVentoPage } from '../hist-rico-de-vento/hist-rico-de-vento';
import { DadosRemotosProvider } from '../../providers/dados-remotos/dados-remotos';
import { Storage } from '@ionic/storage';
import { Vento } from '../../vento.class';

@Component({
	selector: 'page-vento',
	templateUrl: 'vento.html'
})
export class VentoPage {
	// this tells the tabs component which Pages
	// should be each tab's root Page

	public atual: Vento;
	public media: Vento;
	public apiCall: string = "vento";


	constructor(public navCtrl: NavController, public apiProvider: DadosRemotosProvider, public storage: Storage) {

		this.storage.get("atualVento").then(
			(val) => {
				console.log("encontrou uma Vento atual em storage: ");
				console.log(val);
				if(typeof this.atual == 'undefined' && val != null){
					this.atual = val;
					console.log("Vento atual vinda por storage");
				}
			}
		);
		this.storage.get("mediaVento").then(
			(val) => {
				console.log("encontrou uma media atual em storage: ");
				console.log(val);
				if(typeof this.media == 'undefined' && val != null){
					this.media = val;
					console.log("media atual vinda por storage");
				}
			}
		);
		this.atualizar();
	}

	public atualizar(){
		this.apiProvider.getAtual(this.apiCall).subscribe(
			(data : any) => {
				if(data.sucess){
					this.atual = { "valor" : data.valor, "data" : data.data};
					this.storage.set("atualVento", this.atual);
					console.log("Vento atual vinda por http");
				}
			}
		);
		this.apiProvider.getMediaAtual(this.apiCall).subscribe(
			(data : any) => {
				if(data.sucess) {
					this.media = { "valor" : data.valor, "data" : data.data};
					this.storage.set("mediaVento", this.media);
					console.log("media atual vinda por http");
				}
			}
		);
	}

	goToHistRicoDeVento(params){
		if (!params) params = {};
		this.navCtrl.push(HistRicoDeVentoPage);
	}goToVento(params){
		if (!params) params = {};
		this.navCtrl.push(VentoPage);
	}
}
