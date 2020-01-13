import { Component, NgZone, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'book-review';

  constructor(private router: Router, private afAuth: AngularFireAuth, private ngZone: NgZone) {}

  ngOnInit() {
    this.afAuth.auth.onAuthStateChanged((user) => {
      this.ngZone.run(() => {
        this.router.navigate(['']);
      });
    });
  }

  loginCheck() {
    if (this.currentUser === '(not logined.)') {
      this.login();
    } else {
      if (confirm('Are you logout now?')) {
        this.logout();
      }
    }
  }

  login() {
    const provider = new firebase.auth.GoogleAuthProvider();
    this.afAuth.auth.signInWithRedirect(provider);
  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['']);
  }

  get currentUser() {
    return this.afAuth.auth !== null
      ? this.afAuth.auth.currentUser !== null
        ? this.afAuth.auth.currentUser.displayName
        : '(not logined.)'
      : '(not logined.)';
  }
}
