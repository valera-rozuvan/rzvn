import React from 'react';
import Footer from '../Footer';

import s from './about.module.scss';

function About() {
  return (
    <>
      <section className={s.about}>
        <h2>about</h2>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit</p>
      </section>
      <Footer />
    </>
  );
}

export default About;
