import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpService} from 'src/app/services/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService} from 'src/app/services/user.service';
import { Subscription } from 'rxjs';
import { Books } from 'src/app/modal/data';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit,OnDestroy {

  
  private sub: Subscription;
  errorMessage: string;
  book: Books = {
    ID: '',
    BookTitle: '',
    Cover: '',
    Author: '',
    Issued: false,
    Description: '',
    Rating: 0,
    RenewalDate: '',
    IssuedDate: '',
    Genre: '',
    Location: ''
  };

  constructor(private route: ActivatedRoute,
    private router: Router,
    private http: HttpService,
    private user: UserService) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(
      params => {
        const id = params['id'];
        this.getBook(id);
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  /**
   * Get Books
   * @param id
   */
  getBook(id: string) {
    this.http.getBook(id).subscribe(
      book => this.book = book,
      error => this.errorMessage = <any>error);
  }

}



