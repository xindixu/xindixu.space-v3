import React from "react"
import PropTypes from "prop-types"
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component"
import "react-vertical-timeline-component/style.min.css"
import styled from "styled-components"
import { experiences } from "contents/experiences"
import styleSettings from "lib/style-settings"

const {
  pink,
  elevation: { light },
} = styleSettings

const Wrapper = styled(VerticalTimeline)`
  &&& {
    &::before {
      background: ${pink};
    }

    .vertical-timeline-element-icon,
    .vertical-timeline-element-content {
      box-shadow: ${light.medium};
    }
  }
`

const Timeline = (props) => {
  return (
    <Wrapper>
      {experiences.map(({ company, jobTitle, list, date, icon }) => (
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ border: `1px solid ${pink}` }}
          contentArrowStyle={{ borderRight: `7px solid ${pink}` }}
          date={date}
          iconStyle={{ background: pink }}
          icon={icon}
        >
          <h3 className="vertical-timeline-element-title">{jobTitle}</h3>
          <h4 className="vertical-timeline-element-subtitle">{company}</h4>
          <ul>
            {list.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        </VerticalTimelineElement>
      ))}
    </Wrapper>
  )
}

Timeline.propTypes = {}

export default Timeline
