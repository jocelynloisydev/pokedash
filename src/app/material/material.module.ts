import { NgModule } from '@angular/core'

// Angular Material
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatChipsModule } from '@angular/material/chips'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatGridListModule } from '@angular/material/grid-list'

@NgModule({
  exports: [
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatProgressBarModule,
    MatIconModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatGridListModule,
  ],
})
export class MaterialModule {}
