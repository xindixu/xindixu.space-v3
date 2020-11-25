import React, { useEffect } from "react"
import PropTypes from "prop-types"
import {
  FormClose,
  StatusGood,
  CircleAlert,
  StatusWarning,
} from "grommet-icons"
import { motion, AnimatePresence } from "framer-motion"

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

const slideMenuAnimation = {
  visible: {
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
  hidden: {
    y: -400,
    transition: {
      duration: 0.5,
    },
  },
}

const Toast = ({ isOpen, onClose, content, mode, closeAfter }) => {
  useEffect(() => {
    let timer
    if (isOpen) {
      timer = setTimeout(onClose, closeAfter)
    }
    return () => {
      clearTimeout(timer)
    }
  }, [isOpen, closeAfter, onClose])

  const { icon, background } = modes[mode]
  return (
    <AnimatePresence>
      {isOpen ? (
        <Layer
          margin={{ vertical: "medium", horizontal: "medium" }}
          modal={false}
          onEsc={onClose}
          plain
          position="top"
          responsive={false}
        >
          <motion.div
            animate={isOpen ? "visible" : "hidden"}
            exit="hidden"
            initial={isOpen ? "hidden" : "visible"}
            style={{ height: "100%" }}
            variants={slideMenuAnimation}
          >
            <Box
              align="center"
              background={background}
              direction="row"
              elevation="medium"
              gap="small"
              justify="between"
              pad={{ vertical: "small", horizontal: "small" }}
              round="small"
            >
              <Box align="center" direction="row" gap="small">
                {icon}
                <Text>{content}</Text>
              </Box>
              <Button icon={<FormClose />} onClick={onClose} plain />
            </Box>
          </motion.div>
        </Layer>
      ) : null}
    </AnimatePresence>
  )
}

Toast.defaultProps = {
  closeAfter: 3000,
  mode: "ok",
}

Toast.propTypes = {
  closeAfter: PropTypes.number,
  content: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  mode: PropTypes.oneOf(["ok", "warning", "error"]),
  onClose: PropTypes.func.isRequired,
}

export default Toast
