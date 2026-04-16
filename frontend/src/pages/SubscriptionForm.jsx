import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { createSubscription, updateSubscription, getSubscriptionById } from '../api/axios';
import toast from 'react-hot-toast';
import '../styles/dashboard.css';

const SubscriptionForm = () => {
    const { id } = useParams();
    const isEdit = !!id;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        name: '',
        category: '',
        price: '',
        billingCycle: 'MONTHLY',
        renewalDate: '',
        autoRenew: true,
        paymentMethod: '',
        description: ''
    });

    useEffect(() => {
        if (isEdit) {
            getSubscriptionById(id)
                .then(res => {
                    const sub = res.data;
                    setForm({
                        name: sub.name || '',
                        category: sub.category || '',
                        price: sub.price || '',
                        billingCycle: sub.billingCycle || 'MONTHLY',
                        renewalDate: sub.renewalDate || '',
                        autoRenew: sub.autoRenew ?? true,
                        paymentMethod: sub.paymentMethod || '',
                        description: sub.description || ''
                    });
                })
                .catch(() => toast.error('Failed to load subscription'));
        }
    }, [id, isEdit]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const payload = { ...form, price: parseFloat(form.price) };

        try {
            if (isEdit) {
                await updateSubscription(id, payload);
                toast.success('Subscription updated successfully!');
            } else {
                await createSubscription(payload);
                toast.success('Subscription added successfully!');
            }
            navigate('/dashboard');
        } catch (err) {
            const errors = err.response?.data?.errors;
            if (errors) {
                toast.error(Object.values(errors).join(', '));
            } else {
                toast.error(err.response?.data?.message || 'Something went wrong');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-page">
            <motion.div
                className="form-container"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <div className="form-card">
                    <h1 className="form-title">{isEdit ? 'Edit Subscription' : 'Add Subscription'}</h1>

                    <form onSubmit={handleSubmit}>
                        <div className="form-grid">
                            <div className="input-group">
                                <label>Name</label>
                                <input type="text" name="name" placeholder="Netflix" value={form.name} onChange={handleChange} required />
                            </div>
                            <div className="input-group">
                                <label>Category</label>
                                <input type="text" name="category" placeholder="Entertainment" value={form.category} onChange={handleChange} required />
                            </div>
                            <div className="input-group">
                                <label>Price (₹)</label>
                                <input type="number" name="price" placeholder="199" value={form.price} onChange={handleChange} required min="0" step="0.01" />
                            </div>
                            <div className="input-group">
                                <label>Billing Cycle</label>
                                <select name="billingCycle" value={form.billingCycle} onChange={handleChange}>
                                    <option value="MONTHLY">Monthly</option>
                                    <option value="YEARLY">Yearly</option>
                                </select>
                            </div>
                            <div className="input-group">
                                <label>Renewal Date</label>
                                <input type="date" name="renewalDate" value={form.renewalDate} onChange={handleChange} />
                            </div>
                            <div className="input-group">
                                <label>Payment Method</label>
                                <input type="text" name="paymentMethod" placeholder="Credit Card" value={form.paymentMethod} onChange={handleChange} />
                            </div>
                            <div className="input-group full-width">
                                <label>Description</label>
                                <input type="text" name="description" placeholder="Optional description" value={form.description} onChange={handleChange} />
                            </div>
                            <div className="input-group full-width" style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                <input type="checkbox" name="autoRenew" checked={form.autoRenew} onChange={handleChange} id="autoRenew" style={{ width: 18, height: 18, accentColor: 'var(--accent)' }} />
                                <label htmlFor="autoRenew" style={{ textTransform: 'none', fontSize: '0.9rem', cursor: 'pointer' }}>Auto-renew this subscription</label>
                            </div>
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                                {loading ? 'Saving...' : isEdit ? 'Update Subscription' : 'Add Subscription'}
                            </button>
                            <button type="button" className="btn btn-secondary btn-lg" onClick={() => navigate('/dashboard')}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default SubscriptionForm;
