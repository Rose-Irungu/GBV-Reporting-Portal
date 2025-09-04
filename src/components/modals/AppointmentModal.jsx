import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { addAppointment, updateAppointment } from "../../services/appointments";

const AppointmentModal = ({
    isOpen,
    onClose,
    userRole,
    editingAppointment,
    allReports,
    professionals,
}) => {
    const [formData, setFormData] = useState({
        appointment_type: "",
        scheduled_date: "",
        location: "",
        professional: "",
        report: "",
        isVirtual: false,
        notes: "",
        status: ""
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (editingAppointment) {
            setFormData(editingAppointment);
        } else {
            const baseData = {
                appointment_type: "",
                scheduled_date: "",
                location: "",
                report: "",
                isVirtual: false,
                notes: "",
                status: ""
            };
            if (userRole === "admin" || userRole === "survivor") {
                baseData.professional = "";
            }

            setFormData(baseData);
        }

    }, [editingAppointment, userRole]);

        const handleSubmit = async (e) => {
            e.preventDefault();
            setLoading(true);
            if (editingAppointment) {
                 await updateAppointment(formData, editingAppointment.id)
            } else {
                const { status, ...formDataWithoutStatus } = formData;
                await addAppointment(formDataWithoutStatus);
            }

            setLoading(false);
            onClose();
        };

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-md">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">
                            {editingAppointment ? "Edit Appointment" : "Schedule New Appointment"}
                        </h3>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            <X size={20} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Report</label>
                            <select
                                value={formData.report}
                                onChange={(e) =>
                                    setFormData({ ...formData, report: e.target.value })
                                }
                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                                required
                            >
                                <option value="">Select Report...</option>
                                {allReports.map((report) => (
                                    <option key={report.id} value={report.id}>
                                        {report.reference_code}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Appointment Type</label>
                            <select
                                value={formData.appointment_type}
                                onChange={(e) =>
                                    setFormData({ ...formData, appointment_type: e.target.value })
                                }
                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                                required
                            >
                                <option value="">Select type...</option>
                                <option value="counseling">Counseling Session</option>
                                <option value="legal">Legal Consultation</option>
                                <option value="medical">Medical Check-up</option>
                                <option value="follow_up">Follow Up</option>
                                {/*<option value="Support Group">Support Group</option>*/}
                            </select>
                        </div>
                        {(userRole === "admin" || userRole === 'survivor') && (
                            <div>
                                <label className="block text-sm font-medium mb-1">Professional</label>
                                <select
                                    value={formData.professional}
                                    onChange={(e) => setFormData({ ...formData, professional: e.target.value })}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                                >
                                    <option value="">Select a professional...</option>
                                    {professionals.map((pro) => (
                                        <option key={pro.id} value={pro.id}>
                                            {pro.first_name} {pro.last_name} - {pro.role}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}


                        {editingAppointment && (
                            <div>
                                <label className="block text-sm font-medium mb-1">Status</label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                                    required
                                >
                                    <option value="">Select a status...</option>
                                    <option value="scheduled">Scheduled</option>
                                    <option value="confirmed">Confirmed</option>
                                    <option value="cancelled">Cancelled</option>
                                    <option value="completed">Completed</option>
                                </select>

                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium mb-1">Date</label>
                            <input
                                type="datetime-local"
                                value={formData.scheduled_date}
                                onChange={(e) => setFormData({ ...formData, scheduled_date: e.target.value })}
                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Location</label>
                            <input
                                type="text"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                            />
                        </div>


                        <div className="mt-4">
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    checked={formData.isVirtual}
                                    onChange={(e) => setFormData({ ...formData, isVirtual: e.target.checked })}
                                    className="form-checkbox text-indigo-600"
                                />
                                <span className="ml-2 text-sm">Is Virtual</span>
                            </label>
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm font-medium mb-1">Appointment Notes</label>
                            <textarea
                                value={formData.notes}
                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                                rows={4}
                                placeholder="Add any relevant notes here..."
                            />
                        </div>

                        <div className="flex gap-3 pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                            >
                                {editingAppointment ? "Update" : "Schedule"} Appointment
                            </button>
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    export default AppointmentModal;
