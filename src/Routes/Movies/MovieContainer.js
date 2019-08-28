import React from 'react';
import MoviePresenter from './MoviePresenter';
import {moviesApi} from 'api';

export default class extends React.Component {
  state = {
    nowPlaying: null,
    upcoming: null,
    popular: null,
    loading: true,
    error: null,
  };

  async componentDidMount() {
    try {
      const {
        data: {results: nowPlaying},
      } = await moviesApi.nowPlaying();
      const {
        data: {results: upcoming},
      } = await moviesApi.upcoming();
      const {
        data: {results: popular},
      } = await moviesApi.popular();
      this.setState({nowPlaying, upcoming, popular});
    } catch {
      this.setState({
        error: "Can't find Movies information.",
      });
    } finally {
      this.setState({loading: false});
    }
  }

  render() {
    const {nowPlaying, upcoming, popular, loading, error} = this.state;
    return (
      <MoviePresenter
        nowPlaying={nowPlaying}
        upcoming={upcoming}
        popular={popular}
        loading={loading}
        error={error}
      />
    );
  }
}
