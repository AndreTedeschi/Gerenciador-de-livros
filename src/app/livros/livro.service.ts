import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { Livro } from './livro.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  private livros: Livro[] = [];
  private listaLivrosAtualizada = new Subject<Livro[]>();

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) {

  }

  adicionarLivro( titulo: string, autor: string, paginas: string): void {
    const livro: Livro = {
      id: null,
      titulo: titulo,
      autor: autor,
      paginas: paginas
    };
    this.httpClient.post<{ mensagem: string, id: string }>(
      'http://localhost:3000/api/livros',
      livro
    ).subscribe((dados) => {
      console.log(dados.mensagem)
      livro.id = dados.id;
      this.livros.push(livro);
      this.listaLivrosAtualizada.next([...this.livros]);
      this.router.navigate(['/lista']);
    })
  }

  atualizarLivro(id: string, titulo: string, autor: string, paginas: string) {
    const livro: Livro = { id, titulo, autor, paginas };
    this.httpClient.put(`http://localhost:3000/api/livros/${id}`, livro)
      .subscribe((res => {
        const copia = [...this.livros];
        const indice = copia.findIndex(liv => liv.id === livro.id);
        copia[indice] = livro;
        this.livros = copia;
        this.listaLivrosAtualizada.next([...this.livros]);
        this.router.navigate(['/lista']);
      }));
  }

  removerLivro (id: string): void{
    this.httpClient.delete(`http://localhost:3000/api/livros/${id}`)
    .subscribe(() => {
      console.log ("Remoção feita com sucesso")
      this.livros = this.livros.filter((liv) =>{
        return liv.id !== id
      })
      this.listaLivrosAtualizada.next([...this.livros]);
      this.router.navigate(['/lista']);
    });
  }

  getLivro(idLivro: string) {
    return this.httpClient.get<{
      _id: string, titulo: string, autor: string, paginas: string
    }>(`http://localhost:3000/api/livros/${idLivro}`);
  }

  getLivros(): void {
    this.httpClient.get<{mensagem : string, livros: any}>(
      'http://localhost:3000/api/livros'
    )
    .pipe(map((dados) => {
      return dados.livros.map(liv => {
        return {
          id: liv._id,
          titulo: liv.titulo,
          autor: liv.autor,
          paginas: liv.paginas
        }
      })
    }))
    .subscribe((livros) => {
      this.livros = livros
      this.listaLivrosAtualizada.next([...this.livros])
    })
  }

  getListaDeLivrosAtualizadaObservable() {
    return this.listaLivrosAtualizada.asObservable();
  }



}
