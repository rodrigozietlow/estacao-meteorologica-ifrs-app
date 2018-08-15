import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HistRicoDePressOPage } from '../hist-rico-de-press-o/hist-rico-de-press-o';
import { DadosRemotosProvider } from '../../providers/dados-remotos/dados-remotos';
import { Storage } from '@ionic/storage';
import { Pressao } from '../../pressao.class';

@Component({
	selector: 'page-press-o',
	templateUrl: 'press-o.html'
})
export class PressOPage {
	// this tells the tabs component which Pages
	// should be each tab's root Page

	public atual: Pressao;
	public media: Pressao;
	public apiCall: string = "pressao";


	constructor(public navCtrl: NavController, public apiProvider: DadosRemotosProvider, public storage: Storage) {

		this.storage.get("atualPressao").then(
			(val) => {
				console.log("encontrou uma Pressao atual em storage: ");
				console.log(val);
				if(typeof this.atual == 'undefined' && val != null){
					this.atual = val;
					console.log("Pressao atual vinda por storage");
				}
			}
		);
		this.storage.get("mediaPressao").then(
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
					this.storage.set("atualPressao", this.atual);
					console.log("Pressao atual vinda por http");
				}
			}
		);
		this.apiProvider.getMediaAtual(this.apiCall).subscribe(
			(data : any) => {
				if(data.sucess) {
					this.media = { "valor" : data.valor, "data" : data.data};
					this.storage.set("mediaPressao", this.media);
					console.log("media atual vinda por http");
				}
			}
		);
	}


	goToHistRicoDePressO(params){
		if (!params) params = {};
		this.navCtrl.push(HistRicoDePressOPage);
	}goToPressO(params){
		if (!params) params = {};
		this.navCtrl.push(PressOPage);
	}
}
