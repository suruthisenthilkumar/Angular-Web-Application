import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignTesterComponent } from './assign-tester.component';

describe('AssignTesterComponent', () => {
  let component: AssignTesterComponent;
  let fixture: ComponentFixture<AssignTesterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignTesterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
