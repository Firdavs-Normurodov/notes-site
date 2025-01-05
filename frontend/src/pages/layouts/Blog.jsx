const posts = [
  {
    id: 1,
    title: "Boost your conversion rate",
    href: "#",
    description:
      "Increasing your website’s conversion rate can significantly impact your business. By optimizing key elements like call-to-action buttons, user experience, and landing page design, you can turn visitors into loyal customers. Learn how small changes can result in a big boost for your business.",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "Marketing", href: "#" },
    author: {
      name: "Michael Foster",
      role: "Co-Founder / CTO",

      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    id: 2,
    title: "Master the art of time management",

    description:
      "Effective time management is key to achieving personal and professional goals. In this blog, we dive into proven strategies like the Pomodoro technique, task prioritization, and goal setting that will help you manage your time more efficiently and reduce stress.",
    date: "Apr 10, 2020",
    datetime: "2020-04-10",
    category: { title: "Productivity", href: "#" },
    author: {
      name: "Sarah White",
      role: "Productivity Expert",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    id: 3,
    title: "Creating a growth mindset for success",

    description:
      "A growth mindset can change the way you approach challenges, learning, and personal development. In this post, we explore how adopting a growth mindset helps overcome obstacles, embrace failure as a learning opportunity, and reach new heights in both personal and professional life.",
    date: "May 5, 2020",
    datetime: "2020-05-05",
    category: { title: "Self-Improvement", href: "#" },
    author: {
      name: "Judith Black",
      role: "Life Coach",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=1024&h=1024&q=80",
    },
  },
  {
    id: 4,
    title: "Boost your conversion rate",
    href: "#",
    description:
      "Increasing your website’s conversion rate can significantly impact your business. By optimizing key elements like call-to-action buttons, user experience, and landing page design, you can turn visitors into loyal customers. Learn how small changes can result in a big boost for your business.",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "Marketing", href: "#" },
    author: {
      name: "Dries Vincent",
      role: "Co-Founder / CTO",

      imageUrl:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    id: 5,
    title: "Master the art of time management",

    description:
      "Effective time management is key to achieving personal and professional goals. In this blog, we dive into proven strategies like the Pomodoro technique, task prioritization, and goal setting that will help you manage your time more efficiently and reduce stress.",
    date: "Apr 10, 2020",
    datetime: "2020-04-10",
    category: { title: "Productivity", href: "#" },
    author: {
      name: "Samanta Eles",
      role: "Productivity Expert",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    id: 6,
    title: "Creating a growth mindset for success",

    description:
      "A growth mindset can change the way you approach challenges, learning, and personal development. In this post, we explore how adopting a growth mindset helps overcome obstacles, embrace failure as a learning opportunity, and reach new heights in both personal and professional life.",
    date: "May 5, 2020",
    datetime: "2020-05-05",
    category: { title: "Self-Improvement", href: "#" },
    author: {
      name: "Joseph Rodriguez",
      role: "Life Coach",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
];

export default function Example({ id }) {
  return (
    <div className="bg-white py-24 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto w-auto text-center lg:mx-0 ">
          <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Our blog
          </h2>
          <p className="mt-2 text-lg/8 text-gray-600">
            Here you can find out what our customers think.
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="flex max-w-xl flex-col items-start justify-between"
            >
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={post.datetime} className="text-gray-500">
                  {post.date}
                </time>
                <a className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                  {post.category.title}
                </a>
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                  <a href={post.href}>
                    <span className="absolute inset-0" />
                    {post.title}
                  </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">
                  {post.description}
                </p>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4">
                <img
                  alt=""
                  src={post.author.imageUrl}
                  className="size-10 rounded-full bg-gray-50"
                />
                <div className="text-sm/6">
                  <p className="font-semibold text-gray-900">
                    <a href={post.author.href}>
                      <span className="absolute inset-0" />
                      {post.author.name}
                    </a>
                  </p>
                  <p className="text-gray-600">{post.author.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
