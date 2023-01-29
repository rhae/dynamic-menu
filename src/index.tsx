import { render } from "solid-js/web";
import { createResource, createSignal, For } from "solid-js";
import { Menu } from "./menu";
import menustore from "./stores/menustore";
import "./index.css";

function App() {
  const {menus, set} = menustore;  

  return (
    <>
      <header>

      </header>
      <main>
        <For each={menus()}>
          {(menu, i) => (
              <Menu {...menu} />
          )}
        </For>
      </main>
    </>
  );
}

render(() => <App />, document.getElementById("app"));
