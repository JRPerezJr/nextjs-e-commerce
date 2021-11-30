import React, { useContext } from 'react';

import { useRouter } from 'next/router';
import { StoreContext } from '../utils/Store';

export default function Shipping() {
  const router = useRouter();

  const { state } = useContext(StoreContext);
  const { userInfo } = state;
  if (!userInfo) {
    router.push('/login?redirect=/shipping');
  }

  return (
    <div>
      <h1>Shipping</h1>
    </div>
  );
}
