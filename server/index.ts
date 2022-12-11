import path from 'path';
import type {Request, Response} from 'express';
import express from 'express';
import session from 'express-session';
import logger from 'morgan';
import http from 'http';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import MongoStore from 'connect-mongo';
import * as accountValidator from './account/middleware';
import {accountRouter} from './account/router';
import {entryRouter} from './entry/router';
import {medicalContactRouter} from './medical-contact/router';
import {insuranceCardRouter} from './insurance/router';
import {medicationRouter} from './medication/router';

// Load environmental variables
dotenv.config({});

// Connect to mongoDB
const mongoConnectionUrl = process.env.MONGO_SRV?.replace('<password>', process.env.PASSWORD ?? '') ?? '';
if (!mongoConnectionUrl) {
  throw new Error('Please add the MongoDB connection SRV as \'MONGO_SRV\'');
}

const client = mongoose
  .connect(mongoConnectionUrl)
  .then(m => {
    console.log('Connected to MongoDB');
    return m.connection.getClient();
  })
  .catch(err => {
    console.error(`Error connecting to MongoDB: ${err.message as string}`);
    throw new Error(err.message);
  });

mongoose.connection.on('error', err => {
  console.error(err);
});

// Initialize an express app
const app = express();

// Set the port
app.set('port', process.env.PORT || 3000);

// Log requests in the terminal
app.use(logger('dev'));

// Parse incoming requests with JSON payloads ('content-type: application/json' in header)
app.use(express.json());

// Parse incoming requests with urlencoded payloads ('content-type: application/x-www-form-urlencoded' in header)
app.use(express.urlencoded({extended: false}));

// Initialize cookie session
// https://www.npmjs.com/package/express-session#options

// @ts-expect-error
const store = MongoStore.create({
  clientPromise: client,
  dbName: 'sessions',
  autoRemove: 'interval',
  autoRemoveInterval: 10 // Minutes
});
app.use(session({
  secret: '61040', // Should generate a real secret
  resave: true,
  saveUninitialized: false,
  store
}));

// This makes sure that if a user is logged in, they still exist in the database
app.use(accountValidator.isCurrentSessionAccountExists);

// Add routers from routes folder
app.use('/api/accounts', accountRouter);
app.use('/api/entries', entryRouter);
app.use('/api/medical-contacts', medicalContactRouter);
app.use('/api/insurance-cards', insuranceCardRouter);
app.use('/api/medications', medicationRouter);

const isProduction = process.env.NODE_ENV === 'production';
const vuePath = path.resolve(__dirname, '..', 'client', isProduction ? 'dist' : 'public');
app.use(express.static(vuePath));
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(vuePath, 'index.html'));
});

// Create server to listen to request at specified port
const server = http.createServer(app);
server.listen(app.get('port'), () => {
  console.log(`Express server running at http://localhost:${app.get('port') as number}`);
});
