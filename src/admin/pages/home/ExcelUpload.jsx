import React, { useEffect, useState } from "react";
import { Modal, Input, DatePicker, Upload, Button, Form } from "antd";
import DefaultHeader from "../../components/DefaultHeader";
import { add_excel, delete_excel_sheet, edit_excel_sheet, getExcelSheet } from "../../../config/api_helper";
import { ERROR_NOTIFICATION, SUCCESS_NOTIFICATION } from "../../../helper/notification_helper";
import moment from "moment";
import _ from "lodash";
import Icon_Helper from "../../../helper/Icon_Helper";
import Image_Helper from "../../../helper/Image_Helper";

const ExcelUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [excelData, setExcelData] = useState([]);
  const [fileName, setFileName] = useState("");
  const [uploadDate, setUploadDate] = useState(null);
  const [filelist, setFileList] = useState([]);
  const [id, setId] = useState(null);

  const handleButtonClick = () => {
    setIsModalVisible(true);
  };

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
    if (fileList.length > 0) {
      setSelectedFile(fileList[0].originFileObj);
    } else {
      setSelectedFile(null);
    }
  };

  const handleOk = async () => {
    if (!fileName || !uploadDate) {
      ERROR_NOTIFICATION("Please fill all fields");
      return;
    }

    const formData = new FormData();

    if (selectedFile) {
      formData.append("excelFile", selectedFile);
    }

    formData.append("fileName", fileName);
    formData.append("uploadDate", uploadDate.format("YYYY-MM-DD"));

    try {
      let result = "";

      if (id) {
        result = await edit_excel_sheet(formData, id);
      } else {
        if (!selectedFile) {
          ERROR_NOTIFICATION("Please select a file to upload.");
          return;
        }
        result = await add_excel(formData);
      }

      SUCCESS_NOTIFICATION(result);
      fetchData();
      setSelectedFile(null);
    } catch (err) {
      console.log(err);
      ERROR_NOTIFICATION("Upload failed");
    } finally {
      setIsModalVisible(false);
      resetForm();
    }
  };

  const handleEdit = (file) => {
    try {
      setFileName(file.fileName);
      setUploadDate(moment(file.uploadDate));
      setId(file._id);
      setFileList([
        {
          uid: "-1",
          name: file.fileDetails?.originalFileName || file.fileName,
          status: "done",
          url: file.fileDetails?.filePath,
        },
      ]);
      setSelectedFile(null);
      setIsModalVisible(true);
    } catch (err) {
      console.log(err);
    }
  };

  const resetForm = () => {
    setSelectedFile(null);
    setFileList([]);
    setFileName("");
    setUploadDate(null);
    setId(null);
  };

  const fetchData = async () => {
    try {
      const result = await getExcelSheet();
      const data = _.get(result, "data.data", []);
      setExcelData(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCancel = () => {
    setIsModalVisible(false);
    resetForm();
  };

  const handleDelete = async (id) => {
    try {
      const result = await delete_excel_sheet(id);
      fetchData();
      SUCCESS_NOTIFICATION(result);
    } catch (err) {
      console.log(err);
      ERROR_NOTIFICATION(err);
    }
  };

  const handleDownload = async (file) => {
    try {
      const response = await fetch(file.fileDetails.filePath, {
        method: "GET",
        headers: {
          Authorization: `Bearer YOUR_TOKEN`,
        },
      });

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", file.fileDetails.originalFileName || "file.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (err) {
      console.error("Download failed", err);
      ERROR_NOTIFICATION("Download failed");
    }
  };

  return (
    <div className="p-4">
      <div className="center_div justify-between">
        <DefaultHeader title="Excel Sheet Folder" />
        <button onClick={handleButtonClick} className="bg-secondary text-white font-bold px-4 py-2 rounded transition">
          Upload Sheet
        </button>
      </div>

      <Modal
        title="Upload Excel Sheet"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="submit" onClick={handleOk} className="custom-select-file">
            UPLOAD
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item label="File Name" required>
            <Input placeholder="Enter File Name" value={fileName} onChange={(e) => setFileName(e.target.value)} className="h-[50px]" />
          </Form.Item>

          <Form.Item label="Upload Date" required>
            <DatePicker style={{ width: "100%" }} value={uploadDate} onChange={(date) => setUploadDate(date)} className="h-[50px]" />
          </Form.Item>

          <Form.Item label="Select Excel File" required>
            <Upload beforeUpload={() => false} onChange={handleFileChange} maxCount={1} accept=".xls,.xlsx" fileList={filelist}>
              <Button className="custom-select-file">Select File</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 mt-6">
        {excelData.map((file) => (
          <div key={file._id} className="bg-[#f9fbfc] border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-4 flex flex-col justify-between h-[230px] cursor-pointer">
            <div className="flex justify-between w-full text-[11px] text-gray-400 mb-2">
              <span>{(file.fileDetails?.size / 1024).toFixed(2)} KB</span>
              <span>{moment(file.uploadDate).format("MMM DD, YYYY")}</span>
            </div>

            <img src={Image_Helper.EXCEL_IMG} alt="File" className="w-full h-[80px] object-contain" />

            <p className="text-[15px] font-semibold text-center truncate">{file.fileName}</p>

            <div className="flex justify-around gap-4 text-xl border-t pt-2">
              <button title="Edit" className="text-gray-600 hover:text-blue-600" onClick={() => handleEdit(file)}>
                <Icon_Helper.EDIT_ICON />
              </button>
              <button title="Delete" className="text-gray-600 hover:text-red-600" onClick={() => handleDelete(file._id)}>
                <Icon_Helper.DELETE_ICON />
              </button>
              <button className="text-gray-600 hover:text-green-600" title="Download" onClick={() => handleDownload(file)}>
                <Icon_Helper.DOWNLOAD_ICON />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExcelUpload;
