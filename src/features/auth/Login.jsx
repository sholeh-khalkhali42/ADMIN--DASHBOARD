import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from './authSlice';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Spinner, Alert } from 'react-bootstrap';
import './Login.css'; // فایل استایل اختصاصی

const validationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

const Login = () => {
  const dispatch = useDispatch();
  const { status, token, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/dashboard');
    }
  }, [token, navigate]);

  return (
    <div className="login-wrapper">
      <div className="login-box shadow-lg animate-fade-in">
        <h2 className="text-center text-white mb-3">Welcome to the Admin Panel</h2>
        <p className="text-center text-light mb-4">Please log in to continue</p>

        <Formik
          initialValues={{ username: 'emilys', password: 'emilyspass' }}
          validationSchema={validationSchema}
          onSubmit={(values) => dispatch(loginUser(values))}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-3">
                <label className="form-label text-white">Username</label>
                <Field name="username" className="form-control" />
                <ErrorMessage name="username" component="div" className="text-warning small mt-1" />
              </div>

              <div className="mb-3">
                <label className="form-label text-white">Password</label>
                <Field name="password" type="password" className="form-control" />
                <ErrorMessage name="password" component="div" className="text-warning small mt-1" />
              </div>

              {error && <Alert variant="danger" className="py-2">{error}</Alert>}

              <button
                type="submit"
                className="btn btn-light w-100"
                disabled={status === 'loading' || isSubmitting}
              >
                {status === 'loading' || isSubmitting ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Logging in...
                  </>
                ) : (
                  'Login'
                )}
              </button>

              <div className="text-muted text-center small mt-3">
                <code>Test login → user: emilys | pass: emilyspass</code>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
