import React from 'react';
import Footer from '../Footer';

import s from './contact.module.scss';

function Contact() {
  return (
    <>
      <section className={s.contact}>
        <h2>contact</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, officiis. </p>
      </section>
      <Footer />
    </>
  );
}

export default Contact;
