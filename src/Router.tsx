import { BrowserRouter, Switch, Route } from "react-router-dom";
import Coin from "./routes/Coin.tsx";
import Coins from "./routes/Coins.tsx";

function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/:coinId">
                <Coin />
                </Route>
                <Route path="/">
                <Coins />
                </Route>
            </Switch>
        </BrowserRouter>)
}
export default Router;