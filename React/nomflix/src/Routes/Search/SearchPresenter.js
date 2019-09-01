import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Loader from 'Components/Loader';
import Section from 'Components/Section';
import Message from 'Components/Message';

const Container = styled.div`
  padding: 0px 20px;
`;

const Form = styled.form`
  margin-bottom: 50px;
  width: 100%;
  `;

const Input = styled.input`
  all: unset;
  font-size: 28px;
  width: 100%;
`;

const SearchPresenter = ({ movieResults, tvResults, searchTerm, handleSubmit, updateTerm, error, loading}) => 
  <Container>
    <Form onSubmit={handleSubmit}>
      <Input 
        placeholder="Search Movies or TV Shows..." 
        value={searchTerm} 
        onChange={updateTerm}
      />
    </Form>
    {loading ? (
      <Loader />
      ) : (
      <>
        {movieResults && movieResults.length > 0 && (
          <Section title="Movie Results">
            {movieResults.map(movie => (
              <span key={movie.id}>{movie.title}</span>
            ))}
          </Section>
        )}
        {tvResults && tvResults.length > 0 && (
          <Section title="TV Shows Results">
            {tvResults.map(show => (
              <span key={show.id}>{show.name}</span>
            ))}
          </Section>
        )}
        {error && <Message color='#e74c3c' text={error} />}
        {tvResults && movieResults && tvResults.length === 0 && movieResults.length === 0 && <Message text="Noting found" color="#95a6a5" />}
      </>
      )}
  </Container>


SearchPresenter.propTypes = {
  movieResults: PropTypes.array,
  tvResults: PropTypes.array,
  searchTerm: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  updateTerm: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
}

export default SearchPresenter;