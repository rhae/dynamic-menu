import { Dialog } from "./dialog";

export function Menu(props) {
  const subMenus = props.children.map((item) => {
    const dlgs = item.dialogs.map((dlg) => {
      return <Dialog {...dlg} />;
    });

    return (
      <>
        {/*<li>{item.label}</li> */}
        {dlgs}
      </>
    );
  });
  return (
    <div class="container">
      {/*<li>aaa {props.label}</li>*/}
      {subMenus}
    </div>
  );
}
