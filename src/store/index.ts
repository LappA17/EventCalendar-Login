import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
const rootReducer = combineReducers(reducers);

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

//Так как мы работает с ТС то нам нужно наш стор типизировать type RootState = ReturnType<typeof store.getState>, нужно знать с какими типами будем работать когда будем получать какие-то данные или их изменять. По-этому первое что мы делаю - это получаем тип нашего состояния, а само состояние достаем, а само состояние мы достаем с помощью фции getState. Этот тип будет знать о редьюсерах с которыми мы работаем и о тех данных с которыми этот редьюсер работает,то-есть состояние каждого отдельного редьюсера
