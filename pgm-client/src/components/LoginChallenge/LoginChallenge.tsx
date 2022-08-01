import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import * as OpenpgpTypeDefs from '../../openpgp.d';
import * as Base64TypeDefs from '../../base64.d';

import { IUserReducerActionSetSessionToken, IUserReducerActionType, IUserState } from '../../store/reducers/userReducer';
import IStore from '../../store';

type TOpenpgp = typeof OpenpgpTypeDefs;
declare global {
  interface Window { openpgp: TOpenpgp; }
}
const openpgp = (window as Window).openpgp as TOpenpgp;

type TBase64 = typeof Base64TypeDefs;
declare global {
  interface Window { Base64: TBase64; }
}
const Base64 = (window as Window).Base64 as TBase64;

enum EFlowSteps {
  INITIAL = 'INITIAL',
  CHALLENGE_RECEIVED = 'CHALLENGE_RECEIVED',
  CHALLENGE_SOLVED = 'CHALLENGE_SOLVED',
  ERROR = 'ERROR',
}

interface IPublicKeyChallenge {
  encryptedText: string;
  challengeId: string;
}

const AUTH_SERVER_URL = process.env.REACT_APP_AUTH_SERVER_URL;

function LoginChallenge() {
  const user = useSelector<IStore, IUserState>((store) => store.user);

  // Temporarily set to `CHALLENGE_SOLVED`; will pass this page 100%.
  // TODO: Set to `INITIAL`, once backend is working.
  const [flowStep, setFlowStep] = useState<EFlowSteps>(EFlowSteps.CHALLENGE_SOLVED);

  // Temporarily set to some random string, to see Redux state change.
  // TODO: Set to '' (empty string), once backend is working.
  const [sessionToken, setSessionToken] = useState<string>('some_lalala_token');

  const [publicKeyChallenge, setPublicKeyChallenge] = useState<IPublicKeyChallenge>({ encryptedText: '', challengeId: '' });

  const dispatchSetSessionToken = useDispatch<Dispatch<IUserReducerActionSetSessionToken>>();

  const navigate = useNavigate();

  useEffect((): void => {
    if (flowStep !== EFlowSteps.INITIAL) {
      return;
    }

    if (!user.publicKeyFingerprint || !user.privateKeyArmored || !user.publicKeyArmored) {
      setFlowStep(EFlowSteps.ERROR);

      return;
    }

    const encodedPublicKey = Base64.encode(user.publicKeyArmored);

    axios.post(
      `${AUTH_SERVER_URL}/challenge/request`,
      { publicKey: encodedPublicKey, publicKeyFingerprint: user.publicKeyFingerprint },
    )
      .then((response) => {
        const { challengeId } = response.data;
        const encryptedText = Base64.decode(response.data.encryptedText);

        setPublicKeyChallenge({ challengeId, encryptedText });
        setFlowStep(EFlowSteps.CHALLENGE_RECEIVED);
      })
      .catch(() => {
        setFlowStep(EFlowSteps.ERROR);
      });
  }, [flowStep, setFlowStep, user]);

  useEffect(() => {
    if (flowStep !== EFlowSteps.CHALLENGE_RECEIVED) {
      return;
    }

    async function decryptSecretText(): Promise<OpenpgpTypeDefs.MaybeStream<OpenpgpTypeDefs.Data> & string | null> {
      const message = await openpgp.readMessage({
        armoredMessage: publicKeyChallenge.encryptedText, // parse armored message
      });
      const publicKey = await openpgp.readKey({ armoredKey: user.publicKeyArmored });
      const privateKey = await openpgp.readPrivateKey({ armoredKey: user.privateKeyArmored });
      const { data: decrypted, signatures } = await openpgp.decrypt({
        message,
        verificationKeys: publicKey, // optional
        decryptionKeys: privateKey,
      });

      // check signature validity (signed messages only)
      try {
        await signatures[0].verified; // throws on invalid signature
      } catch (e) {
        return null;
      }

      return decrypted;
    }

    decryptSecretText().then((decryptedText) => {
      if (decryptedText === null || !decryptedText || typeof decryptedText !== 'string') {
        setFlowStep(EFlowSteps.ERROR);
        return;
      }

      axios.post(
        `${AUTH_SERVER_URL}/challenge/response`,
        { challengeId: publicKeyChallenge.challengeId, decryptedText },
      )
        .then((response) => {
          setSessionToken(response.data);
          setFlowStep(EFlowSteps.CHALLENGE_SOLVED);
        })
        .catch(() => {
          setFlowStep(EFlowSteps.ERROR);
        });
    });
  }, [flowStep, setFlowStep, publicKeyChallenge, user]);

  useEffect((): void => {
    if (flowStep !== EFlowSteps.CHALLENGE_SOLVED) {
      return;
    }

    dispatchSetSessionToken({ type: IUserReducerActionType.SET_SESSION_TOKEN, data: sessionToken });

    navigate('/messaging');
  }, [flowStep, navigate, sessionToken, dispatchSetSessionToken]);

  useEffect((): void => {
    if (flowStep !== EFlowSteps.ERROR) {
      return;
    }

    navigate('/login');
  }, [flowStep, navigate]);

  return (
    <section>
      &nbsp;
    </section>
  );
}

export default LoginChallenge;
