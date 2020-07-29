export const adaptMovie = movie => {
  return {
    id: movie[`id`],
    title: movie[`name`],
    image: movie[`preview_image`],
    background: movie[`background_image`],
    color: movie[`background_color`],
    genre: movie[`genre`],
    release: movie[`released`],
    runtime: movie[`run_time`],
    poster: movie[`poster_image`],
    preview: movie[`preview_video_link`],
    video: movie[`video_link`],
    isFavorite: movie[`is_favorite`],
    rating: {
      score: movie[`rating`],
      count: movie[`scores_count`]
    },
    description: movie[`description`],
    crew: {
      director: movie[`director`],
      starring: movie[`starring`]
    }
  };
};

export const adaptMovies = movies => movies.map(adaptMovie);

export const adaptComments = comments =>
  comments.map(comment => ({
    comment: comment[`comment`],
    date: comment[`date`],
    id: comment[`id`],
    rating: comment[`rating`],
    user: {
      id: comment[`user`][`id`],
      name: comment[`user`][`name`]
    }
  }));

export const adaptLoginResponse = userData => ({
  avatarUrl: userData[`avatar_url`],
  email: userData[`email`],
  id: userData[`id`],
  name: userData[`name`]
});
