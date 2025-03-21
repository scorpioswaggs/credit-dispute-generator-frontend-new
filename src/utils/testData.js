export const testTickets = [
  {
    id: 'T1001',
    subject: 'Technical Issue with Dispute Form',
    category: 'technical',
    status: 'open',
    priority: 'high',
    createdAt: new Date(2024, 2, 15).toISOString(),
    messages: [
      {
        id: 1,
        sender: 'user',
        message: 'I keep getting an error when trying to submit my dispute form. The page crashes every time.',
        timestamp: new Date(2024, 2, 15).toISOString()
      }
    ]
  },
  {
    id: 'T1002',
    subject: 'Billing Question',
    category: 'billing',
    status: 'pending',
    priority: 'medium',
    createdAt: new Date(2024, 2, 16).toISOString(),
    messages: [
      {
        id: 1,
        sender: 'user',
        message: 'I was charged twice for my subscription this month. Need help getting a refund.',
        timestamp: new Date(2024, 2, 16).toISOString()
      }
    ]
  },
  {
    id: 'T1003',
    subject: 'Account Access Issues',
    category: 'account',
    status: 'open',
    priority: 'urgent',
    createdAt: new Date(2024, 2, 17).toISOString(),
    messages: [
      {
        id: 1,
        sender: 'user',
        message: 'URGENT: Cannot login to my account. Need immediate assistance as I have a dispute deadline today.',
        timestamp: new Date(2024, 2, 17).toISOString()
      }
    ]
  },
  {
    id: 'T1004',
    subject: 'Feature Request',
    category: 'feature',
    status: 'open',
    priority: 'low',
    createdAt: new Date(2024, 2, 18).toISOString(),
    messages: [
      {
        id: 1,
        sender: 'user',
        message: 'Would it be possible to add a bulk dispute option? It would save a lot of time.',
        timestamp: new Date(2024, 2, 18).toISOString()
      }
    ]
  },
  {
    id: 'T1005',
    subject: 'Credit Report Dispute',
    category: 'dispute',
    status: 'resolved',
    priority: 'medium',
    createdAt: new Date(2024, 2, 14).toISOString(),
    messages: [
      {
        id: 1,
        sender: 'user',
        message: 'Need help disputing an incorrect late payment on my credit report.',
        timestamp: new Date(2024, 2, 14).toISOString()
      },
      {
        id: 2,
        sender: 'agent',
        message: "I've reviewed your case and helped submit the dispute. You should see the change in 30-45 days.",
        timestamp: new Date(2024, 2, 14, 2).toISOString()
      }
    ]
  }
]; 