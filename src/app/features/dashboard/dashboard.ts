import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatCardModule } from '@angular/material/card'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { Pokeapi } from '../../core/pokeapi/pokeapi'

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatProgressBarModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  pokemonCount: number | null = null
  loading = true

  constructor(private pokeapi: Pokeapi) {}

  ngOnInit() {
    this.pokeapi.getPokemonCount().subscribe({
      next: res => {
        this.pokemonCount = res.count
        this.loading = false
      },
      error: () => {
        this.loading = false
      },
    })
  }
}
