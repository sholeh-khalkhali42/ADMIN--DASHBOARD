const ProductCard = ({ product, onEdit, onDelete }) => (
  <div className="col-md-2 mb-4">
    <div className="card h-100 shadow-sm">
      <img
        src={product.thumbnail || 'https://via.placeholder.com/100x100'}
        className="card-img-top"
        alt={product.title}
        style={{ height: '150px', objectFit: 'cover' }}
      />
      <div className="card-body">
        <h5 className="card-title">{product.title}</h5>
        <p className="card-text text-muted">${product.price}</p>
        <div className="d-flex justify-content-between">
          <button className="btn btn-warning btn-sm" onClick={() => onEdit(product)}>Edit</button>
          <button className="btn btn-danger btn-sm" onClick={() => onDelete(product.id)}>Delete</button>
        </div>
      </div>
    </div>
  </div>
);

export default ProductCard;
