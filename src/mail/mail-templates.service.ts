import { Baggage } from 'src/baggages/baggages.entity';
import { CommonService } from 'src/common/common.service';
import { Flight } from 'src/flights/flight.entity';
import { User } from 'src/users/entities/user.entity';

export class MailTemplateService {
  generateOtpMailTemplate(user: User, otp: string) {
    return `<mjml>
    <mj-body background-color="#f4f6f8">
      <mj-section>
        <mj-column>
  
          <mj-text font-size="20px" font-weight="bold" align="center">
            Welcome ${user.name} 🎉
          </mj-text>
  
          <mj-text align="center" color="#555">
            Thank you for signing up! Please confirm your account using the verification code below.
          </mj-text>
  
          <mj-divider border-color="#dddddd" />
  
          <mj-text align="center" font-size="14px" color="#888">
            Your Signup Verification Code
          </mj-text>
  
          <mj-text
            align="center"
            font-size="36px"
            font-weight="bold"
            letter-spacing="6px"
            color="#2d6cdf"
          >
            ${otp}
          </mj-text>
  
          <mj-text align="center" color="#777" font-size="13px">
            This code will expire in 10 minutes.
          </mj-text>
  
          <mj-divider border-color="#dddddd" />
  
          <mj-text align="center" font-size="12px" color="#999">
            If you didn’t create an account, please ignore this email.
          </mj-text>
  
          <mj-text align="center" font-size="12px" color="#999">
            © ${new Date().getFullYear()} Airport Task — All rights reserved
          </mj-text>
  
        </mj-column>
      </mj-section>
    </mj-body>
  </mjml>
  `;
  }

  generateBookingConfirmationMailTemplate(flight: Flight, user: User) {
    return `<mjml>
  <mj-head>
    <mj-title>Flight Booking Confirmation</mj-title>
    <mj-preview>Your flight has been confirmed ✈️</mj-preview>

    <!-- Global font -->
    <mj-font name="Helvetica" href="https://fonts.googleapis.com/css?family=Helvetica:400,700" />

    <mj-style>
      .flight-detail {
        font-size: 16px;
        color: #555555;
        font-family: Helvetica, Arial, sans-serif;
      }
      .section-title {
        font-size: 18px;
        font-weight: bold;
        padding-bottom: 15px;
        color: #333333;
        font-family: Helvetica, Arial, sans-serif;
      }
      .detail-row {
        padding-bottom: 10px;
      }
    </mj-style>
  </mj-head>

  <mj-body background-color="#f0f2f5">
    
    <!-- Header -->
    <mj-section background-color="#007bff" padding="30px 0">
      <mj-column>
        <mj-text align="center" color="#ffffff" font-size="28px" font-weight="bold" font-family="Helvetica, Arial, sans-serif">
          ✈️ Booking Confirmed
        </mj-text>
        <mj-text align="center" color="#ffffff" font-size="16px" font-family="Helvetica, Arial, sans-serif">
          Thank you, ${user.name}! Your flight has been successfully booked.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Flight Details -->
    <mj-section background-color="#ffffff" border-radius="12px" padding="20px">
      <mj-column>
        <mj-text css-class="section-title">
          Flight Details
        </mj-text>
        <mj-divider border-color="#eeeeee" />

        <!-- Flight detail rows with spacing -->
        <mj-text css-class="flight-detail detail-row">
          <strong>Flight Number:</strong> ${flight.flightNumber}
        </mj-text>
        <mj-text css-class="flight-detail detail-row">
          <strong>Airline:</strong> ${flight.airline}
        </mj-text>
        <mj-text css-class="flight-detail detail-row">
          <strong>From:</strong> ${flight.departureAirport}
        </mj-text>
        <mj-text css-class="flight-detail detail-row">
          <strong>To:</strong> ${flight.destinationAirport}
        </mj-text>
        <mj-text css-class="flight-detail detail-row">
          <strong>Departure:</strong> ${flight.departureTime}
        </mj-text>
        <mj-text css-class="flight-detail detail-row">
          <strong>Arrival:</strong> ${flight.arrivalTime}
        </mj-text>

      </mj-column>
    </mj-section>

    <!-- Footer -->
    <mj-section padding="20px 0">
      <mj-column>
        <mj-text align="center" font-size="12px" color="#999999" font-family="Helvetica, Arial, sans-serif">
          If you have any questions, contact our support team.
        </mj-text>
        <mj-text align="center" font-size="12px" color="#999999" font-family="Helvetica, Arial, sans-serif">
          © ${new Date().getFullYear()} Airport Task System
        </mj-text>
      </mj-column>
    </mj-section>

  </mj-body>
</mjml>
`;
  }
  generateResetPasswordMailTemplate(user: User, otp: string) {
    return `<mjml>
  <mj-body background-color="#f4f6f8">
    <mj-section>
      <mj-column>

        <mj-text font-size="20px" font-weight="bold" align="center">
          Reset Your Password 🔐
        </mj-text>

        <mj-text align="center" color="#555">
          Hello ${user.name},<br/>
          We received a request to reset your password.
        </mj-text>

        <mj-divider border-color="#dddddd" />

        <mj-text align="center" font-size="14px" color="#888">
          Your Password Reset Code
        </mj-text>

        <mj-text
          align="center"
          font-size="36px"
          font-weight="bold"
          letter-spacing="6px"
          color="#2d6cdf"
        >
          ${otp}
        </mj-text>

        <mj-text align="center" color="#777" font-size="13px">
          This code will expire in 10 minutes.
        </mj-text>

        <mj-divider border-color="#dddddd" />

        <mj-text align="center" font-size="12px" color="#999">
          If you didn’t request a password reset, please ignore this email.
        </mj-text>

        <mj-text align="center" font-size="12px" color="#999">
          © ${new Date().getFullYear()} Airport Task — All rights reserved
        </mj-text>

      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`;
  }

