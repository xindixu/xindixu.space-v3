import React, { useState } from "react"
import { isEmpty } from "lodash"
import { Box, Form, TextArea, TextInput, FormField, Button } from "grommet"
import { send } from "lib/email"
import Toast from "components/toast"

const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toast, setToast] = useState({})

  const onSubmit = (value) => {
    setIsSubmitting(true)
    send(value)
      .then(() =>
        setToast({ mode: "ok", content: "Your email has been sent!" })
      )
      .catch(() =>
        setToast({
          mode: "error",
          content: "We couldn't send your email. Try again in a few minutes",
        })
      )
      .finally(() => setIsSubmitting(false))
  }
  return (
    <>
      <Form
        onSubmit={({ value }) => onSubmit(value)}
        validate="blur"
        disabled={isSubmitting}
      >
        <Box gap="medium">
          <Box direction="row" gap="medium" fill>
            <FormField name="name" label="Name" fill required>
              <TextInput name="name" />
            </FormField>
            <FormField
              name="email"
              label="Email"
              fill
              required
              validate={{
                regexp: emailRegex,
                message: "not a validate email address",
                status: "error",
              }}
            >
              <TextInput name="email" />
            </FormField>
          </Box>
          <FormField name="message" label="Message" fill required>
            <TextArea name="message" size="medium" />
          </FormField>
          <Box direction="row" gap="medium">
            <Button
              type="submit"
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
