import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireFunctionsModule, FunctionsRegionToken } from '@angular/fire/functions';
import { HomeComponent } from './home/home.component';
import { AddComponent } from './add/add.component';
import { ShowComponent } from './show/show.component';

const fireConfig = {
  apiKey: 'AIzaSyCK64xqPbKoHXuiMXFeW2QGV31lnTd-zUw',
  authDomain: 'book-review-db482.firebaseapp.com',
  databaseURL: 'https://book-review-db482.firebaseio.com',
  projectId: 'book-review-db482',
  storageBucket: 'book-review-db482.appspot.com',
  messagingSenderId: '228212352330',
  appId: '1:228212352330:web:02151dbc6a6d88fefe8db3',
  measurementId: 'G-QNJX4D7NLG',
};

@NgModule({
  declarations: [AppComponent, HomeComponent, AddComponent, ShowComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatDividerModule,
    MatCardModule,
    MatListModule,
    AngularFireModule.initializeApp(fireConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireFunctionsModule,
  ],
  providers: [{ provide: FunctionsRegionToken, useValue: 'us-central1' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
