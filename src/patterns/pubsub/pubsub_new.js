class Pubsub {
  constructor() {
    this.topics = {};
    this.subUid = -1;
  }

  publish(topic, args) {
    if (!this.topics[topic]) {
      return false;
    }

    const subscribers = this.topics[topic];
    subscribers.forEach(subscriber => {
      subscriber.func(topic, args);
    });

    return this;
  }

  subscribe(topic, func) {
    if (!this.topics[topic]) {
      this.topics[topic] = [];
    }

    this.subUid += 1;
    const token = this.subUid.toString();
    this.topics[topic].push({
      token,
      func,
    });

    return token;
  }

  unsubscribe(token) {
    for (let m in this.topics) {
      if (this.topics[m]) {
        for (let i = 0, j = this.topics[m].length; i < j; i++) {
          if (this.topics[m][i].token === token) {
            this.topics[m].splice(i, 1);
            return token;
          }
        }
      }
    }
    return this;
  }
}

function runPubsubNew() {
  // Another simple message handler

  // A simple message logger that logs any topics and data received through our
  // subscriber
  const messageLogger = (topics, data) => {
    console.log(`Logging: ${topics}: ${data}`);
  };

  const pubsub = new Pubsub();
  // Subscribers listen for topics they have subscribed to and
  // invoke a callback function (e.g messageLogger) once a new
  // notification is broadcast on that topic
  const subscription = pubsub.subscribe('inbox/newMessage', messageLogger);

  // Publishers are in charge of publishing topics or notifications of
  // interest to the application. e.g:

  pubsub.publish('inbox/newMessage', 'hello world!');

  // or
  pubsub.publish('inbox/newMessage', ['test', 'a', 'b', 'c']);

  // or
  pubsub.publish('inbox/newMessage', {
    sender: 'hello@google.com',
    body: 'Hey again!',
  });

  // We can also unsubscribe if we no longer wish for our subscribers
  // to be notified
  pubsub.unsubscribe(subscription);

  // Once unsubscribed, this for example won't result in our
  // messageLogger being executed as the subscriber is
  // no longer listening
  pubsub.publish('inbox/newMessage', 'Hello! are you still there?');
}

function runPubsubNew2() {
  const pubsub = new Pubsub();

  const getCurrentTime = () => {
    const date = new Date();
    const m = date.getMonth() + 1;
    const d = date.getDate();
    const y = date.getFullYear();
    const t = date.toLocaleTimeString().toLowerCase();

    return `${m}/${d}/${y} ${t}`;
  };

  const addGridRow = data => {
    console.log(`updated grid component with: ${data}`);
  };

  const updateCounter = data => {
    console.log(`data last updated at: ${getCurrentTime()} with ${data}`);
  };

  const gridUpdate = (topic, data) => {
    if (data !== undefined) {
      addGridRow(data);
      updateCounter(data);
    }
  };

  const subscriber = pubsub.subscribe('newDataAvailable', gridUpdate);

  pubsub.publish('newDataAvailable', {
    summary: 'Apple made 5 billion',
    identifier: 'APPL',
    stockPrice: 570.91,
  });

  setTimeout(() => {
    pubsub.publish('newDataAvailable', {
      summary: 'Microsoft made 20 million',
      identifier: 'MSFT',
      stockPrice: 30.95,
    });
  }, 2000);
}
export { runPubsubNew, runPubsubNew2 };
