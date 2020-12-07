import { Component, OnInit, OnDestroy } from '@angular/core';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';
import { Subscription, Observable } from 'rxjs';
@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css'],
})
export class ListaLivrosComponent implements OnInit, OnDestroy {


  livros: Livro[] = [];
  private livrosSubscription: Subscription;
  public estaCarregando: boolean = false;
  constructor(public livroService: LivroService) {

  }

  ngOnInit(): void {
    this.estaCarregando = true;
    this.livroService.getLivros();
    this.livrosSubscription = this.livroService
      .getListaDeLivrosAtualizadaObservable()
      .subscribe((livros: Livro[]) => {
        this.estaCarregando = false;
        this.livros = livros;
      });
  }

  onDelete (id: string){
    this.livroService.removerLivro(id);
  }

  ngOnDestroy(): void {
    this.livrosSubscription
  }
}
