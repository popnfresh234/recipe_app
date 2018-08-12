import 'semantic-ui-less/semantic.less';
import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.jsx';


library.add( faPlusCircle );

require( '../styles/application.scss' );

ReactDOM.render( <Router><App /></Router>, document.getElementById( 'react-root' ) );
