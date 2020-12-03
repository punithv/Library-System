import { Component, OnInit } from '@angular/core';
import { HttpService} from 'src/app/services/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Books } from 'src/app/modal/data';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  private sub: Subscription;
  errorMessage: string;
  book:Books;

  constructor(private http:HttpService,private router:Router,private route: ActivatedRoute,
    
    public snackBar: MatSnackBar) { }

  ngOnInit() {
    console.log('book edit ngOnInit');
    this.sub = this.route.params.subscribe(
      params => {
        const id = params['id'];
        this.getBook(id);
      }
    );
  }

   /**
   * Get Books
   * @param id
   */
  getBook(id: string): void {
    this.http.getBook(id)
      .subscribe(
       data=> this.book = data,
      
      (error: any) => this.errorMessage = <any>error);
     
  }

  /**
   * Save Book
   * @param book
   */
  saveBook(book): void {
    console.log('Author', this.book.Author);
    this.http.editBooks(book)
      .subscribe(
      () => this.onSaved(),
      (error: any) => this.errorMessage = <any>error
      );
  }

 
  onSaved(): void {
   
    this.router.navigate(['/allbooks']);
  }

 
  cancel(): void {
    this.router.navigate(['/allbooks']);
  }

  /**
   * Delete Book
   * @param book
   */
  delete(book): void {
    this.http.deleteBook(book)
      .subscribe(
      () => this.onDeleted(),
      (error: any) => this.errorMessage = <any>error
      );
  }

  /**
   * Called on deleted
   */
  onDeleted(): void {
    this.snackBar.open('Deleted succesfully ', this.book.ID, {
      duration: 2000,
    });
    this.router.navigate(['/allbooks']);
  
}
}
