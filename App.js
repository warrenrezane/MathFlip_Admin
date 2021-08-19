import "./firebasefix";
import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import Routes from "./src/Screens/Routes";
import { StoreProvider, useStoreRehydrated } from "easy-peasy";
import { store } from "./src/Store";

function WaitForStateRehydration({ children }) {
  const isRehydrated = useStoreRehydrated();
  return isRehydrated ? children : null;
}

export default function App() {
  return (
    <StoreProvider store={store}>
      <WaitForStateRehydration>
        <Routes />
        <StatusBar />
      </WaitForStateRehydration>
    </StoreProvider>
  );
}
