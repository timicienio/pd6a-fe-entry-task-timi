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
import useSWRMutationWithClientSession from '@/api/useSWRMutationWithClientSession';

const addTodoFormSchema = object({
  title: string().required('This is required.'),
  startTime: date().required(),
  endTime: date().required(),
  reminderPeriod: date().required()
});

export default function AddTodoModal() {
  const { closeModal } = useShowModalOnMount('add_todo_modal');
  const router = useRouter();

  const { trigger: triggerCreateTaskForLoggedInUser } = useSWRMutationWithClientSession(
    'tasks',
    createTaskForLoggedInUser
  );

  return (
    <dialog
      id="add_todo_modal"
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
        onSubmit={async ({ title, startTime, endTime, reminderPeriod }, { setSubmitting, setErrors }) => {
          setSubmitting(true);
          try {
            await triggerCreateTaskForLoggedInUser({ title, startTime, endTime, reminderPeriod });
            setSubmitting(false);
            await closeModal();
            router.push('/task');
          } catch (error) {
            setErrors({ startTime: 'Time overlaps with existing todo(s).' });
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
                  router.push('/task');
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
