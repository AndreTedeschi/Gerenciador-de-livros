import { Component, Output, EventEmitter } from '@angular/core';
import { Livro } from '../livro.model';

@Component({
    selector: 'app-inserir-livro',
    templateUrl: './inserir-livro.component.html',
    styleUrls: ['./inserir-livro.component.css'],

})
export class InserirLivroComponent {
    @Output() livroAdicionado = new EventEmitter<Livro>();
    titulo: string;
    autor: string;
    id: string;
    paginas: string;

    onAdicionarLivro() {
        const livro: Livro = {
            titulo: this.titulo,
            autor: this.autor,
            id: this.id,
            paginas: this.paginas
            };
            this.livroAdicionado.emit(livro);


        }

}