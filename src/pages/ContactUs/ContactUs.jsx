// ContactUs.jsx
const ContactUs = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 md:p-12">
      <h1 className="text-3xl font-bold text-center text-primary mb-8">
        Contact Us
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact Form */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Send us a message</h2>
          <form className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <input
                type="text"
                placeholder="Your Name"
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                placeholder="Your Email"
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Message</label>
              <textarea
                rows="5"
                placeholder="Your Message"
                className="textarea textarea-bordered w-full"
              ></textarea>
            </div>
            <button
              type="submit"
              className="btn bg-primary text-white w-full rounded-full"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col justify-center">
          <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
          <p className="mb-2">
            <span className="font-medium">Address:</span> 123 Main Street, Dhaka, Bangladesh
          </p>
          <p className="mb-2">
            <span className="font-medium">Phone:</span> +880 1234 567890
          </p>
          <p className="mb-2">
            <span className="font-medium">Email:</span> info@example.com
          </p>
          <p className="mb-2">
            <span className="font-medium">Website:</span> www.example.com
          </p>
          <div className="mt-4 flex space-x-4">
            <a href="#" className="text-blue-500 hover:underline">
              Facebook
            </a>
            <a href="#" className="text-blue-400 hover:underline">
              Twitter
            </a>
            <a href="#" className="text-pink-500 hover:underline">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
