import { Component, OnInit, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Pokeapi } from '../../core/pokeapi/pokeapi'
import { MaterialModule } from '../../material/material.module'
import { TypeChip } from '../../shared/components/type-chip/type-chip'
import { Loader } from '../../shared/components/loader/loader'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule, MaterialModule, TypeChip, Loader],
  templateUrl: './pokemon-card.html',
  styleUrl: './pokemon-card.scss',
})
export class PokemonCard implements OnInit {
  pokemon = signal<any>(null)
  loading = signal(true)

  constructor(
    private pokeapi: Pokeapi,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  typeColors: Record<string, string> = {
    fire: '#EE8130',
    water: '#6390F0',
    grass: '#7AC74C',
    electric: '#F7D02C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
    normal: '#A8A77A',
  }

  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name')

    if (name) {
      this.loadPokemon(name)
    }
    else {
      this.loadRandomPokemon()
    }
  }

  loadPokemon(name: string) {
    this.loading.set(true)

    this.pokeapi.getPokemonByName(name).subscribe({
      next: res => {
        this.pokemon.set(res)
        this.loading.set(false)
      },
      error: () => this.loading.set(false),
    })
  }

  loadRandomPokemon() {
    this.loading.set(true)

    this.pokeapi.getRandomPokemon().subscribe({
      next: res => {
        this.pokemon.set(res)
        this.loading.set(false)
      },
    })
  }

  get bgColor() {
    const type = this.pokemon()?.types?.[0]?.type?.name
    return this.typeColors[type] || '#f5f5f5'
  }

  goBack() {
    this.router.navigate(['/pokedex'], {
      queryParams: {
        page: history.state?.page ?? 0
      }
    });
  }

}
