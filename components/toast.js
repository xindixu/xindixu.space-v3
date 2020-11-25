import React from "react"
import PropTypes from "prop-types"
import {
  FormClose,
  StatusGood,
  CircleAlert,
  StatusWarning,
} from "grommet-icons"
import { Box, Layer, Button, Text } from "grommet"

const modes = {
  ok: {
    icon: <StatusGood />,
    background: "status-ok",
  },
  warning: {
    icon: <StatusWarning />,
    background: "status-warning",
  },
  error: {
    icon: <CircleAlert />,
    background: "status-error",
  },
}

const Toast = ({ isOpen, onClose, content, mode }) => {
  if (!isOpen) {
    return null
  }
  const { icon, background } = modes[mode]
  return (
    <Layer
      position="top"
      modal={false}
      margin={{ vertical: "medium", horizontal: "medium" }}
      onEsc={onClose}
      responsive={false}
      plain
    >
      <Box
        align="center"
        direction="row"
        gap="small"
        justify="between"
        round="small"
        elevation="medium"
        pad={{ vertical: "small", horizontal: "small" }}
        background={background}
      >
        <Box align="center" direction="row" gap="small">
          {icon}
          <Text>{content}</Text>
        </Box>
        <Button icon={<FormClose />} onClick={onClose} plain />
      </Box>
    </Layer>
  )
}

Toast.propTypes = {
  content: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  mode: PropTypes.oneOf(["ok", "warning", "error"]).isRequired,
  onClose: PropTypes.func.isRequired,
}

export default Toast
