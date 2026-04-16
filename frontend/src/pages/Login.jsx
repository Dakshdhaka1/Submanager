import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { loginUser, GOOGLE_AUTH_URL } from '../api/axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import '../styles/auth.css';

const Login = () => {
    const [form, setForm] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await loginUser(form);
            login(res.data.token, { username: res.data.username });
            navigate('/dashboard');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Invalid credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <motion.div
                className="auth-container"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="auth-card">
                    <div className="auth-header">
                        <h1>Log in</h1>
                        <p>Enter your details below to access your account</p>
                    </div>

                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label>Username</label>
                            <input
                                type="text"
                                name="username"
                                value={form.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary btn-full mt-2" disabled={loading}>
                            {loading ? 'Authenticating...' : 'Sign In'}
                        </button>
                    </form>

                    <div className="divider">or</div>

                    <a href={GOOGLE_AUTH_URL} className="btn btn-secondary btn-full">
                        <svg width="16" height="16" viewBox="0 0 24 24" style={{ marginRight: '8px' }}>
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#fff" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#fff" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#fff" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#fff" />
                        </svg>
                        Continue with Google
                    </a>

                    <div className="auth-footer">
                        Don't have an account? <Link to="/register">Sign up</Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
