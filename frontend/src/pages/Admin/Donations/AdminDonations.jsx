import { useState, useEffect } from 'react';
import axios from '../../../lib/axios';
import { toast } from 'react-hot-toast';
import { FaRupeeSign } from 'react-icons/fa';
import './AdminDonations.scss';
import Loader from '../../../components/Loaders/maxLoader/Loader';

const AdminDonations = () => {
  const [donations, setDonations] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch both donations and stats in parallel
        const [donationsResponse, statsResponse] = await Promise.all([
          axios.get('/payment/donations'),
          axios.get('/payment/donation-stats')
        ]);

        if (donationsResponse.data.success) {
          setDonations(donationsResponse.data.donations);
        }

        if (statsResponse.data.success) {
          setStats(statsResponse.data.stats);
        }
      } catch (error) {
        console.error('Error fetching donation data:', error);
        toast.error(error.response?.data?.message || 'Error fetching donations');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatAmount = (amount) => {
    return Number(amount).toLocaleString('en-IN', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2
    });
  };

  if (loading) return <Loader />;

  return (
    <div className="admin-donations">
      {stats && (
        <div className="donation-stats">
          <div className="stat-card">
            <h3>Total Donations</h3>
            <p>{stats.totalDonations}</p>
          </div>
          <div className="stat-card">
            <h3>Total Amount</h3>
            <p>
              <FaRupeeSign />
              {formatAmount(stats.totalAmount)}
            </p>
          </div>
          <div className="stat-card">
            <h3>This Month</h3>
            <p>
              <FaRupeeSign />
              {formatAmount(stats.monthlyDonations[0]?.total || 0)}
            </p>
          </div>
        </div>
      )}

      <div className="donations-list">
        <h2>Recent Donations</h2>
        {donations.length === 0 ? (
          <div className="no-donations">
            <p>No donations found</p>
          </div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Donor</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Payment ID</th>
                </tr>
              </thead>
              <tbody>
                {donations.map((donation) => (
                  <tr key={donation._id}>
                    <td>{formatDate(donation.createdAt)}</td>
                    <td>
                      <div className="donor-info">
                        <span>{donation.donorDetails.name}</span>
                        <small>{donation.donorDetails.email}</small>
                      </div>
                    </td>
                    <td>
                      <FaRupeeSign />
                      {formatAmount(donation.amount)}
                    </td>
                    <td>
                      <span className={`status ${donation.status.toLowerCase()}`}>
                        {donation.status}
                      </span>
                    </td>
                    <td>{donation.paymentInfo.paymentId || 'Pending'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDonations;