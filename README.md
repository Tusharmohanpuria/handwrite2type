HandWrite2Type

HandWrite2Type is a comprehensive web application that enables generating personalized fonts from handwritten samples, converting documents between PDF and Word formats, and summarizing text documents. Built with ReactJS and Flask, it leverages image processing, contour detection, character recognition, and the FontForge library to generate TrueType fonts from handwritten samples. The document conversion module uses pdf2docx and tabula-py libraries for PDF-Word conversion and table extraction. The summarization feature, powered by the LaMini-Flan-T5-248M model, generates concise summaries of text documents through natural language processing techniques.

Features

- **Font Generation from Handwritten Samples**: Generate custom TrueType fonts from handwritten character samples.
- **Document Conversion**: Convert PDF documents to editable Word (DOCX) format while preserving formatting and layout.
- **Table Extraction**: Extract tables from PDF documents for further processing or display.
- **Text Summarization**: Generate concise summaries of text documents or PDFs using advanced natural language processing models.
- **Font History and Management**: View, search, filter, and download previously generated fonts.
- **Font Preview**: Preview generated fonts with customizable sample text.

Technologies Used

**Frontend**
- ReactJS
- Tailwind CSS

**Backend**
- Flask
- OpenCV (image processing and contour detection)
- FontForge (character recognition and font generation)
- pdf2docx (PDF-to-Word conversion)
- tabula-py (table extraction from PDFs)
- Hugging Face Transformers (text summarization)
- Spacy (text preprocessing and section identification)

**Database**
- MySQL

Installation

1. Clone the repository: `git clone https://github.com/your-username/HandWrite2Type.git`
2. Install frontend dependencies: `cd frontend && npm install`
3. Install backend dependencies: `cd backend && pip install -r requirements.txt`
4. Set up the MySQL database and update the configuration file with your database credentials.
5. Start the frontend development server: `cd frontend && npm start`
6. Start the backend Flask server: `cd backend && flask run`
7. Open your web browser and navigate to `http://localhost:3000` to access the HandWrite2Type application.
