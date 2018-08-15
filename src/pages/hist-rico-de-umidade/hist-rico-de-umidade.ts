import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UmidadePage } from '../umidade/umidade';
import { DadosRemotosProvider } from '../../providers/dados-remotos/dados-remotos';
import { Storage } from '@ionic/storage';
import { Umidade } from '../../umidade.class';


@Component({
	selector: 'page-hist-rico-de-umidade',
	templateUrl: 'hist-rico-de-umidade.html'
})
export class HistRicoDeUmidadePage {
	// this tells the tabs component which Pages
	// should be each tab's root Page

	public umidades : Umidade[];

	constructor(public navCtrl: NavController, public apiProvider: DadosRemotosProvider, public storage: Storage) {

		this.storage.get("historicoUmidade").then(
			(val) => {
				if((typeof this.umidades == 'undefined' || this.umidades.length == 0 ) && val != null){
					this.umidades = val;
				}
			}
		);
		this.buscar();
	}

	public buscar(){
		var x = this;
		this.apiProvider.getHistorico('umidade').subscribe(
			function (data: any) {
				if(data.sucess){
					x.umidades = data.valor;
					x.storage.set("historicoUmidades", data.valor);
				}
			}
		);
	}


	goToUmidade(params){
		if (!params) params = {};
		this.navCtrl.push(UmidadePage);
	}goToHistRicoDeUmidade(params){
		if (!params) params = {};
		this.navCtrl.push(HistRicoDeUmidadePage);
	}
}
