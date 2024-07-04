import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';
import { putPromedio } from '../../redux/Actions';
import { readExcelFile } from "../../utils/ReadExcel";
import './FileUpload.css';  // Asegúrate de importar el archivo CSS

const FileUpload = ({ categoriaId }) => {
  const dispatch = useDispatch();

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    readExcelFile(file).then((data) => {
      dispatch(putPromedio(categoriaId, data));
    });
  }, [dispatch, categoriaId]);

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
    </div>
  );
};

export default FileUpload;
