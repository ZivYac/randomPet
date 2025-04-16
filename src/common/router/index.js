import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import Login from "../../pages/Login";
import Pi from "../../pages/Pi";
import Dogs from "../../pages/Dogs";
import Cats from "../../pages/Cats";
import Favorites from "../../pages/Favorites";
import ScrollToTop from "../../components/ScrollToTop";
import Profile from "../../pages/Profile";
import Comments from "../../pages/Comments";

const MindRouter = () => {
  return (
    <Router>
      <ScrollToTop />
      <Switch>
        <PublicRoute exact path="/" component={Login} />

        <PrivateRoute exact path="/home" component={Pi} />
        <PrivateRoute exact path="/dog" component={Dogs} />
        <PrivateRoute exact path="/cat" component={Cats} />
        <PrivateRoute exact path="/favorites" component={Favorites} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/comments" component={Comments} />
      </Switch>
    </Router>
  );
};

export default MindRouter;
