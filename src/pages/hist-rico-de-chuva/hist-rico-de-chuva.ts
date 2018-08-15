import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ChuvaPage } from '../chuva/chuva';
import { DadosRemotosProvider } from '../../providers/dados-remotos/dados-remotos';
import { Storage } from '@ionic/storage';
import { Chuva } from '../../chuva.class';

@Component({
	selector: 'page-hist-rico-de-chuva',
	templateUrl: 'hist-rico-de-chuva.html'
})
export class HistRicoDeChuvaPage {
	// this tells the tabs component which Pages
	// should be each tab's root Page

	public chuvas: Chuva[];

	constructor(public navCtrl: NavController, public apiProvider: DadosRemotosProvider, public storage: Storage) {

		this.storage.get("historicoChuva").then(
			(val) => {
				if((typeof this.chuvas == 'undefined' || this.chuvas.length == 0 ) && val != null){
					this.chuvas = val;
				}
			}
		);
		this.buscar();
	}

	public buscar(){
		var x = this;
		this.apiProvider.getHistorico("chuva").subscribe(
			function (data: any) {
				if(data.sucess){
					x.chuvas = data.valor;
					x.storage.set("historicoChuva", data.valor);
				}
			}
		);
	}

	goToChuva(params){
		if (!params) params = {};
		this.navCtrl.push(ChuvaPage);
	}goToHistRicoDeChuva(params){
		if (!params) params = {};
		this.navCtrl.push(HistRicoDeChuvaPage);
	}
}
