import { initializeApp, credential } from 'firebase-admin'

var serviceAccount = require("poli-huellas-app-firebase-adminsdk-gcr7u-36dd217ecc.json")

export const adminApp = initializeApp({
  credential: credential.cert(serviceAccount)
});
