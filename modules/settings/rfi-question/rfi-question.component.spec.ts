import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfiQuestionComponent } from './rfi-question.component';

describe('RfiQuestionComponent', () => {
  let component: RfiQuestionComponent;
  let fixture: ComponentFixture<RfiQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfiQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfiQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
