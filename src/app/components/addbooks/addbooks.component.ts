import { Component, OnInit } from '@angular/core';
import { HttpService} from 'src/app/services/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Books } from 'src/app/modal/data';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-addbooks',
  templateUrl: './addbooks.component.html',
  styleUrls: ['./addbooks.component.css']
})
export class AddbooksComponent implements OnInit {

  constructor(private http:HttpService,private router:Router) { }

  private sub: Subscription;
  errorMessage: string;
  book: Books = {
    ID:" ",
    BookTitle:" ",
    Cover: " ",
    Author:" ",
    Issued: false,
    Description:" ",
    Rating: 0,
    RenewalDate: "15-10-2020",
    IssuedDate:"1-10-2020",
    Genre:" ",
    Location:" "
  };
  

  ngOnInit() {
  }
  addBook(book) {
    this.http.saveBook(book)
      .subscribe(
      () => this.onAdded(),
      (error: any) => this.errorMessage = <any>error
      );
  }
  onAdded(): void {
    this.router.navigate(['/allbooks']);
  }

}
