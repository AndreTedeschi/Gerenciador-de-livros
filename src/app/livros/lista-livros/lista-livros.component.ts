import { Component, OnInit, Input } from '@angular/core';
import { Livro } from '../livro.model';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent implements OnInit {

  /**livros = [
    {
    titulo: 'A Cabana',
    autor: 'André',
    id: '1@email.com',
    paginas:'400'
    },
    {
      titulo: 'Harry Potter',
      autor: 'J.K.',
      id: '2',
      paginas:'500'
    },
    ];*/

     @Input() livros: Livro[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
