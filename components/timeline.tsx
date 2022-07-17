import React from "react"
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component"
import "react-vertical-timeline-component/style.min.css"
import styled, { useTheme } from "styled-components"
import { Heading } from "grommet"
import { experiences } from "contents/experiences"
import styleSettings from "lib/style-settings"
import { color } from "lib/style-settings/utils"

const {
  readable,
  PINK,
  BACKGROUND,
  spacerBase,
  elevation: { light } = {},
} = styleSettings

const Wrapper = styled(VerticalTimeline)`
  &&& {
    width: 100%;
    max-width: ${readable};

    &::before {
      background: ${color(PINK)};
    }

    .vertical-timeline-element-icon,
    .vertical-timeline-element-content {
      box-shadow: ${light?.medium};
      background: ${color(BACKGROUND)};
    }
  }
`

const List = styled.ul`
  padding-left: ${spacerBase};
`
const ListItem = styled.li`
  &::marker {
    color: ${color(PINK)};
  }
`

const Timeline = () => {
  const theme = useTheme()
  const pink = color(PINK)({ theme })

  return (
    <Wrapper>
      {experiences.map(({ company, jobTitle, list, date, icon }) => (
        <VerticalTimelineElement
          key={date}
          className="vertical-timeline-element--work"
          contentStyle={{ border: `1px solid ${pink}` }}
          contentArrowStyle={{ borderRight: `7px solid ${pink}` }}
          date={date}
          iconStyle={{ background: pink }}
          icon={icon}
        >
          <Heading
            level="3"
            margin={{ bottom: "small" }}
            className="vertical-timeline-element-title"
          >
            {jobTitle}
          </Heading>
          <Heading level="4" className="vertical-timeline-element-subtitle">
            {company}
          </Heading>
          <List>
            {list.map((l) => (
              <ListItem key={l}>{l}</ListItem>
            ))}
          </List>
        </VerticalTimelineElement>
      ))}
    </Wrapper>
  )
}

export default Timeline
