import { Component, signal, computed } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MaterialModule } from '../../material/material.module'
import { Pokeapi } from '../../core/pokeapi/pokeapi'
import { Loader } from '../../shared/components/loader/loader'
import { firstValueFrom } from 'rxjs'
import { Router } from '@angular/router'

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, MaterialModule, Loader],
  templateUrl: './pokemon-list.html',
  styleUrl: './pokemon-list.scss',
})
export class PokemonList {
  limit = 20

  page = signal(0)
  loading = signal(true)
  pokemons = signal<any[]>([])
  totalCount = signal(0)

  offset = computed(() => this.page() * this.limit)

  constructor(
    private pokeapi: Pokeapi,
    private router: Router
  ) {
    this.loadPage()
  }

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

  loadPage() {
    this.loading.set(true)

    this.pokeapi.getPokemonPage(this.limit, this.offset()).subscribe({
      next: res => {
        this.totalCount.set(res.count)

        // On récupère les détails de chaque Pokémon
        const requests = res.results.map((p: any) =>
          firstValueFrom(this.pokeapi.getPokemonByName(p.name))
        )

        Promise.all(requests).then(details => {
          this.pokemons.set(details)
          this.loading.set(false)
        })
      },
      error: () => this.loading.set(false),
    })
  }

  onPageChange(event: any) {
    this.page.set(event.pageIndex)
    this.loadPage()
  }

  getBgColor(p: any) {
    const type = p.types?.[0]?.type?.name
    return this.typeColors[type] || '#f5f5f5'
  }

  openPokemon(name: string) {
    this.router.navigate(['/pokemon', name])
  }
}

