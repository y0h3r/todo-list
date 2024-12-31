import { initializeApp, getApps } from 'firebase-admin/app';
import * as functions from 'firebase-functions';
import 'module-alias/register';

import { server } from '@infrastructure/web/server';

if (!getApps().length) {
  initializeApp();
}

const application = server.getApp();
export const api = functions.https.onRequest(application);
