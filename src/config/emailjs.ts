// Configuration EmailJS
// Remplacez ces valeurs par vos vraies clés EmailJS

export const EMAILJS_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
};

// Template par défaut pour EmailJS
export const EMAIL_TEMPLATE = {
  subject: '{{subject}} - Message from {{from_name}}',
  body: `
    Nouveau message depuis votre portfolio:
    
    Nom: {{from_name}}
    Email: {{from_email}}
    Sujet: {{subject}}
    
    Message:
    {{message}}
    
    ---
    Envoyé depuis votre portfolio
  `
};
