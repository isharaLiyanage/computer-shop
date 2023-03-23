import axios from "axios";

const BaseUrl = "https://fair-pullover-eel.cyclic.app/";

export const publicSend = axios.create({
  baseURL: BaseUrl,
});

export { BaseUrl };
let TOKEN;
const persistRoot = localStorage.getItem("persist:root");
if (persistRoot) {
  const user = JSON.parse(JSON.parse(persistRoot).User);
  const token = user.Auth?.accessToken || "";
  TOKEN = token;
}
console.log(TOKEN);

export const UserSend = axios.create({
  baseURL: BaseUrl,
  Headers: { token: `Bearer ${TOKEN}` },
});
