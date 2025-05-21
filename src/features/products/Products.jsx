import React, { useState, useCallback, useMemo } from 'react';
import {
  useGetProductsQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation
} from './productsApi';
import ProductForm from './ProductForm';
import ProductCard from './ProductCard';
import ProductFilters from './ProductFilters';
import EditProductModal from './EditProductModal';
import { toast } from 'react-toastify';
import ProductSlider from '../../component/ProductSlider';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const itemsPerPage = 12;

  const { data, error, isLoading } = useGetProductsQuery();
  const [addProduct] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const handleAdd = useCallback(async (values, { resetForm }) => {
    try {
      await addProduct(values).unwrap();
      toast.success('✅ Product added successfully');
      resetForm();
    } catch {
      toast.error('❌ Failed to add product');
    }
  }, [addProduct]);

  const handleDelete = useCallback(async (id) => {
    try {
      await deleteProduct(id).unwrap();
      toast.success('🗑️ Product deleted');
    } catch {
      toast.error('❌ Failed to delete product');
    }
  }, [deleteProduct]);

  const handleUpdate = useCallback(async (values) => {
    try {
      await updateProduct({ id: selectedProduct.id, ...values }).unwrap();
      toast.success('✏️ Product updated successfully');
      setShowEditModal(false);
    } catch {
      toast.error('❌ Failed to update product');
    }
  }, [updateProduct, selectedProduct]);

  const filteredProducts = useMemo(() => {
    if (!data?.products) return [];
    return data.products
      .filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter(p => (priceFilter ? p.price <= +priceFilter : true));
  }, [data, searchTerm, priceFilter]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const displayedProducts = useMemo(() => {
    return filteredProducts.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [filteredProducts, currentPage]);

  if (isLoading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-danger text-center">Error loading products</div>;

  return (
    <div className="container py-4">
      {/* Admin Panel Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-primary fw-bold">
          🛒 Admin Panel – Product Management
        </h2>
        <span className="badge bg-info text-dark">
          {new Date().toLocaleDateString()}
        </span>
      </div>

      {/* Product Form Card */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5 className="card-title text-secondary mb-3">Add New Product</h5>
          <ProductForm onSubmit={handleAdd} />
        </div>
      </div>

      {/* Filter Form Card */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5 className="card-title text-secondary mb-3">Search & Filter</h5>
          <ProductFilters
            searchTerm={searchTerm}
            priceFilter={priceFilter}
            onSearch={term => {
              setSearchTerm(term);
              setCurrentPage(1);
            }}
            onPriceChange={price => {
              setPriceFilter(price);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {/* Product Slider */}
      <div className="mb-4">
        <h5 className="text-secondary">🆕 Latest Products</h5>
        <ProductSlider products={data.products.slice(-6)} />
      </div>

      {/* Products Section */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="text-secondary">📦 All Products</h5>
        <small className="text-muted">
          Showing {displayedProducts.length} of {filteredProducts.length} filtered products
        </small>
      </div>

      <div className="row">
        {displayedProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={p => {
              setSelectedProduct(p);
              setShowEditModal(true);
            }}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* Pagination */}
      <nav className="mt-4">
        <ul className="pagination pagination-sm justify-content-center">
          {Array.from({ length: totalPages }).map((_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button
                className="page-link"
                style={{ cursor: 'pointer' }}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Edit Modal */}
      <EditProductModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        product={selectedProduct}
        onUpdate={handleUpdate}
      />
    </div>
  );
};

export default React.memo(Products);
