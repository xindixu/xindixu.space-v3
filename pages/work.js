import React from "react"
import styled from "styled-components"
import { Main, Box, Tabs, Tab, Text } from "grommet"
import { experiences } from "contents/experiences"

const VerticalTab = styled(Tabs)`
  flex-direction: row;

  & > div {
    flex-direction: column;
    justify-content: start;
  }
`

const Experiences = () => {
  return (
    <>
      <Main pad="xlarge" justify="center" direction="row">
        <Box width="xlarge" flex={false}>
          <VerticalTab>
            {experiences.map(({ name, jobTitle, list, date }) => (
              <Tab
                title={name}
                key={`${name}-${jobTitle}`}
                margin={{ vertical: "xsmall" }}
              >
                <Box pad={{ horizontal: "medium" }} gap="small">
                  <Text size="large">{jobTitle}</Text>
                  <Text size="small">{date}</Text>
                  <ul>
                    {list.map((l) => (
                      <li key={l}>{l}</li>
                    ))}
                  </ul>
                </Box>
              </Tab>
            ))}
          </VerticalTab>
        </Box>
      </Main>
    </>
  )
}

export default Experiences
