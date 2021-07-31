import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfiansComponent } from './rfians.component';

describe('RfiansComponent', () => {
  let component: RfiansComponent;
  let fixture: ComponentFixture<RfiansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfiansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfiansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
