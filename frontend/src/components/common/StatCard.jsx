import React from 'react';
import { motion } from 'framer-motion';

// eslint-disable-next-line react/prop-types
const StatCard = ({ name, icon: Icon, value, color }) => {
  return (
    <motion.div
      className="backdrop-blur-md overflow-hidden shadow-lg rounded-xl border"
      whileHover={{
        y: -5,
        boxShadow: '0 25px 50px -12px var(--stat-card-shadow)',
      }}
      style={{
        backgroundColor: 'var(--stat-card-bg)',
        borderColor: 'var(--stat-card-border)',
      }}
    >
      <div className="px-4 py-5 sm:p-6">
        <span
          className="flex items-center text-sm font-medium"
          style={{ color: 'var(--stat-card-subtext)' }}
        >
          <Icon size={20} className="mr-2" style={{ color }} />
          {name}
        </span>
        <p
          className="mt-1 text-3xl font-semibold"
          style={{ color: 'var(--stat-card-text)' }}
        >
          {value}
        </p>
      </div>
    </motion.div>
  );
};

export default StatCard;
