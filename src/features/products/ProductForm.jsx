import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  title: Yup.string().required('Product name is required'),
  price: Yup.number().min(1, 'Minimum price is 1').required('Price is required'),
  thumbnail: Yup.string().url('Invalid image URL').required('Image link is required'),
});

const ProductForm = ({ onSubmit }) => (
  <Formik
    initialValues={{ title: '', price: '', thumbnail: '' }}
    validationSchema={validationSchema}
    onSubmit={onSubmit}
  >
    {() => (
      <Form className="row g-3 mb-4 justify-content-center">
    <h3 className='mb-2 mt-2 '> Add Product</h3>
        <div className="col-md-3">
          
          <Field name="title" className="form-control" placeholder="Product name" />
          <ErrorMessage name="title" component="div" className="text-danger small" />
        </div>
        <div className="col-md-2">
          <Field name="price" type="number" className="form-control" placeholder="Price" />
          <ErrorMessage name="price" component="div" className="text-danger small" />
        </div>
        <div className="col-md-4">
          <Field name="thumbnail" className="form-control" placeholder="Image URL" />
          <ErrorMessage name="thumbnail" component="div" className="text-danger small" />
        </div>
        <div className="col-md-2">
          <button type="submit" className="btn btn-success w-100"> Add</button>
        </div>
      </Form>
    )}
  </Formik>
);

export default ProductForm;
