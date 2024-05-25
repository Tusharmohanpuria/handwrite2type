# HandWrite2Type

HandWrite2Type is a comprehensive web application that enables generating personalized fonts from handwritten samples, converting documents between PDF and Word formats, and summarizing text documents. Built with ReactJS and Flask, it leverages image processing, contour detection, character recognition, and the FontForge library to generate TrueType fonts from handwritten samples. The document conversion module uses pdf2docx and tabula-py libraries for PDF-Word conversion and table extraction. The summarization feature, powered by the LaMini-Flan-T5-248M model, generates concise summaries of text documents through natural language processing techniques.

## Features

- **Font Generation from Handwritten Samples**: Generate custom TrueType fonts from handwritten character samples.
- **Document Conversion**: Convert PDF documents to editable Word (DOCX) format while preserving formatting and layout.
- **Table Extraction**: Extract tables from PDF documents for further processing or display.
- **Text Summarization**: Generate concise summaries of text documents or PDFs using advanced natural language processing models.
- **Font History and Management**: View, search, filter, and download previously generated fonts.
- **Font Preview**: Preview generated fonts with customizable sample text.

## Technologies Used

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

## Installation

1. Clone the repository: `git clone https://github.com/your-username/HandWrite2Type.git`
2. Install frontend dependencies: `cd frontend && npm install`
3. Install backend dependencies: `cd backend && pip install -r requirements.txt`
4. Set up the MySQL database and update the configuration file with your database credentials.
5. Start the frontend development server: `cd frontend && npm start`
6. Start the backend Flask server: `cd backend && flask run`
7. Open your web browser and navigate to `http://localhost:3000` to access the HandWrite2Type application.

## Automated Scripts
  - Windows Batch Script
    This script checks for the necessary installations and starts the backend and frontend.
    ````bash
    @echo off
    REM Check if Node.js is installed
    where node >nul 2>nul
    if %errorlevel% neq 0 (
    echo Node.js is not installed. Please install Node.js to run this script.
    echo.
    REM Pause to keep the command prompt open
    pause
    exit /b 1
    )
    echo Node.js is installed.
    cls
    
    REM Check if MySQL is installed
    where MySQL -u root -p >nul 2>nul
    if %errorlevel% neq 0 (
    echo MySQL is not installed. Please install MySQL to run this script.
    echo.
    REM Pause to keep the command prompt open
    pause
    exit /b 1
    )
    echo MySQL is installed.
    cls
    
    REM Starting Ubuntu
    call start cmd /k "ubuntu"
    REM Pause to keep the command prompt open
    echo Run StartBackend command in the new ubuntu terminal to start the backend APIs.
    echo.
    pause
    
    REM Start frontend in a new terminal
    call start cmd /k "cd Frontend && npm start"
    
    REM Start backend in a new terminal
    call start cmd /k "cd Backend && npm start"
    echo Web app is running.
    
    REM Close the current terminal
    exit
    ````

  - Bash Script
    This script starts the backend APIs.
    ````bash
    #!/bin/bash
    # Start the first API
    cd Api
    gnome-terminal -- python font_generation_api.py
    # Wait for font_generation_api.py to start
    sleep 2
    # Start the second API
    gnome-terminal -- python pdf_processing_api.py
    # Return to the source directory
    cd ../
    # Go to the Summarizer directory
    cd Temp
    # Activate the virtual environment
    source env/bin/activate
    # Run the Summarizer app
    gnome-terminal -- python sum.py
    # Inform that all APIs are running
    echo "Backend is now running."
    # Close this terminal
    exit
    ````
## Project Structure
  - Frontend: Contains the ReactJS code for the user interface.
  - Backend: Contains the Flask APIs for font generation, document conversion, and text summarization.
  - Api: Contains individual API scripts.
  - Temp: Contains the summarizer script and virtual environment.

## Credits
  The following technologies and libraries were used in this project:
  
  - ReactJS: For building the frontend.
  - Flask: For building the backend.
  - FontForge: For generating TrueType fonts.
  - pdf2docx: For converting PDF to DOCX.
  - tabula-py: For extracting tables from PDFs.
  - LaMini-Flan-T5-248M model: For text summarization.
  - Spacy’s en_core_web_sm: For natural language processing.
  - Gnome Terminal: For running backend scripts.

## Note

  The API codes are not yet uploaded on this repository. 
