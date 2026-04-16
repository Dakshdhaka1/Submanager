import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import ScrollSequence from '../components/ScrollSequence';
import '../styles/landing.css';

const Landing = () => {
    const { isAuthenticated } = useAuth();

    // Smooth scroll progress for parallax effects
    const { scrollYProgress } = useScroll();
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const heroY = useTransform(smoothProgress, [0, 1], [0, -300]);
    const heroOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);

    const features = [
        {
            title: 'Precision Tracking',
            desc: 'Monitor every charge, cycle, and invoice across your entire stack with absolute clarity.'
        },
        {
            title: 'Smart Alerts',
            desc: 'Receive deterministic notifications days before a renewal hits your corporate cards.'
        },
        {
            title: 'Cost Optimization',
            desc: 'Identify redundancies, underutilized seats, and aggregate your total software spend.'
        }
    ];

    return (
        <div className="landing">
            {/* The Image Sequence Scroll Scrubbing Background */}
            <ScrollSequence frameCount={220} imageExtension=".jpg" />

            {/* Hero Section */}
            <section className="hero">
                <div className="container">
                    <motion.div
                        className="hero-content"
                        style={{ y: heroY, opacity: heroOpacity }}
                    >
                        <motion.div
                            className="hero-badge"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        >
                            Subscription infrastructure for modern teams
                        </motion.div>

                        <motion.h1
                            className="hero-title"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        >
                            Master your <br /> recurring software spend
                        </motion.h1>

                        <motion.p
                            className="hero-subtitle"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        >
                            Bring unprecedented visibility to your SaaS stack. SubManager translates chaotic recurring charges into a predictable narrative of your operating expenses.
                        </motion.p>

                        <motion.div
                            className="hero-actions"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <Link to={isAuthenticated ? '/dashboard' : '/register'} className="btn btn-primary btn-lg">
                                {isAuthenticated ? 'Enter Dashboard' : 'Start Building Free'}
                            </Link>
                            {!isAuthenticated && (
                                <Link to="/login" className="btn btn-secondary btn-lg">
                                    Sign In
                                </Link>
                            )}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Trust Badges Section - Marquee effect */}
            <section className="trust-section">
                <p className="trust-label">TRUSTED BY INNOVATIVE TEAMS AT</p>
                <div className="trust-marquee">
                    <div className="trust-marquee-inner">
                        {/* Duplicated for infinite scroll effect */}
                        {[1, 2].map((group) => (
                            <div key={group} className="trust-group">
                                <span className="trust-logo">Acme Corp</span>
                                <span className="trust-logo">Stark Industries</span>
                                <span className="trust-logo">Wayne Ent.</span>
                                <span className="trust-logo">Hooli</span>
                                <span className="trust-logo">Massive Dynamic</span>
                                <span className="trust-logo">Pied Piper</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Philosophy / Features section - Apple/Linear style typography driven scroll */}
            <section className="features-section">
                <div className="container">
                    <div className="features-grid">
                        {features.map((f, i) => (
                            <motion.div
                                key={f.title}
                                className="feature-card"
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-100px' }}
                                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <h3 className="feature-title">{f.title}</h3>
                                <p className="feature-desc">{f.desc}</p>
                                <div className="feature-line"></div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Ultra minimal CTA */}
            <motion.section
                className="cta-section"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
            >
                <div className="container align-center">
                    <h2 className="cta-title">Stop guessing. Start tracking.</h2>
                    <Link to={isAuthenticated ? '/dashboard' : '/register'} className="btn btn-primary btn-lg mt-3">
                        {isAuthenticated ? 'Open Application' : 'Create Free Account'}
                    </Link>
                </div>
            </motion.section>

            {/* Rich Footer */}
            <footer className="rich-footer">
                <div className="container">
                    <div className="footer-grid">
                        <div className="footer-col brand-col">
                            <div className="nav-logo" style={{ marginBottom: '16px' }}>
                                <img src="/logo.png" alt="SubManager" style={{ height: '36px', width: 'auto' }} />
                                <span className="logo-text">SubManager</span>
                            </div>
                            <p className="footer-desc">
                                Master your recurring software spend with unprecedented visibility and smart alerts.
                                Designed with precision for modern teams.
                            </p>
                        </div>

                        <div className="footer-col">
                            <h4 className="footer-col-title">Product</h4>
                            <ul className="footer-links">
                                <li><a href="#">Features</a></li>
                                <li><a href="#">Integrations</a></li>
                                <li><a href="#">Pricing</a></li>
                                <li><a href="#">Changelog</a></li>
                            </ul>
                        </div>

                        <div className="footer-col">
                            <h4 className="footer-col-title">Resources</h4>
                            <ul className="footer-links">
                                <li><a href="#">Documentation</a></li>
                                <li><a href="#">API Reference</a></li>
                                <li><a href="#">Community</a></li>
                                <li><a href="#">Blog</a></li>
                            </ul>
                        </div>

                        <div className="footer-col">
                            <h4 className="footer-col-title">Company</h4>
                            <ul className="footer-links">
                                <li><a href="#">About</a></li>
                                <li><a href="#">Careers</a></li>
                                <li><a href="#">Legal & Privacy</a></li>
                                <li><a href="#">Contact</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="footer-bottom">
                        <p>&copy; {new Date().getFullYear()} SubManager Inc. All rights reserved.</p>
                        <div className="footer-socials">
                            <a href="#" aria-label="Twitter">Twitter</a>
                            <a href="#" aria-label="GitHub">GitHub</a>
                            <a href="#" aria-label="Discord">Discord</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
