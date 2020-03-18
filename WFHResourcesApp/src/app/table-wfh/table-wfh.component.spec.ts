import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableWFHComponent } from './table-wfh.component';

describe('TableWFHComponent', () => {
  let component: TableWFHComponent;
  let fixture: ComponentFixture<TableWFHComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableWFHComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableWFHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
