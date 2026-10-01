.PHONY: build test

ELEVENTY ?= npx --yes @11ty/eleventy

build:
	$(ELEVENTY) --config=.eleventy.js
	$(ELEVENTY) --config=.eleventy.kevinbarrett.dev.js

test: build
	test -s _site/kevinbarrett.dev/blog-post.css
	rg -q '\.blog-post-shell' _site/kevinbarrett.dev/blog-post.css
	rg -q '\.post-sidebar' _site/kevinbarrett.dev/blog-post.css
	rg -q 'grid-template-columns: minmax\(0, 1fr\) minmax\(16rem, 20rem\)' _site/kevinbarrett.dev/blog-post.css
