import styled from '@emotion/styled';

const StyledImageContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledImage = styled.img`
  display: block;
  max-width: 100%;
  width: 100%;
  object-fit: cover;
`;

const Image = ({src, alt}) => {
  return (
    <StyledImageContent>
      <StyledImage width={100} height={100} src={src} alt={alt}></StyledImage>
    </StyledImageContent>
  );
};

export {Image};
