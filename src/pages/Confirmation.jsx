import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";

export default function Confirmation() {
  const location = useLocation();
  const navigate = useNavigate();

  const booking = location.state;

  // ❗ If user refreshes page → fallback from localStorage
  if (!booking) {
    const savedBookings =
      JSON.parse(localStorage.getItem("bookings")) || [];

    if (savedBookings.length === 0) {
      return <h2>No Booking Found</h2>;
    }

    // get last booking
    const lastBooking = savedBookings[savedBookings.length - 1];

    return <ConfirmationContent booking={lastBooking} navigate={navigate} />;
  }

  return <ConfirmationContent booking={booking} navigate={navigate} />;
}

// ✅ Separate UI component (clean)
function ConfirmationContent({ booking, navigate }) {
  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Travel Booking Confirmation", 20, 20);

    doc.setFontSize(12);
    doc.text(`Booking ID: ${booking.bookingId}`, 20, 40);
    doc.text(`Name: ${booking.name}`, 20, 50);
    doc.text(`Email: ${booking.email}`, 20, 60);
    doc.text(`Contact: ${booking.contact}`, 20, 70);
    doc.text(`Destination: ${booking.destination}`, 20, 80);
    doc.text(`Date: ${booking.date}`, 20, 90);
    doc.text(`Duration: ${booking.duration} Days`, 20, 100);
    doc.text(`Adults: ${booking.adults}`, 20, 110);
    doc.text(`Children: ${booking.children}`, 20, 120);
    doc.text(`Total Price: ₹${booking.totalPrice}`, 20, 130);

    doc.save("Booking.pdf");
  };

  return (
    <section className="confirmation">
      <h2>Booking Confirmed 🎉</h2>

      <div className="confirm-card">
        <p><strong>Booking ID:</strong> {booking.bookingId}</p>
        <p><strong>Name:</strong> {booking.name}</p>
        <p><strong>Email:</strong> {booking.email}</p>
        <p><strong>Contact:</strong> {booking.contact}</p>
        <p><strong>Destination:</strong> {booking.destination}</p>
        <p><strong>Date:</strong> {booking.date}</p>
        <p><strong>Duration:</strong> {booking.duration} Days</p>
        <p><strong>Adults:</strong> {booking.adults}</p>
        <p><strong>Children:</strong> {booking.children}</p>
        <p><strong>Total Price:</strong> ₹{booking.totalPrice}</p>

        <button onClick={downloadPDF}>Download PDF</button>
        <button onClick={() => navigate("/")}>Go Home</button>
      </div>
    </section>
  );
}