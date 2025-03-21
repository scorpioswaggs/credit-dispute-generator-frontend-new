export const testTickets = [
  {
    id: 'TKT-001',
    subject: 'Issue with dispute letter generation',
    status: 'open',
    priority: 'high',
    category: 'technical',
    createdAt: '2024-03-20T10:30:00Z',
    lastUpdated: '2024-03-20T14:45:00Z',
    name: 'John Doe',
    email: 'john@example.com',
    messages: [
      {
        id: 1,
        sender: 'user',
        message: 'I am unable to generate a dispute letter. The system shows an error.',
        timestamp: '2024-03-20T10:30:00Z',
      },
      {
        id: 2,
        sender: 'support',
        message: 'Could you please provide more details about the error message you are seeing?',
        timestamp: '2024-03-20T14:45:00Z',
      },
    ],
  },
  {
    id: 'TKT-002',
    subject: 'Billing subscription issue',
    status: 'in_progress',
    priority: 'medium',
    category: 'billing',
    createdAt: '2024-03-19T09:15:00Z',
    lastUpdated: '2024-03-20T11:30:00Z',
    name: 'Jane Smith',
    email: 'jane@example.com',
    messages: [
      {
        id: 1,
        sender: 'user',
        message: 'My subscription payment failed but I was still charged.',
        timestamp: '2024-03-19T09:15:00Z',
      },
    ],
  },
  {
    id: 'TKT-003',
    subject: 'Account access locked',
    status: 'waiting',
    priority: 'urgent',
    category: 'account',
    createdAt: '2024-03-20T08:00:00Z',
    lastUpdated: '2024-03-20T15:20:00Z',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    messages: [
      {
        id: 1,
        sender: 'user',
        message: 'My account is locked after multiple login attempts. Need urgent access.',
        timestamp: '2024-03-20T08:00:00Z',
      },
      {
        id: 2,
        sender: 'support',
        message: 'I understand this is urgent. Have you tried resetting your password?',
        timestamp: '2024-03-20T08:15:00Z',
      },
      {
        id: 3,
        sender: 'user',
        message: 'Yes, but the reset link is not working.',
        timestamp: '2024-03-20T15:20:00Z',
      },
    ],
  },
  {
    id: 'TKT-004',
    subject: 'Feature request: Bulk dispute letters',
    status: 'open',
    priority: 'low',
    category: 'feature',
    createdAt: '2024-03-18T16:45:00Z',
    lastUpdated: '2024-03-18T16:45:00Z',
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    messages: [
      {
        id: 1,
        sender: 'user',
        message: 'It would be great to have the ability to generate multiple dispute letters at once.',
        timestamp: '2024-03-18T16:45:00Z',
      },
    ],
  },
  {
    id: 'TKT-005',
    subject: 'Credit report dispute assistance',
    status: 'resolved',
    priority: 'medium',
    category: 'dispute',
    createdAt: '2024-03-17T13:20:00Z',
    lastUpdated: '2024-03-19T10:00:00Z',
    name: 'Robert Brown',
    email: 'robert@example.com',
    messages: [
      {
        id: 1,
        sender: 'user',
        message: 'Need help disputing an incorrect late payment on my credit report.',
        timestamp: '2024-03-17T13:20:00Z',
      },
      {
        id: 2,
        sender: 'support',
        message: 'I can help you with that. Which credit bureau is reporting this late payment?',
        timestamp: '2024-03-17T14:00:00Z',
      },
      {
        id: 3,
        sender: 'user',
        message: 'It\'s showing up on Experian.',
        timestamp: '2024-03-17T14:30:00Z',
      },
      {
        id: 4,
        sender: 'support',
        message: 'I\'ve generated a dispute letter for Experian. You can find it in your dashboard.',
        timestamp: '2024-03-19T10:00:00Z',
      },
    ],
  },
]; 