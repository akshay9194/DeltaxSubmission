import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImdbMainComponent } from './imdb-main.component';

describe('ImdbMainComponent', () => {
  let component: ImdbMainComponent;
  let fixture: ComponentFixture<ImdbMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImdbMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImdbMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
