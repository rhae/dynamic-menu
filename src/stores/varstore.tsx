import { createSignal, createResource, createRoot } from "solid-js";

async function fetchVars() {
  return (await fetch('/src/vars.json')).json();
}
  
function createVarStore() {
    const [xvars, setVars] = createSignal({});
    const [vars] = createResource( xvars, fetchVars );

  const set = (v) => setVars(v);
  return { vars, set };
}

export default createRoot(createVarStore);