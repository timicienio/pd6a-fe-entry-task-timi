'use client';

import { object, string, ref } from 'yup';
import { Formik } from 'formik';
import Link from 'next/link';

import register from '@/lib/api/auth/register';
import Button from '@/components/Button';
import TextField from '@/components/TextField';
import useModal from '@/hooks/useModal';

import RegisterSuccessModal from './RegisterSuccessModal';

const registerFormSchema = object({
  firstName: string().required('This is required.'),
  lastName: string().required('This is required.'),
  email: string().required('This is required.').email('Invalid email address.'),
  password: string().required('This is required.').trim().min(6, 'Passwords must be at least ${min} characters long.'),
  reenteredPassword: string()
    .required('This is required.')
    .trim()
    .equals([ref('password')], 'Passwords does not match.')
});

export default function RegisterForm() {
  const [showSuccessModal, openSuccessModal] = useModal();

  return (
    <>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          reenteredPassword: ''
        }}
        validationSchema={registerFormSchema}
        validateOnBlur={false}
        onSubmit={async ({ firstName, lastName, email, password }, { setSubmitting }) => {
          setSubmitting(true);

          await register(firstName, lastName, email, password);

          openSuccessModal();
          setSubmitting(false);
        }}
      >
        {({ errors, getFieldProps, touched, submitForm, isSubmitting }) => (
          <form className="form-control card-body">
            <h2 className="card-title">Register an account</h2>
            <p>Start using by creating your personal account.</p>
            <div className="flex">
              <TextField
                id="firstName"
                label="First Name"
                className="rounded-r-none"
                placeholder="Gary"
                getFieldProps={getFieldProps}
                error={touched.firstName && errors.firstName}
              />
              <TextField
                id="lastName"
                label="Last Name"
                className="rounded-l-none"
                placeholder="Hu"
                getFieldProps={getFieldProps}
                error={touched.lastName && errors.lastName}
              />
            </div>
            <TextField
              id="email"
              label="Email"
              type="email"
              getFieldProps={getFieldProps}
              error={touched.email && errors.email}
            />
            <TextField
              id="password"
              label="Password"
              type="password"
              getFieldProps={getFieldProps}
              error={touched.password && errors.password}
            />
            <TextField
              id="reenteredPassword"
              label="Re-enter Password"
              type="password"
              getFieldProps={getFieldProps}
              error={touched.reenteredPassword && errors.reenteredPassword}
            />
            <p className="mt-4">
              <span className="opacity-60">Already have an account? </span>
              <Link href="/auth/login" className="link">
                Log in
              </Link>
              .
            </p>
            <div className="card-actions justify-end mt-4">
              <Button
                onClick={e => {
                  e.preventDefault();
                  submitForm();
                }}
                disabled={isSubmitting}
                loading={isSubmitting}
                color="primary"
              >
                Register
              </Button>
            </div>
          </form>
        )}
      </Formik>
      <RegisterSuccessModal show={showSuccessModal} />
    </>
  );
}
