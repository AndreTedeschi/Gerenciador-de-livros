import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import{ InserirLivroComponent } from './livros/inserir-livro/inserir-livro.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';


import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ListaLivrosComponent } from './livros/lista-livros/lista-livros.component';
import { MatExpansionModule } from '@angular/material/expansion';


@NgModule({
  declarations: [
    AppComponent,
    InserirLivroComponent,
    CabecalhoComponent,
    ListaLivrosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
