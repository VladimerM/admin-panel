import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentCardFilterComponent } from './agent-card-filter.component';

describe('AgentCardFilterComponent', () => {
  let component: AgentCardFilterComponent;
  let fixture: ComponentFixture<AgentCardFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentCardFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgentCardFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
