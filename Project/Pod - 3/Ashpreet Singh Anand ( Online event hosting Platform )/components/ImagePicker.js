import { useState } from 'react'
import React from 'react'

function ImagePicker() {
  const [file, setFile] = useState(null)
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null)

  function handleFileChange(event) {
    const selectedFile = event.target.files[0]

    setFile(selectedFile)
    
    if (selectedFile) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result)
      }
      reader.readAsDataURL(selectedFile)
    }
  }
      return (
        <div className=" bg-gray-500 w-9 h-9 rounded-lg cursor-pointer flex justify-center items-center relative">
        {imagePreviewUrl ? (
          <img src={imagePreviewUrl} alt="Selected file" className="absolute w-full h-full object-cover rounded-lg" />
        ) : (
          <span className='w-9 h-9' onClick={() => document.getElementById('filePicker').click()}></span>
        )}
        <input type="file" id="filePicker" className="hidden" onChange={handleFileChange} accept="image/*" />
      </div>
  )
}
export default ImagePicker



