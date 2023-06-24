'use client';

import { object, string } from 'yup';
import { Formik } from 'formik';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

import Button from '@/components/Button';
import TextField from '@/components/TextField';

const loginFormSchema = object({
  email: string().required('This is required.').email('Invalid email address.'),
  password: string().required('This is required.').trim()
});

export default function LoginForm() {
  return (
    <Formik
      initialValues={{
        email: '',
        password: ''
      }}
      validationSchema={loginFormSchema}
      onSubmit={async ({ email, password }, { setSubmitting, setErrors }) => {
        setSubmitting(true);
        try {
          await signIn('credentials', { callbackUrl: '/list', email, password });
        } catch {
          setErrors({ email: 'Incorrect email or password.', password: 'Incorrect email or password.' });
          setSubmitting(false);
        }
      }}
    >
      {({ errors, getFieldProps, touched, submitForm, isSubmitting }) => (
        <form className="form-control card-body">
          <h2 className="card-title">Welcome back</h2>
          <p>Log in to your account.</p>
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
          <p className="mt-4">
            <span className="opacity-60">Don&apos;t have an account yet?</span>
            <br />
            <span>
              Register{' '}
              <Link href="/auth/register" className="link">
                here
              </Link>
              .
            </span>
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
              Log In
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
}
