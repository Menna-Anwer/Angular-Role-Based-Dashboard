import { Component, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TestBed } from '@angular/core/testing';
import { RoleDirective } from './role.directive';
import { RoleService } from '../../services/RoleService';
import { ROLE } from '../../module/roles-type';

@Component({
  imports: [RoleDirective],
  template: '<p *appRole="requiredRole()">Restricted demo content</p>',
})
class TestHost {
  requiredRole = signal<keyof typeof ROLE>('Admin');
}

describe('RoleDirective rendering', () => {
  function setup() {
    const fixture = TestBed.createComponent(TestHost);
    const roles = TestBed.inject(RoleService);
    fixture.detectChanges();
    return { fixture, roles, paragraphs: () => fixture.nativeElement.querySelectorAll('p') };
  }

  it('hides content until the selected role matches', () => {
    const { paragraphs } = setup();
    expect(paragraphs().length).toBe(0);
  });

  it('updates an existing view when the selected role changes', () => {
    const { fixture, roles, paragraphs } = setup();
    roles.setRole('Admin');
    fixture.detectChanges();
    expect(paragraphs().length).toBe(1);
    roles.setRole('User');
    fixture.detectChanges();
    expect(paragraphs().length).toBe(0);
    roles.setRole('Admin');
    fixture.detectChanges();
    expect(paragraphs().length).toBe(1);
  });

  it('keeps only one view when the same matching input is assigned twice', () => {
    const { fixture, roles, paragraphs } = setup();
    roles.setRole('Admin');
    const directive = fixture.debugElement.queryAllNodes(By.directive(RoleDirective))[0].injector.get(RoleDirective);
    directive.appRole = 'Admin';
    fixture.detectChanges();
    directive.appRole = 'Admin';
    fixture.detectChanges();
    expect(paragraphs().length).toBe(1);
  });

  it('does not append a second view when both roles change together', () => {
    const { fixture, roles, paragraphs } = setup();
    roles.setRole('Admin');
    fixture.detectChanges();
    fixture.componentInstance.requiredRole.set('User');
    roles.setRole('User');
    fixture.detectChanges();
    expect(paragraphs().length).toBe(1);
  });
});
