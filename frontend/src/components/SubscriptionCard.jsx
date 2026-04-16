import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const SubscriptionCard = ({ sub, index, onDelete, onToggleStatus }) => {
    const isActive = sub.status === 'ACTIVE';
    const cycle = sub.billingCycle === 'MONTHLY' ? 'mo' : 'yr';

    return (
        <motion.div
            className="sub-card"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
        >
            {/* Top Row: Name + Price */}
            <div className="sub-card-top">
                <div className="sub-card-info">
                    <div className="sub-name">{sub.name}</div>
                    <div className="sub-category">{sub.category}</div>
                </div>
                <div className="sub-price-block">
                    <span className="sub-price-value">₹{sub.price}</span>
                    <span className="sub-price-cycle">/{cycle}</span>
                </div>
            </div>

            {/* Divider */}
            <div className="sub-card-divider"></div>

            {/* Bottom Row: Status + Actions */}
            <div className="sub-card-bottom">
                <div className="sub-status-group">
                    <span className={`sub-status-dot ${isActive ? 'dot-active' : 'dot-cancelled'}`}></span>
                    <span className={`sub-status-label ${isActive ? 'label-active' : 'label-cancelled'}`}>
                        {isActive ? 'Active' : 'Cancelled'}
                    </span>
                </div>
                <div className="sub-actions-row">
                    <button
                        className="sub-action-btn"
                        onClick={() => onToggleStatus(sub.id, sub.status)}
                    >
                        {isActive ? 'Cancel' : 'Reactivate'}
                    </button>
                    <Link to={`/subscriptions/${sub.id}/edit`} className="sub-action-btn">
                        Edit
                    </Link>
                    <button
                        className="sub-action-btn sub-action-danger"
                        onClick={() => onDelete(sub.id)}
                    >
                        Remove
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default SubscriptionCard;
