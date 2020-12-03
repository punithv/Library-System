import { Injectable } from '@angular/core';
import { Books} from "src/app/modal/data";
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User} from 'src/app/modal/user';
import { login} from 'src/app/modal/login';





const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  Data:Books[];

  get_Api="https://y5e066ygx7.execute-api.ap-south-1.amazonaws.com/Library_Management/getallbooks"
  get_One_Api="https://y5e066ygx7.execute-api.ap-south-1.amazonaws.com/Library_Management/librarybooks?ID="
  put_Api="https://y5e066ygx7.execute-api.ap-south-1.amazonaws.com/Library_Management/librarybooks?ID="
  post_Api="https://y5e066ygx7.execute-api.ap-south-1.amazonaws.com/Library_Management/librarybooks"
  signIn_Api="https://y5e066ygx7.execute-api.ap-south-1.amazonaws.com/Library_Management/registration?Username="
  logIn_Api="https://y5e066ygx7.execute-api.ap-south-1.amazonaws.com/Library_Management/login?Username="
  delete_Api="https://y5e066ygx7.execute-api.ap-south-1.amazonaws.com/Library_Management/getallbooks?ID="




  constructor( public http:HttpClient) { }

  getBooks(){
    return this.http.get<Books[]>(this.get_Api).pipe(
      tap(books => this.log(`fetched books`)),
      catchError(this.handleError)
    );    
  }

  updateBooks(book:Books) {
    return this.http.put(this.put_Api+book.ID,book,httpOptions)
  }

 
  editBooks(book:Books){
    return this.updateBooks(book)
  }

  getBook(id: string) {
    const url = this.get_One_Api+id;
    return this.http.get<Books>(url)   
  }
 

  saveBook(book: Books) {
    return this.addBook(book);
  }

  addBook(book:Books){
    return this.http.post(this.post_Api,book,httpOptions);
  }

  deleteBook(book: Books | string) {
    const id = typeof book === 'string' ? book : book.ID;
    const url = this.delete_Api+id;

    return this.http.delete<Books>(url, httpOptions);
      

  }

  signUp(user:User){
    const url = this.signIn_Api+user.Username+"&"+"password"+user.password+"&"+"confirmpassword"+user.confirmpassword+"&"+"Email="+user.Email
    return this.http.post(url,httpOptions);

  }
  login(Login:login){
    const url = this.logIn_Api+Login.Username+"&"+"password"+Login.password
  
    return this.http.get<login>(url,httpOptions)

  }
  

  private handleError (error: any) {  
    console.error(error); 
    return Observable.throw(error);
  }

  /**
   * Common log
   * @param message
   */
  private log(message: string) {
    console.log(message);
  }

}