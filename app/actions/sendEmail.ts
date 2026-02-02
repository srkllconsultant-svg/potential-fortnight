"use server";

import nodemailer from 'nodemailer';

export async function sendEmail(formData: any) {
  // 1. Verify credentials exist
  if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
    console.error("CRITICAL: GMAIL_USER or GMAIL_PASS missing in .env");
    return { success: false, error: "Server Configuration Error" };
  }

  // 2. Transporter setup (using recommended settings for Gmail SSL)
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // SSL
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS, // This MUST be the 16-character App Password
    },
  });

  const formattedAppointment = formData.appointmentDate 
    ? new Date(formData.appointmentDate).toLocaleString('en-IN', { 
        dateStyle: 'full', 
        timeStyle: 'short' 
      }) 
    : 'Not Scheduled';

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: 'srkllconsultant@gmail.com',
    replyTo: formData.email,
    subject: `S.R.K Strategic - NEW CASE: ${formData.Village} (${formData.bottleneck})`,
    text: `New Inquiry from ${formData.email}. Meeting: ${formattedAppointment}. Fee: ${formData.preferredFee}.`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; color: #334155; border: 1px solid #f1f5f9; padding: 25px; border-radius: 20px;">
        <h2 style="color: #d97706; border-bottom: 2px solid #f1f5f9; padding-bottom: 10px; margin-bottom: 20px;">S.R.K Strategic - Case Briefing</h2>
        
        <div style="display: flex; gap: 10px; margin-bottom: 25px; background: #0f172a; padding: 20px; border-radius: 12px; color: white;">
          <div style="flex: 1;">
            <p style="margin: 0; font-size: 10px; text-transform: uppercase; color: #94a3b8; font-weight: bold;">Requested Meeting</p>
            <p style="margin: 5px 0 0 0; color: #fbbf24; font-size: 14px; font-weight: bold;">${formattedAppointment}</p>
          </div>
          <div style="flex: 1;">
            <p style="margin: 0; font-size: 10px; text-transform: uppercase; color: #94a3b8; font-weight: bold;">Engagement</p>
            <p style="margin: 5px 0 0 0; color: #fbbf24; font-size: 14px; font-weight: bold;">${formData.preferredFee || 'Not Selected'}</p>
          </div>
        </div>

        <div style="margin-bottom: 20px;">
          <p style="margin: 5px 0;"><strong>Client Email:</strong> ${formData.email}</p>
          <p style="margin: 5px 0;"><strong>WhatsApp:</strong> ${formData.phone}</p>
        </div>

        <div style="background: #f8fafc; padding: 15px; border-radius: 12px; margin-bottom: 20px; border: 1px solid #e2e8f0;">
          <h3 style="color: #475569; margin-top: 0; font-size: 12px; text-transform: uppercase;">Project Classification</h3>
          <p style="margin: 8px 0;"><strong>Project Type:</strong> ${formData.projectType || 'N/A'}</p>
          <p style="margin: 8px 0;"><strong>Primary Bottleneck:</strong> ${formData.bottleneck || 'N/A'}</p>
        </div>

        <h3 style="color: #0f172a; font-size: 12px; text-transform: uppercase;">Property Location</h3>
        <p style="color: #475569; background: #fffbeb; padding: 15px; border-radius: 12px; line-height: 1.6;">
          <strong>Village:</strong> ${formData.Village}<br>
          <strong>Mandal:</strong> ${formData.Mandal}<br>
		  <strong>Revenue Division:</strong> ${formData.RevenueDivision}<br>
          <strong>District:</strong> ${formData.district}, ${formData.state}<br>
          <strong>Survey Nos:</strong> ${formData.surveyNumbers}<br>
          <strong>Total Extent:</strong> ${formData.extent}
        </p>

        <h3 style="color: #0f172a; font-size: 12px; text-transform: uppercase;">Technical Context</h3>
        <div style="font-style: italic; background: #f1f5f9; padding: 15px; border-radius: 12px; color: #1e293b; border-left: 4px solid #d97706;">
          "${formData.context || 'No additional context provided.'}"
        </div>

        <p style="font-size: 10px; color: #94a3b8; margin-top: 30px; text-align: center; border-top: 1px solid #f1f5f9; padding-top: 10px;">
          Briefing contains ${formData.attachments ? formData.attachments.length : 0} document(s).<br>
          S.R.K Strategic Internal System.
        </p>
      </div>
    `,
    attachments: formData.attachments ? formData.attachments.map((file: any) => ({
  filename: file.name,
  content: file.content, // Use the raw buffer directly
})) : []
  };

  try {
    // 3. Force a connection check
    await transporter.verify();
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error: any) {
    // 4. Log the EXACT error to your console
    console.error("NODEMAILER ERROR:", error);
    return { success: false, error: error.message };
  }
}