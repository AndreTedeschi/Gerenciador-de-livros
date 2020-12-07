import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, NgForm, Validators } from '@angular/forms';
import { LivroService } from '../livro.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Livro } from '../livro.model';
@Component({
  selector: 'app-inserir-livro',
  templateUrl: './inserir-livro.component.html',
  styleUrls: ['./inserir-livro.component.css'],
})
export class InserirLivroComponent implements OnInit{

  private modo: string = "criar";
  private idLivro: string;
  public livro: Livro;
  public estaCarregando: boolean = false;
  public form: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      titulo: new FormControl(null, {validators: [Validators.required]}),
      autor: new FormControl(null, {validators: [Validators.required]}),
      paginas: new FormControl (null, {validators: [Validators.required]})
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("idLivro")) {
        this.modo = "editar";
        this.idLivro = paramMap.get("idLivro");
        this.estaCarregando = true;
        this.livroService.getLivro(this.idLivro).subscribe(dadosLiv => {
          this.estaCarregando = false;
          this.livro = {
            id: dadosLiv._id,
            titulo: dadosLiv.titulo,
            autor: dadosLiv.autor,
            paginas: dadosLiv.paginas
          };

          this.form.setValue({
            titulo: this.livro.titulo,
            autor: this.livro.autor,
            paginas: this.livro.paginas
          })

          console.log(this.form);
        });
      }
      else {
        this.modo = "criar";
        this.idLivro = null;
      }
    });
  }
  constructor (
    public livroService: LivroService,
    public route: ActivatedRoute
  ){ }

  onSalvarLivro() {
    if (this.form.invalid) {
      return;
    }
    this.estaCarregando = true;
    if (this.modo === "criar") {
      this.livroService.adicionarLivro(
        this.form.value.titulo,
        this.form.value.autor,
        this.form.value.paginas
      );
    }
    else {
      this.livroService.atualizarLivro(
        this.idLivro,
        this.form.value.titulo,
        this.form.value.autor,
        this.form.value.paginas
      )
    }
    this.form.reset();
  }
}
