import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-authors',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent {
  authorId: string = '';
  author: any = null;
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  fetchAuthor() {
    if (!this.authorId) {
      this.errorMessage = 'Please enter an author ID';
      return;
    }

    this.http.get<any>(`/api/authors/${this.authorId}`).subscribe({
      next: (data) => {
        this.author = data;
        this.errorMessage = '';
      },
      error: () => {
        this.author = null;
        this.errorMessage = 'Author not found';
      }
    });
  }
}
