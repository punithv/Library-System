import { Component, OnInit } from '@angular/core';
import { HttpService} from 'src/app/services/http.service';
import { Books } from 'src/app/modal/data';
import { MatSnackBar } from '@angular/material';
import { Router} from '@angular/router';
import {  UserService} from 'src/app/services/user.service';
import { MatTableDataSource } from '@angular/material';


@Component({
  selector: 'app-mybooks',
  templateUrl: './mybooks.component.html',
  styleUrls: ['./mybooks.component.css']
})
export class MybooksComponent implements OnInit {
  bookList = null;
  dataSource = new MatTableDataSource<Books>(this.bookList);
  displayedColumns = ['ID', 'BookTitle', 'Cover', 'Author', 'Return', 'Renew', 'IssuedDate', 'RenewalDate'];
  errorMessage: string;
  isLoggedIn: boolean;
  isAdmin = false
  books:Books[];

  constructor( private http:HttpService,private router:Router,private snackBar:MatSnackBar,private user:UserService){}

  ngOnInit() {
    this.http.getBooks()
      .subscribe((books) => {
        this.bookList = books;
        this.dataSource.data = this.bookList;
        // this.dataSource.filter = this.user.getUserName();
        
      }
      );

    this.isLoggedIn = this.user.getUserLoggedIn();
    if (this.isLoggedIn && this.user.getUserName() === 'admin') {
      this.isAdmin = true;
    }
    console.log('books >>>>', this.bookList);
  }

 
  

 
  returnBook(books) {
    books.userName = '';
    const now = new Date();
    books.IssuedDate = '';
    books.Issued = false;
    books.RenewalDate = '';
    this.http.updateBooks(books)
      .subscribe(() => this.returned(books),
      (error: any) => this.errorMessage = <any>error
      );
  }

 
  renewBook(books, RenewalDate) {
    books.userName = this.user.getUserName();
    const now = new Date();
    books.Issued = true;
    console.log('renewDateTime', RenewalDate);
    books.renewDateTime = this.nextRenewalDate(new Date(RenewalDate), 15);
    this.http.updateBooks(books)
      .subscribe(() => this.renewed(books),
      (error: any) => this.errorMessage = <any>error
      );
  }

 
  renewed(books): void {
    this.snackBar.open('Renewed succesfully', 'Return', {
      duration: 2000,
    });
  }

 
  nextRenewalDate(theDate, days) {
    return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
  }


  
  returned(books): void {
    this.snackBar.open('Returned succesfully', 'Issue', {
      duration: 2000,
    });
    this.router.navigate(['/allbooks', books.ID]);
  }
}



