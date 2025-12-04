import './Button.css'


export default function Button({ children, className, onClick }) {
  return (
    <button className={`app-btn ${className}`} onClick={(e) => onClick(e)}>
      {children}
    </button>
  );
}
