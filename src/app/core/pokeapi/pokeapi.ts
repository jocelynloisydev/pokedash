import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { map, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class Pokeapi {
  private readonly baseUrl = 'https://pokeapi.co/api/v2'

  constructor(private http: HttpClient) {}

  getPokemonCount(): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(`${this.baseUrl}/pokemon?limit=1`)
  }

  getPokemon(id: number) {
    console.log('➡️ Appel API getPokemon(', id, ')')
    return this.http.get<any>(`${this.baseUrl}/pokemon/${id}`).pipe(
      map(res => {
        console.log('⬅️ Réponse API getPokemon :', res)
        return res
      })
    )
  }

  getRandomPokemon() {
    const randomId = Math.floor(Math.random() * 898) + 1 // Génération 1 à 8
    console.log('🎲 ID aléatoire généré :', randomId)
    return this.getPokemon(randomId)
  }

  getPokemonPage(limit: number, offset: number) {
    return this.http.get<any>(`${this.baseUrl}/pokemon?limit=${limit}&offset=${offset}`)
  }

  getPokemonByName(name: string) {
    return this.http.get<any>(`${this.baseUrl}/pokemon/${name}`)
  }
}
