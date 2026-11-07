# 🚍 DAEWOO Bus Seat Booking System

## 📋 Overview

A professional, interactive seat booking system designed specifically for **DAEWOO luxury buses** featuring a **2+2 seating configuration** (2 seats on left + 2 seats on right per row, 15 rows total). The application provides an intuitive, real-time interface for passengers to view seat availability, select preferred seats, and confirm bookings.

**Live Demo Ready** - Open the HTML file in any modern browser and start booking instantly!

---

## ✨ Features

### 🪑 Seating Configuration
| Feature | Specification |
|---------|---------------|
| **Layout** | 2+2 (4 seats per row) |
| **Total Rows** | 15 rows |
| **Total Seats** | 60 passenger seats |
| **Left Side** | 30 seats (2 per row × 15 rows) |
| **Right Side** | 30 seats (2 per row × 15 rows) |
| **Driver Seat** | Permanently reserved (top, non-bookable) |

### 🎫 Booking Functionality
- ✅ **Visual Seat Status** - Color-coded indicators (Available / Selected / Booked)
- 🔢 **Maximum Selection** - Limit of 8 seats per booking (configurable)
- 📊 **Real-time Summary** - Dynamic display of selected seats, count, and total fare
- 💾 **Booking Confirmation** - Dialog confirmation before finalizing reservations
- 🔄 **Selection Reset** - Clear current selection without affecting booked seats
- 🚫 **Booked Protection** - Already booked seats cannot be reselected

### 💰 Pricing
- **Base Fare**: PKR 850 per seat
- **Auto-calculation**: Total fare updates instantly with seat selection

### 🎨 User Interface
- 📱 **Fully Responsive** - Works on desktop, tablet, and mobile devices
- 🖱️ **Interactive Seats** - Click or keyboard to select and deselect accessible seat buttons
- 🚌 **Realistic Layout** - Row-based design with aisle indicator
- 🎯 **Professional Styling** - Refined travel-themed layout with clear booking details
- 🖼️ **Rotating Coach Photos** - Five bus photos rotate every 3 seconds with clickable indicators and a slow fade

---

## 🛠️ Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **HTML5** | - | Semantic structure |
| **Tailwind CSS** | 3.x CDN | Utility-first responsive styling |
| **JavaScript** | ES6 | Dynamic rendering & state management |
| **Font Awesome** | 6.0.0 | Icons for seats & UI |
| **Google Fonts** | Inter | Modern typography |
| **Local images** | - | Five coach photos stored in `assets/images/` |

---

## 📥 Installation & Setup

### Prerequisites
- ✅ No server or database required
- ✅ Modern web browser (Chrome, Firefox, Safari, Edge)
- ✅ Internet connection (for Tailwind CSS, Font Awesome, and Google Fonts; coach photos are stored locally)

### Quick Start (3 Steps)

#### Step 1: Download
Download the complete project folder so the `assets` files remain alongside `index.html`.

#### Step 2: Open
Double-click the file OR open with any modern web browser

#### Step 3: Book
Click on available seats → Review summary → Confirm booking

### File Structure
daewoo-booking-system/
│
├── index.html          # Main HTML structure
├── assets/
│   ├── favicon.svg     # DAEWOO browser tab icon
│   ├── images/
│   │   ├── coach-night.jpg
│   │   ├── coach-green.jpg
│   │   ├── coach-classic.jpg
│   │   ├── coach-city.jpg
│   │   └── coach-yellow.jpg
│   └── js/
│       └── script.js   # Booking logic, rendering, and photo carousel
└── README.MD           # Project documentation



> **Note**: No build process, no dependencies installation, no server required!

---

## 📖 Usage Guide

### 🎨 Seat Status Indicators

| Appearance | Status | Meaning | Interaction |
|------------|--------|---------|-------------|
| 🟢 White with border | **Available** | Free for booking | Click to select |
| 🟡 Orange/Yellow | **Selected** | Currently chosen | Click to deselect |
| ⚪ Gray with strikethrough | **Booked** | Already reserved | Cannot select |
| 🔵 Dark blue (top) | **Driver Seat** | Permanently reserved | Cannot select |

### 📝 Booking Process

#### 1️⃣ Select Seats
- Click on any **Available** (white) seat to add to selection
- Click on a **Selected** (orange) seat to remove it
- Maximum **8 seats** per transaction

#### 2️⃣ Review Selection
The booking summary panel shows:
- Number of selected seats
- List of seat numbers (e.g., `L3-1`, `R5-2`)
- Total fare in PKR (auto-calculated)

