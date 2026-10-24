<template>
  <section class="bg-gradient-to-b from-blue-50/80 via-white to-white pt-28 sm:pt-32 pb-20">
    <article class="mx-auto max-w-3xl px-5 sm:px-8">
      <nav class="mb-8 text-sm text-slate-500">
        <RouterLink to="/blog" class="font-medium text-blue-700 hover:text-blue-900 hover:underline">
          Blog
        </RouterLink>
        <span class="mx-2 text-slate-300">/</span>
        <span class="text-slate-600">{{ post.meta.title }}</span>
      </nav>

      <header class="mb-10">
        <p v-if="formattedDate" class="mb-3 text-sm font-medium uppercase tracking-wider text-slate-500">
          <time :datetime="post.meta.date">{{ formattedDate }}</time>
        </p>
        <h1 class="text-3xl font-bold tracking-tight text-blue-950 sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
          {{ post.meta.title }}
        </h1>
        <p
          v-if="post.meta.excerpt || post.meta.description"
          class="mt-4 text-lg leading-relaxed text-slate-600"
        >
          {{ post.meta.excerpt || post.meta.description }}
        </p>
      </header>

      <figure
        v-if="post.meta.image"
        class="mb-12 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm"
      >
        <img
          :src="post.meta.image"
          :alt="post.meta.title"
          class="block h-auto w-full"
          loading="eager"
          width="1200"
          height="800"
        />
      </figure>

      <div class="blog-prose" v-html="post.html"></div>

      <div class="mt-14 border-t border-slate-200 pt-8">
        <RouterLink
          to="/blog"
          class="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900"
        >
          <span aria-hidden="true">←</span>
          Back to Blog
        </RouterLink>
      </div>
    </article>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'
import { useSeo } from '../composables/useSeo.js'
import { blogPostingSchema, breadcrumbSchema } from '../seo/schemas.js'

const route = useRoute()
const markdownFiles = import.meta.glob('../blog/*.md', { eager: true })

const post = computed(() => {
  const slug = route.params.slug
  const file = markdownFiles[`../blog/${slug}.md`]
  if (!file) {
    return { meta: { title: 'Post not found' }, html: '<p>Post not found.</p>', slug }
  }
  return {
    slug,
    meta: file.frontmatter || {},
    html: marked.parse(file.default || ''),
  }
})

const formattedDate = computed(() => {
  const raw = post.value.meta?.date
  if (!raw) return ''
  const d = new Date(raw)
  if (Number.isNaN(d.getTime())) return String(raw)
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
})

useSeo(() => {
  const meta = post.value.meta || {}
  const path = `/blog/${post.value.slug}`
  const title = meta.title
    ? `${meta.title} | Monsun Metocean`
    : 'Blog Post | Monsun Metocean'
  const description =
    meta.description ||
    meta.excerpt ||
    'Metocean intelligence insights from Monsun.'

  return {
    title,
    description,
    path,
    image: meta.image,
    type: 'article',
    jsonLd: [
      blogPostingSchema({
        title: meta.title || title,
        description,
        image: meta.image,
        date: meta.date,
        path,
      }),
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
        { name: meta.title || 'Post', path },
      ]),
    ],
  }
})
</script>
