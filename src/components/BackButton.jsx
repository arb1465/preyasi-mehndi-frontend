
import React from 'react';
import { Link } from 'react-router-dom';
import './BackButton.css'; // We'll create this CSS next

function BackButton() {
    return (
        <div className="back-button-container">
            <Link to="/admin-ak47/dashboard" className="back-button">
                ← Back to Dashboard
            </Link>
        </div>
    );
}

export default BackButton;