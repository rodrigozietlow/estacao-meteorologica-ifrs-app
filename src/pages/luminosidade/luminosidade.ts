import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HistRicoDeLuminosidadePage } from '../hist-rico-de-luminosidade/hist-rico-de-luminosidade';
import { DadosRemotosProvider } from '../../providers/dados-remotos/dados-remotos';
import { Storage } from '@ionic/storage';
import { Luminosidade } from '../../luminosidade.class';

@Component({
	selector: 'page-luminosidade',
	templateUrl: 'luminosidade.html'
})
export class LuminosidadePage {
	// this tells the tabs component which Pages
	// should be each tab's root Page

	public atual: Luminosidade;
	public media: Luminosidade;
	public apiCall: string = "luminosidade";


	constructor(public navCtrl: NavController, public apiProvider: DadosRemotosProvider, public storage: Storage) {

		this.storage.get("atualLuminosidade").then(
			(val) => {
				console.log("encontrou uma Luminosidade atual em storage: ");
				console.log(val);
				if(typeof this.atual == 'undefined' && val != null){
					this.atual = val;
					console.log("Luminosidade atual vinda por storage");
				}
			}
		);
		this.storage.get("mediaLuminosidade").then(
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
					this.storage.set("atualLuminosidade", this.atual);
					console.log("Luminosidade atual vinda por http");
				}
			}
		);
		this.apiProvider.getMediaAtual(this.apiCall).subscribe(
			(data : any) => {
				if(data.sucess) {
					this.media = { "valor" : data.valor, "data" : data.data};
					this.storage.set("mediaLuminosidade", this.media);
					console.log("media atual vinda por http");
				}
			}
		);
	}

	goToHistRicoDeLuminosidade(params){
		if (!params) params = {};
		this.navCtrl.push(HistRicoDeLuminosidadePage);
	}goToLuminosidade(params){
		if (!params) params = {};
		this.navCtrl.push(LuminosidadePage);
	}
}
