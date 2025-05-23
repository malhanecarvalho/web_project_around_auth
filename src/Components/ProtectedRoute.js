import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ component: Component,  ...props}) {
  return (
    <Route>
      {() =>
        props.loggedIn ? <Component exact {...props}/> : <Redirect to="/login" />
      }
    </Route>
  );
}

export default ProtectedRoute;
