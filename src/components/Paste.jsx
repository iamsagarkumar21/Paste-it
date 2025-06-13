import { Calendar, Copy, Eye, PencilLine, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { removeFromPastes } from "../redux/pasteSlice";
import { FormatDate } from "../utlis/formatDate";
import { motion } from "framer-motion";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this paste?")) {
      dispatch(removeFromPastes(id));
      toast.success("Paste deleted successfully!");
    }
  };

  const filteredPastes = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
      <div className="flex flex-col gap-y-3">
        {/* Search */}
        <motion.div
          className="w-full flex gap-3 px-4 py-2 rounded-[0.5rem] border border-[rgba(128,121,121,0.3)] bg-white shadow-md mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <input
            type="search"
            placeholder="Search paste here..."
            className="focus:outline-none w-full bg-transparent text-lg placeholder-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </motion.div>

        {/* All Pastes */}
        <motion.div
          className="flex flex-col border border-[rgba(128,121,121,0.3)] py-4 rounded-[0.5rem] bg-white shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="px-4 text-3xl font-bold text-blue-600 border-b border-[rgba(128,121,121,0.3)] pb-4">
            All Pastes
          </h2>
          <div className="w-full px-4 pt-4 flex flex-col gap-y-5">
            {filteredPastes.length > 0 ? (
              filteredPastes.map((paste) => (
                <motion.div
                  key={paste?._id}
                  className="border border-[rgba(128,121,121,0.3)] w-full gap-y-4 justify-between flex flex-col sm:flex-row p-5 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Heading and Description */}
                  <div className="w-[60%] flex flex-col space-y-3">
                    <p className="text-2xl font-semibold text-blue-700 hover:text-blue-900 transition-colors duration-200">
                      {paste?.title}
                    </p>
                    <p className="text-sm font-normal line-clamp-3 max-w-[90%] text-gray-600">
                      {paste?.content}
                    </p>
                  </div>

                  {/* Icons */}
                  <div className="flex flex-col gap-y-4 sm:items-end">
                    <div className="flex gap-3 flex-wrap sm:flex-nowrap">
                      <button
                        className="p-2 rounded-lg bg-white border border-[#c7c7c7] hover:bg-blue-100 group transition-colors duration-300"
                        title="Edit Paste"
                      >
                        <a href={`/?pasteId=${paste?._id}`}>
                          <PencilLine
                            className="text-black group-hover:text-blue-600"
                            size={22}
                          />
                        </a>
                      </button>
                      <button
                        className="p-2 rounded-lg bg-white border border-[#c7c7c7] hover:bg-red-100 group transition-colors duration-300"
                        onClick={() => handleDelete(paste?._id)}
                        title="Delete Paste"
                      >
                        <Trash2
                          className="text-black group-hover:text-red-600"
                          size={22}
                        />
                      </button>

                      <button
                        className="p-2 rounded-lg bg-white border border-[#c7c7c7] hover:bg-orange-100 group transition-colors duration-300"
                        title="View Paste"
                      >
                        <a
                          href={`/pastes/${paste?._id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Eye
                            className="text-black group-hover:text-orange-600"
                            size={22}
                          />
                        </a>
                      </button>
                      <button
                        className="p-2 rounded-lg bg-white border border-[#c7c7c7] hover:bg-green-100 group transition-colors duration-300"
                        onClick={() => {
                          navigator.clipboard.writeText(paste?.content);
                          toast.success("Copied to Clipboard");
                        }}
                        title="Copy Paste"
                      >
                        <Copy
                          className="text-black group-hover:text-green-600"
                          size={22}
                        />
                      </button>
                    </div>

                    <div className="gap-x-2 flex items-center">
                      <Calendar className="text-gray-700" size={20} />
                      <span className="text-sm text-gray-600">
                        {FormatDate(paste?.createdAt)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-2xl text-center w-full text-red-500">
                {searchTerm
                  ? `No pastes found for "${searchTerm}"`
                  : "No Data Found"}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Paste;
