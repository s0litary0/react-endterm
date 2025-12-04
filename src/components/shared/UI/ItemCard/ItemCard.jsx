import './ItemCard.css'


export default function ItemCard({ item, onClick }) {

  return (
    <div className="item-card-container" onClick={onClick}>
      <img className="item-card-container__img" src={item.image} alt="" />
      <h3>{ item.title} </h3>
    </div>
  )
}