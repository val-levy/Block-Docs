import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

export default function FileUploadUI() {
  const [files, setFiles] = useState([]);

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      {/* Inputs */}
      <div className="mb-4">
        <label className="block text-sm font-bold">Mnemonic:</label>
        <Input className="w-full" placeholder="Enter mnemonic" />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold">JWT:</label>
        <Input className="w-full" placeholder="Enter JWT" />
      </div>

      {/* Share Button */}
      <div className="mb-4 flex justify-end">
        <Button className="flex items-center">
          <Upload size={16} className="mr-2" /> Share
        </Button>
      </div>

      {/* Uploaded Files List */}
      <div className="mb-4 border p-2 rounded-lg h-32 overflow-auto">
        <p className="text-sm font-bold">Uploaded Files:</p>
        <ul>
          {files.map((file, index) => (
            <li key={index} className="text-sm">{file.name}</li>
          ))}
        </ul>
      </div>

      {/* Drag & Drop Area */}
      <Card 
        className="p-6 text-center border-dashed border-2 cursor-pointer"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <CardContent className="text-lg font-bold">DRAG & DROP</CardContent>
      </Card>
    </div>
  );
}
