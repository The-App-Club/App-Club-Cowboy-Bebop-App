import styled from '@emotion/styled';
import {css, cx} from '@emotion/css';
import {BsReddit} from 'react-icons/bs';

const degsToRads = (deg) => {
  return (deg * Math.PI) / 180.0;
};

const plotPoints = (radius, numberOfPoints) => {
  /* step used to place each point at equal distances */
  const angleStep = (Math.PI * 2) / numberOfPoints;

  const points = [];

  for (let i = 1; i <= numberOfPoints; i++) {
    /* x & y coordinates of the current point */
    const x = Math.cos(i * angleStep) * radius;
    const y = Math.sin(i * angleStep) * radius;

    /* push the point to the points array */
    points.push({x, y});
  }

  return points;
};

const StyledTouchMenuItem = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
`;

const Menu = ({width, height}) => {
  const a = plotPoints(degsToRads(22.5), 8);
  return (
    <StyledTouchMenuItem>
      {[...a].map((info, index) => {
        const {x, y} = info;
        return (
          <div
            key={index}
            className={css`
              position: absolute;
              width: 45px;
              height: 45px;
              border: 1px solid;
              display: flex;
              justify-content: center;
              align-items: center;
              top: ${y * width}px;
              left: ${x * height}px;
              transform: translateX(-50%) translateY(-50%) rotate(120deg);
            `}
          >
            <BsReddit size={30} />
          </div>
        );
      })}
    </StyledTouchMenuItem>
  );
};

export {Menu};
