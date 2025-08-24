import { useState } from 'react';
import {
    Users as UserIcon,
    Plus,
    Search,
    Filter,
    MoreHorizontal,
    Edit,
    Trash2,
    Eye,
    UserCheck,
    UserX,
    Shield,
    Stethoscope,
    Scale,
    Heart,
    User
} from 'lucide-react';

export default function UsersManagement({ onCreateUser, Users }) {
    const [selectedTab, setSelectedTab] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    // const [selectedUsers, setSelectedUsers] = useState([]);

    const getRoleIcon = (role) => {
        const icons = {
            counselor: Heart,
            doctor: Stethoscope,
            lawyer: Scale,
            survivor: User,
            admin: Shield
        };
        const IconComponent = icons[role] || User;
        return <IconComponent className="w-4 h-4" />;
    };

    const getRoleBadgeColor = (role) => {
        const colors = {
            counselor: "bg-green-100 text-green-800",
            doctor: "bg-blue-100 text-blue-800",
            lawyer: "bg-purple-100 text-purple-800",
            survivor: "bg-orange-100 text-orange-800",
            admin: "bg-red-100 text-red-800"
        };
        return colors[role] || "bg-gray-100 text-gray-800";
    };

    const getStatusBadge = (is_active) => {
        return is_active ? (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <UserCheck className="w-3 h-3 mr-1" />
                Active
            </span>
        ) : (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                <UserX className="w-3 h-3 mr-1" />
                Inactive
            </span>
        );
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const filteredUsers = Users.filter(user => {
        const matchesSearch = user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());

        if (selectedTab === 'all') return matchesSearch;
        return matchesSearch && user.role === selectedTab;
    });

    const tabs = [
        { id: 'all', label: 'All Users', count: Users.length },
        { id: 'counselor', label: 'Counselors', count: Users.filter(u => u.role === 'counselor').length },
        { id: 'doctor', label: 'Doctors', count: Users.filter(u => u.role === 'doctor').length },
        { id: 'lawyer', label: 'Lawyers', count: Users.filter(u => u.role === 'lawyer').length },
        { id: 'survivor', label: 'Survivors', count: Users.filter(u => u.role === 'survivor').length },
        { id: 'admin', label: 'Admins', count: Users.filter(u => u.role === 'admin').length }
    ];

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                        <UserIcon className="h-8 w-8 text-purple-600" />
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
                            <p className="text-gray-600">Manage platform users and their roles</p>
                        </div>
                    </div>
                    <button
                        onClick={onCreateUser}
                        className="flex items-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-lg transition-all"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add User
                    </button>
                </div>

                {/* Search and Filter */}
                <div className="flex items-center space-x-4 mb-6">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                    </div>
                    <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <Filter className="w-4 h-4 mr-2" />
                        Filter
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex space-x-1">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setSelectedTab(tab.id)}
                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${selectedTab === tab.id
                                ? 'text-purple-600 bg-purple-50 border border-purple-200'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                }`}
                        >
                            {tab.label}
                            <span className="ml-2 px-2 py-0.5 text-xs bg-gray-200 rounded-full">
                                {tab.count}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                User
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Role
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Activity
                            </th>
                            {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Last Login
                            </th> */}
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredUsers.map(user => (
                            <tr key={user.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold">
                                            {user.first_name.charAt(0)}{user.last_name.charAt(0)}
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">
                                                {user.first_name} {user.last_name}
                                            </div>
                                            <div className="text-sm text-gray-500">{user.email}</div>
                                            <div className="text-xs text-gray-400">{user.phone_number}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getRoleBadgeColor(user.role)}`}>
                                        {getRoleIcon(user.role)}
                                        <span className="ml-1">{user.role}</span>
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {getStatusBadge(user.is_active)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    <div className="flex space-x-4">
                                        {(user.appointments_count > 0 | user.reports_count > 0) && (
                                            <>
                                                <span className="text-blue-600">{user.appointments_count} appointments</span>
                                                <span className="text-green-600">{user.reports_count} reports</span>
                                            </>

                                        )}

                                    </div>
                                </td>
                                {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {formatDate(user.last_login)}
                                </td> */}
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex items-center space-x-2">
                                        <button className="text-blue-600 hover:text-blue-900 p-1 rounded">
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        <button className="text-gray-600 hover:text-gray-900 p-1 rounded">
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button className="text-red-600 hover:text-red-900 p-1 rounded">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                        <button className="text-gray-400 hover:text-gray-600 p-1 rounded">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Footer with pagination */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                        Showing {filteredUsers.length} of {Users.length} users
                    </div>
                    <div className="flex space-x-1">
                        <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 border border-gray-300 rounded">
                            Previous
                        </button>
                        <button className="px-3 py-1 text-sm bg-purple-600 text-white rounded">
                            1
                        </button>
                        <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 border border-gray-300 rounded">
                            2
                        </button>
                        <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 border border-gray-300 rounded">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}