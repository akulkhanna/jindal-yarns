import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';

interface SplitTextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
}

/**
 * Reveals text word-by-word with a masked clip animation.
 * Each word slides up from below its container (overflow:hidden mask).
 */
export function SplitTextReveal({
  text,
  className = '',
  delay = 0,
  stagger = 0.07,
  once = true,
  as: Tag = 'div',
}: SplitTextRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once, margin: '-5% 0px' });

  const words = text.split(' ');

  return (
    <Tag
      ref={ref as React.Ref<HTMLElement & HTMLHeadingElement & HTMLDivElement>}
      className={`${className}`}
      style={{ overflow: 'hidden' }}
      aria-label={text}
    >
      <span className="flex flex-wrap" style={{ gap: '0.25em' }}>
        {words.map((word, i) => (
          <span key={i} style={{ overflow: 'hidden', display: 'inline-block' }}>
            <motion.span
              style={{ display: 'inline-block' }}
              initial={{ y: '105%', opacity: 0 }}
              animate={
                isInView
                  ? { y: 0, opacity: 1 }
                  : { y: '105%', opacity: 0 }
              }
              transition={{
                duration: 0.75,
                delay: delay + i * stagger,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  );
}

/**
 * Char-by-char reveal — for shorter display headings
 */
export function CharReveal({
  text,
  className = '',
  delay = 0,
  stagger = 0.03,
  once = true,
  as: Tag = 'div',
}: SplitTextRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once, margin: '-5% 0px' });

  const chars = text.split('');

  return (
    <Tag
      ref={ref as React.Ref<HTMLElement & HTMLHeadingElement & HTMLDivElement>}
      className={className}
      aria-label={text}
      style={{ display: 'inline-block' }}
    >
      {chars.map((char, i) => (
        <span key={i} style={{ overflow: 'hidden', display: 'inline-block' }}>
          <motion.span
            style={{ display: 'inline-block', whiteSpace: 'pre' }}
            initial={{ y: '110%', rotateX: -45, opacity: 0 }}
            animate={
              isInView
                ? { y: 0, rotateX: 0, opacity: 1 }
                : { y: '110%', rotateX: -45, opacity: 0 }
            }
            transition={{
              duration: 0.6,
              delay: delay + i * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {char}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
