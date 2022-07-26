import React, { useState, useEffect } from 'react';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import * as OpenpgpTypeDefs from '../../openpgp.d';

import { IUserReducerActionSetKeyData, IUserReducerActionType, IUserKeyData } from '../../store/reducers/userReducer';

import Header from '../Header';
import Footer from '../Footer';

import styles from './generator.module.scss';

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

function Generator(): React.ReactElement {
  const [keyPairTextAreaStr, setKeyPairTextAreaStr] = useState<string>('');

  const [tempUserKeyData, setTempUserKeyData] = useState<IUserKeyData>({
    publicKeyFingerprint: '',
    publicKeyArmored: '',
    privateKeyArmored: '',
  });

  const [canLogin, setCanLogin] = useState<boolean>(false);

  const dispatchSetKeyData = useDispatch<Dispatch<IUserReducerActionSetKeyData>>();

  const navigate = useNavigate();

  useEffect((): void => {
    if (!tempUserKeyData.publicKeyFingerprint || !tempUserKeyData.privateKeyArmored || !tempUserKeyData.publicKeyArmored) {
      if (canLogin) {
        setCanLogin(false);
      }

      return;
    }

    if (!canLogin) {
      setCanLogin(true);
    }
  }, [canLogin, setCanLogin, tempUserKeyData]);

  useEffect((): void => {
    dispatchSetKeyData({ type: IUserReducerActionType.SET_KEY_DATA, data: tempUserKeyData });
  }, [dispatchSetKeyData, tempUserKeyData]);

  function tryToLoginOnClick(event: React.MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();

    navigate('/login/challenge');
  }

  async function generateNewKeyPairOnClick(event: React.MouseEvent<HTMLButtonElement>): Promise<void> {
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

    setTempUserKeyData({
      publicKeyFingerprint: publicKeyFingerprintStr,
      privateKeyArmored: privateKey,
      publicKeyArmored: publicKey,
    });
  }

  async function keyPairTextAreaOnChange(event: React.ChangeEvent<HTMLTextAreaElement>): Promise<void> {
    event.preventDefault();

    function bailout() {
      setTempUserKeyData({
        publicKeyFingerprint: '',
        privateKeyArmored: '',
        publicKeyArmored: '',
      });
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

    setTempUserKeyData({
      publicKeyFingerprint: publicKeyFingerprintStr,
      privateKeyArmored: privateKeyArmoredStr,
      publicKeyArmored: publicKeyArmoredStr,
    });
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
            <button
              type="button"
              name="generateNewKeyPair"
              className={styles.generateBtn}
              onClick={generateNewKeyPairOnClick}
            >
              generate keypair
            </button>
          </div>

          {
            tempUserKeyData.publicKeyFingerprint
              ? (
                <>
                  <br />
                  <br />
                  <p className={styles.pkFingerprint}>
                    Public key fingerprint:&nbsp;
                    {tempUserKeyData.publicKeyFingerprint}
                  </p>
                </>
              )
              : <>&nbsp;</>
          }

          {
            canLogin
              ? (
                <button
                  type="button"
                  name="tryToLogin"
                  className={styles.loginBtn}
                  onClick={tryToLoginOnClick}
                >
                  login
                </button>
              )
              : <>&nbsp;</>
          }
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Generator;
