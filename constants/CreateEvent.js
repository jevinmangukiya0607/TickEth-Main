export const CREATE_EVENT_FIELDS = [
  {
    id: 'title',
    name: 'Title',
    type: 'text',
    placeholder: 'Money Heist Event',
  },
  { id: 'createdBy', name: 'Created By', type: 'text', placeholder: 'Netflix' },
  {
    id: 'ticketVolume',
    name: 'Ticket Volume',
    type: 'number',
    placeholder: '100',
  },
  { id: 'price', name: 'Price', type: 'number', placeholder: '$100' },
  {
    id: 'eventDate',
    name: 'Event Date',
    type: 'date',
    placeholder: 'Some Date after today',
  },
];

export const FORM_FIELDS = [
  'title',
  'eventId',
  'description',
  'createdBy',
  'ticketsLeft',
  'ticketVolume',
  'price',
  'eventDate',
  'image',
];
