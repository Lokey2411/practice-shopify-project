import {BrowserRouter, Route, Routes} from "react-router-dom";
import LayoutApp from "../components/layout/LayoutApp";

export default function AppRouter(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LayoutApp/>}>
                    <Route index element={<h1 className='text-3xl'>Hello</h1>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}