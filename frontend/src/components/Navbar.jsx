import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        setIsMobileMenuOpen(false);
        navigate('/');
    };

    const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    return (
        <nav className="navbar">
            <div className="navbar-inner container">
                <Link to="/" className="nav-logo" onClick={() => setIsMobileMenuOpen(false)}>
                    <img src="/logo.png" alt="SubManager" style={{ height: '36px', width: 'auto' }} />
                    <span className="logo-text">SubManager</span>
                </Link>

                {/* Desktop Links */}
                <div className="nav-links desktop-only">
                    {isAuthenticated ? (
                        <>
                            <Link to="/dashboard" className="nav-link">Dashboard</Link>
                            <div className="nav-user">
                                <span className="nav-username">{user?.username || 'User'}</span>
                                <button onClick={handleLogout} className="btn btn-ghost btn-sm">Logout</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-ghost">Login</Link>
                            <Link to="/register" className="btn btn-primary btn-sm">Get Started</Link>
                        </>
                    )}
                </div>

                {/* Mobile Hamburger Toggle */}
                <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle menu">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {isMobileMenuOpen ? (
                            <>
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </>
                        ) : (
                            <>
                                <line x1="3" y1="12" x2="21" y2="12"></line>
                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                <line x1="3" y1="18" x2="21" y2="18"></line>
                            </>
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="mobile-menu"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="mobile-menu-inner">
                            {isAuthenticated ? (
                                <>
                                    <div className="mobile-user-info">
                                        <div className="mobile-avatar">{user?.username?.charAt(0).toUpperCase() || 'U'}</div>
                                        <span className="mobile-username">{user?.username || 'User'}</span>
                                    </div>
                                    <Link to="/dashboard" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</Link>
                                    <button onClick={handleLogout} className="mobile-link mobile-logout-btn">Logout</button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
                                    <Link to="/register" className="btn btn-primary btn-full mt-2" onClick={() => setIsMobileMenuOpen(false)}>Get Started</Link>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
