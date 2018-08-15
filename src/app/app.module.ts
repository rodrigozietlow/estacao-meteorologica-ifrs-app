import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { TabsControllerPage } from '../pages/tabs-controller/tabs-controller';
import { TemperaturaPage } from '../pages/temperatura/temperatura';
import { ChuvaPage } from '../pages/chuva/chuva';
import { UmidadePage } from '../pages/umidade/umidade';
import { PressOPage } from '../pages/press-o/press-o';
import { LuminosidadePage } from '../pages/luminosidade/luminosidade';
import { VentoPage } from '../pages/vento/vento';
import { HistRicoDeTemperaturaPage } from '../pages/hist-rico-de-temperatura/hist-rico-de-temperatura';
import { HistRicoDeChuvaPage } from '../pages/hist-rico-de-chuva/hist-rico-de-chuva';
import { HistRicoDeUmidadePage } from '../pages/hist-rico-de-umidade/hist-rico-de-umidade';
import { HistRicoDePressOPage } from '../pages/hist-rico-de-press-o/hist-rico-de-press-o';
import { HistRicoDeLuminosidadePage } from '../pages/hist-rico-de-luminosidade/hist-rico-de-luminosidade';
import { HistRicoDeVentoPage } from '../pages/hist-rico-de-vento/hist-rico-de-vento';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DadosRemotosProvider } from '../providers/dados-remotos/dados-remotos';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    TabsControllerPage,
    TemperaturaPage,
    ChuvaPage,
    UmidadePage,
    PressOPage,
    LuminosidadePage,
    VentoPage,
    HistRicoDeTemperaturaPage,
    HistRicoDeChuvaPage,
    HistRicoDeUmidadePage,
    HistRicoDePressOPage,
    HistRicoDeLuminosidadePage,
    HistRicoDeVentoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
	IonicStorageModule.forRoot(),
	HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsControllerPage,
    TemperaturaPage,
    ChuvaPage,
    UmidadePage,
    PressOPage,
    LuminosidadePage,
    VentoPage,
    HistRicoDeTemperaturaPage,
    HistRicoDeChuvaPage,
    HistRicoDeUmidadePage,
    HistRicoDePressOPage,
    HistRicoDeLuminosidadePage,
    HistRicoDeVentoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DadosRemotosProvider
  ]
})
export class AppModule {}