  generateBaggageBookingConfirmationMailTemplate(
    user: User,
    flight: Flight,
    baggage: Baggage,
  ) {
    return `<mjml>
  <mj-head>
    <mj-title>Baggage Booking Confirmation</mj-title>
    <mj-preview>Your baggage booking has been confirmed</mj-preview>
    <mj-attributes>
      <mj-all font-family="Arial, Helvetica, sans-serif" />
      <mj-text font-size="14px" color="#333333" />
    </mj-attributes>
  </mj-head>

  <mj-body background-color="#f4f6f8">
    <!-- Header -->
    <mj-section background-color="#0b5ed7" padding="20px">
      <mj-column>
        <mj-text align="center" color="#ffffff" font-size="22px" font-weight="bold">
          Baggage Booking Confirmed
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Main Content -->
    <mj-section background-color="#ffffff" padding="20px">
      <mj-column>
        <mj-text font-size="16px">
          Hello <strong>${user.name}</strong>,
        </mj-text>

        <mj-text>
          Thank you for booking your baggage with us. Your baggage reservation has been
          <strong>successfully confirmed</strong>. Below are the details of your booking:
        </mj-text>

        <!-- Booking Details -->
        <mj-table cellpadding="8px" cellspacing="0" width="100%">
          <tr style="background-color:#f4f6f8;">
            <td><strong>Flight Number</strong></td>
            <td>${flight.flightNumber}</td>
          </tr>
          <tr>
            <td><strong>Route</strong></td>
            <td>${flight.departureAirport} → ${flight.destinationAirport}</td>
          </tr>
          <tr style="background-color:#f4f6f8;">
            <td><strong>Departure Date</strong></td>
            <td>${flight.departureTime}</td>
          </tr>
          <tr>
            <td><strong>Baggage Weight</strong></td>
            <td>${baggage.weight} kg</td>
          </tr>
          <tr>
            <td><strong>Tag Number</strong></td>
            <td><strong>${baggage.tagNumber}</strong></td>
          </tr>
        </mj-table>
        <mj-image
          src="cid:unique@image.cid"
          alt="Baggage Barcode"
          width="280px"
          padding="20px 0"
        />
        <mj-text padding-top="15px">
          Please keep this email for your records and present your booking reference
          at the airport if required.
        </mj-text>

        <mj-text>
          If you need to modify or cancel your baggage booking, please contact our support
          team before your departure.
        </mj-text>

        <mj-text>
          We wish you a pleasant flight! ✈️
        </mj-text>

        <mj-text>
          Best regards,<br />
          <strong>Airport Task</strong>
        </mj-text>
      </mj-column>
    </mj-section>
    <!-- Footer -->
    <mj-section background-color="#f4f6f8" padding="15px">
      <mj-column>
        <mj-text align="center" font-size="12px" color="#777777">
          © ${new Date().getFullYear()} Airport Task. All rights reserved.<br />
          This is an automated email, please do not reply.
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`;
  }
}
