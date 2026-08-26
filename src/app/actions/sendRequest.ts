'use server';

import nodemailer from 'nodemailer';

export async function sendRequest(formData: any) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to themselves (Equiplink)
      subject: `New Equipment Request: ${formData.equipmentType}`,
      html: `
        <h2>New Equipment Request via Equiplink</h2>
        
        <h3>Equipment Details</h3>
        <p><strong>Type:</strong> ${formData.equipmentType}</p>
        <p><strong>Quantity:</strong> ${formData.quantity}</p>
        
        <h3>Location</h3>
        <p><strong>Destination:</strong> ${formData.destination}</p>
        
        <h3>Schedule</h3>
        <p><strong>Start Date:</strong> ${formData.date}</p>
        <p><strong>Start Time:</strong> ${formData.time}</p>
        <p><strong>Duration:</strong> ${formData.duration}</p>
        
        <h3>Project Details</h3>
        <p><strong>Description:</strong> ${formData.projectDescription || 'None provided'}</p>
        <p><strong>Delivery Required:</strong> ${formData.deliveryRequired ? 'Yes' : 'No'}</p>
        
        <h3>Contact Info</h3>
        <p><strong>Name:</strong> ${formData.contactName}</p>
        <p><strong>Email:</strong> ${formData.contactEmail}</p>
        <p><strong>Phone:</strong> ${formData.contactPhone}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: 'Failed to send email' };
  }
}
