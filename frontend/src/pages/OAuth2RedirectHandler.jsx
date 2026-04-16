import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const OAuth2RedirectHandler = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { login } = useAuth();

    useEffect(() => {
        const token = searchParams.get('token');
        const username = searchParams.get('username');

        if (token && username) {
            // Log the user in via context
            login(token, { username });
            // Redirect to dashboard
            navigate('/dashboard', { replace: true });
        } else {
            // If failed for some reason
            navigate('/login?error=oauth2-failed', { replace: true });
        }
    }, []);

    return (
        <div className="loading-screen" style={{ background: 'var(--bg-primary)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="spinner"></div>
            <span style={{ color: 'var(--text-secondary)', marginTop: 16 }}>Logging you in...</span>
        </div>
    );
};

export default OAuth2RedirectHandler;
