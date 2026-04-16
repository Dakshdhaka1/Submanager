import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getSubscriptions, getExpenseSummary, deleteSubscription, cancelSubscription, activateSubscription } from '../api/axios';
import toast from 'react-hot-toast';
import SubscriptionCard from '../components/SubscriptionCard';
import ExpenseChart from '../components/ExpenseChart';
import SkeletonLoader from '../components/SkeletonLoader';
import EmptyState from '../components/EmptyState';
import '../styles/dashboard.css';

const Dashboard = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('ALL');

    const fetchData = async () => {
        try {
            const [subsRes, summaryRes] = await Promise.all([
                getSubscriptions(),
                getExpenseSummary()
            ]);
            setSubscriptions(subsRes.data);
            setSummary(summaryRes.data);
        } catch (err) {
            console.error('Failed to fetch data:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this subscription?')) return;
        try {
            await deleteSubscription(id);
            toast.success('Subscription deleted');
            fetchData();
        } catch (err) {
            toast.error('Failed to delete subscription');
        }
    };

    const handleToggleStatus = async (id, currentStatus) => {
        try {
            if (currentStatus === 'ACTIVE') {
                await cancelSubscription(id);
                toast.success('Subscription cancelled');
            } else {
                await activateSubscription(id);
                toast.success('Subscription reactivated');
            }
            fetchData();
        } catch (err) {
            toast.error('Failed to update status');
        }
    };

    const filtered = filter === 'ALL'
        ? subscriptions
        : subscriptions.filter(s => s.status === filter);

    if (loading) {
        return (
            <div className="dashboard" style={{ paddingTop: 'calc(var(--nav-height) + 24px)' }}>
                <div className="container">
                    <SkeletonLoader type="dashboard" />
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard" style={{ paddingTop: 'calc(var(--nav-height) + 24px)' }}>
            <div className="container">

                {/* Top Bar: Title + Inline Stats + Add Button */}
                <motion.div
                    className="dash-topbar"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <div className="dash-topbar-left">
                        <h1 className="dash-title">Dashboard</h1>
                    </div>

                    {summary && (
                        <div className="dash-stats-inline">
                            <div className="stat-chip">
                                <span className="stat-chip-label">Monthly</span>
                                <span className="stat-chip-value">₹{summary.totalMonthlyExpense}</span>
                            </div>
                            <div className="stat-chip">
                                <span className="stat-chip-label">Active</span>
                                <span className="stat-chip-value">{summary.activeCount}</span>
                            </div>
                            <div className="stat-chip">
                                <span className="stat-chip-label">Yearly</span>
                                <span className="stat-chip-value">₹{summary.totalYearlyExpense}</span>
                            </div>
                        </div>
                    )}

                    <Link to="/subscriptions/new" className="btn btn-primary">
                        + Add
                    </Link>
                </motion.div>

                {/* Main Content: Two Column Layout */}
                <div className="dash-main">

                    {/* Left Column: Chart */}
                    <div className="dash-col-left">
                        {summary?.expenseByCategory && Object.keys(summary.expenseByCategory).length > 0 && (
                            <ExpenseChart data={summary.expenseByCategory} />
                        )}
                    </div>

                    {/* Right Column: Filters + Subscription List */}
                    <div className="dash-col-right">
                        {/* Filter Tabs */}
                        <div className="filter-tabs">
                            {['ALL', 'ACTIVE', 'CANCELLED'].map(tab => (
                                <button
                                    key={tab}
                                    className={`filter-tab ${filter === tab ? 'active' : ''}`}
                                    onClick={() => setFilter(tab)}
                                >
                                    {tab}
                                    <span className="filter-count">
                                        {tab === 'ALL' ? subscriptions.length : subscriptions.filter(s => s.status === tab).length}
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* Subscription List — scrollable */}
                        <div className="subs-list">
                            <AnimatePresence>
                                {filtered.length === 0 ? (
                                    <EmptyState
                                        message={filter === 'ALL' ? "You don't have any subscriptions yet." : `No ${filter.toLowerCase()} subscriptions found.`}
                                        actionText={filter === 'ALL' ? "Add your first subscription" : null}
                                        actionLink={filter === 'ALL' ? "/subscriptions/new" : null}
                                    />
                                ) : (
                                    filtered.map((sub, i) => (
                                        <SubscriptionCard
                                            key={sub.id}
                                            sub={sub}
                                            index={i}
                                            onDelete={handleDelete}
                                            onToggleStatus={handleToggleStatus}
                                        />
                                    ))
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;
