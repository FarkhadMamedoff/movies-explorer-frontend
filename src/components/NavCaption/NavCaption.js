import './NavCaption.css';

export default function NavCaption(props) {
  return (
    <h2 className="nav-caption">{props.title}</h2>
  );
}