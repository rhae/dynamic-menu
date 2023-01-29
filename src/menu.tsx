import { Dialog } from "./dialog";

export function Menu(props) {
  const subMenus = props.children.map((item) => {
    const dlgs = item.dialogs.map((dlg) => {
      return <Dialog {...dlg} />;
    });

    return (
      <>
        {/*<div class="dlg-h1">{item.label}</div>*/}
        {dlgs}
      </>
    );
  });
  return (
    <div class="container">
      {/*<div class="dlg-h1">{props.label}</div>*/}
      {subMenus}
    </div>
  );
}
