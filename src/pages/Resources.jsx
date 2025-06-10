import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Resources() {
  return (
    <div>
      

      <section className="bg-purple-100 py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-purple-800 mb-6">
            Resources & Support
          </h1>
          <p className="text-gray-700 text-lg mb-10">
            Find trusted tools, helplines, and guides to help you or someone you care about navigate gender-based violence safely.
          </p>
        </div>

        {/* Resource Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Hotline Card */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition">
            <h2 className="text-xl font-semibold text-purple-700 mb-2">24/7 Helpline</h2>
            <p className="text-gray-700 mb-4">
              Speak to a trained counselor any time. Confidential and free.
            </p>
            <p className="font-bold text-purple-900">📞 +254 800 720 999</p>
          </div>

          {/* Legal Aid */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition">
            <h2 className="text-xl font-semibold text-purple-700 mb-2">Legal Assistance</h2>
            <p className="text-gray-700 mb-4">
              Connect with organizations offering free legal guidance for survivors of GBV.
            </p>
            <a href="https://www.fidakenya.org" target="_blank" rel="noreferrer" className="text-purple-600 underline">
              Visit FIDA Kenya
            </a>
          </div>

          {/* Mental Health */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition">
            <h2 className="text-xl font-semibold text-purple-700 mb-2">Mental Health Support</h2>
            <p className="text-gray-700 mb-4">
              Access safe spaces for therapy, trauma recovery, and emotional support.
            </p>
            <a href="https://www.befrienderskenya.org" target="_blank" rel="noreferrer" className="text-purple-600 underline">
              Visit Befrienders Kenya
            </a>
          </div>

          {/* Safe Houses */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition">
            <h2 className="text-xl font-semibold text-purple-700 mb-2">Safe Housing</h2>
            <p className="text-gray-700 mb-4">
              Temporary shelters for survivors in danger. Find one near you.
            </p>
            <a href="/safe-houses" className="text-purple-600 underline">
              View Locations
            </a>
          </div>

          {/* Educational Materials */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition">
            <h2 className="text-xl font-semibold text-purple-700 mb-2">Awareness Guides</h2>
            <p className="text-gray-700 mb-4">
              Download PDFs on rights, reporting procedures, and bystander action.
            </p>
            <a href="/downloads/gbv_guide.pdf" className="text-purple-600 underline">
              Download Now
            </a>
          </div>

          {/* Community Support */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition">
            <h2 className="text-xl font-semibold text-purple-700 mb-2">Community Groups</h2>
            <p className="text-gray-700 mb-4">
              Join peer-led support groups and survivor networks online or in person.
            </p>
            <a href="/support-groups" className="text-purple-600 underline">
              Find a Group
            </a>
          </div>
        </div>
      </section>

     
    </div>
  );
}

