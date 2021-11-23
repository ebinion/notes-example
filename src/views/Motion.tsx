import { ReactNode } from 'react'
import { motion } from 'framer-motion'

const slideFromBottomVariant = {
  inert: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 50 },
}

const slideFromLeftVariant = {
  inert: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
}

const fadeInVariant = {
  inert: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 50 },
}

const Motion = (props: {
  kind?: 'slideFromLeft' | 'slideFromBottom' | 'fadeIn'
  children: ReactNode
}) => {
  const { kind, children } = props

  let motionVariants = fadeInVariant as {
    inert: {
      opacity: number
      x?: number
      y?: number
    }
    exit: {
      opacity: number
      x?: number
      y?: number
    }
  }

  switch (kind) {
    case 'slideFromLeft':
      motionVariants = slideFromLeftVariant
      break
    case 'slideFromBottom':
      motionVariants = slideFromBottomVariant
      break
    default:
      break
  }

  return (
    <motion.div
      animate="inert"
      exit="exit"
      initial="exit"
      variants={motionVariants}
    >
      {children}
    </motion.div>
  )
}

Motion.defaultProps = {
  kind: 'fadeIn',
}

export default Motion
