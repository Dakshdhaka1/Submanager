import { motion } from 'framer-motion';
import '../styles/skeleton.css';

const SkeletonLoader = ({ type }) => {
    if (type === 'dashboard') {
        return (
            <div className="skeleton-dashboard">
                {/* Header Skeleton */}
                <div className="skeleton-header">
                    <div className="skeleton-title skeleton-shimmer"></div>
                    <div className="skeleton-stats">
                        <div className="skeleton-chip skeleton-shimmer"></div>
                        <div className="skeleton-chip skeleton-shimmer"></div>
                        <div className="skeleton-chip skeleton-shimmer"></div>
                    </div>
                </div>

                <div className="dash-main">
                    {/* Left Column Chart Skeleton */}
                    <div className="dash-col-left">
                        <div className="skeleton-chart skeleton-shimmer"></div>
                    </div>

                    {/* Right Column List Skeleton */}
                    <div className="dash-col-right">
                        <div className="filter-tabs">
                            <div className="skeleton-tab skeleton-shimmer"></div>
                            <div className="skeleton-tab skeleton-shimmer"></div>
                            <div className="skeleton-tab skeleton-shimmer"></div>
                        </div>
                        <div className="subs-list">
                            {[1, 2, 3, 4].map((i) => (
                                <motion.div
                                    key={i}
                                    className="skeleton-card skeleton-shimmer"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: i * 0.05 }}
                                ></motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return <div className="skeleton-shimmer" style={{ width: '100%', height: '100px', borderRadius: '12px' }}></div>;
};

export default SkeletonLoader;
