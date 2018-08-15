import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { VentoPage } from '../vento/vento';
import { DadosRemotosProvider } from '../../providers/dados-remotos/dados-remotos';
import { Storage } from '@ionic/storage';
import { Vento } from '../../vento.class';

@Component({
	selector: 'page-hist-rico-de-vento',
	templateUrl: 'hist-rico-de-vento.html'
})
export class HistRicoDeVentoPage {
	// this tells the tabs component which Pages
	// should be each tab's root Page

	public ventos : Vento[];

	constructor(public navCtrl: NavController, public apiProvider: DadosRemotosProvider, public storage: Storage) {

		this.storage.get("historicoVento").then(
			(val) => {
				if((typeof this.ventos == 'undefined' || this.ventos.length == 0 ) && val != null){
					this.ventos = val;
				}
			}
		);
		this.buscar();
	}

	public buscar(){
		var x = this;
		this.apiProvider.getHistorico('vento').subscribe(
			function (data: any) {
				if(data.sucess){
					x.ventos = data.valor;
					x.storage.set("historicoVento", data.valor);
				}
			}
		);
	}

	goToVento(params){
		if (!params) params = {};
		this.navCtrl.push(VentoPage);
	}goToHistRicoDeVento(params){
		if (!params) params = {};
		this.navCtrl.push(HistRicoDeVentoPage);
	}
}
