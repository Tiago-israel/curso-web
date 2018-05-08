import { Aluno } from './../models/aluno.model';
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map'

@Injectable()
export class AlunoService {

    private baseUrl: string = `https://api-cursos-si.herokuapp.com/api/alunos`;

    constructor(private http: Http) { }

    public buscarTodos(): Observable<Aluno[]> {
        return this.http.get(this.baseUrl).map(response => response.json());
    }

    public buscarPorId(id: number): Observable<Aluno> {
        return this.http.get(`${this.baseUrl}/${id}`).map(response => response.json());
    }

    public salvar(aluno: Aluno): Observable<Aluno> {
        return this.http.post(`${this.baseUrl}`, aluno).map(response => response.json());
    }

    public editar(aluno: Aluno, id: number): Observable<Aluno> {
        return this.http.put(`${this.baseUrl}/${id}`, aluno).map(response => response.json());
    }

    public excluir(id: number) {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }
}