// const createError = require( 'http-errors' );
const express = require( 'express' );
const path = require( 'path' );
const cookieParser = require( 'cookie-parser' );
const cookieSession = require( 'cookie-session' );
const logger = require( 'morgan' );
require( 'dotenv' ).config();
const indexRouter = require( './routes/index' );
const recipesRouter = require( './routes/recipes' );
const aws = require( 'aws-sdk' );


const app = express();

// view engine setup
app.set( 'views', path.join( __dirname, 'views' ) );
app.set( 'view engine', 'jade' );

app.use( logger( 'dev' ) );
app.use( express.json() );
app.use( express.urlencoded( { extended: false } ) );
app.use( cookieParser() );
app.use( express.static( path.join( __dirname, 'public' ) ) );

app.use( cookieSession( {
  name: 'session',
  secret: 'secret',
  maxAge: 24 * 60 * 60 * 1000,
} ) );

app.use( '/api', indexRouter );
app.use( '/api/recipes', recipesRouter );

// catch 404 and forward to error handler
// app.use( ( req, res, next ) => {
//   next( createError( 404 ) );
// } );

const s3 = new aws.S3( { accessKeyId: process.env.AWS_KEY, secretAccessKey: process.env.AWS_SECRET, region: 'us-west-2' } );
const params = { Bucket: 'big-cooking-recipe-images', Key: 'images/myimage.jpg', ContentType: 'image/jpeg' };
s3.getSignedUrl( 'putObject', params, ( err, url ) => {
  console.log( 'Your generated pre-signed URL is', url );
} );


module.exports = app;
