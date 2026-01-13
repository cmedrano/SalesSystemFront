import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateModalClienteComponent } from './update-modal-cliente.component';

describe('UpdateModalClienteComponent', () => {
  let component: UpdateModalClienteComponent;
  let fixture: ComponentFixture<UpdateModalClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateModalClienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateModalClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
