import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// graphql test passed
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_POST = gql`
  mutation addPost($caption: String!, $image: String!, $petName: String!) {
    addPost(petName: $petName, caption: $caption, image: $image) {
      _id
      petName
      caption
      image
      createdAt
      username
      comments {
        _id
      }
    }
  }
`;

export const UPLOAD_FILE = gql`
  mutation singleUpload($file: Upload!) {
    singleUpload(file: $file) {
      filename
      mimetype
      encoding
    }
  }
`

export const ADD_COMMENT = gql`
  mutation addComment($postId: ID!, $commentText: String!) {
    addComment(postId: $postId, commentText: $commentText) {
      _id
      comments {
        _id
        commentText
        username
        createdAt
      }
    }
  }
`;

export const REMOVE_POST = gql`
  mutation removePost($id: ID!) {
    removePost(id: $id) {
      _id
      username
    }
  }
`;

export const UPDATE_POST = gql`
  mutation updatePost($id: ID!) {
    updatePost(id: $ID) {
      _id
      username
    }
  }
`;

export const REMOVE_USER = gql`
  mutation removeUser($id: ID!) {
    removeUser(id: $id) {
      _id
      username
    }
  }
`;

export const REMOVE_COMMENT = gql`
  mutation removeComment($id: ID!) {
    removeComment(id: $id) {
      _id
      username
      comments {
        _id
        username
      }
    }
  }
`;
