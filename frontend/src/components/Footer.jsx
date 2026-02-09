import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-linear-to-b from-gray-900 via-gray-950 to-black text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-6 group">
              <div className="text-4xl transform group-hover:scale-110 transition duration-300">🏠</div>
              <span className="text-2xl font-bold text-white group-hover:text-indigo-400 transition duration-300">
                QuirkyRoomie
              </span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed font-semibold">
              Transform your flatmate conflicts into hilarious moments while maintaining peace and harmony.
            </p>
            <div className="flex gap-4">
              <a href="#" title="Facebook" className="text-gray-400 hover:text-indigo-400 transition text-2xl transform hover:scale-125 duration-300">📘</a>
              <a href="#" title="Twitter" className="text-gray-400 hover:text-indigo-400 transition text-2xl transform hover:scale-125 duration-300">𝕏</a>
              <a href="#" title="Instagram" className="text-gray-400 hover:text-indigo-400 transition text-2xl transform hover:scale-125 duration-300">📷</a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Product</h4>
            <ul className="space-y-4">
              <li>
                <a href="#features" className="text-gray-400 hover:text-indigo-400 transition duration-300 flex items-center gap-2 group">
                  <span className="transform group-hover:translate-x-1 transition duration-300">→</span>
                  <span>Features</span>
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-gray-400 hover:text-indigo-400 transition duration-300 flex items-center gap-2 group">
                  <span className="transform group-hover:translate-x-1 transition duration-300">→</span>
                  <span>Pricing</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-indigo-400 transition duration-300 flex items-center gap-2 group">
                  <span className="transform group-hover:translate-x-1 transition duration-300">→</span>
                  <span>Security</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-indigo-400 transition duration-300 flex items-center gap-2 group">
                  <span className="transform group-hover:translate-x-1 transition duration-300">→</span>
                  <span>Updates</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Company</h4>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-gray-400 hover:text-indigo-400 transition duration-300 flex items-center gap-2 group">
                  <span className="transform group-hover:translate-x-1 transition duration-300">→</span>
                  <span>About Us</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-indigo-400 transition duration-300 flex items-center gap-2 group">
                  <span className="transform group-hover:translate-x-1 transition duration-300">→</span>
                  <span>Blog</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-indigo-400 transition duration-300 flex items-center gap-2 group">
                  <span className="transform group-hover:translate-x-1 transition duration-300">→</span>
                  <span>Careers</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-indigo-400 transition duration-300 flex items-center gap-2 group">
                  <span className="transform group-hover:translate-x-1 transition duration-300">→</span>
                  <span>Contact</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Legal</h4>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-gray-400 hover:text-indigo-400 transition duration-300 flex items-center gap-2 group">
                  <span className="transform group-hover:translate-x-1 transition duration-300">→</span>
                  <span>Privacy Policy</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-indigo-400 transition duration-300 flex items-center gap-2 group">
                  <span className="transform group-hover:translate-x-1 transition duration-300">→</span>
                  <span>Terms of Service</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-indigo-400 transition duration-300 flex items-center gap-2 group">
                  <span className="transform group-hover:translate-x-1 transition duration-300">→</span>
                  <span>Cookie Policy</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-indigo-400 transition duration-300 flex items-center gap-2 group">
                  <span className="transform group-hover:translate-x-1 transition duration-300">→</span>
                  <span>GDPR</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          {/* Newsletter Section */}
          <div className="bg-linear-to-r from-indigo-600 to-indigo-800 rounded-2xl p-8 mb-8 shadow-lg-custom">
            <div className="max-w-md">
              <h4 className="text-white text-xl font-bold mb-2">✉️ Stay Updated</h4>
              <p className="text-indigo-100 mb-5 font-semibold">Get the latest updates on new features and funny stories from our community.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-3 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 text-black placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-white focus:bg-opacity-30 transition font-semibold"
                />
                <button className="px-6 py-3 bg-white text-indigo-600 rounded-lg font-bold hover:bg-indigo-50 transition transform hover:scale-105 duration-300 shadow-soft">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm font-semibold">
            © {currentYear} <span className="text-white font-bold">QuirkyRoomie</span>. All rights reserved. Made with ❤️ for peaceful flatmates.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-indigo-400 transition text-sm font-semibold duration-300">
              Sitemap
            </a>
            <a href="#" className="text-gray-400 hover:text-indigo-400 transition text-sm font-semibold duration-300">
              Status
            </a>
            <a href="#" className="text-gray-400 hover:text-indigo-400 transition text-sm font-semibold duration-300">
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
