import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { Auth, initializeAuth } from 'firebase/auth';
import { Firestore, DocumentData, CollectionReference, getFirestore, collection } from 'firebase/firestore';
import { firebaseApp } from '../../firebase.config';
import { Branch, Library, Supervisor, UserInfo, Weather, HistoricalWeather } from '../models';
import Loading from './Loading';

// https://firebase.google.com/docs/auth/web/start?authuser=0
// https://firebase.google.com/docs/firestore/quickstart?authuser=0#web-version-9
const firestore = getFirestore(firebaseApp);

function createCollection<T = DocumentData>(collectionName: string) {
  return collection(firestore, collectionName) as CollectionReference<T>;
}

interface Store {
  auth: Auth;
  firestore: Firestore;
  libraryEnum: Record<string, string>;
  libraryWeather: Record<string, Weather>;
  librariesCollection: CollectionReference<Library>;
  branchesCollection: CollectionReference<Branch>;
  supervisorsCollection: CollectionReference<Supervisor>;
  weatherCollection: CollectionReference<HistoricalWeather>;
  userInfo?: UserInfo;
  updateStore(_: Partial<Store>): void;
}

const initialStore: Store = {
  auth: initializeAuth(firebaseApp),
  firestore,
  libraryEnum: {},
  libraryWeather: {},
  librariesCollection: createCollection<Library>('libraries'),
  branchesCollection: createCollection<Branch>('branches'),
  supervisorsCollection: createCollection<Library>('supervisors'),
  weatherCollection: createCollection<HistoricalWeather>('historical_weather'),
  updateStore: () => null,
};

export const StoreContext = createContext<Store>(initialStore);

interface Props {
  children: ReactNode;
}

export default function StoreProvider({ children }: Props): JSX.Element {
  const updateStore = (update: Partial<Store>) => {
    setStore((current) => ({ ...current, ...update }));
  };
  const [store, setStore] = useState<Store>({ ...initialStore, updateStore });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    store.auth.onAuthStateChanged((user) => {
      if (user) {
        const userInfo: UserInfo = {
          email: user.email,
          name: user.displayName,
          photo: user.photoURL,
          tenantId: user.tenantId,
          userId: user.uid,
        };
        setStore((current) => ({ ...current, userInfo }));
      } else {
        setStore((current) => ({ ...current, userInfo: undefined }));
      }
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <Loading />;

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
}
