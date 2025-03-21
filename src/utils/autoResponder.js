const AUTO_RESPONSES = {
  technical: {
    keywords: ['error', 'bug', 'not working', 'failed', 'issue'],
    response: `Thank you for reporting this technical issue. To help us resolve this faster, please provide:
1. The exact error message you're seeing
2. Steps to reproduce the issue
3. Your browser and operating system
4. Any screenshots if possible

Our technical team will investigate this as soon as possible.`,
  },
  billing: {
    keywords: ['payment', 'charge', 'subscription', 'refund', 'invoice'],
    response: `Thank you for contacting our billing support. To assist you better, please confirm:
1. The transaction date
2. The amount in question
3. Your payment method
4. Any error messages received during payment

Our billing team will review your case and respond shortly.`,
  },
  account: {
    keywords: ['login', 'password', 'access', 'locked', 'reset'],
    response: `I understand you're having account access issues. Let's help you regain access:
1. Have you tried resetting your password?
2. Are you receiving any specific error messages?
3. Are you using the correct email address?

For security reasons, we may need to verify your identity.`,
  },
  feature: {
    keywords: ['suggest', 'feature', 'add', 'improve', 'enhancement'],
    response: `Thank you for your feature suggestion! We value user feedback in improving our service.
Please provide:
1. More details about the feature you'd like
2. How you envision it working
3. How it would benefit users

We'll review your suggestion with our product team.`,
  },
  dispute: {
    keywords: ['dispute', 'credit report', 'bureau', 'inaccurate', 'remove'],
    response: `Thank you for contacting us about your credit dispute. To assist you effectively, please provide:
1. Which credit bureau(s) are reporting the item
2. The nature of the dispute
3. Any supporting documentation you have

We'll help you prepare the appropriate dispute letter.`,
  },
};

export const generateAutoResponse = (ticket) => {
  const category = ticket.category;
  const lastMessage = ticket.messages[ticket.messages.length - 1];
  const messageContent = lastMessage.message.toLowerCase();

  const categoryResponse = AUTO_RESPONSES[category];
  if (!categoryResponse) {
    return `Thank you for contacting our support team. A support agent will review your request and respond shortly.`;
  }

  const hasKeyword = categoryResponse.keywords.some(keyword => 
    messageContent.includes(keyword.toLowerCase())
  );

  return hasKeyword ? categoryResponse.response : `Thank you for contacting our ${category} support team. A support agent will review your request and respond shortly.`;
};

export const checkUrgency = (ticket) => {
  const urgentKeywords = ['urgent', 'emergency', 'critical', 'immediate', 'asap'];
  const lastMessage = ticket.messages[ticket.messages.length - 1];
  const messageContent = lastMessage.message.toLowerCase();

  const hasUrgentKeyword = urgentKeywords.some(keyword => 
    messageContent.includes(keyword.toLowerCase())
  );

  return {
    isUrgent: hasUrgentKeyword || ticket.priority === 'urgent' || ticket.priority === 'high',
    reason: hasUrgentKeyword ? 'Urgent keywords detected in message' : 
            ticket.priority === 'urgent' ? 'Ticket marked as urgent' :
            ticket.priority === 'high' ? 'High priority ticket' : null
  };
}; 