import axios from 'axios';

// Email notification types
export const EMAIL_TYPES = {
  TICKET_CREATED: 'TICKET_CREATED',
  TICKET_UPDATED: 'TICKET_UPDATED',
  TICKET_RESOLVED: 'TICKET_RESOLVED',
  TICKET_ESCALATED: 'TICKET_ESCALATED',
};

// Email templates for different notification types
const EMAIL_TEMPLATES = {
  [EMAIL_TYPES.TICKET_CREATED]: {
    subject: 'Your Support Ticket Has Been Created - #{ticketId}',
    body: `
      Dear {name},

      Thank you for contacting our support team. Your ticket has been created successfully.

      Ticket Details:
      - Ticket ID: {ticketId}
      - Subject: {subject}
      - Category: {category}
      - Priority: {priority}

      We will review your request and respond as soon as possible. You can view your ticket status
      by logging into your account.

      Best regards,
      The Support Team
    `,
  },
  [EMAIL_TYPES.TICKET_UPDATED]: {
    subject: 'Update on Your Support Ticket - #{ticketId}',
    body: `
      Dear {name},

      There has been an update to your support ticket.

      Ticket Details:
      - Ticket ID: {ticketId}
      - Subject: {subject}
      - Status: {status}

      Latest Update:
      {message}

      You can view the full conversation and respond by logging into your account.

      Best regards,
      The Support Team
    `,
  },
  [EMAIL_TYPES.TICKET_RESOLVED]: {
    subject: 'Support Ticket Resolved - #{ticketId}',
    body: `
      Dear {name},

      Your support ticket has been resolved.

      Ticket Details:
      - Ticket ID: {ticketId}
      - Subject: {subject}
      - Resolution: {resolution}

      If you're satisfied with the resolution, no further action is needed. If you need
      additional assistance, you can reopen the ticket by responding to this email or
      through your account.

      We appreciate your feedback! Please take a moment to rate your support experience.

      Best regards,
      The Support Team
    `,
  },
  [EMAIL_TYPES.TICKET_ESCALATED]: {
    subject: 'Support Ticket Escalated - #{ticketId}',
    body: `
      Dear {name},

      Your support ticket has been escalated for priority handling.

      Ticket Details:
      - Ticket ID: {ticketId}
      - Subject: {subject}
      - New Priority: {priority}

      Our senior support team has been notified and will review your case as soon as possible.
      We appreciate your patience.

      Best regards,
      The Support Team
    `,
  },
};

/**
 * Replaces template variables with actual values
 * @param {string} template - The email template
 * @param {Object} data - The data to populate the template with
 * @returns {string} - The populated template
 */
const populateTemplate = (template, data) => {
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    return data[key] || match;
  });
};

/**
 * Sends an email notification
 * @param {string} type - The type of notification from EMAIL_TYPES
 * @param {Object} ticket - The ticket object
 * @param {string} [message] - Optional message for updates
 * @returns {Promise} - Resolves when email is sent
 */
export const sendEmailNotification = async (type, ticket, message = '') => {
  try {
    const template = EMAIL_TEMPLATES[type];
    if (!template) {
      throw new Error(`Invalid email type: ${type}`);
    }

    const templateData = {
      ticketId: ticket.id,
      name: ticket.name,
      subject: ticket.subject,
      category: ticket.category,
      priority: ticket.priority,
      status: ticket.status,
      message: message,
      resolution: message, // Use message as resolution for resolved tickets
    };

    const emailContent = {
      to: ticket.email,
      subject: populateTemplate(template.subject, templateData),
      body: populateTemplate(template.body, templateData),
    };

    // Here you would typically call your backend API to send the email
    // For now, we'll just log it
    console.log('Sending email:', emailContent);

    // Uncomment and configure when backend is ready
    /*
    await axios.post('/api/notifications/email', {
      type,
      content: emailContent,
      ticketId: ticket.id,
    });
    */

    return true;
  } catch (error) {
    console.error('Error sending email notification:', error);
    throw error;
  }
};

/**
 * Schedules a follow-up email if no response is received
 * @param {Object} ticket - The ticket object
 * @param {number} delayHours - Hours to wait before sending follow-up
 */
export const scheduleFollowUpEmail = async (ticket, delayHours = 48) => {
  try {
    // Here you would typically call your backend API to schedule a follow-up
    console.log(`Scheduling follow-up email for ticket ${ticket.id} in ${delayHours} hours`);

    // Uncomment and configure when backend is ready
    /*
    await axios.post('/api/notifications/schedule', {
      ticketId: ticket.id,
      delayHours,
      type: 'follow_up',
    });
    */
  } catch (error) {
    console.error('Error scheduling follow-up email:', error);
    throw error;
  }
};

/**
 * Sends a satisfaction survey email after ticket resolution
 * @param {Object} ticket - The ticket object
 */
export const sendSatisfactionSurvey = async (ticket) => {
  try {
    const surveyData = {
      ticketId: ticket.id,
      name: ticket.name,
      subject: ticket.subject,
    };

    // Here you would typically call your backend API to send the survey
    console.log('Sending satisfaction survey for ticket:', surveyData);

    // Uncomment and configure when backend is ready
    /*
    await axios.post('/api/notifications/survey', {
      ticketId: ticket.id,
      email: ticket.email,
      type: 'satisfaction_survey',
    });
    */
  } catch (error) {
    console.error('Error sending satisfaction survey:', error);
    throw error;
  }
}; 