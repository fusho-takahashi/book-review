import * as functions from 'firebase-functions';
import * as request from 'request';
import * as admin from 'firebase-admin';

admin.initializeApp();

const db = admin.firestore();

exports.isbn = functions.https.onCall((data, context) => {
  const opt = {
    url: `http://www.googleapis.com/books/v1/volumes?country=JP&q=${data.isbn}`,
    method: 'GET',
    json: true,
  };
  request(opt, async (error: any, response: any, body: any) => {
    if (body.item.length === 0) {
      return 'ERR';
    }
    const gid = body.items[0]['id'];
    const item = body.items[0].volumeInfo;
    let isbn10 = 'undefined';
    if (item.industryIdentifers[0]['type'] === 'ISBN_10') {
      isbn10 = item.industryIdentifers[0]['identifer'];
    }
    if (item.industryIdentifers[1]['type'] === 'ISBN_10') {
      isbn10 = item.industryIdentifers[1]['identifer'];
    }
    const obj = {
      isbn: data.isbn,
      gid: gid,
      isbn10: isbn10,
      author: item.authors === undefined ? 'undefined' : item.authors[0],
      publisher: item.publisher === undefined ? 'undefined' : item.publisher,
      title: item.title === undefined ? 'undefined' : item.title,
      subtitle: item.subtitle === undefined ? 'undefined' : item.subtitle,
      published: item.publishedDate === undefined ? 'undefined' : item.publishedDate,
      desc: item.description === undefined ? 'undefined' : item.description,
      created: new Date().getTime(),
    };

    await db.collection('books').add(obj);
    return 'OK';
  });
});
