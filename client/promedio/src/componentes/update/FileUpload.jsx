import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';
import { putPromedio } from '../../redux/Actions';
import { readExcelFile } from "../../utils/ReadExcel";
import ConfirmationModal from '../modal/ConfirmationModal';
import ErrorModal from '../modal/ErrorModal';  // Ajusta la ruta según sea necesario
import './FileUpload.css';

const FileUpload = ({ categoriaId }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [fileData, setFileData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleClose = () => setShowModal(false);
  const handleErrorClose = () => {
    setShowErrorModal(false);
    setErrorMessage('');
  };

  const handleConfirm = () => {
    if (fileData) {
      dispatch(putPromedio(categoriaId, fileData, (error) => {
        setErrorMessage(error);
        setShowErrorModal(true);
      }));
      setFileData(null);
    }
    setShowModal(false);

  };

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    readExcelFile(file).then((data) => {
      setFileData(data);
      setShowModal(true);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="file-upload-container">
      <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>Suelta el archivo aquí ...</p> :
            <p>Arrastra y suelta un archivo Excel aquí, o haz clic para seleccionar uno</p>
        }
      </div>
      <ConfirmationModal
        show={showModal}
        handleClose={handleClose}
        handleConfirm={handleConfirm}
        message="¿Estás seguro de que deseas actualizar con los datos del archivo?"
      />
      <ErrorModal
        show={showErrorModal}
        handleClose={handleErrorClose}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default FileUpload;

