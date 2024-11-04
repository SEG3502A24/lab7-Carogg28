import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthorsComponent } from './authors.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AuthorsComponent', () => {
  let component: AuthorsComponent;
  let fixture: ComponentFixture<AuthorsComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthorsComponent, HttpClientTestingModule] // AuthorsComponent is standalone
    }).compileComponents();

    fixture = TestBed.createComponent(AuthorsComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display author data when found', () => {
    component.authorId = '1';
    component.fetchAuthor();

    const req = httpTestingController.expectOne('/api/authors/1');
    req.flush({ name: 'John Doe', books: ['Book 1', 'Book 2'] });

    fixture.detectChanges();

    expect(component.author).toEqual({ name: 'John Doe', books: ['Book 1', 'Book 2'] });
    expect(component.errorMessage).toBe('');
  });

  it('should display error message when author is not found', () => {
    component.authorId = '999';
    component.fetchAuthor();

    const req = httpTestingController.expectOne('/api/authors/999');
    req.flush(null, { status: 404, statusText: 'Not Found' });

    fixture.detectChanges();

    expect(component.author).toBeNull();
    expect(component.errorMessage).toBe('Author not found');
  });
});
