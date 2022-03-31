# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project tries to adhere to [Semantic Versioning (SemVer)](https://semver.org/spec/v2.0.0.html).

<!--
    **Added** for new features.
    **Changed** for changes in existing functionality.
    **Deprecated** for soon-to-be removed features.
    **Removed** for now removed features.
    **Fixed** for any bug fixes.
    **Security** in case of vulnerabilities.
 -->

## Unreleased
### Added
- you can now disable or rename the shortcode

### Changed
- Preact is now a peerDependency, and must be installed separately.
- `options.doctype` now defaults to `true`
- Renamed `renderFile` shortcode to `render_jsx`. The name conflicts with [Eleventy's official "render" plugin](https://www.11ty.dev/docs/plugins/render/).
- Paths passed to the shortcode are now relative to the includes directory.


## [0.1.1] - 2022-03-29
- Released on NPM


## [0.1.0] - 2022-03-29
### Added
- Register JSX as a template engine for both `.jsx` and `.tsx` files
- Add `renderFile` shortcode, for including JSX in
- Pass _most_ global data as props
    - Only passed to files which compile to HTML. In other words, it's not passed to components.
    - We can't pass the global `collections` or `eleventyComputed` objects, because of the way we render the files. See the comment in `.eleventy.js` for more details.

[0.1.1]: https://github.com/binyamin/eleventy-plugin-preact/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/binyamin/eleventy-plugin-preact/commits/v0.1.0
