import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TypeChip } from './type-chip'

describe('TypeChip', () => {
  let component: TypeChip
  let fixture: ComponentFixture<TypeChip>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeChip],
    }).compileComponents()

    fixture = TestBed.createComponent(TypeChip)
    component = fixture.componentInstance
    await fixture.whenStable()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
