import { motion, Variants } from 'framer-motion'
import { Item } from '../../components/item'
import { Layout } from '../../components/layout'
import { items } from '../../data/items'

const variants: Variants = {
  mount: {
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.5,
    },
  },
}

const itemVariants: Variants = {
  mount: {
    opacity: 1,
    y: 0,
    rotate: 0,
  },
  unmount: {
    opacity: 0,
    y: 50,
    rotate: 180,
  },
  hover: {
    scale: 1.1,
  },
}

export const Content = (): JSX.Element => {
  const { name, image } = items[0]

  return (
    <Layout
      animate="mount"
      initial="unmount"
      variants={variants}
      as={motion.main}
    >
      <motion.div key={name} variants={itemVariants}>
        <motion.div variants={itemVariants} whileHover="hover">
          <Item isSelected={false} color={'white'}>
            <img src={image} alt={name} />
          </Item>
        </motion.div>
      </motion.div>
    </Layout>
  )
}
