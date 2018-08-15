import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HistRicoDeChuvaPage } from '../hist-rico-de-chuva/hist-rico-de-chuva';
import { DadosRemotosProvider } from '../../providers/dados-remotos/dados-remotos';
import { Storage } from '@ionic/storage';
import { Chuva } from '../../chuva.class';

@Component({
	selector: 'page-chuva',
	templateUrl: 'chuva.html'
})
export class ChuvaPage {
	// this tells the tabs component which Pages
	// should be each tab's root Page

	public atual: Chuva;
	public media: Chuva;
	public apiCall: string = "chuva";


	constructor(public navCtrl: NavController, public apiProvider: DadosRemotosProvider, public storage: Storage) {

		this.storage.get("atualChuva").then(
			(val) => {
				console.log("encontrou uma chuva atual em storage: ");
				console.log(val);
				if(typeof this.atual == 'undefined' && val != null){
					this.atual = val;
					console.log("chuva atual vinda por storage");
				}
			}
		);
		this.storage.get("mediaChuva").then(
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
					this.storage.set("atualChuva", this.atual);
					console.log("chuva atual vinda por http");
				}
			}
		);
		this.apiProvider.getMediaAtual(this.apiCall).subscribe(
			(data : any) => {
				if(data.sucess) {
					this.media = { "valor" : data.valor, "data" : data.data};
					this.storage.set("mediaChuva", this.media);
					console.log("media atual vinda por http");
				}
			}
		);
	}

	goToHistRicoDeChuva(params){
		if (!params) params = {};
		this.navCtrl.push(HistRicoDeChuvaPage);
	}goToChuva(params){
		if (!params) params = {};
		this.navCtrl.push(ChuvaPage);
	}
}
