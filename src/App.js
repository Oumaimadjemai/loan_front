import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Paper,
  Typography,
  Button,
  CircularProgress,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CssBaseline,
} from "@mui/material";

export default function App() {
  const [file, setFile] = useState(null);
  const [type, setType] = useState("excel");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDownload = async () => {
    if (!file) {
      alert("الرجاء اختيار ملف Excel أولاً");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("output_type", type);

    try {
      const response = await axios.post("http://127.0.0.1:8000/process/", formData, {
        responseType: "blob", // For binary files
      });

      const blob = new Blob([response.data]);
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = type === "pdf" ? "loan_results.pdf" : "loan_results.xlsx";
      link.click();
    } catch (error) {
      console.error("❌ Axios Error:", error);
      alert("حدث خطأ أثناء معالجة الملف. تأكد من أن الأعمدة صحيحة.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CssBaseline />
      <Container
        maxWidth="sm"
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          direction: "rtl", // يجعل النصوص بالعربية أكثر وضوحًا
          background: "linear-gradient(135deg, #e0f7fa 0%, #e3f2fd 100%)",
        }}
      >
        <Paper
          elevation={6}
          sx={{
            p: 5,
            borderRadius: 4,
            width: "100%",
            textAlign: "center",
            backgroundColor: "#fff",
          }}
        >
          <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", color: "#1565c0" }}>
            🏦 حاسبة القرض من ملف Excel
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            قم برفع ملف Excel يحتوي على بيانات القرض، ثم اختر نوع النتيجة (Excel أو PDF)
          </Typography>

          <Box sx={{ mt: 2 }}>
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileChange}
              style={{
                display: "block",
                margin: "0 auto 20px auto",
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "8px",
              }}
            />

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel id="output-type-label">نوع النتيجة</InputLabel>
              <Select
                labelId="output-type-label"
                value={type}
                label="نوع النتيجة"
                onChange={(e) => setType(e.target.value)}
              >
                <MenuItem value="excel">📊 Excel</MenuItem>
                <MenuItem value="pdf">📄 PDF</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleDownload}
              disabled={loading}
              sx={{
                py: 1.5,
                fontSize: "1rem",
                borderRadius: "10px",
                fontWeight: "bold",
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "تحميل النتيجة"}
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
}
