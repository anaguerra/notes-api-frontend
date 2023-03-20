
export const Note = ({id, title, content}) => {
    return (
      <li id={id}>
          <p>{title}</p>
          <small>{content}</small>
      </li>
    );
};
