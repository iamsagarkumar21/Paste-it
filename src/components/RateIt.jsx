import { useState } from "react";
import { motion } from "framer-motion";
import { send } from "emailjs-com";
import toast from "react-hot-toast"; // for toast notifications

const RateIt = () => {
  const [rating, setRating] = useState(0); // Star rating state
  const [hover, setHover] = useState(0); // Hover state for stars
  const [feedback, setFeedback] = useState(""); // Feedback text state
  const [email, setEmail] = useState(""); // User's email
  const [loading, setLoading] = useState(false); // Loading state

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submission starts

    // Send feedback to your Gmail using EmailJS
    const templateParams = {
      from_email: email,
      feedback_message: feedback,
      rating: rating,
    };

    send(
      'service_h86zg5e', // EmailJS Service ID
      'template_sz45plp', // EmailJS Template ID
      templateParams,
      '3EPHpk3EBbowEhwRz' // EmailJS User ID (public key)
    )
      .then((response) => {
        toast.success("Feedback submitted successfully!");
        setLoading(false); // Stop loading when submission is successful
        setEmail(""); // Reset email input
        setFeedback(""); // Reset feedback input
        setRating(0); // Reset star rating
      })
      .catch((error) => {
        toast.error("Error sending feedback. Please try again later.");
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
        <h1 className="text-4xl font-bold text-green-500 mb-2">We Value Your Feedback!</h1>
        <p className="text-lg text-gray-700">Your feedback helps us improve. Thank you!</p>
      </motion.div>

      {/* Rating and Form Section */}
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-8">
        {/* Star Rating */}
        <div className="flex justify-center mb-4">
          {[...Array(5)].map((star, index) => {
            const ratingValue = index + 1;
            return (
              <motion.button
                key={index}
                className={`text-3xl ${
                  ratingValue <= (hover || rating) ? "text-yellow-400" : "text-gray-400"
                }`}
                onClick={() => setRating(ratingValue)}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(rating)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                ★
              </motion.button>
            );
          })}
        </div>

        {/* Feedback Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Your Email (optional):
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              placeholder="example@gmail.com"
            />
          </div>

          {/* Feedback Textarea */}
          <div>
            <label htmlFor="feedback" className="block text-sm font-medium text-gray-700">
              Your Feedback:
            </label>
            <textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              rows="4"
              placeholder="Please share your experience..."
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading} // Disable button when loading
            className={`w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
              loading ? "cursor-not-allowed opacity-50" : ""
            }`}
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
                Submitting...
              </div>
            ) : (
              "Submit Feedback"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RateIt;
