import './ItemsList.css'


export default function ItemsList({ children }) {
  return (
    <div className="items-container">
      { children }
    </div>
  )
}