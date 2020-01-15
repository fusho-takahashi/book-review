import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss'],
})
export class ShowComponent implements OnInit {
  constructor(private route: ActivatedRoute, private afAuth: AngularFireAuth, private store: AngularFirestore) {
    const param = route.snapshot.paramMap;
    this.isbn = param.get('params');
  }

  isbn: string;
  data: any;
  comments: any;
  key: string;
  message = 'wait...';
  comment: string;

  ngOnInit() {
    this.getBook();
  }

  getBook() {
    this.store
      .collection('books', (ref) => ref.where('isbn', '==', this.isbn))
      .snapshotChanges()
      .subscribe(
        (value) => {
          if (value[0] === undefined) {
            // tslint:disable-next-line
            this.message = "(can't get data...)";
            this.data = null;
            return;
          }
          this.key = value[0].payload.doc.id;
          this.data = value[0].payload.doc.data;
          this.message = 'Book data';
          this.getComments();
        },
        (error) => {
          // tslint:disable-next-line
          this.message = "(can't get data ...)";
          this.data = null;
        },
      );
  }

  getComments() {
    this.store
      .collection('books')
      .doc(this.key)
      .collection('comments', (ref) => ref.orderBy('posted', 'desc').limit(30))
      .valueChanges()
      .subscribe(
        (value) => {
          this.comments = value;
        },
        (error) => {
          this.comments = null;
        },
      );
  }

  addComment() {
    const name = this.afAuth.auth.currentUser.displayName;
    const obj = {
      name,
      comment: this.comment,
      posted: new Date().getTime(),
    };
    this.store
      .collection('books')
      .doc(this.key)
      .collection('comments')
      .add(obj);
    this.comment = '';
  }
}
