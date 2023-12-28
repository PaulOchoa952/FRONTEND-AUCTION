import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitSubastaModalComponent } from './initSubasta-modal.component';

describe('CarsModalComponent', () => {
  let component: InitSubastaModalComponent;
  let fixture: ComponentFixture<InitSubastaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InitSubastaModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InitSubastaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
