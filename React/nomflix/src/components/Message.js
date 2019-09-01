import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  width: 100vw;
  display: flex;
  justify-contents: center;
`;

const Text = styled.span`
  color: ${props => props.color};
  font-weight: 600;
`;

const Message = ({text, color}) => (
  <Container>
    <Text color={color}>{text}</Text>
  </Container>
);

Message.propTypeds = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired
}

export default Message;