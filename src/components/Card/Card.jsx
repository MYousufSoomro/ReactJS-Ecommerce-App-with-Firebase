import "./card.css";

export default function Card({
  image,
  title,
  description,
  category,
  price,
  onClick,
}) {
  return (
    <div className="card">
      <div>
        <img className="card-image" src={image} alt={title} />
      </div>
      <div className="pd-5 txt-align-left">
        <h3>{title}</h3>
      </div>
      <div>
        <p className="ml-5 txt-align-left">{description}</p>
      </div>

      <div>
        <p className="pd-5 card-location txt-align-left">{category}</p>
      </div>
      <div>
        <h4 className="pd-5 txt-align-left">${price}</h4>
      </div>
      <div className="pd-5">
        <button className="cart-btn" onClick={onClick}>
          View
        </button>
      </div>
    </div>
  );
}
