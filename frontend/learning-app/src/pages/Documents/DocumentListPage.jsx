import React ,{useState,useEffect} from "react";
import {Plus,Upload,Trash2,FileText,X} from "lucide-react";
import toast from "react-hot-toast";
import documentService from "../../services/documentService";
import Spinner from "../../components/common/Spinner";

const DocumentListPage = () => {

  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  // State for upload modal
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploading, setUploading] = useState(false);

  // State for delete confirmation modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);
 //BELOW COMMENT WAS FOR DEBUGGING:
  /*const fetchDocuments = async () => {
  try {
    const data = await documentService.getDocuments();

    console.log("API response:", data);

    setDocuments(data);
  } catch (error) {
    console.error("Fetch error:", error);
  } finally {
    setLoading(false);
  }
}; */
   
  const fetchDocuments = async () => {
    try {
      const data = await documentService.getDocuments();
      setDocuments(data);
    } catch (error) {
      toast.error("Failed to fetch documents.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(()=>{
    fetchDocuments();

  },[]);
  const handleFileChange=(e)=>{
    const file=e.target.files[0];
    if(file){
      setUploadFile(file);
      setUploadTitle(file.name.replace(/\.[^/.]+$/,""));

    }
  };
  const handleUpload=async(e)=>{
    e.preventDefault();
    if(!uploadFile||!uploadTitle){
      toast.error("please provide a title and select a file");
      return ;
    }
    setUploading(true);
    const formData=new FormData();
    formData.append("file",uploadFile);
    formData.append("title",uploadTitle);

    try{
      await documentService.uploadDocuments(formData);
      toast.success("Document uploaded successfully ");
      setIsUploadModalOpen(false);
      setUploadFile(null);
      setUploadTitle("");
      setLoading(true);
      fetchDocuments();
    }
    catch(error){
      toast.error(error.message||"upload failed");

    }
    finally{
      setUploading(false);
    }
    };

   const handleDeleteRequest = (doc) => {
  setSelectedDoc(doc);
  setIsDeleteModalOpen(true);
};

const handleConfirmDelete = async () => {
  if (!selectedDoc) return;
  setDeleting(true);
  try {
    await documentService.deleteDocument(selectedDoc._id);
    toast.success(`${selectedDoc.title} deleted.`);
    setIsDeleteModalOpen(false);
    setSelectedDoc(null);
    setDocuments(documents.filter((d) => d._id !== selectedDoc._id));
  } catch (error) {
    toast.error(error.message || "Failed to delete document");
  }
  finally{
    setDeleting(false);
  }
};
const renderContent=()=>{
  return <div>renderContent</div>
}
console.log("documents:", documents);

return (
  <div className="p-6">
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">My Documents</h1>

      <button
        onClick={() => setIsUploadModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2"
      >
        <Plus size={18} />
        Upload Document
      </button>
    </div>

    {isUploadModalOpen && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg w-96">
          <h2 className="text-xl font-bold mb-4">Upload Document</h2>

          <input
            type="text"
            placeholder="Document Title"
            value={uploadTitle}
            onChange={(e) => setUploadTitle(e.target.value)}
            className="border p-2 w-full mb-3"
          />

          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="mb-3 w-full"
          />

          <div className="flex gap-2">
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>

            <button
              onClick={() => setIsUploadModalOpen(false)}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
);
 




/*return (
  <div>DocumentListPage</div>
)*/
}
export default DocumentListPage