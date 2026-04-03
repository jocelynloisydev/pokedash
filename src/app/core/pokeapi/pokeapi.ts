import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class Pokeapi {
  private readonly baseUrl = 'https://pokeapi.co/api/v2'

  constructor(private http: HttpClient) {}

  getPokemonCount(): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(`${this.baseUrl}/pokemon?limit=1`)
  }
}
