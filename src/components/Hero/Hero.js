import React from "react";
import styled from "styled-components";
import foto from "../../images/pexels-karol-d-325153.jpg";

const Image = styled.div`
  height: 70vh;
  width: 100%;
  background-image: url(${foto});
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
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
    padding-bottom:1rem;
    margin: 1rem;
    margin-top:100px;
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
        <Image/>
      </Container>
    </>
  );
};

export default Hero;
