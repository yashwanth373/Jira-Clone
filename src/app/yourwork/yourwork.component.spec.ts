import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourworkComponent } from './yourwork.component';

describe('YourworkComponent', () => {
  let component: YourworkComponent;
  let fixture: ComponentFixture<YourworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YourworkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YourworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
