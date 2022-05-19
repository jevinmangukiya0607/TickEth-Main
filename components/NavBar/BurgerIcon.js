const spanStyle = {
  display: 'block',
  position: 'absolute',
  height: '3px',
  width: '104%',
  background: '#171b23',
  borderRadius: '9px',
  left: '0',
  transition: '0.25s ease-in-out',
};

export default function BurgerIcon({ isMenuOpen, toggleMenu }) {
  return (
    <div
      className="w-6 h-5 relative cursor-pointer rotate-0 transition-transform duration-500 ease-in-out"
      onClick={toggleMenu}
    >
      <span
        style={spanStyle}
        className={`top-0 origin-left rotate-0 opacity-1 ${
          isMenuOpen ? 'rotate-45 -top-0.5 left-0' : ''
        }`}
      />
      <span
        style={spanStyle}
        className={`top-2 origin-left rotate-0 opacity-1 ${
          isMenuOpen ? 'opacity-0 w-0' : ''
        } `}
      />
      <span
        style={spanStyle}
        className={`top-4 origin-left rotate-0 opacity-1 ${
          isMenuOpen ? '-rotate-45 top-4 left-0' : ''
        } `}
      />
    </div>
  );
}
