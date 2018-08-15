import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LuminosidadePage } from '../luminosidade/luminosidade';
import { DadosRemotosProvider } from '../../providers/dados-remotos/dados-remotos';
import { Storage } from '@ionic/storage';
import { Luminosidade } from '../../luminosidade.class';

@Component({
	selector: 'page-hist-rico-de-luminosidade',
	templateUrl: 'hist-rico-de-luminosidade.html'
})
export class HistRicoDeLuminosidadePage {
	// this tells the tabs component which Pages
	// should be each tab's root Page

	public luminosidades: Luminosidade[];

	constructor(public navCtrl: NavController, public apiProvider: DadosRemotosProvider, public storage: Storage) {

		this.storage.get("historicoLuminosidade").then(
			(val) => {
				if((typeof this.luminosidades == 'undefined' || this.luminosidades.length == 0 ) && val != null){
					this.luminosidades = val;
				}
			}
		);
		this.buscar();
	}

	public buscar(){
		var x = this;
		this.apiProvider.getHistorico("luminosidade").subscribe(
			function (data: any) {
				if(data.sucess){
					x.luminosidades = data.valor;
					x.storage.set("historicoLuminosidade", data.valor);
				}
			}
		);
	}

	goToLuminosidade(params){
		if (!params) params = {};
		this.navCtrl.push(LuminosidadePage);
	}goToHistRicoDeLuminosidade(params){
		if (!params) params = {};
		this.navCtrl.push(HistRicoDeLuminosidadePage);
	}
}
