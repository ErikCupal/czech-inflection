# withDerivedProps

[![Build Status](https://travis-ci.org/surglogs/with-derived-props.svg?branch=master)](https://travis-ci.org/surglogs/with-derived-props)

withDerivedProps is a [Higher Order Component](https://reactjs.org/docs/higher-order-components.html) that allows to derive new data from existing props in a succint manner and memoize them automatically. If it reminds you of [`withPropsOnChange`](https://github.com/acdlite/recompose/blob/master/docs/API.md#withpropsonchange) HOC from [`recompose`](https://github.com/acdlite/recompose), you are right - we based this HOC on it. We adjusted the API for most common usecases to be easier and safer to use. We have also written guidelines that tell you when and why to use it.

## Instalation

`npm i @surglogs/with-derived-props recompose`

## What is this library good for?

> Since this library is basically an alternative to [`reselect`](https://github.com/reduxjs/reselect) library, our examples are based on the reselect examples, so that you can compare them visually.

### Todo list example

Let's say we have a list of todos stored in the [`redux`](https://redux.js.org/) store and now we need to filter the todos by their state (complete or active) and show them to the user.

Our first try might look something like this: (to see the whole code please look [here](https://redux.js.org/recipes/computing-derived-data))

```js
import { connect } from 'react-redux'
import { compose } from 'recompose'

import { toggleTodo } from '../actions'
import TodoList from '../components/TodoList'

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
  }
}

const mapStateToProps = state => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter),
  }
}

const VisibleTodoList = compose(
  connect(
    mapStateToProps,
    { toggleTodo },
  ),
)(TodoList)

export default VisibleTodoList
```

Looks good! We got the `todos` and `visibilityFilter` from the redux store and computed filtered todos using `getVisibleTodos` function. So what is the problem then?

### The problem

Unfortunately, it is not very efficient and might slow down your app significantly. The problem is that `mapStateToProps` is called every time redux state changes (even if nothing related to your component really changed). Therefore you cannot do anything complex in your `mapStateToProps`. In our example, we compute the visible todos everytime the state changes. If we have a lot of todos (which is absolutely possible in real app) our app might become very slow because of this.

Another problem is that every time we compute `getVisibleTodos`, we create a new array and therefore also a new reference. Because of that, we cannot effectively use optimizations [pure](https://github.com/acdlite/recompose/blob/master/docs/API.md#pure) or [memo](https://reactjs.org/docs/react-api.html#reactmemo) which are the basic techniques to eliminate wasted renders and speed up your app.

Looks bad 😢. What can we do with it?

### Reselect

If you use redux, you probably already heard about (or even better used) [this library](https://github.com/reduxjs/reselect). It allows you to memoize our `getVisibleTodos` which removes the complexity from `mapStateToProps` and also removes the problem with creating new references. The memoized functions are called selectors.

You can take a look at [reselect's solution](https://github.com/reduxjs/reselect#creating-a-memoized-selector) to our problem.

Well, why shouldn't you use reselect right?

It has serious problems. If you try to reuse the same selector in two different components, the memoization stops to work correctly and the optimizations are gone. This is very unpleasant since this problem is very hard to debug. Reselect [provides a solution](https://github.com/reduxjs/reselect#sharing-selectors-with-props-across-multiple-component-instances) how to prevent this, however it requires tons of boilerplate... which is totally unnecessary because we have a better solution ;).

### withDerivedProps to the rescue

First, we get the stuff we need to compute the filtered todos:

```js
const mapStateToProps = state => {
  return {
    todos: state.todos,
    visibilityFilter: state.visibilityFilter,
  }
}
```

Pretty trivial.

**Notice we are not creating here any new data here, we merely pull existing data from the store**.

Next we compute the filtered data in `withDerivedProps` HOC. As first argument we provide keys of props we need to compute the data `['todos', 'visibilityFilter']`. Next we provide an object with properties we want to compute and pass the function using which the data is computed `{ filteredTodos: ({ todos, visibilityFilter }) => { /* compute filtered todos */ } }`.

```js
import withDerivedProps from 'withDerivedProps'

withDerivedProps(['todos', 'visibilityFilter'], {
  filteredTodos: ({ todos, visibilityFilter }) => {
    switch (filter) {
      case 'SHOW_ALL':
        return todos
      case 'SHOW_COMPLETED':
        return todos.filter(t => t.completed)
      case 'SHOW_ACTIVE':
        return todos.filter(t => !t.completed)
    }
  },
})
```

Generally, the `withDerivedProps` structure looks like this:

```js
withDerivedProps(keys, {
  [computedProp]: computationFunction,
})
```

Finally we compose the `connect` and `withDerivedProps` HOCs using `compose` function from `recompose`:

```js
import { connect } from 'react-redux'
import { compose } from 'recompose'
import withDerivedProps from 'withDerivedProps'

import { toggleTodo } from '../actions'
import TodoList from '../components/TodoList'

const mapStateToProps = state => {
  return {
    todos: state.todos,
    visibilityFilter: state.visibilityFilter,
  }
}

const VisibleTodoList = compose(
  connect(
    mapStateToProps,
    { toggleTodo },
  ),
  withDerivedProps(['todos', 'visibilityFilter'], {
    filteredTodos: ({ todos, visibilityFilter }) => {
      switch (filter) {
        case 'SHOW_ALL':
          return todos
        case 'SHOW_COMPLETED':
          return todos.filter(t => t.completed)
        case 'SHOW_ACTIVE':
          return todos.filter(t => !t.completed)
      }
    },
  }),
)(TodoList)

export default VisibleTodoList
```

Tada 🎉 we are done. How does it work? Every time new props come to `withDerivedProps`, the HOC checks if any relevant prop (`todos` or `visibilityFilter`) changed. If it didn't, the HOC does nothing. If something relevant did change, the HOC recomputes the `filteredTodos` using the function we provided.

If we want to make the code more readable we can extract the computation function somewhere else. It is a good practise to prefix the function name with `derive` but it is really up to you.

```js
const deriveFilteredTodos = ({ todos, visibilityFilter }) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
  }
}

withDerivedProps(['todos', 'visibilityFilter'], {
  filteredTodos: deriveFilteredTodos,
})
```

Now you can notice the key difference between `reselect` and `withDerivedProps` approach. `withDerivedProps` does the memoization in the component whereas `reselect` binds it to the computation function. That's why `withDerivedProps` has no problem with reusing the same computation function in multiple components as `reselect` does.

Note that your computation functions **receive only the props** that you listed (`['todos', 'visibilityFilter']`). That's a good thing, because if you received all the props in the computation function, you might forget to list it in the keys and the data might not recompute when it should. If you want to receive all the props, you can provide third optional argument `{ passAllProps: true }`. However, **DON'T DO THIS IF YOU ARE NOT SURE WHAT YOU ARE DOING! ;)**.

## Deriving multiple props at once

If you want to derive several props from the props, you can either use multiple `withDerivedProps` usages in row:

```js
compose(
  connect(...),
  withDerivedProps(...),
  withDerivedProps(...),
  withDerivedProps(...)
)
```

or you can put them in single `withDeriveProps`:

```js
withDerivedProps(['todos', 'visibilityFilter'], {
  filteredTodos: ({ todos, visibilityFilter }) => {
    switch (filter) {
      case 'SHOW_ALL':
        return todos
      case 'SHOW_COMPLETED':
        return todos.filter(t => t.completed)
      case 'SHOW_ACTIVE':
        return todos.filter(t => !t.completed)
    }
  },
  shouldShowEmptyLabel: ({ filteredTodos }) => filteredTodos.length === 0
})
```

> Please note that the first approach is more flexible and might optimize the component better, especially if the props are computed from many different props.

## withDerivedProp

For derivations that depend only on one prop, you can you use simpler version of our HOC `withDerivedProp`:

```js
import { withDerivedProp } from 'withDerivedProps'

withDerivedProp('todos', todos => todos.filter(t => !t.completed), { target: 'visibleTodos' })
```

If you don't want to create a prop with name but want to overwrite the existing one, you can omit the third argument:

```js
withDerivedProp('todos', todos => todos.filter(t => !t.completed))
```

## Frequently asked questions

### What if I want use the computation function outside the component (e.g. while calling API)? I guess it will be slow because the function itself is not memoized!

Generally, no it won't be slow, you don't have to worry. It is because during the API call (or similar action) you only need to compute the data once unlike in component, where it can happen dozens times per second.

However, even in the component itself it wouldn't be as bad to recompute the data often. The main problem is that recomputation creates new references which cause rerenders. And rerenders (or React reconciliation) can be very very time expensive (especially in long lists). That's the main reason, why we need to get rid of redundant data recomputations.
