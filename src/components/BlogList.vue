<template>
  <section class="bg-gradient-to-b from-blue-50/80 via-white to-white py-20 pt-28 sm:pt-32 sm:py-28">
    <div class="mx-auto max-w-6xl px-5 sm:px-8">
      <div class="mx-auto mb-12 max-w-2xl text-center sm:mb-14">
        <h1 class="text-3xl font-bold tracking-tight text-blue-950 sm:text-5xl">
          Monsun Blog
        </h1>
        <p class="mt-4 text-lg leading-relaxed text-slate-600">
          Metocean insights, marine forecasting, and ocean data intelligence from the Monsun consultancy team.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
        <RouterLink
          v-for="post in sortedPosts"
          :key="post.slug"
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
          <div class="flex flex-1 flex-col p-5 sm:p-6">
            <h2 class="text-lg font-semibold leading-snug text-blue-950 group-hover:text-blue-800">
              {{ post.meta.title }}
            </h2>
            <p class="mt-3 flex-1 text-sm leading-relaxed text-slate-600 sm:text-[0.95rem]">
              {{ post.meta.excerpt || post.meta.description }}
            </p>
            <span class="mt-4 text-sm font-semibold text-blue-700">
              Read more →
            </span>
          </div>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useSeo } from '../composables/useSeo.js'
import { breadcrumbSchema } from '../seo/schemas.js'

useSeo({
  title: 'Monsun Blog | Metocean Insights & Forecasting',
  description:
    'Read Monsun blog articles on metocean consultancy, sea state monitoring, marine forecasting, offshore wind, and ocean data intelligence.',
  path: '/blog',
  jsonLd: breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
  ]),
})

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

const sortedPosts = computed(() =>
  [...posts.value].sort((a, b) => new Date(b.meta.date) - new Date(a.meta.date))
)
</script>
