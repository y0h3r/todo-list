import { Firestore, getFirestore } from 'firebase-admin/firestore';
import { initializeApp, App, getApps } from 'firebase-admin/app';

export class FirestoreConnection {
  private static instance: FirestoreConnection;
  private firestore: Firestore;

  private constructor(app?: App) {
    const firebaseApp = app || this.initializeDefaultApp();
    this.firestore = getFirestore(firebaseApp);
  }

  public static getInstance(app?: App): FirestoreConnection {
    if (!FirestoreConnection.instance) {
      FirestoreConnection.instance = new FirestoreConnection(app);
    }
    return FirestoreConnection.instance;
  }

  public getFirestore(): Firestore {
    return this.firestore;
  }

  private initializeDefaultApp(): App {
    if (getApps().length === 0) {
      return initializeApp();
    }
    return getApps()[0];
  }
}
