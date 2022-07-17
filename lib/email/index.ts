import emailjs from "emailjs-com"

type TContactFormValues = {
  name: string
  email: string
  message: string
}

export const send = (value: TContactFormValues, template = "contact") =>
  emailjs.send(
    process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID,
    template,
    value,
    process.env.NEXT_PUBLIC_EMAIL_USER_ID
  )
