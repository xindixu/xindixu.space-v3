import React, { useContext } from "react"
import {
  Main,
  Box,
  Form,
  TextArea,
  TextInput,
  FormField,
  Button,
  ResponsiveContext,
} from "grommet"
import { links } from "contents/social-media"

const Contact = () => {
  const size = useContext(ResponsiveContext)

  return (
    <Box pad="xlarge" justify="center">
      <Main pad="xlarge" gap="large">
        <Box direction="row" justify="center">
          <Box pad={{ right: "large" }} align="end">
            {links.map(({ name }) => (
              <p>{name}</p>
            ))}
          </Box>
          <Box
            border={{ side: "left", size: "medium", color: "brand" }}
            pad={{ left: "large" }}
          >
            {links.map(({ text, link }) => (
              <p>
                <a href={link} target="_blank" rel="noreferrer">
                  {text}
                </a>
              </p>
            ))}
          </Box>
        </Box>

        <Box pad={{ horizontal: size === "large" ? "xlarge" : "none" }}>
          <Form
            onSubmit={({ value }) => {
              console.log(value)
            }}
          >
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
              <Button type="submit" primary label="Submit" />
              <Button type="reset" label="Reset" />
            </Box>
          </Form>
        </Box>
      </Main>
    </Box>
  )
}

export default Contact
