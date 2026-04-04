import { Component, signal, computed } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MaterialModule } from '../../material/material.module'
import { Pokeapi } from '../../core/pokeapi/pokeapi'
import { Loader } from '../../shared/components/loader/loader'
import { firstValueFrom } from 'rxjs'

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

  constructor(private pokeapi: Pokeapi) {
    this.loadPage()
  }

  loadPage() {
    this.loading.set(true)

    this.pokeapi.getPokemonPage(this.limit, this.offset()).subscribe({
      next: res => {
        this.totalCount.set(res.count)

        // On récupère les détails de chaque Pokémon
        const requests = res.results.map((p: any) => firstValueFrom(this.pokeapi.getPokemonByName(p.name)))

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
}

