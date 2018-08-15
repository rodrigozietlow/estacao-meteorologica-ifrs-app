import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HistRicoDeUmidadePage } from '../hist-rico-de-umidade/hist-rico-de-umidade';
import { DadosRemotosProvider } from '../../providers/dados-remotos/dados-remotos';
import { Storage } from '@ionic/storage';
import { Umidade } from '../../umidade.class';

@Component({
	selector: 'page-umidade',
	templateUrl: 'umidade.html'
})
export class UmidadePage {
	// this tells the tabs component which Pages
	// should be each tab's root Page

	public atual: Umidade;
	public media: Umidade;
	public apiCall: string = "umidade";


	constructor(public navCtrl: NavController, public apiProvider: DadosRemotosProvider, public storage: Storage) {

		this.storage.get("atualUmidade").then(
			(val) => {
				console.log("encontrou uma Umidade atual em storage: ");
				console.log(val);
				if(typeof this.atual == 'undefined' && val != null){
					this.atual = val;
					console.log("Umidade atual vinda por storage");
				}
			}
		);
		this.storage.get("mediaUmidade").then(
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
					this.storage.set("atualUmidade", this.atual);
					console.log("Umidade atual vinda por http");
				}
			}
		);
		this.apiProvider.getMediaAtual(this.apiCall).subscribe(
			(data : any) => {
				if(data.sucess) {
					this.media = { "valor" : data.valor, "data" : data.data};
					this.storage.set("mediaUmidade", this.media);
					console.log("media atual vinda por http");
				}
			}
		);
	}

	goToHistRicoDeUmidade(params){
		if (!params) params = {};
		this.navCtrl.push(HistRicoDeUmidadePage);
	}goToUmidade(params){
		if (!params) params = {};
		this.navCtrl.push(UmidadePage);
	}
}
