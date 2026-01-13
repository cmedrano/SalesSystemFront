import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteModalProductComponent } from './delete-modal-product.component';

describe('DeleteModalProductComponent', () => {
  let component: DeleteModalProductComponent;
  let fixture: ComponentFixture<DeleteModalProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteModalProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteModalProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
