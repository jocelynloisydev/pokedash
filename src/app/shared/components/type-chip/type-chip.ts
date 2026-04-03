import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatChipsModule } from '@angular/material/chips'

@Component({
  selector: 'app-type-chip',
  standalone: true,
  imports: [CommonModule, MatChipsModule],
  templateUrl: './type-chip.html',
  styleUrl: './type-chip.scss',
})
export class TypeChip {
  @Input() type!: string

  get color(): string {
    const colors: Record<string, string> = {
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

    return colors[this.type] || '#777'
  }
}
