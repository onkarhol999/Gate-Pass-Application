# 🚪 Gate Pass Application (SAP UI5)

A **Gate Pass Management Application** built using **SAP UI5**, integrated with **OData services**, and deployed on **SAP BTP / Work Zone**.  
The application allows users to **view gate pass details, generate QR codes, and download the pass as a PDF**.

---

## 📌 Features

- 📄 View Gate Pass details
- 🔢 Display unique Pass Number
- 📱 QR Code generation for each pass
- 📥 Download Gate Pass as PDF
- 🌐 OData service integration
- ☁️ Deployed on SAP BTP / Work Zone
- 📱 Responsive UI (Desktop & Mobile)

---

## 🛠️ Technology Stack

- **Frontend:** SAP UI5 (XML Views, MVC)
- **Backend:** SAP OData Service
- **Deployment:** SAP BTP, Work Zone
- **PDF Generation:** html2canvas + jsPDF
- **QR Code:** External QR API (Base64 embedded)
- **Styling:** Custom CSS

---


---

## 🚀 Application Flow

1. User navigates to Gate Pass detail screen
2. Application fetches pass data via OData
3. QR code is generated using pass details
4. Pass details and QR are displayed
5. User can download the Gate Pass as a PDF

---

## 📄 PDF Download Logic

- Captures the pass layout using `html2canvas`
- Converts UI to high-resolution image
- Generates PDF using `jsPDF`
- Ensures QR code is printable using Base64 encoding
- Applies PDF-only styling for better readability

---

## 🔐 Authentication & Access

- Application deployed on **SAP BTP**
- Access controlled via **BTP Roles & Work Zone**
- Cloud Connector required for on-premise OData access

---

## 📸 Screenshots

> <img width="1599" height="770" alt="Screenshot 2025-12-25 142309" src="https://github.com/user-attachments/assets/26e003f9-3930-45ed-8509-7dcac1b72d6e" />
<img width="1003" height="613" alt="Screenshot 2025-12-25 142854" src="https://github.com/user-attachments/assets/72a4e6f0-722c-4fd8-8bec-3bbe2883933d" />

