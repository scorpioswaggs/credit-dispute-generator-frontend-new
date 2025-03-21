// Automated response templates based on ticket categories and keywords
const AUTO_RESPONSES = {
  account: {
    keywords: ['password', 'login', 'sign in', 'access'],
    response: `Thank you for contacting our support team regarding your account issue. Here are some quick steps you can try:

1. Clear your browser cache and cookies
2. Try resetting your password using the "Forgot Password" link
3. Ensure you're using the correct email address
4. Check if your account is verified

If you've already tried these steps, please let us know and we'll investigate further.`
  },
  billing: {
    keywords: ['payment', 'charge', 'refund', 'subscription'],
    response: `Thank you for your billing inquiry. To help you faster:

1. Please provide your transaction ID if available
2. Confirm the date of the transaction
3. Specify if this is about a refund, charge, or subscription issue

Our billing team will review your case and respond within 24 hours.`
  },
  technical: {
    keywords: ['error', 'bug', 'not working', 'failed'],
    response: `Thank you for reporting this technical issue. To help us diagnose the problem:

1. Please provide any error messages you're seeing
2. List the steps to reproduce the issue
3. Specify your browser and operating system
4. Attach screenshots if possible

Our technical team will investigate and get back to you shortly.`
  },
  feature: {
    keywords: ['suggest', 'feature', 'add', 'improve'],
    response: `Thank you for your feature suggestion! We value user feedback and continuously work to improve our service.

Your request has been logged and will be reviewed by our product team. We'll keep you updated on any developments.`
  },
  dispute: {
    keywords: ['letter', 'credit report', 'bureau', 'dispute'],
    response: `Thank you for contacting us about your dispute letter. For faster assistance:

1. Please specify which credit bureau(s) you're disputing with
2. Indicate if you've already generated a letter
3. Provide any error messages you encountered
4. Mention if this is your first dispute

Our dispute specialists will review your case and provide guidance.`
  }
};

// Email templates for notifications
const EMAIL_TEMPLATES = {
  ticketCreated: (ticket) => ({
    subject: `[Ticket #${ticket.id}] We've received your request`,
    body: `Dear ${ticket.name},

Thank you for contacting CrediSure Support. Your ticket has been created and our team will review it shortly.

Ticket Details:
- Ticket ID: ${ticket.id}
- Subject: ${ticket.subject}
- Priority: ${ticket.priority}
- Category: ${ticket.category}

We'll notify you as soon as there's an update to your ticket. You can also check the status of your ticket by logging into your account.

Best regards,
CrediSure Support Team`
  }),
  ticketUpdated: (ticket, message) => ({
    subject: `[Ticket #${ticket.id}] New update on your ticket`,
    body: `Dear ${ticket.name},

There has been a new update to your support ticket.

Ticket Details:
- Ticket ID: ${ticket.id}
- Subject: ${ticket.subject}
- Status: ${ticket.status}

Update:
${message}

You can view the full conversation and respond by logging into your account.

Best regards,
CrediSure Support Team`
  }),
  ticketResolved: (ticket) => ({
    subject: `[Ticket #${ticket.id}] Your ticket has been resolved`,
    body: `Dear ${ticket.name},

Your support ticket has been marked as resolved.

Ticket Details:
- Ticket ID: ${ticket.id}
- Subject: ${ticket.subject}
- Resolution: ${ticket.resolution || 'Issue resolved'}

If you're satisfied with the resolution, no further action is needed. If you need additional assistance, you can reopen the ticket by responding to this email or creating a new ticket.

Thank you for using CrediSure!

Best regards,
CrediSure Support Team`
  })
};

// Function to generate automated response based on ticket content
export const generateAutoResponse = (ticket) => {
  const { category, subject, message } = ticket;
  const content = `${subject} ${message}`.toLowerCase();
  
  // Find matching category and keywords
  const categoryResponses = AUTO_RESPONSES[category];
  if (categoryResponses) {
    const hasKeywords = categoryResponses.keywords.some(keyword => 
      content.includes(keyword.toLowerCase())
    );
    
    if (hasKeywords) {
      return categoryResponses.response;
    }
  }
  
  // Default response if no specific match found
  return `Thank you for contacting CrediSure Support. Our team will review your request and get back to you as soon as possible.

In the meantime, you can:
1. Check our FAQ section for immediate answers
2. Review your ticket details in your account
3. Add any additional information to your ticket

We aim to respond to all tickets within 24 hours.`;
};

// Function to generate email notification content
export const generateEmailContent = (type, ticket, message = '') => {
  const template = EMAIL_TEMPLATES[type];
  if (template) {
    return template(ticket, message);
  }
  return null;
};

// Function to check if ticket needs immediate attention
export const checkUrgency = (ticket) => {
  const urgentKeywords = ['urgent', 'emergency', 'immediate', 'asap', 'critical'];
  const content = `${ticket.subject} ${ticket.message}`.toLowerCase();
  
  return {
    isUrgent: urgentKeywords.some(keyword => content.includes(keyword)) || ticket.priority === 'urgent',
    reason: 'Contains urgent keywords or marked as high priority'
  };
};

export const TICKET_CATEGORIES = Object.keys(AUTO_RESPONSES).map(key => ({
  value: key,
  label: key.charAt(0).toUpperCase() + key.slice(1)
})); 