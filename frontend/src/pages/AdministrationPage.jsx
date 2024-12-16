import { BarChart2, ShoppingBag, Users, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import axios from 'axios';
import OperatorList from '../components/operator/OperatorList';
import Header from '../components/common/Header';
import StatCard from '../components/common/StatCard';
import OrderTable from '../components/products/OrderTable';
import AdminMap from '../components/maps/AdminMap';
import OperatorMap from '../components/maps/OperatorMap';
import CsvButton from '../components/csv/CsvButton';

const AdministrationPage = () => {
  const [csvFile, setCsvFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);

  const handleFileChange = (event) => {
    setCsvFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!csvFile) {
      setUploadStatus('No file selected.');
      return;
    }

    const formData = new FormData();
    formData.append('file', csvFile);

    try {
      setUploadStatus('Uploading...');
      const response = await axios.post('http://localhost:8000/api/upload_csv/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUploadStatus(`Upload successful: ${response.data.message}`);
    } catch (error) {
      setUploadStatus('Upload failed. Please try again.');
      console.error('Error uploading CSV:', error);
    }
  };

  return (
    <div className="flex-1 overflow-auto relative z-10 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200">
      <Header title="Administration" />

      <main className="max-w-screen-xl mx-auto py-6 px-4 lg:px-2">
        {/* Stats */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard name="Total Sales" icon={Zap} value="$12,345" color="var(--color-primary)" />
          <StatCard name="New Users" icon={Users} value="1,234" color="var(--color-secondary)" />
          <StatCard name="Total Products" icon={ShoppingBag} value="567" color="var(--color-primary)" />
          <StatCard name="Conversion Rate" icon={BarChart2} value="12.5%" color="var(--color-secondary)" />
        </motion.div>

        {/* CSV Upload Section */}
        <motion.div
          className="container mx-auto border border-gray-300 dark:border-gray-700 rounded-lg p-4 mb-8 flex flex-col items-center justify-center max-h-[400px] overflow-y-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-lg font-semibold mb-4 text-center">Upload CSV for Routing</h2>
          <CsvButton onChange={handleFileChange} />
          {uploadStatus && <p className="mt-4 text-sm text-center">{uploadStatus}</p>}
          <button
            onClick={handleUpload}
            className="mt-4 bg-primary text-white py-2 px-4 rounded hover:bg-opacity-90 transition"
          >
            Submit File
          </button>
        </motion.div>

 {/* Admin Map */}
 <motion.div
          className="container mx-auto border border-gray-300 dark:border-gray-700 rounded-lg p-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-lg font-semibold mb-4">Administration Map</h2>
          <AdminMap />
        </motion.div>

        {/* Operator Route Map */}
        <motion.div
          className="container mx-auto border border-gray-300 dark:border-gray-700 rounded-lg p-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-lg font-semibold mb-4">Operator Route Map</h2>
          <OperatorMap operatorId={1} />
        </motion.div>

        {/* Operator List */}
        <motion.div
          className="container mx-auto border border-gray-300 dark:border-gray-700 rounded-lg p-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <OperatorList />
        </motion.div>

        {/* Order Table */}
        <motion.div
          className="container mx-auto border border-gray-300 dark:border-gray-700 rounded-lg p-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <OrderTable />
        </motion.div>
      </main>
    </div>
  );
};

export default AdministrationPage;