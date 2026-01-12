import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddModalClienteComponent } from './add-modal-cliente.component';

describe('AddModalClienteComponent', () => {
  let component: AddModalClienteComponent;
  let fixture: ComponentFixture<AddModalClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddModalClienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddModalClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
