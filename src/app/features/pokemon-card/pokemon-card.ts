import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Pokeapi } from '../../core/pokeapi/pokeapi'
import { MaterialModule } from '../../material/material.module'
import { TypeChip } from '../../shared/components/type-chip/type-chip'
import { Loader } from '../../shared/components/loader/loader'

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule, MaterialModule, TypeChip, Loader],
  templateUrl: './pokemon-card.html',
  styleUrl: './pokemon-card.scss',
})
export class PokemonCard implements OnInit {
  pokemon: any = null
  loading = true

  constructor(private pokeapi: Pokeapi) {}

  ngOnInit(): void {
    this.loadRandomPokemon()
  }

  loadRandomPokemon() {
    this.loading = true
    this.pokeapi.getRandomPokemon().subscribe({
      next: res => {
        this.pokemon = res
        this.loading = false
      },
      error: () => {
        this.loading = false
      },
    })
  }
}
