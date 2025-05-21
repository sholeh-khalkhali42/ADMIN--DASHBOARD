const ProductFilters = ({ searchTerm, priceFilter, onSearch, onPriceChange }) => (
  <div className="row mb-4 mt-4 justify-content-center">
    <div className="col-md-4  ">
       <h4 className=' mt-4 '> search for product</h4>
       <input
        type="text"
        className="form-control"
        placeholder="Search in products ..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
      
    <div className="col-md-4 mb-4">
<h4 className='mb-2 mt-4 '> Filter product</h4>
      
      <input
        type="number"
        className="form-control"
        placeholder="Maximum Price"
        value={priceFilter}
        onChange={(e) => onPriceChange(e.target.value)}
      />
    </div>
  </div>
);

export default ProductFilters;
