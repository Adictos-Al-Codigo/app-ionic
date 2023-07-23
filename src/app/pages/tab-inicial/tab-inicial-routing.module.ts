import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabInicialPage } from './tab-inicial.page';

const routes: Routes = [
  {
    path: '',
    component: TabInicialPage,
    children: [
      {
        path: 'cartelera',
        loadChildren: () => import('./../../pages/cartelera/cartelera.module').then( m => m.CarteleraPageModule)
      },
      {
        path: 'buscar',
        loadChildren: () => import('./../../pages/buscar/buscar.module').then( m => m.BuscarPageModule)
      },
      {
        path: 'cuenta',
        loadChildren: () => import('./../../pages/cuenta/cuenta.module').then( m => m.CuentaPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabInicialPageRoutingModule {}
