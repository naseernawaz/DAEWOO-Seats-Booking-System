/**
 * DAEWOO Bus Booking System - Main JavaScript
 * Version: 1.0.0
 * Description: Handles seat rendering, selection, booking confirmation, and state management
 */

// ==================== CONFIGURATION ====================
const SEAT_PRICE = 850;           // Price per seat in PKR
const MAX_SELECTION = 8;          // Maximum seats per booking
const TOTAL_ROWS = 15;            // Number of rows in the bus
const SEATS_PER_SIDE = 2;         // Seats per side (2 left + 2 right = 4 per row)

// ==================== GLOBAL STATE ====================
let seats = [];                   // Array to store all seat objects
let selectedSeats = [];           // Array to store IDs of currently selected seats

// ==================== INITIALIZATION ====================

/**
 * Initialize all seats with default properties
 * Creates 15 rows × 4 seats = 60 total passenger seats
 */
function initSeats() {
    seats = [];

    for (let row = 1; row <= TOTAL_ROWS; row++) {
        // Left side seats (2 seats)
        for (let pos = 1; pos <= SEATS_PER_SIDE; pos++) {
            seats.push({
                id: `row${row}_L${pos}`,
                row: row,
                side: 'left',
                position: pos,
                label: `L${row}-${pos}`,
                status: 'available'
            });
        }

        // Right side seats (2 seats)
        for (let pos = 1; pos <= SEATS_PER_SIDE; pos++) {
            seats.push({
                id: `row${row}_R${pos}`,
                row: row,
                side: 'right',
                position: pos,
                label: `R${row}-${pos}`,
                status: 'available'
            });
        }
    }

    // Pre-book example seats to demonstrate functionality
    preBookExampleSeats();
}

/**
 * Pre-book some example seats for demonstration
 * Modify this array to change default booked seats
 */
function preBookExampleSeats() {
    const exampleBookedSeats = [
        'row3_L1',    // Row 3, Left Seat 1
        'row5_R2',    // Row 5, Right Seat 2
        'row8_L2',    // Row 8, Left Seat 2
        'row12_R1'    // Row 12, Right Seat 1
    ];

    exampleBookedSeats.forEach(seatId => {
        const seat = seats.find(s => s.id === seatId);
        if (seat && seat.status === 'available') {
            seat.status = 'booked';
        }
    });
}

// ==================== RENDERING ====================

/**
 * Render all seats in the DOM
 * Groups seats by row and creates the visual layout
 */
function renderSeats() {
    const container = document.getElementById('seatsContainer');
    if (!container) {
        console.error('Seats container not found!');
        return;
    }

    container.innerHTML = '';

    // Group seats by row and render each row
    for (let row = 1; row <= TOTAL_ROWS; row++) {
        const rowSeats = seats.filter(s => s.row === row);
        const leftSeats = rowSeats.filter(s => s.side === 'left').sort((a, b) => a.position - b.position);
        const rightSeats = rowSeats.filter(s => s.side === 'right').sort((a, b) => a.position - b.position);

        const rowDiv = createRowElement(row, leftSeats, rightSeats);
        container.appendChild(rowDiv);
    }

    updateBookingSummary();
}

/**
 * Create a single row element with all its seats
 * @param {number} rowNum - Row number
 * @param {Array} leftSeats - Array of left side seat objects
 * @param {Array} rightSeats - Array of right side seat objects
 * @returns {HTMLElement} The complete row element
 */
function createRowElement(rowNum, leftSeats, rightSeats) {
    const rowDiv = document.createElement('div');
    rowDiv.className = 'mb-1 grid min-h-[60px] grid-cols-[30px_minmax(0,1fr)_34px_minmax(0,1fr)] items-center gap-0.5 rounded-[11px] border border-transparent px-0.5 py-[5px] transition-colors hover:border-[#e8edf1] hover:bg-white sm:grid-cols-[39px_minmax(0,1fr)_42px_minmax(0,1fr)] sm:gap-[7px] sm:px-1.5 md:min-h-[70px]';

    // Row number display
    const rowNumDiv = document.createElement('div');
    rowNumDiv.className = 'grid h-[25px] w-[27px] place-items-center justify-self-center rounded-[7px] bg-[#eaf0f4] text-[8px] font-bold text-[#8794a1] sm:w-[31px] sm:text-[9px]';
    rowNumDiv.innerText = `Row ${rowNum}`;

    // Left seats group
    const leftGroup = document.createElement('div');
    leftGroup.className = 'flex justify-center gap-1.5 sm:gap-[clamp(7px,1.4vw,14px)]';
    leftSeats.forEach(seat => {
        leftGroup.appendChild(createSeatElement(seat));
    });

    // Aisle indicator
    const aisleDiv = document.createElement('div');
    aisleDiv.className = 'flex items-center justify-center gap-0.5 text-[8px] font-semibold text-[#8c9aa5] sm:gap-1 sm:text-[9px]';
    aisleDiv.innerHTML = '<i class="fas fa-grip-lines-vertical"></i><span class="hidden sm:inline">Aisle</span>';
    aisleDiv.title = 'Aisle';

    // Right seats group
    const rightGroup = document.createElement('div');
    rightGroup.className = 'flex justify-center gap-1.5 sm:gap-[clamp(7px,1.4vw,14px)]';
    rightSeats.forEach(seat => {
        rightGroup.appendChild(createSeatElement(seat));
    });

    rowDiv.appendChild(rowNumDiv);
    rowDiv.appendChild(leftGroup);
    rowDiv.appendChild(aisleDiv);
    rowDiv.appendChild(rightGroup);

    return rowDiv;
}

