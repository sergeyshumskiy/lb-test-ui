import { useLocation } from 'react-router';
import { useEffect } from 'react';
import { config } from '../../config';

function ThreeDS() {
  const { URL, PaReq, MD, callbackUrl } = useLocation().state || {};
  useEffect(() => {
    if (!URL || !PaReq || !MD || !callbackUrl) return;
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = URL;
    form.style.display = 'none';

    
    const params = {
      PaReq,
      MD: MD || '',
      TermUrl: `${config.webhookUrl}/payments/3ds-callback?callbackUrl=${callbackUrl}`,
    };

    Object.entries(params).forEach(([name, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      input.value = value;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  }, [URL, PaReq, MD, callbackUrl]);

  return <div>3DS redirect...</div>;
};

export default ThreeDS;
