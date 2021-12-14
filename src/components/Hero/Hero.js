import React from "react";
import styled from "styled-components";

const Image = styled.img`
  height: 70vh;
  width: 100%;
  object-fit: cover;
`;

const Container = styled.div`
justify-content: center;
align-items: center;
`;

const Title = styled.h1`
    font-size: 3rem;
    font-weight:600;
    background: #46B8CF;
    background: -webkit-radial-gradient(circle farthest-corner at center center, #46B8CF 0%, #000000 37%);
    background: -moz-radial-gradient(circle farthest-corner at center center, #46B8CF 0%, #000000 37%);
    background: radial-gradient(circle farthest-corner at center center, #46B8CF 0%, #000000 37%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-align: center;
    margin: 1rem;
    animation: fadeIn 3s;
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
`;

const Hero = () => {
  return (
    <>
      <Container>
        <Title>Home Page</Title>
      <Image
        src="https://images.pexels.com/photos/2541310/pexels-photo-2541310.jpeg"
        fluid
      />
      </Container>
    </>
  );
};

export default Hero;
