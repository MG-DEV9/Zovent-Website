export const validateClientForm = ({ name, email, phone }) => {
  const e = {};
  if (!name?.trim())    e.name  = 'Full name is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    e.email = 'Valid email address required';
  if (!/^[6-9]\d{9}$/.test(phone))
    e.phone = 'Valid 10-digit Indian mobile number required';
  return e;
};

export const validatePaymentForm = (data, existingIds = []) => {
  const e = {};
  if (!data.paymentId?.trim())   e.paymentId   = 'Reference ID required';
  else if (existingIds.includes(data.paymentId))
    e.paymentId = 'This Reference ID already exists';
  if (!data.clientName?.trim())  e.clientName  = 'Client name required';
  if (!data.description?.trim()) e.description = 'Description required';
  if (!data.baseAmount || +data.baseAmount <= 0)
    e.baseAmount = 'Valid amount required';
  if (!data.dueDate)             e.dueDate     = 'Due date required';
  return e;
};
