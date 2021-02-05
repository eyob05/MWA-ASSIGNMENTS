import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyComponentComponent } from './faculty-component.component';

describe('FacultyComponentComponent', () => {
  let component: FacultyComponentComponent;
  let fixture: ComponentFixture<FacultyComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacultyComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultyComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