/**
 * Create a single seat DOM element
 * @param {Object} seat - Seat object
 * @returns {HTMLElement} The seat element
 */
function createSeatElement(seat) {
    const seatDiv = document.createElement('button');
    seatDiv.type = 'button';
    seatDiv.id = seat.id;
    seatDiv.className = `seat ${seat.status} relative flex min-h-[45px] w-11 min-w-0 flex-col items-center justify-center gap-[3px] rounded-[11px_11px_8px_8px] border p-[5px_3px] shadow-[0_2px_5px_rgb(24_42_58_/_7%),inset_0_2px_0_#fff] transition-[border-color,background,transform,box-shadow,color] duration-200 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#4d9ac8] disabled:cursor-not-allowed sm:min-h-[53px] sm:w-[76px] md:min-h-[61px] md:w-[88px] md:gap-1`;
    seatDiv.classList.add(...getSeatStateClasses(seat.status));
    seatDiv.setAttribute('aria-label', `Seat ${seat.label}, ${seat.status}`);
    seatDiv.setAttribute('aria-pressed', String(seat.status === 'selected'));

    // Add icon based on seat position
    const icon = document.createElement('i');
    icon.className = `fas ${seat.side === 'left' ? 'fa-couch' : 'fa-chair'} grid h-[19px] w-[23px] place-items-center rounded-[6px_6px_4px_4px] text-[11px] sm:h-[21px] sm:w-[25px] sm:text-xs md:h-6 md:w-[29px] md:text-sm`;

    // Seat label
    const labelSpan = document.createElement('span');
    labelSpan.innerText = seat.label;

    // Position indicator
    const posSpan = document.createElement('span');
    posSpan.className = 'text-[8px] font-medium text-[#8a98a4] sm:text-[9px] md:text-[10px]';
    posSpan.innerText = seat.side === 'left' ? `L${seat.position}` : `R${seat.position}`;

    seatDiv.appendChild(icon);
    seatDiv.appendChild(labelSpan);
    seatDiv.appendChild(posSpan);

    // Keep booked seats visible, but unavailable to mouse and keyboard users.
    if (seat.status === 'booked') {
        seatDiv.disabled = true;
    }

    seatDiv.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleSeatSelection(seat.id);
    });

    return seatDiv;
}

function getSeatStateClasses(status) {
    const stateClasses = {
        available: [
            'border-[#d3dee6]',
            'bg-gradient-to-b',
            'from-white',
            'to-[#f9fbfc]',
            'text-[#4a6377]',
            'cursor-pointer',
            'hover:-translate-y-[3px]',
            'hover:scale-[1.03]',
            'hover:border-[#7799b0]',
            'hover:shadow-[0_8px_16px_rgb(24_42_58_/_16%),inset_0_2px_0_#fff]',
            'hover:[&>i]:bg-[#e2edf4]',
            'active:translate-y-0',
            'active:scale-[.97]',
            'md:hover:-translate-y-[3px]'
        ],
        selected: [
            'border-[#e69a27]',
            'bg-gradient-to-b',
            'from-[#fff7e9]',
            'to-[#ffedce]',
            'text-[#8d5107]',
            'shadow-[0_0_0_1px_#e69a27,0_3px_8px_rgb(220_143_28_/_14%)]',
            '[&>i]:bg-[#f8dcae]',
            '[&>i]:text-[#a45b00]'
        ],
        booked: [
            'border-[#dce2e6]',
            'bg-[repeating-linear-gradient(135deg,#eef1f3,#eef1f3_5px,#e8ecef_5px,#e8ecef_10px)]',
            'text-[#929da5]',
            'shadow-none',
            '[&>i]:bg-[#e0e5e8]',
            '[&>i]:text-[#87949d]',
            '[&>.seat-label]:line-through'
        ]
    };

    return stateClasses[status];
}

// ==================== SEAT SELECTION LOGIC ====================

