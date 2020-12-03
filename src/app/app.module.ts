import { BrowserModule } from '@angular/platform-browser';
import { NgModule,NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BooksComponent } from './components/books/books.component';
import {MatBadgeModule} from '@angular/material/badge';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {StyleUtils,StylesheetMap,MediaMarshaller,ɵMatchMedia,BreakPointRegistry,PrintHook,LayoutStyleBuilder,FlexStyleBuilder,ShowHideStyleBuilder,LayoutAlignStyleBuilder,LayoutGapStyleBuilder,FlexLayoutModule} from "@angular/flex-layout";
import { MybooksComponent } from './components/mybooks/mybooks.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import{ UserService} from 'src/app/services/user.service';
import {AuthenticationService} from 'src/app/services/authentication.service';
import { Ng2Webstorage} from 'ngx-webstorage';
import { AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from 'angular4-social-login';
import { SocialLoginModule } from 'angular4-social-login';
import { AddbooksComponent } from './components/addbooks/addbooks.component';
import { MatTableModule} from '@angular/material/table';
import { EditBookComponent } from './components/edit-book/edit-book.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { RatingModule } from 'ng2-rating';



const config = new AuthServiceConfig([

]);







@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BooksComponent,
    MybooksComponent,
    LoginComponent,
    SignupComponent,
    AddbooksComponent,
    EditBookComponent,
    BookDetailsComponent,
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatBadgeModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatTableModule,
    Ng2Webstorage,
    RatingModule,
    SocialLoginModule.initialize(config),
   
  ],
  providers: [StyleUtils,StylesheetMap,MediaMarshaller,ɵMatchMedia,BreakPointRegistry,PrintHook,LayoutStyleBuilder,FlexStyleBuilder,ShowHideStyleBuilder,LayoutAlignStyleBuilder,LayoutGapStyleBuilder,FlexLayoutModule,AuthenticationService,UserService],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
