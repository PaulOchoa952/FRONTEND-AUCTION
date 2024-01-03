import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialModalComponent } from './historial-modal.component';

describe('HistorialModalComponent', () => {
  let component: HistorialModalComponent;
  let fixture: ComponentFixture<HistorialModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HistorialModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistorialModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
