import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { SingletonTester, Singleton } from './patterns/singleton/singleton';
import { ObserverList, Subject, Observer, runNewExample } from './patterns/observer/observer_new';

// for observers example
runNewExample();
registerServiceWorker();
