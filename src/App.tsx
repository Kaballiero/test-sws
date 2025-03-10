import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import './App.style.scss'
import { Layout } from './Components/Layout';

export function App() {
    const FirstPage: React.FC = () => <div>Первая страница</div>;
    const SecondPage: React.FC = () => <div>Вторая страница</div>;
    const ViewPage: React.FC = () => <div>Страница просмотра</div>;
    const ControlPage: React.FC = () => <div>Страница управле ния</div>;

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<div>Главная страница</div>} />
                    <Route path="/*" element={<FirstPage />} />
                </Route>
            </Routes>
        </BrowserRouter>)
}
