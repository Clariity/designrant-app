// templates/Author/index.jsx
import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Twitter from "../../content/assets/twitter.svg"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({
  data: {
    authorYaml: { id, bio, twitter, kofi, avatar, from, website },
    allMarkdownRemark: { edges: postNodes },
  },
}) => (
  <Layout>
    <SEO title={id} />
    <div
      className="row is-white-bg pad-3 border-radius"
      style={{ maxWidth: 700 }}
    >
      <div className="col-xs-12 col-md-2">
        <Img fluid={avatar.childImageSharp.fluid} className="avatar-lg" />
      </div>
      <div className="col-xs-12 col-md-9">
        <div className="flex ">
          <h1 className="margin-1-tb margin-1-r">{id}</h1>
        </div>
        <h4 className="margin-0-tb">{from.toUpperCase()} </h4>

        {twitter && (
          <div className="margin-1-t">
            <a
              href={`https://twitter.com/${twitter}/`}
              target="_blank"
              className=" grow"
            >
              <img src={Twitter} className="twitter " />
            </a>
          </div>
        )}
      </div>
      <div className="col-xs-12">
        <h4>{bio}</h4>
      </div>

      {website && (
        <a
          href={website}
          target="_blank"
          className="col-xs-12 col-md-6 margin-3-b"
        >
          <button className="bubble-button border-radius fill-width">
            Vist Their Site
          </button>
        </a>
      )}
      {kofi && (
        <a
          href={`https://ko-fi.com/${kofi}/`}
          target="_blank"
          className="col-xs-12 col-md-6 margin-3-b"
        >
          <button className="bubble-button border-radius fill-width">
            Buy Them A Coffee
          </button>
        </a>
      )}

      <div className="col-xs-12">
        <div className="line is-black opacity-5 margin-3-t" />
        <h4>
          {postNodes.length} posts by <strong>{id}</strong>
        </h4>
        {postNodes.map(({ node: post }, idx) => (
          <div key={post.id}>
            <a href={post.fields.slug}>
              <p>{post.frontmatter.title}</p>
            </a>
          </div>
        ))}
      </div>
    </div>
  </Layout>
)

export const pageQuery = graphql`
  query PostsByAuthorId($authorId: String!) {
    allMarkdownRemark(filter: { fields: { authorId: { eq: $authorId } } }) {
      edges {
        node {
          id
          frontmatter {
            title
            author {
              id
            }
          }
          fields {
            authorId
            slug
          }
        }
      }
    }
    authorYaml(id: { eq: $authorId }) {
      id
      bio
      twitter
      kofi
      from
      website
      avatar {
        childImageSharp {
          fluid(maxWidth: 80) {
            ...GatsbyImageSharpFluid_noBase64
          }
        }
      }
    }
  }
`
