import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { useState } from 'react';

const COLORS = ['#ffffff', '#a1a1aa', '#d4d4d8', '#71717a', '#e4e4e7', '#52525b', '#fafafa'];

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div style={{
                background: 'rgba(12, 12, 12, 0.95)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                padding: '10px 14px',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6)',
                transition: 'all 0.15s ease-out',
                pointerEvents: 'none',
            }}>
                <p style={{ color: '#71717a', fontWeight: 500, marginBottom: '2px', textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: '0.65rem', margin: 0 }}>{label}</p>
                <p style={{ color: '#ffffff', fontWeight: 600, fontSize: '1rem', margin: 0 }}>₹{payload[0].value}</p>
            </div>
        );
    }
    return null;
};

const ExpenseChart = ({ data }) => {
    const [chartType, setChartType] = useState('area');

    const chartData = Object.entries(data)
        .map(([category, amount]) => ({
            category,
            amount: Math.round(amount * 100) / 100
        }))
        .sort((a, b) => b.amount - a.amount);

    const total = chartData.reduce((sum, d) => sum + d.amount, 0);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
                background: 'linear-gradient(180deg, rgba(24, 24, 27, 0.6) 0%, rgba(9, 9, 11, 0.8) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderTop: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '12px',
                padding: '28px 24px',
                marginBottom: '40px',
            }}
        >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                    <div style={{ fontSize: '0.7rem', fontWeight: 500, color: '#52525b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
                        Total Spend
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.03em' }}>
                        ₹{total.toFixed(0)}
                        <span style={{ fontSize: '0.75rem', color: '#52525b', fontWeight: 400, marginLeft: '4px' }}>/mo</span>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '4px', background: 'rgba(255,255,255,0.04)', borderRadius: '6px', padding: '3px' }}>
                    {['area', 'bar'].map(type => (
                        <button
                            key={type}
                            onClick={() => setChartType(type)}
                            style={{
                                background: chartType === type ? 'rgba(255,255,255,0.08)' : 'transparent',
                                border: 'none',
                                color: chartType === type ? '#ffffff' : '#52525b',
                                padding: '5px 10px',
                                borderRadius: '4px',
                                fontSize: '0.7rem',
                                fontWeight: 500,
                                cursor: 'pointer',
                                fontFamily: 'inherit',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                transition: 'all 0.2s'
                            }}
                        >
                            {type === 'area' ? 'Line' : 'Bar'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Chart */}
            <ResponsiveContainer width="100%" height={260}>
                {chartType === 'area' ? (
                    <AreaChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: -15 }}>
                        <defs>
                            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#ffffff" stopOpacity={0.12} />
                                <stop offset="100%" stopColor="#ffffff" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.03)" />
                        <XAxis
                            dataKey="category"
                            tick={{ fill: '#3f3f46', fontSize: 10, fontWeight: 500 }}
                            axisLine={false}
                            tickLine={false}
                            dy={8}
                        />
                        <YAxis
                            tick={{ fill: '#3f3f46', fontSize: 10, fontWeight: 500 }}
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={(v) => `₹${v}`}
                            dx={-5}
                        />
                        <Tooltip
                            content={<CustomTooltip />}
                            cursor={{ stroke: 'rgba(255,255,255,0.06)', strokeWidth: 1 }}
                            isAnimationActive={true}
                            animationDuration={150}
                            animationEasing="ease-out"
                        />
                        <Area
                            type="monotone"
                            dataKey="amount"
                            stroke="#ffffff"
                            strokeWidth={1.5}
                            fillOpacity={1}
                            fill="url(#areaGrad)"
                            animationDuration={800}
                            animationEasing="ease-out"
                            activeDot={{ r: 4, fill: '#000000', stroke: '#ffffff', strokeWidth: 1.5 }}
                            dot={false}
                        />
                    </AreaChart>
                ) : (
                    <BarChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: -15 }}>
                        <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.03)" />
                        <XAxis
                            dataKey="category"
                            tick={{ fill: '#3f3f46', fontSize: 10, fontWeight: 500 }}
                            axisLine={false}
                            tickLine={false}
                            dy={8}
                        />
                        <YAxis
                            tick={{ fill: '#3f3f46', fontSize: 10, fontWeight: 500 }}
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={(v) => `₹${v}`}
                            dx={-5}
                        />
                        <Tooltip
                            content={<CustomTooltip />}
                            cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                            isAnimationActive={true}
                            animationDuration={150}
                            animationEasing="ease-out"
                        />
                        <Bar
                            dataKey="amount"
                            radius={[4, 4, 0, 0]}
                            barSize={32}
                            animationDuration={600}
                            animationEasing="ease-out"
                        >
                            {chartData.map((_, i) => (
                                <Cell key={i} fill={COLORS[i % COLORS.length]} fillOpacity={0.7} />
                            ))}
                        </Bar>
                    </BarChart>
                )}
            </ResponsiveContainer>

            {/* Legend */}
            <div style={{ display: 'flex', gap: '16px', marginTop: '16px', flexWrap: 'wrap' }}>
                {chartData.map((d, i) => (
                    <div key={d.category} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <div style={{
                            width: '6px', height: '6px', borderRadius: '50%',
                            background: COLORS[i % COLORS.length],
                            opacity: 0.7
                        }}></div>
                        <span style={{ fontSize: '0.65rem', color: '#52525b', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                            {d.category}
                        </span>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default ExpenseChart;
