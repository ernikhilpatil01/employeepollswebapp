import {Navigate} from "react-router-dom";
import {connect} from "react-redux";

/**
* @description Represents Private Route Component
* @constructor
* @param children represents childrens
* @param loggedIn represents login flag
*/
const PrivateRoute = ({children, loggedIn}) => {
    const redirectUrl = window.location.href.toString().split(window.location.host)[1];

    return loggedIn ? children : <Navigate to={`/login?redirectTo=${redirectUrl}`}/>;
};

const mapStateToProps = ({authedUser}) => ({
    loggedIn: !!authedUser,
});

export default connect(mapStateToProps)(PrivateRoute);
