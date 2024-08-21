import {BrowserRouter, Routes, Route} from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import { Home} from "./components/Index";
import { useState, createContext, useContext } from 'react'
import "./App.css";
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { createSlice } from '@reduxjs/toolkit'
import Card from 'react-bootstrap/Card';
import { useSelector, useDispatch } from 'react-redux'

const dataSlice = createSlice({
  name: 'counter',
  initialState: {
    like: 0,
    share: 0
  },
  reducers: {
    incrementLike: state => {
      state.like += 1
    },
    incrementShare: state => {
      state.share += 1
    },
  }
})

// Action creators are generated for each case reducer function
const { incrementLike, incrementShare } = dataSlice.actions

const store = configureStore({
  reducer: {
    data: dataSlice.reducer
  }
})

var DataContext = createContext();

function LikeComponent() {
  const dispatch = useDispatch()
  const context = useContext(DataContext);
  const dataLike = useSelector(state => state.data.like)
  console.log("LikeComponent re-render");
  return (
    <>
      <button onClick={() => dispatch(incrementLike())}>LIKE</button>
      <div>Total like(useContext): {context.like}</div>
      <div>Total like(Redux): {dataLike}</div>
    </>
  )
}
function ShareComponent() {
  const dispatch = useDispatch()
  const context = useContext(DataContext);
  const dataShare = useSelector(state => state.data.share)
  console.log("ShareComponent re-render");
  return (
    <>
      <button onClick={() => dispatch(incrementShare())}>SHARE</button>
      <div>Total share(useContext): {context.share}</div>
      <div>Total share(Redux): {dataShare}</div>
    </>
  )
  
}

function App() {
  
  const [data, setData] = useState({
    like: 0,
    share: 0
  })
  return (
    <Provider store={store}>
      <DataContext.Provider value={data}>
        <Container>
          <Card>
            <Card.Title>useContext</Card.Title>
            <Card.Body>
              <button onClick={() => setData(prev => ({
                  ...prev, like: prev.like + 1
                }))}>LIKE</button>
              <button onClick={() => setData(prev => ({
                  ...prev, share: prev.share + 1
                }))}>SHARE</button>
            </Card.Body>
          </Card>
          <Card>
            <Card.Title>Redux</Card.Title>
            <Card.Body>
              
              
            </Card.Body>
          </Card>
          <LikeComponent />
          <ShareComponent />
        </Container>
      </DataContext.Provider>
    </Provider>
  );
}

export default App;
