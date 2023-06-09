import { ChangeEvent, useState } from "react";

const useSelectedFile = () => {
  const [selectedFile, setSelectedFile] = useState<string>();

  const handleSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    if (e.target.files?.[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setSelectedFile(readerEvent.target.result as string);
      }
    };
  };

  return {
    selectedFile,
    setSelectedFile,
    handleSelectFile,
  };
};

export default useSelectedFile;
