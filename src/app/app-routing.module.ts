import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaLivrosComponent } from './livros/lista-livros/lista-livros.component';
import { InserirLivroComponent } from './livros/inserir-livro/inserir-livro.component';


const routes: Routes = [
  { path: '', component: InserirLivroComponent},
  { path: 'criar', component: InserirLivroComponent},
  { path: 'lista', component: ListaLivrosComponent},
  { path: 'editar/:idLivro', component: InserirLivroComponent },
  
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule{

}
