import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const EmptyState = ({ message = "No subscriptions found", actionText = "Add your first subscription", actionLink = "/subscriptions/new" }) => {
    return (
        <motion.div
            className="empty-state-container"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
        >
            <div className="empty-state-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7H7C5.89543 7 5 7.89543 5 9V11M7 3V7M17 3V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>

            <h3 className="empty-state-title">It's pretty quiet here</h3>
            <p className="empty-state-desc">{message}</p>

            {actionLink && (
                <Link to={actionLink} className="btn btn-secondary mt-2">
                    {actionText}
                </Link>
            )}
        </motion.div>
    );
};

export default EmptyState;