/**
 * Toggle seat selection (select/deselect)
 * @param {string} seatId - Unique identifier of the seat
 */
function toggleSeatSelection(seatId) {
    const seat = seats.find(s => s.id === seatId);

    if (!seat || seat.status === 'booked') {
        return; // Cannot select booked seats
    }

    if (seat.status === 'selected') {
        // Deselect the seat
        const index = selectedSeats.indexOf(seatId);
        if (index !== -1) {
            selectedSeats.splice(index, 1);
        }
        seat.status = 'available';
    }
    else if (seat.status === 'available') {
        // Check maximum selection limit
        if (selectedSeats.length >= MAX_SELECTION) {
            alert(`You can select maximum ${MAX_SELECTION} seats at a time. Please deselect some seats first.`);
            return;
        }
        selectedSeats.push(seatId);
        seat.status = 'selected';
    }

    // Re-render to update UI
    renderSeats();

    const updatedSeat = document.getElementById(seatId);
    if (updatedSeat) {
        updatedSeat.focus();
    }
}

// ==================== BOOKING SUMMARY ====================

/**
 * Update the booking summary panel with current selection
 * Shows selected seats count, list, and total fare
 */
function updateBookingSummary() {
    const selectedCountSpan = document.getElementById('selectedCount');
    const selectedSeatsListDiv = document.getElementById('selectedSeatsList');
    const totalPriceSpan = document.getElementById('totalPrice');
    const confirmBtn = document.getElementById('confirmBookingBtn');

    const selectedSeatObjects = seats.filter(s => selectedSeats.includes(s.id));
    const count = selectedSeatObjects.length;

    // Update count display
    selectedCountSpan.innerText = count;

    if (count === 0) {
        selectedSeatsListDiv.innerHTML = '<span class="text-[#8995a0]">No seats selected</span>';
        totalPriceSpan.innerText = `PKR 0`;
        confirmBtn.disabled = true;
    } else {
        const labels = selectedSeatObjects.map(s => s.label).join(', ');
        selectedSeatsListDiv.innerHTML = `<strong class="text-[#465d70]">${labels}</strong> <span class="ml-1 inline-block rounded-[10px] bg-[#fff0d9] px-1.5 py-[3px] text-[9px] text-[#a45b00]">${count} seat(s)</span>`;
        const total = count * SEAT_PRICE;
        totalPriceSpan.innerText = `PKR ${total.toLocaleString()}`;
        confirmBtn.disabled = false;
    }
}

// ==================== BOOKING OPERATIONS ====================

/**
 * Confirm the booking for selected seats
 * Changes selected seats status to 'booked' and clears selection
 */
function confirmBooking() {
    if (selectedSeats.length === 0) {
        alert('Please select at least one seat to book.');
        return;
    }

    const totalAmount = selectedSeats.length * SEAT_PRICE;
    const confirmAction = confirm(
        `Confirm booking of ${selectedSeats.length} seat(s) for PKR ${totalAmount.toLocaleString()}?\n\n` +
        `Seats: ${seats.filter(s => selectedSeats.includes(s.id)).map(s => s.label).join(', ')}`
    );

    if (!confirmAction) return;

    // Update status of selected seats to 'booked'
    for (let seatId of selectedSeats) {
        const seat = seats.find(s => s.id === seatId);
        if (seat && seat.status === 'selected') {
            seat.status = 'booked';
        }
    }

    // Clear selection array
    selectedSeats = [];

    // Re-render the UI
    renderSeats();

    // Show success message
    alert('✅ Booking confirmed successfully!\n\nSelected seats have been reserved. Thank you for choosing DAEWOO Executive Coach Services.');
}

/**
 * Reset current seat selection
 * Changes all selected seats back to 'available' status
 */
function resetSelection() {
    if (selectedSeats.length === 0) {
        alert('No seats are currently selected.');
        return;
    }

    const confirmReset = confirm(`Are you sure you want to reset selection for ${selectedSeats.length} seat(s)?`);

    if (!confirmReset) return;

    // Reset status of selected seats to 'available'
    for (let seatId of selectedSeats) {
        const seat = seats.find(s => s.id === seatId);
        if (seat && seat.status === 'selected') {
            seat.status = 'available';
        }
    }

    // Clear selection array
    selectedSeats = [];

    // Re-render the UI
    renderSeats();
}

// ==================== UTILITY FUNCTIONS ====================

/**
 * Get seat information by ID (for debugging)
 * @param {string} seatId - Seat identifier
 * @returns {Object|null} Seat object or null if not found
 */
function getSeatById(seatId) {
    return seats.find(s => s.id === seatId) || null;
}

/**
 * Get all booked seats (for reporting)
 * @returns {Array} Array of booked seat objects
 */
function getBookedSeats() {
    return seats.filter(s => s.status === 'booked');
}

