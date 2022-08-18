import React from 'react';

import s from './noMatch.module.scss';

function NoMatch() {
  return (
    <div className={s.ErrorBlock}>Error! No match for this route.</div>
  );
}

export default NoMatch;
