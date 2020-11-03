import React from "react"
import styled from "styled-components"
import { Main, Box, Tabs, Tab, Text } from "grommet"
import { experiences } from "contents/experiences"
import styleSettings from "lib/style-settings"

const { spacer, spacerSm } = styleSettings

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
      <Main pad="xlarge">
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
                    <li>{l}</li>
                  ))}
                </ul>
              </Box>
            </Tab>
          ))}
        </VerticalTab>
      </Main>
    </>
  )
}

export default Experiences
