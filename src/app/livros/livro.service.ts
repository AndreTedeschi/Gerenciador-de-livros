import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

import { Livro } from './livro.model';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  constructor() { }

  private livros: Livro[] = [];

  private listaLivrosAtualizada = new Subject<Livro[]>();

  getLivros(): Livro[] {
    return [...this.livros];
  }
  adicionarLivro(titulo: string, autor: string, id:string, paginas: string):void {
    const livro: Livro = {
      titulo: titulo,
      autor: autor,
      id: id,
      paginas: paginas
    };
    this.livros.push(livro);

    this.listaLivrosAtualizada.next([...this.livros]);
  }

  getListaDeLivrosAtualizadaObservable(){
    return this.listaLivrosAtualizada.asObservable();
  }

}