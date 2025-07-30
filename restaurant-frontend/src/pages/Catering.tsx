
import { useRef, type FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import '../css/Catering.css';

export const Catering = () => {
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.current) return;

    emailjs
      .sendForm('service_pwp8nvd', 'template_6boxtqg', form.current, {
        publicKey: 'iauBrw-oYxJW73CWP',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  return (
    
    <div className='form-wrapper'>
      <h1 className="catering-title">Catering
        <p className='cater-text'>Please fill out the form below for all catering inquiries. We will contact you as soon as we can to talk more about your event. Thank you!
        </p>
      </h1>
      <div className='form-background'>
        <form ref={form} onSubmit={sendEmail} className='catering-form'>
          <div className='form-group'>
            <label>Name *</label>
            <input type="text" name="user_name" required/>
          </div>
          <div className='form-group'>
            <label>Email*</label>
            <input type="email" name="user_email" required />
          </div>
          <div className='form-group'>
            <label>Phone Number*</label>
            <input type="text" name='phone'required/>
          </div>
          <div className='form-group'>
            <label>Event*</label>
            <input type='text'name='event'required/>
          </div>
          <div className='form-group'>
            <label>Event Details (Optional)</label>
            <textarea name="event_details" />
          </div>
          <div className='form-group'>
            <label>Time*</label>
            <input type='datetime-local' name='time'required/>
          </div>
          <input type="submit" value="Send" className='submit-button'/>
        </form>
      </div>
    </div>
  );
};

export default Catering;