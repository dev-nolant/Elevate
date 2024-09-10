import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { name, email, message } = await request.json();

  const transporter = nodemailer.createTransport({
    host: 'mail.privateemail.com', // PrivateEmail SMTP server
    port: 465, // Use 465 for SSL
    secure: true, // True for SSL
    auth: {
      user: process.env.PRIVATE_EMAIL_USER, // Your PrivateEmail address, e.g., info@elevate.codes
      pass: process.env.PRIVATE_EMAIL_PASS, // Your PrivateEmail password
    },
  });

  // Email to yourself with importance
  const mailOptionsToSelf = {
    from: '"Elevate Codes" <info@elevate.codes>', // Send from your PrivateEmail address
    to: process.env.PRIVATE_EMAIL_USER, // Your PrivateEmail address or another receiving address
    subject: `Contact form submission from ${name}`,
    text: message,
    html: `<p><strong>Name:</strong> ${name}</p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Message:</strong> ${message}</p>`,
    headers: {
      'X-Priority': '1', // High priority
      'Importance': 'high',
    },
  };

  // Thank you email to the user
  const mailOptionsToUser = {
    from: '"Elevate Codes" <info@elevate.codes>', // Send from your PrivateEmail address
    to: email, // The user's email address
    subject: 'Thank you for contacting Elevate!',
    text: `Dear ${name},\n\nThank you for reaching out to us! We have received your message and will get back to you shortly.\n\nBest regards,\n[Your Name]\n[Your Title]\nElevate Codes\nPhone: (123) 456-7890\nEmail: info@elevate.codes`,
    html: `<p>Dear ${name},</p>
           <p>Thank you for reaching out to us! We have received your message and will get back to you shortly.</p>
           <p>Best regards,<br>Nolan Taft<br>Founder & CEO, Elevate<br>Crafting Code, Shaping Solutions<br>https://elevate.codes<br>+1 (813) 530-5847<br></p>`,
  };

  try {
    // Send the email to yourself
    await transporter.sendMail(mailOptionsToSelf);

    // Send the thank you email to the user
    await transporter.sendMail(mailOptionsToUser);

    return NextResponse.json({ message: 'Message sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Error sending message' }, { status: 500 });
  }
}
