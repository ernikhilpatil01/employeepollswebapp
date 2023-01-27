import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {handleLogout} from "../actions/authedUser";

/**
* @description Represents Nav page
* @constructor
* @param dispatch represents dispatch function
* @param authedUserId represents authorized user's ID
*/
const Nav = ({dispatch, authedUserId}) => {

    const logout = (e) => {
        e.preventDefault();
        dispatch(handleLogout());
    };

    return (
        <nav className="flex justify-center space-x-4">
            <Link 
                to="/"
                className="font-medium px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900">Home</Link>
            <Link 
                to="/leaderboard"
                className="font-medium px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900">Leaderboard</Link>
            <Link 
                to="/add"
                className="font-medium px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900">New
                Poll
            </Link>
            {
                authedUserId !== null ?
                <span
                    className="font-medium px-3 py-2 text-slate-700"
                    data-testid="user-information">User: {authedUserId}
                </span>
                :<></>
            }
            {
                authedUserId !== null ?
                <button onClick={logout}
                        className="font-medium px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900">{authedUserId !== null ?`Logout` : `Login`}
                </button>
                :
                <Link 
                    to="/login"
                        className="font-medium px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900">Login
                </Link>
            }
        </nav>
    );
};

const mapStateToProps = ({authedUser}) => ({
    authedUserId: authedUser !== null ? authedUser.id : null,
});


export default connect(mapStateToProps)(Nav);
