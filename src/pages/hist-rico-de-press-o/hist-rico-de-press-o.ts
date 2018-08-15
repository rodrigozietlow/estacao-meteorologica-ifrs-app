import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PressOPage } from '../press-o/press-o';
import { DadosRemotosProvider } from '../../providers/dados-remotos/dados-remotos';
import { Storage } from '@ionic/storage';
import { Pressao } from '../../pressao.class';

@Component({
	selector: 'page-hist-rico-de-press-o',
	templateUrl: 'hist-rico-de-press-o.html'
})
export class HistRicoDePressOPage {
	// this tells the tabs component which Pages
	// should be each tab's root Page

	public pressoes: Pressao[];

	constructor(public navCtrl: NavController, public apiProvider: DadosRemotosProvider, public storage: Storage) {

		this.storage.get("historicoPressao").then(
			(val) => {
				if((typeof this.pressoes == 'undefined' || this.pressoes.length == 0 ) && val != null){
					this.pressoes = val;
				}
			}
		);
		this.buscar();
	}

	public buscar(){
		var x = this;
		this.apiProvider.getHistorico("pressao").subscribe(
			function (data: any) {
				if(data.sucess){
					x.pressoes = data.valor;
					x.storage.set("historicoPressao", data.valor);
				}
			}
		);
	}

	goToPressO(params){
		if (!params) params = {};
		this.navCtrl.push(PressOPage);
	}goToHistRicoDePressO(params){
		if (!params) params = {};
		this.navCtrl.push(HistRicoDePressOPage);
	}
}
