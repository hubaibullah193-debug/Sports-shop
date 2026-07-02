import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async (
  to: string,
  subject: string,
  html: string
) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    });
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

export const sendOrderConfirmation = async (
  email: string,
  orderNumber: string,
  total: number
) => {
  const html = `
    <h2>Order Confirmation</h2>
    <p>Thank you for your order!</p>
    <p><strong>Order Number:</strong> ${orderNumber}</p>
    <p><strong>Total:</strong> $${total.toFixed(2)}</p>
    <p>We'll send you tracking information soon.</p>
  `;

  return sendEmail(email, 'Order Confirmation', html);
};

export const sendWelcomeEmail = async (email: string, firstName: string) => {
  const html = `
    <h2>Welcome to Elite Sports!</h2>
    <p>Hi ${firstName},</p>
    <p>Welcome to our store. We're excited to have you!</p>
    <p>Start exploring our products now.</p>
  `;

  return sendEmail(email, 'Welcome to Elite Sports', html);
};
