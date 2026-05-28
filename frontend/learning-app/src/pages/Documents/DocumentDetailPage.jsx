import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";

import documentService from "../../services/documentService";
import Spinner from "../../components/Spinner";

const DocumentDetailPage = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  // upload state
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploading, setUploading] = useState(false);

  // delete state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);

  const fetchDocuments = async () => {
    try {
      const data = await documentService.getDocuments();
      setDocuments(data);
    } catch (error) {
      toast.error("Failed to fetch documents");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadFile(file);
      setUploadTitle(file.name.replace(/\.[^/.]+$/, ""));
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!uploadFile || !uploadTitle) {
      toast.error("Please select a file and enter a title");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", uploadFile);
    formData.append("title", uploadTitle);

    try {
      await documentService.uploadDocument(formData);
      toast.success("Document uploaded successfully");

      setIsUploadModalOpen(false);
      setUploadFile(null);
      setUploadTitle("");
      setLoading(true);
      fetchDocuments();
    } catch (error) {
      toast.error("Failed to upload document");
      console.error(error);
    } finally {
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
      await documentService.deleteDocument(selectedDoc.id);
      toast.success("Document deleted successfully");

      setIsDeleteModalOpen(false);
      setSelectedDoc(null);

      // FIXED: filter on documents state
      setDocuments(documents.filter((d) => d.id !== selectedDoc.id));
    } catch (error) {
      toast.error("Failed to delete document");
      console.error(error);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">My Documents</h1>
      <p className="mb-4">Manage and organize your learning materials.</p>

      {documents.length > 0 && (
        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          <Plus size={18} />
          Upload
        </button>
      )}

      {/* Example document list */}
      <div className="mt-4">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="flex justify-between border p-2 mb-2"
          >
            <span>{doc.title}</span>
            <button
              onClick={() => handleDeleteRequest(doc)}
              className="text-red-500"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentDetailPage;