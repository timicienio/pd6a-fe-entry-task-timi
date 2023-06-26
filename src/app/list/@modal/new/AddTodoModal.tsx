'use client';

import { useRouter } from 'next/navigation';
import { Formik } from 'formik';
import { date, object, string } from 'yup';
import moment from 'moment';

import useShowModalOnMount from '@/hooks/useShowModalOnMount';
import createTaskForLoggedInUser from '@/api/task/createTaskForLoggedInUser';
import Button from '@/components/Button';
import TextField from '@/components/TextField';
import DatetimeField from '@/components/DatetimeField';
import { useSession } from 'next-auth/react';
import useWithClientSession from '@/api/useWithClientSession';

const addTodoFormSchema = object({
  title: string().required('This is required.'),
  startTime: date().required(),
  endTime: date().required(),
  reminderPeriod: date().required()
});

export default function AddTodoModal() {
  const id = 'add_todo_modal';
  const { closeModal } = useShowModalOnMount(id);
  const withClientSession = useWithClientSession();
  const router = useRouter();

  return (
    <dialog
      id={id}
      className="modal backdrop-blur-sm"
      // Prevent modal closing on ECS keystroke.
      onCancel={e => e.preventDefault()}
    >
      <Formik
        initialValues={{
          title: 'New Todo',
          startTime: moment().add(1, 'd').toISOString(),
          endTime: moment().add(1, 'd').add(1, 'h').toISOString(),
          reminderPeriod: moment().add(1, 'd').subtract(15, 'm').toISOString()
        }}
        validationSchema={addTodoFormSchema}
        onSubmit={async ({ title, startTime, endTime, reminderPeriod }, { setSubmitting }) => {
          setSubmitting(true);
          try {
            await withClientSession(createTaskForLoggedInUser)({ title, startTime, endTime, reminderPeriod });
            setSubmitting(false);
            await closeModal();
            router.push('/list');
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {({ errors, isSubmitting, getFieldProps, touched, submitForm }) => (
          <form method="dialog" className="modal-box opacity-100 bg-base-300 form-control gap-2">
            <h2 className="card-title mb-2">New Todo</h2>
            <TextField id="title" label="Title" getFieldProps={getFieldProps} error={touched.title && errors.title} />
            <DatetimeField name="startTime" label="Start Time" />
            <DatetimeField name="endTime" label="End Time" />
            <DatetimeField name="reminderPeriod" label="Reminder Time" />
            <div className="modal-action">
              <Button
                onClick={async e => {
                  e.preventDefault();
                  await closeModal();
                  router.push('/list');
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={e => {
                  e.preventDefault();
                  submitForm();
                }}
                disabled={isSubmitting}
                loading={isSubmitting}
                color="primary"
              >
                Add
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </dialog>
  );
}
