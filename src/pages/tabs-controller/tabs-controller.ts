import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ChuvaPage } from '../chuva/chuva';
import { HistRicoDeChuvaPage } from '../hist-rico-de-chuva/hist-rico-de-chuva';
import { UmidadePage } from '../umidade/umidade';
import { HistRicoDeUmidadePage } from '../hist-rico-de-umidade/hist-rico-de-umidade';
import { PressOPage } from '../press-o/press-o';
import { HistRicoDePressOPage } from '../hist-rico-de-press-o/hist-rico-de-press-o';
import { LuminosidadePage } from '../luminosidade/luminosidade';
import { HistRicoDeLuminosidadePage } from '../hist-rico-de-luminosidade/hist-rico-de-luminosidade';
import { VentoPage } from '../vento/vento';
import { HistRicoDeVentoPage } from '../hist-rico-de-vento/hist-rico-de-vento';
import { TemperaturaPage } from '../temperatura/temperatura';

@Component({
  selector: 'page-tabs-controller',
  templateUrl: 'tabs-controller.html'
})
export class TabsControllerPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = TemperaturaPage;
  tab2Root: any = ChuvaPage;
  tab3Root: any = UmidadePage;
  tab4Root: any = PressOPage;
  tab5Root: any = LuminosidadePage;
  tab6Root: any = VentoPage;
  constructor(public navCtrl: NavController) {
  }
  goToChuva(params){
    if (!params) params = {};
    this.navCtrl.push(ChuvaPage);
  }goToHistRicoDeChuva(params){
    if (!params) params = {};
    this.navCtrl.push(HistRicoDeChuvaPage);
  }goToUmidade(params){
    if (!params) params = {};
    this.navCtrl.push(UmidadePage);
  }goToHistRicoDeUmidade(params){
    if (!params) params = {};
    this.navCtrl.push(HistRicoDeUmidadePage);
  }goToPressO(params){
    if (!params) params = {};
    this.navCtrl.push(PressOPage);
  }goToHistRicoDePressO(params){
    if (!params) params = {};
    this.navCtrl.push(HistRicoDePressOPage);
  }goToLuminosidade(params){
    if (!params) params = {};
    this.navCtrl.push(LuminosidadePage);
  }goToHistRicoDeLuminosidade(params){
    if (!params) params = {};
    this.navCtrl.push(HistRicoDeLuminosidadePage);
  }goToVento(params){
    if (!params) params = {};
    this.navCtrl.push(VentoPage);
  }goToHistRicoDeVento(params){
    if (!params) params = {};
    this.navCtrl.push(HistRicoDeVentoPage);
  }
}
