import React, { useState } from 'react';
import BackButton from './BackButton';
import './AIPage.css';
import { Link } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_URL;

function AIPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);
    const [error, setError] = useState('');

    const handleGenerateClick = async () => {
        setIsLoading(true);
        setError('');
        setImageUrl(null);

        const token = localStorage.getItem('admin_token');

        try {
            // Call the new, protected admin endpoint
            const response = await fetch(`${apiUrl}/admin-ak47/ai-designer/generate`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'AI service is busy. Please try again.');
            }

            setImageUrl(result.data.imageUrl);

        } 
        catch (err) {
            setError(err.message);
        } 
        finally {
            setIsLoading(false);
        }
    };

    const handleDownload = async () => {
        if (!imageUrl) return;
        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();

            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `preyasi-ai-design-${Date.now()}.png`;
            document.body.appendChild(link);
            
            link.click();
            document.body.removeChild(link);
        } 
        catch (err) {
            setError('Could not download the image.');
        }
    };

    return (
        <div className="ai-page-container section-bg">
            <div className="container">
                <Link to="/admin-ak47/dashboard" className="page-title-link">
                    <h1 className="page-title">AI Mehndi Designer</h1>
                </Link>

                <div className="ai-controls">
                    <button onClick={handleGenerateClick} disabled={isLoading}>
                        {isLoading ? 'Generating...' : 'Generate a Unique Design'}
                    </button>
                </div>

                <div className="ai-image-area">
                    {isLoading && <div className="spinner"></div>}
                    {error && <div className="error-message">{error}</div>}
                    {imageUrl && !isLoading && (
                        <div className="image-wrapper">
                            <img src={imageUrl} alt="AI generated mehendi design" className="generated-image" />
                            <button onClick={handleDownload} className="btn-download">
                                Download Image
                            </button>
                        </div>
                    )}
                </div>
                <BackButton />
            </div>
        </div>
    );
}

export default AIPage;