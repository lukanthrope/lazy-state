# lazy-state

Lazy-state is a simple lightweight state-management library for React made for training purposes. It implements Observable pattern and can be used in small projects. Inspired by Redux.

## Getting started 

### Instalation

```
npm i lazy-state
```

### Create store

```javascript
import { createStore } from 'lazy-state';

const initialState = {
    count: 0,
}

const store = createStore(initialState);

export default store;

```

### Store usage

```javascript
import React, { useState } from 'react';
import store from '../store/store';

function Buttons() {
  const [state, setState] = useState(store.getState());
  store.subscribe(setState);
  // since 'state' is immutable we pass 'setState' to 'store.subscribe()'

  return (
    <>
      <button onClick={() => store.setState({ ...state, count: state.count + 1 })}>+ 1</button>
      <div>{state.count}</div>
      <button onClick={() => store.setState({ ...state, count: state.count - 1 })}>- 1</button>
    </>
  );
}

export default Buttons;

```

### Using reducers

```javascript
// store.js
import { createStore, combineReducers } from 'lazy-state';
import reducer1 from '../reducers/reducer';
import reducer2 from '../reducers/reducerInput';

const initialState = {
    count: 0,
}

// if you want to use one reducer use:
// const store = createStore(initialState, reducer1);

const store = createStore(initialState, combineReducers(reducer1, reducer2));

export default store;

// SomeComponent.js

import React, { useState } from 'react';
import store from './store';

function ButtonsWithReduce() {
  const [state, setState] = useState(store.getState());
  store.subscribe(setState);

  return (
    <>
      <button onClick={() => store.dispatch({ type: 'ADD_ONE' })}>+ 1</button>
      <div>{state.count}</div>
      <button onClick={() => store.dispatch({ type: 'TAKE_ONE' })}>- 1</button>
    </>
  );
}

export default ButtonsWithReduce;

```

#### Reducer example

Reducer is a pure function which takes state and action, then returns the new state depending on the action

```javascript
function reducer(state, action) {
  if (action.type === 'ADD_ONE')
    return {
        ...state,
        count: state.count + 1,
    }
  
  if (action.type === 'TAKE_ONE')
    return {
      ...state,
      count: state.count - 1,
    }

  return {
    ...state,
  }
}

export default reducer;
```