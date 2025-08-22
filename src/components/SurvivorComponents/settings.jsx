import { useState, useEffect } from "react";
import { Settings } from "lucide-react";
import toast from "react-hot-toast";

const SurvivorProfile = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Fetch profile data when modal opens
  useEffect(() => {
    if (open) {
      setLoading(true);
      fetch("/api/survivor/profile") // 👈 adjust to your backend route
        .then((res) => res.json())
        .then((data) => setProfile(data))
        .catch(() => toast.error("Failed to load profile"))
        .finally(() => setLoading(false));
    }
  }, [open]);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Save updates
  const handleSave = () => {
    setLoading(true);
    fetch("/api/survivor/profile/update", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Profile updated!");
        setOpen(false);
      })
      .catch(() => toast.error("Failed to update"))
      .finally(() => setLoading(false));
  };

  return (
    <div>
      {/* Settings Icon */}
      <button onClick={() => setOpen(true)} className="p-2 hover:bg-gray-100 rounded-full">
        <Settings className="w-6 h-6" />
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-2xl w-96 shadow-xl">
            <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>

            {loading ? (
              <p>Loading...</p>
            ) : (
              <form className="space-y-3">
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full p-2 border rounded"
                />

                <div className="flex justify-end space-x-2 mt-4">
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-200 rounded-lg"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={loading}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SurvivorProfile;
