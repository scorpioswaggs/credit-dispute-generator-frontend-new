import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TicketList from '../TicketList';
import { testTickets } from '../../../utils/testData';
import { sendEmailNotification, scheduleFollowUpEmail } from '../../../utils/emailNotifications';

// Mock the email notification functions
jest.mock('../../../utils/emailNotifications', () => ({
  sendEmailNotification: jest.fn().mockResolvedValue(true),
  scheduleFollowUpEmail: jest.fn().mockResolvedValue(true),
  sendSatisfactionSurvey: jest.fn().mockResolvedValue(true),
  EMAIL_TYPES: {
    TICKET_CREATED: 'TICKET_CREATED',
    TICKET_UPDATED: 'TICKET_UPDATED',
    TICKET_RESOLVED: 'TICKET_RESOLVED',
    TICKET_ESCALATED: 'TICKET_ESCALATED',
  },
}));

describe('TicketList Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders ticket list with correct number of tickets', () => {
    render(<TicketList />);
    const ticketRows = screen.getAllByRole('row');
    // Add 1 for header row
    expect(ticketRows.length).toBe(testTickets.length + 1);
  });

  test('filters tickets by search query', () => {
    render(<TicketList />);
    const searchInput = screen.getByLabelText(/search tickets/i);
    
    fireEvent.change(searchInput, { target: { value: 'dispute' } });
    
    const ticketRows = screen.getAllByRole('row');
    // Should show only tickets with 'dispute' in subject or messages
    expect(ticketRows.length).toBe(3); // 2 dispute tickets + header row
  });

  test('filters tickets by category', () => {
    render(<TicketList />);
    const categorySelect = screen.getByLabelText(/category/i);
    
    fireEvent.mouseDown(categorySelect);
    const technicalOption = screen.getByText(/technical/i);
    fireEvent.click(technicalOption);
    
    const ticketRows = screen.getAllByRole('row');
    expect(ticketRows.length).toBe(2); // 1 technical ticket + header row
  });

  test('filters tickets by status', () => {
    render(<TicketList />);
    const statusSelect = screen.getByLabelText(/status/i);
    
    fireEvent.mouseDown(statusSelect);
    const openOption = screen.getByText(/open/i);
    fireEvent.click(openOption);
    
    const ticketRows = screen.getAllByRole('row');
    expect(ticketRows.length).toBe(3); // 2 open tickets + header row
  });

  test('opens ticket detail dialog when clicking view button', () => {
    render(<TicketList />);
    const viewButtons = screen.getAllByRole('button', { name: /view/i });
    
    fireEvent.click(viewButtons[0]);
    
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(testTickets[0].subject)).toBeInTheDocument();
  });

  test('generates auto-reply in ticket detail dialog', async () => {
    render(<TicketList />);
    const viewButtons = screen.getAllByRole('button', { name: /view/i });
    
    fireEvent.click(viewButtons[0]);
    const autoReplyButton = screen.getByRole('button', { name: /auto reply/i });
    fireEvent.click(autoReplyButton);
    
    const replyTextarea = screen.getByLabelText(/reply/i);
    expect(replyTextarea.value).not.toBe('');
  });

  test('sends reply and updates ticket status', async () => {
    render(<TicketList />);
    const viewButtons = screen.getAllByRole('button', { name: /view/i });
    
    fireEvent.click(viewButtons[0]);
    const replyTextarea = screen.getByLabelText(/reply/i);
    const replyText = 'This is a test reply';
    
    fireEvent.change(replyTextarea, { target: { value: replyText } });
    const sendButton = screen.getByRole('button', { name: /send reply/i });
    fireEvent.click(sendButton);
    
    await waitFor(() => {
      expect(sendEmailNotification).toHaveBeenCalled();
      expect(scheduleFollowUpEmail).toHaveBeenCalled();
    });
  });

  test('escalates ticket and updates priority', async () => {
    render(<TicketList />);
    const viewButtons = screen.getAllByRole('button', { name: /view/i });
    
    fireEvent.click(viewButtons[1]); // Click on a non-urgent ticket
    const escalateButton = screen.getByRole('button', { name: /escalate/i });
    fireEvent.click(escalateButton);
    
    await waitFor(() => {
      expect(sendEmailNotification).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({ priority: 'urgent' })
      );
    });
  });

  test('resolves ticket and sends satisfaction survey', async () => {
    render(<TicketList />);
    const viewButtons = screen.getAllByRole('button', { name: /view/i });
    
    fireEvent.click(viewButtons[0]);
    const resolveButton = screen.getByRole('button', { name: /resolve/i });
    fireEvent.click(resolveButton);
    
    await waitFor(() => {
      expect(sendEmailNotification).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({ status: 'resolved' })
      );
    });
  });

  test('handles date range filtering', () => {
    render(<TicketList />);
    const dateRangeSelect = screen.getByLabelText(/date range/i);
    
    fireEvent.mouseDown(dateRangeSelect);
    const todayOption = screen.getByText(/today/i);
    fireEvent.click(todayOption);
    
    const ticketRows = screen.getAllByRole('row');
    // Should only show tickets updated today
    const today = new Date().toDateString();
    const todayTickets = testTickets.filter(
      ticket => new Date(ticket.lastUpdated).toDateString() === today
    );
    expect(ticketRows.length).toBe(todayTickets.length + 1); // +1 for header row
  });

  test('clears all filters', () => {
    render(<TicketList />);
    const searchInput = screen.getByLabelText(/search tickets/i);
    const categorySelect = screen.getByLabelText(/category/i);
    
    // Apply some filters
    fireEvent.change(searchInput, { target: { value: 'dispute' } });
    fireEvent.mouseDown(categorySelect);
    const technicalOption = screen.getByText(/technical/i);
    fireEvent.click(technicalOption);
    
    // Clear filters
    const clearButton = screen.getByRole('button', { name: /clear/i });
    fireEvent.click(clearButton);
    
    const ticketRows = screen.getAllByRole('row');
    expect(ticketRows.length).toBe(testTickets.length + 1);
  });
});

// Mock console.error to avoid unnecessary error logs during tests
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
}); 