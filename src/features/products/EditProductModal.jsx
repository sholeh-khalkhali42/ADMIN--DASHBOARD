import { Modal, Button } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import React from 'react';

const validationSchema = Yup.object({
  title: Yup.string().required('Product name is required'),
  price: Yup.number().min(1, 'Minimum price is 1').required('Price is required'),
  thumbnail: Yup.string().url('Invalid image URL').required('Image URL is required'),
});

const EditProductModal = ({ show, onHide, product, onUpdate }) => (
  <div className="mb-3"> {/* spacing below modal on mobile */}
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Product</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{
          title: product?.title || '',
          price: product?.price || '',
          thumbnail: product?.thumbnail || '',
        }}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={onUpdate}
      >
        {() => (
          <Form>
            <Modal.Body>
              <div className="mb-3">
                <label className="form-label">Product Name</label>
                <Field name="title" className="form-control" />
                <ErrorMessage name="title" component="div" className="text-danger small" />
              </div>
              <div className="mb-3">
                <label className="form-label">Price</label>
                <Field name="price" type="number" className="form-control" />
                <ErrorMessage name="price" component="div" className="text-danger small" />
              </div>
              <div className="mb-3">
                <label className="form-label">Image URL</label>
                <Field name="thumbnail" className="form-control" />
                <ErrorMessage name="thumbnail" component="div" className="text-danger small" />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={onHide}>Cancel</Button>
              <Button variant="primary" type="submit">Save Changes</Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  </div>
);

export default React.memo(EditProductModal);
