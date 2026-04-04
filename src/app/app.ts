import { Component, signal } from '@angular/core'
import { RouterLink, RouterOutlet } from '@angular/router'
import { MaterialModule } from './material/material.module'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MaterialModule, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('pokedash')
}
