// SAY Experiences — brand constants
export const BRAND = {
  name:    'SAY Experiences',
  tagline: 'Creating Extraordinary Experiences',
  url:     'https://www.sayexperiences.com',
  email:   'payments@sayexperiences.com',
};

export const SERVICE_META = {
  Wedding:      { icon: '◈', label: 'Weddings',            accent: '#d4aa65' },
  MICE:         { icon: '◉', label: 'MICE & Conferences',  accent: '#7ab4c4' },
  Corporate:    { icon: '◐', label: 'Corporate Events',    accent: '#89a87a' },
  Travel:       { icon: '◎', label: 'Travel & Holidays',   accent: '#c4a07a' },
  'Social Event':{ icon: '◆', label: 'Social Events',      accent: '#c47a9a' },
};

export const SERVICES = Object.keys(SERVICE_META);

// Payment fee config — update from admin dashboard in production
export const RAZORPAY_FEE_RATE = 0.02;   // 2%
export const GST_RATE          = 0.18;   // 18%

export const calcAmounts = (baseAmount, applyGst) => {
  const fee    = Math.round(baseAmount * RAZORPAY_FEE_RATE);
  const gstAmt = applyGst ? Math.round((baseAmount + fee) * GST_RATE) : 0;
  const total  = baseAmount + fee + gstAmt;
  return { fee, gstAmt, total };
};

export const fmt = n =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