/**
 * Get all available seats (for reporting)
 * @returns {Array} Array of available seat objects
 */
function getAvailableSeats() {
    return seats.filter(s => s.status === 'available');
}

/**
 * Calculate total revenue from booked seats
 * @returns {number} Total revenue in PKR
 */
function calculateTotalRevenue() {
    const bookedSeats = getBookedSeats();
    return bookedSeats.length * SEAT_PRICE;
}

// ==================== HERO PHOTO ROTATION ====================

function initHeroPhotoRotation() {
    const heroImage = document.querySelector('.hero-image');
    if (!heroImage || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

    const slides = [
        {
            src: heroImage.currentSrc || heroImage.src,
            alt: heroImage.alt
        },
        {
            src: 'assets/images/coach-green.jpg',
            alt: 'Modern green executive coach ready for a journey'
        },
        {
            src: 'assets/images/coach-classic.jpg',
            alt: 'White and brown coach bus'
        },
        {
            src: 'assets/images/coach-city.jpg',
            alt: 'Blue city bus driving along a street'
        },
        {
            src: 'assets/images/coach-yellow.jpg',
            alt: 'Yellow and black coach bus on the road'
        }
    ];

    const indicators = document.querySelector('.hero-indicators');
    const availableSlides = [slides[0]];
    const preloadPromises = slides.slice(1).map(slide => new Promise(resolve => {
        const image = new Image();
        image.onload = () => resolve(slide);
        image.onerror = () => {
            console.warn(`Unable to load coach photo: ${slide.src}`);
            resolve(null);
        };
        image.src = slide.src;
    }));

    Promise.all(preloadPromises).then(preloadedSlides => {
        preloadedSlides.forEach(slide => {
            if (slide) {
                availableSlides.push(slide);
            }
        });

        if (availableSlides.length < 2) {
            return;
        }

        let currentSlide = 0;
        let transitionTimeout;
        const indicatorButtons = availableSlides.map((slide, index) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'grid h-[30px] w-[30px] cursor-pointer place-items-center rounded-full border-0 bg-transparent p-0 before:h-2 before:w-2 before:rounded-[10px] before:border before:border-white/90 before:bg-white/55 before:transition-[width,background,box-shadow] before:duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white motion-reduce:before:transition-none';
            button.setAttribute('aria-label', `Show coach photo ${index + 1} of ${availableSlides.length}`);
            button.setAttribute('aria-pressed', String(index === currentSlide));
            button.addEventListener('click', () => showSlide(index));
            indicators.appendChild(button);
            return button;
        });

        function updateIndicators() {
            indicatorButtons.forEach((button, index) => {
                const isActive = index === currentSlide;
                button.classList.toggle('before:w-[21px]', isActive);
                button.classList.toggle('before:bg-[#ffc462]', isActive);
                button.classList.toggle('before:shadow-[0_0_8px_rgb(255_196_98_/_55%)]', isActive);
                button.setAttribute('aria-pressed', String(isActive));
            });
        }

        function showSlide(index) {
            if (index === currentSlide) {
                return;
            }

            currentSlide = index;
            const nextSlide = availableSlides[currentSlide];
            heroImage.classList.add('opacity-[.15]', 'scale-[1.04]');
            window.clearTimeout(transitionTimeout);
            updateIndicators();

            transitionTimeout = window.setTimeout(() => {
                heroImage.src = nextSlide.src;
                heroImage.alt = nextSlide.alt;
                heroImage.classList.remove('opacity-[.15]', 'scale-[1.04]');
            }, 550);
        }

        updateIndicators();
        window.setInterval(() => {
            if (document.hidden) {
                return;
            }

            showSlide((currentSlide + 1) % availableSlides.length);
        }, 3000);
    });
}

// ==================== EVENT LISTENERS & INITIALIZATION ====================

/**
 * Initialize the application
 * Sets up event listeners and renders the initial seat layout
 */
function init() {
    const currentYear = document.getElementById('currentYear');
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    initHeroPhotoRotation();

    // Initialize seat data
    initSeats();

    // Render the seat layout
    renderSeats();

    // Set up event listeners for buttons
    const confirmBtn = document.getElementById('confirmBookingBtn');
    const resetBtn = document.getElementById('resetSelectionBtn');

    if (confirmBtn) {
        confirmBtn.addEventListener('click', confirmBooking);
    } else {
        console.error('Confirm booking button not found!');
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', resetSelection);
    } else {
        console.error('Reset selection button not found!');
    }

    // Log initialization success
    console.log('DAEWOO Bus Booking System initialized successfully');
    console.log(`Total seats: ${seats.length}`);
    console.log(`Available seats: ${getAvailableSeats().length}`);
    console.log(`Booked seats: ${getBookedSeats().length}`);
}

// Start the application when DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);