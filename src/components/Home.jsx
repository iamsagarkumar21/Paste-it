import { Copy, PlusCircle, Info, FileText } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updatePastes } from "../redux/pasteSlice";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "./Footer";

const Home = () => {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createPaste = () => {
    const paste = {
      title,
      content: value,
      _id: pasteId || Date.now().toString(36) + Math.random().toString(36).substring(2),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updatePastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    setTitle("");
    setValue("");
    setSearchParams({});
  };

  const resetPaste = () => {
    setTitle("");
    setValue("");
    setSearchParams({});
  };

  useEffect(() => {
    if (pasteId) {
      const paste = pastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, pastes]);

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center">
      {/* Header Section */}
      <div className="w-full bg-blue-900 py-16 text-center text-white">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to Paste-It!
        </h1>
        <p className="text-lg max-w-xl mx-auto">
          Securely save and manage your notes and text content with ease.
        </p>
        <p className="text-sm max-w-md mx-auto mt-2">
          Create, store, and revisit pastes anytime, anywhere.
        </p>
      </div>

      {/* Main Section */}
      <div className="w-full py-12 max-w-2xl mx-auto px-6 flex flex-col items-center gap-6">
        <motion.div
          className="flex flex-col gap-6 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Input Fields */}
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-black border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <motion.div
            className="relative rounded bg-white shadow border border-gray-300 p-4 w-full"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center justify-between border-b pb-2 mb-3">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <div className="w-3 h-3 bg-green-500 rounded-full" />
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(value);
                  toast.success("Copied to Clipboard");
                }}
                className="hover:text-green-600 transition"
              >
                <Copy size={20} />
              </button>
            </div>
            <textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Write your content here..."
              className="w-full p-3 text-gray-700 border-none focus:outline-none resize-none"
              rows={8}
            />
          </motion.div>

          {/* Button Group */}
          <div className="flex flex-col md:flex-row gap-4 w-full justify-center mt-4">
            <button
              className="w-full md:w-auto bg-blue-600 text-white rounded-lg px-6 py-3 hover:bg-blue-700 transition"
              onClick={createPaste}
            >
              {pasteId ? "Update Paste" : "Create Paste"}
            </button>

            <button
              className="w-full md:w-auto bg-gray-700 text-white rounded-lg px-6 py-3 hover:bg-gray-800 transition"
              onClick={() => navigate("pastes")}
            >
              Previous Notes <FileText size={18} className="ml-2 inline-block" />
            </button>

            {pasteId && (
              <button
                className="w-full md:w-auto bg-red-600 text-white rounded-lg px-6 py-3 hover:bg-red-700 transition"
                onClick={resetPaste}
              >
                Reset <PlusCircle size={18} className="ml-2 inline-block" />
              </button>
            )}
          </div>
        </motion.div>
      </div>

      {/* Additional Sections */}
      <div className="w-full py-12 max-w-2xl mx-auto px-6 flex flex-col items-center gap-6">
        {/* Grouped Buttons */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full">
          <div className="text-center">
            <p className="text-gray-700 font-medium">Want to know how it works?</p>
            <button
              className="mt-4 bg-blue-600 text-white rounded-lg px-6 py-3 hover:bg-blue-700 transition"
              onClick={() => navigate("/howitworks")}
            >
              Learn How It Works <Info size={20} className="ml-2 inline-block" />
            </button>
          </div>

          <div className="text-center">
            <p className="text-gray-700 font-medium">We’d appreciate your feedback!</p>
            <button
              className="mt-4 bg-green-600 text-white rounded-lg px-6 py-3 hover:bg-green-700 transition"
              onClick={() => navigate("/rateit")}
            >
              Rate It
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
