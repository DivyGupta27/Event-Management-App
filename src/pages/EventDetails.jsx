import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`https://event-management-app-0ng0.onrender.com/api/events/${id}`)
      .then(res => setEvent(res.data))
      .catch(() => alert('Event not found'));
  }, [id]);

 const handleRSVP = async () => {
  try {
    await axios.post(`https://event-management-app-0ng0.onrender.com/api/events/${id}/rsvp`, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    // ✅ Refetch event data to update attendee list
    const res = await axios.get(`https://event-management-app-0ng0.onrender.com/api/events/${id}`);
    setEvent(res.data);
  } catch {
    alert('RSVP failed');
  }
};

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this event?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://event-management-app-0ng0.onrender.com/api/events/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Event deleted');
      navigate('/events');
    } catch {
      alert('Failed to delete event');
    }
  };

  const goToEditPage = () => {
    navigate(`/events/${id}/edit`);
  };

  if (!event) return <div className="text-center mt-10 text-gray-600">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto mt-12 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">{event.title}</h1>
        <p className="text-gray-700 text-lg mb-4">{event.description}</p>
        <div className="text-sm text-gray-600 space-y-1">
          <p><span className="font-medium">Location:</span> {event.location}</p>
          <p><span className="font-medium">Date:</span> {new Date(event.date).toLocaleString()}</p>
        </div>
      </div>

      {user && (
        <div className="flex gap-4 mb-6">
          <button
            onClick={handleRSVP}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md shadow transition"
          >
            RSVP
          </button>

          {/* Optional ownership check can be added here */}
          <button
            onClick={goToEditPage}
            className="px-5 py-2 bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium rounded-md shadow transition"
          >
            Edit
          </button>

          <button
            onClick={handleDelete}
            className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md shadow transition"
          >
            Delete
          </button>
        </div>
      )}

      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Attendees</h3>
        {event.attendees?.length ? (
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            {event.attendees.map((attendee, index) => (
              <li key={index}>{attendee.name}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No attendees yet.</p>
        )}
      </div>
    </div>
  );
};

export default EventDetails;
