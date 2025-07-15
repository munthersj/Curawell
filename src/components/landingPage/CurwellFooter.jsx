export default function CurwellFooter() {
  return (
    <footer className="bg-curawell text-white pt-130 sm:py-10 px-6 md:px-12 lg:px-20">
      {/* Top section */}
      <div className="flex flex-col md:flex-row md:justify-between gap-10">
        {/* Logo */}
        <div>
          <div className="text-2xl font-bold mb-4 flex items-center gap-2">
            <img
              src="src/assets/lo1go-White.png"
              alt="Curawell Logo"
              className="w-10 h-10 z-50"
            />
            Curawell
          </div>
        </div>

        {/* Links Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-sm">
          <div>
            <h4 className="font-bold text-xl mb-4">Quick links</h4>
            <ul className="space-y-2 text-gray-200">
              <li>Home</li>
              <li>Services</li>
              <li>Doctors</li>
              <li>Pharmacy</li>
              <li>Laboratory</li>
              <li>Contact Us</li>
              <li>FAQs</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xl mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-200">
              <li>Blog</li>
              <li>User guides</li>
              <li>Help Center</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xl mb-4">Company</h4>
            <ul className="space-y-2 text-gray-200">
              <li>About</li>
              <li>Join us</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-xl mb-2">Give us your opinion</h4>
            <p className="text-md mb-4">
              For product announcements and exclusive insights
            </p>
            <div className="flex flex-col sm:flex-row">
              <input
                type="email"
                placeholder="Input your email"
                className="p-2 rounded-t sm:rounded-l sm:rounded-tr-none sm:rounded-br-none bg-white text-curawell placeholder-curawell w-full focus:outline-none"
              />
              <button className="bg-pink-200 text-curawell p-2 rounded-b sm:rounded-r sm:rounded-tl-none sm:rounded-bl-none mt-2 sm:mt-0">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-xs gap-4">
        <div className="text-center md:text-left">
          © 2025 Brand, Inc. ▪ Privacy ▪ Terms ▪ Damascus University
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <select className="bg-white p-2 rounded text-curawell text-sm">
            <option>English</option>
          </select>

          {/* Social Icons */}
          <div className="flex gap-3 text-white text-lg">
            <i className="fab fa-twitter"></i>
            <i className="fab fa-facebook"></i>
            <i className="fab fa-linkedin"></i>
            <i className="fab fa-youtube"></i>
          </div>
        </div>
      </div>
    </footer>
  );
}
