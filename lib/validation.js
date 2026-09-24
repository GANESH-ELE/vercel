// =============================================================
// SIMPLE CLIENT-SIDE VALIDATION
// =============================================================

export function validateEnquiry(values, { requireConsent = true } = {}) {
  const errors = {};

  if (!values.name || values.name.trim().length < 2) {
    errors.name = 'Please enter your name.';
  }

  const phone = (values.phone || '').replace(/[^0-9]/g, '');
  if (phone.length < 10) {
    errors.phone = 'Please enter a valid phone number.';
  }

  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!values.message || values.message.trim().length < 5) {
    errors.message = 'Please add a short message.';
  }

  if (requireConsent && !values.consent) {
    errors.consent = 'Please accept to be contacted.';
  }

  return { errors, valid: Object.keys(errors).length === 0 };
}
