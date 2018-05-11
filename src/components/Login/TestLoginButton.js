import React from 'react';
import SocialLoginButtonProvider from 'react-social-login-buttons/lib/buttons/SocialLoginButtonProvider';

const defaults = {
    text: 'Demo hesabı ile giriş yap',
    icon: 'phonelink',
    iconFormat: name => `material-icons`,
    style: {background: "#3b5998"},
    activeStyle: {background: "#293e69"}
};
/** My Facebook login button. */
const TestLoginButton = (props) => {
    return <SocialLoginButtonProvider defaults={defaults} props={props}/>
};

export default TestLoginButton;