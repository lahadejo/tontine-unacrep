import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Portefeuilles } from './portefeuilles';

describe('Portefeuilles', () => {
  let component: Portefeuilles;
  let fixture: ComponentFixture<Portefeuilles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Portefeuilles],
    }).compileComponents();

    fixture = TestBed.createComponent(Portefeuilles);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
