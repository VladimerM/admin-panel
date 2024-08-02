import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentCardTableComponent } from './agent-card-table.component';

describe('AgentCardTableComponent', () => {
  let component: AgentCardTableComponent;
  let fixture: ComponentFixture<AgentCardTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentCardTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgentCardTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
