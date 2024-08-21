import { createContext, useContext, useState } from "react";
import Home from "./components/Home";
import store from "./store";
import { Provider } from "react-redux";
// Context
// 1. Does not store or "manage" anything, context provides a way to pass data through the component tree without having to pass props down manually at every level.
// 2. Can be used to avoid prop-drilling
// 3. Does show the current context value for both Provider and Consumer components in the React DevTools, but does not show any history of how that value changed over time
// 4. Updates consuming components when the context value changes, but with no way to skip updates
// 5. Does not include any mechanism for side effects - it's purely for rendering components
// React+Redux
// 1. Stores and manages a single value (which is typically an object)
// 2. Can be used to avoid prop-drilling
// 3. Has DevTools that show the history of all dispatched actions and state changes over time
// 4. Can update the value via dispatching an action and running reducers
// 5. Uses middleware to allow app code to trigger side effects
// 6. Allows components to subscribe to store updates, extract specific pieces of the store state, and only re-render when those values change

export const CounterContext = createContext();
export const CounterContext1 = createContext();
export const CounterContext2 = createContext();
export const CounterContext3 = createContext();

function App() {
  var [count, setCount] = useState(0);
  var [count1, setCount1] = useState(0);
  var [count2, setCount2] = useState(0);
  var [count3, setCount3] = useState(0);

  return (
    <Provider store={store}>
      <CounterContext.Provider
        value={{
          count,
          count1,
          count2,
          count3,
          setCount,
          setCount1,
          setCount2,
          setCount3,
        }}
      >
        <Home />
      </CounterContext.Provider>
      <CounterContext.Provider
        value={{
          count,
          setCount,
        }}
      >
        <CounterContext1.Provider
          value={{
            count1,
            setCount1,
          }}
        >
          <CounterContext2.Provider
            value={{
              count2,
              setCount2,
            }}
          >
            <CounterContext3.Provider
              value={{
                count3,
                setCount3,
              }}
            >
              <Home />
            </CounterContext3.Provider>
          </CounterContext2.Provider>
        </CounterContext1.Provider>
      </CounterContext.Provider>
    </Provider>
  );
}

export default App;
