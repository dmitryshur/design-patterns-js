import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { SingletonTester, Singleton } from './patterns/singleton/singleton';

const singletonTest = SingletonTester.getInstance({
  pointX: 5,
});

const sin = new Singleton(10, 20);
sin.getInstance;

console.log(singletonTest.pointX);
registerServiceWorker();
