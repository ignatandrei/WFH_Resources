import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidApiInfoComponent } from './covid-api-info.component';

describe('CovidApiInfoComponent', () => {
  let component: CovidApiInfoComponent;
  let fixture: ComponentFixture<CovidApiInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CovidApiInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidApiInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
