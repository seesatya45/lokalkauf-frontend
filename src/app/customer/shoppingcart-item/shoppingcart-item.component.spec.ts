import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingcartItemComponent } from './shoppingcart-item.component';

describe('ShoppingcartItemComponent', () => {
  let component: ShoppingcartItemComponent;
  let fixture: ComponentFixture<ShoppingcartItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShoppingcartItemComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingcartItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
