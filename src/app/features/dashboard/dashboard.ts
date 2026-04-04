import { Component, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Pokeapi } from '../../core/pokeapi/pokeapi'
import { PokemonCard } from '../pokemon-card/pokemon-card'
import { MaterialModule } from '../../material/material.module'

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MaterialModule, PokemonCard],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  pokemonCount = signal<number | null>(null)
  loading = signal(true)

  constructor(private pokeapi: Pokeapi) {
    this.loadCount()
  }

  loadCount() {
    this.loading.set(true)

    this.pokeapi.getPokemonCount().subscribe({
      next: res => {
        this.pokemonCount.set(res.count)
        this.loading.set(false)
      },
      error: () => {
        this.loading.set(false)
      },
    })
  }
}
