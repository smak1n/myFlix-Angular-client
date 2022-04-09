import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUserFormComponent } from './delete-user-form.component';

describe('DeleteUserFormComponent', () => {
  let component: DeleteUserFormComponent;
  let fixture: ComponentFixture<DeleteUserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteUserFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
