import gql from 'graphql-tag';

const QueryListPictures = gql`
query {
  listPictures(limit: 5000) {
    items {
      id
      visibility
      owner
      createdAt
      file {
        bucket
        region
        key
      }
    }
  }
}`;

export default QueryListPictures;