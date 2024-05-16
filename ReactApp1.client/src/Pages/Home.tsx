import React from 'react';
import LogoutLink from '../Components/LogoutLink.tsx';
import AuthorizeView from '../Components/AuthorizeView.tsx';
import Welcome from '../Components/Welcome.tsx';

const Home: React.FC = () => {
    return (
        <AuthorizeView>
            <Welcome />
            <LogoutLink>Logout</LogoutLink>
        </AuthorizeView>
    );
}

export default Home;
