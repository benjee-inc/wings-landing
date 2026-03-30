document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('.waitlist-form');

  forms.forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const emailInput = form.querySelector('input[name="email"]');
      const button = form.querySelector('button');
      const email = emailInput.value.trim();

      if (!email) return;

      button.disabled = true;
      button.textContent = 'Joining...';

      try {
        const res = await fetch('/api/waitlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });

        const data = await res.json();

        if (res.ok) {
          const success = document.createElement('div');
          success.className = 'form-success';
          success.textContent = "You're on the list! We'll be in touch soon.";
          form.replaceWith(success);
        } else if (res.status === 409) {
          const success = document.createElement('div');
          success.className = 'form-success';
          success.textContent = "You're already on the waitlist! We'll be in touch soon.";
          form.replaceWith(success);
        } else {
          throw new Error(data.error || 'Something went wrong');
        }
      } catch (err) {
        button.disabled = false;
        button.textContent = 'Join the Waitlist';
        alert('Something went wrong. Please try again.');
      }
    });
  });
});