#### 3️⃣ Confirm Booking
- Click **"Confirm Booking"** button
- Review the confirmation dialog
- Upon confirmation, seats become permanently **Booked**

#### 4️⃣ Reset Selection
- Click **"Reset Selection"** to deselect all currently chosen seats
- Does NOT affect already booked seats

### 🔢 Seat Numbering Convention

| Side | Format | Example | Meaning |
|------|--------|---------|---------|
| **Left** | `L{row}-{position}` | `L3-1` | Row 3, Left seat 1 |
| **Left** | `L{row}-{position}` | `L3-2` | Row 3, Left seat 2 |
| **Right** | `R{row}-{position}` | `R5-1` | Row 5, Right seat 1 |
| **Right** | `R{row}-{position}` | `R5-2` | Row 5, Right seat 2 |

---

## 🎯 Demo Data

The application includes **pre-booked example seats** to demonstrate functionality:

| Seat ID | Location | Status |
|---------|----------|--------|
| `row3_L1` | Row 3, Left Seat 1 | Pre-booked |
| `row5_R2` | Row 5, Right Seat 2 | Pre-booked |
| `row8_L2` | Row 8, Left Seat 2 | Pre-booked |
| `row12_R1` | Row 12, Right Seat 1 | Pre-booked |

> 💡 **Tip**: Remove or modify the `preBookSeats` array in the JavaScript to change demo data.

---

## ⚙️ Customization Guide

### Change Seat Price
```javascript
// Line ~220 in the JavaScript
const SEAT_PRICE = 850;  // Change to any value in PKR
 Change Maximum Seats Per Booking
javascript
// Line ~221 in the JavaScript
const MAX_SELECTION = 8;  // Modify as needed
Change Number of Rows
javascript
// Line ~222 in the JavaScript
const TOTAL_ROWS = 15;  // Adjust for different bus configurations
Modify Seat Price Display
The total fare auto-updates via the updateBookingSummary() function. Changing SEAT_PRICE automatically affects all calculations.

Customize Colors
Modify the CSS classes in the <style> section:

.seat.available - Available seat styling

.seat.selected - Selected seat styling

.seat.booked - Booked seat styling

🌐 Browser Compatibility
Browser	Minimum Version	Status
Google Chrome	90+	✅ Fully Supported
Mozilla Firefox	88+	✅ Fully Supported
Apple Safari	14+	✅ Fully Supported
Microsoft Edge	90+	✅ Fully Supported
Opera	75+	✅ Fully Supported
Chrome (Android)	Latest	✅ Fully Supported
Safari (iOS)	14+	✅ Fully Supported
🏗️ Architecture Deep Dive
Data Structure
javascript
seats = [
  {
    id: "row1_L1",      // Unique identifier
    row: 1,              // Row number (1-15)
    side: "left",        // "left" or "right"
    position: 1,         // 1 or 2 (seat position in row)
    label: "L1-1",       // Display label
    status: "available"  // "available", "selected", or "booked"
  },
  // ... 60 seats total
]

🎯 Quick Reference Card
┌─────────────────────────────────────────────────────────┐
│              DAEWOO BUS BOOKING SYSTEM                   │
├─────────────────────────────────────────────────────────┤
│  SEAT STATUS:                                            │
│  ⬜ White      = Available (Click to select)            │
│  🟨 Orange     = Selected (Click to deselect)           │
│  ⬛ Gray       = Booked (Not available)                 │
│  🔵 Dark Blue  = Driver Seat (Fixed)                    │
├─────────────────────────────────────────────────────────┤
│  PRICING:                                                │
│  PKR 850 per seat                                       │
│  Max 8 seats per booking                                │
├─────────────────────────────────────────────────────────┤
│  SHORTCUTS:                                              │
│  Click seat → Select/Deselect                           │
│  Confirm Booking → Finalize reservation                 │
│  Reset Selection → Clear current picks                  │
│  F5 → Refresh page                                      │
└─────────────────────────────────────────────────────────┘

---

## How to Use This README

1. **Save the file**: Copy all the content above and save it as `README.MD` in the same folder as your `index.html` file.

2. **View the README**:
   - On **GitHub/GitLab**: The README will render automatically with all formatting
   - On **VS Code**: Install a Markdown preview extension or right-click → "Open Preview"
   - On **any text editor**: The raw markdown is still readable

3. **Customize**: Replace any placeholder information (company name, pricing, support contacts) with your actual details.

The README includes:
- ✅ Complete project documentation
- ✅ Installation instructions
- ✅ Usage guide with visual indicators
- ✅ Customization options
- ✅ Troubleshooting section
- ✅ Future roadmap
- ✅ Quick reference card