import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-purple-500 text-white py-6 mt-12">
      <div className="text-center space-y-2">
        <p>&copy; {new Date().getFullYear()} GBV Support System</p>
        <p>Emergency Hotline: 123-456-7890</p>

        <div className="mt-4 flex justify-center gap-6 text-xl">
          <a href="https://facebook.com" aria-label="Facebook" className="hover:text-purple-400">
            <FaFacebookF />
          </a>
          <a href="https://twitter.com" aria-label="Twitter" className="hover:text-purple-400">
            <FaTwitter />
          </a>
          <a href="https://instagram.com" aria-label="Instagram" className="hover:text-purple-400">
            <FaInstagram />
          </a>
          <a href="https://linkedin.com" aria-label="LinkedIn" className="hover:text-purple-400">
            <FaLinkedinIn />
          </a>
        </div>
      </div>
    </footer>
  );
}
