import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Nav from "../components/Nav";
import { getCurrentUser } from '../services/authService';
import { getAllUsers, deleteUser, updateUser } from '../services/adminService';
import { getAllRooms, createRoom, updateRoom, deleteRoom } from '../services/adminService';
import { getAllBookings, updateBooking } from '../services/adminService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RoomsManagement = ({ rooms, onRefresh }) => {
  const [editingRoom, setEditingRoom] = useState(null);
  const [roomForm, setRoomForm] = useState({
    type: '',
    price: '',
    description: '',
    availability: true
  });
  
  const [newRoomForm, setNewRoomForm] = useState({
    type: '',
    price: '',
    description: '',
    availability: true
  });
  
  const handleEditRoom = (room) => {
    setEditingRoom(room._id);
    setRoomForm({
      type: room.type,
      price: room.price,
      description: room.description || '',
      availability: room.availability
    });
  };
  
  const handleCancelEdit = () => {
    setEditingRoom(null);
    setRoomForm({
      type: '',
      price: '',
      description: '',
      availability: true
    });
  };
  
  const handleRoomUpdate = async (roomId) => {
    try {
      await updateRoom(roomId, roomForm);
      toast.success('Room updated successfully');
      setEditingRoom(null);
      onRefresh();
    } catch (error) {
      toast.error(error.message || 'Failed to update room');
    }
  };
  
  const handleDeleteRoom = async (roomId) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      try {
        await deleteRoom(roomId);
        toast.success('Room deleted successfully');
        onRefresh();
      } catch (error) {
        toast.error(error.message || 'Failed to delete room');
      }
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRoomForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : name === 'price' ? Number(value) : value
    }));
  };
  
  const handleNewRoomInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewRoomForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : name === 'price' ? Number(value) : value
    }));
  };
  
  const handleAddRoom = async () => {
    // Validate form
    if (!newRoomForm.type || !newRoomForm.price) {
      toast.error('Room type and price are required');
      return;
    }
    
    try {
      await createRoom(newRoomForm);
      toast.success('Room added successfully');
      // Reset form
      setNewRoomForm({
        type: '',
        price: '',
        description: '',
        availability: true
      });
      onRefresh();
    } catch (error) {
      toast.error(error.message || 'Failed to add room');
    }
  };
  
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Manage Rooms</h3>
      
      <div className="bg-indigo-50 p-4 rounded-lg mb-6">
        <h4 className="font-bold mb-2">Add New Room</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            name="type"
            placeholder="Room Type"
            value={newRoomForm.type}
            onChange={handleNewRoomInputChange}
            className="px-3 py-2 border rounded"
          />
          <input
            type="number"
            name="price"
            placeholder="Price per Night"
            value={newRoomForm.price}
            onChange={handleNewRoomInputChange}
            className="px-3 py-2 border rounded"
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={newRoomForm.description}
            onChange={handleNewRoomInputChange}
            className="px-3 py-2 border rounded"
          />
          <button 
            onClick={handleAddRoom}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
          >
            Add Room
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left">Room Type</th>
              <th className="py-2 px-4 text-left">Price</th>
              <th className="py-2 px-4 text-left">Description</th>
              <th className="py-2 px-4 text-left">Availability</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map(room => (
              <tr key={room._id} className="border-b">
                <td className="py-2 px-4">
                  {editingRoom === room._id ? (
                    <input
                      type="text"
                      name="type"
                      value={roomForm.type}
                      onChange={handleInputChange}
                      className="px-2 py-1 border rounded w-full"
                    />
                  ) : (
                    room.type
                  )}
                </td>
                <td className="py-2 px-4">
                  {editingRoom === room._id ? (
                    <input
                      type="number"
                      name="price"
                      value={roomForm.price}
                      onChange={handleInputChange}
                      className="px-2 py-1 border rounded w-full"
                    />
                  ) : (
                    `Rs.${room.price}`
                  )}
                </td>
                <td className="py-2 px-4">
                  {editingRoom === room._id ? (
                    <input
                      type="text"
                      name="description"
                      value={roomForm.description}
                      onChange={handleInputChange}
                      className="px-2 py-1 border rounded w-full"
                    />
                  ) : (
                    room.description || '-'
                  )}
                </td>
                <td className="py-2 px-4">
                  {editingRoom === room._id ? (
                    <select
                      name="availability"
                      value={roomForm.availability.toString()}
                      onChange={handleInputChange}
                      className="px-2 py-1 border rounded"
                    >
                      <option value="true">Available</option>
                      <option value="false">Not Available</option>
                    </select>
                  ) : (
                    room.availability ? 'Available' : 'Not Available'
                  )}
                </td>
                <td className="py-2 px-4">
                  {editingRoom === room._id ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleRoomUpdate(room._id)}
                        className="px-3 py-1 bg-green-600 text-white rounded text-sm"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="px-3 py-1 bg-gray-600 text-white rounded text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditRoom(room)}
                        className="px-3 py-1 bg-indigo-600 text-white rounded text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteRoom(room._id)}
                        className="px-3 py-1 bg-red-600 text-white rounded text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const BookingsManagement = ({ bookings, onRefresh }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const handleUpdateStatus = async (bookingId, status) => {
    try {
      await updateBooking(bookingId, { status });
      toast.success(`Booking ${status}`);
      onRefresh();
    } catch (error) {
      toast.error(error.message || 'Failed to update booking');
    }
  };
  
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Manage Bookings</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left">Guest</th>
              <th className="py-2 px-4 text-left">Room</th>
              <th className="py-2 px-4 text-left">Dates</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking._id} className="border-b">
                <td className="py-2 px-4">{booking.user.username}</td>
                <td className="py-2 px-4">{booking.room.type}</td>
                <td className="py-2 px-4">{formatDate(booking.startDate)} - {formatDate(booking.endDate)}</td>
                <td className="py-2 px-4">
                  <span className={`px-2 py-1 rounded text-xs ${
                    booking.status === 'booked' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {booking.status.toUpperCase()}
                  </span>
                </td>
                <td className="py-2 px-4">
                  {booking.status === 'booked' ? (
                    <button
                      onClick={() => handleUpdateStatus(booking._id, 'cancelled')}
                      className="px-3 py-1 bg-red-600 text-white rounded text-sm"
                    >
                      Cancel
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUpdateStatus(booking._id, 'booked')}
                      className="px-3 py-1 bg-green-600 text-white rounded text-sm"
                    >
                      Restore
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const UsersManagement = ({ users, onRefresh }) => {
  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(userId);
        toast.success('User deleted successfully');
        onRefresh();
      } catch (error) {
        toast.error(error.message || 'Failed to delete user');
      }
    }
  };
  
  const handleToggleRole = async (user) => {
    const newRole = user.role === 'admin' ? 'user' : 'admin';
    try {
      await updateUser(user._id, { role: newRole });
      toast.success(`User role updated to ${newRole}`);
      onRefresh();
    } catch (error) {
      toast.error(error.message || 'Failed to update user role');
    }
  };
  
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Manage Users</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left">Username</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Role</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id} className="border-b">
                <td className="py-2 px-4">{user.username}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">
                  <span className={`px-2 py-1 rounded text-xs ${
                    user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {user.role.toUpperCase()}
                  </span>
                </td>
                <td className="py-2 px-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleToggleRole(user)}
                      className="px-3 py-1 bg-indigo-600 text-white rounded text-sm"
                    >
                      {user.role === 'admin' ? 'Make User' : 'Make Admin'}
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="px-3 py-1 bg-red-600 text-white rounded text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('rooms');
  const [rooms, setRooms] = useState([]);
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    
    fetchData();
  }, [activeTab]);
  
  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'rooms') {
        const roomsData = await getAllRooms();
        setRooms(roomsData);
      } else if (activeTab === 'users') {
        const usersData = await getAllUsers();
        setUsers(usersData);
      } else if (activeTab === 'bookings') {
        const bookingsData = await getAllBookings();
        setBookings(bookingsData);
      }
    } catch (error) {
      console.error(`Error fetching ${activeTab}:`, error);
      toast.error(`Failed to load ${activeTab}. ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  // Redirect if not admin
  if (user && user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }
  
  return (
    <>
      <Nav />
      <ToastContainer position="top-right" autoClose={5000} />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-indigo-50">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-serif font-bold text-gray-800 mb-6">Admin Dashboard</h1>
          
          {/* Admin tabs */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
            <div className="flex border-b">
              <button 
                className={`px-6 py-3 text-lg font-medium ${activeTab === 'rooms' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('rooms')}
              >
                Rooms
              </button>
              <button 
                className={`px-6 py-3 text-lg font-medium ${activeTab === 'bookings' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('bookings')}
              >
                Bookings
              </button>
              <button 
                className={`px-6 py-3 text-lg font-medium ${activeTab === 'users' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('users')}
              >
                Users
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Tab content */}
      <section className="py-8 mb-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-md">
              {activeTab === 'rooms' && <RoomsManagement rooms={rooms} onRefresh={fetchData} />}
              {activeTab === 'bookings' && <BookingsManagement bookings={bookings} onRefresh={fetchData} />}
              {activeTab === 'users' && <UsersManagement users={users} onRefresh={fetchData} />}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default AdminDashboard; 