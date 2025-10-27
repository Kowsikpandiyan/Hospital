// frontend/src/components/DoctorRating.jsx
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const DoctorRating = ({ doctorId, appointmentId, onClose }) => {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [hoveredRating, setHoveredRating] = useState(0);
    const { backendUrl, token } = useContext(AppContext);

    const submitRating = async () => {
        if (rating === 0) {
            toast.error('Please select a rating');
            return;
        }

        try {
            const { data } = await axios.post(
                backendUrl + '/api/hospital/rate-doctor',
                {
                    doctorId,
                    patientId: appointmentId,
                    rating,
                    review
                },
                { headers: { token } }
            );

            if (data.success) {
                toast.success('Rating submitted successfully');
                onClose();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('Failed to submit rating');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <h3 className="text-xl font-semibold mb-4">Rate Your Doctor</h3>
                
                <div className="flex justify-center mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoveredRating(star)}
                            onMouseLeave={() => setHoveredRating(0)}
                            className="text-3xl mx-1 transition-colors"
                        >
                            <span className={
                                star <= (hoveredRating || rating) 
                                    ? 'text-yellow-400' 
                                    : 'text-gray-300'
                            }>
                                ★
                            </span>
                        </button>
                    ))}
                </div>

                <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Share your experience (optional)"
                    className="w-full border rounded-lg p-3 mb-4"
                    rows="3"
                />

                <div className="flex gap-3">
                    <button
                        onClick={submitRating}
                        className="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-primary-dark"
                    >
                        Submit Rating
                    </button>
                    <button
                        onClick={onClose}
                        className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DoctorRating;
