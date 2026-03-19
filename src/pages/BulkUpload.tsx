import { useState } from "react";
import { Upload, FileSpreadsheet, CheckCircle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function BulkUpload() {
  const [dragOver, setDragOver] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Bulk Upload</h1>
        <p className="text-muted-foreground text-sm mt-1">Upload project data via Excel files</p>
      </div>

      <Card>
        <CardContent className="p-8">
          <div
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
              dragOver ? "border-primary bg-accent" : "border-border"
            }`}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => { e.preventDefault(); setDragOver(false); }}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent">
                <Upload className="h-6 w-6 text-accent-foreground" />
              </div>
              <div>
                <p className="font-medium">Drop your Excel file here</p>
                <p className="text-sm text-muted-foreground mt-1">or click to browse. Supports .xlsx and .xls files</p>
              </div>
              <Button variant="outline">
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Select File
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-success" />
              Upload Requirements
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>• File must contain headers in the first row</p>
            <p>• Required columns: Project Code, Name, Department, Budget</p>
            <p>• Maximum 1000 rows per upload</p>
            <p>• All-or-nothing: partial uploads are not allowed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-warning" />
              Recent Uploads
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <p className="text-center py-4">No recent uploads</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
