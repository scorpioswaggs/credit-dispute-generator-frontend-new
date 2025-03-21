import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Alert,
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  Reply as ReplyIcon,
  Close as CloseIcon,
  AutoAwesome as AutoAwesomeIcon,
} from '@mui/icons-material';
import TicketFilters from './TicketFilters';
import { generateAutoResponse, generateEmailContent, checkUrgency } from '../../utils/autoResponder';
import {
  sendEmailNotification,
  scheduleFollowUpEmail,
  sendSatisfactionSurvey,
  EMAIL_TYPES,
} from '../../utils/emailNotifications';
import { testTickets } from '../../utils/testData';

const TicketList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [tickets, setTickets] = useState(testTickets);
  const [filters, setFilters] = useState({
    searchQuery: '',
    category: '',
    status: '',
    priority: '',
    dateRange: '',
  });
  const [showAutoReply, setShowAutoReply] = useState(false);

  // Filter tickets based on current filters
  const filteredTickets = tickets.filter(ticket => {
    const searchLower = filters.searchQuery.toLowerCase();
    const matchesSearch = !filters.searchQuery || 
      ticket.subject.toLowerCase().includes(searchLower) ||
      ticket.id.toLowerCase().includes(searchLower) ||
      ticket.messages.some(m => m.message.toLowerCase().includes(searchLower));

    const matchesCategory = !filters.category || ticket.category === filters.category;
    const matchesStatus = !filters.status || ticket.status === filters.status;
    const matchesPriority = !filters.priority || ticket.priority === filters.priority;

    let matchesDate = true;
    if (filters.dateRange) {
      const ticketDate = new Date(ticket.lastUpdated);
      const now = new Date();
      switch (filters.dateRange) {
        case 'today':
          matchesDate = ticketDate.toDateString() === now.toDateString();
          break;
        case 'week':
          const weekAgo = new Date(now.setDate(now.getDate() - 7));
          matchesDate = ticketDate >= weekAgo;
          break;
        case 'month':
          const monthAgo = new Date(now.setMonth(now.getMonth() - 1));
          matchesDate = ticketDate >= monthAgo;
          break;
        case 'quarter':
          const quarterAgo = new Date(now.setMonth(now.getMonth() - 3));
          matchesDate = ticketDate >= quarterAgo;
          break;
      }
    }

    return matchesSearch && matchesCategory && matchesStatus && matchesPriority && matchesDate;
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleViewTicket = (ticket) => {
    setSelectedTicket(ticket);
    setShowAutoReply(false);
  };

  const handleCloseTicket = () => {
    setSelectedTicket(null);
    setReplyText('');
    setShowAutoReply(false);
  };

  const handleGenerateAutoReply = () => {
    if (!selectedTicket) return;
    const autoResponse = generateAutoResponse(selectedTicket);
    setReplyText(autoResponse);
    setShowAutoReply(true);
  };

  const handleSendReply = async () => {
    if (!replyText.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: 'support',
      message: replyText,
      timestamp: new Date().toISOString(),
    };

    try {
      // Update ticket in state
      const updatedTickets = tickets.map(ticket => {
        if (ticket.id === selectedTicket.id) {
          const updatedTicket = {
            ...ticket,
            messages: [...ticket.messages, newMessage],
            lastUpdated: new Date().toISOString(),
            status: 'in_progress',
          };
          return updatedTicket;
        }
        return ticket;
      });

      // Send email notification
      await sendEmailNotification(
        EMAIL_TYPES.TICKET_UPDATED,
        selectedTicket,
        replyText
      );

      // Schedule follow-up if needed
      const urgencyCheck = checkUrgency(selectedTicket);
      if (urgencyCheck.isUrgent) {
        await scheduleFollowUpEmail(selectedTicket, 24); // Shorter follow-up time for urgent tickets
      } else {
        await scheduleFollowUpEmail(selectedTicket, 48); // Standard follow-up time
      }

      setTickets(updatedTickets);
      setSelectedTicket(updatedTickets.find(t => t.id === selectedTicket.id));
      setReplyText('');
      setShowAutoReply(false);
    } catch (error) {
      console.error('Error handling reply:', error);
      // Here you would typically show an error message to the user
    }
  };

  const handleResolveTicket = async () => {
    if (!selectedTicket) return;

    try {
      const updatedTickets = tickets.map(ticket => {
        if (ticket.id === selectedTicket.id) {
          return {
            ...ticket,
            status: 'resolved',
            lastUpdated: new Date().toISOString(),
          };
        }
        return ticket;
      });

      // Send resolution notification
      await sendEmailNotification(
        EMAIL_TYPES.TICKET_RESOLVED,
        selectedTicket,
        'Your ticket has been marked as resolved.'
      );

      // Send satisfaction survey
      await sendSatisfactionSurvey(selectedTicket);

      setTickets(updatedTickets);
      setSelectedTicket(updatedTickets.find(t => t.id === selectedTicket.id));
    } catch (error) {
      console.error('Error resolving ticket:', error);
      // Here you would typically show an error message to the user
    }
  };

  const handleEscalateTicket = async () => {
    if (!selectedTicket) return;

    try {
      const updatedTickets = tickets.map(ticket => {
        if (ticket.id === selectedTicket.id) {
          return {
            ...ticket,
            priority: 'urgent',
            lastUpdated: new Date().toISOString(),
          };
        }
        return ticket;
      });

      // Send escalation notification
      await sendEmailNotification(
        EMAIL_TYPES.TICKET_ESCALATED,
        selectedTicket
      );

      setTickets(updatedTickets);
      setSelectedTicket(updatedTickets.find(t => t.id === selectedTicket.id));
    } catch (error) {
      console.error('Error escalating ticket:', error);
      // Here you would typically show an error message to the user
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open':
        return 'primary';
      case 'in_progress':
        return 'warning';
      case 'resolved':
        return 'success';
      case 'closed':
        return 'error';
      default:
        return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent':
        return 'error';
      case 'high':
        return 'warning';
      case 'medium':
        return 'info';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Support Tickets
        </Typography>

        <TicketFilters
          filters={filters}
          onFilterChange={setFilters}
          onClearFilters={() => setFilters({
            searchQuery: '',
            category: '',
            status: '',
            priority: '',
            dateRange: '',
          })}
        />

        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Ticket ID</TableCell>
                  <TableCell>Subject</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Priority</TableCell>
                  <TableCell>Last Updated</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredTickets
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell>{ticket.id}</TableCell>
                      <TableCell>{ticket.subject}</TableCell>
                      <TableCell>
                        <Chip
                          label={ticket.category.toUpperCase()}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={ticket.status.toUpperCase()}
                          color={getStatusColor(ticket.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={ticket.priority.toUpperCase()}
                          color={getPriorityColor(ticket.priority)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{formatDate(ticket.lastUpdated)}</TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => handleViewTicket(ticket)}
                          color="primary"
                          size="small"
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={filteredTickets.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>

        {/* Ticket Detail Dialog */}
        <Dialog
          open={!!selectedTicket}
          onClose={handleCloseTicket}
          maxWidth="md"
          fullWidth
        >
          {selectedTicket && (
            <>
              <DialogTitle>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6">
                    Ticket {selectedTicket.id}: {selectedTicket.subject}
                  </Typography>
                  <IconButton onClick={handleCloseTicket} size="small">
                    <CloseIcon />
                  </IconButton>
                </Box>
              </DialogTitle>
              <DialogContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Status
                    </Typography>
                    <Chip
                      label={selectedTicket.status.toUpperCase()}
                      color={getStatusColor(selectedTicket.status)}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Priority
                    </Typography>
                    <Chip
                      label={selectedTicket.priority.toUpperCase()}
                      color={getPriorityColor(selectedTicket.priority)}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Conversation History
                    </Typography>
                    <Paper variant="outlined" sx={{ p: 2, maxHeight: 300, overflow: 'auto' }}>
                      {selectedTicket.messages.map((message) => (
                        <Box
                          key={message.id}
                          sx={{
                            mb: 2,
                            p: 1,
                            bgcolor: message.sender === 'support' ? 'grey.100' : 'primary.50',
                            borderRadius: 1,
                          }}
                        >
                          <Typography variant="subtitle2" color="text.secondary">
                            {message.sender === 'support' ? 'Support Agent' : 'You'} -{' '}
                            {formatDate(message.timestamp)}
                          </Typography>
                          <Typography variant="body1">{message.message}</Typography>
                        </Box>
                      ))}
                    </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    {showAutoReply && (
                      <Alert severity="info" sx={{ mb: 2 }}>
                        Auto-generated response based on ticket category and content
                      </Alert>
                    )}
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      label="Reply"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleGenerateAutoReply}
                  startIcon={<AutoAwesomeIcon />}
                >
                  Auto Reply
                </Button>
                <Button
                  onClick={handleEscalateTicket}
                  color="warning"
                  disabled={selectedTicket?.priority === 'urgent'}
                >
                  Escalate
                </Button>
                <Button
                  onClick={handleResolveTicket}
                  color="success"
                  disabled={selectedTicket?.status === 'resolved'}
                >
                  Resolve
                </Button>
                <Button onClick={handleCloseTicket}>Close</Button>
                <Button
                  onClick={handleSendReply}
                  variant="contained"
                  startIcon={<ReplyIcon />}
                  disabled={!replyText.trim()}
                >
                  Send Reply
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </Box>
    </Container>
  );
};

export default TicketList; 