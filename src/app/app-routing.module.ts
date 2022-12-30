import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RelatoriosComponent } from './relatorios/relatorios.component';
import { NovoRelatorioComponent } from './novo-relatorio/novo-relatorio.component';

const routes: Routes = [
  { path: 'relatorios', component: RelatoriosComponent },
  { path: 'novo', component: NovoRelatorioComponent },
  { path: '',   redirectTo: '/relatorios', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
