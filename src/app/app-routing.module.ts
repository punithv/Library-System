import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksComponent } from './components/books/books.component';
import { LoginComponent } from './components/login/login.component';
import { MybooksComponent } from './components/mybooks/mybooks.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthenticationService} from 'src/app/services/authentication.service';
import { AddbooksComponent } from './components/addbooks/addbooks.component';
import { EditBookComponent } from './components/edit-book/edit-book.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';


const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'allbooks',component:BooksComponent},
  {path:'mybooks',component:MybooksComponent},
  {path:'signup',component:SignupComponent},
  {path:'login',component:LoginComponent},
  {path:'addbooks',component:AddbooksComponent},
  { path: 'bookEdit/:id', component:EditBookComponent },
  { path: 'book/:id', component: BookDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
