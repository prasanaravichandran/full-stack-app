/**
 * Login Component. Landing page of the application.
 */
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useLazyQuery } from "@apollo/client";
import { Body } from '../../Parts/Parts';
import { Card, Input, Button, Alert } from '../../Components/Components';
import { LOG_IN } from '../../GraphQl/GetQuery';
import { SetSessionData } from '../../Service/SessionStorage';
import './Login.scss';

const userCredentials = Object.freeze({
    userName: "",
    password: ""
});

function LogInPage() {

    // Hooks
    const [logInFormData, updateLogInFormData] = useState(userCredentials);
    const [UserLogIn, { loading, error, data }] = useLazyQuery(LOG_IN);
    const history = useHistory();

    // Handle onchange event in form
    const handleFormDataChange = (e) => {
        updateLogInFormData({
        ...logInFormData,
        [e.target.name]: e.target.value.trim()
        });
    };

    // Login button to login to the application. Send request to graphQl server for user conformation
    const logIn = (e) => {
        e.preventDefault();
        return UserLogIn({ variables: { userName: logInFormData.userName, password: logInFormData.password }});
    };

    // If login success redirect to expense page and set user details in session storage.
    const nextPage = (userData) => {
        SetSessionData("userName", userData.name.first);
        SetSessionData("sessionToken", userData.user_token);
        history.push('/expense');    
    };

    if (data && data.userLogIn) {
        nextPage(data.userLogIn);
    }

    return (
        <div className="loginPage h-100">
            <Body className="h-100" rowClassName="h-100">
                <div className="col-lg-5 col-md-6 col-sm-8 col-10 mx-auto mt-5">
                    <div className="container-fluid display-3 text-white mb-1">
                        <div className="row align-items-start">
                            Track
                        </div> 
                        <div className="row align-items-start">
                            Expense
                        </div>
                    </div>
                    <Card title="Login">
                        <form>
                            <div className="form-group">
                                <Input type="text" label="User Name" labelClassName="float-left" value={logInFormData.userName} name="userName" onChange={handleFormDataChange} className="form-control" placeholder="User Name"/>
                            </div>
                            <div className="form-group">
                                <Input type="password" label="Password" labelClassName="float-left" value={logInFormData.password} name="password" onChange={handleFormDataChange} className="form-control" placeholder="Password"/>
                            </div>
                            {error && <Alert type="error" message="Invalid Credentials"/>}
                            <Button loading={loading} onClick={logIn} type="submit" className="btn-primary float-left" name="Log In"/>
                            {/* <Button type="submit" className="btn-primary float-left ml-3" name="Sign Up"/> */}
                        </form>
                    </Card>
                </div>
            </Body>
        </div>
    );
}

export default LogInPage;
