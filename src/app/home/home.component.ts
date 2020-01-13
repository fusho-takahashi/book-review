import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private store: AngularFirestore, private fns: AngularFireFunctions, private afAuth: AngularFireAuth) {}

  message: string;
  data: any;

  ngOnInit() {
    this.message = 'wait ...';
    this.data = null;
    this.getBooks();
  }

  getBooks() {
    this.store
      .collection('books', (ref) => ref.orderBy('created', 'desc').limit(10))
      .valueChanges()
      .subscribe(
        (value) => {
          this.data = value;
          this.message = 'Book list.';
        },
        (error) => {
          // tslint:disable-next-line
          this.message = "(can't get data...)";
          this.data = null;
        },
      );
  }
}
