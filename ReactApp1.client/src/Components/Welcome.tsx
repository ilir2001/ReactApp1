// Welcome.tsx

import React from 'react';
import { AuthorizedUser } from './AuthorizeView';

const Welcome: React.FC = () => {
    return (
        <div className="container">
            <p className="h1">You are Authenticated</p>
            <span>Welcome <span className="fw-bold"><AuthorizedUser value="email" /></span></span>
        </div>
    );
}

export default Welcome;
