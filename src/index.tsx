import { render } from "solid-js/web";
import { createSignal, For } from "solid-js";
import { sysmenu } from "./sysmenu";
import { Menu } from "./menu";
import "./index.css";

function App() {
  const [menus, setMenus] = createSignal(sysmenu.menu);

  return (
    <ul>
      <For each={menus()}>
        {(menu, i) => (
          <li>
            <Menu {...menu} />
          </li>
        )}
      </For>
    </ul>
  );
}

render(() => <App />, document.getElementById("app"));
