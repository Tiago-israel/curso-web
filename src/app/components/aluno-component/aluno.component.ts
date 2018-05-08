import { Aluno } from './../../models/aluno.model';
import { AlunoService } from './../../services/aluno.service';
import { Component, OnInit } from '@angular/core';

declare var $: any;
@Component({
    selector: 'aluno-app',
    templateUrl: './aluno.component.html',
    styleUrls: ['./aluno.component.css']
})
export class AlunoComponent implements OnInit {

    public alunos: Aluno[] = [];
    public aluno: Aluno = new Aluno();

    constructor(private alunoService: AlunoService) {

    }

    ngOnInit(): void {
        this.buscarAlunos();
    }

    prepararParaEditar(id: number) {
        this.buscarPorId(id);
        this.abrirModal();
    }

    public salvar(): void {
        this.alunoService.salvar(this.aluno).subscribe(aluno => {
            this.buscarAlunos();
            this.fecharModal();
            this.limparFormulario();
        });
    }

    public editar(): void {
        this.alunoService.editar(this.aluno, this.aluno.id).subscribe(aluno => {
            this.buscarAlunos();
            this.fecharModal();
            this.limparFormulario();
        });
    }

    public buscarAlunos(): void {
        this.alunoService.buscarTodos().subscribe(alunos => {
            this.alunos = alunos;
        });
    }

    public buscarPorId(id: number): void {
        this.alunoService.buscarPorId(id).subscribe(aluno => {
            this.aluno = aluno;
        });
    }

    public excluir(id: number): void {
        this.alunoService.excluir(id).subscribe(() => {
            this.buscarAlunos();
        });
    }

    public abrirModal() {
        $('#myModal').show();
    }

    public fecharModal() {
        $('#myModal').hide();
    }

    private limparFormulario(): void {
        this.aluno = new Aluno();
    }

}