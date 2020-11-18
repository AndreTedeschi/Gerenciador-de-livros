import { Component, OnInit, OnDestroy } from '@angular/core';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent implements OnInit, OnDestroy {

    livros: Livro[] = [];
    private livrosSubscription: Subscription;

  constructor(public livroService: LivroService) { }

  ngOnInit(): void {
    this.livroService.getLivros();

    this.livrosSubscription = this.livroService.getListaDeLivrosAtualizadaObservable().subscribe(
    (livros: Livro[]) => {
      this.livros = livros;
    });

  }

  ngOnDestroy(): void{
    this.livrosSubscription.unsubscribe();
  }
    
}