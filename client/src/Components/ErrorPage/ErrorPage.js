/**
 * Error page
 * Will display at the time of error in the application 
 */
import { Link } from "react-router-dom";
import { Body } from '../../Parts/Parts';
import './ErrorPage.scss';

function ErrorPage(props) {
    return (
        <div className="errorPage h-100">
            <Body className="h-100" rowClassName="h-100">
                <div className="col-lg-5 col-md-6 col-sm-8 col-10 mx-auto mt-5">
                    { props.code && 
                    <div className="h1 text-white">
                        <b>{props.code || 'Something went wrong'}</b>
                    </div>
                    }
                    <div className="h1 text-white">
                        { props.text || 'Something went wrong'}
                    </div>
                    <div className="h1 text-white mt-5">
                        <Link className="logoutLink text-white" to="/login">Log In</Link> to continue
                    </div>
                </div>
            </Body>
        </div>
    );
}

export default ErrorPage;