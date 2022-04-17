import Home from "./pages/home/Home";
import Create from "./pages/create/Create";
import Recipe from "./pages/recipe/Recipe";
import Search from "./pages/search/Search";
import { BrowserRouter } from "react-router-dom";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ThemeSelector from "./components/ThemeSelector";
import { useTheme } from "./hooks/useTheme";

import "./App.css";

function App() {
    const { mode } = useTheme();

    return (
        <div className={`App ${mode}`}>
            <BrowserRouter>
                <Navbar />
                <ThemeSelector />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/recipes/:id" component={Recipe} />
                    <Route path="/create" component={Create} />
                    <Route path="/search" component={Search} />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
