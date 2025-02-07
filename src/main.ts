import { Signer } from "./sign";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <form>
    <input type="text" placeholder="id" value="https://proxy.agnostic.dev/resource/id?exp=${Date.now() + 60 * 60 * 1000}">
    <pre id="output">output</pre>
  </form>
`;

const input = document.querySelector<HTMLInputElement>("input")!;
const output = document.querySelector<HTMLInputElement>("#output")!;

listen(input);

const s = new Signer("secret");

function listen(element: HTMLInputElement) {
  element.oninput = async () => {
    const exp = `${Math.floor(Date.now() / 1000) + 3600}`;
    output.innerHTML = await s.sign(element.value, exp);
  };
}
