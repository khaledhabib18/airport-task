import { Flight } from 'src/flights/flight.entity';
import { Passenger } from 'src/passengers/passenger.entity';
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
}
