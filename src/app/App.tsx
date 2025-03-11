import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { Layout } from '../components/layout';
import Main from '../pages/main/Main';

export function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Main />} />
            <Route path="/*" element={<Main />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}