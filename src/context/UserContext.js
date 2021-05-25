import { createContext } from "react";

export const UserContext = createContext({
  user: "Guest",
  wifi: true,
  volume: 50,
  display: 10,
  apps: [],
});

export const reducer = (state, action) => {
  const payload = action.payload;
  switch (action.type) {
    case "updateUser":
      return { ...state, user: payload };
    case "toggleWifi":
      return { ...state, wifi: payload };
    case "updateVolume":
      return { ...state, volume: payload };
    case "updateDisplay":
      return { ...state, display: payload };
    case "openApp":
      return { ...state, apps: [...state.apps, payload] };
    default:
      break;
  }
};
