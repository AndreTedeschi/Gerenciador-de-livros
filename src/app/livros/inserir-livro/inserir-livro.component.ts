import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { LivroService } from '../livro.service';

@Component({
    selector: 'app-inserir-livro',
    templateUrl: './inserir-livro.component.html',
    styleUrls: ['./inserir-livro.component.css'],

})
export class InserirLivroComponent {
    constructor(public livroService: LivroService) {
    }

    onAdicionarLivro(form: NgForm) {
        if(form.invalid) return;
        this.livroService.adicionarLivro(
        form.value.titulo,
        form.value.autor,
        form.value.id,
        form.value.paginas
    );
    form.resetForm();

    }

}