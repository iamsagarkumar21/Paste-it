import { useState } from "react";
import { motion } from "framer-motion";
import { send } from "emailjs-com";
import toast from "react-hot-toast"; // For toast notifications

const ContactUs = () => {
  const [name, setName] = useState("");  
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Start loading when form is submitted

    const templateParams = {
      from_name: name,      // User's name
      from_email: email,    // User's email
      message,              // User's message
    };

    // Use your actual EmailJS credentials
    send(
      'service_h86zg5e',    //  EmailJS Service ID
      'template_acwkvre',   // EmailJS Template ID
      templateParams,
      '3EPHpk3EBbowEhwRz'   // EmailJS Public Key (used as User ID)
    )
      .then((response) => {
        toast.success("Message sent successfully!");
        setLoading(false); // Stop loading after successful submission
        // Clear input fields after successful submission
        setName("");
        setEmail("");
        setMessage("");
      })
      .catch((error) => {
        toast.error("Error sending the message. Please try again later.");
        setLoading(false); // Stop loading on error
      });
  };

  return (
    <div className="w-full h-full bg-gray-100 py-10">
      {/* Intro Message */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-blue-500 mb-2">Get in Touch!</h1>
        <p className="text-lg text-gray-700">We'd love to hear from you. Feel free to reach out with any questions or feedback!</p>
      </motion.div>

      {/* Contact Information Section */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-lg text-gray-700">You can also reach us directly:</p>
        <p className="text-lg text-gray-700">
          Call: <a href="tel:+1234567890" className="text-blue-500 hover:underline">+91-8295343301</a>
        </p>
        <p className="text-lg text-gray-700">
          Email: <a href="mailto:example@gmail.com" className="text-blue-500 hover:underline">sagar.virat18.2004@gmail.com</a>
        </p>
      </motion.div>

      {/* Contact Form Section */}
      <motion.div
        className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-8"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Your Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="John Doe"
              required
            />
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Your Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="example@gmail.com"
              required
            />
          </div>

          {/* Message Textarea */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Your Message:
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              rows="4"
              placeholder="What's on your mind?"
              required
            />
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading} // Disable button when loading
            className={`w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
              loading ? "cursor-not-allowed opacity-50" : ""
            }`}
            whileHover={!loading ? { scale: 1.05 } : {}}
            whileTap={!loading ? { scale: 0.95 } : {}}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
                Sending...
              </div>
            ) : (
              "Send Message"
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default ContactUs;
