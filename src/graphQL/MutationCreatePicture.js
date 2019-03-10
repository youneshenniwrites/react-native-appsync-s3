import gql from 'graphql-tag';

const MutationCreatePicture = gql`
mutation ($input: CreatePictureInput!) {
  createPicture(input: $input) {
    id
    visibility
    owner
    createdAt
    file {
      region
      bucket
      key
    }
  }
}`;

export default MutationCreatePicture;
