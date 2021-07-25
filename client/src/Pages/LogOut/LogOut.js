/**
 * Logout Component. 
 * This page will be redirected once the logout button is clicked in the expense page.
 * 
 */
import { Link } from "react-router-dom";
import { Body } from '../../Parts/Parts';
import './LogOut.scss';

function LogOutPage() {
    return (
        <div className="logOutPage h-100">
            <Body className="h-100" rowClassName="h-100">
                <div className="col-lg-5 col-md-6 col-sm-8 col-10 mx-auto mt-5">
                    <div className="h1 text-white">
                        You have successfully logged out
                    </div>
                    <div className="h1 text-white mt-5">
                        <Link className="logoutLink text-white" to="/login">Log In</Link> to continue
                    </div>
                </div>
            </Body>
        </div>
    );
}

export default LogOutPage;