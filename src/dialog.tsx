
import { createSignal } from "solid-js";

import { vars } from "./vars";
import "./index.css";

type VarProps = {
  name: string;
  label: boolean;
  value: string;
  unit: string;
  editable: boolean;
  visible: boolean;
};

type FloatProps = VarProps & {
  min: number;
  max: number;
};

type EnumProps = VarProps & {
  displayValues: Array<string>;
  displayLabels: Array<string>;
};

function get_var(varname: string) {
  const idx = vars.vars.findIndex((xvar) => xvar.name === varname);
  if (idx < 0) {
    console.log("Variable " + varname + " not found.");
    return {
      label: "Dummy" + varname,
      type: "STRING",
    };
  }
  return vars.vars[idx];
}

function StringVar(props: VarProps) {
  const [value, SetValue] = createSignal({value: props.value});
  function handleInput(ev) {
    SetValue({value:ev.target.value})
  }
  const options = {
    id: props.name,
    class: props.editable ? "var-value editable" : props.unit === "" ? "var-value no-unit" : "var-value",
    onChange: props.editable ? {handleInput} : "",
    disabled: !!!props.editable,
    value : props.value
  }

  return (
    <div class="var var-string" data-unit={props.unit}>
      <label for={props.name}>{props.label}</label>
      {/*<div id={props.name} class="var-value">{props.value}</div>*/}
      <input {...options} ></input>
    </div>
  );
}

function IntegerVar(props: VarProps) {
  const [value, SetValue] = createSignal({value: props.value});
  function handleInput(ev) {
    SetValue({value:ev.target.value})
  }
  const options = {
    id: props.name,
    class: props.editable ? "var-value editable" : props.unit === "" ? "var-value no-unit" : "var-value",
    onChange: props.editable ? {handleInput} : "",
    disabled: !!!props.editable,
    value : props.value
  }

  return (
    <div class="var var-integer" data-unit={props.unit}>
      <label for={props.name}>{props.label}</label>
      {/*<div id={props.name} class="var-value">{props.value}</div>*/}
      <input {...options} ></input>
    </div>
  );
}

function FloatVar(props: FloatProps) {
  const [value, SetValue] = createSignal({value: props.value});
  function handleInput(ev) {
    SetValue({value:ev.target.value})
  }
  const options = {
    id: props.name,
    class: props.editable ? "var-value editable" : props.unit === "" ? "var-value no-unit" : "var-value",
    onChange: props.editable ? {handleInput} : "",
    disabled: !!!props.editable,
    value : props.value
  }

  return (
    <div class="var var-float" data-unit={props.unit}>
      <label for={props.name}>{props.label}</label>
      <input {...options} ></input>
    </div>
  );
}

function EnumVar(props: EnumProps) {
  const [value, SetValue] = createSignal({value: props.value});
  function handleInput(ev) {
    SetValue({value:ev.target.value})
  }
  const options = {
    id: props.name,
    class: "var-value"
  }
  const labelClass = props.editable ? "editable" : "";
  const val = props.editable ? <input onChange={handleInput} {...options} value={props.value}></input> : <div {...options}>{props.value}</div>;
  return (
    <div class="var var-enum" data-unit={props.unit}>
      <label for={props.name} class={labelClass}>{props.label}</label>
      {val}
    </div>
  );
}

function SwitchVar(props: EnumProps) {
  return (
    <div class="var var-switch" data-unit={props.unit}>
      <div class="var-label">{props.label}</div>
      <div class="var-value">
        <ul>{props.value}</ul>
      </div>
    </div>
  );
}

function ActionVar(props: EnumProps) {
  return (
    <div class="var var-action" data-unit={props.unit}>
      <div class="var-label">{props.label}</div>
      <div class="var-value">
        <button class="btn" type="button">
          {props.value}
        </button>
      </div>
    </div>
  );
}

function get_vars(varnames: Array<string>) {
  const xvars = varnames.map((xvar) => {
    const curvar = get_var(xvar);

    /* console.log(curvar); */
    switch (curvar.type) {
      case "INTEGER":
        return <IntegerVar {...curvar} />;
      case "FLOAT":
        return <FloatVar {...curvar} />;
      case "ENUM":
        return <EnumVar {...curvar} />;
      case "SWITCH":
        return <SwitchVar {...curvar} />;
      case "ACTION":
        return <ActionVar {...curvar} />;
    }
    return <StringVar {...curvar} />;
  });

  return xvars;
}

type DialogProps = {
  id: string;
  label: string;
  vars: Array<string>;
};

export function Dialog(props: DialogProps) {
  const xvars = get_vars(props.vars);
  return (
    <>
      <div class="dlg-h2">{props.label}</div>
      {xvars}
    </>
  );
}
