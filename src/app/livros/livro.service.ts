import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subject } from 'rxjs';

import { Livro } from './livro.model';

@Injectable({
  providedIn: 'root'
})
export class LivroService {
  constructor (private httpClient: HttpClient){ }

  private livros: Livro[] = [];

  private listaLivrosAtualizada = new Subject<Livro[]>();

  getLivros(): void {
    this.httpClient.get<{mensagem: string, livros: Livro[]}>(
      'http://localhost:3000/api/livros'
    ).subscribe((dados) => {
      this.livros = dados.livros
      this.listaLivrosAtualizada.next([...this.livros])
    } )
  }
  adicionarLivro(titulo: string, autor: string, id:string, paginas:string):void {
    const livro: Livro = {
      titulo: titulo,
      autor: autor,
      id: id,
      paginas: paginas
    };
    this.httpClient.post<{mensagem: string}>('http://localhost:3000/api/livros', livro).subscribe((dados) => {
      console.log(dados.mensagem)
      this.livros.push(livro);
      this.listaLivrosAtualizada.next([...this.livros])
    })
  }
  
  getListaDeLivrosAtualizadaObservable(){
    return this.listaLivrosAtualizada.asObservable();
  }

}