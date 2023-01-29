import { createSignal, createResource, createRoot } from "solid-js";

async function fetchMenus() {
    let data = {}
    try {
        const response = await fetch('/src/menu.json');
        if(!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }
        const xdata = await response.json();
        data = await xdata['menu'];
    }
    catch(error) {
        console.log(error);
    }
    return data;
}
  
function createMenuStore() {
    const [xmenu, setMenu] = createSignal({});
    const [menus] = createResource( xmenu, fetchMenus );

  const set = (v) => setMenu(v);
  return { menus, set };
}

export default createRoot(createMenuStore);