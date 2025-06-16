import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EventList = () => {
  const [events, setEvents] = useState([]);

 useEffect(() => {
  axios.get('https://event-management-app-0ng0.onrender.com/api/events')
    .then(res => {
      console.log('Fetched events:', res.data);
      if (Array.isArray(res.data)) {
        setEvents(res.data);
      } else {
        setEvents([]); // or handle based on your API structure
      }
    })
    .catch(() => alert('Failed to fetch events'));
}, []);

return (
  <div className="max-w-4xl mx-auto mt-12 px-4">
    <h1 className="text-3xl font-bold text-gray-900 mb-8 border-b pb-2">📅 Upcoming Events</h1>

    {events.length > 0 ? (
      <div className="space-y-6">
        {events.map(event => (
          <div
            key={event._id}
            className="bg-white p-6 rounded-xl shadow-md border hover:shadow-lg transition-shadow"
          >
            <h2 className="text-2xl font-semibold text-blue-700 mb-2">{event.title}</h2>
            <p className="text-gray-700 mb-2">{event.description}</p>
            <p className="text-sm text-gray-500 mb-4">
              <strong>Date:</strong> {new Date(event.date).toLocaleString()}
            </p>
            <Link
              to={`/events/${event._id}`}
              className="inline-block text-sm text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-gray-500 text-center">No events available.</p>
    )}
  </div>
);

};

export default EventList;