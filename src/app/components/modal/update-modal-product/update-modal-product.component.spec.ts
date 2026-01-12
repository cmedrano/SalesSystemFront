import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateModalProductComponent } from './update-modal-product.component';

describe('UpdateModalProductComponent', () => {
  let component: UpdateModalProductComponent;
  let fixture: ComponentFixture<UpdateModalProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateModalProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateModalProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
