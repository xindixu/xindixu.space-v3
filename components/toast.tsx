import React, { useEffect } from "react"

import {
  FormClose,
  StatusGood,
  CircleAlert,
  StatusWarning,
} from "grommet-icons"
import { Box, Layer, Button, Text } from "grommet"
import { motion, AnimatePresence } from "framer-motion"

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

export type TMode = "ok" | "warning" | "error"
type TProps = {
  closeAfter?: number
  content?: string
  isOpen: boolean
  mode?: TMode
  onClose: () => void
}
const Toast = ({
  closeAfter = 3000,
  content,
  isOpen,
  mode = "ok",
  onClose,
}: TProps) => {
  useEffect(() => {
    let timer: NodeJS.Timer
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

export default Toast
