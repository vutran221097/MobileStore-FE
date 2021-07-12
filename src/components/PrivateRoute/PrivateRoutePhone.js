import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props =>
                sessionStorage.getItem('phoneNumber') !== null ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/history",
                            state: { from: props.location }
                        }}
                    />
                )}
        />
    )
}

export default PrivateRoute;