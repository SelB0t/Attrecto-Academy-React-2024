
import React from 'react';
import { Page } from '../../components/page/Page';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <Page title="404! Page Not Found" noCard>
            <div className="alert alert-secondary m-4">
                <h4>This page does not exist!</h4>
                <p>The page you were looking for no longer exists or never existed! Make sure that the URL does not contain any typos!</p>
                <hr />
                <p>
                    Click on this <Link to="/home" className="alert-link">link</Link> to go back to the Home page.
                </p>
            </div>
        </Page>
    );
};

export default NotFoundPage;
