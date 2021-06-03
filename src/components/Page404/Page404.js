import React from 'react';
import './Page404.css';
import page from '../../images/404.jpg'

function Page404() {
    return (
        <div className="page-404">
            <img src={page} alt="404 Not Found" />
        </div>
    )
}

export default Page404
