import './Burger.css';

export default function Burger({ isOpen, onMenuOpen }) {

  const handleOnClick = () => {
    onMenuOpen(isOpen);
  }

  return (
    <div className={`burger ${isOpen && 'burger__type_opened'}`} onClick={handleOnClick}>
      <div className={`burger__box ${isOpen ? 'burger__box_type_active' : 'burger__box_type_not-active'}`}>
        <span className="burger__line"></span>
        <span className="burger__line"></span>
        <span className="burger__line"></span>
      </div>
    </div>
  )
}