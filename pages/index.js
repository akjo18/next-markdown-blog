import fs from "fs";
import path from "path";
import Head from "next/head";
import matter from "gray-matter";
import Post from "../components/Post";
import { sortByDate } from "../utils";

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>Blog Site</title>
      </Head>

      <div className="posts">
        {posts.map((post, index) => (
          <Post post={post} />
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  // Get files from the post dir
  const files = fs.readdirSync(path.join("posts"));

  // Get Slug and frontmatter from posts
  const posts = files.map((filename) => {
    // Create Slug
    const slug = filename.replace(".md", "");

    // Get Frontmatter

    const markdownWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );

    const { data: frontmatter } = matter(markdownWithMeta);

    return {
      slug,
      frontmatter,
    };
  });

  return {
    props: {
      posts: posts.sort(sortByDate),
    },
  };
}
