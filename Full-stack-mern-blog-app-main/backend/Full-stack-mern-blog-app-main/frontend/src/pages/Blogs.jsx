import Hero from "../components/Hero";
import BlogCard from "../components/BlogCard";
import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";

const Blogs = () => {
  const { blogData } = useContext(StoreContext);

  return (
    <div>
      <Hero />
      <h1 className="text-3xl text-center font-bold my-6">All Blogs</h1>
      <p className="text-base px-3 sm:text-lg leading-6 max-w-2xl mx-auto">
        Welcome to MyBlogApp! Explore exciting articles on travel adventures, delicious recipes, lifestyle tips, and the latest technology trends. 
        Our goal is to inspire, inform, and entertain readers with high-quality content. 
        Join us on this journey of discovery and creativity!
      </p>
      <div className="grid my-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-3 sm:px-4">
        {blogData.map((blog, index) => (
          <BlogCard
            key={index}
            id={blog._id}  // use _id from backend
            title={blog.title}
            image={blog.image}
            category={blog.category}
            author_name={blog.author.name}
            author_image={blog.author.image}
            date={blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : "Date not available"}
          />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
