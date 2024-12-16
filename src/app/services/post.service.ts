import { inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import * as firebase from 'firebase/compat/app';
@Injectable({
  providedIn: 'root',
})
export class PostService {
  private afs = inject(AngularFirestore);
  constructor() {}
  getData() {
    return this.afs
      .collection('posts', (ref) =>
        ref.where('isFeatured', '==', true).limit(4)
      )
      .snapshotChanges()
      .pipe(
        map((action) => {
          return action.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, data };
          });
        })
      );
  }
  getLastestPosts() {
    return this.afs
      .collection('posts', (ref) => ref.orderBy('createAt', 'desc').limit(9))
      .snapshotChanges()
      .pipe(
        map((action) => {
          return action.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, data };
          });
        })
      );
  }
  getCategoryPost(catId: string) {
    return this.afs
      .collection('posts', (ref) => ref.where('category.id', '==', catId))
      .snapshotChanges()
      .pipe(
        map((action) => {
          return action.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, data };
          });
        })
      );
  }
  getOnePost(postId: string) {
    return this.afs.doc(`posts/${postId}`).valueChanges();
  }
  getSimilar(catId: string) {
    return this.afs
      .collection('posts', (ref) =>
        ref.where('category.id', '==', catId).limit(3)
      )
      .snapshotChanges()
      .pipe(
        map((action) => {
          return action.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, data };
          });
        })
      );
  }
  countViews(postId: string) {
    const viewsCount = {
      views: firebase.default.firestore.FieldValue.increment(1),
    };
    this.afs
      .doc(`posts/${postId}`)
      .update(viewsCount)
      .then(() => {
        console.log('Views Count Updated..!');
      });
  }
}
