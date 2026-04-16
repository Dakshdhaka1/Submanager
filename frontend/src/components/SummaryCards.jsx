import { motion } from 'framer-motion';

const SummaryCards = ({ summary, total }) => {
    const cards = [
        { label: 'Monthly Spend', value: `₹${summary.totalMonthlyExpense}`, color: 'accent', sub: `₹${summary.totalYearlyExpense}/year` },
        { label: 'Active', value: summary.activeCount, color: 'accent', sub: `of ${total} total` },
        { label: 'Cancelled', value: summary.cancelledCount, color: 'danger', sub: 'subscriptions' },
        { label: 'Categories', value: Object.keys(summary.expenseByCategory || {}).length, color: 'info', sub: 'spending groups' },
    ];

    return (
        <div className="summary-grid">
            {cards.map((card, i) => (
                <motion.div
                    key={card.label}
                    className="summary-card"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                    <div className="summary-label">{card.label}</div>
                    <div className={`summary-value ${card.color}`}>{card.value}</div>
                    <div className="summary-sub">{card.sub}</div>
                </motion.div>
            ))}
        </div>
    );
};

export default SummaryCards;
