import {ButtonHTMLAttributes, MouseEvent, ReactNode} from 'react';
import styled from '@emotion/styled';
import {css} from '@emotion/react';

type Size = 'small' | 'medium' | 'large';

interface ButtonProps {
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  size?: Size;
  onClick: (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => void;
  children: ReactNode;
}

const Button = ({
  type = 'button',
  size = 'medium',
  onClick,
  children,
}: ButtonProps) => {
  return (
    <Wrapper type={type} size={size} onClick={onClick}>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.button<{size: Size}>`
  border-radius: 5px;
  border: 1px solid #e5e5e5;
  font-size: ${({theme}) => theme.fontSizes.small};

  ${({size}) =>
    ({
      small: css`
        width: 100px;
        height: 20px;
      `,
      medium: css`
        width: 125px;
        height: 30px;
      `,
      large: css`
        width: 150px;
        height: 40px;
      `,
    }[size])}

  &:active {
    transform: scale(0.98);
  }
`;

export default Button;
