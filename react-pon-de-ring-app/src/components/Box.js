import styled from '@emotion/styled';
import {css} from '@emotion/css';
import {Menu} from './Menu';

const StyledTouchMenu = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  border: 1px solid;
`;

const Box = ({width, height}) => {
  return (
    <StyledTouchMenu
      className={css`
        width: ${width}px;
        height: ${height}px;
      `}
    >
      <Menu width={width} height={height} />
    </StyledTouchMenu>
  );
};

export {Box};
