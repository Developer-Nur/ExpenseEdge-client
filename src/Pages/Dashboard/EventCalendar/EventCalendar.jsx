import React, { useState, useEffect, useContext } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { AuthInfo } from '../../../Provider/AuthProvider';
import axios from 'axios';

// Initialize moment localizer
const localizer = momentLocalizer(moment);

const EventCalendar = () => {
    const { user } = useContext(AuthInfo);
    const [events, setEvents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalEvent, setModalEvent] = useState({ title: '', start: new Date(), end: new Date(), _id: null });
    const [isEditing, setIsEditing] = useState(false);

    const fetchEvents = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_SERVER_URL}/events/${user.email}`);
            setEvents(data); // Directly set events from the fetched data
            console.log(data);
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    };
    
    // Fetch events when the component mounts
    useEffect(() => {
        fetchEvents();
    }, [user.email]);

    const openModal = (event = { title: '', start: new Date(), end: new Date(), _id: null }, editing = false) => {
        setIsEditing(editing);
        setModalEvent(event);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setModalEvent({ title: '', start: new Date(), end: new Date(), _id: null }); // Reset modal state
    };

    const handleSave = async () => {
        if (modalEvent.title && modalEvent.start && modalEvent.end) {
            const newEvent = { 
                title: modalEvent.title, 
                start: new Date(modalEvent.start), 
                end: new Date(modalEvent.end) 
            };
    
            try {
                if (isEditing) {
                    // Update the existing event
                    console.log("Updating Event:", newEvent);
                    await axios.put(`${import.meta.env.VITE_SERVER_URL}/events/${user.email}/${modalEvent._id}`, newEvent);
                    setEvents((prevEvents) =>
                        prevEvents.map((evt) =>
                            evt._id === modalEvent._id ? { ...evt, ...newEvent } : evt
                        )
                    );
                } else {
                    // Add a new event
                    const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/events/${user.email}`, newEvent);
                    console.log("New Event Response:", response.data); // Log the response to see the new event
                    setEvents((prevEvents) => [...prevEvents, { ...newEvent, _id: response.data._id }]);
                }
            } catch (error) {
                console.error("Error saving event:", error.response ? error.response.data : error.message);
            }
        } else {
            console.error("Title, start, and end are required.");
        }
        await fetchEvents();
        closeModal();
    };

    const handleSelect = ({ start, end }) => {
        openModal({ title: '', start, end });
    };

    const handleEventClick = (event) => {
        openModal(event, true);
    };

    const handleDelete = async () => {
        try {
            console.log("Attempting to delete Event ID:", modalEvent._id); // Log the ID being deleted
            const response = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/events/${user.email}/${modalEvent._id}`);
            console.log("Delete Response:", response.data); // Log the response from the server
    
            setEvents((prevEvents) => prevEvents.filter((event) => event._id !== modalEvent._id)); // Remove from local state
        } catch (error) {
            console.error("Error deleting event:", error.response ? error.response.data : error.message);
        }
        closeModal();
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4 text-center">Events Calendar</h1>
            <Calendar
                localizer={localizer}
                events={events} // Events from state
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500, margin: '50px' }}
                selectable
                onSelectSlot={handleSelect}
                onSelectEvent={handleEventClick}
            />

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
                    <div className="bg-white p-6 rounded-md shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4">{isEditing ? 'Edit Event' : 'Add Event'}</h2>
                        <input
                            type="text"
                            placeholder="Event Name"
                            value={modalEvent.title}
                            onChange={(e) => setModalEvent({ ...modalEvent, title: e.target.value })}
                            className="w-full mb-4 p-2 border rounded"
                        />
                        <div className="flex justify-end space-x-2">
                            {isEditing && (
                                <button
                                    onClick={handleDelete}
                                    className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            )}
                            <button
                                onClick={closeModal}
                                className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventCalendar;
