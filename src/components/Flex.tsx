import styled from '@emotion/styled';
import {CSSProperties, ReactNode} from 'react';

interface FlexProps {
  as?: React.ElementType;
  flex?: number;
  className?: string;
  direction?: CSSProperties['flexDirection'];
  spacing?: number;
  justifyContent?: CSSProperties['justifyContent'];
  alignItems?: CSSProperties['alignItems'];
  children: ReactNode[];
}

const Flex = ({
  as,
  flex,
  className,
  direction = 'row',
  spacing,
  justifyContent,
  alignItems = 'center',
  children,
}: FlexProps) => {
  return (
    <Wrapper
      as={as}
      flex={flex}
      className={className}
      spacing={spacing}
      direction={direction}
      justifyContent={justifyContent}
      alignItems={alignItems}>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div<FlexProps>`
  display: flex;
  flex: ${({flex}) => flex};
  flex-direction: ${({direction}) => direction};
  gap: ${({spacing}) => spacing && `${spacing * 5}px`};
  justify-content: ${({justifyContent}) => justifyContent};
  align-items: ${({alignItems}) => alignItems};
`;

export default Flex;
