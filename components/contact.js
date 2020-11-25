import React, { useState } from "react"
import { isEmpty } from "lodash"
import { Box, Form, TextArea, TextInput, FormField, Button } from "grommet"
import { send } from "lib/email"
import Toast from "components/toast"

const Contact = () => {
  const [form, setForm] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toast, setToast] = useState({})

  const onSubmit = () => {
    setIsSubmitting(true)
    send(form)
      .then((resp) => {
        setForm({})
        setToast({ mode: "ok", content: "Your email has been sent!" })
      })
      .catch((err) => {
        setToast({
          mode: "error",
          content: "We couldn't send your email. Try again in a few minutes",
        })
      })
      .finally(() => setIsSubmitting(false))
  }
  return (
    <>
      <Form onChange={setForm}>
        <Box gap="medium">
          <Box direction="row" gap="medium" fill>
            <FormField name="name" label="Name" fill>
              <TextInput name="name" />
            </FormField>
            <FormField name="email" label="Email" fill>
              <TextInput name="email" />
            </FormField>
          </Box>
          <FormField name="message" label="Message" fill>
            <TextArea name="message" size="medium" />
          </FormField>
          <Box direction="row" gap="medium">
            <Button
              type="button"
              onClick={onSubmit}
              disabled={isSubmitting}
              primary
              label="Send Email"
            />
            <Button type="reset" label="Reset" />
          </Box>
        </Box>
      </Form>

      <Toast
        isOpen={!isEmpty(toast)}
        mode={toast.mode}
        content={toast.content}
        onClose={() => setToast({})}
      />
    </>
  )
}

export default Contact
