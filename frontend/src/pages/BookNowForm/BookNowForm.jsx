import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUserStore } from '../../stores/useUserStore';
import './BookNowForm.scss';
import { toast } from 'react-hot-toast';
import axios from '../../lib/axios';

const BookNowForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUserStore();
  const { singleService, fetchSingleService } = useUserStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    message: '',
    phone: ''
  });

  useEffect(() => {
    fetchSingleService(id);
  }, [id, fetchSingleService]);

  useEffect(() => {
    if (singleService) {
      setFormData(prev => ({
        ...prev,
        message: `Service Booking Request for: ${singleService.mainTitle}\n\nHi, I'm interested in booking your "${singleService.mainTitle}" service. Please provide me with more information about availability and pricing.`
      }));
    }
  }, [singleService]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { name, email, message, phone } = formData;
    try {
      await axios.post("/send-email", { name, email, message, phone });
      toast.success("Booking request sent successfully!");
      setFormData({
        name: user?.name || '',
        email: user?.email || '',
        phone: '',
        message: '',  
      });
      setLoading(false);
      setTimeout(() => {
        navigate('/services');
      }, 2000);
    } catch (error) {
      toast.error("Internal Server Error, Try Again!");
      setLoading(false);
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="book-now-container">
      <div className="form-card">
        <h2>Book Service</h2>
        <h3>{singleService?.mainTitle}</h3>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="6"
            />
          </div>

          <button 
            type="submit" 
            className="submit-btn"
            disabled={loading}
          >
            <span>{loading ? 'Sending...' : 'Send Request'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookNowForm; 