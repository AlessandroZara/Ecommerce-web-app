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
    color: #00688B;
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
        src="https://images.pexels.com/photos/2541310/pexels-photo-2541310.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
        fluid
      />
      </Container>
    </>
  );
};

export default Hero;
