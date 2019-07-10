import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import SearchIcon from '@material-ui/icons/Search';
import styled from '@emotion/styled';
import SearchList from './SearchList';
import { fetchVideos, setListVisibility } from './actions';

const FormPaper = styled(Paper)`
  padding: 6px 12px;
  display: flex;
  align-items: center;
  width: 100%;
`;

const Input = styled(InputBase)`
  flex-grow: 1;
  padding: 0 5px 0 0;
`;

const SearchForm = ({
  videos,
  videosIsLoading,
  fetchVideos,
  setListVisibility,
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleClickAway = () => {
    if (!videosIsLoading) {
      setListVisibility(false);
    }
  };
  const handleChangeInput = e => setInputValue(e.target.value);

  const handleFocusInput = () => {
    if (videos) setListVisibility(true);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!inputValue) return false;

    setListVisibility(true);
    fetchVideos({ keyword: inputValue.split(' ').join('+') });
  };

  return (
    <Grid container justify="center">
      <Grid item xs={6}>
        <ClickAwayListener onClickAway={handleClickAway}>
          <div>
            <form onSubmit={handleSubmit}>
              <FormPaper>
                <Input
                  id="search-input"
                  type="search"
                  placeholder="Search"
                  inputProps={{ 'aria-label': 'Search videos' }}
                  value={inputValue}
                  onChange={handleChangeInput}
                  onFocus={handleFocusInput}
                />
                <Fab
                  type="submit"
                  size="small"
                  color="primary"
                  aria-label="Search"
                >
                  <SearchIcon />
                </Fab>
              </FormPaper>
            </form>
            <SearchList />
          </div>
        </ClickAwayListener>
      </Grid>
    </Grid>
  );
};

SearchForm.propTypes = {
  videos: PropTypes.arrayOf(PropTypes.object),
  fetchVideos: PropTypes.func,
  videosIsLoading: PropTypes.bool,
  setListVisibility: PropTypes.func,
};

export default connect(
  ({ searchReducer }) => ({
    videos: searchReducer.videos,
    videosIsLoading: searchReducer.videosIsLoading,
  }),
  { fetchVideos, setListVisibility }
)(SearchForm);
