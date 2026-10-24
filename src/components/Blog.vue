<template>
  <!-- Section: Blog -->
    <section
    id="latest-blog"
    class="relative z-10 overflow-hidden bg-gradient-to-b from-transparent via-blue-50/60 to-white py-20 sm:py-28"
    >
    <!-- Header -->
    <div
      class="max-w-3xl mx-auto text-center px-6 sm:px-8 mb-16"
      data-aos="fade-up"
      data-aos-delay="200"
    >
      <h2 class="text-2xl sm:text-5xl font-bold text-blue-900 mb-6">
        Latest from Our Blog
      </h2>
      <p class="text-gray-700 text-lg sm:text-xl leading-relaxed">
        Insights on metocean consultancy, marine forecasting, and ocean technology from the Monsun team.
      </p>
    </div>

    <!-- Blog Cards -->
    <div
      class="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-6 sm:px-8"
      data-aos="fade-up"
      data-aos-delay="400"
    >
      <RouterLink
        v-for="(post, index) in latestPosts"
        :key="index"
        :to="`/blog/${post.slug}`"
        class="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
      >
        <div
          v-if="post.meta.image"
          class="aspect-[16/10] overflow-hidden bg-slate-100"
        >
          <img
            :src="post.meta.image"
            :alt="post.meta.title"
            class="h-full w-full object-cover object-top transition duration-300 group-hover:scale-[1.02]"
            loading="lazy"
            width="800"
            height="500"
          />
        </div>
        <div class="flex flex-1 flex-col p-6 sm:p-7">
          <h3 class="text-xl font-semibold leading-snug text-blue-950 group-hover:text-blue-800">
            {{ post.meta.title }}
          </h3>
          <p class="mt-3 flex-1 leading-relaxed text-slate-600">
            {{ post.meta.excerpt }}
          </p>
          <span class="mt-5 inline-flex items-center text-sm font-semibold text-blue-700">
            Read More
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="ml-1 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
        </div>
      </RouterLink>
    </div>

    <!-- See More Button -->
    <div class="text-center mt-14">
      <RouterLink
        to="/blog"
        class="inline-block bg-blue-800 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-all"
      >
        View More Blogs
      </RouterLink>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from "vue"

const markdownFiles = import.meta.glob('../blog/*.md', { eager: true })

const posts = ref(
  Object.keys(markdownFiles).map((path) => {
    const file = markdownFiles[path]
    return {
      slug: path.split('/').pop().replace('.md', ''),
      meta: file.frontmatter || {},
      content: file.default || '',
    }
  })
)

const latestPosts = computed(() =>
  [...posts.value]
    .filter((p) => p.meta.date)
    .sort((a, b) => new Date(b.meta.date) - new Date(a.meta.date))
    .slice(0, 3)
)
</script>