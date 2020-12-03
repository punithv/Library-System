import { Component, OnInit } from '@angular/core';
import { HttpService} from 'src/app/services/http.service';
import { Books } from 'src/app/modal/data';
import { MatSnackBar } from '@angular/material';
import { UserService} from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  book:Books[];
  books:Books[]=[];
  bookList=null;
  inCart=false;
  isLoggedIn: boolean;
  isAdmin = false;
  count=0;

  constructor( public http:HttpService,public snackBar:MatSnackBar,public user:UserService,private router: Router) {
   }
 
  
  

  ngOnInit() {
    this.getAllBooks();
    
  }
  getAllBooks(){
    this.http.getBooks().subscribe((books)=>{
        this.bookList=books;
        console.log(this.bookList)
    })
    this.isLoggedIn = this.user.getUserLoggedIn();
    console.log('this.user.getUserName() >>>>', this.user.getUserName());
    if (this.isLoggedIn && this.user.getUserName() === 'admin') {
      this.isAdmin = true;
    }
  }

  

  issueBook(book) {
    book.userName = this.user.getUserName();
    const now = new Date();
    book.IssuedDate = now;
    book.Issued = true;
    book.RenewalDate = this.nextRenewalDate(now, 15);
    this.http.updateBooks(book)
      .subscribe(() => this.issued(book)
      );

      console.log("issue"+this.book);      
  }



  issued(book) {
    this.snackBar.open('Issued succesfully', 'Return', {
      duration: 2000,
    });
   
  }

  nextRenewalDate(theDate, days) {
    return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
  }
  editBook(book) {
    this.router.navigate(['/bookEdit', book.ID]);
  }

}
