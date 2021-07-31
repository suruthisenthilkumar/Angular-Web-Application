import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Loginlevel2Component } from './loginlevel2.component';

describe('Loginlevel2Component', () => {
  let component: Loginlevel2Component;
  let fixture: ComponentFixture<Loginlevel2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Loginlevel2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Loginlevel2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
