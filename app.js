// const createError = require( 'http-errors' );
const express = require( 'express' );
const path = require( 'path' );
const fileUpload = require( 'express-fileupload' );
const bodyParser = require( 'body-parser' );
const cookieParser = require( 'cookie-parser' );
const cookieSession = require( 'cookie-session' );
const logger = require( 'morgan' );
const indexRouter = require( './routes/index' );
const recipesRouter = require( './routes/recipes' );


const app = express();

// view engine setup
app.set( 'views', path.join( __dirname, 'views' ) );
app.set( 'view engine', 'jade' );

app.use( logger( 'dev' ) );
app.use( fileUpload() );
app.use( bodyParser.json() );
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


module.exports = app;
