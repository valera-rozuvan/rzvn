import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as OpenpgpTypeDefs from '../../openpgp.d';

import Header from '../Header';
import Footer from '../Footer';
import styles from './login.module.scss';

type TOpenpgp = typeof OpenpgpTypeDefs;
declare global {
  interface Window { openpgp: TOpenpgp; }
}
const openpgp = (window as Window).openpgp as TOpenpgp;

const extractStr = function extractStr(source: string, prefix: string, suffix: string): string {
  let s = source;
  let i = s.indexOf(prefix);

  if (i >= 0) {
    s = s.substring(i);
  } else {
    return '';
  }

  if (suffix) {
    i = s.indexOf(suffix);
    if (i >= 0) {
      s = s.substring(0, i + suffix.length);
    } else {
      return '';
    }
  }

  return s;
};

function Login(): React.ReactElement {
  const [keyPairTextAreaStr, setKeyPairTextAreaStr] = useState('');

  const [publicKeyFingerprint, setPublicKeyFingerprint] = useState('');
  const [publicKeyArmored, setPublicKeyArmored] = useState('');
  const [privateKeyArmored, setPrivateKeyArmored] = useState('');

  const [canLogin, setCanLogin] = useState(false);

  const navigate = useNavigate();

  function tryToLogin(event: React.MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();

    navigate('/messaging');
  }

  useEffect((): void => {
    if (!publicKeyFingerprint || !publicKeyArmored || !privateKeyArmored) {
      if (canLogin) {
        setCanLogin(false);
      }

      return;
    }

    if (!canLogin) {
      setCanLogin(true);
    }
  }, [canLogin, setCanLogin, publicKeyFingerprint, publicKeyArmored, privateKeyArmored]);

  async function generateNewKeyPair(event: React.MouseEvent<HTMLButtonElement>): Promise<void> {
    event.preventDefault();

    const { privateKey, publicKey } = await openpgp.generateKey({
      type: 'rsa',
      rsaBits: 4096,
      keyExpirationTime: 60 * 60 * 24 * 365, // 1 year
      userIDs: [{ name: '', email: '' }],
      passphrase: '',
      format: 'armored',
    });

    const tempPublicKey = await openpgp.readKey({ armoredKey: publicKey });
    const publicKeyFingerprintStr = tempPublicKey.getFingerprint();

    setKeyPairTextAreaStr(`${privateKey}${publicKey}`);

    setPublicKeyFingerprint(publicKeyFingerprintStr);
    setPublicKeyArmored(publicKey);
    setPrivateKeyArmored(privateKey);
  }

  async function keyPairTextAreaOnChange(event: React.ChangeEvent<HTMLTextAreaElement>): Promise<void> {
    event.preventDefault();

    function bailout() {
      setPublicKeyFingerprint('');
      setPublicKeyArmored('');
      setPrivateKeyArmored('');
    }

    setKeyPairTextAreaStr(event.target.value);

    let keyPairStr = event.target.value;
    if (typeof keyPairStr !== 'string') {
      bailout();
      return;
    }
    if (keyPairStr.length !== 0) {
      keyPairStr = keyPairStr.trim();
    }
    if (keyPairStr.length === 0) {
      bailout();
      return;
    }

    const privateKeyArmoredStr = extractStr(
      keyPairStr,
      '-----BEGIN PGP PRIVATE KEY BLOCK-----',
      '-----END PGP PRIVATE KEY BLOCK-----',
    );
    try {
      const privateKey = await openpgp.readPrivateKey({ armoredKey: privateKeyArmoredStr });
      privateKey.getFingerprint();
    } catch (err) {
      bailout();
      return;
    }

    let publicKeyFingerprintStr = '';
    const publicKeyArmoredStr = extractStr(
      keyPairStr,
      '-----BEGIN PGP PUBLIC KEY BLOCK-----',
      '-----END PGP PUBLIC KEY BLOCK-----',
    );
    try {
      const publicKey = await openpgp.readKey({ armoredKey: publicKeyArmoredStr });
      publicKeyFingerprintStr = publicKey.getFingerprint();
    } catch (err) {
      bailout();
      return;
    }

    setPublicKeyFingerprint(publicKeyFingerprintStr);
    setPublicKeyArmored(publicKeyArmoredStr);
    setPrivateKeyArmored(privateKeyArmoredStr);
  }

  return (
    <>
      <Header />
      <section>
        <div className={styles.innerContainer}>
          <p>key pair</p>
          <textarea name="keyPairTextArea" rows={10} value={keyPairTextAreaStr} onChange={keyPairTextAreaOnChange} />

          <p className={styles.text}>Make sure to keep your keypair in a safe place!</p>

          <div>
            <p className={styles.text}>dont have a key pair?</p>
            <button onClick={generateNewKeyPair} className={styles.generateBtn} type="button">generate keypair</button>
          </div>

          {
            publicKeyFingerprint
              ? (
                <>
                  <br />
                  <br />
                  <p>
                    Public key fingerprint:&nbsp;
                    {publicKeyFingerprint}
                  </p>
                </>
              )
              : <>&nbsp;</>
          }

          {
            canLogin
              ? <button onClick={tryToLogin} className={styles.loginBtn} type="button">login</button>
              : <>&nbsp;</>
          }
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Login;
