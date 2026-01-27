export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    avatar: string;
  };
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "easy-organic-breakfast-ideas",
    title: "Easy Organic Breakfast Ideas for Busy Mornings",
    excerpt:
      "Start your day right with these quick and healthy organic breakfast recipes that take less than 15 minutes.",
    content: `
      <p>In today's fast-paced world, finding time to prepare a healthy breakfast can be a challenge. But eating organic doesn't have to be time-consuming. We've gathered some of our favorite quick and nutritious breakfast ideas to help you start your day with energy and focus.</p>
      
      <p>Whether you're rushing to the office or getting the kids ready for school, these recipes use simple, wholesome ingredients that you can feel good about. From overnight oats to quick avocado toast, we've got you covered.</p>
      
      <blockquote>
        Every meal has a story, and it begins long before it reaches your plate. From the soil where ingredients are grown to the hands that harvest and craft them, every step matters. In a world where processed food dominates the shelves.
      </blockquote>
      
      <p>Choosing organic ingredients for your breakfast ensures that you're avoiding synthetic pesticides and GMOs right from the first meal of the day. This simple choice can have a significant impact on your long-term health and the environment.</p>
      
      <h3>Discover the real story behind your food</h3>
      <p>At the heart of every clean and wholesome product is transparency and purpose. Brands that share their story are creating a deeper bond with us and introducing more meaningful value in their kitchen.</p>
      <ul>
        <li>Grown with care by local farmers who prioritize soil and health.</li>
        <li>Each ingredient is chosen not just for taste, but for its natural nutritional value.</li>
        <li>Free from artificial additives, preservatives, and misleading marketing claims.</li>
        <li>Produced in facilities that adhere to rigorous and ethical processing standards.</li>
        <li>Backed by a mission to create food that respects your body and the planet.</li>
      </ul>
      <p>Knowing the real story behind your food allows you to connect with the values of absolute honesty and sustainability. Because when you choose food that respects the earth and yourself, you're not just eating — you're making a better future. But understanding where your food comes from is the power, our story, and trust.</p>
    `,
    image:
      "https://placehold.co/800x600/154d2e/FFFFFF/png?text=Organic+Breakfast",
    date: "July 30, 2023",
    category: "Organic Food",
    tags: ["Explore", "Ingredients", "Recipes"],
    author: {
      name: "Admin",
      avatar: "https://placehold.co/100x100/154d2e/FFFFFF/png?text=A",
    },
  },
  {
    id: "2",
    slug: "why-clean-labels-matter",
    title: "Why Clean Labels Matter in Today's Food Choices",
    excerpt:
      "Understanding food labels is the first step towards a healthier lifestyle. Learn what to look for and what to avoid.",
    content: "<p>Content for clean labels...</p>",
    image: "https://placehold.co/800x600/154d2e/FFFFFF/png?text=Clean+Labels",
    date: "August 5, 2023",
    category: "Health",
    tags: ["Health", "Organic", "Labeling"],
    author: {
      name: "Admin",
      avatar: "https://placehold.co/100x100/154d2e/FFFFFF/png?text=A",
    },
  },
  {
    id: "3",
    slug: "quick-wholesome-recipes",
    title: "Quick & Wholesome Recipes for Busy Weeknights",
    excerpt:
      "Don't let a busy schedule stop you from eating well. These 30-minute meals are both delicious and nutritious.",
    content: "<p>Content for wholesome recipes...</p>",
    image: "https://placehold.co/800x600/154d2e/FFFFFF/png?text=Quick+Recipes",
    date: "August 12, 2023",
    category: "Cooking",
    tags: ["Recipes", "Dinner", "Quick"],
    author: {
      name: "Admin",
      avatar: "https://placehold.co/100x100/154d2e/FFFFFF/png?text=A",
    },
  },
  {
    id: "4",
    slug: "quick-healthy-lunch-recipes",
    title: "Quick Healthy Lunch Recipes for Working Days",
    excerpt:
      "Break away from boring lunches with these fresh and vibrant ideas that will keep you fueled throughout the afternoon.",
    content: "<p>Content for lunch recipes...</p>",
    image: "https://placehold.co/800x600/154d2e/FFFFFF/png?text=Healthy+Lunch",
    date: "August 18, 2023",
    category: "Organic Food",
    tags: ["Lunch", "Healthy", "Work"],
    author: {
      name: "Admin",
      avatar: "https://placehold.co/100x100/154d2e/FFFFFF/png?text=A",
    },
  },
  {
    id: "5",
    slug: "simple-organic-dinner-plans",
    title: "Simple Organic Dinner Plans for Family Nights",
    excerpt:
      "Bring the family together with these comforting organic meals that everyone will love.",
    content: "<p>Content for dinner plans...</p>",
    image: "https://placehold.co/800x600/154d2e/FFFFFF/png?text=Family+Dinner",
    date: "August 25, 2023",
    category: "Family",
    tags: ["Dinner", "Family", "Organic"],
    author: {
      name: "Admin",
      avatar: "https://placehold.co/100x100/154d2e/FFFFFF/png?text=A",
    },
  },
  {
    id: "6",
    slug: "tasty-quick-vegan-snack-ideas",
    title: "Tasty Quick Vegan Snack Ideas for Busy Evenings",
    excerpt:
      "Satisfy your cravings with these plant-based snacks that are easy to make and even easier to eat.",
    content: "<p>Content for vegan snacks...</p>",
    image: "https://placehold.co/800x600/154d2e/FFFFFF/png?text=Vegan+Snacks",
    date: "September 1, 2023",
    category: "Vegan",
    tags: ["Vegan", "Snacks", "Health"],
    author: {
      name: "Admin",
      avatar: "https://placehold.co/100x100/154d2e/FFFFFF/png?text=A",
    },
  },
  {
    id: "7",
    slug: "summer-organic-juices",
    title: "Summer Organic Juices to Keep You Hydrated",
    excerpt:
      "Stay cool and healthy this summer with our top 5 organic juice recipes.",
    content: "<p>Content for organic juices...</p>",
    image: "https://placehold.co/800x600/154d2e/FFFFFF/png?text=Organic+Juices",
    date: "September 10, 2023",
    category: "Organic Food",
    tags: ["Summer", "Juice", "Health"],
    author: {
      name: "Admin",
      avatar: "https://placehold.co/100x100/154d2e/FFFFFF/png?text=A",
    },
  },
  {
    id: "8",
    slug: "growing-your-own-herbs",
    title: "A Guide to Growing Your Own Organic Herbs",
    excerpt:
      "Learn how easy it is to start your own herb garden right in your kitchen.",
    content: "<p>Content for herb garden...</p>",
    image: "https://placehold.co/800x600/154d2e/FFFFFF/png?text=Herb+Garden",
    date: "September 15, 2023",
    category: "Gardening",
    tags: ["Herbs", "Garden", "Organic"],
    author: {
      name: "Admin",
      avatar: "https://placehold.co/100x100/154d2e/FFFFFF/png?text=A",
    },
  },
  {
    id: "9",
    slug: "sustainable-food-packaging",
    title: "Why Sustainable Food Packaging Matters",
    excerpt:
      "The impact of food packaging on our environment and what we are doing about it.",
    content: "<p>Content for sustainable packaging...</p>",
    image: "https://placehold.co/800x600/154d2e/FFFFFF/png?text=Packaging",
    date: "September 20, 2023",
    category: "Environment",
    tags: ["Sustainability", "Packaging", "Waste"],
    author: {
      name: "Admin",
      avatar: "https://placehold.co/100x100/154d2e/FFFFFF/png?text=A",
    },
  },
];
