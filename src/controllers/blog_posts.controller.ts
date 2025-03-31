export const getAllBlogPosts = async (req, res) => {
    return res.status(200).json([
        {
            id: 1,
            title: "First Blog Post",
            content: "This is the content of the first blog post.",
            catgegory: "General",
            status: "published",
            createdAt: new Date(),
        },
    ]);
}