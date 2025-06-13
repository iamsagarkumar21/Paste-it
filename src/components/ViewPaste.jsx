import { Copy } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ViewPaste = () => {
  const { id } = useParams();
  const pastes = useSelector((state) => state.paste.pastes);

  // Find the paste with the matching ID
  const paste = pastes.find((paste) => paste._id === id);

  return (
    <div className="w-full min-h-screen py-10 px-5 flex justify-center items-center bg-gray-50">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
        <div className="flex flex-col gap-4">
          {/* Title Input */}
          <input
            type="text"
            placeholder="Title"
            value={paste?.title || "Untitled"}
            disabled
            className="w-full text-gray-800 border border-gray-300 rounded-md p-3 bg-gray-100 cursor-not-allowed"
          />

          {/* Content Display Area */}
          <div className="relative rounded bg-gray-50 shadow-md border border-gray-300">
            <div className="flex items-center justify-between p-3 bg-gray-200 border-b border-gray-300 rounded-t">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <div className="w-3 h-3 bg-green-500 rounded-full" />
              </div>
              {/* Copy Button */}
              <button
                className="flex items-center text-gray-700 hover:text-green-600 transition"
                onClick={() => {
                  navigator.clipboard.writeText(paste?.content || "");
                  toast.success("Copied to Clipboard", { position: "top-right" });
                }}
              >
                <Copy size={20} className="mr-1" />
                <span>Copy</span>
              </button>
            </div>

            {/* Content Text Area */}
            <textarea
              value={paste?.content || ""}
              disabled
              placeholder="Your content will appear here..."
              className="w-full p-4 text-gray-700 bg-gray-50 border-none resize-none focus:ring-0 cursor-not-allowed"
              rows={10}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPaste;
