import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as OpenpgpTypeDefs from '../../openpgp.d';

import Header from '../Header';
import Footer from '../Footer';
import s from './login.module.scss';

type TOpenpgp = typeof OpenpgpTypeDefs;
declare global {
  interface Window { openpgp: TOpenpgp; }
}
const openpgp = (window as Window).openpgp as TOpenpgp;

function Login() {
  const [keyPair, setKeyPair] = useState('');

  async function generateNewKeyPair() {
    const { privateKey, publicKey } = await openpgp.generateKey({
      type: 'ecc',
      curve: 'curve25519',
      userIDs: [{ name: '', email: '' }],
      passphrase: '',
      format: 'armored',
    });

    setKeyPair(`${privateKey}\n${publicKey}`);
  }

  function keyPairTextAreaOnChange() {
    // Show "Copy" icon, if text area is not empty.
  }

  const navigate = useNavigate();

  function onSubmit() {
    navigate('/msg');
  }

  return (
    <>
      <Header />
      <section>
        <div className={s.innerContainer}>
          <p>key pair</p>
          <textarea rows={10} value={keyPair} onChange={keyPairTextAreaOnChange} />
          <p className={s.text}>make sure to keep your keypair in a safe place!</p>
          <div>
            <p className={s.text}>dont have a key pair?</p>
            <button onClick={generateNewKeyPair} className={s.generateBtn} type="button">generate keypair</button>

          </div>
          <button className={s.loginBtn} onClick={onSubmit} type="submit">login</button>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Login;
