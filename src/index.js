import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
//import { SingletonTester, Singleton } from './patterns/singleton/singleton';
//import { ObserverList, Subject, Observer, runNewExample } from './patterns/observer/observer_new';
import { runPubsubOld } from './patterns/pubsub/pubsub_old';
import { runPubsubNew, runPubsubNew2 } from './patterns/pubsub/pubsub_new';

// for observers example
//runNewExample();

// for pub/sub examples
//runPubsubNew();
runPubsubNew2();
registerServiceWorker();
