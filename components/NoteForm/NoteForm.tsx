import { useId } from 'react';
import toast from 'react-hot-toast';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import type { FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createNote } from '@/lib/api';

import css from './NoteForm.module.css';

interface NoteFormValues {
  title: string;
  content: string;
  tag: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';
}

interface NoteFormProps {
  modalClose: () => void;
}

const NoteFormSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Please, make up longer title')
    .max(50, 'Too long title')
    .required('It is required field'),
  content: Yup.string().max(500, 'Too much of text'),
  tag: Yup.string()
    .matches(/^(Todo|Work|Personal|Meeting|Shopping)$/)
    .required('It is required'),
});

// заголовок нотатки має мати мінімальну довжину символів 3, максимальну – 50 та бути обовязковим полем;
// контент нотатки має мати максимальну довжину символів 500;
// тег нотатки має бути одним із таких значень: Todo, Work, Personal, Meeting, Shopping, і є обов’язковим полем.

export default function NoteForm({ modalClose }: NoteFormProps) {
  const fieldId = useId();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: data => {
      console.log('you created a new note ', data);
      toast.success(`you created a new note ${data.title}`, {
        duration: 4000,
      });
      queryClient.invalidateQueries({ queryKey: ['noteList'] });
    },
    onError: error => {
      console.log('Your new note was not created because of the error ', error);
      toast.error('Your new note was not created because of the error ', {
        duration: 4000,
      });
    },
  });

  const handleSubmit = (
    values: NoteFormValues,
    actions: FormikHelpers<NoteFormValues>
  ) => {
    console.log(values);
    mutation.mutate(values, {
      onSuccess: () => {
        actions.resetForm();
        modalClose();
      },
    });

    console.log(actions);
  };

  return (
    <Formik
      initialValues={{ title: '', content: '', tag: 'Todo' }}
      onSubmit={handleSubmit}
      validationSchema={NoteFormSchema}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-title`}>Title</label>
          <Field
            id={`${fieldId}-title`}
            type="text"
            name="title"
            className={css.input}
          />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-content`}>Content</label>
          <Field
            as="textarea"
            id={`${fieldId}-content`}
            name="content"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage name="content" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-tag`}>Tag</label>
          <Field
            as="select"
            id={`${fieldId}-tag`}
            name="tag"
            className={css.select}
          >
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button
            type="button"
            onClick={modalClose}
            className={css.cancelButton}
          >
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={false}>
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
}
