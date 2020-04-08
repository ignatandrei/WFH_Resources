import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidTableDataComponent } from './covid-table-data.component';

describe('CovidTableDataComponent', () => {
  let component: CovidTableDataComponent;
  let fixture: ComponentFixture<CovidTableDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CovidTableDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidTableDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
