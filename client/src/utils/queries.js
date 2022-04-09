import { gql } from "@apollo/client";

export const QUERY_POST = gql`
  query post($username: String) {
    post(username: $username) {
      _id
      petName
      caption
      createdAt
      username
      image
      comments {
        _id
        commentText
        createdAt
        username
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      password
      posts {
        _id
        petName
        caption
        createdAt
        username
        image
        comments {
          _id
          commentText
          createdAt
          username
        }
      }
    }
  }
`;

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      posts {
        _id
        petName
        caption
        createdAt
        username
        image
        comments {
          _id
          commentText
          createdAt
          username
        }
      }
    }
  }
`;
