interface ISecuroButtonProps {
  color?: string;
  style?: any;
  clickHandler?: any;
  title: string;
}

function SecuroTextButtons(props: ISecuroButtonProps) {
  const style = {
    color: props.color || 'red',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '0.5rem 3rem',
    ...props.style,
  };

  return (
    <button
      style={style}
      onClick={(e) => props.clickHandler(e)}
    >
      {props.title}
    </button>
  );
}

export default SecuroTextButtons;
